/**
 * ComparisonChart 컴포넌트
 *
 * 듀오링고 스타일 친구 비교 차트
 * - 가로 막대 그래프로 친구들과 통계 비교
 * - 4가지 타입: 연속 성공 일수, 전체 성공률, 주간 성공 일수, 총 다이어트 일수
 * - 1등 강조 (그라데이션)
 * - 순위 표시
 *
 * Flutter: lib/presentation/widgets/common/comparison_chart.dart
 */

import { Trophy, TrendingUp } from 'lucide-react';
import type { User, UserStats } from '@/types/models';
import { cn } from '@/lib/utils';

/**
 * 비교 타입
 */
export type ComparisonType =
  | 'streak' // 연속 성공 일수
  | 'successRate' // 전체 성공률
  | 'weeklySuccess' // 주간 성공 일수
  | 'totalDays'; // 총 다이어트 일수

interface ComparisonChartProps {
  /**
   * 비교 타입
   */
  type: ComparisonType;
  /**
   * 사용자 및 통계 목록 (본인 + 친구들)
   */
  userStats: Array<{
    user: User;
    stats: UserStats;
  }>;
  /**
   * 현재 로그인한 사용자 ID
   */
  currentUserId: string;
}

/**
 * 비교 타입별 설정
 */
const COMPARISON_CONFIG = {
  streak: {
    title: '연속 성공 일수',
    unit: '일',
    icon: Trophy,
    getValue: (stats: UserStats) => stats.currentStreak,
  },
  successRate: {
    title: '전체 성공률',
    unit: '%',
    icon: TrendingUp,
    getValue: (stats: UserStats) => {
      if (stats.totalDays === 0) return 0;
      return Math.round((stats.successDays / stats.totalDays) * 100);
    },
  },
  weeklySuccess: {
    title: '주간 성공 일수',
    unit: '일',
    icon: Trophy,
    getValue: (stats: UserStats) => stats.weeklySuccessDays,
  },
  totalDays: {
    title: '총 다이어트 일수',
    unit: '일',
    icon: TrendingUp,
    getValue: (stats: UserStats) => stats.totalDays,
  },
} as const;

export function ComparisonChart({
  type,
  userStats,
  currentUserId,
}: ComparisonChartProps) {
  const config = COMPARISON_CONFIG[type];
  const Icon = config.icon;

  // 값 추출 및 정렬 (높은 순)
  const sortedData = userStats
    .map((item) => ({
      user: item.user,
      value: config.getValue(item.stats),
    }))
    .sort((a, b) => b.value - a.value);

  // 최대값 (막대 길이 계산용)
  const maxValue = Math.max(...sortedData.map((item) => item.value), 1);

  return (
    <div className="rounded-lg border border-grey-200 bg-white p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-grey-900">{config.title}</h3>
      </div>

      {/* 차트 */}
      <div className="space-y-4">
        {sortedData.map((item, index) => {
          const rank = index + 1;
          const isFirstPlace = rank === 1;
          const isCurrentUser = item.user.id === currentUserId;
          const percentage = (item.value / maxValue) * 100;

          return (
            <div key={item.user.id} className="space-y-2">
              {/* 사용자 정보 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* 순위 */}
                  <div
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                      isFirstPlace
                        ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
                        : 'bg-grey-200 text-grey-700'
                    )}
                  >
                    {rank}
                  </div>

                  {/* 프로필 이미지 */}
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary">
                    {item.user.profileImageUrl ? (
                      <img
                        src={item.user.profileImageUrl}
                        alt={item.user.nickname}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-white">
                        {item.user.nickname[0].toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* 닉네임 */}
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isCurrentUser ? 'text-primary' : 'text-grey-900'
                    )}
                  >
                    {item.user.nickname}
                    {isCurrentUser && ' (나)'}
                  </span>
                </div>

                {/* 값 */}
                <div className="flex items-baseline gap-1">
                  <span
                    className={cn(
                      'text-lg font-bold',
                      isFirstPlace ? 'text-amber-600' : 'text-grey-900'
                    )}
                  >
                    {item.value}
                  </span>
                  <span className="text-xs text-grey-600">{config.unit}</span>
                </div>
              </div>

              {/* 진행률 바 */}
              <div className="h-3 overflow-hidden rounded-full bg-grey-100">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    isFirstPlace
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                      : isCurrentUser
                        ? 'bg-primary'
                        : 'bg-grey-400'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 빈 상태 */}
      {sortedData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <Icon className="h-12 w-12 text-grey-400" />
          <p className="mt-3 text-sm text-grey-500">비교할 친구가 없습니다</p>
          <p className="mt-1 text-xs text-grey-400">친구를 팔로우해보세요</p>
        </div>
      )}
    </div>
  );
}
