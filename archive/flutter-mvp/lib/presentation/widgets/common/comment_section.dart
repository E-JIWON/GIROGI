/// 댓글 섹션 위젯
///
/// 게시글의 댓글을 표시하고 작성하는 위젯입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/comment.dart';
import 'package:girogi/data/models/user.dart';

/// 댓글 섹션 위젯
///
/// 댓글 목록과 댓글 작성 기능을 제공합니다.
class CommentSection extends StatefulWidget {
  /// 게시글 ID
  final String postId;

  /// 댓글 목록
  final List<Comment> comments;

  /// 댓글 작성자 맵 (userId -> User)
  final Map<String, User> authors;

  /// 댓글 작성 콜백
  final Function(String content)? onCommentSubmit;

  /// 댓글 삭제 콜백
  final Function(String commentId)? onCommentDelete;

  const CommentSection({
    super.key,
    required this.postId,
    required this.comments,
    required this.authors,
    this.onCommentSubmit,
    this.onCommentDelete,
  });

  @override
  State<CommentSection> createState() => _CommentSectionState();
}

class _CommentSectionState extends State<CommentSection> {
  /// 댓글 입력 컨트롤러
  final _commentController = TextEditingController();

  /// 포커스 노드
  final _focusNode = FocusNode();

  @override
  void dispose() {
    _commentController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  /// 댓글 작성
  void _submitComment() {
    final content = _commentController.text.trim();

    if (content.isEmpty) {
      return;
    }

    widget.onCommentSubmit?.call(content);
    _commentController.clear();
    _focusNode.unfocus();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        /// 댓글 헤더
        Padding(
          padding: const EdgeInsets.all(AppConstants.defaultPadding),
          child: Row(
            children: [
              Text(
                '댓글',
                style: AppTypography.titleMedium,
              ),
              const SizedBox(width: 8),
              Text(
                '${widget.comments.length}',
                style: AppTypography.titleSmall.copyWith(
                  color: AppColors.grey600,
                ),
              ),
            ],
          ),
        ),

        const Divider(height: 1),

        /// 댓글 목록
        if (widget.comments.isEmpty)
          _buildEmptyState()
        else
          _buildCommentList(),

        const Divider(height: 1),

        /// 댓글 작성 입력
        _buildCommentInput(),
      ],
    );
  }

  /// 빈 상태 빌더
  Widget _buildEmptyState() {
    return Padding(
      padding: const EdgeInsets.all(AppConstants.largePadding),
      child: Center(
        child: Column(
          children: [
            Icon(
              Icons.chat_bubble_outline_rounded,
              size: 48,
              color: AppColors.grey400,
            ),
            const SizedBox(height: 12),
            Text(
              '첫 댓글을 남겨보세요',
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.grey600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 댓글 목록 빌더
  Widget _buildCommentList() {
    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: widget.comments.length,
      separatorBuilder: (context, index) => const Divider(
        height: 1,
        indent: AppConstants.defaultPadding + 40 + 12,
      ),
      itemBuilder: (context, index) {
        final comment = widget.comments[index];
        final author = widget.authors[comment.authorId];

        if (author == null) {
          return const SizedBox.shrink();
        }

        return _buildCommentItem(comment, author);
      },
    );
  }

  /// 댓글 아이템 빌더
  Widget _buildCommentItem(Comment comment, User author) {
    return Padding(
      padding: const EdgeInsets.all(AppConstants.defaultPadding),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 프로필 이미지
          CircleAvatar(
            radius: 20,
            backgroundColor: AppColors.primary,
            backgroundImage: author.profileImageUrl != null
                ? NetworkImage(author.profileImageUrl!)
                : null,
            child: author.profileImageUrl == null
                ? Text(
                    author.nickname[0].toUpperCase(),
                    style: AppTypography.bodySmall.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  )
                : null,
          ),

          const SizedBox(width: 12),

          /// 댓글 내용
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /// 작성자 및 시간
                Row(
                  children: [
                    Text(
                      author.nickname,
                      style: AppTypography.titleSmall,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      _formatTimestamp(comment.createdAt),
                      style: AppTypography.caption.copyWith(
                        color: AppColors.grey600,
                      ),
                    ),
                    const Spacer(),
                    // TODO: 본인 댓글인 경우 삭제 버튼
                    IconButton(
                      icon: const Icon(Icons.more_vert_rounded, size: 18),
                      onPressed: () {
                        _showCommentOptions(comment);
                      },
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                    ),
                  ],
                ),

                const SizedBox(height: 4),

                /// 댓글 내용
                Text(
                  comment.content,
                  style: AppTypography.bodyMedium,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  /// 댓글 입력 빌더
  Widget _buildCommentInput() {
    return Container(
      padding: EdgeInsets.only(
        left: AppConstants.defaultPadding,
        right: AppConstants.defaultPadding,
        top: AppConstants.defaultPadding,
        bottom: AppConstants.defaultPadding +
            MediaQuery.of(context).viewInsets.bottom,
      ),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border(
          top: BorderSide(
            color: AppColors.grey200,
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          /// 입력 필드
          Expanded(
            child: TextField(
              controller: _commentController,
              focusNode: _focusNode,
              decoration: InputDecoration(
                hintText: '댓글을 입력하세요',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: AppColors.grey100,
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
              ),
              maxLines: null,
              textInputAction: TextInputAction.send,
              onSubmitted: (_) => _submitComment(),
            ),
          ),

          const SizedBox(width: 8),

          /// 전송 버튼
          IconButton(
            onPressed: _submitComment,
            icon: const Icon(Icons.send_rounded),
            color: AppColors.primary,
            style: IconButton.styleFrom(
              backgroundColor: AppColors.primaryContainer,
            ),
          ),
        ],
      ),
    );
  }

  /// 댓글 옵션 표시
  void _showCommentOptions(Comment comment) {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.flag_rounded),
                title: const Text('신고하기'),
                onTap: () {
                  Navigator.pop(context);
                  // TODO: 신고 기능
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('신고 기능 (TODO)')),
                  );
                },
              ),
              // TODO: 본인 댓글인 경우 삭제 옵션 추가
              ListTile(
                leading: const Icon(Icons.delete_rounded),
                title: const Text('삭제하기'),
                onTap: () {
                  Navigator.pop(context);
                  widget.onCommentDelete?.call(comment.id);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  /// 시간 포맷팅
  String _formatTimestamp(DateTime timestamp) {
    final now = DateTime.now();
    final difference = now.difference(timestamp);

    if (difference.inMinutes < 1) {
      return '방금 전';
    } else if (difference.inHours < 1) {
      return '${difference.inMinutes}분 전';
    } else if (difference.inDays < 1) {
      return '${difference.inHours}시간 전';
    } else if (difference.inDays < 7) {
      return '${difference.inDays}일 전';
    } else {
      return '${timestamp.year}.${timestamp.month}.${timestamp.day}';
    }
  }
}
