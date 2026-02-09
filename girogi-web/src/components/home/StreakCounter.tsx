/**
 * StreakCounter 컴포넌트
 *
 * 연속 성공 일수를 강조하여 표시하는 카운터 위젯
 * 도파민 자극을 위한 그라데이션 배경과 큰 숫자 표시
 *
 * Flutter: lib/presentation/widgets/home/streak_counter.dart
 */

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
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-streak p-6">
      {/* 상단 라벨 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">연속 성공</h3>
        <Flame className="h-6 w-6 text-white" />
      </div>

      {/* 현재 Streak 숫자 (강조) */}
      <div className="text-center">
        <p className="text-6xl font-bold text-white leading-none">
          {currentStreak}
          <span className="text-3xl">일</span>
        </p>
      </div>

      {/* 최고 기록 표시 */}
      {bestStreak > 0 && (
        <div className="mt-2 flex justify-center">
          <div className="rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm">
            <p className="text-sm font-medium text-white">
              최고 기록: {bestStreak}일
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
