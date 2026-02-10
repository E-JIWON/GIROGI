/// 리액션 바 위젯
///
/// 게시글에 대한 리액션과 댓글 수를 표시하는 위젯입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/data/models/reaction.dart';

/// 리액션 바 위젯
///
/// 6종 감정 표현 리액션과 댓글 수를 표시합니다.
class ReactionBar extends StatelessWidget {
  /// 리액션 데이터
  final Reaction reactions;

  /// 리액션 탭 콜백
  final Function(String reactionType) onReactionTap;

  /// 댓글 수
  final int commentCount;

  /// 댓글 탭 콜백
  final VoidCallback? onCommentTap;

  const ReactionBar({
    super.key,
    required this.reactions,
    required this.onReactionTap,
    required this.commentCount,
    this.onCommentTap,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        /// 리액션 요약 (가장 많은 리액션 표시)
        if (reactions.totalCount > 0)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                ...reactions.topReactions.take(3).map(
                      (entry) => Padding(
                        padding: const EdgeInsets.only(right: 4),
                        child: Text(
                          _getReactionEmoji(entry.key),
                          style: const TextStyle(fontSize: 16),
                        ),
                      ),
                    ),
                const SizedBox(width: 4),
                Text(
                  reactions.totalCount.toString(),
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.grey600,
                  ),
                ),
              ],
            ),
          ),

        /// 리액션 버튼들
        Row(
          children: [
            /// 좋아요
            _buildReactionButton(
              emoji: '👍',
              label: '좋아요',
              count: reactions.like,
              onTap: () => onReactionTap('like'),
            ),
            const SizedBox(width: 8),

            /// 최고에요
            _buildReactionButton(
              emoji: '❤️',
              label: '최고',
              count: reactions.love,
              onTap: () => onReactionTap('love'),
            ),
            const SizedBox(width: 8),

            /// 화이팅
            _buildReactionButton(
              emoji: '💪',
              label: '화이팅',
              count: reactions.fighting,
              onTap: () => onReactionTap('fighting'),
            ),
            const SizedBox(width: 8),

            /// 감동
            _buildReactionButton(
              emoji: '😭',
              label: '감동',
              count: reactions.touched,
              onTap: () => onReactionTap('touched'),
            ),
            const SizedBox(width: 8),

            /// 웃겨요
            _buildReactionButton(
              emoji: '😂',
              label: '웃김',
              count: reactions.funny,
              onTap: () => onReactionTap('funny'),
            ),
            const SizedBox(width: 8),

            /// 공감
            _buildReactionButton(
              emoji: '🤝',
              label: '공감',
              count: reactions.empathy,
              onTap: () => onReactionTap('empathy'),
            ),

            const Spacer(),

            /// 댓글 버튼
            _buildCommentButton(),
          ],
        ),
      ],
    );
  }

  /// 리액션 버튼 빌더
  Widget _buildReactionButton({
    required String emoji,
    required String label,
    required int count,
    required VoidCallback onTap,
  }) {
    final hasReaction = count > 0;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: hasReaction
              ? AppColors.primary.withOpacity(0.1)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(emoji, style: const TextStyle(fontSize: 14)),
            if (count > 0) ...[
              const SizedBox(width: 4),
              Text(
                count.toString(),
                style: AppTypography.caption.copyWith(
                  color: hasReaction ? AppColors.primary : AppColors.grey600,
                  fontWeight: hasReaction ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  /// 댓글 버튼 빌더
  Widget _buildCommentButton() {
    return InkWell(
      onTap: onCommentTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        decoration: BoxDecoration(
          color: commentCount > 0
              ? AppColors.grey200
              : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.chat_bubble_outline_rounded,
              size: 16,
              color: commentCount > 0 ? AppColors.grey800 : AppColors.grey600,
            ),
            const SizedBox(width: 4),
            Text(
              commentCount > 0 ? commentCount.toString() : '댓글',
              style: AppTypography.caption.copyWith(
                color: commentCount > 0 ? AppColors.grey800 : AppColors.grey600,
                fontWeight: commentCount > 0 ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 리액션 타입에 따른 이모지 반환
  String _getReactionEmoji(String reactionType) {
    switch (reactionType) {
      case 'like':
        return '👍';
      case 'love':
        return '❤️';
      case 'fighting':
        return '💪';
      case 'touched':
        return '😭';
      case 'funny':
        return '😂';
      case 'empathy':
        return '🤝';
      default:
        return '👍';
    }
  }
}
