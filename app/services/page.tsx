import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "服務｜精密研磨、CNC車削與整合加工",
  "長芸提供內外徑精密研磨、CNC車削、銑削、熱處理、表面處理與品質檢驗等整合加工服務。",
  "/services",
);

export default function ServicesRoute() {
  return <SitePage><SectionPage kind="services" /></SitePage>;
}
