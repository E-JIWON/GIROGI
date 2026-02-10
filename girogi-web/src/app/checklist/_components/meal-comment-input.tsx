/**
 * 식사 한줄평 입력 컴포넌트
 *
 * 간단한 텍스트 입력
 * 선택사항
 */

'use client';

import { cn } from '@/lib/utils';

export interface MealCommentInputProps {
  comment: string;
  onCommentChange: (comment: string) => void;
}

export function MealCommentInput({ comment, onCommentChange }: MealCommentInputProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-neutral-700">
        한 줄 평가 <span className="text-neutral-400">(선택)</span>
      </h3>
      <textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder="예: 제육볶음 맛있었음 ㅎㅎ"
        maxLength={100}
        rows={3}
        className={cn(
          'w-full rounded-lg border-2 border-neutral-200 px-4 py-3 text-sm outline-none',
          'placeholder:text-neutral-400',
          'focus:border-primary-300 focus:ring-2 focus:ring-primary-100',
          'resize-none'
        )}
      />
      <p className="mt-1 text-right text-xs text-neutral-400">
        {comment.length}/100
      </p>
    </div>
  );
}
