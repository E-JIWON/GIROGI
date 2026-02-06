/**
 * GIROGI 사용자 Mock 데이터
 *
 * Flutter의 MockUserRepository를 TypeScript로 변환
 * UI 개발 및 테스트용 샘플 데이터 제공
 */

import type { User, UserStats, UserGoals, WeightRecord } from '@/types';

/**
 * 현재 사용자 (나)
 */
export const mockCurrentUser: User = {
  id: 'user_current',
  nickname: '다이어터',
  profileImage: null,
  bio: '복싱 다이어트 도전 중!',
  currentStreak: 5,
  totalSuccessDays: 23,
  totalTemptationResisted: 12,
  snackBoxCount: 3,
  followers: ['user_2', 'user_3'],
  following: ['user_1', 'user_2'],
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 전
};

/**
 * 친구 1 - 운동왕
 */
export const mockUser1: User = {
  id: 'user_1',
  nickname: '운동왕',
  profileImage: null,
  bio: '매일 복싱!',
  currentStreak: 7,
  totalSuccessDays: 35,
  totalTemptationResisted: 18,
  snackBoxCount: 5,
  followers: ['user_current', 'user_3'],
  following: ['user_2'],
  createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60일 전
};

/**
 * 친구 2 - 건강한밥
 */
export const mockUser2: User = {
  id: 'user_2',
  nickname: '건강한밥',
  profileImage: null,
  bio: '집밥 최고',
  currentStreak: 3,
  totalSuccessDays: 18,
  totalTemptationResisted: 8,
  snackBoxCount: 2,
  followers: ['user_current', 'user_1'],
  following: ['user_current'],
  createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45일 전
};

/**
 * 친구 3 - 다시시작
 */
export const mockUser3: User = {
  id: 'user_3',
  nickname: '다시시작',
  profileImage: null,
  bio: '이번엔 진짜!',
  currentStreak: 1,
  totalSuccessDays: 8,
  totalTemptationResisted: 3,
  snackBoxCount: 1,
  followers: ['user_1'],
  following: ['user_current', 'user_2'],
  createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15일 전
};

/**
 * 모든 Mock 사용자 배열
 */
export const mockUsers: User[] = [
  mockCurrentUser,
  mockUser1,
  mockUser2,
  mockUser3,
];

/**
 * 사용자 ID로 Map 변환 (빠른 조회용)
 */
export const mockUsersMap = new Map<string, User>(
  mockUsers.map((user) => [user.id, user])
);

/**
 * 현재 사용자 ID
 */
export const MOCK_CURRENT_USER_ID = 'user_current';

/**
 * 현재 사용자 목표 (UserGoals)
 */
export const mockCurrentUserGoals: UserGoals = {
  futureVisions: [
    '🥊 링 위에서 멋있는 나',
    '🏃 10km를 가볍게 뛰는 나',
    '👕 사이즈 걱정없이 쇼핑하는 나',
  ],
};

/**
 * 현재 사용자 통계 (UserStats)
 */
export const mockCurrentUserStats: UserStats = {
  userId: 'user_current',
  currentStreak: 5,
  longestStreak: 12,
  totalSuccessDays: 23,
  totalTemptationResisted: 12,
  snackBoxCount: 3,
  weeklyProgress: [0.86, 0.71, 0.86, 1.0, 0.57], // 최근 5주 달성률
  weightHistory: generateMockWeightHistory(),
};

/**
 * Mock 체중 히스토리 생성 (30일간)
 */
function generateMockWeightHistory(): WeightRecord[] {
  const startWeight = 75.0; // 시작 체중 75kg
  const targetWeight = 68.0; // 목표 체중 68kg
  const days = 30;

  const history: WeightRecord[] = [];

  for (let i = 0; i < days; i += 3) {
    // 3일마다 기록
    const progress = i / days; // 0.0 ~ 1.0
    const weight = startWeight - (startWeight - targetWeight) * progress * 0.4; // 40% 달성 (3kg 감량)
    const randomVariation = (Math.random() - 0.5) * 0.5; // ±0.25kg 변동

    history.push({
      id: `weight_${i}`,
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString(),
      weight: Math.round((weight + randomVariation) * 10) / 10, // 소수점 1자리
    });
  }

  return history;
}

/**
 * 사용자 ID로 사용자 조회
 */
export function getMockUserById(userId: string): User | undefined {
  return mockUsersMap.get(userId);
}

/**
 * 닉네임으로 사용자 조회
 */
export function getMockUserByNickname(nickname: string): User | undefined {
  return mockUsers.find((user) => user.nickname === nickname);
}

/**
 * 여러 사용자 ID로 사용자 조회
 */
export function getMockUsersByIds(userIds: string[]): User[] {
  return userIds
    .map((id) => mockUsersMap.get(id))
    .filter((user): user is User => user !== undefined);
}

/**
 * 현재 사용자 팔로워 목록
 */
export function getMockCurrentUserFollowers(): User[] {
  return getMockUsersByIds(mockCurrentUser.followers);
}

/**
 * 현재 사용자 팔로잉 목록
 */
export function getMockCurrentUserFollowing(): User[] {
  return getMockUsersByIds(mockCurrentUser.following);
}
