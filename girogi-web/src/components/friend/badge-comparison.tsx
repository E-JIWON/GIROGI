/**
 * 뱃지 비교 컴포넌트
 *
 * 본인 vs 친구 뱃지 컬렉션 비교
 * - 뱃지 종류 개수
 * - 업적 달성 개수
 * 원형 차트 비교
 */

'use client';

import { ComparisonResult } from '@/types/friend';
import { cn } from '@/lib/utils';
import { Award, Trophy } from 'lucide-react';
import { BADGES } from '@/lib/constants/badges';
import { ACHIEVEMENTS } from '@/lib/constants/achievements';

export interface BadgeComparisonProps {
  comparison: ComparisonResult;
}

export function BadgeComparison({ comparison }: BadgeComparisonProps) {
  const { myProfile, friendProfile } = comparison;

  const totalBadgeTypes = BADGES.length;
  const totalAchievements = ACHIEVEMENTS.length;

  // 뱃지 수집률
  const myBadgeRate = Math.round((myProfile.badgeCount / totalBadgeTypes) * 100);
  const friendBadgeRate = Math.round((friendProfile.badgeCount / totalBadgeTypes) * 100);

  // 업적 달성률
  const myAchievementRate = Math.round((myProfile.achievementCount / totalAchievements) * 100);
  const friendAchievementRate = Math.round(
    (friendProfile.achievementCount / totalAchievements) * 100
  );

  // 승자 판단
  const badgeWinner =
    myBadgeRate > friendBadgeRate ? 'me' : myBadgeRate < friendBadgeRate ? 'friend' : 'tie';
  const achievementWinner =
    myAchievementRate > friendAchievementRate
      ? 'me'
      : myAchievementRate < friendAchievementRate
      ? 'friend'
      : 'tie';

  // 원형 차트 컴포넌트
  const CircularChart = ({
    percentage,
    label,
    value,
    total,
    color,
    isWinner,
  }: {
    percentage: number;
    label: string;
    value: number;
    total: number;
    color: 'primary' | 'yellow';
    isWinner: boolean;
  }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const colorClass = color === 'primary' ? 'text-primary-500' : 'text-yellow-500';

    return (
      <div className="flex flex-col items-center">
        {/* 원형 차트 */}
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* 배경 원 */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-neutral-200"
            />
            {/* 진행 원 */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={cn('transition-all duration-500', colorClass)}
            />
          </svg>

          {/* 중앙 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-2xl font-bold', colorClass)}>{percentage}%</span>
            <span className="text-xs text-neutral-500">
              {value}/{total}
            </span>
          </div>
        </div>

        {/* 라벨 */}
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold text-neutral-700">{label}</p>
          {isWinner && <p className="text-xs text-yellow-600">🏆 1위</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-800">🎯 컬렉션 비교</h3>

      {/* 뱃지 비교 */}
      <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-primary-50 to-blue-50 p-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Award className="h-5 w-5 text-primary-600" />
          <h4 className="font-bold text-neutral-800">뱃지 수집률</h4>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <CircularChart
            percentage={myBadgeRate}
            label="나"
            value={myProfile.badgeCount}
            total={totalBadgeTypes}
            color="primary"
            isWinner={badgeWinner === 'me'}
          />
          <CircularChart
            percentage={friendBadgeRate}
            label={friendProfile.user.nickname}
            value={friendProfile.badgeCount}
            total={totalBadgeTypes}
            color="primary"
            isWinner={badgeWinner === 'friend'}
          />
        </div>

        {badgeWinner === 'tie' && (
          <div className="mt-4 text-center text-sm text-primary-700">
            동률! 둘 다 대단해요! 🤝
          </div>
        )}
      </div>

      {/* 업적 비교 */}
      <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          <h4 className="font-bold text-neutral-800">업적 달성률</h4>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <CircularChart
            percentage={myAchievementRate}
            label="나"
            value={myProfile.achievementCount}
            total={totalAchievements}
            color="yellow"
            isWinner={achievementWinner === 'me'}
          />
          <CircularChart
            percentage={friendAchievementRate}
            label={friendProfile.user.nickname}
            value={friendProfile.achievementCount}
            total={totalAchievements}
            color="yellow"
            isWinner={achievementWinner === 'friend'}
          />
        </div>

        {achievementWinner === 'tie' && (
          <div className="mt-4 text-center text-sm text-yellow-700">
            동률! 둘 다 최고예요! 🤝
          </div>
        )}
      </div>
    </div>
  );
}
