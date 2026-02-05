/// 홈 화면
///
/// 연속 성공 일수, 핵심 미션, 주간 캘린더, 보상 시스템을 표시하는 메인 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';

/// 홈 화면 위젯
///
/// 사용자의 다이어트 진행 상황을 한눈에 보여주는 메인 화면입니다.
/// 주요 기능:
/// - 연속 성공 일수 (Streak) 표시
/// - 일일 핵심 미션 3개 관리
/// - 주간 성공률 캘린더
/// - 보상 시스템 현황 (과자박스, 치팅데이)
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('GIROGI'),
        actions: [
          /// 알림 버튼
          /// TODO: 알림 화면 연결
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {
              // TODO: 알림 화면으로 이동
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            /// 임시 아이콘
            Icon(
              Icons.home_rounded,
              size: 64,
              color: AppColors.primary,
            ),
            const SizedBox(height: 16),

            /// 화면 제목
            Text(
              '홈 화면',
              style: AppTypography.headlineMedium,
            ),
            const SizedBox(height: 8),

            /// 설명
            Text(
              '연속 성공 일수와 핵심 미션이 표시됩니다',
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
