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
import { PostCard } from '@/components/community/PostCard';
import { PostComposerDialog } from '@/components/community/PostComposerDialog';
import { mockPosts, mockUsers } from '@/lib/mock';

type Tab = 'all' | 'following';

export default function CommunityPage() {
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
    <div className="relative min-h-screen bg-grey-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold text-neutral-700">커뮤니티</h1>

          {/* 글쓰기 버튼 */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="rounded-full p-2 transition-all hover:bg-grey-100"
            title="글쓰기"
          >
            <Edit className="h-6 w-6 text-neutral-700" />
          </button>
        </div>

        {/* 탭 바 */}
        <div className="mx-auto flex max-w-2xl border-b border-grey-200">
          <button
            onClick={() => setActiveTab('all')}
            className={cn(
              'flex-1 border-b-2 py-3 text-sm font-medium transition-all',
              activeTab === 'all'
                ? 'border-primary text-primary'
                : 'border-transparent text-grey-600 hover:text-neutral-700'
            )}
          >
            전체
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={cn(
              'flex-1 border-b-2 py-3 text-sm font-medium transition-all',
              activeTab === 'following'
                ? 'border-primary text-primary'
                : 'border-transparent text-grey-600 hover:text-neutral-700'
            )}
          >
            팔로잉
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Users className="h-16 w-16 text-grey-400" />
            <p className="mt-4 text-base font-medium text-grey-600">
              아직 게시글이 없습니다
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="mt-2 flex items-center gap-2 text-sm text-primary hover:underline"
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
      </main>

      {/* 글쓰기 다이얼로그 */}
      <PostComposerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
