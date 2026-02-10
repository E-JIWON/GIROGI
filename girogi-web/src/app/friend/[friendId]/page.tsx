/**
 * 친구 프로필 페이지
 *
 * /profile과 동일한 탭 구조 + "비교" 탭 추가
 * - 식사 타임라인
 * - 뱃지 컬렉션
 * - 업적
 * - 비교 (몸무게, Streak, 뱃지/업적)
 * - 기록
 */

'use client';

import { use, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProfileHeader } from '@/app/profile/_components/profile-header';
import { MealTimelineItem } from '@/app/profile/_components/meal-timeline-item';
import { BadgeCollection } from '@/app/profile/_components/badge-collection';
import { AchievementList } from '@/app/profile/_components/achievement-list';
import { PostCard } from '@/app/community/_components/post-card';
import { WeightComparison } from '@/components/friend/weight-comparison';
import { StreakComparison } from '@/components/friend/streak-comparison';
import { BadgeComparison } from '@/components/friend/badge-comparison';
import { EncouragementCard } from '@/components/friend/encouragement-card';
import { FriendProfile } from '@/types/friend';
import { calculateComparison } from '@/lib/utils/friend-comparison';
import { mockUsers, mockDailyRecords, mockPosts, mockCurrentUserStats } from '@/lib/mock';
import { useStreakStore } from '@/stores/streakStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { useAchievementStore } from '@/stores/achievementStore';
import { useRouter } from 'next/navigation';
import type { MealRecord, WeightRecord } from '@/types';

type Tab = 'timeline' | 'badges' | 'achievements' | 'compare' | 'posts';

export default function FriendProfilePage({
  params,
}: {
  params: Promise<{ friendId: string }>;
}) {
  const { friendId } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('timeline');

  // 본인 데이터
  const myStreakData = useStreakStore((state) => state.streakData);
  const myBadgeCount = useBadgeStore((state) => state.getTotalBadgeTypes());
  const myAchievementCount = useAchievementStore((state) => state.userAchievements.length);
  const myUser = mockUsers[0];

  // 친구 데이터
  const friendUser = mockUsers.find((u) => u.id === friendId);

  if (!friendUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-neutral-700">친구를 찾을 수 없습니다</p>
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-4 text-primary-600 hover:underline"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  // 친구의 식사 기록 (Mock)
  const mealRecords: MealRecord[] = [];
  mockDailyRecords.forEach((record) => {
    if (record.meals) mealRecords.push(...record.meals);
  });
  mealRecords.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 친구의 게시글 (Mock)
  const friendPosts = mockPosts.filter((post) => post.authorId === friendId);

  // Mock: 친구의 Streak & 비교 데이터
  const friendStreakData = {
    currentStreak: friendUser.currentStreak,
    longestStreak: friendUser.bestStreak,
    totalDays: friendUser.totalSuccessDays,
    lastRecordDate: new Date().toISOString(),
    weeklyStatus: [true, true, true, true, true, false, false],
  };

  // 비교 프로필 구성
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
    badgeCount: Math.floor(Math.random() * 20) + 5,
    achievementCount: Math.floor(Math.random() * 5),
    totalDays: friendUser.totalSuccessDays,
  };

  const comparison = calculateComparison(myProfile, friendProfile);

  // Mock: 친구 체중 히스토리
  const friendWeightHistory: WeightRecord[] = (() => {
    const startWeight = 80.0;
    const days = 30;
    const history: WeightRecord[] = [];
    for (let i = 0; i < days; i += 3) {
      const progress = i / days;
      const weight = startWeight - (startWeight - 75.0) * progress * 0.5;
      const variation = (Math.random() - 0.5) * 0.6;
      history.push({
        id: `fw_${i}`,
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString(),
        weight: Math.round((weight + variation) * 10) / 10,
      });
    }
    return history;
  })();

  // 팔로우 토글
  const handleFollowTap = () => {
    console.log('팔로우 토글:', friendId);
  };

  // 리액션 / 댓글 / 더보기
  const handleReaction = (postId: string, type: string) => console.log(`${postId}: ${type}`);
  const handleComment = (postId: string) => console.log(`${postId}: 댓글`);
  const handleMore = (postId: string) => console.log(`${postId}: 더보기`);

  // 탭 정의
  const tabs: { value: Tab; label: string }[] = [
    { value: 'timeline', label: '타임라인' },
    { value: 'badges', label: '뱃지' },
    { value: 'achievements', label: '업적' },
    { value: 'compare', label: '비교' },
    { value: 'posts', label: '기록' },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl bg-white min-h-screen">
        {/* 뒤로가기 헤더 */}
        <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-neutral-800">{friendUser.nickname}</h1>
        </div>

        {/* 프로필 헤더 (내 프로필과 동일한 컴포넌트 재사용) */}
        <ProfileHeader
          user={friendUser}
          isOwnProfile={false}
          isFollowing={myUser.following.includes(friendId)}
          onFollowTap={handleFollowTap}
        />

        {/* 탭 바 */}
        <div className="sticky top-0 z-10 flex border-b border-neutral-200 bg-white">
          {tabs.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={cn(
                'flex-1 border-b-2 py-3 text-sm font-medium transition-all',
                activeTab === value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-700 hover:text-neutral-700'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 메인 컨텐츠 */}
        <main className="mx-auto max-w-2xl px-4 py-6">
          {/* 식사 타임라인 */}
          {activeTab === 'timeline' && (
            <>
              {mealRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <p className="text-base font-medium text-neutral-700">식사 기록이 없습니다</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {mealRecords.map((mealRecord, index) => (
                    <MealTimelineItem
                      key={`${mealRecord.mealTime}-${index}`}
                      mealRecord={mealRecord}
                      isLast={index === mealRecords.length - 1}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* 뱃지 컬렉션 */}
          {activeTab === 'badges' && <BadgeCollection />}

          {/* 업적 */}
          {activeTab === 'achievements' && <AchievementList />}

          {/* 비교 콘텐츠 */}
          {activeTab === 'compare' && (
            <div className="space-y-8">
              {/* 응원 메시지 */}
              <EncouragementCard comparison={comparison} />

              {/* 체중 비교 */}
              <WeightComparison
                myWeightHistory={mockCurrentUserStats.weightHistory}
                friendWeightHistory={friendWeightHistory}
                friendName={friendUser.nickname}
              />

              {/* Streak 비교 */}
              <StreakComparison comparison={comparison} />

              {/* 뱃지/업적 비교 */}
              <BadgeComparison comparison={comparison} />
            </div>
          )}

          {/* 기록 */}
          {activeTab === 'posts' && (
            <>
              {friendPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <p className="text-base font-medium text-neutral-700">작성한 게시글이 없습니다</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {friendPosts.map((post) => {
                    const author = mockUsers.find((u) => u.id === post.authorId);
                    if (!author) return null;
                    return (
                      <PostCard
                        key={post.id}
                        post={post}
                        author={author}
                        onReactionTap={(type) => handleReaction(post.id, type)}
                        onCommentTap={() => handleComment(post.id)}
                        onMoreTap={() => handleMore(post.id)}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
