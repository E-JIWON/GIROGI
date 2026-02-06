/**
 * CommentSection 컴포넌트
 *
 * 댓글 목록 및 입력 UI
 * - 댓글 목록 (스크롤 가능)
 * - 각 댓글: 프로필 이미지 + 닉네임 + 시간 + 내용
 * - 하단: 댓글 입력 필드 + 전송 버튼
 * - 더보기 메뉴 (신고/삭제)
 *
 * Flutter: lib/presentation/widgets/common/comment_section.dart
 */

'use client';

import { useState } from 'react';
import { Send, MoreVertical } from 'lucide-react';
import type { Comment, User } from '@/types/models';

interface CommentSectionProps {
  /**
   * 댓글 목록
   */
  comments: Comment[];
  /**
   * 사용자 정보 (댓글 작성자)
   */
  users: User[];
  /**
   * 현재 로그인한 사용자 ID
   */
  currentUserId: string;
  /**
   * 댓글 작성 콜백
   */
  onCommentSubmit?: (content: string) => void;
  /**
   * 댓글 삭제 콜백
   */
  onCommentDelete?: (commentId: string) => void;
  /**
   * 댓글 신고 콜백
   */
  onCommentReport?: (commentId: string) => void;
}

export function CommentSection({
  comments,
  users,
  currentUserId,
  onCommentSubmit,
  onCommentDelete,
  onCommentReport,
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // 댓글 작성
  const handleSubmit = () => {
    if (!commentText.trim()) return;

    onCommentSubmit?.(commentText);
    setCommentText('');
  };

  // 더보기 메뉴 토글
  const toggleMenu = (commentId: string) => {
    setActiveMenuId(activeMenuId === commentId ? null : commentId);
  };

  // 시간 포맷팅
  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();

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
      const year = timestamp.getFullYear();
      const month = timestamp.getMonth() + 1;
      const day = timestamp.getDate();
      return `${year}.${month}.${day}`;
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 댓글 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {comments.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-grey-500">첫 댓글을 남겨보세요</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const author = users.find((u) => u.id === comment.authorId);
              if (!author) return null;

              const isOwnComment = comment.authorId === currentUserId;

              return (
                <div key={comment.id} className="flex gap-3">
                  {/* 프로필 이미지 */}
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary">
                    {author.profileImageUrl ? (
                      <img
                        src={author.profileImageUrl}
                        alt={author.nickname}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-white">
                        {author.nickname[0].toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* 댓글 내용 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-grey-900">
                        {author.nickname}
                      </span>
                      <span className="text-xs text-grey-500">
                        {formatTimestamp(comment.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-grey-800">{comment.content}</p>
                  </div>

                  {/* 더보기 버튼 */}
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(comment.id)}
                      className="rounded-full p-1 hover:bg-grey-100"
                    >
                      <MoreVertical className="h-4 w-4 text-grey-600" />
                    </button>

                    {/* 더보기 메뉴 */}
                    {activeMenuId === comment.id && (
                      <>
                        {/* 오버레이 (메뉴 닫기용) */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setActiveMenuId(null)}
                        />

                        {/* 메뉴 */}
                        <div className="absolute right-0 top-8 z-20 w-32 overflow-hidden rounded-lg border border-grey-200 bg-white shadow-lg">
                          {isOwnComment ? (
                            <button
                              onClick={() => {
                                onCommentDelete?.(comment.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-error hover:bg-grey-50"
                            >
                              삭제
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                onCommentReport?.(comment.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-grey-700 hover:bg-grey-50"
                            >
                              신고
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 댓글 입력 */}
      <div className="border-t border-grey-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="댓글을 입력하세요..."
            className="flex-1 rounded-full border border-grey-300 px-4 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={!commentText.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-primary/90 disabled:bg-grey-300"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
