import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/app/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}
