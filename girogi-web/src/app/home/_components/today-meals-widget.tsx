'use client';

/** @desc 오늘의 식사 기록 위젯 (홈 대시보드용) */

import { UtensilsCrossed, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MealTime, MealTimeDisplayNames } from '@/types/enums';
import { MealPlaceDisplayNames } from '@/types/enums';
import { useMealRecordStore } from '@/stores/mealRecordStore';
import { cn } from '@/lib/utils';

const MEAL_SLOTS: { mealTime: MealTime; icon: string }[] = [
  { mealTime: MealTime.BREAKFAST, icon: '🌅' },
  { mealTime: MealTime.LUNCH, icon: '🌞' },
  { mealTime: MealTime.DINNER, icon: '🌙' },
];

export function TodayMealsWidget() {
  const store = useMealRecordStore();
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayRecords = store.getRecordsByDate(todayStr);

  const recordedCount = MEAL_SLOTS.filter((slot) =>
    todayRecords.some((r) => r.mealTime === slot.mealTime)
  ).length;

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-800">오늘의 식사</h3>
        <Link
          href="/checklist"
          className="flex items-center gap-1 text-sm text-primary-700 hover:text-primary-800"
        >
          기록하기
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* 식사 목록 */}
      <div className="space-y-3">
        {MEAL_SLOTS.map(({ mealTime, icon }) => {
          const record = todayRecords.find((r) => r.mealTime === mealTime);
          const hasRecord = !!record;

          return (
            <div
              key={mealTime}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2',
                hasRecord ? 'bg-success/5' : 'bg-neutral-50'
              )}
            >
              <span className="text-lg">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-medium',
                  hasRecord ? 'text-success-700' : 'text-neutral-500'
                )}>
                  {MealTimeDisplayNames[mealTime]}
                </p>
                {hasRecord && record && (
                  <p className="text-xs text-neutral-500 truncate">
                    {MealPlaceDisplayNames[record.place]} · {record.menu}
                  </p>
                )}
              </div>
              {hasRecord ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <UtensilsCrossed className="h-4 w-4 shrink-0 text-neutral-300" />
              )}
            </div>
          );
        })}
      </div>

      {/* 요약 */}
      <div className="mt-3 text-center">
        <p className="text-xs text-neutral-500">
          오늘 <span className="font-semibold text-neutral-700">{recordedCount}/3</span> 기록 완료
        </p>
      </div>
    </div>
  );
}
