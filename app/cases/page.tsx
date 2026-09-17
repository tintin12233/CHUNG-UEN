import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "產品與實績｜精密機械零組件",
  "瀏覽長芸加工的主軸、套筒、軸類、齒輪與其他精密機械零組件，服務工作母機與工業設備需求。",
  "/cases",
);

export default function CasesRoute() {
  return <SitePage><SectionPage kind="cases" /></SitePage>;
}
