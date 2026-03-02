/**
 * 커뮤니티 페이지
 *
 * 주요 기능:
 * - 2개 탭 (전체, 팔로잉)
 * - 글쓰기 버튼 (헤더)
 * - 피드 (ListView)
 * - 리액션 시스템
 *
 * Flutter: lib/presentation/screens/community/community_screen.dart
 */

'use client';

import { useState } from 'react';
import { Edit, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PostCard } from './_components/post-card';
import { PostComposerDialog } from './_components/post-composer-dialog';
import { mockPosts, mockUsers } from '@/lib/mock';
import { useRouter } from 'next/navigation';

type Tab = 'all' | 'following';

export default function CommunityPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock 데이터
  const posts = mockPosts;

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
    <div className="min-h-screen bg-white lg:bg-transparent">
        {/* 모바일 헤더 */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm lg:hidden">
          <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-100">
            <h1 className="text-lg font-semibold text-neutral-700">커뮤니티</h1>

            {/* 버튼들 */}
            <div className="flex items-center gap-2">
              {/* 친구 목록 버튼 */}
              <button
                onClick={() => router.push('/friends')}
                className="rounded-full p-2 transition-all hover:bg-neutral-100"
                title="친구 목록"
              >
                <Users className="h-6 w-6 text-neutral-700" />
              </button>

              {/* 글쓰기 버튼 */}
              <button
                onClick={() => setIsDialogOpen(true)}
                className="rounded-full p-2 transition-all hover:bg-neutral-100"
                title="글쓰기"
              >
                <Edit className="h-6 w-6 text-neutral-700" />
              </button>
            </div>
          </div>
        </header>

        {/* 데스크탑: 액션 버튼 */}
        <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-2 lg:px-8 lg:pt-4">
          <button
            onClick={() => router.push('/friends')}
            className="flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:bg-neutral-100"
            title="친구 목록"
          >
            <Users className="h-5 w-5 text-neutral-700" />
            <span className="text-sm text-neutral-700">친구 목록</span>
          </button>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 transition-all hover:bg-primary-200"
          >
            <Edit className="h-4 w-4" />
            글쓰기
          </button>
        </div>

          {/* 탭 바 */}
          <div className="flex border-b border-neutral-200 lg:px-6">
          <button
            onClick={() => setActiveTab('all')}
            className={cn(
              'flex-1 border-b-2 py-3 text-sm font-medium transition-all lg:flex-none lg:px-6',
              activeTab === 'all'
                ? 'border-info-700 text-info-800'
                : 'border-transparent text-neutral-700 hover:text-neutral-700'
            )}
          >
            전체
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={cn(
              'flex-1 border-b-2 py-3 text-sm font-medium transition-all lg:flex-none lg:px-6',
              activeTab === 'following'
                ? 'border-info-700 text-info-800'
                : 'border-transparent text-neutral-700 hover:text-neutral-700'
            )}
          >
            팔로잉
          </button>
        </div>

      {/* 메인 컨텐츠 - 데스크탑에서 피드 너비 제한 */}
        <main className="px-4 py-4 lg:px-6">
          <div className="mx-auto lg:max-w-3xl">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Users className="h-16 w-16 text-neutral-700" />
            <p className="mt-4 text-base font-medium text-neutral-700">
              아직 게시글이 없습니다
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="mt-2 flex items-center gap-2 text-sm text-link hover:underline"
            >
              <Edit className="h-4 w-4" />
              첫 게시글 작성하기
            </button>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post) => {
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
          </div>
        </main>

        {/* 글쓰기 다이얼로그 */}
        <PostComposerDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
    </div>
  );
}
