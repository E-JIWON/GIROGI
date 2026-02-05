/// 사용자 목표 모델
///
/// Episodic Future Thinking (EFT) 이론을 적용한 "되고 싶은 나" 목록을 저장합니다.
/// 유혹을 느낄 때 미래의 긍정적 자아를 시각화하여 충동을 억제합니다.
library;

/// 사용자 목표 엔티티
///
/// 사용자가 설정한 미래 자아 비전 리스트를 저장합니다.
class UserGoals {
  /// 미래 비전 리스트
  ///
  /// 예: ["링 위에서 멋있는 나", "10km 가볍게 뛰는 나", "사이즈 걱정없이 쇼핑하는 나"]
  /// 유혹 극복 화면에서 표시됩니다.
  final List<String> futureVisions;

  /// 사용자 목표 생성자
  ///
  /// [futureVisions]: 미래 비전 리스트 (기본값: 기본 비전 3개)
  const UserGoals({
    this.futureVisions = const [],
  });

  /// 기본 미래 비전 제공
  ///
  /// 앱 초기 설치 시 제공되는 기본 목표입니다.
  /// 사용자가 수정 가능합니다.
  factory UserGoals.withDefaults() {
    return const UserGoals(
      futureVisions: [
        '🥊 링 위에서 멋있는 나',
        '🏃 10km를 가볍게 뛰는 나',
        '👕 사이즈 걱정없이 쇼핑하는 나',
      ],
    );
  }

  /// 객체 복사 메서드 (불변성 유지)
  UserGoals copyWith({
    List<String>? futureVisions,
  }) {
    return UserGoals(
      futureVisions: futureVisions ?? this.futureVisions,
    );
  }

  /// 비전 추가
  ///
  /// [vision]: 추가할 미래 비전 텍스트
  /// 반환: 비전이 추가된 새 UserGoals
  UserGoals addVision(String vision) {
    return copyWith(futureVisions: [...futureVisions, vision]);
  }

  /// 비전 제거
  ///
  /// [index]: 제거할 비전의 인덱스
  /// 반환: 비전이 제거된 새 UserGoals
  UserGoals removeVision(int index) {
    final newVisions = List<String>.from(futureVisions);
    newVisions.removeAt(index);
    return copyWith(futureVisions: newVisions);
  }

  /// 비전 수정
  ///
  /// [index]: 수정할 비전의 인덱스
  /// [newVision]: 새 비전 텍스트
  /// 반환: 비전이 수정된 새 UserGoals
  UserGoals updateVision(int index, String newVision) {
    final newVisions = List<String>.from(futureVisions);
    newVisions[index] = newVision;
    return copyWith(futureVisions: newVisions);
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'futureVisions': futureVisions,
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory UserGoals.fromJson(Map<String, dynamic> json) {
    return UserGoals(
      futureVisions: (json['futureVisions'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
    );
  }

  @override
  String toString() {
    return 'UserGoals(futureVisions: $futureVisions)';
  }
}
