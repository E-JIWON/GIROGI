/// 공유된 기록 모델
///
/// 커뮤니티에 공유 가능한 개인 기록을 나타내는 데이터 모델입니다.
/// 체크리스트, 식사 기록, 주간 현황 등을 게시글로 공유할 수 있습니다.
library;

import 'package:diet_tracker_app/data/models/enums.dart';

/// 공유된 기록 엔티티
///
/// 게시글에 첨부된 개인 기록 스냅샷입니다.
/// 실제 데이터는 data 필드에 Map 형태로 저장됩니다.
class SharedRecord {
  /// 공유 기록 타입 (checklist, meal, weekStatus)
  final SharedRecordType type;

  /// 기록 날짜
  ///
  /// 어느 날짜의 기록인지를 나타냅니다.
  final DateTime recordDate;

  /// 실제 기록 데이터
  ///
  /// 타입에 따라 다른 구조를 가집니다:
  /// - checklist: {'items': [...], 'completionRate': 0.85}
  /// - meal: {'mealTime': 'dinner', 'place': 'home', 'menu': '...', ...}
  /// - weekStatus: {'successDays': 5, 'totalDays': 7, 'rate': 0.71, ...}
  ///
  /// TODO: 타입별 전용 클래스로 분리 고려 (타입 안정성 향상)
  final Map<String, dynamic> data;

  /// 공유된 기록 생성자
  const SharedRecord({
    required this.type,
    required this.recordDate,
    required this.data,
  });

  /// 객체 복사 메서드 (불변성 유지)
  SharedRecord copyWith({
    SharedRecordType? type,
    DateTime? recordDate,
    Map<String, dynamic>? data,
  }) {
    return SharedRecord(
      type: type ?? this.type,
      recordDate: recordDate ?? this.recordDate,
      data: data ?? this.data,
    );
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'type': type.name,
      'recordDate': recordDate.toIso8601String(),
      'data': data,
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory SharedRecord.fromJson(Map<String, dynamic> json) {
    return SharedRecord(
      type: SharedRecordType.values.firstWhere(
        (e) => e.name == json['type'],
      ),
      recordDate: DateTime.parse(json['recordDate'] as String),
      data: json['data'] as Map<String, dynamic>,
    );
  }

  @override
  String toString() {
    return 'SharedRecord(type: $type, recordDate: $recordDate, data: $data)';
  }
}

/// 공유 기록 헬퍼 클래스
///
/// 타입별 데이터 생성 및 파싱을 위한 유틸리티
class SharedRecordHelper {
  /// 체크리스트 공유 데이터 생성
  ///
  /// [checklist]: 체크리스트 항목별 완료 여부
  /// [completionRate]: 완료율 (0.0 ~ 1.0)
  static Map<String, dynamic> createChecklistData(
    Map<String, bool> checklist,
    double completionRate,
  ) {
    return {
      'checklist': checklist,
      'completionRate': completionRate,
    };
  }

  /// 주간 현황 공유 데이터 생성
  ///
  /// [successDays]: 이번 주 성공한 날 수
  /// [totalDays]: 이번 주 경과 일수
  static Map<String, dynamic> createWeekStatusData(
    int successDays,
    int totalDays,
  ) {
    return {
      'successDays': successDays,
      'totalDays': totalDays,
      'rate': totalDays > 0 ? successDays / totalDays : 0.0,
    };
  }
}
