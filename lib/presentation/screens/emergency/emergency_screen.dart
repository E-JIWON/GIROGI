/// 유혹 극복 화면
///
/// 유혹 상황에서 충동 지연 및 미래 자아 시각화를 돕는 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/presentation/widgets/emergency/temptation_timer.dart';
import 'package:girogi/presentation/widgets/emergency/future_self_card.dart';
import 'package:girogi/presentation/widgets/emergency/self_compassion_card.dart';
import 'package:girogi/presentation/widgets/emergency/failure_report_dialog.dart';

/// 유혹 극복 화면 위젯
///
/// Episodic Future Thinking (EFT) 이론을 적용하여 충동을 억제합니다.
/// 주요 기능:
/// - 10분 타이머 (충동 지연 메커니즘)
/// - 미래 자아 시각화 (목표 이미지, 동기부여 메시지)
/// - 자기 연민 모드 (Self-Compassion)
/// - 실패 리포트 생성 및 커뮤니티 공유
///
/// TODO: Mock Repository 데이터 연동
class EmergencyScreen extends StatefulWidget {
  const EmergencyScreen({super.key});

  @override
  State<EmergencyScreen> createState() => _EmergencyScreenState();
}

class _EmergencyScreenState extends State<EmergencyScreen> {
  /// TODO: Repository에서 데이터 가져오기
  /// 현재는 하드코딩된 샘플 데이터 사용

  /// 자기 연민 모드 활성화 여부
  bool showSelfCompassionMode = false;

  /// 목표 데이터 (샘플)
  /// TODO: Repository에서 사용자 목표 가져오기
  final String? goalImageUrl = null; // 목표 이미지 미설정 상태
  final double? targetWeight = 65.0; // kg
  final double? currentWeight = 72.5; // kg
  final DateTime? targetDate = DateTime.now().add(const Duration(days: 90));

  /// 실패 리포트 작성 화면 열기
  void _openFailureReport() {
    FailureReportDialog.show(context);
  }

  /// 자기 연민 모드 토글
  void _toggleSelfCompassionMode() {
    setState(() {
      showSelfCompassionMode = !showSelfCompassionMode;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      /// AppBar
      appBar: AppBar(
        title: const Text('유혹 극복'),
        actions: [
          /// 자기 연민 모드 토글 버튼
          IconButton(
            icon: Icon(
              showSelfCompassionMode
                  ? Icons.favorite_rounded
                  : Icons.favorite_border_rounded,
              color: showSelfCompassionMode
                  ? AppColors.selfCompassion
                  : null,
            ),
            onPressed: _toggleSelfCompassionMode,
            tooltip: '자기 연민 모드',
          ),
        ],
      ),

      /// Body
      body: RefreshIndicator(
        /// 당겨서 새로고침
        /// TODO: Repository에서 최신 데이터 가져오기
        onRefresh: () async {
          await Future.delayed(const Duration(seconds: 1));
          // TODO: 데이터 새로고침 로직
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(AppConstants.defaultPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// 자기 연민 모드
              if (showSelfCompassionMode) ...[
                SelfCompassionCard(
                  onCreateReport: _openFailureReport,
                ),
                const SizedBox(height: AppConstants.defaultPadding),
              ],

              /// 일반 모드
              if (!showSelfCompassionMode) ...[
                /// 1. 10분 타이머
                TemptationTimer(
                  onTimerComplete: () {
                    // TODO: 타이머 완료 시 처리
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('10분이 지났습니다. 아직도 먹고 싶으신가요?'),
                        duration: Duration(seconds: 3),
                      ),
                    );
                  },
                ),

                const SizedBox(height: AppConstants.defaultPadding),

                /// 2. 미래 자아 시각화
                FutureSelfCard(
                  goalImageUrl: goalImageUrl,
                  targetWeight: targetWeight,
                  currentWeight: currentWeight,
                  targetDate: targetDate,
                ),
              ],

              const SizedBox(height: AppConstants.defaultPadding),
            ],
          ),
        ),
      ),

      /// 떠있는 액션 버튼 (실패 리포트)
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _openFailureReport,
        icon: const Icon(Icons.edit_note_rounded),
        label: const Text('실패 리포트'),
        backgroundColor: AppColors.selfCompassion,
        foregroundColor: Colors.white,
      ),
    );
  }
}
