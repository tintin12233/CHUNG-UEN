import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://chung-uen.pages.dev").replace(/\/$/, "");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const outputDirectory = path.resolve("dist", "client");

const routes = [
  { path: "/", priority: "1.0", changeFrequency: "weekly" },
  { path: "/about", priority: "0.8", changeFrequency: "monthly" },
  { path: "/services", priority: "0.9", changeFrequency: "monthly" },
  { path: "/capacity", priority: "0.9", changeFrequency: "monthly" },
  { path: "/equipment", priority: "0.7", changeFrequency: "monthly" },
  { path: "/quality", priority: "0.8", changeFrequency: "monthly" },
  { path: "/cases", priority: "0.8", changeFrequency: "monthly" },
  { path: "/industries", priority: "0.7", changeFrequency: "monthly" },
  { path: "/contact", priority: "0.9", changeFrequency: "monthly" },
];

const urlForRoute = (route) => `${siteUrl}${basePath}${route === "/" ? "/" : `${route}/`}`;
const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(({ path: route, priority, changeFrequency }) => [
    "  <url>",
    `    <loc>${escapeXml(urlForRoute(route))}</loc>`,
    `    <changefreq>${changeFrequency}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n")),
  "</urlset>",
  "",
].join("\n");

const robots = [
  "User-agent: *",
  "Allow: /",
  `Sitemap: ${siteUrl}${basePath}/sitemap.xml`,
  "",
].join("\n");

await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, "robots.txt"), robots, "utf8");
await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap, "utf8");

console.log(`Generated SEO files in ${outputDirectory}`);
