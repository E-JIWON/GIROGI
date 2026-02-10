/// Reward Status Card 위젯
///
/// 보상 시스템 현황을 표시하는 카드 위젯입니다.
/// Temptation Bundling 이론을 적용한 과자박스와 치팅데이를 표시합니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// Reward Status Card 위젯
///
/// 과자박스 개수와 치팅데이 카운트다운을 표시합니다.
class RewardStatusCard extends StatelessWidget {
  /// 현재 보유한 과자박스 개수
  final int snackBoxCount;

  /// 연속 다이어트 일수 (치팅데이 카운트다운용)
  final int consecutiveDietDays;

  const RewardStatusCard({
    super.key,
    required this.snackBoxCount,
    required this.consecutiveDietDays,
  });

  /// 치팅데이까지 남은 일수
  int get daysUntilCheatDay {
    final remaining =
        AppConstants.daysForCheatDay - (consecutiveDietDays % AppConstants.daysForCheatDay);
    return remaining == AppConstants.daysForCheatDay ? 0 : remaining;
  }

  /// 치팅데이 사용 가능 여부
  bool get canUseCheatDay => daysUntilCheatDay == 0 && consecutiveDietDays >= AppConstants.daysForCheatDay;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            /// 타이틀
            Text(
              '보상 현황',
              style: AppTypography.titleMedium,
            ),

            const SizedBox(height: 16),

            /// 과자박스 섹션
            _buildRewardRow(
              icon: Icons.card_giftcard_rounded,
              iconColor: AppColors.snackBox,
              label: '과자박스',
              value: '$snackBoxCount개',
              isAvailable: snackBoxCount > 0,
            ),

            const SizedBox(height: 12),

            /// 치팅데이 섹션
            _buildRewardRow(
              icon: Icons.celebration_rounded,
              iconColor: AppColors.cheatDay,
              label: '치팅데이',
              value: canUseCheatDay
                  ? '사용 가능!'
                  : '$daysUntilCheatDay일 남음',
              isAvailable: canUseCheatDay,
            ),

            const SizedBox(height: 12),

            /// 안내 메시지
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.infoContainer,
                borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
              ),
              child: Row(
                children: [
                  Icon(
                    Icons.info_outline_rounded,
                    size: 16,
                    color: AppColors.info,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      '3일 연속 성공 시 과자박스 1개 획득\n7일 연속 성공 시 치팅데이 1회 사용 가능',
                      style: AppTypography.caption.copyWith(
                        color: AppColors.info,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 보상 행 빌더
  ///
  /// 아이콘, 라벨, 값을 표시하는 행을 생성합니다.
  Widget _buildRewardRow({
    required IconData icon,
    required Color iconColor,
    required String label,
    required String value,
    required bool isAvailable,
  }) {
    return Row(
      children: [
        /// 아이콘
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: iconColor.withOpacity(0.2),
            shape: BoxShape.circle,
          ),
          child: Icon(
            icon,
            color: iconColor,
            size: 24,
          ),
        ),

        const SizedBox(width: 12),

        /// 라벨
        Expanded(
          child: Text(
            label,
            style: AppTypography.bodyMedium,
          ),
        ),

        /// 값
        Text(
          value,
          style: AppTypography.titleSmall.copyWith(
            color: isAvailable ? AppColors.success : AppColors.grey600,
            fontWeight: isAvailable ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ],
    );
  }
}
