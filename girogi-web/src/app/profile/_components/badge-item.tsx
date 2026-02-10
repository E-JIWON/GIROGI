/**
 * 뱃지 아이템 컴포넌트
 *
 * 개별 뱃지 표시
 * 획득 횟수 표시
 * 미획득 시 회색 처리
 */

'use client';

import { Badge, UserBadge } from '@/types/badge';
import { cn } from '@/lib/utils';

export interface BadgeItemProps {
  badge: Badge;
  userBadge?: UserBadge; // undefined면 미획득
}

export function BadgeItem({ badge, userBadge }: BadgeItemProps) {
  const isAcquired = !!userBadge;
  const count = userBadge?.count || 0;

  // 희귀도별 테두리 색상
  const getBorderColor = () => {
    if (!isAcquired) return 'border-neutral-200';

    switch (badge.rarity) {
      case 'common':
        return 'border-neutral-300';
      case 'rare':
        return 'border-blue-400';
      case 'epic':
        return 'border-purple-400';
      case 'legendary':
        return 'border-yellow-400';
      default:
        return 'border-neutral-300';
    }
  };

  // 희귀도별 배경 색상
  const getBgColor = () => {
    if (!isAcquired) return 'bg-neutral-50';

    switch (badge.rarity) {
      case 'common':
        return 'bg-white';
      case 'rare':
        return 'bg-blue-50';
      case 'epic':
        return 'bg-purple-50';
      case 'legendary':
        return 'bg-yellow-50';
      default:
        return 'bg-white';
    }
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
        getBorderColor(),
        getBgColor(),
        isAcquired
          ? 'hover:shadow-md'
          : 'opacity-50 grayscale'
      )}
    >
      {/* 이모지 */}
      <div
        className={cn(
          'text-4xl transition-transform',
          isAcquired && 'hover:scale-110'
        )}
      >
        {badge.emoji}
      </div>

      {/* 이름 */}
      <p
        className={cn(
          'text-center text-sm font-medium',
          isAcquired ? 'text-neutral-700' : 'text-neutral-400'
        )}
      >
        {badge.name}
      </p>

      {/* 획득 횟수 */}
      {isAcquired && (
        <div className="rounded-full bg-primary-500 px-2 py-0.5">
          <p className="text-xs font-semibold text-white">×{count}</p>
        </div>
      )}

      {/* 미획득 표시 */}
      {!isAcquired && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/5">
          <div className="text-2xl">🔒</div>
        </div>
      )}

      {/* 희귀도 배지 */}
      {isAcquired && badge.rarity !== 'common' && (
        <div className="absolute right-1 top-1">
          {badge.rarity === 'legendary' && <div className="text-xs">👑</div>}
          {badge.rarity === 'epic' && <div className="text-xs">💎</div>}
          {badge.rarity === 'rare' && <div className="text-xs">⭐</div>}
        </div>
      )}
    </div>
  );
}
