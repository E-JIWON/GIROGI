/**
 * GIROGI 핵심 모델 타입 정의
 *
 * DailyRecord, MealRecord, Post, ChecklistItem 등
 * 앱의 핵심 데이터 구조
 */

import {
  MealTime,
  MealPlace,
  ExerciseType,
  TimeSlot,
  PostType,
  SharedRecordType,
} from './enums';
import { Comment, Reaction } from './common';

/**
 * 체크리스트 항목
 *
 * Implementation Intention (실행 의도) 이론 적용
 * "When-Where-What" 구조의 행동 체크리스트
 * Tiny Habits 방법론에 따라 최소 행동 단위로 설계
 */
export interface ChecklistItem {
  /** 고유 식별자 */
  id: string;
  /** 항목 제목 (레거시 호환용, when+where+what이 있으면 그것 우선) */
  title: string;
  /** 시간대 슬롯 (시간대별 그룹화용) */
  timeSlot: TimeSlot;
  /** 핵심 미션 여부 (3개 중 2개 이상 완료 시 하루 성공) */
  isCoreMission: boolean;
  /** When: 언제 (예: "10:30", "식사 전", "기상 후") */
  when?: string;
  /** Where: 어디서 (예: "사무실", "집", "헬스장") */
  where?: string;
  /** What: 무엇을 (예: "물 500ml 마시기", "스쿼트 1개") */
  what?: string;
  /** 아이콘 이모지 (선택사항, 예: "💧", "🏃", "🥗") */
  icon?: string;
}

/**
 * 기본 체크리스트 항목 제공
 *
 * 앱 초기 설치 시 제공되는 기본 체크리스트 템플릿
 */
export const defaultChecklistItems: ChecklistItem[] = [
  // 아침
  {
    id: 'morning_water',
    title: '10:30 물 500ml', // 레거시
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
    title: '샐러드 두 젓가락 먹기', // 레거시
    when: '식사 시작',
    where: '식당',
    what: '샐러드 두 젓가락 먹기',
    icon: '🥗',
    timeSlot: TimeSlot.LUNCH,
    isCoreMission: false,
  },
  {
    id: 'lunch_chew',
    title: '천천히 씹기 (20번 이상)', // 레거시
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
    title: '바나나 or 사과 먹기', // 레거시
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
    title: '작은 그릇 사용', // 레거시
    when: '식사 준비',
    where: '주방',
    what: '작은 그릇 사용하기',
    icon: '🍽️',
    timeSlot: TimeSlot.DINNER,
    isCoreMission: true,
  },
  {
    id: 'dinner_no_tv',
    title: 'TV 없이 먹기', // 레거시
    when: '식사 중',
    where: '식탁',
    what: 'TV 끄고 집중해서 먹기',
    icon: '📺',
    timeSlot: TimeSlot.DINNER,
    isCoreMission: false,
  },
  {
    id: 'dinner_chew',
    title: '천천히 씹기', // 레거시
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
    title: '복싱', // 레거시
    when: '저녁 7시',
    where: '헬스장',
    what: '복싱 30분',
    icon: '🥊',
    timeSlot: TimeSlot.EXERCISE,
    isCoreMission: true,
  },
  {
    id: 'exercise_squat',
    title: '스쿼트 1개', // 레거시
    when: '저녁 시간',
    where: '집',
    what: '스쿼트 1개',
    icon: '🏋️',
    timeSlot: TimeSlot.EXERCISE,
    isCoreMission: true,
  },
];

/**
 * 식사 기록
 *
 * Slow Eating Research 적용
 * 장소, 메뉴, 사진, 준수 행동, 소셜 피드백 포함
 */
export interface MealRecord {
  /** 식사 기록 고유 식별자 */
  id: string;
  /** 식사 시간대 (아침/점심/저녁/간식) */
  mealTime: MealTime;
  /** 식사 장소 (집밥/구내식당/외식/배달) */
  place: MealPlace;
  /** 메뉴 (자유 입력, 예: "제육볶음, 밥, 된장찌개") */
  menu: string;
  /** 식사 사진 URL (Firebase Storage / Supabase Storage) */
  imageUrl?: string | null;
  /** 준수한 행동 리스트 (예: ["천천히 씹기", "작은 그릇 사용"]) */
  achievements: string[];
  /** 식사 등록 시각 (ISO 8601 문자열) */
  createdAt: string;
  /** 리액션 리스트 (커뮤니티 공개 시) */
  reactions: Reaction[];
  /** 댓글 리스트 (커뮤니티 공개 시) */
  comments: Comment[];
  /** 커뮤니티 공개 여부 */
  isPublic: boolean;
}

