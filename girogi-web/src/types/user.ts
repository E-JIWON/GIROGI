/**
 * GIROGI 사용자 타입 정의
 *
 * User, UserGoals, UserStats 및 관련 헬퍼 타입
 */

/**
 * 사용자 엔티티
 *
 * 앱 사용자의 기본 정보와 공개 통계
 */
export interface User {
  /** 사용자 고유 식별자 (Firebase Auth / Supabase Auth UID) */
  id: string;
  /** 닉네임 (커뮤니티에서 표시되는 이름, 중복 불가, 3~20자) */
  nickname: string;
  /** 프로필 이미지 URL (Firebase Storage / Supabase Storage, null이면 기본 아바타) */
  profileImage?: string | null;
  /** 한 줄 소개 (최대 100자) */
  bio?: string | null;
  /** 현재 연속 성공 일수 (실패 시 0으로 리셋) */
  currentStreak: number;
  /** 총 성공일 (실패해도 누적값 유지) */
  totalSuccessDays: number;
  /** 총 유혹 극복 횟수 (10분 타이머 완료 횟수) */
  totalTemptationResisted: number;
  /** 과자박스 적립 수 */
  snackBoxCount: number;
  /** 팔로워 ID 리스트 (나를 팔로우하는 사용자들) */
  followers: string[];
  /** 팔로잉 ID 리스트 (내가 팔로우하는 사용자들) */
  following: string[];
  /** 계정 생성 일시 (ISO 8601 문자열) */
  createdAt: string;
}

/**
 * 팔로워 수 계산
 */
export function getFollowerCount(user: User): number {
  return user.followers.length;
}

/**
 * 팔로잉 수 계산
 */
export function getFollowingCount(user: User): number {
  return user.following.length;
}

/**
 * 특정 사용자를 팔로우 중인지 확인
 *
 * @param user - 확인할 사용자
 * @param userId - 확인할 대상 사용자 ID
 * @returns 팔로우 중이면 true
 */
export function isFollowing(user: User, userId: string): boolean {
  return user.following.includes(userId);
}

/**
 * 특정 사용자가 나를 팔로우 중인지 확인
 *
 * @param user - 확인할 사용자
 * @param userId - 확인할 대상 사용자 ID
 * @returns 팔로워이면 true
 */
export function isFollowedBy(user: User, userId: string): boolean {
  return user.followers.includes(userId);
}

/**
 * 사용자 목표 엔티티
 *
 * Episodic Future Thinking (EFT) 이론 적용
 * "되고 싶은 나" 목록을 저장하여 유혹 시 미래 자아 시각화
 */
export interface UserGoals {
  /** 미래 비전 리스트 (예: "링 위에서 멋있는 나", "10km 가볍게 뛰는 나") */
  futureVisions: string[];
}

/**
 * 기본 미래 비전 제공
 *
 * 앱 초기 설치 시 제공되는 기본 목표
 */
export function createDefaultUserGoals(): UserGoals {
  return {
    futureVisions: [
      '🥊 링 위에서 멋있는 나',
      '🏃 10km를 가볍게 뛰는 나',
      '👕 사이즈 걱정없이 쇼핑하는 나',
    ],
  };
}

/**
 * 체중 기록 엔티티
 *
 * 특정 날짜의 체중 측정 기록
 */
export interface WeightRecord {
  /** 체중 기록 고유 식별자 */
  id: string;
  /** 측정 날짜 (ISO 8601 문자열) */
  date: string;
  /** 체중 (kg 단위, 소수점 한 자리) */
  weight: number;
}

/**
 * 사용자 통계 엔티티
 *
 * 개인 또는 친구와의 비교를 위한 통계 정보
 * 듀오링고 스타일 친구 비교 기능에 활용
 */
export interface UserStats {
  /** 사용자 ID (User 모델의 ID 참조) */
  userId: string;
  /** 현재 연속 성공 일수 */
  currentStreak: number;
  /** 최장 연속 기록 */
  longestStreak: number;
  /** 총 성공 일수 */
  totalSuccessDays: number;
  /** 총 유혹 극복 횟수 */
  totalTemptationResisted: number;
  /** 과자박스 적립 수 */
  snackBoxCount: number;
  /** 주간 달성률 리스트 (최근 N주, 0.0 ~ 1.0) */
  weeklyProgress: number[];
  /** 체중 히스토리 (시작 체중 대비 변화 추적) */
  weightHistory: WeightRecord[];
}

