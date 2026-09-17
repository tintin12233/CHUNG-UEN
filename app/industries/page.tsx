import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "應用產業｜精密機械與工業零組件",
  "長芸為工作母機、汽車零件、工業設備與精密機械產業提供穩定的研磨、車削及零組件加工服務。",
  "/industries",
);

export default function IndustriesRoute() {
  return <SitePage><SectionPage kind="industries" /></SitePage>;
}
