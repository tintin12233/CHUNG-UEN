import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "加工能力｜內外徑研磨與 CNC 車削",
  "查看長芸的精密加工能力，涵蓋內徑研磨、外徑研磨、CNC車削與精密機械零組件製造。",
  "/capacity",
);

export default function CapacityRoute() {
  return <SitePage><SectionPage kind="capacity" /></SitePage>;
}