/**
 * 기본 준수 행동 옵션
 *
 * 식사 추가 모달에서 선택 가능한 행동 리스트
 */
export const defaultAchievements: string[] = [
  '천천히 씹기',
  '작은 그릇 사용',
  'TV 없이 먹기',
  '단백질 먼저 먹기',
];

/**
 * 외식 여부 판단
 *
 * @param mealRecord - 식사 기록
 * @returns 외식 또는 배달인 경우 true
 */
export function isEatingOut(mealRecord: MealRecord): boolean {
  return (
    mealRecord.place === MealPlace.RESTAURANT ||
    mealRecord.place === MealPlace.DELIVERY
  );
}

/**
 * 일일 기록 엔티티 (가장 중요한 모델!)
 *
 * 하루 동안의 모든 활동 기록
 * 체크리스트, 식사, 운동, 유혹 극복 포함
 * 성공/실패 판정, 연속 기록 계산에 사용
 */
export interface DailyRecord {
  /** 일일 기록 고유 식별자 */
  id: string;
  /** 기록 날짜 (ISO 8601 문자열) */
  date: string;
  /** 체크리스트 항목별 완료 여부 (key: 항목 ID, value: 완료 여부) */
  checklist: Record<string, boolean>;
  /** 식사 기록 리스트 (해당 날짜의 모든 식사) */
  meals: MealRecord[];
  /** 운동 타입 (복싱/스쿼트, null이면 운동 안 함) */
  exercise?: ExerciseType | null;
  /** 하루 성공 여부 (핵심 미션 3개 중 2개 이상 완료 시 true) */
  isSuccessDay: boolean;
  /** 폭식 여부 (true면 streak 리셋, 실패 리포트 생성) */
  hadBinge: boolean;
  /** 유혹 극복 횟수 (10분 타이머 완료 횟수) */
  temptationResisted: number;
}

/**
 * 체크리스트 완료율 계산
 *
 * @param record - 일일 기록
 * @returns 0.0 ~ 1.0 사이의 완료율
 */
export function getChecklistCompletionRate(record: DailyRecord): number {
  const entries = Object.entries(record.checklist);
  if (entries.length === 0) return 0.0;
  const completed = entries.filter(([, value]) => value).length;
  return completed / entries.length;
}

/**
 * 외식 횟수 계산
 *
 * @param record - 일일 기록
 * @returns 해당 날짜의 외식/배달 횟수
 */
export function getEatingOutCount(record: DailyRecord): number {
  return record.meals.filter(isEatingOut).length;
}

/**
 * 보상 시스템 상태
 *
 * Temptation Bundling 이론 적용
 * 과자박스 적립, 연속 성공 일수, 치팅데이 정보
 */
export interface RewardStatus {
  /** 과자박스 현재 적립 개수 (복싱 완료 시 +1) */
  snackBoxCount: number;
  /** 연속 식단 준수 일수 (핵심 미션 2개 이상 완료 카운트) */
  consecutiveDietDays: number;
  /** 마지막 치팅데이 사용 날짜 (ISO 8601 문자열, null이면 미사용) */
  lastCheatDay?: string | null;
}

/**
 * 치팅데이까지 남은 일수 계산
 *
 * @param status - 보상 상태
 * @returns 남은 일수 (0이면 사용 가능)
 */
export function getDaysUntilCheatDay(status: RewardStatus): number {
  if (status.consecutiveDietDays >= 7) return 0;
  return 7 - status.consecutiveDietDays;
}

/**
 * 치팅데이 사용 가능 여부
 *
 * @param status - 보상 상태
 * @returns 7일 이상 연속 성공 시 true
 */
export function canUseCheatDay(status: RewardStatus): boolean {
  return status.consecutiveDietDays >= 7;
}

