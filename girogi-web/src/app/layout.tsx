import type { Metadata } from "next";
import { BottomTabBar } from "@/components/navigation/BottomTabBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIROGI - 과학적 다이어트 앱",
  description: "심리학과 행동경제학 기반의 지속 가능한 다이어트 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="pb-16">
          {children}
        </div>
        <BottomTabBar />
      </body>
    </html>
  );
}
