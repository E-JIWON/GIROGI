/**
 * 뱃지 시스템 타입 정의
 * 음식별 뱃지 100종 이상
 */

export type BadgeCategory = "protein" | "vegetable" | "carb" | "dish";
export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

/**
 * 뱃지 기본 정보
 */
export interface Badge {
  id: string;                 // "badge_mackerel"
  name: string;               // "고등어"
  emoji: string;              // "🐟"
  category: BadgeCategory;    // "protein"
  rarity: BadgeRarity;        // "common"
  description?: string;       // "오메가3가 풍부한 생선"
}

/**
 * 사용자가 획득한 뱃지
 */
export interface UserBadge {
  badgeId: string;            // Badge.id
  count: number;              // 획득 횟수
  firstAcquired: string;      // ISO 8601 (처음 획득 시각)
  lastAcquired: string;       // ISO 8601 (마지막 획득 시각)
}

/**
 * 뱃지 획득 알림용
 */
export interface BadgeNotificationItem {
  badge: Badge;
  count: number;              // 이번에 획득한 총 개수
  isNew: boolean;             // 처음 획득하는 뱃지인지
}
