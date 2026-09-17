import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "聯絡長芸｜精密加工詢價",
  "提供圖面、材質、尺寸、公差與數量，聯絡長芸有限公司評估精密研磨、CNC車削與整合加工需求。",
  "/contact",
);

export default function ContactRoute() {
  return <SitePage><SectionPage kind="contact" /></SitePage>;
}
