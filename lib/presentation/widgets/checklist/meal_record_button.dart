/// Meal Record Button 위젯
///
/// 식사 기록을 추가하는 버튼 위젯입니다.
/// Slow Eating 이론 기반의 식사 기록 기능을 제공합니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// Meal Record Button 위젯
///
/// 식사 기록 화면으로 이동하는 버튼입니다.
class MealRecordButton extends StatelessWidget {
  /// 식사 시간대 라벨
  final String mealLabel;

  /// 이미 기록된 식사가 있는지 여부
  final bool hasRecord;

  /// 탭 콜백
  final VoidCallback onTap;

  const MealRecordButton({
    super.key,
    required this.mealLabel,
    required this.hasRecord,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: hasRecord ? 0 : 2,
      color: hasRecord ? AppColors.successContainer : null,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        side: hasRecord
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
              /// 아이콘
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: hasRecord
                      ? AppColors.success
                      : AppColors.primary.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  hasRecord
                      ? Icons.check_circle_rounded
                      : Icons.restaurant_rounded,
                  color: hasRecord ? Colors.white : AppColors.primary,
                  size: 28,
                ),
              ),

              const SizedBox(width: 16),

              /// 텍스트
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      hasRecord ? '$mealLabel 기록 완료' : '$mealLabel 기록하기',
                      style: AppTypography.titleSmall.copyWith(
                        color: hasRecord
                            ? AppColors.success
                            : AppColors.textPrimaryLight,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      hasRecord
                          ? '상세 보기 또는 수정'
                          : '사진, 장소, 메뉴, 준수 행동 기록',
                      style: AppTypography.caption.copyWith(
                        color: AppColors.textSecondaryLight,
                      ),
                    ),
                  ],
                ),
              ),

              /// 화살표 아이콘
              Icon(
                Icons.chevron_right_rounded,
                color: hasRecord ? AppColors.success : AppColors.grey400,
                size: AppConstants.defaultIconSize,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
