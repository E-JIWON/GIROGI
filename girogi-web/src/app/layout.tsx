import type { Metadata, Viewport } from 'next';
import { BottomTabBar } from '@/components/navigation/bottom-tab-bar';
import { Sidebar } from '@/components/navigation/sidebar';
import { TopBar } from '@/components/navigation/top-bar';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'GIROGI - 과학적 다이어트 앱',
  description: '심리학과 행동경제학 기반의 지속 가능한 다이어트 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {/* Desktop: 사이드바 (lg 이상) */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60">
          <Sidebar />
        </div>

        {/* 메인 영역 */}
        <div className="min-h-screen pb-16 lg:pb-0 lg:pl-60">
          {/* Desktop: 상단 바 */}
          <div className="hidden lg:block">
            <TopBar />
          </div>

          {/* 콘텐츠 */}
          <div className="max-w-2xl mx-auto lg:max-w-none lg:mx-0">
            {children}
          </div>
        </div>

        {/* Mobile: 하단 탭바 (lg 미만) */}
        <div className="lg:hidden">
          <BottomTabBar />
        </div>
      </body>
    </html>
  );
}
