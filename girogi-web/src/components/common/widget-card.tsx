/** @desc 위젯 카드 래퍼 - 책상 위에 떠있는 반투명 종이 카드 (bongchil-diary DashCard 결) */

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

export const WIDGET_CARD_CLASS =
  'rounded-2xl border border-border/50 bg-surface/75 shadow-[0_2px_14px_rgb(var(--shadow-ink)/0.04)] backdrop-blur-sm';

export function WidgetCard({
  title,
  action,
  span = 1,
  className,
  noPadding = false,
  children,
}: WidgetCardProps) {
  return (
    <div className={cn(WIDGET_CARD_CLASS, !noPadding && 'p-5', SPAN_CLASSES[span], className)}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-tight text-ink-2">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
