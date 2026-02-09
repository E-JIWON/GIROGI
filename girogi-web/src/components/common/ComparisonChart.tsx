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
import type { User, UserStats } from '@/types';
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
      // weeklyProgress 배열의 평균을 성공률로 사용
      if (stats.weeklyProgress.length === 0) return 0;
      const sum = stats.weeklyProgress.reduce((a, b) => a + b, 0);
      return Math.round((sum / stats.weeklyProgress.length) * 100);
    },
  },
  weeklySuccess: {
    title: '주간 성공 일수',
    unit: '일',
    icon: Trophy,
    getValue: (stats: UserStats) => {
      // 최근 주의 성공률을 일수로 변환 (7일 * 성공률)
      if (stats.weeklyProgress.length === 0) return 0;
      const recentWeek = stats.weeklyProgress[stats.weeklyProgress.length - 1];
      return Math.round(recentWeek * 7);
    },
  },
  totalDays: {
    title: '총 성공 일수',
    unit: '일',
    icon: TrendingUp,
    getValue: (stats: UserStats) => stats.totalSuccessDays,
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
    <div className="rounded-md border border-grey-200 bg-white p-6">
      {/* 헤더 */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900">{config.title}</h3>
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
                        : 'bg-neutral-200 text-neutral-700'
                    )}
                  >
                    {rank}
                  </div>

                  {/* 프로필 이미지 */}
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary">
                    {item.user.profileImage ? (
                      <img
                        src={item.user.profileImage}
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
                      isCurrentUser ? 'text-primary' : 'text-neutral-900'
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
                      isFirstPlace ? 'text-amber-600' : 'text-neutral-900'
                    )}
                  >
                    {item.value}
                  </span>
                  <span className="text-xs text-neutral-600">{config.unit}</span>
                </div>
              </div>

              {/* 진행률 바 */}
              <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    isFirstPlace
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                      : isCurrentUser
                        ? 'bg-primary'
                        : 'bg-neutral-400'
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
          <Icon className="h-12 w-12 text-neutral-400" />
          <p className="mt-3 text-sm text-neutral-500">비교할 친구가 없습니다</p>
          <p className="mt-1 text-xs text-neutral-400">친구를 팔로우해보세요</p>
        </div>
      )}
    </div>
  );
}
