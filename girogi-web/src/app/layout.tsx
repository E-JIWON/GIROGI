import type { Metadata, Viewport } from 'next';
import { JournalShell } from '@/components/navigation/journal-shell';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        {/* 저널 셸 — 책상 위 카드 한 장 + 상단 탭 + 하단 독 (사이드바·탭바 대체) */}
        <JournalShell>{children}</JournalShell>
      </body>
    </html>
  );
}
