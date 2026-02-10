/// 리액션 모델
///
/// 게시글, 댓글, 식사 기록 등에 남기는 감정 표현을 나타내는 데이터 모델입니다.
/// 총 6종의 리액션 타입을 지원합니다: ❤️ 🔥 💪 👏 🤗 😢
library;

import 'package:girogi/data/models/enums.dart';

/// 리액션 엔티티
///
/// 사용자가 콘텐츠에 남기는 감정 표현입니다.
/// 한 사용자는 하나의 콘텐츠에 하나의 리액션만 남길 수 있습니다.
class Reaction {
  /// 리액션을 남긴 사용자 ID
  /// User 모델의 ID를 참조합니다.
  final String userId;

  /// 리액션 타입 (heart, fire, muscle, clap, hug, sad)
  final ReactionType type;

  /// 리액션 생성 시각
  /// UTC 기준 timestamp
  final DateTime createdAt;

  /// 리액션 생성자
  ///
  /// [userId]: 리액션을 남긴 사용자 ID
  /// [type]: 리액션 타입
  /// [createdAt]: 생성 시각
  const Reaction({
    required this.userId,
    required this.type,
    required this.createdAt,
  });

  /// 객체 복사 메서드 (불변성 유지)
  Reaction copyWith({
    String? userId,
    ReactionType? type,
    DateTime? createdAt,
  }) {
    return Reaction(
      userId: userId ?? this.userId,
      type: type ?? this.type,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'type': type.name,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory Reaction.fromJson(Map<String, dynamic> json) {
    return Reaction(
      userId: json['userId'] as String,
      type: ReactionType.values.firstWhere(
        (e) => e.name == json['type'],
      ),
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Reaction &&
          runtimeType == other.runtimeType &&
          userId == other.userId;

  @override
  int get hashCode => userId.hashCode;

  @override
  String toString() {
    return 'Reaction(userId: $userId, type: $type, createdAt: $createdAt)';
  }
}

/// 리액션 집계 헬퍼 클래스
///
/// 특정 콘텐츠에 대한 리액션 통계를 계산하는 유틸리티입니다.
class ReactionCounts {
  /// 리액션 타입별 개수 맵
  /// Key: ReactionType, Value: 개수
  final Map<ReactionType, int> counts;

  /// 전체 리액션 개수
  final int total;

  /// 리액션 집계 생성자
  const ReactionCounts({
    required this.counts,
    required this.total,
  });

  /// 리액션 리스트로부터 집계 생성
  ///
  /// [reactions]: 집계할 리액션 리스트
  /// 반환: 타입별 개수를 포함한 ReactionCounts 객체
  factory ReactionCounts.fromList(List<Reaction> reactions) {
    final counts = <ReactionType, int>{};

    for (final reaction in reactions) {
      counts[reaction.type] = (counts[reaction.type] ?? 0) + 1;
    }

    return ReactionCounts(
      counts: counts,
      total: reactions.length,
    );
  }

  /// 특정 타입의 리액션 개수 반환
  ///
  /// [type]: 조회할 리액션 타입
  /// 반환: 해당 타입의 리액션 개수 (없으면 0)
  int getCount(ReactionType type) => counts[type] ?? 0;

  /// 가장 많은 리액션 타입 반환
  ///
  /// 반환: 가장 많이 받은 리액션 타입 (없으면 null)
  ReactionType? get mostCommon {
    if (counts.isEmpty) return null;

    return counts.entries
        .reduce((a, b) => a.value > b.value ? a : b)
        .key;
  }
}
