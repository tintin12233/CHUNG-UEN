"use client";

import { SectionPage } from "@/app/components/section-page";
import { SitePage } from "@/app/components/site-chrome";

export default function AboutRoute() {
  return <SitePage><SectionPage kind="about" /></SitePage>;
}
