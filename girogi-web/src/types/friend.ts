/**
 * 친구 비교 시스템 타입 정의
 */

import { User } from './models';
import { StreakData } from './streak';
import { UserBadge } from './badge';
import { UserAchievement } from './achievement';

/**
 * 친구 관계
 */
export interface Friendship {
  id: string;
  userId: string;           // 본인 ID
  friendId: string;         // 친구 ID
  createdAt: string;        // ISO 8601 (친구 추가 시각)
  isAccepted: boolean;      // 승인 여부 (양방향 승인 필요)
}

/**
 * 친구 프로필 데이터 (비교용)
 */
export interface FriendProfile {
  user: User;
  streakData: StreakData;
  badgeCount: number;       // 뱃지 종류 개수
  achievementCount: number; // 업적 달성 개수
  totalDays: number;        // 총 기록 일수
}

/**
 * 비교 결과
 */
export interface ComparisonResult {
  myProfile: FriendProfile;
  friendProfile: FriendProfile;
  winner: 'me' | 'friend' | 'tie'; // 누가 더 높은지
  difference: number;               // 차이 (절대값)
}

/**
 * 응원 메시지 타입
 */
export type EncouragementType =
  | 'ahead'        // 내가 앞서고 있을 때
  | 'behind'       // 내가 뒤처졌을 때
  | 'tie'          // 동점일 때
  | 'catchup';     // 따라잡기 가능할 때

/**
 * 응원 메시지
 */
export interface EncouragementMessage {
  type: EncouragementType;
  title: string;
  message: string;
  emoji: string;
}
