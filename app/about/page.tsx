import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "關於長芸｜精密機械零組件加工",
  "認識長芸有限公司的精密研磨、CNC加工經驗與製造流程，從圖面評估到品質檢驗，提供穩定可靠的精密零件服務。",
  "/about",
);

export default function AboutRoute() {
  return <SitePage><SectionPage kind="about" /></SitePage>;
}
