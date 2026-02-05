/// 일일 기록 모델
///
/// 하루 동안의 모든 활동을 기록하는 데이터 모델입니다.
/// 체크리스트, 식사, 운동, 유혹 극복 등을 포함합니다.
library;

import 'package:diet_tracker_app/data/models/enums.dart';
import 'package:diet_tracker_app/data/models/meal_record.dart';

/// 일일 기록 엔티티
///
/// 특정 날짜의 모든 행동 기록을 저장합니다.
/// 성공/실패 판정, 연속 기록 계산 등에 사용됩니다.
class DailyRecord {
  /// 일일 기록 고유 식별자
  final String id;

  /// 기록 날짜
  final DateTime date;

  /// 체크리스트 항목별 완료 여부
  ///
  /// Key: 체크리스트 항목 ID
  /// Value: 완료 여부 (true/false)
  /// 예: {'afterwork_fruit': true, 'dinner_small_bowl': false, ...}
  final Map<String, bool> checklist;

  /// 식사 기록 리스트
  ///
  /// 해당 날짜의 모든 식사 기록 (아침/점심/저녁/간식)
  final List<MealRecord> meals;

  /// 운동 타입
  ///
  /// 복싱 또는 스쿼트 중 선택 (둘 중 하나만 기록 가능)
  /// null인 경우 운동을 하지 않은 날
  final ExerciseType? exercise;

  /// 하루 성공 여부
  ///
  /// 핵심 미션 3개 중 2개 이상 완료 시 true
  /// 핵심 미션: 퇴근 전 바나나, 작은 그릇 사용, 복싱/스쿼트
  final bool isSuccessDay;

  /// 폭식 여부
  ///
  /// true인 경우 연속 기록 (streak)이 리셋됩니다.
  /// 자기 연민 모드에서 실패 리포트를 생성합니다.
  final bool hadBinge;

  /// 유혹 극복 횟수
  ///
  /// 해당 날짜에 유혹 극복 모드를 사용한 횟수
  /// 10분 타이머를 완료할 때마다 +1
  final int temptationResisted;

  /// 일일 기록 생성자
  const DailyRecord({
    required this.id,
    required this.date,
    this.checklist = const {},
    this.meals = const [],
    this.exercise,
    this.isSuccessDay = false,
    this.hadBinge = false,
    this.temptationResisted = 0,
  });

  /// 객체 복사 메서드 (불변성 유지)
  DailyRecord copyWith({
    String? id,
    DateTime? date,
    Map<String, bool>? checklist,
    List<MealRecord>? meals,
    ExerciseType? exercise,
    bool? isSuccessDay,
    bool? hadBinge,
    int? temptationResisted,
  }) {
    return DailyRecord(
      id: id ?? this.id,
      date: date ?? this.date,
      checklist: checklist ?? this.checklist,
      meals: meals ?? this.meals,
      exercise: exercise ?? this.exercise,
      isSuccessDay: isSuccessDay ?? this.isSuccessDay,
      hadBinge: hadBinge ?? this.hadBinge,
      temptationResisted: temptationResisted ?? this.temptationResisted,
    );
  }

  /// 체크리스트 완료율 계산
  ///
  /// 반환: 0.0 ~ 1.0 사이의 완료율
  double get checklistCompletionRate {
    if (checklist.isEmpty) return 0.0;
    final completed = checklist.values.where((v) => v).length;
    return completed / checklist.length;
  }

  /// 외식 횟수 계산
  ///
  /// 해당 날짜의 식사 중 외식 또는 배달의 횟수를 반환합니다.
  /// 주간 외식 횟수 제한 (2회) 체크에 사용됩니다.
  int get eatingOutCount {
    return meals.where((meal) => meal.isEatingOut).length;
  }

  /// 핵심 미션 완료 개수
  ///
  /// 핵심 미션 3개 중 몇 개를 완료했는지 반환합니다.
  /// 2개 이상이면 성공한 날로 간주됩니다.
  int get coreMissionCompletedCount {
    // TODO: ChecklistItem에서 isCoreMission인 항목들의 완료 여부 확인
    // 현재는 체크리스트 ID를 기준으로 하드코딩
    final coreMissionIds = [
      'afterwork_fruit', // 퇴근 전 바나나
      'dinner_small_bowl', // 작은 그릇 사용
      'exercise_boxing', // 복싱 (택1)
      'exercise_squat', // 스쿼트 (택1)
    ];

    int count = 0;
    for (final id in coreMissionIds) {
      if (checklist[id] == true) {
        count++;
        // 운동은 둘 중 하나만 카운트
        if (id == 'exercise_boxing' || id == 'exercise_squat') {
          break;
        }
      }
    }
    return count;
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'date': date.toIso8601String(),
      'checklist': checklist,
      'meals': meals.map((m) => m.toJson()).toList(),
      'exercise': exercise?.name,
      'isSuccessDay': isSuccessDay,
      'hadBinge': hadBinge,
      'temptationResisted': temptationResisted,
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory DailyRecord.fromJson(Map<String, dynamic> json) {
    return DailyRecord(
      id: json['id'] as String,
      date: DateTime.parse(json['date'] as String),
      checklist: (json['checklist'] as Map<String, dynamic>?)?.map(
            (k, v) => MapEntry(k, v as bool),
          ) ??
          {},
      meals: (json['meals'] as List<dynamic>?)
              ?.map((e) => MealRecord.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      exercise: json['exercise'] != null
          ? ExerciseType.values.firstWhere(
              (e) => e.name == json['exercise'],
            )
          : null,
      isSuccessDay: json['isSuccessDay'] as bool? ?? false,
      hadBinge: json['hadBinge'] as bool? ?? false,
      temptationResisted: json['temptationResisted'] as int? ?? 0,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is DailyRecord &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'DailyRecord(id: $id, date: $date, isSuccessDay: $isSuccessDay, hadBinge: $hadBinge, temptationResisted: $temptationResisted)';
  }
}
