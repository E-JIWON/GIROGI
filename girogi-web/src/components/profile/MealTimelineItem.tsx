/**
 * MealTimelineItem 컴포넌트
 *
 * 프로필 화면의 식사 타임라인 항목
 * - 왼쪽: 시간 + 타임라인 점 + 연결선
 * - 오른쪽: 식사 정보 카드
 * - 식사 시간대별 색상 구분 (아침=주황, 점심=황갈색, 저녁=보라)
 *
 * Flutter: lib/presentation/widgets/profile/meal_timeline_item.dart
 */

import { Utensils, Home, ShoppingBag } from 'lucide-react';
import type { MealRecord } from '@/types/models';
import { MealTime, MealPlace } from '@/types/enums';
import { cn } from '@/lib/utils';

interface MealTimelineItemProps {
  /**
   * 식사 기록 데이터
   */
  mealRecord: MealRecord;
  /**
   * 마지막 항목 여부 (타임라인 연결선 제거)
   */
  isLast?: boolean;
}

/**
 * 식사 시간대별 색상 설정
 */
const MEAL_TIME_COLORS = {
  breakfast: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
    dot: 'bg-orange-500',
  },
  lunch: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-300',
    dot: 'bg-amber-500',
  },
  dinner: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
    dot: 'bg-purple-500',
  },
  snack: {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    border: 'border-pink-300',
    dot: 'bg-pink-500',
  },
} as const;

/**
 * 식사 시간대 한글명
 */
const MEAL_TIME_LABELS = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  snack: '간식',
} as const;

export function MealTimelineItem({ mealRecord, isLast = false }: MealTimelineItemProps) {
  const colors = MEAL_TIME_COLORS[mealRecord.mealTime];
  const mealLabel = MEAL_TIME_LABELS[mealRecord.mealTime];

  // 시간 포맷 (HH:MM)
  const timeString = new Date(mealRecord.createdAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="flex gap-4">
      {/* 왼쪽: 타임라인 */}
      <div className="flex flex-col items-center">
        {/* 시간 배지 */}
        <div
          className={cn(
            'mb-2 rounded-full px-3 py-1 text-xs font-semibold',
            colors.bg,
            colors.text
          )}
        >
          {timeString}
        </div>

        {/* 타임라인 점 */}
        <div
          className={cn(
            'h-3 w-3 rounded-full border-2 border-white',
            colors.dot
          )}
        />

        {/* 연결선 (마지막 항목이 아닐 때만) */}
        {!isLast && (
          <div className="h-full w-0.5 flex-1 bg-grey-200" />
        )}
      </div>

      {/* 오른쪽: 식사 정보 카드 */}
      <div className="mb-6 flex-1">
        <div className="overflow-hidden rounded-lg border border-grey-200 bg-white shadow-sm">
          {/* 식사 시간대 + 장소 헤더 */}
          <div className={cn('flex items-center justify-between border-b px-4 py-3', colors.border)}>
            <div className="flex items-center gap-2">
              <Utensils className={cn('h-5 w-5', colors.text)} />
              <span className={cn('text-sm font-semibold', colors.text)}>
                {mealLabel}
              </span>
            </div>

            {/* 장소 태그 */}
            <div className="flex items-center gap-1.5 text-xs text-grey-600">
              {mealRecord.place === MealPlace.HOME ? (
                <>
                  <Home className="h-4 w-4" />
                  <span>집밥</span>
                </>
              ) : mealRecord.place === MealPlace.RESTAURANT ? (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>외식</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>배달</span>
                </>
              )}
            </div>
          </div>

          {/* 식사 사진 */}
          {mealRecord.imageUrl && (
            <div className="relative h-40 overflow-hidden">
              <img
                src={mealRecord.imageUrl}
                alt={`${mealLabel} 식사`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* 식사 내용 */}
          <div className="p-4">
            {/* 메뉴 */}
            {mealRecord.menu && (
              <p className="mb-3 text-base text-grey-900">{mealRecord.menu}</p>
            )}

            {/* 준수 행동 태그 */}
            {mealRecord.achievements && mealRecord.achievements.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {mealRecord.achievements.map((behavior, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {behavior}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
