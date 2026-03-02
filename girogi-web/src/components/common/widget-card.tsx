/** @desc 위젯 카드 래퍼 - 대시보드 그리드용 */

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  /** 위젯 제목 */
  title?: string;
  /** 우상단 액션 영역 */
  action?: ReactNode;
  /** 그리드 span: 1 = 1열, 2 = 2열, 3 = 전체 너비 */
  span?: 1 | 2 | 3;
  /** 추가 className */
  className?: string;
  /** 내부 패딩 제거 (자체 패딩이 있는 컴포넌트용) */
  noPadding?: boolean;
  children: ReactNode;
}

const SPAN_CLASSES = {
  1: '',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
} as const;

export function WidgetCard({
  title,
  action,
  span = 1,
  className,
  noPadding = false,
  children,
}: WidgetCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white',
        !noPadding && 'p-6',
        SPAN_CLASSES[span],
        className
      )}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-800">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
