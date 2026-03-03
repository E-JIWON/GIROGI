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
// 유혹 극복 - 감정별 대안 행동
// ============================================

import { EmotionType } from '@/types/enums'
import type { AlternativeAction } from '@/types/models'

/** 감정별 대안 행동 목록 */
export const ALTERNATIVE_ACTIONS: Record<EmotionType, AlternativeAction[]> = {
  [EmotionType.STRESS]: [
    { id: 'stress-1', icon: '🌬️', title: '심호흡 3회', description: '4초 들이쉬고, 7초 참고, 8초 내쉬기' },
    { id: 'stress-2', icon: '🚶', title: '5분 산책', description: '바깥 공기를 마시며 잠깐 걸어보세요' },
    { id: 'stress-3', icon: '🧘', title: '스트레칭', description: '목, 어깨, 허리를 가볍게 풀어주세요' },
    { id: 'stress-4', icon: '🎵', title: '좋아하는 음악 듣기', description: '기분 전환에 효과적입니다' },
  ],
  [EmotionType.BOREDOM]: [
    { id: 'boredom-1', icon: '💧', title: '물 한 잔 마시기', description: '갈증이 배고픔으로 느껴질 수 있어요' },
    { id: 'boredom-2', icon: '📱', title: '친구에게 연락하기', description: '안부를 물으면 심심함이 사라져요' },
    { id: 'boredom-3', icon: '🎨', title: '취미 활동하기', description: '좋아하는 취미에 몰두해보세요' },
    { id: 'boredom-4', icon: '🧹', title: '주변 정리정돈', description: '깔끔한 환경이 마음도 정리해줍니다' },
  ],
  [EmotionType.HABITUAL]: [
    { id: 'habitual-1', icon: '🏠', title: '환경 바꾸기', description: '다른 방으로 이동하거나 자리를 옮겨보세요' },
    { id: 'habitual-2', icon: '🪥', title: '양치질하기', description: '입안이 상쾌하면 간식 욕구가 줄어요' },
    { id: 'habitual-3', icon: '🫧', title: '껌 씹기', description: '입이 심심할 때 효과적입니다' },
    { id: 'habitual-4', icon: '🍵', title: '따뜻한 차 마시기', description: '허브차나 녹차가 좋습니다' },
  ],
  [EmotionType.REWARD_SEEKING]: [
    { id: 'reward-1', icon: '🏆', title: '보상 현황 확인', description: '과자박스, 치팅데이까지 얼마나 남았는지 확인!' },
    { id: 'reward-2', icon: '🛁', title: '비음식 보상 즐기기', description: '좋아하는 영상, 반신욕, 마사지 등' },
    { id: 'reward-3', icon: '📊', title: '성과 돌아보기', description: '지금까지 얼마나 잘해왔는지 확인해보세요' },
  ],
  [EmotionType.HUNGRY]: [
    { id: 'hungry-1', icon: '🥗', title: '건강 간식 먹기', description: '과일, 견과류, 삶은 달걀 등' },
    { id: 'hungry-2', icon: '⏰', title: '마지막 식사 확인', description: '식사한 지 4시간 이상이면 진짜 배고픈 거예요' },
    { id: 'hungry-3', icon: '💧', title: '물 먼저 마시기', description: '갈증을 배고픔으로 착각할 수 있어요' },
  ],
}

/** 가이드 타이머 격려 메시지 (2분 간격 표시) */
export const GUIDED_TIMER_MESSAGES = [
  '잘하고 있어요! 충동은 곧 지나갑니다',
  '2분이 지났어요. 대안 행동을 시도해보세요',
  '절반 가까이 왔어요! 조금만 더 버텨봐요',
  '6분이 지났어요. 충동이 약해지고 있을 거예요',
  '거의 다 왔어요! 이겨낼 수 있습니다',
] as const

/** 감정별 맞춤 격려 메시지 */
export const EMOTION_ENCOURAGEMENT: Record<EmotionType, string> = {
  [EmotionType.STRESS]: '스트레스는 일시적이에요. 음식 대신 다른 해소법을 찾아볼까요?',
  [EmotionType.BOREDOM]: '심심함은 배고픔이 아니에요. 잠깐 다른 걸 해볼까요?',
  [EmotionType.HABITUAL]: '습관을 인식한 것만으로도 대단해요. 패턴을 바꿔봐요!',
  [EmotionType.REWARD_SEEKING]: '진짜 보상은 목표 달성이에요. 조금만 참아볼까요?',
  [EmotionType.HUNGRY]: '진짜 배고프다면 건강한 간식을 먹는 게 좋아요!',
}

/** 4-7-8 호흡법 단계 */
export const BREATHING_STEPS = [
  { phase: 'inhale' as const, duration: 4, label: '들이쉬기', description: '코로 천천히' },
  { phase: 'hold' as const, duration: 7, label: '참기', description: '숨을 참으세요' },
  { phase: 'exhale' as const, duration: 8, label: '내쉬기', description: '입으로 천천히' },
] as const

/** 감정별 맞춤 EFT 메시지 */
export const EFT_MESSAGES_BY_EMOTION: Record<EmotionType, string[]> = {
  [EmotionType.STRESS]: [
    '스트레스 먹기는 일시적 위안일 뿐, 더 큰 후회가 와요',
    '건강해진 미래의 나는 스트레스를 다른 방법으로 풀어요',
  ],
  [EmotionType.BOREDOM]: [
    '심심함을 음식으로 달래면 체중만 늘어요',
    '미래의 날씬한 나는 다른 즐거움을 찾았어요',
  ],
  [EmotionType.HABITUAL]: [
    '습관을 바꾸는 게 다이어트의 핵심이에요',
    '새로운 습관이 미래의 나를 만듭니다',
  ],
  [EmotionType.REWARD_SEEKING]: [
    '진짜 보상은 목표 체중에 도달하는 거예요',
    '지금 참으면 과자박스/치팅데이가 더 가까워져요',
  ],
  [EmotionType.HUNGRY]: [
    '건강한 간식으로도 충분히 만족할 수 있어요',
    '목표 체중의 나는 건강하게 먹는 습관이 있어요',
  ],
}

// ============================================
// 색상 매핑 (Color Mappings)
// ============================================

/** 시간대별 색상 매핑 (TimeSlot enum 키 기준) */
export const TIME_SLOT_COLORS = {
  morning: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-500',
    border: 'border-orange-500',
    icon: 'text-orange-500',
    checkbox: 'bg-orange-500',
  },
  lunch: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500',
    icon: 'text-amber-500',
    checkbox: 'bg-amber-500',
  },
  afterWork: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-500',
    border: 'border-rose-500',
    icon: 'text-rose-500',
    checkbox: 'bg-rose-500',
  },
  dinner: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    border: 'border-blue-500',
    icon: 'text-blue-500',
    checkbox: 'bg-blue-500',
  },
  exercise: {
    bg: 'bg-green-500/10',
    text: 'text-green-500',
    border: 'border-green-500',
    icon: 'text-green-500',
    checkbox: 'bg-green-500',
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
