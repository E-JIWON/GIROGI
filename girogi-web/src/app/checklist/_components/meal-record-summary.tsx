'use client';

/** @desc 식사 기록 완료 후 인라인 요약 카드 */

import { MealPlaceDisplayNames, MealPlaceIcons } from '@/types/enums';
import type { MealRecord } from '@/types/models';

interface MealRecordSummaryProps {
  record: MealRecord;
}

export function MealRecordSummary({ record }: MealRecordSummaryProps) {
  return (
    <div className="rounded-md border border-neutral-100 bg-neutral-50 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* 장소 */}
        <span className="text-lg">{MealPlaceIcons[record.place]}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-800 truncate">
            {record.menu}
          </p>
          <p className="text-xs text-neutral-500">
            {MealPlaceDisplayNames[record.place]}
            {record.rating && (
              <span className="ml-2">
                {'⭐'.repeat(record.rating)}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
