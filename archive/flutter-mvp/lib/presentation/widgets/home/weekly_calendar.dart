/// Weekly Calendar 위젯
///
/// 주간 성공률을 캘린더 형태로 시각화하는 위젯입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// Weekly Calendar 위젯
///
/// 최근 7일간의 성공/실패 기록을 시각적으로 표시합니다.
/// 사용자의 일관성을 한눈에 파악할 수 있도록 합니다.
class WeeklyCalendar extends StatelessWidget {
  /// 주간 성공 기록 (7일)
  /// true: 성공, false: 실패, null: 미래 날짜
  final List<bool?> weeklyRecords;

  /// 요일 라벨 (월, 화, 수, 목, 금, 토, 일)
  static const List<String> weekdayLabels = ['월', '화', '수', '목', '금', '토', '일'];

  const WeeklyCalendar({
    super.key,
    required this.weeklyRecords,
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
            /// 타이틀
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '이번 주 기록',
                  style: AppTypography.titleMedium,
                ),

                /// 성공률 표시
                Text(
                  '${_calculateSuccessRate()}%',
                  style: AppTypography.titleMedium.copyWith(
                    color: AppColors.success,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            /// 캘린더 그리드
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: List.generate(
                7,
                (index) => _buildDayColumn(
                  weekdayLabels[index],
                  weeklyRecords[index],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 일별 컬럼 빌더
  ///
  /// 요일 라벨과 성공/실패 상태를 표시합니다.
  Widget _buildDayColumn(String label, bool? isSuccess) {
    return Column(
      children: [
        /// 요일 라벨
        Text(
          label,
          style: AppTypography.labelSmall.copyWith(
            color: AppColors.grey600,
          ),
        ),

        const SizedBox(height: 8),

        /// 성공/실패 인디케이터
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: _getIndicatorColor(isSuccess),
            shape: BoxShape.circle,
            border: isSuccess == null
                ? Border.all(
                    color: AppColors.grey300,
                    width: 2,
                  )
                : null,
          ),
          child: isSuccess != null
              ? Icon(
                  isSuccess ? Icons.check_rounded : Icons.close_rounded,
                  color: Colors.white,
                  size: 20,
                )
              : null,
        ),
      ],
    );
  }

  /// 인디케이터 색상 결정
  ///
  /// 성공: 초록색, 실패: 빨간색, 미래: 회색
  Color _getIndicatorColor(bool? isSuccess) {
    if (isSuccess == null) {
      return AppColors.grey100;
    }
    return isSuccess ? AppColors.success : AppColors.error;
  }

  /// 성공률 계산 (백분율)
  ///
  /// 완료된 날짜 중 성공한 날의 비율을 계산합니다.
  int _calculateSuccessRate() {
    final completedDays = weeklyRecords.where((record) => record != null).toList();
    if (completedDays.isEmpty) return 0;

    final successDays = completedDays.where((record) => record == true).length;
    return ((successDays / completedDays.length) * 100).round();
  }
}
