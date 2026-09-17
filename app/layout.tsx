import type { Metadata } from "next";
import "./globals.css";
import { withBasePath } from "@/app/components/site-paths";
import { absoluteSiteUrl, pageMetadata, publicAssetUrl, siteName, siteUrl, socialImage } from "@/app/seo";

const homeTitle = "長芸有限公司｜精密研磨、CNC車削與精密機械零組件";
const homeDescription = "長芸有限公司位於台中，專注於內外徑精密研磨、CNC車削、精密機械零組件與整合加工，服務工作母機、汽車零件及工業設備需求。";
const organizationId = `${absoluteSiteUrl("/")}#organization`;
const websiteId = `${absoluteSiteUrl("/")}#website`;

export const metadata: Metadata = {
  ...pageMetadata(homeTitle, homeDescription, "/"),
  metadataBase: new URL(siteUrl),
  title: { default: homeTitle, template: "%s｜長芸有限公司" },
  keywords: ["精密研磨", "CNC車削", "內徑研磨", "外徑研磨", "精密機械零組件", "台中精密加工", "長芸有限公司"],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "manufacturing",
  robots: { index: true, follow: true },
  icons: { icon: withBasePath("/favicon.svg"), shortcut: withBasePath("/favicon.svg") },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": organizationId,
      name: "長芸有限公司",
      alternateName: "CHUNG UEN CO., LTD.",
      url: absoluteSiteUrl("/"),
      logo: publicAssetUrl("/images/chy-logo.png"),
      image: socialImage,
      telephone: "+886-4-2676-3118",
      email: "charngyun0815@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "TW",
        addressRegion: "台中市",
        addressLocality: "大甲區",
        streetAddress: "重義一路151號",
      },
      areaServed: "Taiwan",
      knowsAbout: ["精密研磨", "CNC車削", "精密機械零組件", "品質檢驗"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteSiteUrl("/"),
      name: siteName,
      publisher: { "@id": organizationId },
      inLanguage: "zh-Hant",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></head><body>{children}</body></html>;
}
