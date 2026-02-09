/**
 * MealRecordButton 컴포넌트
 *
 * 식사 기록 버튼
 * - 미기록: 흰색 카드 + 레스토랑 아이콘 + "기록하기"
 * - 기록 완료: 초록색 카드 + 체크 아이콘 + "기록 완료"
 * - 클릭 시 식사 기록 상세 페이지로 이동 (또는 다이얼로그)
 *
 * Flutter: lib/presentation/widgets/checklist/meal_record_button.dart
 */

import { CheckCircle2, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MealRecordButtonProps {
  /**
   * 식사 라벨 (예: "아침", "점심", "저녁")
   */
  mealLabel: string;
  /**
   * 식사 기록 여부
   */
  hasRecord: boolean;
  /**
   * 클릭 콜백 (식사 기록 페이지로 이동)
   */
  onTap: () => void;
}

export function MealRecordButton({
  mealLabel,
  hasRecord,
  onTap,
}: MealRecordButtonProps) {
  return (
    <div
      onClick={onTap}
      className={cn(
        'cursor-pointer rounded-md border p-4 transition-all',
        'hover:shadow-md',
        hasRecord
          ? 'border-success/20 bg-success/5'
          : 'border-grey-200 bg-white'
      )}
    >
      <div className="flex items-center gap-3">
        {/* 아이콘 (원형 컨테이너) */}
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
            hasRecord ? 'bg-success' : 'bg-primary/10'
          )}
        >
          {hasRecord ? (
            <CheckCircle2 className="h-6 w-6 text-white" strokeWidth={2.5} />
          ) : (
            <UtensilsCrossed className="h-6 w-6 text-primary" strokeWidth={2} />
          )}
        </div>

        {/* 텍스트 정보 */}
        <div className="flex-1">
          {/* 메인 텍스트 */}
          <p
            className={cn(
              'text-base font-semibold',
              hasRecord ? 'text-success' : 'text-neutral-900'
            )}
          >
            {hasRecord ? `${mealLabel} 기록 완료` : `${mealLabel} 기록하기`}
          </p>

          {/* 서브 텍스트 */}
          <p className="mt-1 text-sm text-neutral-600">
            {hasRecord
              ? '상세 보기 또는 수정'
              : '사진, 장소, 메뉴, 준수 행동 기록'}
          </p>
        </div>

        {/* 화살표 아이콘 (오른쪽) */}
        <div className="shrink-0">
          <svg
            className="h-5 w-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
