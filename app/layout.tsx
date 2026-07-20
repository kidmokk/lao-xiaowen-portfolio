import type { Metadata } from "next";
import "@fontsource/zcool-kuaile";
import "./globals.css";
import ScrollNavigation from "./ScrollNavigation";

export const metadata: Metadata = {
  title: "劳校文｜视觉设计师",
  description: "AIGC 视觉、品牌视觉、产品可视化与动态内容作品集。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <ScrollNavigation />
        {children}
      </body>
    </html>
  );
}
