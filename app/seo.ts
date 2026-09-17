import type { Metadata } from "next";
import { siteBasePath, withBasePath } from "@/app/components/site-paths";

/**
 * Set NEXT_PUBLIC_SITE_URL to the real custom domain in Cloudflare Pages.
 * The pages.dev URL keeps previews and first deployments usable before that
 * variable is configured.
 */
export const siteName = "長芸有限公司 | CHUNG UEN CO., LTD.";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://chung-uen.pages.dev").replace(/\/$/, "");

const normalizePath = (path: string) => {
  if (path === "/") return "/";
  const normalized = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return /\.[a-z0-9]+$/i.test(normalized) ? normalized : `${normalized}/`;
};

export function absoluteSiteUrl(path = "/") {
  return `${siteUrl}${siteBasePath}${normalizePath(path)}`;
}

export const socialImage = absoluteSiteUrl("/images/hero-component.jpg");

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = absoluteSiteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "zh_TW",
      url,
      siteName,
      title,
      description,
      images: [{ url: socialImage, alt: "長芸有限公司精密加工" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function publicAssetUrl(path: string) {
  return `${siteUrl}${withBasePath(path)}`;
}
