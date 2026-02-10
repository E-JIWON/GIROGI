/**
 * 식사 통계 유틸리티
 *
 * 주간/월간 식사 장소별 통계 계산
 */

import { DailyRecord } from '@/types/models';
import { MealPlace } from '@/types/enums';
import { startOfWeek, endOfWeek, parseISO, isWithinInterval } from 'date-fns';

/**
 * 주간 식사 장소별 통계
 */
export interface WeeklyMealStats {
  homeCount: number;        // 집밥
  cafeteriaCount: number;   // 회사밥
  restaurantCount: number;  // 외식
  deliveryCount: number;    // 배달
  totalCount: number;       // 총 횟수
}

/**
 * 이번 주 식사 장소별 통계 계산
 *
 * @param records - 전체 일일 기록 배열
 * @returns 주간 통계
 */
export function calculateWeeklyMealStats(records: DailyRecord[]): WeeklyMealStats {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // 월요일 시작
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  // 이번 주 기록만 필터링
  const thisWeekRecords = records.filter((record) => {
    const recordDate = parseISO(record.date);
    return isWithinInterval(recordDate, { start: weekStart, end: weekEnd });
  });

  let homeCount = 0;
  let cafeteriaCount = 0;
  let restaurantCount = 0;
  let deliveryCount = 0;

  // 모든 식사 기록 순회
  thisWeekRecords.forEach((record) => {
    record.meals.forEach((meal) => {
      switch (meal.place) {
        case MealPlace.HOME:
          homeCount++;
          break;
        case MealPlace.CAFETERIA:
          cafeteriaCount++;
          break;
        case MealPlace.RESTAURANT:
          restaurantCount++;
          break;
        case MealPlace.DELIVERY:
          deliveryCount++;
          break;
      }
    });
  });

  return {
    homeCount,
    cafeteriaCount,
    restaurantCount,
    deliveryCount,
    totalCount: homeCount + cafeteriaCount + restaurantCount + deliveryCount,
  };
}

/**
 * 외식 횟수 (외식 + 배달)
 *
 * @param stats - 주간 통계
 * @returns 외식 + 배달 합계
 */
export function getEatingOutCount(stats: WeeklyMealStats): number {
  return stats.restaurantCount + stats.deliveryCount;
}

/**
 * 건강한 식사 횟수 (집밥 + 회사밥)
 *
 * @param stats - 주간 통계
 * @returns 집밥 + 회사밥 합계
 */
export function getHealthyMealCount(stats: WeeklyMealStats): number {
  return stats.homeCount + stats.cafeteriaCount;
}

/**
 * 외식 비율 (0.0 ~ 1.0)
 *
 * @param stats - 주간 통계
 * @returns 외식 비율
 */
export function getEatingOutRatio(stats: WeeklyMealStats): number {
  if (stats.totalCount === 0) return 0;
  return getEatingOutCount(stats) / stats.totalCount;
}

/**
 * 건강한 식사 비율 (0.0 ~ 1.0)
 *
 * @param stats - 주간 통계
 * @returns 건강한 식사 비율
 */
export function getHealthyMealRatio(stats: WeeklyMealStats): number {
  if (stats.totalCount === 0) return 0;
  return getHealthyMealCount(stats) / stats.totalCount;
}
