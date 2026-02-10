/**
 * 업적 아이템 컴포넌트
 *
 * 개별 업적 표시
 * 진행도 바
 * 달성/미달성 상태
 */

'use client';

import { Achievement, UserAchievement } from '@/types/achievement';
import { useBadgeStore } from '@/stores/badgeStore';
import { useStreakStore } from '@/stores/streakStore';
import { getAchievementProgress, getAchievementProgressPercent } from '@/lib/utils/achievement-checker';
import { cn } from '@/lib/utils';
import { Check, Lock } from 'lucide-react';

export interface AchievementItemProps {
  achievement: Achievement;
  userAchievement?: UserAchievement; // undefined면 미달성
}

export function AchievementItem({ achievement, userAchievement }: AchievementItemProps) {
  const badgeStore = useBadgeStore();
  const streakStore = useStreakStore();

  const isUnlocked = !!userAchievement;
  const progress = getAchievementProgress(achievement, badgeStore.userBadges, streakStore.streakData);
  const progressPercent = getAchievementProgressPercent(achievement, badgeStore.userBadges, streakStore.streakData);

  // 보상 타입별 아이콘
  const getRewardIcon = () => {
    switch (achievement.reward.type) {
      case 'title':
        return '👑';
      case 'theme':
        return '🎨';
      case 'sticker':
        return '✨';
      case 'coupon':
        return '🎟️';
      default:
        return '🎁';
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-4 transition-all',
        isUnlocked
          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md'
          : 'border-neutral-200 bg-white hover:border-neutral-300'
      )}
    >
      <div className="flex items-start gap-4">
        {/* 이모지 */}
        <div
          className={cn(
            'flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-4xl',
            isUnlocked ? 'bg-yellow-100' : 'bg-neutral-100'
          )}
        >
          {achievement.emoji}
        </div>

        {/* 정보 */}
        <div className="flex-1">
          {/* 헤더 */}
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h4
                className={cn(
                  'text-base font-bold',
                  isUnlocked ? 'text-yellow-800' : 'text-neutral-700'
                )}
              >
                {achievement.name}
              </h4>
              <p className="mt-1 text-sm text-neutral-600">{achievement.description}</p>
            </div>

            {/* 상태 아이콘 */}
            {isUnlocked ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500">
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
              </div>
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200">
                <Lock className="h-4 w-4 text-neutral-500" />
              </div>
            )}
          </div>

          {/* 진행도 바 (미달성만) */}
          {!isUnlocked && (
            <div className="mb-2">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-neutral-500">진행도</span>
                <span className="text-xs font-semibold text-primary-600">
                  {progressPercent}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* 보상 */}
          <div
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm',
              isUnlocked ? 'bg-yellow-100' : 'bg-neutral-100'
            )}
          >
            <span>{getRewardIcon()}</span>
            <span
              className={cn(
                'font-medium',
                isUnlocked ? 'text-yellow-800' : 'text-neutral-600'
              )}
            >
              {achievement.reward.type === 'title' && `칭호: "${achievement.reward.value}"`}
              {achievement.reward.type === 'theme' && '테마 잠금 해제'}
              {achievement.reward.type === 'sticker' && '특별 스티커'}
              {achievement.reward.type === 'coupon' && '쿠폰 획득'}
            </span>
          </div>

          {/* 달성 시각 */}
          {isUnlocked && userAchievement && (
            <p className="mt-2 text-xs text-yellow-700">
              {new Date(userAchievement.unlockedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              달성
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
