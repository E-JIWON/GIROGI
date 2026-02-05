/// 유혹 극복 화면
///
/// 유혹 상황에서 충동 지연 및 미래 자아 시각화를 돕는 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';

/// 유혹 극복 화면 위젯
///
/// Episodic Future Thinking (EFT) 이론을 적용하여 충동을 억제합니다.
/// 주요 기능:
/// - 10분 타이머 (충동 지연 메커니즘)
/// - 미래 자아 시각화 (목표 이미지, 동기부여 메시지)
/// - 자기 연민 모드 (Self-Compassion)
/// - 실패 리포트 생성 및 커뮤니티 공유
class EmergencyScreen extends StatelessWidget {
  const EmergencyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('유혹 극복'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            /// 임시 아이콘
            Icon(
              Icons.local_fire_department_rounded,
              size: 64,
              color: AppColors.temptation,
            ),
            const SizedBox(height: 16),

            /// 화면 제목
            Text(
              '유혹 극복 화면',
              style: AppTypography.headlineMedium,
            ),
            const SizedBox(height: 8),

            /// 설명
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32),
              child: Text(
                '유혹 상황에서 10분 타이머와\n미래 자아 시각화를 통해 충동을 억제합니다',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.textSecondaryLight,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
