/**
 * 업적 체크 유틸리티
 *
 * 업적 달성 조건 체크 및 검증
 */

import { Achievement, UserAchievement } from '@/types/achievement';
import { UserBadge } from '@/types/badge';
import { StreakData } from '@/types/streak';
import { ACHIEVEMENTS } from '@/lib/constants/achievements';

/**
 * 업적 달성 여부 체크
 *
 * @param achievement - 업적 정보
 * @param userBadges - 사용자 뱃지 목록
 * @param streakData - 스트릭 데이터
 * @returns 달성 여부
 */
export function checkAchievement(
  achievement: Achievement,
  userBadges: UserBadge[],
  streakData: StreakData
): boolean {
  switch (achievement.condition.type) {
    case 'badge_count':
      return checkBadgeCountCondition(achievement, userBadges);

    case 'streak':
      return checkStreakCondition(achievement, streakData);

    case 'total_days':
      return checkTotalDaysCondition(achievement, streakData);

    case 'custom':
      return checkCustomCondition(achievement, userBadges, streakData);

    default:
      return false;
  }
}

/**
 * 뱃지 개수 조건 체크
 */
function checkBadgeCountCondition(
  achievement: Achievement,
  userBadges: UserBadge[]
): boolean {
  if (!achievement.condition.badgeId) {
    return false;
  }

  const badge = userBadges.find((ub) => ub.badgeId === achievement.condition.badgeId);
  const count = badge?.count || 0;

  return count >= achievement.condition.targetCount;
}

/**
 * 스트릭 조건 체크
 */
function checkStreakCondition(achievement: Achievement, streakData: StreakData): boolean {
  return streakData.currentStreak >= achievement.condition.targetCount;
}

/**
 * 총 기록 일수 조건 체크
 */
function checkTotalDaysCondition(achievement: Achievement, streakData: StreakData): boolean {
  return streakData.totalDays >= achievement.condition.targetCount;
}

/**
 * 커스텀 조건 체크
 * Phase 2에서 구현 예정
 */
function checkCustomCondition(
  achievement: Achievement,
  userBadges: UserBadge[],
  streakData: StreakData
): boolean {
  // 특수 조건별 구현
  switch (achievement.id) {
    case 'achievement_fish_lover':
      // 생선 뱃지 합산 (고등어 + 연어 + 참치)
      return checkFishLoverCondition(userBadges);

    case 'achievement_vegan_challenge':
      // 고기 없이 7일 연속 (Phase 2에서 구현)
      return false;

    default:
      return false;
  }
}

/**
 * 생선 러버 조건 체크
 * 고등어 + 연어 + 참치 합산 30개
 */
function checkFishLoverCondition(userBadges: UserBadge[]): boolean {
  const fishBadgeIds = ['badge_mackerel', 'badge_salmon', 'badge_tuna'];

  const totalCount = userBadges
    .filter((ub) => fishBadgeIds.includes(ub.badgeId))
    .reduce((sum, ub) => sum + ub.count, 0);

  return totalCount >= 30;
}

/**
 * 새로 달성한 업적 찾기
 *
 * @param userBadges - 사용자 뱃지 목록
 * @param streakData - 스트릭 데이터
 * @param userAchievements - 이미 획득한 업적
 * @returns 새로 달성한 업적 배열
 */
export function findNewAchievements(
  userBadges: UserBadge[],
  streakData: StreakData,
  userAchievements: UserAchievement[]
): Achievement[] {
  const achievedIds = new Set(userAchievements.map((ua) => ua.achievementId));

  return ACHIEVEMENTS.filter((achievement) => {
    // 이미 획득한 업적 제외
    if (achievedIds.has(achievement.id)) {
      return false;
    }

    // 달성 조건 체크
    return checkAchievement(achievement, userBadges, streakData);
  });
}

/**
 * 업적 진행도 계산
 *
 * @param achievement - 업적 정보
 * @param userBadges - 사용자 뱃지 목록
 * @param streakData - 스트릭 데이터
 * @returns 진행도 (0.0 ~ 1.0)
 */
export function getAchievementProgress(
  achievement: Achievement,
  userBadges: UserBadge[],
  streakData: StreakData
): number {
  let current = 0;
  const target = achievement.condition.targetCount;

  switch (achievement.condition.type) {
    case 'badge_count':
      if (achievement.condition.badgeId) {
        const badge = userBadges.find((ub) => ub.badgeId === achievement.condition.badgeId);
        current = badge?.count || 0;
      }
      break;

    case 'streak':
      current = streakData.currentStreak;
      break;

    case 'total_days':
      current = streakData.totalDays;
      break;

    case 'custom':
      // 커스텀 조건별 구현
      if (achievement.id === 'achievement_fish_lover') {
        const fishBadgeIds = ['badge_mackerel', 'badge_salmon', 'badge_tuna'];
        current = userBadges
          .filter((ub) => fishBadgeIds.includes(ub.badgeId))
          .reduce((sum, ub) => sum + ub.count, 0);
      }
      break;
  }

  return Math.min(current / target, 1.0);
}

