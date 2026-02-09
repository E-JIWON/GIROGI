/**
 * MissionCard 컴포넌트
 *
 * 일일 핵심 미션을 표시하는 카드
 * 3개 미션 중 2개 이상 달성 시 성공일로 인정됨
 *
 * Tiny Habits 이론 적용: 작은 행동 단위로 구성
 * Flutter: lib/presentation/widgets/home/mission_card.dart
 */

import { Check, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  /**
   * 미션 제목
   */
  title: string;
  /**
   * 미션 설명
   */
  description: string;
  /**
   * 완료 여부
   */
  isCompleted: boolean;
  /**
   * 아이콘 컴포넌트 (lucide-react)
   */
  icon: LucideIcon;
  /**
   * 클릭 핸들러 (체크/언체크)
   */
  onTap?: () => void;
}

export function MissionCard({
  title,
  description,
  isCompleted,
  icon: Icon,
  onTap,
}: MissionCardProps) {
  return (
    <div
      onClick={onTap}
      className={cn(
        'rounded-md bg-[#fafafa] p-4 transition-all cursor-pointer',
        'hover:scale-[1.01] active:scale-[0.99]',
        isCompleted && 'bg-success-50'
      )}
    >
      <div className="flex items-center gap-4">
        {/* 체크박스 또는 아이콘 */}
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors',
            isCompleted
              ? 'bg-success-500 text-white'
              : 'bg-neutral-200 text-neutral-700'
          )}
        >
          {isCompleted ? (
            <Check className="h-7 w-7" strokeWidth={3} />
          ) : (
            <Icon className="h-7 w-7" />
          )}
        </div>

        {/* 미션 정보 */}
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              'text-base font-semibold leading-tight transition-all',
              isCompleted
                ? 'text-success-800 line-through'
                : 'text-neutral-900'
            )}
          >
            {title}
          </h4>
          <p className="mt-1 text-sm text-neutral-700 leading-tight">
            {description}
          </p>
        </div>

        {/* 화살표 아이콘 (미완료 시만 표시) */}
        {!isCompleted && (
          <ChevronRight className="h-6 w-6 shrink-0 text-neutral-700" />
        )}
      </div>
    </div>
  );
}
