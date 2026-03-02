/** @desc PC용 상단 바 (lg 이상에서 표시) */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

const PAGE_TITLES: Record<string, string> = {
  '/': '대시보드',
  '/checklist': '체크리스트',
  '/emergency': '유혹 극복',
  '/community': '커뮤니티',
  '/profile': '프로필',
};

export function TopBar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? '';

  return (
    <header className="flex h-14 items-center justify-between bg-white px-8">
      <h1 className="text-lg font-semibold text-neutral-800">{title}</h1>

      <Link
        href="/profile"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 transition-colors hover:bg-primary-200"
      >
        <User className="h-4 w-4 text-primary-700" />
      </Link>
    </header>
  );
}
