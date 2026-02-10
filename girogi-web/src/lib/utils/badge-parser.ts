/**
 * 뱃지 파서 유틸리티
 *
 * 메뉴 문자열을 파싱해서 뱃지 ID 추출
 * 예: "고등어구이 + 샐러드 + 현미밥" → ["badge_mackerel", "badge_salad", "badge_brown_rice"]
 */

import { BADGES } from '@/lib/constants/badges';
import { Badge } from '@/types/badge';

/**
 * 메뉴 문자열에서 뱃지 ID 추출
 *
 * @param menuText - 메뉴 문자열 (예: "고등어구이, 샐러드, 현미밥")
 * @returns 추출된 뱃지 ID 배열
 */
export function parseBadgesFromMenu(menuText: string): string[] {
  if (!menuText || menuText.trim() === '') {
    return [];
  }

  const badgeIds: string[] = [];
  const lowerMenuText = menuText.toLowerCase();

  // 모든 뱃지를 순회하며 매칭
  BADGES.forEach((badge) => {
    const lowerBadgeName = badge.name.toLowerCase();

    // 완전 일치 또는 포함 여부 체크
    if (
      lowerMenuText.includes(lowerBadgeName) ||
      menuText.includes(badge.name) ||
      menuText.includes(badge.emoji)
    ) {
      badgeIds.push(badge.id);
    }
  });

  // 중복 제거
  return [...new Set(badgeIds)];
}

/**
 * 태그 배열에서 뱃지 ID 추출
 *
 * @param tags - 태그 배열 (예: ["고등어", "샐러드", "현미밥"])
 * @returns 추출된 뱃지 ID 배열
 */
export function parseBadgesFromTags(tags: string[]): string[] {
  const badgeIds: string[] = [];

  tags.forEach((tag) => {
    const badge = findBadgeByName(tag);
    if (badge) {
      badgeIds.push(badge.id);
    }
  });

  return badgeIds;
}

/**
 * 뱃지 이름으로 뱃지 찾기
 *
 * @param name - 뱃지 이름 (예: "고등어", "샐러드")
 * @returns 매칭된 뱃지 또는 undefined
 */
export function findBadgeByName(name: string): Badge | undefined {
  const lowerName = name.toLowerCase().trim();

  return BADGES.find((badge) => {
    const lowerBadgeName = badge.name.toLowerCase();
    return (
      lowerBadgeName === lowerName ||
      lowerBadgeName.includes(lowerName) ||
      lowerName.includes(lowerBadgeName)
    );
  });
}

/**
 * 뱃지 ID로 뱃지 정보 조회
 *
 * @param badgeIds - 뱃지 ID 배열
 * @returns 뱃지 배열
 */
export function getBadgesByIds(badgeIds: string[]): Badge[] {
  return BADGES.filter((badge) => badgeIds.includes(badge.id));
}

/**
 * 키워드 기반 뱃지 추천
 * 사용자가 입력한 메뉴명에서 추천 뱃지 제안
 *
 * @param partialMenuText - 부분 메뉴 문자열 (예: "고등")
 * @param limit - 최대 추천 개수 (기본 5개)
 * @returns 추천 뱃지 배열
 */
export function suggestBadges(partialMenuText: string, limit = 5): Badge[] {
  if (!partialMenuText || partialMenuText.trim().length < 2) {
    return [];
  }

  const lowerText = partialMenuText.toLowerCase().trim();

  const matches = BADGES.filter((badge) => {
    const lowerBadgeName = badge.name.toLowerCase();
    return lowerBadgeName.includes(lowerText) || lowerText.includes(lowerBadgeName);
  });

  return matches.slice(0, limit);
}

/**
 * 뱃지 ID를 이모지 문자열로 변환
 *
 * @param badgeIds - 뱃지 ID 배열
 * @returns 이모지 문자열 (예: "🐟 🥗 🍚")
 */
export function badgeIdsToEmojis(badgeIds: string[]): string {
  const badges = getBadgesByIds(badgeIds);
  return badges.map((badge) => badge.emoji).join(' ');
}

/**
 * 뱃지 ID를 이름 문자열로 변환
 *
 * @param badgeIds - 뱃지 ID 배열
 * @returns 이름 문자열 (예: "고등어, 샐러드, 현미밥")
 */
export function badgeIdsToNames(badgeIds: string[]): string {
  const badges = getBadgesByIds(badgeIds);
  return badges.map((badge) => badge.name).join(', ');
}

/**
 * 메뉴 문자열 정규화
 * 구분자를 통일하고 공백 정리
 *
 * @param menuText - 원본 메뉴 문자열
 * @returns 정규화된 메뉴 문자열
 */
export function normalizeMenuText(menuText: string): string {
  return menuText
    .replace(/[+,、]/g, ', ') // 다양한 구분자를 쉼표로 통일
    .replace(/\s+/g, ' ') // 연속 공백 제거
    .trim();
}

/**
 * 뱃지 매칭 통계
 * 디버깅 및 분석용
 *
 * @param menuText - 메뉴 문자열
 * @returns 매칭 정보
 */
export function getBadgeMatchStats(menuText: string): {
  total: number;
  protein: number;
  vegetable: number;
  carb: number;
  dish: number;
} {
  const badgeIds = parseBadgesFromMenu(menuText);
  const badges = getBadgesByIds(badgeIds);

  return {
    total: badges.length,
    protein: badges.filter((b) => b.category === 'protein').length,
    vegetable: badges.filter((b) => b.category === 'vegetable').length,
    carb: badges.filter((b) => b.category === 'carb').length,
    dish: badges.filter((b) => b.category === 'dish').length,
  };
}
