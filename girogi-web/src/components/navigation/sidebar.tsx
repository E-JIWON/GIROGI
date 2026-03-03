/** @desc PC용 사이드바 네비게이션 (lg 이상에서 표시) */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ClipboardList,
  AlertCircle,
  Users,
  User,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '대시보드', icon: Home, href: '/' },
  { id: 'checklist', label: '체크리스트', icon: ClipboardList, href: '/checklist' },
  { id: 'emergency', label: '유혹 극복', icon: AlertCircle, href: '/emergency' },
  { id: 'community', label: '커뮤니티', icon: Users, href: '/community' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-2xl bg-white">
      {/* 로고 */}
      <div className="px-6 pt-5 pb-3">
        <Link href="/" className="text-xl font-bold text-primary-800">
          GIROGI
        </Link>
      </div>

      {/* 네비게이션 */}
      <nav className="px-3 pb-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 구분선 + 프로필 */}
      <div className="mx-3 border-t border-neutral-100" />
      <div className="px-3 py-2">
        <Link
          href="/profile"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            pathname.startsWith('/profile')
              ? 'bg-primary-100 text-primary-800'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
          )}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100">
            <User className="h-4 w-4 text-primary-700" />
          </div>
          <span>프로필</span>
        </Link>
      </div>
    </aside>
  );
}
