/**
 * 뱃지 시스템 상수 정의
 * 음식별 뱃지 50종 (Phase 1)
 *
 * Phase 2에서 100종으로 확장 예정
 */

import { Badge, BadgeCategory, BadgeRarity } from '@/types/badge';

/**
 * 전체 뱃지 리스트 (50종)
 */
export const BADGES: Badge[] = [
  // 🐟 단백질 (15종)
  {
    id: 'badge_mackerel',
    name: '고등어',
    emoji: '🐟',
    category: 'protein',
    rarity: 'common',
    description: '오메가3가 풍부한 생선',
  },
  {
    id: 'badge_salmon',
    name: '연어',
    emoji: '🍣',
    category: 'protein',
    rarity: 'rare',
    description: '프리미엄 오메가3',
  },
  {
    id: 'badge_chicken_breast',
    name: '닭가슴살',
    emoji: '🍗',
    category: 'protein',
    rarity: 'common',
    description: '다이어트 필수 단백질',
  },
  {
    id: 'badge_egg',
    name: '계란',
    emoji: '🥚',
    category: 'protein',
    rarity: 'common',
    description: '완전 식품',
  },
  {
    id: 'badge_tofu',
    name: '두부',
    emoji: '🧈',
    category: 'protein',
    rarity: 'common',
    description: '식물성 단백질',
  },
  {
    id: 'badge_pork_belly',
    name: '삼겹살',
    emoji: '🥓',
    category: 'protein',
    rarity: 'epic',
    description: '가끔은 괜찮아',
  },
  {
    id: 'badge_beef',
    name: '소고기',
    emoji: '🥩',
    category: 'protein',
    rarity: 'rare',
    description: '철분 가득',
  },
  {
    id: 'badge_shrimp',
    name: '새우',
    emoji: '🦐',
    category: 'protein',
    rarity: 'common',
    description: '저칼로리 고단백',
  },
  {
    id: 'badge_squid',
    name: '오징어',
    emoji: '🦑',
    category: 'protein',
    rarity: 'common',
    description: '타우린 풍부',
  },
  {
    id: 'badge_tuna',
    name: '참치',
    emoji: '🐟',
    category: 'protein',
    rarity: 'common',
    description: '통조림도 좋아',
  },
  {
    id: 'badge_beans',
    name: '콩',
    emoji: '🫘',
    category: 'protein',
    rarity: 'common',
    description: '식물성 단백질',
  },
  {
    id: 'badge_yogurt',
    name: '그릭요거트',
    emoji: '🥛',
    category: 'protein',
    rarity: 'rare',
    description: '프로바이오틱스',
  },
  {
    id: 'badge_protein',
    name: '프로틴',
    emoji: '🥤',
    category: 'protein',
    rarity: 'epic',
    description: '운동 후 필수',
  },
  {
    id: 'badge_octopus',
    name: '문어',
    emoji: '🐙',
    category: 'protein',
    rarity: 'rare',
    description: '쫄깃한 단백질',
  },
  {
    id: 'badge_crab',
    name: '게',
    emoji: '🦀',
    category: 'protein',
    rarity: 'epic',
    description: '특별한 날',
  },

  // 🥗 채소 (15종)
  {
    id: 'badge_broccoli',
    name: '브로콜리',
    emoji: '🥦',
    category: 'vegetable',
    rarity: 'common',
    description: '슈퍼푸드',
  },
  {
    id: 'badge_spinach',
    name: '시금치',
    emoji: '🥬',
    category: 'vegetable',
    rarity: 'common',
    description: '철분 가득',
  },
  {
    id: 'badge_cabbage',
    name: '양배추',
    emoji: '🥬',
    category: 'vegetable',
    rarity: 'common',
    description: '위장 건강',
  },
  {
    id: 'badge_lettuce',
    name: '상추',
    emoji: '🥗',
    category: 'vegetable',
    rarity: 'common',
    description: '샐러드의 기본',
  },
  {
    id: 'badge_bean_sprouts',
    name: '콩나물',
    emoji: '🌱',
    category: 'vegetable',
    rarity: 'common',
    description: '해장의 왕',
  },
  {
    id: 'badge_carrot',
    name: '당근',
    emoji: '🥕',
    category: 'vegetable',
    rarity: 'common',
    description: '비타민A',
  },
  {
    id: 'badge_bell_pepper',
    name: '파프리카',
    emoji: '🫑',
    category: 'vegetable',
    rarity: 'common',
    description: '컬러풀 비타민',
  },
  {
    id: 'badge_mushroom',
    name: '버섯',
    emoji: '🍄',
    category: 'vegetable',
    rarity: 'common',
    description: '비타민D',
  },
  {
    id: 'badge_onion',
    name: '양파',
    emoji: '🧅',
    category: 'vegetable',
    rarity: 'common',
    description: '혈관 건강',
  },
  {
    id: 'badge_tomato',
    name: '토마토',
    emoji: '🍅',
    category: 'vegetable',
    rarity: 'common',
    description: '리코펜 풍부',
  },
  {
    id: 'badge_cucumber',
    name: '오이',
    emoji: '🥒',
    category: 'vegetable',
    rarity: 'common',
    description: '수분 가득',
  },
  {
    id: 'badge_eggplant',
    name: '가지',
    emoji: '🍆',
    category: 'vegetable',
    rarity: 'common',
    description: '안토시아닌',
  },
  {
    id: 'badge_pumpkin',
    name: '호박',
    emoji: '🎃',
    category: 'vegetable',
    rarity: 'common',
    description: '베타카로틴',
  },
  {
    id: 'badge_avocado',
    name: '아보카도',
    emoji: '🥑',
    category: 'vegetable',
    rarity: 'epic',
    description: '좋은 지방',
  },
  {
    id: 'badge_kale',
    name: '케일',
    emoji: '🥬',
    category: 'vegetable',
    rarity: 'rare',
    description: '영양소 폭탄',
  },

  // 🍚 탄수화물 (10종)
  {
    id: 'badge_brown_rice',
    name: '현미밥',
    emoji: '🍚',
    category: 'carb',
    rarity: 'common',
    description: '건강한 탄수화물',
  },
  {
    id: 'badge_white_rice',
    name: '백미밥',
    emoji: '🍚',
    category: 'carb',
    rarity: 'common',
    description: '한국인의 소울푸드',
  },
  {
    id: 'badge_sweet_potato',
    name: '고구마',
    emoji: '🍠',
    category: 'carb',
    rarity: 'common',
    description: '다이어트 필수',
  },
  {
    id: 'badge_potato',
    name: '감자',
    emoji: '🥔',
    category: 'carb',
    rarity: 'common',
    description: '포만감 좋아',
  },
  {
    id: 'badge_oats',
    name: '귀리',
    emoji: '🌾',
    category: 'carb',
    rarity: 'rare',
    description: '식이섬유 풍부',
  },
  {
    id: 'badge_whole_wheat',
    name: '통밀빵',
    emoji: '🍞',
    category: 'carb',
    rarity: 'common',
    description: '흰 빵보다 낫지',
  },
  {
    id: 'badge_rice_cake',
    name: '떡',
    emoji: '🍡',
    category: 'carb',
    rarity: 'epic',
    description: '가끔은 괜찮아',
  },
  {
    id: 'badge_noodles',
    name: '국수',
    emoji: '🍜',
    category: 'carb',
    rarity: 'common',
    description: '소화 잘 돼',
  },
  {
    id: 'badge_pasta',
    name: '파스타',
    emoji: '🍝',
    category: 'carb',
    rarity: 'rare',
    description: '가끔 먹는 양식',
  },
  {
    id: 'badge_quinoa',
    name: '퀴노아',
    emoji: '🌾',
    category: 'carb',
    rarity: 'epic',
    description: '슈퍼 곡물',
  },

  // 🍜 한식 요리 (10종)
  {
    id: 'badge_doenjang_stew',
    name: '된장찌개',
    emoji: '🍲',
    category: 'dish',
    rarity: 'common',
    description: '한국인의 소울푸드',
  },
  {
    id: 'badge_kimchi_stew',
    name: '김치찌개',
    emoji: '🍲',
    category: 'dish',
    rarity: 'common',
    description: '발효의 힘',
  },
  {
    id: 'badge_jeyuk',
    name: '제육볶음',
    emoji: '🍖',
    category: 'dish',
    rarity: 'common',
    description: '밥도둑',
  },
  {
    id: 'badge_bulgogi',
    name: '불고기',
    emoji: '🥩',
    category: 'dish',
    rarity: 'rare',
    description: '달달한 소고기',
  },
  {
    id: 'badge_bibimbap',
    name: '비빔밥',
    emoji: '🍚',
    category: 'dish',
    rarity: 'common',
    description: '골고루 영양',
  },
  {
    id: 'badge_salad',
    name: '샐러드',
    emoji: '🥗',
    category: 'dish',
    rarity: 'common',
    description: '다이어트 최고',
  },
  {
    id: 'badge_fried_rice',
    name: '볶음밥',
    emoji: '🍚',
    category: 'dish',
    rarity: 'common',
    description: '간단한 한 끼',
  },
  {
    id: 'badge_japchae',
    name: '잡채',
    emoji: '🍜',
    category: 'dish',
    rarity: 'rare',
    description: '잔치 음식',
  },
  {
    id: 'badge_kimbap',
    name: '김밥',
    emoji: '🍱',
    category: 'dish',
    rarity: 'common',
    description: '한국 샌드위치',
  },
  {
    id: 'badge_naengmyeon',
    name: '냉면',
    emoji: '🍜',
    category: 'dish',
    rarity: 'rare',
    description: '시원한 면',
  },
];

