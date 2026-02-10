/**
 * 업적 리스트 컴포넌트
 *
 * 전체 업적 목록 표시
 * 카테고리별 필터 (전체, 달성, 미달성)
 * 통계
 */

'use client';

import { useState } from 'react';
import { AchievementItem } from './achievement-item';
import { ACHIEVEMENTS } from '@/lib/constants/achievements';
import { useAchievementStore } from '@/stores/achievementStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { useStreakStore } from '@/stores/streakStore';
import { getRecommendedAchievements } from '@/lib/utils/achievement-checker';
import { cn } from '@/lib/utils';
import { Trophy, Target, CheckCircle } from 'lucide-react';

type FilterType = 'all' | 'unlocked' | 'locked';

export function AchievementList() {
  const achievementStore = useAchievementStore();
  const badgeStore = useBadgeStore();
  const streakStore = useStreakStore();

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  // 통계
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = achievementStore.userAchievements.length;
  const achievementRate = Math.round((unlockedCount / totalAchievements) * 100);

  // 필터링
  const filteredAchievements = ACHIEVEMENTS.filter((achievement) => {
    const isUnlocked = achievementStore.hasAchievement(achievement.id);

    if (selectedFilter === 'unlocked') return isUnlocked;
    if (selectedFilter === 'locked') return !isUnlocked;
    return true;
  });

  // 추천 업적 (진행도 높은 순)
  const recommended = getRecommendedAchievements(
    badgeStore.userBadges,
    streakStore.streakData,
    achievementStore.userAchievements,
    3
  );

  // 필터 옵션
  const filters: { value: FilterType; label: string; icon: typeof Trophy }[] = [
    { value: 'all', label: '전체', icon: Target },
    { value: 'unlocked', label: '달성', icon: CheckCircle },
    { value: 'locked', label: '미달성', icon: Trophy },
  ];

  return (
    <div className="space-y-6">
      {/* 통계 */}
      <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
        <div className="mb-4 text-center">
          <Trophy className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
          <h3 className="text-lg font-semibold text-neutral-700">업적 달성</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{unlockedCount}</p>
            <p className="text-xs text-neutral-600">달성</p>
          </div>
          <div className="border-x border-neutral-200 text-center">
            <p className="text-2xl font-bold text-yellow-600">{totalAchievements}</p>
            <p className="text-xs text-neutral-600">전체</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{achievementRate}%</p>
            <p className="text-xs text-neutral-600">달성률</p>
          </div>
        </div>

        {/* 진행 바 */}
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
              style={{ width: `${achievementRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 추천 업적 */}
      {recommended.length > 0 && selectedFilter === 'all' && (
        <div>
          <h4 className="mb-3 text-sm font-semibold text-neutral-700">
            🎯 곧 달성할 수 있어요!
          </h4>
          <div className="space-y-3">
            {recommended.map(({ achievement }) => {
              const userAchievement = achievementStore.userAchievements.find(
                (ua) => ua.achievementId === achievement.id
              );

              return (
                <AchievementItem
                  key={achievement.id}
                  achievement={achievement}
                  userAchievement={userAchievement}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 필터 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map(({ value, label, icon: Icon }) => {
          const isSelected = selectedFilter === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedFilter(value)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all',
                isSelected
                  ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* 업적 리스트 */}
      <div className="space-y-3">
        {filteredAchievements.map((achievement) => {
          const userAchievement = achievementStore.userAchievements.find(
            (ua) => ua.achievementId === achievement.id
          );

          return (
            <AchievementItem
              key={achievement.id}
              achievement={achievement}
              userAchievement={userAchievement}
            />
          );
        })}
      </div>

      {/* 빈 상태 */}
      {filteredAchievements.length === 0 && (
        <div className="py-12 text-center text-neutral-500">
          <p>해당하는 업적이 없습니다.</p>
        </div>
      )}

      {/* 격려 메시지 */}
      {unlockedCount === 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
          <p className="text-sm text-blue-700">
            꾸준히 기록하고 첫 업적을 달성해보세요! 🏆
          </p>
        </div>
      )}

      {achievementRate === 100 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
          <p className="text-sm text-yellow-700">
            🎊 대단해요! 모든 업적을 달성했어요!
          </p>
        </div>
      )}
    </div>
  );
}
