/**
 * GIROGI 앱 전역 상수
 *
 * 비즈니스 로직 관련 상수들을 중앙에서 관리합니다.
 */

// ============================================
// 미션 및 성공 조건
// ============================================

/** 하루 핵심 미션 개수 */
export const TOTAL_CORE_MISSIONS = 3

/** 성공으로 인정되는 최소 미션 달성 개수 (3개 중 2개) */
export const MIN_CORE_MISSIONS_FOR_SUCCESS = 2

// ============================================
// 보상 시스템 (Temptation Bundling)
// ============================================

/** 과자박스를 받기 위한 연속 성공 일수 */
export const DAYS_FOR_SNACK_BOX = 3

/** 치팅데이를 사용하기 위한 연속 성공 일수 */
export const DAYS_FOR_CHEAT_DAY = 7

// ============================================
// 경고 기준
// ============================================

/** 주간 외식 횟수 경고 기준 */
export const WEEKLY_DINING_OUT_WARNING_THRESHOLD = 3

/** 천천히 씹기 목표 횟수 */
export const TARGET_CHEW_COUNT = 30

/** 식사 시간 목표 (분) */
export const TARGET_MEAL_DURATION_MINUTES = 20

// ============================================
// EFT (Episodic Future Thinking) - 미래 자아
// ============================================

/** 기본 제공 목표 이미지 (placeholder) */
export const DEFAULT_GOAL_IMAGES = [
  {
    id: 'fit-1',
    url: '/images/goals/fit-person-1.jpg',
    description: '건강한 체형 1',
    alt: '피트니스 목표 이미지 1',
  },
  {
    id: 'fit-2',
    url: '/images/goals/fit-person-2.jpg',
    description: '건강한 체형 2',
    alt: '피트니스 목표 이미지 2',
  },
  {
    id: 'fit-3',
    url: '/images/goals/fit-person-3.jpg',
    description: '건강한 체형 3',
    alt: '피트니스 목표 이미지 3',
  },
  {
    id: 'athletic-1',
    url: '/images/goals/athletic-1.jpg',
    description: '운동하는 모습 1',
    alt: '운동 목표 이미지 1',
  },
  {
    id: 'athletic-2',
    url: '/images/goals/athletic-2.jpg',
    description: '운동하는 모습 2',
    alt: '운동 목표 이미지 2',
  },
  {
    id: 'healthy-1',
    url: '/images/goals/healthy-lifestyle-1.jpg',
    description: '건강한 라이프스타일 1',
    alt: '건강한 삶 목표 이미지 1',
  },
  {
    id: 'healthy-2',
    url: '/images/goals/healthy-lifestyle-2.jpg',
    description: '건강한 라이프스타일 2',
    alt: '건강한 삶 목표 이미지 2',
  },
  {
    id: 'yoga-1',
    url: '/images/goals/yoga-1.jpg',
    description: '요가 하는 모습',
    alt: '요가 목표 이미지',
  },
  {
    id: 'running-1',
    url: '/images/goals/running-1.jpg',
    description: '달리기 하는 모습',
    alt: '러닝 목표 이미지',
  },
  {
    id: 'happy-1',
    url: '/images/goals/happy-confident-1.jpg',
    description: '자신감 있는 모습',
    alt: '자신감 목표 이미지',
  },
] as const

/** EFT 동기부여 메시지 (다양화) */
export const EFT_MOTIVATION_MESSAGES = [
  // 기본 메시지 (4개 - 기존)
  '지금 먹으면 후회할 것 같나요?',
  '목표 달성이 늦어질 수 있습니다',
  '10분만 기다리면 유혹이 사라집니다',
  '미래의 내가 고마워할 선택을 하세요',

  // 추가 메시지 (6개 - 신규)
  '이 순간의 선택이 내일의 나를 만듭니다',
  '목표까지 얼마 남지 않았어요!',
  '지금 참으면 더 큰 보상이 기다립니다',
  '건강해진 미래의 나를 상상해보세요',
  '한 번의 선택이 습관을 만듭니다',
  '당신은 충분히 강합니다',
] as const