/**
 * 뱃지 ID로 뱃지 찾기
 */
export function getBadgeById(badgeId: string): Badge | undefined {
  return BADGES.find((badge) => badge.id === badgeId);
}

/**
 * 여러 뱃지 ID로 뱃지들 찾기
 */
export function getBadgesByIds(badgeIds: string[]): Badge[] {
  return badgeIds
    .map((id) => getBadgeById(id))
    .filter((badge): badge is Badge => badge !== undefined);
}

/**
 * 카테고리별 뱃지 필터링
 */
export function getBadgesByCategory(category: BadgeCategory): Badge[] {
  return BADGES.filter((badge) => badge.category === category);
}

/**
 * 희귀도별 뱃지 필터링
 */
export function getBadgesByRarity(rarity: BadgeRarity): Badge[] {
  return BADGES.filter((badge) => badge.rarity === rarity);
}

/**
 * 뱃지 검색 (이름 또는 ID)
 */
export function searchBadges(query: string): Badge[] {
  const lowerQuery = query.toLowerCase();
  return BADGES.filter(
    (badge) =>
      badge.name.toLowerCase().includes(lowerQuery) ||
      badge.id.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 카테고리 메타 정보
 */
export const BADGE_CATEGORY_META: Record<BadgeCategory, {
  name: string;
  emoji: string;
  description: string;
}> = {
  protein: {
    name: '단백질',
    emoji: '🐟',
    description: '근육과 건강을 위한 단백질',
  },
  vegetable: {
    name: '채소',
    emoji: '🥗',
    description: '비타민과 식이섬유',
  },
  carb: {
    name: '탄수화물',
    emoji: '🍚',
    description: '에너지의 원천',
  },
  dish: {
    name: '요리',
    emoji: '🍜',
    description: '완성된 한 끼',
  },
};

/**
 * 희귀도 메타 정보
 */
export const BADGE_RARITY_META: Record<BadgeRarity, {
  name: string;
  color: string; // Tailwind color class
}> = {
  common: {
    name: '일반',
    color: 'text-neutral-500',
  },
  rare: {
    name: '레어',
    color: 'text-blue-500',
  },
  epic: {
    name: '에픽',
    color: 'text-purple-500',
  },
  legendary: {
    name: '전설',
    color: 'text-yellow-500',
  },
};
