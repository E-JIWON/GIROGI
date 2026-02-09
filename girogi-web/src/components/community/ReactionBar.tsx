/**
 * ReactionBar 컴포넌트
 *
 * 게시글에 대한 6종 감정 리액션과 댓글 수를 표시
 * - 6개 리액션: 👍❤️💪😭😂🤝
 * - 리액션 요약 (상위 3개)
 * - 댓글 버튼
 *
 * Flutter: lib/presentation/widgets/community/reaction_bar.dart
 */

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Reaction, createReactionCounts } from '@/types/common';
import { ReactionType } from '@/types/enums';

interface ReactionBarProps {
  /**
   * 리액션 데이터 (배열)
   */
  reactions: Reaction[];
  /**
   * 리액션 탭 콜백
   */
  onReactionTap: (reactionType: string) => void;
  /**
   * 댓글 수
   */
  commentCount: number;
  /**
   * 댓글 탭 콜백
   */
  onCommentTap?: () => void;
}

const REACTION_CONFIG = {
  [ReactionType.HEART]: { emoji: '❤️', label: '좋아요' },
  [ReactionType.FIRE]: { emoji: '🔥', label: '열정' },
  [ReactionType.MUSCLE]: { emoji: '💪', label: '화이팅' },
  [ReactionType.CLAP]: { emoji: '👏', label: '박수' },
  [ReactionType.HUG]: { emoji: '🤗', label: '공감' },
  [ReactionType.SAD]: { emoji: '😢', label: '감동' },
} as const;

export function ReactionBar({
  reactions,
  onReactionTap,
  commentCount,
  onCommentTap,
}: ReactionBarProps) {
  // 리액션 집계
  const reactionCounts = createReactionCounts(reactions);
  const totalCount = reactionCounts.total;

  // 상위 3개 리액션 추출
  const topReactions = Object.entries(reactionCounts.counts)
    .filter(([_, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 리액션 요약 */}
      {totalCount > 0 && (
        <div className="mb-2 flex items-center">
          {topReactions.map(([type]) => (
            <span key={type} className="mr-1 text-base">
              {REACTION_CONFIG[type as ReactionType].emoji}
            </span>
          ))}
          <span className="ml-1 text-sm text-neutral-700">{totalCount}</span>
        </div>
      )}

      {/* 리액션 버튼들 */}
      <div className="flex items-center">
        {/* 6개 리액션 버튼 */}
        {Object.entries(REACTION_CONFIG).map(([type, config]) => {
          const count = reactionCounts.counts[type as ReactionType];
          return (
            <button
              key={type}
              onClick={() => onReactionTap(type)}
              className={cn(
                'mr-2 flex items-center rounded-full px-2 py-1 transition-all',
                count > 0 ? 'bg-primary/10' : 'hover:bg-neutral-100'
              )}
            >
              <span className="text-sm">{config.emoji}</span>
              {count > 0 && (
                <span
                  className={cn(
                    'ml-1 text-xs',
                    count > 0 ? 'font-semibold text-primary' : 'text-neutral-700'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}

        <div className="flex-1" />

        {/* 댓글 버튼 */}
        <button
          onClick={onCommentTap}
          className={cn(
            'flex items-center rounded-full px-3 py-1 transition-all',
            commentCount > 0 ? 'bg-neutral-200' : 'hover:bg-neutral-100'
          )}
        >
          <MessageCircle
            className={cn(
              'h-4 w-4',
              commentCount > 0 ? 'text-neutral-800' : 'text-neutral-700'
            )}
          />
          <span
            className={cn(
              'ml-1 text-xs',
              commentCount > 0
                ? 'font-semibold text-neutral-800'
                : 'text-neutral-700'
            )}
          >
            {commentCount > 0 ? commentCount : '댓글'}
          </span>
        </button>
      </div>
    </div>
  );
}
