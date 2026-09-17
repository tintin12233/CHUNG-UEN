import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "品質管理｜精密量測與加工品質",
  "長芸以進料檢驗、製程控制、最終檢驗與精密量測，確保精密研磨及機械零組件品質穩定可追溯。",
  "/quality",
);

export default function QualityRoute() {
  return <SitePage><SectionPage kind="quality" /></SitePage>;
}