/**
 * 평균 주간 달성률 계산
 *
 * @param stats - 사용자 통계
 * @returns 0.0 ~ 1.0 사이의 평균값
 */
export function getAverageWeeklyProgress(stats: UserStats): number {
  if (stats.weeklyProgress.length === 0) return 0.0;
  const sum = stats.weeklyProgress.reduce((a, b) => a + b, 0);
  return sum / stats.weeklyProgress.length;
}

/**
 * 시작 체중 가져오기
 *
 * @param stats - 사용자 통계
 * @returns 시작 체중 (kg), 기록이 없으면 null
 */
export function getStartingWeight(stats: UserStats): number | null {
  if (stats.weightHistory.length === 0) return null;
  return stats.weightHistory[0].weight;
}

/**
 * 현재 체중 가져오기
 *
 * @param stats - 사용자 통계
 * @returns 현재 체중 (kg), 기록이 없으면 null
 */
export function getCurrentWeight(stats: UserStats): number | null {
  if (stats.weightHistory.length === 0) return null;
  return stats.weightHistory[stats.weightHistory.length - 1].weight;
}

/**
 * 체중 변화량 계산
 *
 * @param stats - 사용자 통계
 * @returns 변화량 (kg), 음수면 감량, 양수면 증가, 기록 부족 시 null
 */
export function getWeightChange(stats: UserStats): number | null {
  const starting = getStartingWeight(stats);
  const current = getCurrentWeight(stats);
  if (starting === null || current === null) return null;
  return current - starting;
}

/**
 * 체중 변화율 계산
 *
 * @param stats - 사용자 통계
 * @returns 변화율 (%), 기록 부족 시 null
 */
export function getWeightChangeRate(stats: UserStats): number | null {
  const starting = getStartingWeight(stats);
  const change = getWeightChange(stats);
  if (starting === null || change === null) return null;
  return (change / starting) * 100;
}

/**
 * 사용자 비교 헬퍼 타입
 *
 * 두 사용자의 통계를 비교하는 유틸리티
 */
export interface UserStatsComparison {
  /** 비교 대상 A */
  userA: UserStats;
  /** 비교 대상 B */
  userB: UserStats;
}

/**
 * 연속 성공 일수 차이 계산
 *
 * @param comparison - 비교 객체
 * @returns A - B (양수면 A가 앞섬)
 */
export function getStreakDifference(comparison: UserStatsComparison): number {
  return comparison.userA.currentStreak - comparison.userB.currentStreak;
}

/**
 * 유혹 극복 횟수 차이 계산
 *
 * @param comparison - 비교 객체
 * @returns A - B
 */
export function getTemptationDifference(
  comparison: UserStatsComparison
): number {
  return (
    comparison.userA.totalTemptationResisted -
    comparison.userB.totalTemptationResisted
  );
}

/**
 * 과자박스 개수 차이 계산
 *
 * @param comparison - 비교 객체
 * @returns A - B
 */
export function getSnackBoxDifference(comparison: UserStatsComparison): number {
  return comparison.userA.snackBoxCount - comparison.userB.snackBoxCount;
}

/**
 * 평균 주간 달성률 차이 계산
 *
 * @param comparison - 비교 객체
 * @returns A - B (양수면 A가 높음)
 */
export function getAverageProgressDifference(
  comparison: UserStatsComparison
): number {
  return (
    getAverageWeeklyProgress(comparison.userA) -
    getAverageWeeklyProgress(comparison.userB)
  );
}

/**
 * 체중 변화량 차이 계산
 *
 * @param comparison - 비교 객체
 * @returns A - B (감량이 더 많으면 음수), 기록 부족 시 null
 */
export function getWeightChangeDifference(
  comparison: UserStatsComparison
): number | null {
  const changeA = getWeightChange(comparison.userA);
  const changeB = getWeightChange(comparison.userB);
  if (changeA === null || changeB === null) return null;
  return changeA - changeB;
}

/**
 * 승자 판정 (연속 성공 일수 기준)
 *
 * @param comparison - 비교 객체
 * @returns 승자의 userId, 동점이면 null
 */
export function getWinner(comparison: UserStatsComparison): string | null {
  const diff = getStreakDifference(comparison);
  if (diff > 0) return comparison.userA.userId;
  if (diff < 0) return comparison.userB.userId;
  return null;
}
