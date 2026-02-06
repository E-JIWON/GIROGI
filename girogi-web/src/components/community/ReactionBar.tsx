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

interface Reaction {
  like: number;
  love: number;
  fighting: number;
  touched: number;
  funny: number;
  empathy: number;
}

interface ReactionBarProps {
  /**
   * 리액션 데이터
   */
  reactions: Reaction;
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
  like: { emoji: '👍', label: '좋아요' },
  love: { emoji: '❤️', label: '최고' },
  fighting: { emoji: '💪', label: '화이팅' },
  touched: { emoji: '😭', label: '감동' },
  funny: { emoji: '😂', label: '웃김' },
  empathy: { emoji: '🤝', label: '공감' },
} as const;

export function ReactionBar({
  reactions,
  onReactionTap,
  commentCount,
  onCommentTap,
}: ReactionBarProps) {
  // 총 리액션 수 계산
  const totalCount =
    reactions.like +
    reactions.love +
    reactions.fighting +
    reactions.touched +
    reactions.funny +
    reactions.empathy;

  // 상위 3개 리액션 추출
  const topReactions = Object.entries(reactions)
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
              {REACTION_CONFIG[type as keyof Reaction].emoji}
            </span>
          ))}
          <span className="ml-1 text-sm text-grey-600">{totalCount}</span>
        </div>
      )}

      {/* 리액션 버튼들 */}
      <div className="flex items-center">
        {/* 6개 리액션 버튼 */}
        {Object.entries(REACTION_CONFIG).map(([type, config]) => (
          <button
            key={type}
            onClick={() => onReactionTap(type)}
            className={cn(
              'mr-2 flex items-center rounded-full px-2 py-1 transition-all',
              reactions[type as keyof Reaction] > 0
                ? 'bg-primary/10'
                : 'hover:bg-grey-100'
            )}
          >
            <span className="text-sm">{config.emoji}</span>
            {reactions[type as keyof Reaction] > 0 && (
              <span
                className={cn(
                  'ml-1 text-xs',
                  reactions[type as keyof Reaction] > 0
                    ? 'font-semibold text-primary'
                    : 'text-grey-600'
                )}
              >
                {reactions[type as keyof Reaction]}
              </span>
            )}
          </button>
        ))}

        <div className="flex-1" />

        {/* 댓글 버튼 */}
        <button
          onClick={onCommentTap}
          className={cn(
            'flex items-center rounded-full px-3 py-1 transition-all',
            commentCount > 0 ? 'bg-grey-200' : 'hover:bg-grey-100'
          )}
        >
          <MessageCircle
            className={cn(
              'h-4 w-4',
              commentCount > 0 ? 'text-grey-800' : 'text-grey-600'
            )}
          />
          <span
            className={cn(
              'ml-1 text-xs',
              commentCount > 0
                ? 'font-semibold text-grey-800'
                : 'text-grey-600'
            )}
          >
            {commentCount > 0 ? commentCount : '댓글'}
          </span>
        </button>
      </div>
    </div>
  );
}
