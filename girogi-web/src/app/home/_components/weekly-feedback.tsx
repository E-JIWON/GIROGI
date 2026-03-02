/**
 * 주간 피드백 컴포넌트
 *
 * 이번 주 식사 장소별 통계 및 피드백
 * - 외식/배달 경고
 * - 장소별 횟수 표시
 * - Environment Design 이론 적용
 */

'use client';

import { Home, Building2, UtensilsCrossed, Truck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MealPlace } from '@/types/enums';

export interface WeeklyFeedbackProps {
  homeCount: number;        // 집밥 횟수
  cafeteriaCount: number;   // 회사밥 횟수
  restaurantCount: number;  // 외식 횟수
  deliveryCount: number;    // 배달 횟수
  className?: string;
}

export function WeeklyFeedback({
  homeCount,
  cafeteriaCount,
  restaurantCount,
  deliveryCount,
  className,
}: WeeklyFeedbackProps) {
  // 외식 + 배달 합계
  const eatingOutCount = restaurantCount + deliveryCount;

  // 경고 기준 (3회 이상)
  const EATING_OUT_WARNING_THRESHOLD = 3;
  const showWarning = eatingOutCount >= EATING_OUT_WARNING_THRESHOLD;

  // 장소별 데이터
  const placeStats = [
    {
      place: MealPlace.HOME,
      label: '집밥',
      icon: Home,
      count: homeCount,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      place: MealPlace.CAFETERIA,
      label: '회사밥',
      icon: Building2,
      count: cafeteriaCount,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      place: MealPlace.RESTAURANT,
      label: '외식',
      icon: UtensilsCrossed,
      count: restaurantCount,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      place: MealPlace.DELIVERY,
      label: '배달',
      icon: Truck,
      count: deliveryCount,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  // 총 횟수
  const totalCount = homeCount + cafeteriaCount + restaurantCount + deliveryCount;

  return (
    <div className={cn('rounded-2xl bg-white p-6', className)}>
      {/* 헤더 */}
      <h3 className="mb-4 text-base font-semibold text-neutral-700">이번 주 식사 리포트</h3>

      {/* 경고 배너 */}
      {showWarning && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <div>
            <p className="text-sm font-medium text-red-700">
              ⚠️ 이번 주 외식 {eatingOutCount}회!
            </p>
            <p className="mt-1 text-xs text-red-600">
              목표는 주 1회예요. 내일은 집밥이나 회사밥 어때요?
            </p>
          </div>
        </div>
      )}

      {/* 장소별 통계 */}
      <div className="grid grid-cols-2 gap-3">
        {placeStats.map(({ place, label, icon: Icon, count, color, bgColor, borderColor }) => (
          <div
            key={place}
            className={cn(
              'flex items-center gap-3 rounded-lg border p-4',
              bgColor,
              borderColor
            )}
          >
            <Icon className={cn('h-5 w-5', color)} />
            <div className="flex-1">
              <p className="text-xs text-neutral-600">{label}</p>
              <p className={cn('text-lg font-semibold', color)}>{count}회</p>
            </div>
          </div>
        ))}
      </div>

      {/* 총 횟수 */}
      {totalCount > 0 && (
        <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-center">
          <p className="text-sm text-neutral-600">
            이번 주 총 <span className="font-semibold text-neutral-700">{totalCount}회</span> 기록
          </p>
        </div>
      )}

      {/* 격려 메시지 */}
      {!showWarning && eatingOutCount > 0 && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-sm text-green-700">
            ✅ 외식 {eatingOutCount}회로 잘 관리하고 있어요!
          </p>
        </div>
      )}

      {totalCount === 0 && (
        <div className="mt-4 text-center text-sm text-neutral-500">
          아직 이번 주 기록이 없어요. 오늘부터 시작해볼까요? 💚
        </div>
      )}

      {homeCount + cafeteriaCount >= 10 && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-700">
            🎉 집밥/회사밥 {homeCount + cafeteriaCount}회! 정말 잘하고 있어요!
          </p>
        </div>
      )}
    </div>
  );
}