/** 시간대별 맞춤 EFT 메시지 */
export const EFT_MESSAGES_BY_TIME = {
  morning: [
    '좋은 아침이에요! 오늘도 건강한 선택을 시작해요',
    '아침부터 목표를 향해 나아가고 있어요',
  ],
  afternoon: [
    '오후의 유혹을 이겨낼 수 있어요',
    '점심 식사 후 졸음이 올 때, 건강한 선택을 하세요',
  ],
  evening: [
    '저녁 시간, 가장 유혹이 많은 시간이에요',
    '지금 참으면 내일 아침이 가볍습니다',
    '밤에 먹으면 목표가 더 멀어져요',
  ],
} as const

// ============================================
// Self-Compassion (자기 연민)
// ============================================

/** 허가 효과 경고 메시지 */
export const LICENSING_EFFECT_WARNING = '⚠️ "내일부터"는 금물! 지금 바로 다시 시작하세요'

/** 자기 연민 격려 메시지 */
export const SELF_COMPASSION_MESSAGES = [
  '한 번의 실수로 모든 것이 끝나는 건 아닙니다',
  '완벽한 사람은 없습니다',
  '실패는 배움의 기회입니다',
  '다시 시작하는 용기가 더 중요합니다',
] as const

// ============================================
// 온보딩
// ============================================

/** 온보딩 완료 여부를 저장하는 localStorage 키 */
export const ONBOARDING_COMPLETED_KEY = 'girogi_onboarding_completed'

/** 목표 이미지 localStorage 키 */
export const GOAL_IMAGE_KEY = 'girogi_goal_image'

/** 목표 체중 localStorage 키 */
export const GOAL_WEIGHT_KEY = 'girogi_goal_weight'

/** 현재 체중 localStorage 키 */
export const CURRENT_WEIGHT_KEY = 'girogi_current_weight'

/** 목표 날짜 localStorage 키 */
export const GOAL_DATE_KEY = 'girogi_goal_date'

// ============================================
// 보상 사용
// ============================================

/** 보상 사용 내역 localStorage 키 */
export const REWARD_USAGE_KEY = 'girogi_reward_usage'

/** 현재 과자박스 개수 localStorage 키 */
export const SNACK_BOX_COUNT_KEY = 'girogi_snack_box_count'

// ============================================
// 색상 매핑 (Color Mappings)
// ============================================

/** 시간대별 색상 매핑 */
export const TIME_SLOT_COLORS = {
  morning: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-500',
    border: 'border-orange-500',
    icon: 'text-orange-500',
  },
  afternoon: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500',
    icon: 'text-amber-500',
  },
  evening: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    border: 'border-blue-500',
    icon: 'text-blue-500',
  },
  night: {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-500',
    border: 'border-indigo-500',
    icon: 'text-indigo-500',
  },
} as const

/** 식사 타입별 색상 매핑 */
export const MEAL_TYPE_COLORS = {
  breakfast: {
    bg: 'bg-orange-50',
    text: 'text-orange-500',
    icon: 'text-orange-500',
  },
  lunch: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    icon: 'text-amber-600',
  },
  dinner: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: 'text-blue-600',
  },
  snack: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    icon: 'text-purple-600',
  },
} as const

/** 보상 타입별 색상 매핑 */
export const REWARD_COLORS = {
  snackBox: {
    bg50: 'bg-purple-50',
    bg100: 'bg-purple-100',
    bg500: 'bg-purple-500',
    text: 'text-purple-600',
    textWhite: 'text-white',
  },
  cheatDay: {
    bg50: 'bg-primary-50',
    bg100: 'bg-primary-100',
    bg500: 'bg-primary-500',
    text: 'text-primary',
    textWhite: 'text-white',
  },
} as const
