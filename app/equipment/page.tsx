import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "設備｜精密研磨與機械加工設備",
  "了解長芸使用的精密研磨、CNC車削與量測設備，以及支援穩定加工品質的製造現場。",
  "/equipment",
);

export default function EquipmentRoute() {
  return <SitePage><SectionPage kind="equipment" /></SitePage>;
}
