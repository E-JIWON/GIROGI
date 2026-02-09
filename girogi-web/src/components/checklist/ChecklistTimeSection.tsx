/**
 * ChecklistTimeSection 컴포넌트
 *
 * 시간대별 체크리스트 섹션 (아침/점심/저녁/운동)
 * - 시간대 아이콘 + 라벨 + 완료 카운터
 * - 체크리스트 항목 리스트 (When-Where-What 형식)
 * - 완료 항목 취소선 + 회색 처리
 *
 * Flutter: lib/presentation/widgets/checklist/checklist_time_section.dart
 */

import { Check } from 'lucide-react';
import { MealTime } from '@/types/enums';
import { cn } from '@/lib/utils';

interface ChecklistItemDisplay {
  title: string;
  isChecked: boolean;
  when?: string;
  where?: string;
  what?: string;
  icon?: string;
}

interface ChecklistTimeSectionProps {
  /**
   * 시간대 (아침/점심/저녁/운동)
   */
  mealTime: MealTime;
  /**
   * 체크리스트 항목 배열
   */
  items: ChecklistItemDisplay[];
  /**
   * 체크박스 토글 콜백
   */
  onToggle: (index: number) => void;
}

/** 시간대별 아이콘 매핑 */
const getMealTimeIcon = (mealTime: MealTime): string => {
  const icons = {
    [MealTime.BREAKFAST]: '🌅',
    [MealTime.LUNCH]: '☀️',
    [MealTime.DINNER]: '🌙',
    [MealTime.SNACK]: '🍪',
  };
  return icons[mealTime] || '🏃'; // 운동은 이모지 대신 lucide-react 사용
};

/** 시간대별 색상 매핑 (Tailwind 클래스) */
const getMealTimeColor = (mealTime: MealTime): string => {
  const colors = {
    [MealTime.BREAKFAST]: 'orange-500',
    [MealTime.LUNCH]: 'amber-500',
    [MealTime.DINNER]: 'purple-600',
    [MealTime.SNACK]: 'pink-500',
  };
  return colors[mealTime] || 'blue-500'; // 운동 = 파랑
};

export function ChecklistTimeSection({
  mealTime,
  items,
  onToggle,
}: ChecklistTimeSectionProps) {
  // 완료된 항목 개수 계산
  const completedCount = items.filter((item) => item.isChecked).length;
  const totalCount = items.length;

  // 시간대 색상
  const colorClass = getMealTimeColor(mealTime);
  const bgColorClass = `bg-${colorClass}/10`;
  const textColorClass = `text-${colorClass}`;
  const borderColorClass = `border-${colorClass}`;

  return (
    <div className="rounded-lg bg-[#fafafa] p-6">
      {/* 헤더 (아이콘 + 시간대 + 완료 카운터) */}
      <div className="mb-3 flex items-center gap-3">
        {/* 아이콘 원형 컨테이너 */}
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            bgColorClass
          )}
        >
          <span className="text-xl">{getMealTimeIcon(mealTime)}</span>
        </div>

        {/* 시간대 라벨 */}
        <h3 className="flex-1 text-base font-semibold text-neutral-900">
          {mealTime === MealTime.BREAKFAST && '아침'}
          {mealTime === MealTime.LUNCH && '점심'}
          {mealTime === MealTime.DINNER && '저녁'}
        </h3>

        {/* 완료 카운터 */}
        <span
          className={cn(
            'rounded-full px-3 py-1 text-sm font-semibold',
            bgColorClass,
            textColorClass
          )}
        >
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* 체크리스트 항목 리스트 */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onToggle(index)}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded p-3 transition-all',
              'hover:bg-neutral-50 active:scale-[0.99]',
              item.isChecked && 'opacity-60'
            )}
          >
            {/* 커스텀 체크박스 */}
            <div
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all',
                item.isChecked
                  ? `bg-${colorClass}`
                  : 'bg-neutral-200'
              )}
            >
              {item.isChecked && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
            </div>

            {/* 아이콘 (선택사항) */}
            {item.icon && (
              <span className="text-xl shrink-0">{item.icon}</span>
            )}

            {/* 체크리스트 제목 (When-Where-What 형식) */}
            <div className="flex-1">
              {item.when || item.where || item.what ? (
                // When-Where-What 구조화된 형식
                <div
                  className={cn(
                    'text-base transition-all',
                    item.isChecked ? 'text-neutral-500 line-through' : 'text-neutral-900'
                  )}
                >
                  {item.when && (
                    <span className="font-semibold text-primary-500">🕐 {item.when}</span>
                  )}
                  {item.when && (item.where || item.what) && <span> 에 </span>}
                  {item.where && (
                    <span className="font-semibold text-success-500">📍 {item.where}</span>
                  )}
                  {item.where && item.what && <span> 에서 </span>}
                  {item.what && <span>{item.what}</span>}
                </div>
              ) : (
                // 레거시 형식 (title만)
                <span
                  className={cn(
                    'text-base transition-all',
                    item.isChecked ? 'text-neutral-500 line-through' : 'text-neutral-900'
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
