/**
 * 프로필 페이지
 *
 * 주요 기능:
 * - ProfileHeader (프로필 이미지, 통계, 버튼)
 * - 2개 탭 (식사 타임라인, 기록)
 * - 식사 타임라인: 최근 7일 식사 기록
 * - 기록: 작성한 게시글 목록
 *
 * Flutter: lib/presentation/screens/profile/profile_screen.dart
 */

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { MealTimelineItem } from '@/components/profile/MealTimelineItem';
import { PostCard } from '@/components/community/PostCard';
import { mockUsers, mockDailyRecords, mockPosts } from '@/lib/mock';
import type { MealRecord } from '@/types/models';

type Tab = 'timeline' | 'posts';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('timeline');

  // Mock 데이터
  const currentUser = mockUsers[0]; // 본인 프로필 가정
  const isOwnProfile = true; // 본인 프로필 여부

  // 최근 7일 식사 기록 추출
  const mealRecords: MealRecord[] = [];
  mockDailyRecords.forEach((record) => {
    if (record.meals) {
      mealRecords.push(...record.meals);
    }
  });

  // 시간순 정렬 (최신순)
  mealRecords.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 본인이 작성한 게시글
  const userPosts = mockPosts.filter((post) => post.authorId === currentUser.id);

  // 팔로우 토글
  const handleFollowTap = () => {
    // TODO: Repository에 팔로우/언팔로우 저장
    console.log('팔로우 토글');
  };

  // 프로필 편집
  const handleEditProfileTap = () => {
    // TODO: 프로필 편집 화면으로 이동
    console.log('프로필 편집');
  };

  // 리액션 처리
  const handleReaction = (postId: string, reactionType: string) => {
    // TODO: Repository에 리액션 저장
    console.log(`Post ${postId}: ${reactionType} 리액션`);
  };

  // 댓글 화면으로 이동
  const handleComment = (postId: string) => {
    // TODO: 댓글 상세 화면으로 이동
    console.log(`Post ${postId}: 댓글 화면으로 이동`);
  };

  // 더보기 메뉴
  const handleMore = (postId: string) => {
    // TODO: 더보기 메뉴 (신고, 차단 등)
    console.log(`Post ${postId}: 더보기 메뉴`);
  };

  return (
    <div className="min-h-screen bg-grey-50">
      {/* 프로필 헤더 */}
      <ProfileHeader
        user={currentUser}
        isOwnProfile={isOwnProfile}
        isFollowing={false}
        onFollowTap={handleFollowTap}
        onEditProfileTap={handleEditProfileTap}
      />

      {/* 탭 바 */}
      <div className="sticky top-0 z-10 flex border-b border-grey-200 bg-white">
        <button
          onClick={() => setActiveTab('timeline')}
          className={cn(
            'flex-1 border-b-2 py-3 text-sm font-medium transition-all',
            activeTab === 'timeline'
              ? 'border-primary text-primary'
              : 'border-transparent text-grey-600 hover:text-grey-900'
          )}
        >
          식사 타임라인
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={cn(
            'flex-1 border-b-2 py-3 text-sm font-medium transition-all',
            activeTab === 'posts'
              ? 'border-primary text-primary'
              : 'border-transparent text-grey-600 hover:text-grey-900'
          )}
        >
          기록
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* 식사 타임라인 탭 */}
        {activeTab === 'timeline' && (
          <>
            {mealRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-base font-medium text-grey-600">
                  식사 기록이 없습니다
                </p>
                <p className="mt-1 text-sm text-grey-500">
                  체크리스트에서 식사를 기록해보세요
                </p>
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

        {/* 기록 탭 */}
        {activeTab === 'posts' && (
          <>
            {userPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-base font-medium text-grey-600">
                  작성한 게시글이 없습니다
                </p>
                <p className="mt-1 text-sm text-grey-500">
                  커뮤니티에서 경험을 공유해보세요
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => {
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
  );
}
