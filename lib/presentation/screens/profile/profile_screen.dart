/// 프로필 화면
///
/// 사용자의 프로필 정보 및 활동 히스토리를 표시하는 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';

/// 프로필 화면 위젯
///
/// 다중 탭 구조로 사용자의 활동을 다각도로 보여줍니다.
/// 주요 기능:
/// - 프로필 정보 (닉네임, 바이오, 통계)
/// - 미션 탭 (일일 미션 달성 현황)
/// - 체크리스트 탭 (체크리스트 히스토리)
/// - 식사 타임라인 탭 (식사 기록 타임라인)
/// - 기록 탭 (공유한 게시글)
/// - 팔로우/팔로잉 네트워크
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('프로필'),
        actions: [
          /// 설정 버튼
          /// TODO: 설정 화면 연결
          IconButton(
            icon: const Icon(Icons.settings_outlined),
            onPressed: () {
              // TODO: 설정 화면으로 이동
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            /// 임시 프로필 아이콘
            CircleAvatar(
              radius: 40,
              backgroundColor: AppColors.primary,
              child: const Icon(
                Icons.person_rounded,
                size: 48,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 16),

            /// 화면 제목
            Text(
              '프로필 화면',
              style: AppTypography.headlineMedium,
            ),
            const SizedBox(height: 8),

            /// 설명
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32),
              child: Text(
                '나의 활동 히스토리와\n다른 사용자 프로필을 확인할 수 있습니다',
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
