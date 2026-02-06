/**
 * GIROGI 일일 기록 Mock 데이터
 *
 * Flutter의 MockDailyRecordRepository를 TypeScript로 변환
 * 최근 7일간의 샘플 데이터 제공
 */

import type {
  DailyRecord,
  MealRecord,
  ChecklistItem,
  RewardStatus,
} from '@/types';
import {
  MealTime,
  MealPlace,
  ExerciseType,
  TimeSlot,
  ReactionType,
} from '@/types';

/**
 * 날짜를 키 문자열로 변환 (yyyy-MM-dd)
 */
function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 특정 날짜의 Mock MealRecord 생성
 */
function createMockMeal(
  dayIndex: number,
  mealTime: MealTime,
  date: Date
): MealRecord {
  const mealId = `meal_${dayIndex}_${mealTime}`;
  const isLunch = mealTime === MealTime.LUNCH;

  const hour = isLunch ? 12 : 19; // 점심 12시, 저녁 7시
  const mealDate = new Date(date);
  mealDate.setHours(hour, 0, 0, 0);

  return {
    id: mealId,
    mealTime,
    place: isLunch ? MealPlace.CAFETERIA : MealPlace.HOME,
    menu: isLunch ? '제육볶음, 밥' : '된장찌개, 계란',
    imageUrl: null,
    achievements: isLunch ? ['천천히 먹기', '30회 씹기'] : ['작은 그릇 사용'],
    createdAt: mealDate.toISOString(),
    reactions: [],
    comments: [],
    isPublic: false,
  };
}

/**
 * 특정 날짜의 Mock DailyRecord 생성
 */
function createMockDailyRecord(dayIndex: number): DailyRecord {
  const now = new Date();
  const date = new Date(now);
  date.setDate(date.getDate() - dayIndex);
  date.setHours(0, 0, 0, 0);

  const dateKey = formatDateKey(date);

  // 최근 5일은 성공, 5일 이전은 실패
  const isSuccess = dayIndex < 5;

  // 체크리스트: 최근 날짜일수록 더 많이 완료
  const checklist: Record<string, boolean> = {
    morning_water: dayIndex < 5,
    lunch_salad: dayIndex < 4,
    lunch_chew: dayIndex < 6,
    afterwork_fruit: dayIndex < 5,
    dinner_small_bowl: dayIndex < 4,
    dinner_no_tv: dayIndex < 6,
    dinner_chew: dayIndex < 5,
    exercise_boxing: dayIndex === 0 || dayIndex === 3,
    exercise_squat: dayIndex === 1 || dayIndex === 2,
  };

  // 식사 기록 (점심, 저녁)
  const meals: MealRecord[] = [
    createMockMeal(dayIndex, MealTime.LUNCH, date),
    createMockMeal(dayIndex, MealTime.DINNER, date),
  ];

  // 운동 타입
  const exercise = dayIndex < 4 ? ExerciseType.BOXING : ExerciseType.MINIMAL;

  return {
    id: `record_${dayIndex}`,
    date: date.toISOString(),
    checklist,
    meals,
    exercise,
    isSuccessDay: isSuccess,
    hadBinge: false,
    temptationResisted: dayIndex % 2, // 0, 1, 0, 1, ...
  };
}

/**
 * 최근 7일간의 Mock DailyRecord 배열
 */
export const mockDailyRecords: DailyRecord[] = Array.from({ length: 7 }, (_, i) =>
  createMockDailyRecord(i)
);

/**
 * DailyRecord를 날짜 키로 Map 변환 (빠른 조회용)
 */
export const mockDailyRecordsMap = new Map<string, DailyRecord>(
  mockDailyRecords.map((record) => {
    const date = new Date(record.date);
    const key = formatDateKey(date);
    return [key, record];
  })
);

/**
 * 특정 날짜의 DailyRecord 조회
 */
export function getMockDailyRecordByDate(date: Date): DailyRecord | undefined {
  const key = formatDateKey(date);
  return mockDailyRecordsMap.get(key);
}

/**
 * 날짜 범위로 DailyRecord 조회
 */