/**
 * 업적 진행도 퍼센트
 *
 * @param achievement - 업적 정보
 * @param userBadges - 사용자 뱃지 목록
 * @param streakData - 스트릭 데이터
 * @returns 퍼센트 (0 ~ 100)
 */
export function getAchievementProgressPercent(
  achievement: Achievement,
  userBadges: UserBadge[],
  streakData: StreakData
): number {
  const progress = getAchievementProgress(achievement, userBadges, streakData);
  return Math.round(progress * 100);
}

/**
 * 달성 가능한 업적 필터링
 * 진행도 50% 이상인 업적
 *
 * @param userBadges - 사용자 뱃지 목록
 * @param streakData - 스트릭 데이터
 * @param userAchievements - 이미 획득한 업적
 * @returns 달성 가능한 업적 배열
 */
export function getAchievableAchievements(
  userBadges: UserBadge[],
  streakData: StreakData,
  userAchievements: UserAchievement[]
): Achievement[] {
  const achievedIds = new Set(userAchievements.map((ua) => ua.achievementId));

  return ACHIEVEMENTS.filter((achievement) => {
    if (achievedIds.has(achievement.id)) {
      return false;
    }

    const progress = getAchievementProgress(achievement, userBadges, streakData);
    return progress >= 0.5;
  });
}

/**
 * 다음 달성할 업적 추천
 * 진행도가 높은 순서대로 정렬
 *
 * @param userBadges - 사용자 뱃지 목록
 * @param streakData - 스트릭 데이터
 * @param userAchievements - 이미 획득한 업적
 * @param limit - 최대 개수 (기본 3개)
 * @returns 추천 업적 배열
 */
export function getRecommendedAchievements(
  userBadges: UserBadge[],
  streakData: StreakData,
  userAchievements: UserAchievement[],
  limit = 3
): Array<{
  achievement: Achievement;
  progress: number;
  progressPercent: number;
}> {
  const achievedIds = new Set(userAchievements.map((ua) => ua.achievementId));

  const recommendations = ACHIEVEMENTS.filter((achievement) => !achievedIds.has(achievement.id))
    .map((achievement) => ({
      achievement,
      progress: getAchievementProgress(achievement, userBadges, streakData),
      progressPercent: getAchievementProgressPercent(achievement, userBadges, streakData),
    }))
    .sort((a, b) => b.progress - a.progress)
    .slice(0, limit);

  return recommendations;
}

/**
 * 업적 카테고리별 달성률
 *
 * @param userAchievements - 획득한 업적
 * @returns 카테고리별 달성률
 */
export function getAchievementCategoryStats(userAchievements: UserAchievement[]): {
  badgeCount: { total: number; achieved: number; percentage: number };
  streak: { total: number; achieved: number; percentage: number };
  totalDays: { total: number; achieved: number; percentage: number };
  custom: { total: number; achieved: number; percentage: number };
} {
  const achievedIds = new Set(userAchievements.map((ua) => ua.achievementId));

  const stats = {
    badgeCount: { total: 0, achieved: 0, percentage: 0 },
    streak: { total: 0, achieved: 0, percentage: 0 },
    totalDays: { total: 0, achieved: 0, percentage: 0 },
    custom: { total: 0, achieved: 0, percentage: 0 },
  };

  ACHIEVEMENTS.forEach((achievement) => {
    const type = achievement.condition.type;
    const isAchieved = achievedIds.has(achievement.id);

    if (type === 'badge_count') {
      stats.badgeCount.total++;
      if (isAchieved) stats.badgeCount.achieved++;
    } else if (type === 'streak') {
      stats.streak.total++;
      if (isAchieved) stats.streak.achieved++;
    } else if (type === 'total_days') {
      stats.totalDays.total++;
      if (isAchieved) stats.totalDays.achieved++;
    } else if (type === 'custom') {
      stats.custom.total++;
      if (isAchieved) stats.custom.achieved++;
    }
  });

  // 퍼센트 계산
  Object.keys(stats).forEach((key) => {
    const category = stats[key as keyof typeof stats];
    if (category.total > 0) {
      category.percentage = Math.round((category.achieved / category.total) * 100);
    }
  });

  return stats;
}
