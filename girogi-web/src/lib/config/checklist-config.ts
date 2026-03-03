/**
 * 체크리스트 설정
 *
 * 연구 기반 9개 체크리스트 항목 + 헬퍼 함수
 * models.ts의 defaultChecklistItems를 이 파일로 이동
 */

import { TimeSlot } from '@/types/enums';
import type { ChecklistItem } from '@/types/models';

/**
 * 체크리스트 항목 (연구 기반 9개)
 *
 * - 아침 1개: 물
 * - 점심 2개: 샐러드, 천천히 씹기
 * - 퇴근 1개: 과일 (핵심 미션)
 * - 저녁 3개: 작은 그릇(핵심), TV 없이, 천천히 씹기
 * - 운동 2개: 복싱(핵심), 스쿼트(핵심)
 */
export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 아침
  {
    id: 'morning_water',
    title: '10:30 물 500ml',
    when: '10:30',
    where: '사무실',
    what: '물 500ml 마시기',
    icon: '💧',
    timeSlot: TimeSlot.MORNING,
    isCoreMission: false,
  },
  // 점심
  {
    id: 'lunch_salad',
    title: '샐러드 두 젓가락 먹기',
    when: '식사 시작',
    where: '식당',
    what: '샐러드 두 젓가락 먹기',
    icon: '🥗',
    timeSlot: TimeSlot.LUNCH,
    isCoreMission: false,
  },
  {
    id: 'lunch_chew',
    title: '천천히 씹기 (20번 이상)',
    when: '식사 중',
    where: '식당',
    what: '한 입당 30회 씹기',
    icon: '😋',
    timeSlot: TimeSlot.LUNCH,
    isCoreMission: false,
  },
  // 퇴근 (핵심 미션)
  {
    id: 'afterwork_fruit',
    title: '바나나 or 사과 먹기',
    when: '퇴근 직후',
    where: '집',
    what: '과일 1개 먹기',
    icon: '🍎',
    timeSlot: TimeSlot.AFTER_WORK,
    isCoreMission: true,
  },
  // 저녁 (핵심 미션)
  {
    id: 'dinner_small_bowl',
    title: '작은 그릇 사용',
    when: '식사 준비',
    where: '주방',
    what: '작은 그릇 사용하기',
    icon: '🍽️',
    timeSlot: TimeSlot.DINNER,
    isCoreMission: true,
  },
  {
    id: 'dinner_no_tv',
    title: 'TV 없이 먹기',
    when: '식사 중',
    where: '식탁',
    what: 'TV 끄고 집중해서 먹기',
    icon: '📺',
    timeSlot: TimeSlot.DINNER,
    isCoreMission: false,
  },
  {
    id: 'dinner_chew',
    title: '천천히 씹기',
    when: '식사 중',
    where: '식탁',
    what: '한 입당 30회 씹기',
    icon: '😋',
    timeSlot: TimeSlot.DINNER,
    isCoreMission: false,
  },
  // 운동 (핵심 미션 - 택1)
  {
    id: 'exercise_boxing',
    title: '복싱',
    when: '저녁 7시',
    where: '헬스장',
    what: '복싱 30분',
    icon: '🥊',
    timeSlot: TimeSlot.EXERCISE,
    isCoreMission: true,
  },
  {
    id: 'exercise_squat',
    title: '스쿼트 1개',
    when: '저녁 시간',
    where: '집',
    what: '스쿼트 1개',
    icon: '🏋️',
    timeSlot: TimeSlot.EXERCISE,
    isCoreMission: true,
  },
];

/** 시간대 섹션 렌더링 순서 */
export const CHECKLIST_TIME_SLOT_ORDER: TimeSlot[] = [
  TimeSlot.MORNING,
  TimeSlot.LUNCH,
  TimeSlot.AFTER_WORK,
  TimeSlot.DINNER,
  TimeSlot.EXERCISE,
];

/** 식사 기록이 가능한 시간대 (식사 관련 슬롯만) */
export const MEAL_RECORD_TIME_SLOTS: TimeSlot[] = [
  TimeSlot.MORNING,
  TimeSlot.LUNCH,
  TimeSlot.DINNER,
];

/** 시간대별 체크리스트 항목 필터 */
export function getChecklistItemsByTimeSlot(timeSlot: TimeSlot): ChecklistItem[] {
  return CHECKLIST_ITEMS.filter((item) => item.timeSlot === timeSlot);
}

/** 핵심 미션만 필터 */
export function getCoreMissions(): ChecklistItem[] {
  return CHECKLIST_ITEMS.filter((item) => item.isCoreMission);
}
