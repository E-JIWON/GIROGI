/// 실패 리포트 다이얼로그 위젯
///
/// 실패 상황을 기록하고 분석하는 다이얼로그입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// 실패 리포트 다이얼로그 위젯
///
/// 실패 원인을 분석하고 다음 대응 방안을 기록합니다.
/// 커뮤니티 공유를 통해 응원과 조언을 받을 수 있습니다.
class FailureReportDialog extends StatefulWidget {
  const FailureReportDialog({super.key});

  /// 다이얼로그 표시
  static Future<void> show(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) => const FailureReportDialog(),
    );
  }

  @override
  State<FailureReportDialog> createState() => _FailureReportDialogState();
}

class _FailureReportDialogState extends State<FailureReportDialog> {
  /// 폼 키
  final _formKey = GlobalKey<FormState>();

  /// 실패 상황 컨트롤러
  final _situationController = TextEditingController();

  /// 실패 원인 컨트롤러
  final _reasonController = TextEditingController();

  /// 다음 대응 방안 컨트롤러
  final _solutionController = TextEditingController();

  /// 커뮤니티 공유 여부
  bool _shareWithCommunity = false;

  @override
  void dispose() {
    _situationController.dispose();
    _reasonController.dispose();
    _solutionController.dispose();
    super.dispose();
  }

  /// 리포트 저장
  void _saveReport() {
    if (_formKey.currentState?.validate() ?? false) {
      // TODO: Repository에 실패 리포트 저장
      // TODO: 커뮤니티 공유 옵션 처리

      Navigator.of(context).pop();

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            _shareWithCommunity
                ? '실패 리포트가 저장되고 커뮤니티에 공유되었습니다'
                : '실패 리포트가 저장되었습니다',
          ),
          backgroundColor: AppColors.success,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
      ),
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(AppConstants.largePadding),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /// 헤더
                Row(
                  children: [
                    Icon(
                      Icons.edit_note_rounded,
                      color: AppColors.selfCompassion,
                      size: 28,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        '실패 리포트',
                        style: AppTypography.headlineSmall,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close_rounded),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ],
                ),

                const SizedBox(height: AppConstants.defaultPadding),

                /// 안내 메시지
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.infoContainer,
                    borderRadius: BorderRadius.circular(
                        AppConstants.smallBorderRadius),
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(
                        Icons.lightbulb_rounded,
                        color: AppColors.info,
                        size: 20,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          '실패 원인을 분석하면 같은 상황에서 더 잘 대처할 수 있습니다',
                          style: AppTypography.caption.copyWith(
                            color: AppColors.grey800,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: AppConstants.defaultPadding),

                /// 1. 어떤 상황이었나요?
                Text(
                  '1. 어떤 상황이었나요?',
                  style: AppTypography.titleSmall,
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _situationController,
                  decoration: const InputDecoration(
                    hintText: '예: 회식 자리에서 술과 안주를 먹었다',
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 2,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return '상황을 입력해주세요';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: AppConstants.defaultPadding),

                /// 2. 왜 실패했나요?
                Text(
                  '2. 왜 실패했나요?',
                  style: AppTypography.titleSmall,
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _reasonController,
                  decoration: const InputDecoration(
                    hintText: '예: 분위기상 거절하기 어려웠다',
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 2,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return '실패 원인을 입력해주세요';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: AppConstants.defaultPadding),

                /// 3. 다음엔 어떻게 할까요?
                Text(
                  '3. 다음엔 어떻게 할까요?',
                  style: AppTypography.titleSmall,
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _solutionController,
                  decoration: const InputDecoration(
                    hintText: '예: 미리 저칼로리 식사를 하고 가겠다',
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 2,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return '대응 방안을 입력해주세요';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: AppConstants.defaultPadding),

                /// 커뮤니티 공유 체크박스
                Container(
                  decoration: BoxDecoration(
                    color: AppColors.grey100,
                    borderRadius: BorderRadius.circular(
                        AppConstants.smallBorderRadius),
                  ),
                  child: CheckboxListTile(
                    value: _shareWithCommunity,
                    onChanged: (value) {
                      setState(() {
                        _shareWithCommunity = value ?? false;
                      });
                    },
                    title: Text(
                      '커뮤니티에 공유하기',
                      style: AppTypography.bodyMedium,
                    ),
                    subtitle: Text(
                      '다른 사람들의 응원과 조언을 받을 수 있습니다',
                      style: AppTypography.caption.copyWith(
                        color: AppColors.grey600,
                      ),
                    ),
                    controlAffinity: ListTileControlAffinity.leading,
                  ),
                ),

                const SizedBox(height: AppConstants.largePadding),

                /// 저장 버튼
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: _saveReport,
                    icon: const Icon(Icons.save_rounded),
                    label: const Text('저장하기'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: AppColors.selfCompassion,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