export function getMockDailyRecordsByDateRange(
  startDate: Date,
  endDate: Date
): DailyRecord[] {
  const results: DailyRecord[] = [];

  for (const record of mockDailyRecords) {
    const recordDate = new Date(record.date);
    if (recordDate >= startDate && recordDate <= endDate) {
      results.push(record);
    }
  }

  // 날짜 오름차순 정렬
  results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return results;
}

/**
 * 최근 N일간의 DailyRecord 조회
 */
export function getMockRecentDailyRecords(days: number): DailyRecord[] {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - (days - 1));
  startDate.setHours(0, 0, 0, 0);

  return getMockDailyRecordsByDateRange(startDate, now);
}

/**
 * 현재 Streak (연속 성공 일수) 계산
 */
export function calculateMockCurrentStreak(): number {
  let streak = 0;

  // 최신 날짜부터 역순으로 확인
  const sortedRecords = [...mockDailyRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const record of sortedRecords) {
    if (record.isSuccessDay && !record.hadBinge) {
      streak++;
    } else {
      break; // 실패한 날을 만나면 종료
    }
  }

  return streak;
}

/**
 * 주간 성공률 계산
 */
export function calculateMockWeeklySuccessRate(weekStart: Date): number {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const weekRecords = getMockDailyRecordsByDateRange(weekStart, weekEnd);

  if (weekRecords.length === 0) return 0.0;

  const successCount = weekRecords.filter(
    (r) => r.isSuccessDay && !r.hadBinge
  ).length;

  return successCount / weekRecords.length;
}

/**
 * Mock 보상 상태 (RewardStatus)
 */
export const mockRewardStatus: RewardStatus = {
  snackBoxCount: 3,
  consecutiveDietDays: 5,
  lastCheatDay: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14일 전
};

/**
 * Mock 체크리스트 항목 정의
 */
export const mockChecklistItems: ChecklistItem[] = [
  // 아침
  {
    id: 'morning_water',
    title: '물 한 잔 마시기',
    timeSlot: TimeSlot.MORNING,
    isCoreMission: false,
  },
  // 점심
  {
    id: 'lunch_salad',
    title: '샐러드 먼저 먹기',
    timeSlot: TimeSlot.LUNCH,
    isCoreMission: false,
  },
  {
    id: 'lunch_chew',
    title: '30회 이상 씹기',
    timeSlot: TimeSlot.LUNCH,
    isCoreMission: false,
  },
  // 퇴근 후
  {
    id: 'afterwork_fruit',
    title: '과일 간식 먹기',
    timeSlot: TimeSlot.AFTER_WORK,
    isCoreMission: true, // 핵심 미션
  },
  // 저녁
  {
    id: 'dinner_small_bowl',
    title: '작은 그릇 사용하기',
    timeSlot: TimeSlot.DINNER,
    isCoreMission: true, // 핵심 미션
  },
  {
    id: 'dinner_no_tv',
    title: 'TV 끄고 식사하기',
    timeSlot: TimeSlot.DINNER,
    isCoreMission: false,
  },
  {
    id: 'dinner_chew',
    title: '천천히 씹기',
    timeSlot: TimeSlot.DINNER,
    isCoreMission: false,
  },
  // 운동
  {
    id: 'exercise_boxing',
    title: '복싱 30분',
    timeSlot: TimeSlot.EXERCISE,
    isCoreMission: true, // 핵심 미션
  },
  {
    id: 'exercise_squat',
    title: '스쿼트 50회',
    timeSlot: TimeSlot.EXERCISE,
    isCoreMission: false,
  },
];

/**
 * 체크리스트 항목을 시간대별로 그룹화
 */
export function groupChecklistItemsByTimeSlot(): Map<TimeSlot, ChecklistItem[]> {
  const grouped = new Map<TimeSlot, ChecklistItem[]>();

  for (const item of mockChecklistItems) {
    const existing = grouped.get(item.timeSlot) || [];
    existing.push(item);
    grouped.set(item.timeSlot, existing);
  }

  return grouped;
}

/**
 * 핵심 미션만 필터링
 */
export function getCoreMissions(): ChecklistItem[] {
  return mockChecklistItems.filter((item) => item.isCoreMission);
}

/**
 * 오늘의 DailyRecord (가장 최근)
 */
export function getMockTodayRecord(): DailyRecord {
  return mockDailyRecords[0]; // 첫 번째가 가장 최근 (dayIndex = 0)
}
