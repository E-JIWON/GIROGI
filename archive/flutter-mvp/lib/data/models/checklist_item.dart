/// 체크리스트 항목 모델
///
/// Implementation Intention (실행 의도) 이론을 적용한 "When-Where-What" 구조의
/// 행동 체크리스트를 표현하는 데이터 모델입니다.
library;

import 'package:girogi/data/models/enums.dart';

/// 체크리스트 개별 항목
///
/// 사용자가 완료해야 할 단일 행동 단위를 표현합니다.
/// Tiny Habits 방법론에 따라 최소 행동 단위로 설계되었습니다.
class ChecklistItem {
  /// 고유 식별자
  final String id;

  /// 체크리스트 항목 제목
  /// 예: "10:30 물 500ml", "샐러드 두 젓가락 먹기"
  final String title;

  /// 시간대 슬롯 (아침/점심/퇴근/저녁/운동)
  /// 시간대별 그룹화를 위해 사용됩니다.
  final TimeSlot timeSlot;

  /// 핵심 미션 여부
  ///
  /// 핵심 미션 3개 중 2개 이상 완료 시 하루 성공으로 간주됩니다.
  /// - 퇴근 전 바나나 먹기
  /// - 작은 그릇 사용
  /// - 복싱 or 스쿼트 1개
  final bool isCoreMission;

  /// 체크리스트 항목 생성자
  ///
  /// [id]: 고유 식별자
  /// [title]: 항목 제목
  /// [timeSlot]: 시간대 분류
  /// [isCoreMission]: 핵심 미션 여부 (기본값: false)
  const ChecklistItem({
    required this.id,
    required this.title,
    required this.timeSlot,
    this.isCoreMission = false,
  });

  /// 객체 복사 메서드 (불변성 유지)
  ///
  /// 특정 필드만 변경한 새 인스턴스를 생성합니다.
  ChecklistItem copyWith({
    String? id,
    String? title,
    TimeSlot? timeSlot,
    bool? isCoreMission,
  }) {
    return ChecklistItem(
      id: id ?? this.id,
      title: title ?? this.title,
      timeSlot: timeSlot ?? this.timeSlot,
      isCoreMission: isCoreMission ?? this.isCoreMission,
    );
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'timeSlot': timeSlot.name,
      'isCoreMission': isCoreMission,
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory ChecklistItem.fromJson(Map<String, dynamic> json) {
    return ChecklistItem(
      id: json['id'] as String,
      title: json['title'] as String,
      timeSlot: TimeSlot.values.firstWhere(
        (e) => e.name == json['timeSlot'],
      ),
      isCoreMission: json['isCoreMission'] as bool? ?? false,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ChecklistItem &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'ChecklistItem(id: $id, title: $title, timeSlot: $timeSlot, isCoreMission: $isCoreMission)';
  }
}

/// 기본 체크리스트 항목 제공
///
/// 앱 초기 설치 시 제공되는 기본 체크리스트 템플릿입니다.
class DefaultChecklistItems {
  /// 기본 체크리스트 항목 리스트 반환
  static List<ChecklistItem> get items => [
        // 아침
        const ChecklistItem(
          id: 'morning_water',
          title: '10:30 물 500ml',
          timeSlot: TimeSlot.morning,
        ),

        // 점심
        const ChecklistItem(
          id: 'lunch_salad',
          title: '샐러드 두 젓가락 먹기',
          timeSlot: TimeSlot.lunch,
        ),
        const ChecklistItem(
          id: 'lunch_chew',
          title: '천천히 씹기 (20번 이상)',
          timeSlot: TimeSlot.lunch,
        ),

        // 퇴근 (핵심 미션)
        const ChecklistItem(
          id: 'afterwork_fruit',
          title: '바나나 or 사과 먹기',
          timeSlot: TimeSlot.afterWork,
          isCoreMission: true,
        ),

        // 저녁 (핵심 미션)
        const ChecklistItem(
          id: 'dinner_small_bowl',
          title: '작은 그릇 사용',
          timeSlot: TimeSlot.dinner,
          isCoreMission: true,
        ),
        const ChecklistItem(
          id: 'dinner_no_tv',
          title: 'TV 없이 먹기',
          timeSlot: TimeSlot.dinner,
        ),
        const ChecklistItem(
          id: 'dinner_chew',
          title: '천천히 씹기',
          timeSlot: TimeSlot.dinner,
        ),

        // 운동 (핵심 미션 - 택1)
        const ChecklistItem(
          id: 'exercise_boxing',
          title: '복싱',
          timeSlot: TimeSlot.exercise,
          isCoreMission: true,
        ),
        const ChecklistItem(
          id: 'exercise_squat',
          title: '스쿼트 1개',
          timeSlot: TimeSlot.exercise,
          isCoreMission: true,
        ),
      ];
}
