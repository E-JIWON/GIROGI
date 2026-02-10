/// 자기 연민 카드 위젯
///
/// Self-Compassion Theory를 적용한 실패 후 복귀 지원 위젯입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// 자기 연민 카드 위젯
///
/// 실패 후 자기 비난을 최소화하고 즉각적인 복귀를 지원합니다.
/// Self-Compassion 연구에 따르면 실패에 대한 자기 연민은
/// 장기적인 지속 의지를 강화합니다.
class SelfCompassionCard extends StatelessWidget {
  /// 실패 리포트 생성 콜백
  final VoidCallback? onCreateReport;

  const SelfCompassionCard({
    super.key,
    this.onCreateReport,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      color: AppColors.selfCompassionContainer,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        side: BorderSide(
          color: AppColors.selfCompassion,
          width: 2,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.largePadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            /// 헤더
            Row(
              children: [
                Icon(
                  Icons.favorite_rounded,
                  color: AppColors.selfCompassion,
                  size: 32,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    '괜찮습니다',
                    style: AppTypography.headlineSmall.copyWith(
                      color: AppColors.selfCompassion,
                    ),
                  ),
                ),
              ],
            ),

            const SizedBox(height: AppConstants.defaultPadding),

            /// 자기 연민 메시지
            _buildCompassionMessage(),

            const SizedBox(height: AppConstants.defaultPadding),

            /// 통계 정보
            _buildStatistics(),

            const SizedBox(height: AppConstants.largePadding),

            /// 다시 시작하기 버튼
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  // TODO: 오늘 기록 초기화 및 재시작
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('다시 시작합니다! 화이팅!'),
                      backgroundColor: AppColors.success,
                    ),
                  );
                },
                icon: const Icon(Icons.refresh_rounded),
                label: const Text('다시 시작하기'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: AppColors.selfCompassion,
                  foregroundColor: Colors.white,
                ),
              ),
            ),

            const SizedBox(height: 12),

            /// 실패 리포트 작성 버튼
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: onCreateReport,
                icon: const Icon(Icons.edit_note_rounded),
                label: const Text('실패 리포트 작성'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  foregroundColor: AppColors.selfCompassion,
                  side: BorderSide(
                    color: AppColors.selfCompassion,
                    width: 2,
                  ),
                ),
              ),
            ),

            const SizedBox(height: AppConstants.defaultPadding),

            /// 안내 메시지
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.infoContainer,
                borderRadius:
                    BorderRadius.circular(AppConstants.smallBorderRadius),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(
                    Icons.info_outline_rounded,
                    color: AppColors.info,
                    size: 20,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      '실패 리포트를 작성하면 같은 상황을 대비할 수 있습니다. '
                      '커뮤니티에 공유하여 응원을 받을 수도 있습니다.',
                      style: AppTypography.caption.copyWith(
                        color: AppColors.grey800,
                        height: 1.5,
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

  /// 자기 연민 메시지 빌더
  Widget _buildCompassionMessage() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '한 번의 실수로 모든 것이 끝나는 건 아닙니다',
          style: AppTypography.titleMedium.copyWith(
            color: AppColors.grey900,
          ),
        ),
        const SizedBox(height: 12),
        Text(
          '• 완벽한 사람은 없습니다\n'
          '• 실패는 배움의 기회입니다\n'
          '• 중요한 건 다시 일어서는 것입니다\n'
          '• 지금 바로 다시 시작할 수 있습니다',
          style: AppTypography.bodyMedium.copyWith(
            color: AppColors.grey800,
            height: 1.8,
          ),
        ),
      ],
    );
  }

  /// 통계 정보 빌더
  Widget _buildStatistics() {
    /// TODO: Repository에서 실제 통계 데이터 가져오기
    const totalAttempts = 45;
    const successCount = 38;
    const successRate = (successCount / totalAttempts * 100);

    return Container(
      padding: const EdgeInsets.all(AppConstants.defaultPadding),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
        border: Border.all(
          color: AppColors.grey300,
          width: 1,
        ),
      ),
      child: Column(
        children: [
          /// 성공률
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '전체 성공률',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.grey700,
                ),
              ),
              Text(
                '${successRate.toStringAsFixed(0)}%',
                style: AppTypography.titleLarge.copyWith(
                  color: AppColors.success,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          /// 진행률 바
          ClipRRect(
            borderRadius:
                BorderRadius.circular(AppConstants.smallBorderRadius),
            child: LinearProgressIndicator(
              value: successRate / 100,
              minHeight: 8,
              backgroundColor: AppColors.grey200,
              valueColor: const AlwaysStoppedAnimation<Color>(
                AppColors.success,
              ),
            ),
          ),

          const SizedBox(height: 12),

          /// 통계 상세
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatItem(
                icon: Icons.check_circle_rounded,
                label: '성공',
                value: '$successCount일',
                color: AppColors.success,
              ),
              Container(
                width: 1,
                height: 40,
                color: AppColors.grey300,
              ),
              _buildStatItem(
                icon: Icons.error_rounded,
                label: '실패',
                value: '${totalAttempts - successCount}일',
                color: AppColors.error,
              ),
              Container(
                width: 1,
                height: 40,
                color: AppColors.grey300,
              ),
              _buildStatItem(
                icon: Icons.calendar_month_rounded,
                label: '전체',
                value: '$totalAttempts일',
                color: AppColors.grey700,
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// 통계 항목 빌더
  Widget _buildStatItem({
    required IconData icon,
    required String label,
    required String value,
    required Color color,
  }) {
    return Column(
      children: [
        Icon(icon, color: color, size: 24),
        const SizedBox(height: 4),
        Text(
          value,
          style: AppTypography.titleSmall.copyWith(
            color: color,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: AppTypography.caption.copyWith(
            color: AppColors.grey600,
          ),
        ),
      ],
    );
  }
}
