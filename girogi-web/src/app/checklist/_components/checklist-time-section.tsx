'use client';

/** @desc 시간대별 체크리스트 섹션 (Implementation Intention) */

import { Check } from 'lucide-react';

import { TimeSlot, TimeSlotDisplayNames, TimeSlotIcons } from '@/types/enums';
import { cn } from '@/lib/utils';
import { TIME_SLOT_COLORS } from '@/lib/constants';

interface ChecklistItemDisplay {
  id: string;
  title: string;
  isChecked: boolean;
  when?: string;
  where?: string;
  what?: string;
  icon?: string;
}

interface ChecklistTimeSectionProps {
  /** 시간대 슬롯 (아침/점심/퇴근/저녁/운동) */
  timeSlot: TimeSlot;
  /** 체크리스트 항목 배열 */
  items: ChecklistItemDisplay[];
  /** 체크박스 토글 콜백 (항목 id 기반) */
  onToggle: (id: string) => void;
}

export function ChecklistTimeSection({
  timeSlot,
  items,
  onToggle,
}: ChecklistTimeSectionProps) {
  const completedCount = items.filter((item) => item.isChecked).length;
  const totalCount = items.length;

  const colorClasses = TIME_SLOT_COLORS[timeSlot];

  return (
    <div className={cn('rounded-lg p-6', colorClasses.bg)}>
      {/* 헤더 (아이콘 + 시간대 + 완료 카운터) */}
      <div className="mb-3 flex items-center gap-3">
        {/* 아이콘 원형 컨테이너 */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60">
          <span className="text-xl">{TimeSlotIcons[timeSlot]}</span>
        </div>

        {/* 시간대 라벨 */}
        <h3 className="flex-1 text-base font-semibold text-neutral-900">
          {TimeSlotDisplayNames[timeSlot]}
        </h3>

        {/* 완료 카운터 */}
        <span className={cn('rounded-full bg-white/60 px-3 py-1 text-sm font-semibold', colorClasses.text)}>
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* 체크리스트 항목 리스트 */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded p-3 transition-all',
              'hover:bg-white/60 active:scale-[0.99]',
              item.isChecked && 'opacity-60'
            )}
          >
            {/* 커스텀 체크박스 */}
            <div
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all',
                item.isChecked ? colorClasses.checkbox : 'bg-white/80',
              )}>
              {item.isChecked && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
            </div>

            {/* 아이콘 (선택사항) */}
            {item.icon && (
              <span className="text-xl shrink-0">{item.icon}</span>
            )}

            {/* 체크리스트 제목 (When-Where-What 형식) */}
            <div className="flex-1">
              {item.when || item.where || item.what ? (
                <div
                  className={cn(
                    'text-base transition-all',
                    item.isChecked ? 'text-neutral-700 line-through' : 'text-neutral-900'
                  )}
                >
                  {item.when && (
                    <span className="font-semibold text-primary-800">🕐 {item.when}</span>
                  )}
                  {item.when && (item.where || item.what) && <span> 에 </span>}
                  {item.where && (
                    <span className="font-semibold text-success-800">📍 {item.where}</span>
                  )}
                  {item.where && item.what && <span> 에서 </span>}
                  {item.what && <span>{item.what}</span>}
                </div>
              ) : (
                <span
                  className={cn(
                    'text-base transition-all',
                    item.isChecked ? 'text-neutral-700 line-through' : 'text-neutral-900'
                  )}
                >
                  {item.title}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
