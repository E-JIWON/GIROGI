/// 비교 차트 위젯
///
/// 듀오링고 스타일의 사용자 간 비교 차트 위젯입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/user_stats.dart';

/// 비교 차트 위젯
///
/// 여러 사용자의 통계를 비교하는 가로 막대 차트를 표시합니다.
class ComparisonChart extends StatelessWidget {
  /// 통계 목록
  final List<UserStats> statsList;

  /// 차트 타입
  final ComparisonChartType chartType;

  const ComparisonChart({
    super.key,
    required this.statsList,
    required this.chartType,
  });

  @override
  Widget build(BuildContext context) {
    if (statsList.isEmpty) {
      return _buildEmptyState();
    }

    // 정렬 (값 기준 내림차순)
    final sortedStats = List<UserStats>.from(statsList)
      ..sort((a, b) => _getValue(b).compareTo(_getValue(a)));

    // 최대값 계산
    final maxValue = sortedStats.map(_getValue).reduce((a, b) => a > b ? a : b);

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
            /// 헤더
            Row(
              children: [
                Icon(
                  _getChartIcon(),
                  color: AppColors.primary,
                  size: 24,
                ),
                const SizedBox(width: 12),
                Text(
                  _getChartTitle(),
                  style: AppTypography.titleMedium,
                ),
              ],
            ),

            const SizedBox(height: AppConstants.defaultPadding),

            /// 차트 항목들
            ...sortedStats.asMap().entries.map((entry) {
              final index = entry.key;
              final stats = entry.value;
              final value = _getValue(stats);
              final percentage = maxValue > 0 ? value / maxValue : 0.0;

              return _buildChartItem(
                stats: stats,
                value: value,
                percentage: percentage,
                rank: index + 1,
                isTopRank: index == 0,
              );
            }),
          ],
        ),
      ),
    );
  }

  /// 빈 상태 빌더
  Widget _buildEmptyState() {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.largePadding),
        child: Center(
          child: Column(
            children: [
              Icon(
                Icons.bar_chart_rounded,
                size: 48,
                color: AppColors.grey400,
              ),
              const SizedBox(height: 12),
              Text(
                '비교할 데이터가 없습니다',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.grey600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  /// 차트 항목 빌더
  Widget _buildChartItem({
    required UserStats stats,
    required double value,
    required double percentage,
    required int rank,
    required bool isTopRank,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// 순위 및 사용자 정보
          Row(
            children: [
              /// 순위
              Container(
                width: 24,
                height: 24,
                decoration: BoxDecoration(
                  color: isTopRank ? AppColors.primary : AppColors.grey300,
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    '$rank',
                    style: AppTypography.caption.copyWith(
                      color: isTopRank ? Colors.white : AppColors.grey700,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),

              const SizedBox(width: 12),

              /// 프로필 이미지
              CircleAvatar(
                radius: 16,
                backgroundColor: AppColors.primary,
                backgroundImage: stats.profileImageUrl != null
                    ? NetworkImage(stats.profileImageUrl!)
                    : null,
                child: stats.profileImageUrl == null
                    ? Text(
                        stats.nickname[0].toUpperCase(),
                        style: AppTypography.caption.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      )
                    : null,
              ),

              const SizedBox(width: 8),

              /// 닉네임
              Expanded(
                child: Text(
                  stats.nickname,
                  style: AppTypography.bodyMedium.copyWith(
                    fontWeight: isTopRank ? FontWeight.bold : FontWeight.normal,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),

              /// 값
              Text(
                _formatValue(value),
                style: AppTypography.titleSmall.copyWith(
                  color: isTopRank ? AppColors.primary : AppColors.grey700,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),

          const SizedBox(height: 8),

          /// 진행률 바
          Stack(
            children: [
              /// 배경 바
              Container(
                height: 8,
                decoration: BoxDecoration(
                  color: AppColors.grey200,
                  borderRadius: BorderRadius.circular(4),
                ),
              ),

              /// 진행률 바
              FractionallySizedBox(
                widthFactor: percentage,
                child: Container(
                  height: 8,
                  decoration: BoxDecoration(
                    gradient: isTopRank
                        ? AppColors.streakGradient
                        : LinearGradient(
                            colors: [
                              AppColors.primary.withOpacity(0.7),
                              AppColors.primary.withOpacity(0.5),
                            ],
                          ),
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// 차트 타입별 값 추출
  double _getValue(UserStats stats) {
    switch (chartType) {
      case ComparisonChartType.streak:
        return stats.currentStreak.toDouble();
      case ComparisonChartType.successRate:
        return stats.successRate;
      case ComparisonChartType.weeklySuccess:
        return stats.weeklySuccessCount.toDouble();
      case ComparisonChartType.totalDays:
        return stats.totalDays.toDouble();
    }
  }

  /// 차트 타입별 값 포맷팅
  String _formatValue(double value) {
    switch (chartType) {
      case ComparisonChartType.successRate:
        return '${value.toStringAsFixed(0)}%';
      case ComparisonChartType.streak:
      case ComparisonChartType.weeklySuccess:
      case ComparisonChartType.totalDays:
        return '${value.toInt()}일';
    }
  }

  /// 차트 타입별 아이콘
  IconData _getChartIcon() {
    switch (chartType) {
      case ComparisonChartType.streak:
        return Icons.local_fire_department_rounded;
      case ComparisonChartType.successRate:
        return Icons.trending_up_rounded;
      case ComparisonChartType.weeklySuccess:
        return Icons.calendar_week_rounded;
      case ComparisonChartType.totalDays:
        return Icons.calendar_month_rounded;
    }
  }

  /// 차트 타입별 제목
  String _getChartTitle() {
    switch (chartType) {
      case ComparisonChartType.streak:
        return '연속 성공 일수';
      case ComparisonChartType.successRate:
        return '전체 성공률';
      case ComparisonChartType.weeklySuccess:
        return '이번 주 성공 일수';
      case ComparisonChartType.totalDays:
        return '총 다이어트 일수';
    }
  }
}

/// 비교 차트 타입
enum ComparisonChartType {
  /// 연속 성공 일수
  streak,

  /// 전체 성공률
  successRate,

  /// 주간 성공 일수
  weeklySuccess,

  /// 총 다이어트 일수
  totalDays,
}
