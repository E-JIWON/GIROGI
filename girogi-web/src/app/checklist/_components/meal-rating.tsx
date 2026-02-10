/**
 * 식사 만족도 별점 컴포넌트
 *
 * 1-5점 별점
 * 클릭 시 햅틱 피드백
 */

'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MealRatingProps {
  rating: number | null;
  onRatingChange: (rating: number) => void;
}

export function MealRating({ rating, onRatingChange }: MealRatingProps) {
  const handleRatingClick = (value: number) => {
    // 햅틱 피드백
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    onRatingChange(value);
  };

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-neutral-700">오늘 식사는 어땠나요?</h3>
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => {
          const isSelected = rating !== null && value <= rating;

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleRatingClick(value)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                className={cn(
                  'h-10 w-10 transition-all',
                  isSelected
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-transparent text-neutral-300 hover:text-neutral-400'
                )}
              />
            </button>
          );
        })}
      </div>

      {/* 레이블 */}
      {rating !== null && (
        <p className="mt-2 text-center text-sm text-neutral-600">
          {rating === 1 && '별로였어요 😢'}
          {rating === 2 && '그저 그랬어요'}
          {rating === 3 && '괜찮았어요 😊'}
          {rating === 4 && '맛있었어요 😋'}
          {rating === 5 && '최고였어요! 🤩'}
        </p>
      )}
    </div>
  );
}
