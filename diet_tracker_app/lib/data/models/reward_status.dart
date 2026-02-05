/// 보상 시스템 상태 모델
///
/// Temptation Bundling 이론을 적용한 보상 시스템의 현재 상태를 나타냅니다.
/// 과자박스 적립, 연속 성공 일수, 치팅데이 정보를 포함합니다.
library;

/// 보상 시스템 상태 엔티티
///
/// 사용자의 현재 보상 상태를 추적합니다.
/// - 과자박스: 복싱 다녀온 날 +1 적립, 3일 이상 연속 식단 지키면 사용 가능
/// - 치팅데이: 7일 연속 식단 지키면 획득, 치팅데이 사용 시에도 streak 유지
class RewardStatus {
  /// 과자박스 현재 적립 개수
  /// 복싱 운동을 완료한 날마다 1개씩 적립됩니다.
  final int snackBoxCount;

  /// 연속 식단 준수 일수
  ///
  /// 핵심 미션 3개 중 2개 이상 완료한 날을 카운트합니다.
  /// 3일 이상 달성 시 과자박스 1개 사용 가능합니다.
  final int consecutiveDietDays;

  /// 마지막 치팅데이 사용 날짜
  ///
  /// 7일 연속 성공 시 치팅데이 1회 획득합니다.
  /// null인 경우 아직 치팅데이를 사용한 적이 없습니다.
  final DateTime? lastCheatDay;

  /// 치팅데이까지 남은 일수
  ///
  /// 7일 연속 성공을 위해 앞으로 며칠이 남았는지 계산합니다.
  /// 0일이 되면 치팅데이를 사용할 수 있습니다.
  int get daysUntilCheatDay {
    if (consecutiveDietDays >= 7) return 0;
    return 7 - consecutiveDietDays;
  }

  /// 치팅데이 사용 가능 여부
  bool get canUseCheatDay => consecutiveDietDays >= 7;

  /// 과자박스 사용 가능 여부
  ///
  /// 3일 이상 연속 성공하고 적립된 과자박스가 있어야 사용 가능합니다.
  bool get canUseSnackBox =>
      snackBoxCount > 0 && consecutiveDietDays >= 3;

  /// 보상 상태 생성자
  ///
  /// [snackBoxCount]: 과자박스 적립 개수 (기본값: 0)
  /// [consecutiveDietDays]: 연속 성공 일수 (기본값: 0)
  /// [lastCheatDay]: 마지막 치팅데이 사용 날짜 (기본값: null)
  const RewardStatus({
    this.snackBoxCount = 0,
    this.consecutiveDietDays = 0,
    this.lastCheatDay,
  });

  /// 객체 복사 메서드 (불변성 유지)
  RewardStatus copyWith({
    int? snackBoxCount,
    int? consecutiveDietDays,
    DateTime? lastCheatDay,
  }) {
    return RewardStatus(
      snackBoxCount: snackBoxCount ?? this.snackBoxCount,
      consecutiveDietDays: consecutiveDietDays ?? this.consecutiveDietDays,
      lastCheatDay: lastCheatDay ?? this.lastCheatDay,
    );
  }

  /// 과자박스 적립 (복싱 완료 시)
  ///
  /// 반환: 과자박스가 1개 증가한 새 RewardStatus
  RewardStatus addSnackBox() {
    return copyWith(snackBoxCount: snackBoxCount + 1);
  }

  /// 과자박스 사용
  ///
  /// 사용 가능 여부를 확인한 후 호출해야 합니다.
  /// 반환: 과자박스가 1개 감소한 새 RewardStatus
  RewardStatus useSnackBox() {
    if (!canUseSnackBox) {
      throw StateError('과자박스를 사용할 수 없습니다.');
    }
    return copyWith(snackBoxCount: snackBoxCount - 1);
  }

  /// 연속 일수 증가 (성공한 날)
  ///
  /// 반환: 연속 일수가 1 증가한 새 RewardStatus
  RewardStatus incrementDays() {
    return copyWith(consecutiveDietDays: consecutiveDietDays + 1);
  }

  /// 연속 일수 리셋 (실패한 날)
  ///
  /// 반환: 연속 일수가 0으로 초기화된 새 RewardStatus
  RewardStatus resetDays() {
    return copyWith(consecutiveDietDays: 0);
  }

  /// 치팅데이 사용
  ///
  /// 반환: 치팅데이 날짜가 기록되고 연속 일수가 0으로 초기화된 새 RewardStatus
  RewardStatus useCheatDay(DateTime date) {
    if (!canUseCheatDay) {
      throw StateError('치팅데이를 사용할 수 없습니다.');
    }
    return RewardStatus(
      snackBoxCount: snackBoxCount,
      consecutiveDietDays: 0,
      lastCheatDay: date,
    );
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'snackBoxCount': snackBoxCount,
      'consecutiveDietDays': consecutiveDietDays,
      'lastCheatDay': lastCheatDay?.toIso8601String(),
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory RewardStatus.fromJson(Map<String, dynamic> json) {
    return RewardStatus(
      snackBoxCount: json['snackBoxCount'] as int? ?? 0,
      consecutiveDietDays: json['consecutiveDietDays'] as int? ?? 0,
      lastCheatDay: json['lastCheatDay'] != null
          ? DateTime.parse(json['lastCheatDay'] as String)
          : null,
    );
  }

  @override
  String toString() {
    return 'RewardStatus(snackBoxCount: $snackBoxCount, consecutiveDietDays: $consecutiveDietDays, lastCheatDay: $lastCheatDay)';
  }
}
