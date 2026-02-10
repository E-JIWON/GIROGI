/// 미래 자아 시각화 카드 위젯
///
/// Episodic Future Thinking (EFT) 이론을 적용한 미래 자아 시각화 위젯입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// 미래 자아 시각화 카드 위젯
///
/// 목표 이미지와 동기부여 메시지를 보여줍니다.
/// EFT 연구에 따르면 미래 자아를 시각화하면 충동적 섭취 행동이 억제됩니다.
class FutureSelfCard extends StatelessWidget {
  /// 목표 이미지 URL
  /// TODO: Repository에서 사용자 목표 이미지 가져오기
  final String? goalImageUrl;

  /// 목표 체중 (kg)
  /// TODO: Repository에서 사용자 목표 가져오기
  final double? targetWeight;

  /// 현재 체중 (kg)
  /// TODO: Repository에서 최근 체중 가져오기
  final double? currentWeight;

  /// 목표 달성 예상 날짜
  /// TODO: Repository에서 계산된 예상 날짜 가져오기
  final DateTime? targetDate;

  const FutureSelfCard({
    super.key,
    this.goalImageUrl,
    this.targetWeight,
    this.currentWeight,
    this.targetDate,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            /// 헤더
            Row(
              children: [
                Icon(
                  Icons.wb_sunny_rounded,
                  color: AppColors.primary,
                  size: 28,
                ),
                const SizedBox(width: 12),
                Text(
                  '미래의 나를 떠올려보세요',
                  style: AppTypography.titleMedium,
                ),
              ],
            ),

            const SizedBox(height: AppConstants.defaultPadding),

            /// 목표 이미지 또는 플레이스홀더
            _buildGoalImage(context),

            const SizedBox(height: AppConstants.defaultPadding),

            /// 목표 정보
            _buildGoalInfo(),

            const SizedBox(height: AppConstants.defaultPadding),

            /// 동기부여 메시지
            _buildMotivationMessage(),
          ],
        ),
      ),
    );
  }

  /// 목표 이미지 빌더
  Widget _buildGoalImage(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 200,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        color: AppColors.grey100,
        border: Border.all(
          color: AppColors.grey300,
          width: 2,
        ),
      ),
      child: goalImageUrl != null
          ? ClipRRect(
              borderRadius:
                  BorderRadius.circular(AppConstants.defaultBorderRadius),
              child: Image.network(
                goalImageUrl!,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) =>
                    _buildPlaceholder(),
              ),
            )
          : _buildPlaceholder(),
    );
  }

  /// 플레이스홀더 (목표 이미지 없을 때)
  Widget _buildPlaceholder() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(
          Icons.add_photo_alternate_rounded,
          size: 64,
          color: AppColors.grey400,
        ),
        const SizedBox(height: 8),
        Text(
          '목표 이미지를 추가하세요',
          style: AppTypography.bodySmall.copyWith(
            color: AppColors.grey600,
          ),
        ),
        const SizedBox(height: 4),
        TextButton.icon(
          onPressed: () {
            // TODO: 목표 이미지 추가 화면으로 이동
          },
          icon: const Icon(Icons.edit_rounded, size: 16),
          label: const Text('추가하기'),
        ),
      ],
    );
  }

  /// 목표 정보 빌더
  Widget _buildGoalInfo() {
    final hasGoalInfo = targetWeight != null && currentWeight != null;

    if (!hasGoalInfo) {
      return Container(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        decoration: BoxDecoration(
          color: AppColors.grey100,
          borderRadius:
              BorderRadius.circular(AppConstants.smallBorderRadius),
        ),
        child: Row(
          children: [
            Icon(Icons.info_outline_rounded, color: AppColors.grey600),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                '목표를 설정하고 진행 상황을 확인하세요',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.grey700,
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                // TODO: 목표 설정 화면으로 이동
              },
              child: const Text('설정'),
            ),
          ],
        ),
      );
    }

    final weightDiff = currentWeight! - targetWeight!;
    final daysRemaining = targetDate != null
        ? targetDate!.difference(DateTime.now()).inDays
        : null;

    return Container(
      padding: const EdgeInsets.all(AppConstants.defaultPadding),
      decoration: BoxDecoration(
        color: AppColors.primaryContainer,
        borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
      ),
      child: Column(
        children: [
          /// 체중 차이
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '목표까지',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.grey700,
                ),
              ),
              Text(
                '${weightDiff.toStringAsFixed(1)}kg 남음',
                style: AppTypography.titleMedium.copyWith(
                  color: AppColors.primary,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),

          if (daysRemaining != null) ...[
            const SizedBox(height: 8),

            /// 예상 달성 날짜
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '예상 달성일',
                  style: AppTypography.bodyMedium.copyWith(
                    color: AppColors.grey700,
                  ),
                ),
                Text(
                  '$daysRemaining일 후',
                  style: AppTypography.bodyMedium.copyWith(
                    color: AppColors.grey900,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  /// 동기부여 메시지 빌더
  Widget _buildMotivationMessage() {
    return Container(
      padding: const EdgeInsets.all(AppConstants.defaultPadding),
      decoration: BoxDecoration(
        color: AppColors.warningContainer.withOpacity(0.3),
        borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
        border: Border.all(
          color: AppColors.temptation.withOpacity(0.3),
          width: 2,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.lightbulb_rounded,
                color: AppColors.temptation,
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                '잠깐만 생각해보세요',
                style: AppTypography.titleSmall.copyWith(
                  color: AppColors.temptation,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            '• 지금 먹으면 후회할 것 같나요?\n'
            '• 목표 달성이 늦어질 수 있습니다\n'
            '• 10분만 기다리면 유혹이 사라집니다\n'
            '• 미래의 내가 고마워할 선택을 하세요',
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.grey800,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }
}
