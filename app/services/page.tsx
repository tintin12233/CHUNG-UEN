import type { Metadata } from "next";
import { SectionPage } from "@/app/components/section-page";
import { pageMetadata } from "@/app/seo";
import { SitePage } from "@/app/components/site-chrome";

export const metadata: Metadata = pageMetadata(
  "內外徑研磨加工與 CNC 車床代工",
  "台中大甲長芸提供內外徑研磨加工、CNC車床加工及多製程整合，承接主軸、套筒與精密軸類零件。",
  "/services",
);

export default function ServicesRoute() {
  return <SitePage><SectionPage kind="services" /></SitePage>;
}