/**
 * 과자박스 사용 가능 여부
 *
 * @param status - 보상 상태
 * @returns 3일 이상 연속 성공 & 적립 개수 > 0 시 true
 */
export function canUseSnackBox(status: RewardStatus): boolean {
  return status.snackBoxCount > 0 && status.consecutiveDietDays >= 3;
}

/**
 * 실패 리포트
 *
 * Self-Compassion 이론 적용
 * 실패 기록하되 자책하지 않고 커뮤니티 응원 받기
 */
export interface FailureReport {
  /** 실패 리포트 고유 식별자 */
  id: string;
  /** 리포트 소유자 ID */
  userId: string;
  /** 실패 일시 (ISO 8601 문자열) */
  failedAt: string;
  /** 사라진 연속 성공 일수 (실패 직전 기록) */
  lostStreak: number;
  /** 사라진 치팅데이 진행도 (0~7일) */
  lostCheatDayProgress: number;
  /** 이번 주 성공률 (0.0 ~ 1.0) */
  weekSuccessRate: number;
  /** 메모 (실패 원인/상황 자유 기록) */
  memo?: string | null;
  /** 첨부 이미지 URL */
  imageUrl?: string | null;
  /** 커뮤니티 공개 여부 (true면 응원 받을 수 있음) */
  isPublic: boolean;
  /** 리액션 리스트 (주로 🤗 포옹) */
  reactions: Reaction[];
  /** 댓글 리스트 (응원 댓글) */
  comments: Comment[];
  /** 생성 일시 (ISO 8601 문자열) */
  createdAt: string;
}

/**
 * 자기 연민 메시지
 *
 * 실패 시 표시할 긍정적 메시지와 경고 메시지
 */
export const selfCompassionMessages = {
  /** 긍정적 자기 연민 메시지 */
  supportive: [
    '괜찮아, 누구나 그래',
    '오늘은 그랬지만, 지금부터 다시 시작하면 돼',
    '연속 기록은 리셋되지만, 너의 노력은 사라지지 않아',
    '실패는 과정이야. 포기만 안 하면 돼',
  ],
  /** 허가 효과 경고 메시지 */
  licensingWarning: `⚠️ "내일부터 하자"는 허가 효과!
미래의 좋은 행동을 예약하고
지금 나쁜 행동을 정당화하는 거야.
"지금부터" 다시 시작하자!`,
};

/**
 * 공유된 기록
 *
 * 커뮤니티에 공유 가능한 개인 기록
 * 체크리스트, 식사 기록, 주간 현황 등
 */
export interface SharedRecord {
  /** 공유 기록 타입 (checklist, meal, weekStatus) */
  type: SharedRecordType;
  /** 기록 날짜 (ISO 8601 문자열) */
  recordDate: string;
  /** 실제 기록 데이터 (타입에 따라 다른 구조) */
  data: Record<string, any>;
}

/**
 * 체크리스트 공유 데이터 생성
 *
 * @param checklist - 체크리스트 항목별 완료 여부
 * @param completionRate - 완료율 (0.0 ~ 1.0)
 */
export function createChecklistShareData(
  checklist: Record<string, boolean>,
  completionRate: number
): Record<string, any> {
  return {
    checklist,
    completionRate,
  };
}

/**
 * 주간 현황 공유 데이터 생성
 *
 * @param successDays - 이번 주 성공한 날 수
 * @param totalDays - 이번 주 경과 일수
 */
export function createWeekStatusShareData(
  successDays: number,
  totalDays: number
): Record<string, any> {
  return {
    successDays,
    totalDays,
    rate: totalDays > 0 ? successDays / totalDays : 0.0,
  };
}

/**
 * 커뮤니티 게시글
 *
 * 소셜 피드에 표시되는 게시글
 * 텍스트, 이미지, 유튜브, 실패 리포트, 공유 기록 등 다양한 타입 지원
 */
