import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "長芸有限公司｜精密研磨與加工服務",
  description: "長芸有限公司提供精密研磨、CNC車削與整合加工服務。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
