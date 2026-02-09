/**
 * WeeklyCalendar 컴포넌트
 *
 * 주간 성공률을 캘린더 형태로 시각화
 * 최근 7일간의 성공/실패 기록을 표시
 *
 * Flutter: lib/presentation/widgets/home/weekly_calendar.dart
 */

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeeklyCalendarProps {
  /**
   * 주간 성공 기록 (7일)
   * true: 성공, false: 실패, null: 미래 날짜
   */
  weeklyRecords: (boolean | null)[];
}

/** 요일 라벨 */
const WEEKDAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

export function WeeklyCalendar({ weeklyRecords }: WeeklyCalendarProps) {
  // 성공률 계산 (백분율)
  const calculateSuccessRate = (): number => {
    const completedDays = weeklyRecords.filter((record) => record !== null);
    if (completedDays.length === 0) return 0;

    const successDays = completedDays.filter((record) => record === true).length;
    return Math.round((successDays / completedDays.length) * 100);
  };

  const successRate = calculateSuccessRate();

  return (
    <div className="rounded-lg bg-[#fafafa] p-6">
      {/* 타이틀 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-900">이번 주 기록</h3>
        <p className="text-base font-semibold text-success-800">{successRate}%</p>
      </div>

      {/* 캘린더 그리드 */}
      <div className="flex justify-around gap-2">
        {weeklyRecords.map((isSuccess, index) => (
          <DayColumn
            key={index}
            label={WEEKDAY_LABELS[index]}
            isSuccess={isSuccess}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 일별 컬럼 컴포넌트
 */
interface DayColumnProps {
  label: string;
  isSuccess: boolean | null;
}

function DayColumn({ label, isSuccess }: DayColumnProps) {
  // 인디케이터 색상 결정
  const getIndicatorClass = (): string => {
    if (isSuccess === null) {
      return 'bg-neutral-100'; // 미래
    }
    return isSuccess
      ? 'bg-success' // 성공
      : 'bg-error'; // 실패
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* 요일 라벨 */}
      <span className="text-xs font-medium text-neutral-700">{label}</span>

      {/* 성공/실패 인디케이터 */}
      <div
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full transition-all',
          getIndicatorClass()
        )}
      >
        {isSuccess !== null && (
          <>
            {isSuccess ? (
              <Check className="h-5 w-5 text-white" strokeWidth={3} />
            ) : (
              <X className="h-5 w-5 text-white" strokeWidth={3} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
