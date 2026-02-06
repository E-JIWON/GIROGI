/**
 * BottomTabBar 컴포넌트
 *
 * 하단 네비게이션 바
 * - 5개 탭: 홈, 체크리스트, 유혹 극복, 커뮤니티, 프로필
 * - 유혹 극복 탭은 중앙에 크게 배치 (FAB 스타일)
 * - 현재 활성 탭 강조 (Primary 색상)
 *
 * Flutter: lib/presentation/navigation/main_navigation.dart
 */

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-grey-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-around px-4">
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
                    'flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-error to-warning'
                      : 'bg-gradient-to-r from-error/80 to-warning/80 hover:from-error hover:to-warning'
                  )}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <span
                  className={cn(
                    'mt-1 text-[10px] font-medium',
                    isActive ? 'text-error' : 'text-grey-600'
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
                  isActive ? 'text-primary' : 'text-grey-500'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-grey-600'
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
