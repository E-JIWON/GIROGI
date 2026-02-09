/**
 * PostCard 컴포넌트
 *
 * 커뮤니티 피드에 표시되는 게시글 카드
 * - 5가지 타입별 렌더링: experience, failure, motivation, mealRecord, shorts
 * - 헤더 (프로필 이미지, 닉네임, 시간, 더보기)
 * - ReactionBar 통합
 *
 * Flutter: lib/presentation/widgets/community/post_card.dart
 */

import { MoreVertical, Heart, Play, ImageOff } from 'lucide-react';
import { ReactionBar } from './ReactionBar';
import type { Post, User } from '@/types';
import { PostType } from '@/types/enums';

interface PostCardProps {
  /**
   * 게시글 데이터
   */
  post: Post;
  /**
   * 작성자 데이터
   */
  author: User;
  /**
   * 리액션 탭 콜백
   */
  onReactionTap?: (reactionType: string) => void;
  /**
   * 댓글 탭 콜백
   */
  onCommentTap?: () => void;
  /**
   * 더보기 버튼 탭 콜백
   */
  onMoreTap?: () => void;
}

export function PostCard({
  post,
  author,
  onReactionTap,
  onCommentTap,
  onMoreTap,
}: PostCardProps) {
  return (
    <div className="mb-4 overflow-hidden rounded-md bg-white">
      {/* 헤더 (작성자 정보) */}
      <div className="flex items-center p-4">
        {/* 프로필 이미지 */}
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary">
          {author.profileImage ? (
            <img
              src={author.profileImage}
              alt={author.nickname}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-base font-semibold text-white">
              {author.nickname[0].toUpperCase()}
            </span>
          )}
        </div>

        {/* 닉네임 및 작성 시간 */}
        <div className="ml-3 flex-1">
          <div className="text-sm font-semibold text-neutral-900">
            {author.nickname}
          </div>
          <div className="text-xs text-neutral-700">
            {formatTimestamp(post.createdAt)}
          </div>
        </div>

        {/* 더보기 버튼 */}
        {onMoreTap && (
          <button
            onClick={onMoreTap}
            className="rounded-full p-1 hover:bg-neutral-100"
          >
            <MoreVertical className="h-5 w-5 text-neutral-700" />
          </button>
        )}
      </div>

      {/* 게시글 타입별 컨텐츠 */}
      {renderContent(post)}

      {/* 리액션 바 */}
      {onReactionTap && (
        <div className="px-4">
          <ReactionBar
            reactions={post.reactions}
            onReactionTap={onReactionTap}
            commentCount={post.comments.length}
            onCommentTap={onCommentTap}
          />
        </div>
      )}

      <div className="h-2" />
    </div>
  );
}

/**
 * 게시글 타입별 컨텐츠 렌더링
 */
function renderContent(post: Post) {
  switch (post.type) {
    case PostType.TEXT:
      return renderExperiencePost(post);
    case PostType.IMAGE:
      return renderMotivationPost(post);
    case PostType.YOUTUBE:
      return renderExperiencePost(post);
    case PostType.FAILURE_REPORT:
      return renderFailurePost(post);
    case PostType.SHARED_RECORD:
      return renderMealRecordPost(post);
    default:
      return null;
  }
}

/**
 * 경험 공유 게시글
 */
function renderExperiencePost(post: Post) {
  return (
    <div className="px-4">
      {/* 본문 */}
      {post.content && (
        <p className="mb-3 text-base text-neutral-900">{post.content}</p>
      )}

      {/* 이미지 */}
      {post.imageUrl && (
        <div className="mb-3 overflow-hidden rounded-md">
          <img
            src={post.imageUrl}
            alt="게시글 이미지"
            className="h-64 w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '';
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * 실패 리포트 게시글
 */
function renderFailurePost(post: Post) {
  return (
    <div className="mx-4 mb-3 rounded-md bg-error-50 p-4">
      {/* 실패 리포트 헤더 */}
      <div className="mb-3 flex items-center">
        <Heart className="h-5 w-5 fill-selfcompassion text-selfcompassion" />
        <span className="ml-2 text-sm font-semibold text-selfcompassion">
          실패 리포트
        </span>
      </div>

      {/* 본문 */}
      {post.content && <p className="text-base text-neutral-900">{post.content}</p>}
    </div>
  );
}

/**
 * 동기부여 게시글
 */
function renderMotivationPost(post: Post) {
  return (
    <div className="px-4">
      {post.content && (
        <div className="mb-3 rounded-md bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <p className="text-lg font-bold text-primary">{post.content}</p>
        </div>
      )}
    </div>
  );
}

/**
 * 식사 기록 게시글
 */
function renderMealRecordPost(post: Post) {
  return (
    <div className="px-4">
      {/* 식사 이미지 */}
      {post.imageUrl && (
        <div className="mb-3 overflow-hidden rounded-md">
          <img
            src={post.imageUrl}
            alt="식사 이미지"
            className="h-64 w-full object-cover"
          />
        </div>
      )}

      {/* 식사 정보 */}
      {post.content && (
        <p className="mb-3 text-base text-neutral-900">{post.content}</p>
      )}
    </div>
  );
}

/**
 * 숏츠 게시글
 */
function renderShortsPost(post: Post) {
  return (
    <div className="px-4">
      {/* 비디오 썸네일 */}
      <div className="relative mb-3 h-52 overflow-hidden rounded-md bg-neutral-900">
        {/* 썸네일 이미지 */}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="숏츠 썸네일"
            className="h-full w-full object-cover"
          />
        )}

        {/* 재생 버튼 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90">
            <Play className="h-10 w-10 fill-white text-white" />
          </div>
        </div>
      </div>

      {/* 제목 */}
      {post.content && (
        <p className="mb-3 line-clamp-2 text-sm font-semibold text-neutral-900">
          {post.content}
        </p>
      )}
    </div>
  );
}

/**
 * 시간 포맷팅
 */
function formatTimestamp(timestamp: string): string {
  const now = new Date();
  const diff = now.getTime() - new Date(timestamp).getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return '방금 전';
  } else if (hours < 1) {
    return `${minutes}분 전`;
  } else if (days < 1) {
    return `${hours}시간 전`;
  } else if (days < 7) {
    return `${days}일 전`;
  } else {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  }
}
