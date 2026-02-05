/// 체중 기록 모델
///
/// 사용자의 체중 변화를 추적하는 데이터 모델입니다.
/// 비교 그래프에서 친구와 체중 변화를 비교할 때 사용됩니다.
library;

/// 체중 기록 엔티티
///
/// 특정 날짜의 체중 측정 기록을 나타냅니다.
class WeightRecord {
  /// 체중 기록 고유 식별자
  final String id;

  /// 측정 날짜
  final DateTime date;

  /// 체중 (kg 단위)
  /// 소수점 한 자리까지 저장 (예: 72.5kg)
  final double weight;

  /// 체중 기록 생성자
  ///
  /// [id]: 고유 식별자
  /// [date]: 측정 날짜
  /// [weight]: 체중 (kg)
  const WeightRecord({
    required this.id,
    required this.date,
    required this.weight,
  });

  /// 객체 복사 메서드 (불변성 유지)
  WeightRecord copyWith({
    String? id,
    DateTime? date,
    double? weight,
  }) {
    return WeightRecord(
      id: id ?? this.id,
      date: date ?? this.date,
      weight: weight ?? this.weight,
    );
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'date': date.toIso8601String(),
      'weight': weight,
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory WeightRecord.fromJson(Map<String, dynamic> json) {
    return WeightRecord(
      id: json['id'] as String,
      date: DateTime.parse(json['date'] as String),
      weight: (json['weight'] as num).toDouble(),
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is WeightRecord &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'WeightRecord(id: $id, date: $date, weight: ${weight}kg)';
  }
}
