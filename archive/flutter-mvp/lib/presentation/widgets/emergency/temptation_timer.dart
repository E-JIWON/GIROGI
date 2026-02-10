/// 유혹 타이머 위젯
///
/// 10분 타이머로 충동을 지연시키는 위젯입니다.
/// 타이머 종료 후에는 유혹이 사라졌는지 확인합니다.
library;

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// 유혹 타이머 위젯
///
/// 충동 지연 메커니즘 (10분 타이머)을 제공합니다.
/// 타이머 진행 중에는 미래 자아 시각화를 보여줍니다.
class TemptationTimer extends StatefulWidget {
  /// 타이머 완료 콜백
  final VoidCallback? onTimerComplete;

  const TemptationTimer({
    super.key,
    this.onTimerComplete,
  });

  @override
  State<TemptationTimer> createState() => _TemptationTimerState();
}

class _TemptationTimerState extends State<TemptationTimer> {
  /// 타이머 지속 시간 (초)
  static const int timerDuration = 600; // 10분

  /// 남은 시간 (초)
  int remainingSeconds = timerDuration;

  /// 타이머 실행 중 여부
  bool isRunning = false;

  /// 타이머 완료 여부
  bool isCompleted = false;

  /// 타이머 객체
  Timer? _timer;

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  /// 타이머 시작
  void _startTimer() {
    setState(() {
      isRunning = true;
      remainingSeconds = timerDuration;
      isCompleted = false;
    });

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (remainingSeconds > 0) {
        setState(() {
          remainingSeconds--;
        });
      } else {
        _completeTimer();
      }
    });
  }

  /// 타이머 일시정지
  void _pauseTimer() {
    _timer?.cancel();
    setState(() {
      isRunning = false;
    });
  }

  /// 타이머 재시작
  void _resumeTimer() {
    setState(() {
      isRunning = true;
    });

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (remainingSeconds > 0) {
        setState(() {
          remainingSeconds--;
        });
      } else {
        _completeTimer();
      }
    });
  }

  /// 타이머 리셋
  void _resetTimer() {
    _timer?.cancel();
    setState(() {
      isRunning = false;
      remainingSeconds = timerDuration;
      isCompleted = false;
    });
  }

  /// 타이머 완료
  void _completeTimer() {
    _timer?.cancel();
    setState(() {
      isRunning = false;
      isCompleted = true;
      remainingSeconds = 0;
    });
    widget.onTimerComplete?.call();
  }

  /// 남은 시간을 분:초 형식으로 변환
  String _formatTime(int seconds) {
    final minutes = seconds ~/ 60;
    final remainingSeconds = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${remainingSeconds.toString().padLeft(2, '0')}';
  }

  /// 진행률 계산 (0.0 ~ 1.0)
  double get _progress =>
      1.0 - (remainingSeconds / timerDuration);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppConstants.largePadding),
        child: Column(
          children: [
            /// 타이머 제목
            Text(
              isCompleted ? '잘하셨습니다!' : '10분만 기다려보세요',
              style: AppTypography.titleLarge.copyWith(
                color: isCompleted ? AppColors.success : AppColors.temptation,
              ),
            ),

            const SizedBox(height: 8),

            /// 타이머 설명
            Text(
              isCompleted
                  ? '유혹을 이겨내셨습니다. 아직도 먹고 싶으신가요?'
                  : '충동은 보통 10분 내에 사라집니다',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.textSecondaryLight,
              ),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: AppConstants.largePadding),

            /// 원형 타이머 디스플레이
            SizedBox(
              width: 200,
              height: 200,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  /// 진행률 표시 (CircularProgressIndicator)
                  SizedBox(
                    width: 200,
                    height: 200,
                    child: CircularProgressIndicator(
                      value: _progress,
                      strokeWidth: 12,
                      backgroundColor: AppColors.grey200,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        isCompleted ? AppColors.success : AppColors.temptation,
                      ),
                    ),
                  ),

                  /// 남은 시간 또는 완료 아이콘
                  if (isCompleted)
                    Icon(
                      Icons.check_circle_rounded,
                      size: 80,
                      color: AppColors.success,
                    )
                  else
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          _formatTime(remainingSeconds),
                          style: AppTypography.timerDisplay,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '남은 시간',
                          style: AppTypography.caption.copyWith(
                            color: AppColors.grey600,
                          ),
                        ),
                      ],
                    ),
                ],
              ),
            ),

            const SizedBox(height: AppConstants.largePadding),

            /// 타이머 컨트롤 버튼
            if (!isCompleted) _buildControlButtons(),

            /// 완료 후 버튼
            if (isCompleted) _buildCompletionButtons(),
          ],
        ),
      ),
    );
  }

  /// 타이머 컨트롤 버튼
  Widget _buildControlButtons() {
    if (!isRunning && remainingSeconds == timerDuration) {
      // 시작 전
      return SizedBox(
        width: double.infinity,
        child: ElevatedButton.icon(
          onPressed: _startTimer,
          icon: const Icon(Icons.play_arrow_rounded),
          label: const Text('타이머 시작'),
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 16),
            backgroundColor: AppColors.temptation,
            foregroundColor: Colors.white,
          ),
        ),
      );
    } else if (isRunning) {
      // 진행 중
      return Row(
        children: [
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _pauseTimer,
              icon: const Icon(Icons.pause_rounded),
              label: const Text('일시정지'),
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _resetTimer,
              icon: const Icon(Icons.refresh_rounded),
              label: const Text('리셋'),
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ),
        ],
      );
    } else {
      // 일시정지 상태
      return Row(
        children: [
          Expanded(
            child: ElevatedButton.icon(
              onPressed: _resumeTimer,
              icon: const Icon(Icons.play_arrow_rounded),
              label: const Text('재시작'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: AppColors.temptation,
                foregroundColor: Colors.white,
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: OutlinedButton.icon(
              onPressed: _resetTimer,
              icon: const Icon(Icons.refresh_rounded),
              label: const Text('리셋'),
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ),
        ],
      );
    }
  }

  /// 완료 후 버튼
  Widget _buildCompletionButtons() {
    return Column(
      children: [
        /// 유혹 사라짐 버튼
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: () {
              // TODO: 성공 기록 저장
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('훌륭합니다! 유혹을 이겨냈습니다.'),
                  backgroundColor: AppColors.success,
                ),
              );
              _resetTimer();
            },
            icon: const Icon(Icons.check_circle_rounded),
            label: const Text('네, 유혹이 사라졌습니다'),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
              backgroundColor: AppColors.success,
              foregroundColor: Colors.white,
            ),
          ),
        ),

        const SizedBox(height: 12),

        /// 자기 연민 모드 버튼
        SizedBox(
          width: double.infinity,
          child: OutlinedButton.icon(
            onPressed: () {
              // TODO: 자기 연민 모드로 이동
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('자기 연민 모드로 이동합니다'),
                ),
              );
            },
            icon: const Icon(Icons.favorite_rounded),
            label: const Text('아니요, 먹었습니다 (자기 연민 모드)'),
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
              foregroundColor: AppColors.selfCompassion,
            ),
          ),
        ),
      ],
    );
  }
}
