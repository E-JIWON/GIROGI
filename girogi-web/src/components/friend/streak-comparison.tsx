/**
 * Streak 비교 컴포넌트
 *
 * 본인 vs 친구 Streak 비교
 * - 현재 Streak
 * - 최장 Streak
 * - 총 기록 일수
 * 시각적 비교 바
 */

'use client';

import { ComparisonResult } from '@/types/friend';
import { cn } from '@/lib/utils';
import { Flame, Trophy, Calendar } from 'lucide-react';

export interface StreakComparisonProps {
  comparison: ComparisonResult;
}

export function StreakComparison({ comparison }: StreakComparisonProps) {
  const { myProfile, friendProfile } = comparison;

  // 현재 Streak 비교
  const currentStreakWinner =
    myProfile.streakData.currentStreak > friendProfile.streakData.currentStreak
      ? 'me'
      : myProfile.streakData.currentStreak < friendProfile.streakData.currentStreak
      ? 'friend'
      : 'tie';

  const currentStreakMax = Math.max(
    myProfile.streakData.currentStreak,
    friendProfile.streakData.currentStreak
  );

  // 최장 Streak 비교
  const longestStreakWinner =
    myProfile.streakData.longestStreak > friendProfile.streakData.longestStreak
      ? 'me'
      : myProfile.streakData.longestStreak < friendProfile.streakData.longestStreak
      ? 'friend'
      : 'tie';

  const longestStreakMax = Math.max(
    myProfile.streakData.longestStreak,
    friendProfile.streakData.longestStreak
  );

  // 총 일수 비교
  const totalDaysWinner =
    myProfile.totalDays > friendProfile.totalDays
      ? 'me'
      : myProfile.totalDays < friendProfile.totalDays
      ? 'friend'
      : 'tie';

  const totalDaysMax = Math.max(myProfile.totalDays, friendProfile.totalDays);

  // 비교 항목 데이터
  const comparisons = [
    {
      icon: Flame,
      label: '현재 Streak',
      myValue: myProfile.streakData.currentStreak,
      friendValue: friendProfile.streakData.currentStreak,
      maxValue: currentStreakMax,
      winner: currentStreakWinner,
      unit: '일',
      color: 'orange',
    },
    {
      icon: Trophy,
      label: '최장 Streak',
      myValue: myProfile.streakData.longestStreak,
      friendValue: friendProfile.streakData.longestStreak,
      maxValue: longestStreakMax,
      winner: longestStreakWinner,
      unit: '일',
      color: 'yellow',
    },
    {
      icon: Calendar,
      label: '총 기록 일수',
      myValue: myProfile.totalDays,
      friendValue: friendProfile.totalDays,
      maxValue: totalDaysMax,
      winner: totalDaysWinner,
      unit: '일',
      color: 'blue',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-neutral-800">🔥 Streak 비교</h3>

      {comparisons.map(({ icon: Icon, label, myValue, friendValue, maxValue, winner, unit, color }) => {
        const myPercent = maxValue > 0 ? (myValue / maxValue) * 100 : 0;
        const friendPercent = maxValue > 0 ? (friendValue / maxValue) * 100 : 0;

        const getColorClass = (type: 'bg' | 'text', isWinner: boolean) => {
          if (!isWinner) return type === 'bg' ? 'bg-neutral-200' : 'text-neutral-500';

          switch (color) {
            case 'orange':
              return type === 'bg' ? 'bg-orange-500' : 'text-orange-600';
            case 'yellow':
              return type === 'bg' ? 'bg-yellow-500' : 'text-yellow-600';
            case 'blue':
              return type === 'bg' ? 'bg-blue-500' : 'text-blue-600';
            default:
              return type === 'bg' ? 'bg-primary-500' : 'text-primary-600';
          }
        };

        return (
          <div key={label} className="rounded-xl border border-neutral-200 bg-white p-4">
            {/* 헤더 */}
            <div className="mb-3 flex items-center gap-2">
              <Icon className="h-5 w-5 text-neutral-600" />
              <span className="font-semibold text-neutral-700">{label}</span>
            </div>

            {/* 본인 */}
            <div className="mb-2">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-neutral-600">나</span>
                <span
                  className={cn(
                    'text-sm font-bold',
                    getColorClass('text', winner === 'me')
                  )}
                >
                  {myValue} {unit}
                  {winner === 'me' && ' 🏆'}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    getColorClass('bg', winner === 'me')
                  )}
                  style={{ width: `${myPercent}%` }}
                />
              </div>
            </div>

            {/* 친구 */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-neutral-600">{friendProfile.user.nickname}</span>
                <span
                  className={cn(
                    'text-sm font-bold',
                    getColorClass('text', winner === 'friend')
                  )}
                >
                  {friendValue} {unit}
                  {winner === 'friend' && ' 🏆'}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    getColorClass('bg', winner === 'friend')
                  )}
                  style={{ width: `${friendPercent}%` }}
                />
              </div>
            </div>

            {/* 동점 표시 */}
            {winner === 'tie' && (
              <div className="mt-2 text-center text-xs text-neutral-500">
                동점! 🤝
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
