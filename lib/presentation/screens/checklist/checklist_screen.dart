/// 체크리스트 화면
///
/// 시간대별 행동 체크리스트와 식사 기록을 관리하는 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';

/// 체크리스트 화면 위젯
///
/// Implementation Intention 이론을 적용한 구조화된 체크리스트를 제공합니다.
/// 주요 기능:
/// - 시간대별 체크리스트 (아침/점심/퇴근/저녁/운동)
/// - 식사 기록 (사진, 장소, 메뉴, 준수 행동)
/// - 주간 외식 빈도 모니터링 및 경고
class ChecklistScreen extends StatelessWidget {
  const ChecklistScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('체크리스트'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            /// 임시 아이콘
            Icon(
              Icons.checklist_rounded,
              size: 64,
              color: AppColors.primary,
            ),
            const SizedBox(height: 16),

            /// 화면 제목
            Text(
              '체크리스트 화면',
              style: AppTypography.headlineMedium,
            ),
            const SizedBox(height: 8),

            /// 설명
            Text(
              '시간대별 체크리스트와 식사 기록이 표시됩니다',
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.textSecondaryLight,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
