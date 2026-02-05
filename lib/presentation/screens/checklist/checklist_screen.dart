/// 체크리스트 화면
///
/// 시간대별 행동 체크리스트와 식사 기록을 관리하는 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/enums.dart';
import 'package:girogi/presentation/widgets/checklist/checklist_time_section.dart';
import 'package:girogi/presentation/widgets/checklist/meal_record_button.dart';

/// 체크리스트 화면 위젯
///
/// Implementation Intention 이론을 적용한 구조화된 체크리스트를 제공합니다.
/// 주요 기능:
/// - 시간대별 체크리스트 (아침/점심/퇴근/저녁/운동)
/// - 식사 기록 (사진, 장소, 메뉴, 준수 행동)
/// - 주간 외식 빈도 모니터링 및 경고
///
/// TODO: Mock Repository 데이터 연동
class ChecklistScreen extends StatefulWidget {
  const ChecklistScreen({super.key});

  @override
  State<ChecklistScreen> createState() => _ChecklistScreenState();
}

class _ChecklistScreenState extends State<ChecklistScreen> {
  /// TODO: Repository에서 데이터 가져오기
  /// 현재는 하드코딩된 샘플 데이터 사용

  /// 아침 체크리스트
  List<Map<String, dynamic>> breakfastChecklist = [
    {'title': '물 한 잔 마시기', 'isChecked': true},
    {'title': '체중 측정하기', 'isChecked': true},
    {'title': '아침 식사 준비', 'isChecked': false},
  ];

  /// 점심 체크리스트
  List<Map<String, dynamic>> lunchChecklist = [
    {'title': '식사 전 물 한 잔', 'isChecked': true},
    {'title': '천천히 먹기 (20분 이상)', 'isChecked': false},
    {'title': '30회 이상 씹기', 'isChecked': false},
  ];

  /// 저녁 체크리스트
  List<Map<String, dynamic>> dinnerChecklist = [
    {'title': '8시 전 식사 완료', 'isChecked': false},
    {'title': '과식하지 않기', 'isChecked': false},
    {'title': '후식 거부하기', 'isChecked': false},
  ];

  /// 운동 체크리스트
  List<Map<String, dynamic>> exerciseChecklist = [
    {'title': '30분 이상 운동', 'isChecked': false},
    {'title': '스트레칭 10분', 'isChecked': false},
  ];

  /// 식사 기록 상태
  Map<String, bool> mealRecords = {
    '아침': true,
    '점심': false,
    '저녁': false,
  };

  /// 주간 외식 횟수
  /// TODO: Repository에서 실제 데이터 가져오기
  int weeklyDiningOutCount = 2;

  /// 체크리스트 토글 핸들러
  void _toggleChecklistItem(List<Map<String, dynamic>> list, int index) {
    setState(() {
      list[index]['isChecked'] = !list[index]['isChecked'];
    });
  }

  /// 식사 기록 화면으로 이동
  void _goToMealRecord(String mealLabel) {
    // TODO: 식사 기록 상세 화면으로 이동
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$mealLabel 기록 화면으로 이동'),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      /// AppBar
      appBar: AppBar(
        title: const Text('체크리스트'),
        actions: [
          /// 캘린더 버튼 (히스토리 보기)
          /// TODO: 캘린더 화면 연결
          IconButton(
            icon: const Icon(Icons.calendar_month_outlined),
            onPressed: () {
              // TODO: 캘린더 화면으로 이동
            },
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
              /// 외식 경고 (주간 3회 이상 시 표시)
              if (weeklyDiningOutCount >= AppConstants.weeklyDiningOutWarningThreshold)
                _buildDiningOutWarning(),

              if (weeklyDiningOutCount >= AppConstants.weeklyDiningOutWarningThreshold)
                const SizedBox(height: AppConstants.defaultPadding),

              /// 1. 아침 섹션
              ChecklistTimeSection(
                mealTime: MealTime.breakfast,
                items: breakfastChecklist,
                onToggle: (index) =>
                    _toggleChecklistItem(breakfastChecklist, index),
              ),

              const SizedBox(height: 12),

              /// 아침 식사 기록 버튼
              MealRecordButton(
                mealLabel: '아침',
                hasRecord: mealRecords['아침'] ?? false,
                onTap: () => _goToMealRecord('아침'),
              ),

              const SizedBox(height: AppConstants.defaultPadding),

              /// 2. 점심 섹션
              ChecklistTimeSection(
                mealTime: MealTime.lunch,
                items: lunchChecklist,
                onToggle: (index) =>
                    _toggleChecklistItem(lunchChecklist, index),
              ),

              const SizedBox(height: 12),

              /// 점심 식사 기록 버튼
              MealRecordButton(
                mealLabel: '점심',
                hasRecord: mealRecords['점심'] ?? false,
                onTap: () => _goToMealRecord('점심'),
              ),

              const SizedBox(height: AppConstants.defaultPadding),

              /// 3. 저녁 섹션
              ChecklistTimeSection(
                mealTime: MealTime.dinner,
                items: dinnerChecklist,
                onToggle: (index) =>
                    _toggleChecklistItem(dinnerChecklist, index),
              ),

              const SizedBox(height: 12),

              /// 저녁 식사 기록 버튼
              MealRecordButton(
                mealLabel: '저녁',
                hasRecord: mealRecords['저녁'] ?? false,
                onTap: () => _goToMealRecord('저녁'),
              ),

              const SizedBox(height: AppConstants.defaultPadding),

              /// 4. 운동 섹션
              ChecklistTimeSection(
                mealTime: MealTime.breakfast, // TODO: 운동 enum 추가 필요
                items: exerciseChecklist,
                onToggle: (index) =>
                    _toggleChecklistItem(exerciseChecklist, index),
              ),

              const SizedBox(height: AppConstants.defaultPadding),
            ],
          ),
        ),
      ),
    );
  }

  /// 외식 경고 위젯
  Widget _buildDiningOutWarning() {
    return Container(
      padding: const EdgeInsets.all(AppConstants.defaultPadding),
      decoration: BoxDecoration(
        color: AppColors.warningContainer,
        borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        border: Border.all(
          color: AppColors.warning,
          width: 2,
        ),
      ),
      child: Row(
        children: [
          /// 경고 아이콘
          Icon(
            Icons.warning_rounded,
            color: AppColors.warning,
            size: 32,
          ),

          const SizedBox(width: 12),

          /// 경고 메시지
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '외식 빈도 주의',
                  style: AppTypography.titleSmall.copyWith(
                    color: AppColors.warning,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '이번 주 외식 $weeklyDiningOutCount회\n집밥 위주로 식사하는 것을 권장합니다',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.textSecondaryLight,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
