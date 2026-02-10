/**
 * 업적 시스템 상수 정의
 * 뱃지 수집, 스트릭 달성 등 업적 10개 (Phase 1)
 *
 * Phase 2에서 30개로 확장 예정
 */

import { Achievement } from '@/types/achievement';

/**
 * 전체 업적 리스트 (10개)
 */
export const ACHIEVEMENTS: Achievement[] = [
  // 뱃지 수집 업적 (5개)
  {
    id: 'achievement_egg_lover',
    name: '계란 덕후',
    description: '계란 뱃지 50개 획득',
    emoji: '🥚',
    condition: {
      type: 'badge_count',
      badgeId: 'badge_egg',
      targetCount: 50,
    },
    reward: {
      type: 'title',
      value: '계란 마스터',
    },
  },
  {
    id: 'achievement_fish_lover',
    name: '오메가3 전문가',
    description: '생선 뱃지 30개 획득 (고등어+연어+참치 합산)',
    emoji: '🐟',
    condition: {
      type: 'custom', // 여러 뱃지 합산이므로 custom
      targetCount: 30,
    },
    reward: {
      type: 'title',
      value: '피쉬 러버',
    },
  },
  {
    id: 'achievement_rabbit_mode',
    name: '래빗 모드',
    description: '샐러드 뱃지 20개 획득',
    emoji: '🥗',
    condition: {
      type: 'badge_count',
      badgeId: 'badge_salad',
      targetCount: 20,
    },
    reward: {
      type: 'sticker',
      value: 'sticker_rabbit',
    },
  },
  {
    id: 'achievement_vegan_challenge',
    name: '비건 도전자',
    description: '고기 없이 7일 연속 기록',
    emoji: '🌱',
    condition: {
      type: 'custom', // 특수 조건
      targetCount: 7,
    },
    reward: {
      type: 'theme',
      value: 'theme_plant',
    },
  },
  {
    id: 'achievement_healthy_grain',
    name: '건강밥상',
    description: '현미밥 뱃지 30개 획득',
    emoji: '🍚',
    condition: {
      type: 'badge_count',
      badgeId: 'badge_brown_rice',
      targetCount: 30,
    },
    reward: {
      type: 'theme',
      value: 'theme_grain',
    },
  },

  // 스트릭 업적 (3개)
  {
    id: 'achievement_flame_beginner',
    name: '불꽃 초보자',
    description: '7일 연속 기록',
    emoji: '🔥',
    condition: {
      type: 'streak',
      targetCount: 7,
    },
    reward: {
      type: 'title',
      value: '불꽃 초보자',
    },
  },
  {
    id: 'achievement_habit_master',
    name: '습관의 달인',
    description: '30일 연속 기록',
    emoji: '💪',
    condition: {
      type: 'streak',
      targetCount: 30,
    },
    reward: {
      type: 'title',
      value: '습관의 달인',
    },
  },
  {
    id: 'achievement_diet_master',
    name: '다이어트 마스터',
    description: '100일 연속 기록',
    emoji: '👑',
    condition: {
      type: 'streak',
      targetCount: 100,
    },
    reward: {
      type: 'title',
      value: '다이어트 마스터',
    },
  },

  // 총 기록 일수 업적 (2개)
  {
    id: 'achievement_100_days',
    name: '100일의 기록',
    description: '총 100일 기록',
    emoji: '💯',
    condition: {
      type: 'total_days',
      targetCount: 100,
    },
    reward: {
      type: 'sticker',
      value: 'sticker_100',
    },
  },
  {
    id: 'achievement_1_year',
    name: '1년의 여정',
    description: '총 365일 기록',
    emoji: '🎉',
    condition: {
      type: 'total_days',
      targetCount: 365,
    },
    reward: {
      type: 'theme',
      value: 'theme_anniversary',
    },
  },
];

/**
 * 업적 ID로 업적 찾기
 */
export function getAchievementById(achievementId: string): Achievement | undefined {
  return ACHIEVEMENTS.find((achievement) => achievement.id === achievementId);
}

/**
 * 조건 타입별 업적 필터링
 */
export function getAchievementsByConditionType(
  type: 'badge_count' | 'streak' | 'total_days' | 'custom'
): Achievement[] {
  return ACHIEVEMENTS.filter((achievement) => achievement.condition.type === type);
}

/**
 * 보상 타입별 업적 필터링
 */
export function getAchievementsByRewardType(
  type: 'title' | 'theme' | 'sticker' | 'coupon'
): Achievement[] {
  return ACHIEVEMENTS.filter((achievement) => achievement.reward.type === type);
}

/**
 * 칭호 목록 (업적 보상으로 획득 가능한 칭호)
 */
export const TITLES = [
  '계란 마스터',
  '피쉬 러버',
  '불꽃 초보자',
  '습관의 달인',
  '다이어트 마스터',
];

/**
 * 테마 목록 (업적 보상으로 획득 가능한 테마)
 */
export const THEMES = [
  {
    id: 'theme_plant',
    name: '식물 테마',
    description: '초록초록한 비건 테마',
    colors: {
      primary: 'green',
      secondary: 'lime',
    },
  },
  {
    id: 'theme_grain',
    name: '곡물 테마',
    description: '따뜻한 곡물 테마',
    colors: {
      primary: 'amber',
      secondary: 'yellow',
    },
  },
  {
    id: 'theme_anniversary',
    name: '기념일 테마',
    description: '1년 기념 특별 테마',
    colors: {
      primary: 'purple',
      secondary: 'pink',
    },
  },
];

/**
 * 스티커 목록 (업적 보상으로 획득 가능한 스티커)
 */
export const STICKERS = [
  {
    id: 'sticker_rabbit',
    name: '토끼 스티커',
    emoji: '🐰',
    description: '샐러드 마스터의 증표',
  },
  {
    id: 'sticker_100',
    name: '100일 스티커',
    emoji: '💯',
    description: '100일 기록 기념',
  },
];
