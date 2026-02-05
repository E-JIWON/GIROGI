/// 사용자 통계 모델
///
/// 비교 리포트에 사용되는 사용자별 상세 통계 데이터를 저장합니다.
/// 듀오링고 스타일 친구 비교 기능에서 활용됩니다.
library;

import 'package:diet_tracker_app/data/models/weight_record.dart';

/// 사용자 통계 엔티티
///
/// 개인 또는 친구와의 비교를 위한 통계 정보를 제공합니다.
class UserStats {
  /// 사용자 ID
  ///
  /// User 모델의 ID를 참조합니다.
  final String userId;

  /// 현재 연속 성공 일수
  ///
  /// 핵심 미션을 연속으로 달성한 일수
  final int currentStreak;

  /// 최장 연속 기록
  ///
  /// 지금까지의 최고 연속 성공 기록
  final int longestStreak;

  /// 총 성공 일수
  ///
  /// 앱 사용 기간 동안 성공한 날의 총 합계
  final int totalSuccessDays;

  /// 총 유혹 극복 횟수
  ///
  /// 10분 타이머를 완료한 총 횟수
  final int totalTemptationResisted;

  /// 과자박스 적립 수
  ///
  /// 현재 보유한 과자박스 개수
  final int snackBoxCount;

  /// 주간 달성률 리스트
  ///
  /// 최근 N주간의 주간 달성률 (0.0 ~ 1.0)
  /// 비교 그래프 생성에 사용됩니다.
  /// 예: [0.85, 0.71, 0.90, 0.78] (최근 4주)
  final List<double> weeklyProgress;

  /// 체중 히스토리
  ///
  /// 체중 변화 추이 그래프 생성에 사용됩니다.
  /// 시작 체중 대비 변화량을 계산합니다.
  final List<WeightRecord> weightHistory;

  /// 사용자 통계 생성자
  const UserStats({
    required this.userId,
    this.currentStreak = 0,
    this.longestStreak = 0,
    this.totalSuccessDays = 0,
    this.totalTemptationResisted = 0,
    this.snackBoxCount = 0,
    this.weeklyProgress = const [],
    this.weightHistory = const [],
  });

  /// 객체 복사 메서드 (불변성 유지)
  UserStats copyWith({
    String? userId,
    int? currentStreak,
    int? longestStreak,
    int? totalSuccessDays,
    int? totalTemptationResisted,
    int? snackBoxCount,
    List<double>? weeklyProgress,
    List<WeightRecord>? weightHistory,
  }) {
    return UserStats(
      userId: userId ?? this.userId,
      currentStreak: currentStreak ?? this.currentStreak,
      longestStreak: longestStreak ?? this.longestStreak,
      totalSuccessDays: totalSuccessDays ?? this.totalSuccessDays,
      totalTemptationResisted:
          totalTemptationResisted ?? this.totalTemptationResisted,
      snackBoxCount: snackBoxCount ?? this.snackBoxCount,
      weeklyProgress: weeklyProgress ?? this.weeklyProgress,
      weightHistory: weightHistory ?? this.weightHistory,
    );
  }

  /// 평균 주간 달성률
  ///
  /// 반환: 0.0 ~ 1.0 사이의 평균값
  double get averageWeeklyProgress {
    if (weeklyProgress.isEmpty) return 0.0;
    final sum = weeklyProgress.reduce((a, b) => a + b);
    return sum / weeklyProgress.length;
  }

  /// 시작 체중
  ///
  /// 체중 히스토리의 첫 번째 기록
  /// 반환: 시작 체중 (kg), 기록이 없으면 null
  double? get startingWeight {
    if (weightHistory.isEmpty) return null;
    return weightHistory.first.weight;
  }

  /// 현재 체중
  ///
  /// 체중 히스토리의 가장 최근 기록
  /// 반환: 현재 체중 (kg), 기록이 없으면 null
  double? get currentWeight {
    if (weightHistory.isEmpty) return null;
    return weightHistory.last.weight;
  }

  /// 체중 변화량
  ///
  /// 시작 체중 대비 현재 체중의 변화량
  /// 반환: 변화량 (kg), 음수면 감량, 양수면 증가
  /// 기록이 부족하면 null
  double? get weightChange {
    if (startingWeight == null || currentWeight == null) return null;
    return currentWeight! - startingWeight!;
  }

  /// 체중 변화율
  ///
  /// 시작 체중 대비 변화율 (%)
  /// 반환: 변화율, 기록이 부족하면 null
  double? get weightChangeRate {
    if (startingWeight == null || weightChange == null) return null;
    return (weightChange! / startingWeight!) * 100;
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'currentStreak': currentStreak,
      'longestStreak': longestStreak,
      'totalSuccessDays': totalSuccessDays,
      'totalTemptationResisted': totalTemptationResisted,
      'snackBoxCount': snackBoxCount,
      'weeklyProgress': weeklyProgress,
      'weightHistory': weightHistory.map((w) => w.toJson()).toList(),
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory UserStats.fromJson(Map<String, dynamic> json) {
    return UserStats(
      userId: json['userId'] as String,
      currentStreak: json['currentStreak'] as int? ?? 0,
      longestStreak: json['longestStreak'] as int? ?? 0,
      totalSuccessDays: json['totalSuccessDays'] as int? ?? 0,
      totalTemptationResisted: json['totalTemptationResisted'] as int? ?? 0,
      snackBoxCount: json['snackBoxCount'] as int? ?? 0,
      weeklyProgress: (json['weeklyProgress'] as List<dynamic>?)
              ?.map((e) => (e as num).toDouble())
              .toList() ??
          [],
      weightHistory: (json['weightHistory'] as List<dynamic>?)
              ?.map((e) => WeightRecord.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is UserStats &&
          runtimeType == other.runtimeType &&
          userId == other.userId;

  @override
  int get hashCode => userId.hashCode;

  @override
  String toString() {
    return 'UserStats(userId: $userId, currentStreak: $currentStreak, totalSuccessDays: $totalSuccessDays)';
  }
}

/// 사용자 비교 헬퍼 클래스
///
/// 두 사용자의 통계를 비교하는 유틸리티
class UserStatsComparison {
  /// 비교 대상 1
  final UserStats userA;

  /// 비교 대상 2
  final UserStats userB;

  /// 비교 생성자
  const UserStatsComparison({
    required this.userA,
    required this.userB,
  });

  /// 연속 성공 일수 차이
  ///
  /// 반환: A - B (양수면 A가 앞섬)
  int get streakDifference => userA.currentStreak - userB.currentStreak;

  /// 유혹 극복 횟수 차이
  int get temptationDifference =>
      userA.totalTemptationResisted - userB.totalTemptationResisted;

  /// 과자박스 개수 차이
  int get snackBoxDifference => userA.snackBoxCount - userB.snackBoxCount;

  /// 평균 주간 달성률 차이
  ///
  /// 반환: A - B (양수면 A가 높음)
  double get averageProgressDifference =>
      userA.averageWeeklyProgress - userB.averageWeeklyProgress;

  /// 체중 변화량 차이
  ///
  /// 반환: A - B (감량이 더 많으면 음수)
  double? get weightChangeDifference {
    if (userA.weightChange == null || userB.weightChange == null) {
      return null;
    }
    return userA.weightChange! - userB.weightChange!;
  }

  /// 승자 판정
  ///
  /// 연속 성공 일수를 기준으로 승자를 결정합니다.
  /// 반환: 승자의 userId, 동점이면 null
  String? get winner {
    if (streakDifference > 0) return userA.userId;
    if (streakDifference < 0) return userB.userId;
    return null;
  }
}