export interface Post {
  /** 게시글 고유 식별자 */
  id: string;
  /** 작성자 ID (User 모델 참조) */
  authorId: string;
  /** 게시글 타입 */
  type: PostType;
  /** 텍스트 내용 (모든 타입에서 추가 설명 가능) */
  content?: string | null;
  /** 이미지 URL (type이 image인 경우 필수) */
  imageUrl?: string | null;
  /** 유튜브 URL (type이 youtube인 경우 필수) */
  youtubeUrl?: string | null;
  /** 실패 리포트 (type이 failureReport인 경우 필수) */
  failureReport?: FailureReport | null;
  /** 공유된 기록 (type이 sharedRecord인 경우 필수) */
  sharedRecord?: SharedRecord | null;
  /** 리액션 리스트 */
  reactions: Reaction[];
  /** 댓글 리스트 */
  comments: Comment[];
  /** 게시 일시 (ISO 8601 문자열) */
  createdAt: string;
}

/**
 * 게시글 유효성 검사
 *
 * @param post - 게시글
 * @returns 게시글 타입에 따라 필수 필드가 채워져 있으면 true
 */
export function isValidPost(post: Post): boolean {
  switch (post.type) {
    case PostType.TEXT:
      return !!post.content && post.content.trim().length > 0;
    case PostType.IMAGE:
      return !!post.imageUrl && post.imageUrl.trim().length > 0;
    case PostType.YOUTUBE:
      return !!post.youtubeUrl && post.youtubeUrl.trim().length > 0;
    case PostType.FAILURE_REPORT:
      return !!post.failureReport;
    case PostType.SHARED_RECORD:
      return !!post.sharedRecord;
    default:
      return false;
  }
}

/**
 * 게시글 생성 헬퍼 함수들
 *
 * 타입별 게시글 생성을 간편하게
 */

/** 텍스트 게시글 생성 */
export function createTextPost(
  id: string,
  authorId: string,
  content: string,
  createdAt?: string
): Post {
  return {
    id,
    authorId,
    type: PostType.TEXT,
    content,
    reactions: [],
    comments: [],
    createdAt: createdAt || new Date().toISOString(),
  };
}

/** 이미지 게시글 생성 */
export function createImagePost(
  id: string,
  authorId: string,
  imageUrl: string,
  content?: string,
  createdAt?: string
): Post {
  return {
    id,
    authorId,
    type: PostType.IMAGE,
    imageUrl,
    content,
    reactions: [],
    comments: [],
    createdAt: createdAt || new Date().toISOString(),
  };
}

/** 유튜브 게시글 생성 */
export function createYoutubePost(
  id: string,
  authorId: string,
  youtubeUrl: string,
  content?: string,
  createdAt?: string
): Post {
  return {
    id,
    authorId,
    type: PostType.YOUTUBE,
    youtubeUrl,
    content,
    reactions: [],
    comments: [],
    createdAt: createdAt || new Date().toISOString(),
  };
}

/** 실패 리포트 게시글 생성 */
export function createFailureReportPost(
  id: string,
  authorId: string,
  failureReport: FailureReport,
  content?: string,
  createdAt?: string
): Post {
  return {
    id,
    authorId,
    type: PostType.FAILURE_REPORT,
    failureReport,
    content,
    reactions: [],
    comments: [],
    createdAt: createdAt || new Date().toISOString(),
  };
}

/** 공유 기록 게시글 생성 */
export function createSharedRecordPost(
  id: string,
  authorId: string,
  sharedRecord: SharedRecord,
  content?: string,
  createdAt?: string
): Post {
  return {
    id,
    authorId,
    type: PostType.SHARED_RECORD,
    sharedRecord,
    content,
    reactions: [],
    comments: [],
    createdAt: createdAt || new Date().toISOString(),
  };
}

/**
 * 보상 사용 타입
 *
 * Temptation Bundling 이론 적용
 * 보상(과자박스, 치팅데이) 사용 기록
 */
export type RewardType = 'snackbox' | 'cheatday';

/**
 * 보상 사용 기록
 *
 * 과자박스 또는 치팅데이 사용 내역을 기록
 * 언제, 무엇을 먹었는지 추적
 */
export interface RewardUsage {
  /** 고유 식별자 */
  id: string;
  /** 사용자 ID */
  userId: string;
  /** 보상 타입 */
  type: RewardType;
  /** 먹은 음식 (예: "치킨", "피자", "아이스크림") */
  food: string;
  /** 메모 (선택사항) */
  memo?: string;
  /** 사용 일시 */
  usedAt: string;
}
