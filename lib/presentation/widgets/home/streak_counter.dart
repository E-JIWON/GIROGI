/// Streak Counter 위젯
///
/// 연속 성공 일수를 표시하는 카운터 위젯입니다.
/// 도파민 자극을 위한 시각적 효과를 포함합니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// Streak Counter 위젯
///
/// 연속 성공 일수를 강조하여 표시하고 사용자의 성취감을 자극합니다.
/// 그라데이션 배경과 큰 숫자로 시각적 몰입도를 높입니다.
class StreakCounter extends StatelessWidget {
  /// 현재 연속 성공 일수
  final int currentStreak;

  /// 최고 연속 성공 일수
  final int bestStreak;

  const StreakCounter({
    super.key,
    required this.currentStreak,
    required this.bestStreak,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      /// 카드 패딩
      padding: const EdgeInsets.all(AppConstants.defaultPadding),

      /// 그라데이션 배경 (Streak 강조 색상)
      decoration: BoxDecoration(
        gradient: AppColors.streakGradient,
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        boxShadow: [
          BoxShadow(
            color: AppColors.streak.withOpacity(0.3),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),

      child: Column(
        children: [
          /// 상단 라벨
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              /// 타이틀
              Text(
                '연속 성공',
                style: AppTypography.titleMedium.copyWith(
                  color: Colors.white,
                ),
              ),

              /// 불꽃 아이콘 (Streak 시각화)
              Icon(
                Icons.local_fire_department_rounded,
                color: Colors.white,
                size: AppConstants.defaultIconSize,
              ),
            ],
          ),

          const SizedBox(height: 16),

          /// 현재 Streak 숫자 (강조)
          Text(
            '$currentStreak일',
            style: AppTypography.streakCounter.copyWith(
              color: Colors.white,
            ),
          ),

          const SizedBox(height: 8),

          /// 최고 기록 표시
          if (bestStreak > 0)
            Container(
              padding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 6,
              ),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.2),
                borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
              ),
              child: Text(
                '최고 기록: $bestStreak일',
                style: AppTypography.labelMedium.copyWith(
                  color: Colors.white,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
