/**
 * 스트릭 위젯
 *
 * 듀오링고 스타일 연속 기록 표시
 * - 🔥 현재 스트릭
 * - 📊 총 기록 일수
 * - 📅 이번 주 7일 체크박스
 */

'use client';

import { Flame, Calendar, Award } from 'lucide-react';
import { useStreakStore } from '@/stores/streakStore';
import { cn } from '@/lib/utils';

export interface StreakWidgetProps {
  className?: string;
}

export function StreakWidget({ className }: StreakWidgetProps) {
  const { streakData, getWeeklyStats } = useStreakStore();
  const weeklyStats = getWeeklyStats();

  const { currentStreak, longestStreak, totalDays, weeklyStatus } = streakData;

  // 요일 레이블 (월~일)
  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className={cn('rounded-lg border border-neutral-200 bg-white p-6', className)}>
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-neutral-700">연속 기록</h2>
        {currentStreak > 0 && (
          <div className="flex items-center gap-1 text-orange-500">
            <Flame className="h-5 w-5 fill-orange-500" />
            <span className="text-lg font-bold">{currentStreak}일</span>
          </div>
        )}
      </div>

      {/* 주간 체크박스 */}
      <div className="mb-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const isRecorded = weeklyStatus[index];
            return (
              <div key={day} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-all',
                    isRecorded
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-neutral-50'
                  )}
                >
                  {isRecorded ? (
                    <svg
                      className="h-5 w-5 text-primary-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-neutral-300" />
                  )}
                </div>
                <span className="text-xs text-neutral-500">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-4 rounded-lg bg-neutral-50 p-4">
        {/* 이번 주 */}
        <div className="flex flex-col items-center gap-1">
          <Calendar className="h-4 w-4 text-neutral-400" />
          <span className="text-xs text-neutral-500">이번 주</span>
          <span className="text-base font-semibold text-neutral-700">
            {weeklyStats.recordedDays}/7
          </span>
        </div>

        {/* 최장 스트릭 */}
        <div className="flex flex-col items-center gap-1 border-x border-neutral-200">
          <Award className="h-4 w-4 text-neutral-400" />
          <span className="text-xs text-neutral-500">최장</span>
          <span className="text-base font-semibold text-neutral-700">{longestStreak}일</span>
        </div>

        {/* 총 기록 */}
        <div className="flex flex-col items-center gap-1">
          <Flame className="h-4 w-4 text-neutral-400" />
          <span className="text-xs text-neutral-500">총 기록</span>
          <span className="text-base font-semibold text-neutral-700">{totalDays}일</span>
        </div>
      </div>

      {/* 격려 메시지 */}
      {currentStreak === 0 && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-700">오늘 기록을 시작해볼까요? 🎯</p>
        </div>
      )}

      {currentStreak >= 7 && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-sm text-green-700">
            🎉 {currentStreak}일 연속! 대단해요!
          </p>
        </div>
      )}

      {currentStreak >= 30 && (
        <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-3">
          <p className="text-sm text-purple-700">
            👑 {currentStreak}일 연속! 습관의 달인이에요!
          </p>
        </div>
      )}
    </div>
  );
}
