/// Mission Card 위젯
///
/// 일일 핵심 미션을 표시하는 카드 위젯입니다.
/// 3개 미션 중 2개 이상 달성 시 성공일로 인정됩니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// Mission Card 위젯
///
/// 핵심 미션의 제목과 완료 상태를 표시합니다.
/// Tiny Habits 이론을 적용하여 작은 행동 단위로 구성됩니다.
class MissionCard extends StatelessWidget {
  /// 미션 제목
  final String title;

  /// 미션 설명
  final String description;

  /// 완료 여부
  final bool isCompleted;

  /// 아이콘
  final IconData icon;

  /// 탭 콜백 (체크/언체크)
  final VoidCallback? onTap;

  const MissionCard({
    super.key,
    required this.title,
    required this.description,
    required this.isCompleted,
    required this.icon,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      /// 완료 시 배경색 변경
      color: isCompleted
          ? AppColors.successContainer
          : Theme.of(context).cardColor,
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        side: isCompleted
            ? const BorderSide(color: AppColors.success, width: 2)
            : BorderSide.none,
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        child: Padding(
          padding: const EdgeInsets.all(AppConstants.defaultPadding),
          child: Row(
            children: [
              /// 체크박스 또는 아이콘
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: isCompleted
                      ? AppColors.success
                      : AppColors.grey200,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  isCompleted ? Icons.check_rounded : icon,
                  color: isCompleted ? Colors.white : AppColors.grey600,
                  size: 28,
                ),
              ),

              const SizedBox(width: 16),

              /// 미션 정보
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    /// 미션 제목
                    Text(
                      title,
                      style: AppTypography.missionTitle.copyWith(
                        color: isCompleted
                            ? AppColors.success
                            : AppColors.textPrimaryLight,
                        decoration: isCompleted
                            ? TextDecoration.lineThrough
                            : null,
                      ),
                    ),

                    const SizedBox(height: 4),

                    /// 미션 설명
                    Text(
                      description,
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.textSecondaryLight,
                      ),
                    ),
                  ],
                ),
              ),

              /// 화살표 아이콘 (더보기)
              if (!isCompleted)
                Icon(
                  Icons.chevron_right_rounded,
                  color: AppColors.grey400,
                  size: AppConstants.defaultIconSize,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
