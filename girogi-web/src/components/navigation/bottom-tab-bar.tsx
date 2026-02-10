/** @desc 하단 네비게이션 바 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, AlertCircle, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  {
    id: 'home',
    label: '홈',
    icon: Home,
    href: '/',
  },
  {
    id: 'checklist',
    label: '체크리스트',
    icon: ClipboardList,
    href: '/checklist',
  },
  {
    id: 'emergency',
    label: '유혹 극복',
    icon: AlertCircle,
    href: '/emergency',
    isCentral: true, // 중앙 강조 탭
  },
  {
    id: 'community',
    label: '커뮤니티',
    icon: Users,
    href: '/community',
  },
  {
    id: 'profile',
    label: '프로필',
    icon: User,
    href: '/profile',
  },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="max-w-2xl mx-auto fixed bottom-0 left-0 right-0 z-50 bg-white">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-around px-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          // 중앙 강조 탭 (Emergency)
          if ('isCentral' in tab && tab.isCentral) {
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="flex flex-col items-center justify-center"
              >
                <div
                  className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-full transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-error to-peach'
                      : 'bg-gradient-to-r from-error/80 to-peach/80 hover:from-error hover:to-peach'
                  )}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <span
                  className={cn(
                    'mt-1 text-[10px] font-medium',
                    isActive ? 'text-error' : 'text-neutral-700'
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            );
          }

          // 일반 탭
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors"
            >
              <Icon
                className={cn(
                  'h-6 w-6 transition-colors',
                  isActive ? 'text-primary' : 'text-neutral-700'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-neutral-700'
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
