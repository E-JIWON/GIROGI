/**
 * 주간 진행도 컴포넌트
 *
 * 이번 주 기록 진행률 시각화
 * - 원형 프로그레스
 * - 퍼센트 표시
 * - 간단한 통계
 */

'use client';

import { useStreakStore } from '@/stores/streakStore';
import { cn } from '@/lib/utils';

export interface WeeklyProgressProps {
  className?: string;
}

export function WeeklyProgress({ className }: WeeklyProgressProps) {
  const { getWeeklyStats } = useStreakStore();
  const weeklyStats = getWeeklyStats();

  const { recordedDays, totalDays, percentage } = weeklyStats;

  // 원형 프로그레스 바 계산
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // 색상 결정
  const getColorClass = () => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 50) return 'text-blue-500';
    if (percentage >= 30) return 'text-yellow-500';
    return 'text-neutral-400';
  };

  const getStrokeColor = () => {
    if (percentage >= 80) return '#22c55e'; // green-500
    if (percentage >= 50) return '#3b82f6'; // blue-500
    if (percentage >= 30) return '#eab308'; // yellow-500
    return '#a3a3a3'; // neutral-400
  };

  return (
    <div className={cn('rounded-lg border border-neutral-200 bg-white p-6', className)}>
      {/* 헤더 */}
      <h3 className="mb-4 text-base font-semibold text-neutral-700">이번 주 진행도</h3>

      {/* 원형 프로그레스 */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg className="h-32 w-32 -rotate-90 transform">
            {/* 배경 원 */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-neutral-100"
            />
            {/* 진행도 원 */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={getStrokeColor()}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* 중앙 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-3xl font-bold', getColorClass())}>{percentage}%</span>
            <span className="text-xs text-neutral-500">
              {recordedDays}/{totalDays}일
            </span>
          </div>
        </div>
      </div>

      {/* 메시지 */}
      <div className="mt-4 text-center">
        {percentage === 100 && (
          <p className="text-sm font-medium text-green-600">
            🎉 완벽한 한 주를 보냈어요!
          </p>
        )}
        {percentage >= 80 && percentage < 100 && (
          <p className="text-sm font-medium text-blue-600">
            💪 거의 다 왔어요! 조금만 더!
          </p>
        )}
        {percentage >= 50 && percentage < 80 && (
          <p className="text-sm font-medium text-yellow-600">
            👍 절반 이상 달성! 계속 가볼까요?
          </p>
        )}
        {percentage < 50 && recordedDays > 0 && (
          <p className="text-sm font-medium text-neutral-600">
            시작이 반이에요! 화이팅! 💚
          </p>
        )}
        {recordedDays === 0 && (
          <p className="text-sm font-medium text-neutral-500">
            이번 주 첫 기록을 시작해보세요 ✨
          </p>
        )}
      </div>
    </div>
  );
}
