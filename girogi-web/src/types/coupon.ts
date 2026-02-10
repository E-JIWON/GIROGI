/**
 * 쿠폰 시스템 타입 정의
 * 치팅데이, 과자박스 쿠폰 관리
 */

export type CouponType = "cheat_day" | "snack_box";

/**
 * 쿠폰
 */
export interface Coupon {
  id: string;                 // UUID
  type: CouponType;           // "cheat_day" | "snack_box"
  issuedAt: string;           // ISO 8601 (발급 시각)
  usedAt?: string;            // ISO 8601 (사용 시각, 선택)
  isUsed: boolean;            // 사용 여부
  whatAte?: string;           // 무엇을 먹었는지 (선택, 사용 시 기록)
}

/**
 * 쿠폰 발급 조건
 */
export interface CouponIssueCondition {
  type: CouponType;
  requiredStreak: number;     // 필요한 연속 일수
  description: string;        // 설명
}

/**
 * 쿠폰 메타 정보
 */
export const COUPON_META: Record<CouponType, {
  name: string;
  emoji: string;
  description: string;
  requiredStreak: number;
}> = {
  cheat_day: {
    name: "치팅데이 쿠폰",
    emoji: "🎟️",
    description: "오늘은 마음껏 먹어도 괜찮아요!",
    requiredStreak: 7,
  },
  snack_box: {
    name: "과자박스 쿠폰",
    emoji: "🍫",
    description: "작은 간식 하나 드세요!",
    requiredStreak: 3,
  },
};
