/**
 * 친구 프로필 비교 페이지
 *
 * 본인 vs 친구 통계 비교
 * - Streak 비교
 * - 뱃지/업적 비교
 * - 응원 메시지
 */

'use client';

import { use } from 'react';
import { ArrowLeft } from 'lucide-react';
import { StreakComparison } from '@/components/friend/streak-comparison';
import { BadgeComparison } from '@/components/friend/badge-comparison';
import { EncouragementCard } from '@/components/friend/encouragement-card';
import { FriendProfile } from '@/types/friend';
import { calculateComparison } from '@/lib/utils/friend-comparison';
import { mockUsers, mockDailyRecords } from '@/lib/mock';
import { useStreakStore } from '@/stores/streakStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { useAchievementStore } from '@/stores/achievementStore';
import { useRouter } from 'next/navigation';

export default function FriendComparisonPage({
  params,
}: {
  params: Promise<{ friendId: string }>;
}) {
  const { friendId } = use(params);
  const router = useRouter();

  // 본인 데이터
  const myStreakData = useStreakStore((state) => state.streakData);
  const myBadgeCount = useBadgeStore((state) => state.getTotalBadgeTypes());
  const myAchievementCount = useAchievementStore((state) => state.userAchievements.length);
  const myUser = mockUsers[0]; // 본인

  // 친구 데이터 (Mock)
  const friendUser = mockUsers.find((u) => u.id === friendId);

  if (!friendUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-500">친구를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // Mock: 친구의 Streak 데이터 (실제로는 API에서 가져와야 함)
  const friendStreakData = {
    currentStreak: 12,
    longestStreak: 18,
    totalDays: 45,
    lastRecordDate: new Date().toISOString(),
    weeklyStatus: [true, true, true, true, true, true, false],
  };

  const friendBadgeCount = 15; // Mock
  const friendAchievementCount = 3; // Mock
  const friendTotalDays = 45; // Mock

  // 프로필 데이터 구성
  const myProfile: FriendProfile = {
    user: myUser,
    streakData: myStreakData,
    badgeCount: myBadgeCount,
    achievementCount: myAchievementCount,
    totalDays: myStreakData.totalDays,
  };

  const friendProfile: FriendProfile = {
    user: friendUser,
    streakData: friendStreakData,
    badgeCount: friendBadgeCount,
    achievementCount: friendAchievementCount,
    totalDays: friendTotalDays,
  };

  // 현재 Streak 기준으로 비교 (유틸리티 함수 사용)
  const comparison = calculateComparison(myProfile, friendProfile);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl bg-white min-h-screen">
        {/* 헤더 */}
        <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-neutral-800">친구 비교</h1>
              <p className="text-sm text-neutral-600">
                나 vs {friendProfile.user.username}
              </p>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
          {/* 응원 메시지 */}
          <EncouragementCard comparison={comparison} />

          {/* Streak 비교 */}
          <StreakComparison comparison={comparison} />

          {/* 뱃지/업적 비교 */}
          <BadgeComparison comparison={comparison} />

          {/* 친구 프로필 보기 버튼 */}
          <div className="rounded-xl border-2 border-neutral-200 bg-white p-6">
            <div className="mb-4 text-center">
              <div className="mb-2 text-4xl">{friendProfile.user.profileImageUrl || '👤'}</div>
              <h3 className="text-lg font-bold text-neutral-800">
                {friendProfile.user.username}
              </h3>
              <p className="text-sm text-neutral-600">{friendProfile.user.bio || '소개가 없습니다.'}</p>
            </div>

            <button
              type="button"
              onClick={() => router.push(`/profile/${friendId}`)}
              className="w-full rounded-xl border-2 border-primary-500 bg-white py-3 font-semibold text-primary-600 transition-all hover:bg-primary-50"
            >
              프로필 전체 보기
            </button>
          </div>

          {/* 격려 문구 */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <p className="text-sm text-blue-700">
              💡 친구와 함께하면 다이어트 성공률이 2배 높아져요!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
