/**
 * 친구 비교 유틸리티
 *
 * 본인과 친구의 데이터를 비교하여
 * ComparisonResult 생성
 */

import { FriendProfile, ComparisonResult } from '@/types/friend';

/**
 * 현재 Streak 기준으로 비교 결과 생성
 */
export function calculateComparison(
  myProfile: FriendProfile,
  friendProfile: FriendProfile
): ComparisonResult {
  const currentStreakDiff =
    myProfile.streakData.currentStreak - friendProfile.streakData.currentStreak;

  const winner =
    currentStreakDiff > 0 ? 'me' : currentStreakDiff < 0 ? 'friend' : ('tie' as const);

  const difference = Math.abs(currentStreakDiff);

  return {
    myProfile,
    friendProfile,
    winner,
    difference,
  };
}

/**
 * 여러 지표의 종합 점수 계산
 * (현재 Streak, 최장 Streak, 총 일수, 뱃지, 업적)
 */
export function calculateOverallScore(profile: FriendProfile): number {
  const { streakData, badgeCount, achievementCount, totalDays } = profile;

  // 가중치 적용
  const currentStreakScore = streakData.currentStreak * 3; // 현재 Streak 가장 중요
  const longestStreakScore = streakData.longestStreak * 2;
  const totalDaysScore = totalDays * 1;
  const badgeScore = badgeCount * 2;
  const achievementScore = achievementCount * 5; // 업적이 가장 어려움

  return (
    currentStreakScore +
    longestStreakScore +
    totalDaysScore +
    badgeScore +
    achievementScore
  );
}

/**
 * 종합 점수 기준으로 비교 결과 생성
 */
export function calculateOverallComparison(
  myProfile: FriendProfile,
  friendProfile: FriendProfile
): ComparisonResult {
  const myScore = calculateOverallScore(myProfile);
  const friendScore = calculateOverallScore(friendProfile);

  const scoreDiff = myScore - friendScore;
  const winner = scoreDiff > 0 ? 'me' : scoreDiff < 0 ? 'friend' : ('tie' as const);
  const difference = Math.abs(scoreDiff);

  return {
    myProfile,
    friendProfile,
    winner,
    difference,
  };
}

/**
 * 친구 순위 계산 (점수 기준)
 */
export function rankFriends(friends: FriendProfile[]): FriendProfile[] {
  return [...friends].sort((a, b) => {
    const scoreA = calculateOverallScore(a);
    const scoreB = calculateOverallScore(b);
    return scoreB - scoreA; // 내림차순
  });
}

/**
 * 친구가 따라잡을 수 있는지 계산
 * (현재 Streak 차이가 3일 이하면 따라잡기 가능)
 */
export function canCatchUp(
  myProfile: FriendProfile,
  friendProfile: FriendProfile
): boolean {
  const streakDiff =
    friendProfile.streakData.currentStreak - myProfile.streakData.currentStreak;
  return streakDiff > 0 && streakDiff <= 3;
}
