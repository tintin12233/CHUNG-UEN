import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/app/seo";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/capacity", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/equipment", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/quality", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/cases", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: absoluteSiteUrl(path),
    changeFrequency,
    priority,
  }));
}
