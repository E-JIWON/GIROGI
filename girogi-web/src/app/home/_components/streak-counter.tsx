'use client';

/** @desc 연속 성공 일수 카운터 */

import { Flame } from 'lucide-react';

interface StreakCounterProps {
  /**
   * 현재 연속 성공 일수
   */
  currentStreak: number;
  /**
   * 최고 연속 성공 일수
   */
  bestStreak: number;
}

export function StreakCounter({ currentStreak, bestStreak }: StreakCounterProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-streak p-6">
      {/* 상단 라벨 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-900">연속 성공</h3>
        <Flame className="h-6 w-6 text-peach-700" />
      </div>

      {/* 현재 Streak 숫자 (강조) */}
      <div className="text-center">
        <p className="text-6xl font-bold text-neutral-900 leading-none">
          {currentStreak}
          <span className="text-3xl">일</span>
        </p>
      </div>

      {/* 최고 기록 표시 */}
      {bestStreak > 0 && (
        <div className="mt-2 flex justify-center">
          <div className="rounded-full bg-neutral-900/10 px-3 py-1.5">
            <p className="text-sm font-medium text-neutral-800">
              최고 기록: {bestStreak}일
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
