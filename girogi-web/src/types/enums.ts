/**
 * GIROGI 앱 전역 Enum 타입 정의
 *
 * Flutter의 enums.dart를 TypeScript로 변환
 * 식사 시간, 장소, 게시글 타입 등 분류가 필요한 모든 데이터 타입
 */

/**
 * 식사 시간대 분류
 *
 * 사용자의 식사 기록을 시간대별로 구분하기 위한 Enum
 */
export enum MealTime {
  /** 아침 식사 */
  BREAKFAST = 'breakfast',
  /** 점심 식사 */
  LUNCH = 'lunch',
  /** 저녁 식사 */
  DINNER = 'dinner',
  /** 간식 */
  SNACK = 'snack',
}

/**
 * 식사 장소 분류
 *
 * 식사 환경을 추적하여 외식 빈도 등을 분석하기 위한 Enum
 */
export enum MealPlace {
  /** 집에서 조리한 식사 */
  HOME = 'home',
  /** 회사 구내식당 */
  CAFETERIA = 'cafeteria',
  /** 외부 식당 (외식) */
  RESTAURANT = 'restaurant',
  /** 배달 음식 */
  DELIVERY = 'delivery',
}

/**
 * 운동 타입 분류
 *
 * 체크리스트에서 선택 가능한 운동 종류
 */
export enum ExerciseType {
  /** 복싱 운동 */
  BOXING = 'boxing',
  /** 최소 단위 운동 (스쿼트 1개 등) */
  MINIMAL = 'minimal',
}

/**
 * 커뮤니티 게시글 타입
 *
 * 게시글의 콘텐츠 유형을 구분하기 위한 Enum
 */
export enum PostType {
  /** 텍스트 게시글 */
  TEXT = 'text',
  /** 이미지 게시글 */
  IMAGE = 'image',
  /** 유튜브 영상 게시글 */
  YOUTUBE = 'youtube',
  /** 실패 리포트 게시글 */
  FAILURE_REPORT = 'failureReport',
  /** 공유된 기록 게시글 (체크리스트, 식사 등) */
  SHARED_RECORD = 'sharedRecord',
}

/**
 * 공유 가능한 기록 타입
 *
 * 커뮤니티에 공유할 수 있는 개인 기록의 종류
 */
export enum SharedRecordType {
  /** 체크리스트 기록 */
  CHECKLIST = 'checklist',
  /** 식사 기록 */
  MEAL = 'meal',
  /** 주간 성공 현황 */
  WEEK_STATUS = 'weekStatus',
}

/**
 * 리액션 타입
 *
 * 게시글이나 댓글에 남길 수 있는 감정 표현 (총 6종)
 */
export enum ReactionType {
  /** 하트 (좋아요) - ❤️ */
  HEART = 'heart',
  /** 불 (열정, 동기부여) - 🔥 */
  FIRE = 'fire',
  /** 근육 (힘내요, 화이팅) - 💪 */
  MUSCLE = 'muscle',
  /** 박수 (잘했어요) - 👏 */
  CLAP = 'clap',
  /** 포옹 (응원, 위로) - 🤗 */
  HUG = 'hug',
  /** 슬픔 (공감, 함께 힘내요) - 😢 */
  SAD = 'sad',
}

/**
 * 시간대 슬롯
 *
 * 체크리스트를 시간대별로 그룹화하기 위한 Enum
 */
export enum TimeSlot {
  /** 아침 시간대 */
  MORNING = 'morning',
  /** 점심 시간대 */
  LUNCH = 'lunch',
  /** 퇴근 시간대 */
  AFTER_WORK = 'afterWork',
  /** 저녁 시간대 */
  DINNER = 'dinner',
  /** 운동 시간 */
  EXERCISE = 'exercise',
}

/**
 * Enum Extension - 한글 표시명 및 아이콘 제공
 */

/** 식사 시간 한글 표시명 */
export const MealTimeDisplayNames: Record<MealTime, string> = {
  [MealTime.BREAKFAST]: '아침',
  [MealTime.LUNCH]: '점심',
  [MealTime.DINNER]: '저녁',
  [MealTime.SNACK]: '간식',
};

/** 식사 장소 한글 표시명 */
export const MealPlaceDisplayNames: Record<MealPlace, string> = {
  [MealPlace.HOME]: '집밥',
  [MealPlace.CAFETERIA]: '구내식당',
  [MealPlace.RESTAURANT]: '외식',
  [MealPlace.DELIVERY]: '배달',
};

/** 식사 장소 아이콘 */
export const MealPlaceIcons: Record<MealPlace, string> = {
  [MealPlace.HOME]: '🏠',
  [MealPlace.CAFETERIA]: '🏢',
  [MealPlace.RESTAURANT]: '🍜',
  [MealPlace.DELIVERY]: '🛵',
};

/** 운동 타입 한글 표시명 */
export const ExerciseTypeDisplayNames: Record<ExerciseType, string> = {
  [ExerciseType.BOXING]: '복싱',
  [ExerciseType.MINIMAL]: '스쿼트 1개',
};

/** 리액션 타입 이모지 */
export const ReactionTypeEmojis: Record<ReactionType, string> = {
  [ReactionType.HEART]: '❤️',
  [ReactionType.FIRE]: '🔥',
  [ReactionType.MUSCLE]: '💪',
  [ReactionType.CLAP]: '👏',
  [ReactionType.HUG]: '🤗',
  [ReactionType.SAD]: '😢',
};

/** 시간대 슬롯 한글 표시명 */
export const TimeSlotDisplayNames: Record<TimeSlot, string> = {
  [TimeSlot.MORNING]: '아침',
  [TimeSlot.LUNCH]: '점심',
  [TimeSlot.AFTER_WORK]: '퇴근',
  [TimeSlot.DINNER]: '저녁',
  [TimeSlot.EXERCISE]: '운동',
};

/** 시간대 슬롯 아이콘 */
export const TimeSlotIcons: Record<TimeSlot, string> = {
  [TimeSlot.MORNING]: '🌅',
  [TimeSlot.LUNCH]: '🌞',
  [TimeSlot.AFTER_WORK]: '🌆',
  [TimeSlot.DINNER]: '🌙',
  [TimeSlot.EXERCISE]: '💪',
};
