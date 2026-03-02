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
  { id: 'profile', label: '프로필', icon: User, href: '/profile' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col bg-white">
      {/* 로고 */}
      <div className="px-6 py-6">
        <Link href="/" className="text-xl font-bold text-primary-800">
          GIROGI
        </Link>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-3">
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

      {/* 하단 */}
      <div className="px-6 py-4">
        <p className="text-xs text-neutral-400">GIROGI v0.1</p>
      </div>
    </aside>
  );
}
