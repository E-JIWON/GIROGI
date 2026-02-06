/**
 * GIROGI Mock 데이터 통합 export
 *
 * 모든 Mock 데이터와 헬퍼 함수를 한 곳에서 import 가능
 *
 * @example
 * ```typescript
 * import {
 *   mockCurrentUser,
 *   mockPosts,
 *   getMockDailyRecordByDate
 * } from '@/lib/mock';
 * ```
 */

// 사용자 Mock 데이터
export {
  mockCurrentUser,
  mockUser1,
  mockUser2,
  mockUser3,
  mockUsers,
  mockUsersMap,
  MOCK_CURRENT_USER_ID,
  mockCurrentUserGoals,
  mockCurrentUserStats,
  getMockUserById,
  getMockUserByNickname,
  getMockUsersByIds,
  getMockCurrentUserFollowers,
  getMockCurrentUserFollowing,
} from './users';

// 일일 기록 Mock 데이터
export {
  mockDailyRecords,
  mockDailyRecordsMap,
  mockRewardStatus,
  mockChecklistItems,
  getMockDailyRecordByDate,
  getMockDailyRecordsByDateRange,
  getMockRecentDailyRecords,
  calculateMockCurrentStreak,
  calculateMockWeeklySuccessRate,
  groupChecklistItemsByTimeSlot,
  getCoreMissions,
  getMockTodayRecord,
} from './dailyRecords';

// 커뮤니티 Mock 데이터
export {
  mockPost1,
  mockPost2,
  mockPost3,
  mockPost4,
  mockPost5,
  mockPost6,
  mockPosts,
  mockPostsMap,
  mockComments,
  mockReactions,
  mockFailureReport,
  mockSharedRecord,
  getMockPostById,
  getMockPostsByUser,
  getMockYoutubePosts,
  getMockFollowingPosts,
  getMockFeed,
  addMockReaction,
  removeMockReaction,
  addMockComment,
  deleteMockComment,
} from './posts';
