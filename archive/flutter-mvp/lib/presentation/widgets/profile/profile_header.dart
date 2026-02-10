/// 프로필 헤더 위젯
///
/// 사용자 정보, 통계, 팔로우 버튼을 표시하는 헤더 위젯입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/user.dart';

/// 프로필 헤더 위젯
///
/// 프로필 이미지, 닉네임, 바이오, 통계 (게시글, 팔로워, 팔로잉)를 표시합니다.
class ProfileHeader extends StatelessWidget {
  /// 사용자 데이터
  final User user;

  /// 본인 프로필 여부
  final bool isOwnProfile;

  /// 팔로우 여부
  final bool isFollowing;

  /// 팔로우 버튼 탭 콜백
  final VoidCallback? onFollowTap;

  /// 프로필 편집 버튼 탭 콜백
  final VoidCallback? onEditProfileTap;

  const ProfileHeader({
    super.key,
    required this.user,
    required this.isOwnProfile,
    this.isFollowing = false,
    this.onFollowTap,
    this.onEditProfileTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppConstants.largePadding),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border(
          bottom: BorderSide(
            color: AppColors.grey200,
            width: 1,
          ),
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              /// 프로필 이미지
              CircleAvatar(
                radius: 40,
                backgroundColor: AppColors.primary,
                backgroundImage: user.profileImageUrl != null
                    ? NetworkImage(user.profileImageUrl!)
                    : null,
                child: user.profileImageUrl == null
                    ? Text(
                        user.nickname[0].toUpperCase(),
                        style: AppTypography.headlineMedium.copyWith(
                          color: Colors.white,
                        ),
                      )
                    : null,
              ),

              const SizedBox(width: AppConstants.defaultPadding),

              /// 통계 (게시글, 팔로워, 팔로잉)
              Expanded(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildStatItem(
                      label: '게시글',
                      value: user.postCount.toString(),
                    ),
                    _buildStatItem(
                      label: '팔로워',
                      value: user.followers.length.toString(),
                    ),
                    _buildStatItem(
                      label: '팔로잉',
                      value: user.following.length.toString(),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: AppConstants.defaultPadding),

          /// 닉네임 및 바이오
          Align(
            alignment: Alignment.centerLeft,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /// 닉네임
                Text(
                  user.nickname,
                  style: AppTypography.titleLarge.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),

                if (user.bio != null && user.bio!.isNotEmpty) ...[
                  const SizedBox(height: 8),

                  /// 바이오
                  Text(
                    user.bio!,
                    style: AppTypography.bodyMedium.copyWith(
                      color: AppColors.grey700,
                    ),
                  ),
                ],
              ],
            ),
          ),

          const SizedBox(height: AppConstants.defaultPadding),

          /// 버튼 (팔로우 또는 프로필 편집)
          if (isOwnProfile)
            _buildEditProfileButton()
          else
            _buildFollowButton(),
        ],
      ),
    );
  }

  /// 통계 항목 빌더
  Widget _buildStatItem({
    required String label,
    required String value,
  }) {
    return Column(
      children: [
        Text(
          value,
          style: AppTypography.titleLarge.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: AppTypography.caption.copyWith(
            color: AppColors.grey600,
          ),
        ),
      ],
    );
  }

  /// 프로필 편집 버튼
  Widget _buildEditProfileButton() {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton.icon(
        onPressed: onEditProfileTap,
        icon: const Icon(Icons.edit_rounded, size: 18),
        label: const Text('프로필 편집'),
        style: OutlinedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 12),
        ),
      ),
    );
  }

  /// 팔로우 버튼
  Widget _buildFollowButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton.icon(
        onPressed: onFollowTap,
        icon: Icon(
          isFollowing ? Icons.person_remove_rounded : Icons.person_add_rounded,
          size: 18,
        ),
        label: Text(isFollowing ? '팔로잉' : '팔로우'),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 12),
          backgroundColor:
              isFollowing ? AppColors.grey600 : AppColors.primary,
          foregroundColor: Colors.white,
        ),
      ),
    );
  }
}
