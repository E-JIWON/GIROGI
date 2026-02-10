/// 게시글 작성 다이얼로그 위젯
///
/// 새로운 게시글을 작성하는 다이얼로그입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/post.dart';

/// 게시글 작성 다이얼로그 위젯
///
/// 게시글 타입을 선택하고 내용을 작성합니다.
class PostComposerDialog extends StatefulWidget {
  const PostComposerDialog({super.key});

  /// 다이얼로그 표시
  static Future<void> show(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) => const PostComposerDialog(),
    );
  }

  @override
  State<PostComposerDialog> createState() => _PostComposerDialogState();
}

class _PostComposerDialogState extends State<PostComposerDialog> {
  /// 폼 키
  final _formKey = GlobalKey<FormState>();

  /// 내용 컨트롤러
  final _contentController = TextEditingController();

  /// 선택된 게시글 타입
  PostType selectedType = PostType.experience;

  @override
  void dispose() {
    _contentController.dispose();
    super.dispose();
  }

  /// 게시글 게시
  void _publishPost() {
    if (_formKey.currentState?.validate() ?? false) {
      // TODO: Repository에 게시글 저장
      Navigator.of(context).pop();

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('게시글이 등록되었습니다'),
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
                      Icons.edit_rounded,
                      color: AppColors.primary,
                      size: 28,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        '글쓰기',
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

                /// 게시글 타입 선택
                Text(
                  '게시글 타입',
                  style: AppTypography.titleSmall,
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  children: [
                    _buildTypeChip(
                      type: PostType.experience,
                      label: '경험 공유',
                      icon: Icons.lightbulb_rounded,
                    ),
                    _buildTypeChip(
                      type: PostType.motivation,
                      label: '동기부여',
                      icon: Icons.favorite_rounded,
                    ),
                    _buildTypeChip(
                      type: PostType.mealRecord,
                      label: '식사 기록',
                      icon: Icons.restaurant_rounded,
                    ),
                  ],
                ),

                const SizedBox(height: AppConstants.defaultPadding),

                /// 내용 입력
                Text(
                  '내용',
                  style: AppTypography.titleSmall,
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _contentController,
                  decoration: InputDecoration(
                    hintText: _getPlaceholder(),
                    border: const OutlineInputBorder(),
                  ),
                  maxLines: 5,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return '내용을 입력해주세요';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 12),

                /// 이미지 추가 버튼
                OutlinedButton.icon(
                  onPressed: () {
                    // TODO: 이미지 선택 기능
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('이미지 추가 기능 (TODO)')),
                    );
                  },
                  icon: const Icon(Icons.add_photo_alternate_rounded),
                  label: const Text('이미지 추가'),
                ),

                const SizedBox(height: AppConstants.largePadding),

                /// 게시 버튼
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: _publishPost,
                    icon: const Icon(Icons.send_rounded),
                    label: const Text('게시하기'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: AppColors.primary,
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

  /// 타입 칩 빌더
  Widget _buildTypeChip({
    required PostType type,
    required String label,
    required IconData icon,
  }) {
    final isSelected = selectedType == type;

    return FilterChip(
      selected: isSelected,
      label: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 16,
            color: isSelected ? Colors.white : AppColors.grey700,
          ),
          const SizedBox(width: 4),
          Text(label),
        ],
      ),
      onSelected: (selected) {
        if (selected) {
          setState(() {
            selectedType = type;
          });
        }
      },
      selectedColor: AppColors.primary,
      backgroundColor: AppColors.grey100,
      labelStyle: AppTypography.bodySmall.copyWith(
        color: isSelected ? Colors.white : AppColors.grey700,
      ),
    );
  }

  /// 게시글 타입별 플레이스홀더
  String _getPlaceholder() {
    switch (selectedType) {
      case PostType.experience:
        return '다이어트 경험을 공유해주세요\n예: 오늘은 외식 유혹을 이겨냈어요!';
      case PostType.motivation:
        return '동기부여가 되는 말을 남겨주세요\n예: 작은 성공이 모여 큰 변화를 만듭니다';
      case PostType.mealRecord:
        return '오늘의 식사를 기록해주세요\n예: 집밥으로 건강하게 먹었어요';
      default:
        return '내용을 입력해주세요';
    }
  }
}
