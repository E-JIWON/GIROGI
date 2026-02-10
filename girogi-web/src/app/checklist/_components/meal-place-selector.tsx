/**
 * 식사 장소 선택 컴포넌트
 *
 * 4개 큰 버튼 (2x2 그리드)
 * 장소별 그라데이션 색상
 */

'use client';

import { Home, Building2, UtensilsCrossed, Truck } from 'lucide-react';
import { MealPlace } from '@/types/enums';
import { cn } from '@/lib/utils';

export interface MealPlaceSelectorProps {
  selectedPlace: MealPlace | null;
  onSelect: (place: MealPlace) => void;
}

const PLACE_OPTIONS = [
  {
    value: MealPlace.HOME,
    label: '집',
    icon: Home,
    gradient: 'from-orange-400 to-orange-600',
    description: '집에서 직접 조리',
  },
  {
    value: MealPlace.CAFETERIA,
    label: '회사',
    icon: Building2,
    gradient: 'from-blue-400 to-blue-600',
    description: '구내식당 이용',
  },
  {
    value: MealPlace.RESTAURANT,
    label: '외식',
    icon: UtensilsCrossed,
    gradient: 'from-red-400 to-red-600',
    description: '식당에서 식사',
  },
  {
    value: MealPlace.DELIVERY,
    label: '배달',
    icon: Truck,
    gradient: 'from-purple-400 to-purple-600',
    description: '배달 음식',
  },
];

export function MealPlaceSelector({ selectedPlace, onSelect }: MealPlaceSelectorProps) {
  const handleSelect = (place: MealPlace) => {
    // 햅틱 피드백
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    onSelect(place);
  };

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-neutral-700">어디서 드셨어요?</h3>
      <div className="grid grid-cols-2 gap-3">
        {PLACE_OPTIONS.map(({ value, label, icon: Icon, gradient, description }) => {
          const isSelected = selectedPlace === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleSelect(value)}
              className={cn(
                'group relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-6 transition-all',
                isSelected
                  ? `border-transparent bg-gradient-to-br ${gradient} shadow-lg`
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md'
              )}
            >
              {/* 아이콘 */}
              <Icon
                className={cn(
                  'h-8 w-8 transition-all',
                  isSelected ? 'scale-110 text-white' : 'text-neutral-600 group-hover:scale-105'
                )}
              />

              {/* 레이블 */}
              <div className="text-center">
                <p
                  className={cn(
                    'text-base font-semibold',
                    isSelected ? 'text-white' : 'text-neutral-700'
                  )}
                >
                  {label}
                </p>
                <p
                  className={cn(
                    'text-xs',
                    isSelected ? 'text-white/90' : 'text-neutral-500'
                  )}
                >
                  {description}
                </p>
              </div>

              {/* 체크 아이콘 */}
              {isSelected && (
                <div className="absolute right-2 top-2">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
