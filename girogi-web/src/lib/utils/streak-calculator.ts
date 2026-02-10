/**
 * 스트릭 계산 유틸리티
 *
 * 날짜 배열 기반 연속 일수 계산
 * 듀오링고 스타일 스트릭 로직
 */

import { format, parseISO, isSameDay, differenceInDays } from 'date-fns';

/**
 * 현재 스트릭 계산
 * 오늘 또는 어제까지 기록이 있어야 스트릭 유지
 *
 * @param recordDates - ISO 8601 날짜 배열 (예: ["2026-02-01", "2026-02-02"])
 * @returns 현재 연속 일수
 */
export function calculateCurrentStreak(recordDates: string[]): number {
  if (recordDates.length === 0) {
    return 0;
  }

  // 날짜 정렬 (오래된 순 → 최신 순)
  const sortedDates = [...recordDates].sort();
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');

  // 마지막 기록 날짜
  const lastRecordDate = sortedDates[sortedDates.length - 1];

  // 어제 날짜
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = format(yesterday, 'yyyy-MM-dd');

  // 오늘도 어제도 아니면 스트릭 끊김
  if (lastRecordDate !== todayStr && lastRecordDate !== yesterdayStr) {
    return 0;
  }

  // 역순으로 연속 일수 계산
  let streak = 0;
  for (let i = sortedDates.length - 1; i >= 0; i--) {
    const currentDate = parseISO(sortedDates[i]);
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - streak);

    if (isSameDay(currentDate, expectedDate)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * 최장 스트릭 계산
 * 전체 기록 중 가장 긴 연속 일수
 *
 * @param recordDates - ISO 8601 날짜 배열
 * @returns 최장 연속 일수
 */
export function calculateLongestStreak(recordDates: string[]): number {
  if (recordDates.length === 0) {
    return 0;
  }

  // 날짜 정렬
  const sortedDates = [...recordDates].sort();

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = parseISO(sortedDates[i - 1]);
    const currDate = parseISO(sortedDates[i]);

    const dayDiff = differenceInDays(currDate, prevDate);

    if (dayDiff === 1) {
      // 연속된 날짜
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      // 연속 끊김
      currentStreak = 1;
    }
  }

  return longestStreak;
}

/**
 * 이번 주 기록 상태 계산
 * 월요일부터 일요일까지 [월, 화, 수, 목, 금, 토, 일]
 *
 * @param recordDates - ISO 8601 날짜 배열
 * @returns 7개 boolean 배열 (월요일부터)
 */
export function calculateWeeklyStatus(recordDates: string[]): boolean[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (일) ~ 6 (토)

  // 이번 주 월요일 구하기
  const monday = new Date(today);
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 -6, 그 외는 1 - dayOfWeek
  monday.setDate(monday.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  // 이번 주 월~일 날짜 생성
  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(date.getDate() + i);
    weekDates.push(format(date, 'yyyy-MM-dd'));
  }

  // 기록 여부 체크
  return weekDates.map((dateStr) => recordDates.includes(dateStr));
}

/**
 * 주간 기록 통계
 *
 * @param recordDates - ISO 8601 날짜 배열
 * @returns 주간 통계
 */
export function calculateWeeklyStats(recordDates: string[]): {
  recordedDays: number;
  totalDays: number;
  percentage: number;
  status: boolean[];
} {
  const status = calculateWeeklyStatus(recordDates);
  const recordedDays = status.filter(Boolean).length;

  return {
    recordedDays,
    totalDays: 7,
    percentage: Math.round((recordedDays / 7) * 100),
    status,
  };
}

/**
 * 스트릭이 끊긴 일수
 * 마지막 기록부터 오늘까지 며칠 지났는지
 *
 * @param recordDates - ISO 8601 날짜 배열
 * @returns 끊긴 일수 (0이면 유지 중)
 */
export function getDaysSinceLastRecord(recordDates: string[]): number {
  if (recordDates.length === 0) {
    return Infinity;
  }

  const sortedDates = [...recordDates].sort();
  const lastRecordDate = sortedDates[sortedDates.length - 1];
  const today = format(new Date(), 'yyyy-MM-dd');

  const lastDate = parseISO(lastRecordDate);
  const todayDate = parseISO(today);

  return differenceInDays(todayDate, lastDate);
}

/**
 * 스트릭 유지 중인지 확인
 * 오늘 또는 어제 기록이 있으면 true
 *
 * @param recordDates - ISO 8601 날짜 배열
 * @returns 유지 중이면 true
 */
export function isStreakActive(recordDates: string[]): boolean {
  const daysSince = getDaysSinceLastRecord(recordDates);
  return daysSince <= 1;
}

/**
 * 오늘 기록 여부
 *
 * @param recordDates - ISO 8601 날짜 배열
 * @returns 오늘 기록했으면 true
 */
export function isRecordedToday(recordDates: string[]): boolean {
  const today = format(new Date(), 'yyyy-MM-dd');
  return recordDates.includes(today);
}

/**
 * 연속 기록 예측
 * 현재 스트릭 유지 시 N일 후 달성할 스트릭
 *
 * @param currentStreak - 현재 스트릭
 * @param daysFromNow - 며칠 후 (기본 7일)
 * @returns 예상 스트릭
 */
export function predictStreak(currentStreak: number, daysFromNow = 7): number {
  return currentStreak + daysFromNow;
}

/**
 * 스트릭 마일스톤 체크
 * 특정 스트릭 달성 여부
 *
 * @param currentStreak - 현재 스트릭
 * @returns 마일스톤 정보
 */
export function getStreakMilestone(currentStreak: number): {
  milestone: number;
  achieved: boolean;
  next: number;
  daysToNext: number;
} {
  const milestones = [7, 14, 30, 50, 100, 365];

  for (const milestone of milestones) {
    if (currentStreak < milestone) {
      return {
        milestone,
        achieved: false,
        next: milestone,
        daysToNext: milestone - currentStreak,
      };
    }
  }

  // 365일 이상 달성
  return {
    milestone: 365,
    achieved: true,
    next: 365,
    daysToNext: 0,
  };
}

/**
 * 월별 기록 일수
 *
 * @param recordDates - ISO 8601 날짜 배열
 * @param year - 연도 (기본 올해)
 * @param month - 월 (1-12, 기본 이번 달)
 * @returns 해당 월의 기록 일수
 */
export function getMonthlyRecordCount(
  recordDates: string[],
  year?: number,
  month?: number
): number {
  const now = new Date();
  const targetYear = year || now.getFullYear();
  const targetMonth = month || now.getMonth() + 1;

  const monthPrefix = `${targetYear}-${String(targetMonth).padStart(2, '0')}`;

  return recordDates.filter((date) => date.startsWith(monthPrefix)).length;
}
