import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "長芸有限公司｜精密研磨與零件加工",
  description: "長芸有限公司提供精密研磨、CNC 車床與整合加工服務，支援工作母機、汽車零組件與產業機械。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
