/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const CONTACT_RECIPIENT = "tintin12233@gmail.com";
const CONTACT_FIELD_LABELS: Array<[keyof ContactFields, string]> = [
  ["topic", "問題分類"],
  ["company", "公司名稱"],
  ["name", "姓名"],
  ["title", "稱謂"],
  ["phone", "電話"],
  ["email", "E-mail"],
  ["city", "縣市"],
  ["district", "區域"],
  ["address", "地址"],
  ["website", "網站"],
  ["message", "內容"],
];

type ContactFields = {
  topic: string;
  company: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  website: string;
  message: string;
};

const jsonHeaders = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };

function jsonResponse(body: Record<string, boolean | string>, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

function isContactPath(pathname: string): boolean {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return normalizedPath === "/api/contact" || normalizedPath.endsWith("/api/contact");
}

async function handleContactRequest(request: Request, env: Env): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { ...jsonHeaders, Allow: "POST, OPTIONS" } });
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method" }, 405);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) {
    return jsonResponse({ ok: false, error: "not_configured" }, 503);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return jsonResponse({ ok: false, error: "too_large" }, 413);
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  if (!rawPayload || typeof rawPayload !== "object") {
    return jsonResponse({ ok: false, error: "invalid_payload" }, 400);
  }

  const payload = rawPayload as Record<string, unknown>;
  const honeypot = typeof payload.websiteConfirm === "string" ? payload.websiteConfirm.trim() : "";
  if (honeypot) {
    return jsonResponse({ ok: true });
  }

  const readField = (key: keyof ContactFields, maxLength: number): string => {
    const value = payload[key];
    return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
  };

  const fields: ContactFields = {
    topic: readField("topic", 80),
    company: readField("company", 200),
    name: readField("name", 100),
    title: readField("title", 40),
    phone: readField("phone", 80),
    email: readField("email", 254),
    city: readField("city", 80),
    district: readField("district", 80),
    address: readField("address", 250),
    website: readField("website", 250),
    message: readField("message", 5000),
  };

  if (!fields.topic || !fields.name || !fields.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return jsonResponse({ ok: false, error: "validation" }, 400);
  }

  const rows = CONTACT_FIELD_LABELS.map(([key, label]) => ({ label, value: fields[key] || "—" }));
  const htmlRows = rows.map(({ label, value }) => `<tr><th style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:left;vertical-align:top;color:#4b5563;white-space:nowrap">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("");
  const textRows = rows.map(({ label, value }) => `${label}: ${value}`).join("\n");
  const subjectTopic = fields.topic.replace(/[\r\n]+/g, " ").slice(0, 80);
  const subjectName = fields.name.replace(/[\r\n]+/g, " ").slice(0, 80);
  const emailPayload = {
    from: env.CONTACT_FROM_EMAIL,
    to: [CONTACT_RECIPIENT],
    reply_to: fields.email,
    subject: `長芸網站詢問｜${subjectTopic}｜${subjectName}`,
    html: `<div style="font-family:Arial,'Noto Sans TC',sans-serif;line-height:1.6;color:#1f2937"><h2 style="margin:0 0 16px">長芸網站新詢問</h2><p style="margin:0 0 16px;color:#4b5563">收到時間：${escapeHtml(new Date().toISOString())}</p><table style="border-collapse:collapse;width:100%;max-width:760px;font-size:14px"><tbody>${htmlRows}</tbody></table></div>`,
    text: `長芸網站新詢問\n收到時間：${new Date().toISOString()}\n\n${textRows}`,
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      console.error("Contact email provider returned an error", response.status);
      return jsonResponse({ ok: false, error: "email" }, 502);
    }
  } catch (error) {
    console.error("Contact email provider request failed", error);
    return jsonResponse({ ok: false, error: "email" }, 502);
  }

  return jsonResponse({ ok: true });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (isContactPath(url.pathname)) {
      return handleContactRequest(request, env);
    }

    // `trailingSlash: true` is correct for the exported page routes, but
    // crawlers expect these metadata files at their extension URLs.
    if (url.pathname === "/robots.txt" || url.pathname === "/sitemap.xml") {
      return env.ASSETS.fetch(request);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
