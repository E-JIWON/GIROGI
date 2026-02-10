/// Checklist Time Section 위젯
///
/// 시간대별 체크리스트 섹션을 표시하는 위젯입니다.
/// Implementation Intention 이론을 적용한 구조화된 체크리스트입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/enums.dart';

/// Checklist Time Section 위젯
///
/// 특정 시간대의 체크리스트 항목들을 그룹으로 표시합니다.
class ChecklistTimeSection extends StatelessWidget {
  /// 시간대 (아침/점심/퇴근/저녁/운동)
  final MealTime mealTime;

  /// 체크리스트 항목 목록
  final List<Map<String, dynamic>> items;

  /// 체크 토글 콜백
  final Function(int index) onToggle;

  const ChecklistTimeSection({
    super.key,
    required this.mealTime,
    required this.items,
    required this.onToggle,
  });

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
            /// 시간대 헤더
            _buildHeader(),

            const SizedBox(height: 12),

            /// 체크리스트 항목들
            ...List.generate(
              items.length,
              (index) => _buildChecklistItem(index),
            ),
          ],
        ),
      ),
    );
  }

  /// 헤더 빌더 (시간대 아이콘 및 라벨)
  Widget _buildHeader() {
    return Row(
      children: [
        /// 시간대 아이콘
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: _getTimeColor().withOpacity(0.2),
            shape: BoxShape.circle,
          ),
          child: Icon(
            mealTime.icon,
            color: _getTimeColor(),
            size: 24,
          ),
        ),

        const SizedBox(width: 12),

        /// 시간대 라벨
        Text(
          mealTime.displayName,
          style: AppTypography.titleMedium,
        ),

        const Spacer(),

        /// 완료 카운트
        Text(
          '${_getCompletedCount()}/${items.length}',
          style: AppTypography.titleSmall.copyWith(
            color: _getCompletedCount() == items.length
                ? AppColors.success
                : AppColors.grey600,
          ),
        ),
      ],
    );
  }

  /// 체크리스트 항목 빌더
  Widget _buildChecklistItem(int index) {
    final item = items[index];
    final isChecked = item['isChecked'] ?? false;

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: InkWell(
        onTap: () => onToggle(index),
        borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
          child: Row(
            children: [
              /// 체크박스
              Icon(
                isChecked
                    ? Icons.check_circle_rounded
                    : Icons.circle_outlined,
                color: isChecked ? AppColors.success : AppColors.grey400,
                size: 24,
              ),

              const SizedBox(width: 12),

              /// 항목 텍스트
              Expanded(
                child: Text(
                  item['title'],
                  style: AppTypography.bodyMedium.copyWith(
                    decoration: isChecked ? TextDecoration.lineThrough : null,
                    color: isChecked
                        ? AppColors.grey500
                        : AppColors.textPrimaryLight,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  /// 시간대별 색상
  Color _getTimeColor() {
    switch (mealTime) {
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

  /// 완료된 항목 개수 계산
  int _getCompletedCount() {
    return items.where((item) => item['isChecked'] == true).length;
  }
}
