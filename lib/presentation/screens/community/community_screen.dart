/// 커뮤니티 화면
///
/// 사용자 간 경험 공유 및 상호 지원을 위한 소셜 피드 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';

/// 커뮤니티 화면 위젯
///
/// 소셜 기능을 통한 동기부여 및 지속 가능성을 제공합니다.
/// 주요 기능:
/// - 피드 (전체/팔로잉)
/// - 리액션 시스템 (6종 감정 표현)
/// - 댓글 기반 상호 지원
/// - 유튜브 숏츠 형식 동기부여 콘텐츠
class CommunityScreen extends StatelessWidget {
  const CommunityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('커뮤니티'),
        actions: [
          /// 글쓰기 버튼
          /// TODO: 글쓰기 화면 연결
          IconButton(
            icon: const Icon(Icons.edit_rounded),
            onPressed: () {
              // TODO: 글쓰기 화면으로 이동
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
              Icons.people_rounded,
              size: 64,
              color: AppColors.community,
            ),
            const SizedBox(height: 16),

            /// 화면 제목
            Text(
              '커뮤니티 화면',
              style: AppTypography.headlineMedium,
            ),
            const SizedBox(height: 8),

            /// 설명
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32),
              child: Text(
                '다른 사용자들과 경험을 공유하고\n서로를 응원할 수 있습니다',
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
