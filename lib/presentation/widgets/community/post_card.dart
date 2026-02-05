/// 게시글 카드 위젯
///
/// 커뮤니티 피드에 표시되는 게시글 카드입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/post.dart';
import 'package:girogi/data/models/user.dart';
import 'package:girogi/presentation/widgets/community/reaction_bar.dart';

/// 게시글 카드 위젯
///
/// 사용자 정보, 게시글 내용, 이미지, 리액션, 댓글을 표시합니다.
class PostCard extends StatelessWidget {
  /// 게시글 데이터
  final Post post;

  /// 작성자 데이터
  final User author;

  /// 리액션 탭 콜백
  final Function(String reactionType)? onReactionTap;

  /// 댓글 탭 콜백
  final VoidCallback? onCommentTap;

  /// 더보기 버튼 탭 콜백
  final VoidCallback? onMoreTap;

  const PostCard({
    super.key,
    required this.post,
    required this.author,
    this.onReactionTap,
    this.onCommentTap,
    this.onMoreTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: AppConstants.defaultPadding),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 헤더 (작성자 정보)
          _buildHeader(context),

          /// 게시글 타입별 컨텐츠
          _buildContent(context),

          /// 리액션 바
          if (onReactionTap != null)
            Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: AppConstants.defaultPadding,
              ),
              child: ReactionBar(
                reactions: post.reactions,
                onReactionTap: onReactionTap!,
                commentCount: post.commentCount,
                onCommentTap: onCommentTap,
              ),
            ),

          const SizedBox(height: 8),
        ],
      ),
    );
  }

  /// 헤더 빌더 (작성자 정보)
  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(AppConstants.defaultPadding),
      child: Row(
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
                    style: AppTypography.titleSmall.copyWith(
                      color: Colors.white,
                    ),
                  )
                : null,
          ),

          const SizedBox(width: 12),

          /// 닉네임 및 작성 시간
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  author.nickname,
                  style: AppTypography.titleSmall,
                ),
                Text(
                  _formatTimestamp(post.createdAt),
                  style: AppTypography.caption.copyWith(
                    color: AppColors.grey600,
                  ),
                ),
              ],
            ),
          ),

          /// 더보기 버튼
          if (onMoreTap != null)
            IconButton(
              icon: const Icon(Icons.more_vert_rounded),
              onPressed: onMoreTap,
              iconSize: 20,
            ),
        ],
      ),
    );
  }

  /// 컨텐츠 빌더 (게시글 타입별)
  Widget _buildContent(BuildContext context) {
    switch (post.type) {
      case PostType.experience:
        return _buildExperiencePost(context);
      case PostType.failure:
        return _buildFailurePost(context);
      case PostType.motivation:
        return _buildMotivationPost(context);
      case PostType.mealRecord:
        return _buildMealRecordPost(context);
      case PostType.shorts:
        return _buildShortsPost(context);
    }
  }

  /// 경험 공유 게시글
  Widget _buildExperiencePost(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppConstants.defaultPadding,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 본문
          if (post.content != null && post.content!.isNotEmpty) ...[
            Text(
              post.content!,
              style: AppTypography.bodyMedium,
            ),
            const SizedBox(height: 12),
          ],

          /// 이미지 (있는 경우)
          if (post.imageUrl != null) ...[
            ClipRRect(
              borderRadius:
                  BorderRadius.circular(AppConstants.smallBorderRadius),
              child: Image.network(
                post.imageUrl!,
                width: double.infinity,
                height: 250,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) => Container(
                  height: 250,
                  color: AppColors.grey200,
                  child: const Center(
                    child: Icon(Icons.broken_image_rounded, size: 64),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
          ],
        ],
      ),
    );
  }

  /// 실패 리포트 게시글
  Widget _buildFailurePost(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: AppConstants.defaultPadding,
      ),
      padding: const EdgeInsets.all(AppConstants.defaultPadding),
      decoration: BoxDecoration(
        color: AppColors.selfCompassionContainer,
        borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
        border: Border.all(
          color: AppColors.selfCompassion,
          width: 2,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 실패 리포트 헤더
          Row(
            children: [
              Icon(
                Icons.favorite_rounded,
                color: AppColors.selfCompassion,
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                '실패 리포트',
                style: AppTypography.titleSmall.copyWith(
                  color: AppColors.selfCompassion,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          /// 본문
          if (post.content != null)
            Text(
              post.content!,
              style: AppTypography.bodyMedium,
            ),
        ],
      ),
    );
  }

  /// 동기부여 게시글
  Widget _buildMotivationPost(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppConstants.defaultPadding,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 본문
          if (post.content != null)
            Container(
              padding: const EdgeInsets.all(AppConstants.defaultPadding),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppColors.primary.withOpacity(0.1),
                    AppColors.secondary.withOpacity(0.1),
                  ],
                ),
                borderRadius:
                    BorderRadius.circular(AppConstants.smallBorderRadius),
              ),
              child: Text(
                post.content!,
                style: AppTypography.titleMedium.copyWith(
                  color: AppColors.primary,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          const SizedBox(height: 12),
        ],
      ),
    );
  }

  /// 식사 기록 게시글
  Widget _buildMealRecordPost(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppConstants.defaultPadding,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 식사 이미지
          if (post.imageUrl != null) ...[
            ClipRRect(
              borderRadius:
                  BorderRadius.circular(AppConstants.smallBorderRadius),
              child: Image.network(
                post.imageUrl!,
                width: double.infinity,
                height: 250,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 12),
          ],

          /// 식사 정보 (본문)
          if (post.content != null)
            Text(
              post.content!,
              style: AppTypography.bodyMedium,
            ),
          const SizedBox(height: 12),
        ],
      ),
    );
  }

  /// 숏츠 게시글
  Widget _buildShortsPost(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppConstants.defaultPadding,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 비디오 썸네일 또는 플레이어
          Container(
            width: double.infinity,
            height: 200,
            decoration: BoxDecoration(
              color: AppColors.grey900,
              borderRadius:
                  BorderRadius.circular(AppConstants.smallBorderRadius),
            ),
            child: Stack(
              alignment: Alignment.center,
              children: [
                /// 썸네일 이미지 (있는 경우)
                if (post.imageUrl != null)
                  ClipRRect(
                    borderRadius:
                        BorderRadius.circular(AppConstants.smallBorderRadius),
                    child: Image.network(
                      post.imageUrl!,
                      width: double.infinity,
                      height: 200,
                      fit: BoxFit.cover,
                    ),
                  ),

                /// 재생 버튼
                Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.9),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.play_arrow_rounded,
                    color: Colors.white,
                    size: 40,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          /// 제목
          if (post.content != null)
            Text(
              post.content!,
              style: AppTypography.titleSmall,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          const SizedBox(height: 12),
        ],
      ),
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
