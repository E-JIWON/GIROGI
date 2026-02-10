/// 식사 타임라인 아이템 위젯
///
/// 식사 기록을 타임라인 형식으로 표시하는 위젯입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/meal_record.dart';

/// 식사 타임라인 아이템 위젯
///
/// 식사 사진, 시간, 장소, 메뉴를 타임라인 형식으로 표시합니다.
class MealTimelineItem extends StatelessWidget {
  /// 식사 기록 데이터
  final MealRecord mealRecord;

  /// 마지막 아이템 여부 (타임라인 선 표시)
  final bool isLast;

  const MealTimelineItem({
    super.key,
    required this.mealRecord,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 타임라인 표시
          Column(
            children: [
              /// 시간 표시
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 8,
                  vertical: 4,
                ),
                decoration: BoxDecoration(
                  color: _getMealTimeColor(),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  _formatTime(mealRecord.timestamp),
                  style: AppTypography.caption.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),

              const SizedBox(height: 8),

              /// 점
              Container(
                width: 12,
                height: 12,
                decoration: BoxDecoration(
                  color: _getMealTimeColor(),
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Colors.white,
                    width: 2,
                  ),
                ),
              ),

              /// 연결선
              if (!isLast)
                Expanded(
                  child: Container(
                    width: 2,
                    color: AppColors.grey300,
                    margin: const EdgeInsets.symmetric(vertical: 4),
                  ),
                ),
            ],
          ),

          const SizedBox(width: 16),

          /// 식사 내용
          Expanded(
            child: Container(
              margin: const EdgeInsets.only(
                bottom: isLast ? 0 : AppConstants.defaultPadding,
              ),
              padding: const EdgeInsets.all(AppConstants.defaultPadding),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius:
                    BorderRadius.circular(AppConstants.defaultBorderRadius),
                border: Border.all(
                  color: AppColors.grey200,
                  width: 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  /// 식사 시간대 및 타입
                  Row(
                    children: [
                      Icon(
                        mealRecord.mealTime.icon,
                        size: 20,
                        color: _getMealTimeColor(),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        mealRecord.mealTime.displayName,
                        style: AppTypography.titleSmall.copyWith(
                          color: _getMealTimeColor(),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Spacer(),
                      if (mealRecord.location != null)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: mealRecord.isDiningOut
                                ? AppColors.warningContainer
                                : AppColors.successContainer,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            mealRecord.isDiningOut ? '외식' : '집밥',
                            style: AppTypography.caption.copyWith(
                              color: mealRecord.isDiningOut
                                  ? AppColors.warning
                                  : AppColors.success,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                    ],
                  ),

                  const SizedBox(height: 12),

                  /// 식사 사진 (있는 경우)
                  if (mealRecord.photoUrls.isNotEmpty) ...[
                    ClipRRect(
                      borderRadius: BorderRadius.circular(
                          AppConstants.smallBorderRadius),
                      child: Image.network(
                        mealRecord.photoUrls.first,
                        width: double.infinity,
                        height: 150,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) =>
                            Container(
                          height: 150,
                          color: AppColors.grey200,
                          child: const Center(
                            child:
                                Icon(Icons.broken_image_rounded, size: 48),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                  ],

                  /// 장소 (있는 경우)
                  if (mealRecord.location != null) ...[
                    Row(
                      children: [
                        Icon(
                          Icons.location_on_rounded,
                          size: 16,
                          color: AppColors.grey600,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          mealRecord.location!,
                          style: AppTypography.bodySmall.copyWith(
                            color: AppColors.grey700,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                  ],

                  /// 메뉴 (있는 경우)
                  if (mealRecord.menu != null && mealRecord.menu!.isNotEmpty)
                    Text(
                      mealRecord.menu!,
                      style: AppTypography.bodyMedium,
                    ),

                  /// 준수 행동 태그
                  if (mealRecord.compliantBehaviors.isNotEmpty) ...[
                    const SizedBox(height: 12),
                    Wrap(
                      spacing: 6,
                      runSpacing: 6,
                      children: mealRecord.compliantBehaviors.map((behavior) {
                        return Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: AppColors.primaryContainer,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            behavior,
                            style: AppTypography.caption.copyWith(
                              color: AppColors.primary,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// 식사 시간대별 색상
  Color _getMealTimeColor() {
    switch (mealRecord.mealTime) {
      case MealTime.breakfast:
        return Colors.orange;
      case MealTime.lunch:
        return Colors.amber;
      case MealTime.dinner:
        return Colors.deepPurple;
      default:
        return AppColors.primary;
    }
  }

  /// 시간 포맷팅
  String _formatTime(DateTime time) {
    final hour = time.hour.toString().padLeft(2, '0');
    final minute = time.minute.toString().padLeft(2, '0');
    return '$hour:$minute';
  }
}
