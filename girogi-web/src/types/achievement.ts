/**
 * 업적 시스템 타입 정의
 * 뱃지 수집, 스트릭 달성 등 업적 관리
 */

export type AchievementConditionType =
  | "badge_count"     // 특정 뱃지 N개 획득
  | "streak"          // 연속 N일 기록
  | "total_days"      // 총 N일 기록
  | "custom";         // 커스텀 조건

export type AchievementRewardType =
  | "title"           // 칭호
  | "theme"           // 테마
  | "sticker"         // 스티커
  | "coupon";         // 쿠폰

/**
 * 업적 달성 조건
 */
export interface AchievementCondition {
  type: AchievementConditionType;
  badgeId?: string;           // badge_count일 때 필요
  targetCount: number;        // 목표 개수/일수
}

/**
 * 업적 보상
 */
export interface AchievementReward {
  type: AchievementRewardType;
  value: string;              // 칭호명, 테마ID, 스티커ID, 쿠폰타입 등
}

/**
 * 업적 정의
 */
export interface Achievement {
  id: string;                 // "achievement_egg_lover"
  name: string;               // "계란 덕후"
  description: string;        // "계란 뱃지 50개 획득"
  emoji: string;              // "🥚"
  condition: AchievementCondition;
  reward: AchievementReward;
}

/**
 * 사용자가 획득한 업적
 */
export interface UserAchievement {
  achievementId: string;      // Achievement.id
  unlockedAt: string;         // ISO 8601 (획득 시각)
  isNew: boolean;             // 알림 표시 여부
}
