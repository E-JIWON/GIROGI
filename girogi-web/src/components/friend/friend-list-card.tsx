/**
 * 친구 목록 카드
 *
 * 친구 목록 표시 및 빠른 비교
 * - 친구 프로필 미리보기
 * - 현재 Streak 비교
 * - 비교 페이지로 이동
 */

'use client';

import { User } from '@/types/models';
import { cn } from '@/lib/utils';
import { Flame, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface FriendListCardProps {
  friend: User;
  friendStreak: number; // 친구의 현재 Streak
  myStreak: number; // 본인의 현재 Streak
}

export function FriendListCard({ friend, friendStreak, myStreak }: FriendListCardProps) {
  const router = useRouter();

  const streakDiff = myStreak - friendStreak;
  const status =
    streakDiff > 0 ? 'ahead' : streakDiff < 0 ? 'behind' : ('tie' as const);

  const getStatusBadge = () => {
    switch (status) {
      case 'ahead':
        return {
          text: `${Math.abs(streakDiff)}일 앞서요`,
          color: 'bg-green-100 text-green-700',
          emoji: '🔥',
        };
      case 'behind':
        return {
          text: `${Math.abs(streakDiff)}일 뒤처짐`,
          color: 'bg-blue-100 text-blue-700',
          emoji: '⚡',
        };
      case 'tie':
        return {
          text: '동점!',
          color: 'bg-purple-100 text-purple-700',
          emoji: '🤝',
        };
    }
  };

  const badge = getStatusBadge();

  const handleClick = () => {
    router.push(`/friend/${friend.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full rounded-xl border-2 border-neutral-200 bg-white p-4 text-left transition-all hover:border-primary-300 hover:shadow-md active:scale-98"
    >
      <div className="flex items-center gap-4">
        {/* 프로필 이미지 */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-blue-500 text-2xl text-white">
          {friend.profileImageUrl || friend.username.slice(0, 1)}
        </div>

        {/* 정보 */}
        <div className="flex-1">
          <h4 className="text-base font-bold text-neutral-800">{friend.username}</h4>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-neutral-600">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>{friendStreak}일</span>
            </div>
            <span className="text-neutral-300">•</span>
            <div className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', badge.color)}>
              {badge.emoji} {badge.text}
            </div>
          </div>
        </div>

        {/* 화살표 */}
        <ChevronRight className="h-5 w-5 shrink-0 text-neutral-400" />
      </div>
    </button>
  );
}
