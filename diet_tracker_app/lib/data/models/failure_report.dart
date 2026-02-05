/// 실패 리포트 모델
///
/// Self-Compassion 이론을 적용한 실패 기록 모델입니다.
/// 실패를 기록하되 자책하지 않고, 커뮤니티의 응원을 받을 수 있습니다.
library;

import 'package:diet_tracker_app/data/models/comment.dart';
import 'package:diet_tracker_app/data/models/reaction.dart';

/// 실패 리포트 엔티티
///
/// 폭식 또는 다이어트 실패 시 생성되는 기록입니다.
/// 사라지는 기록(연속 일수, 치팅데이 진행도)과 메모를 포함합니다.
class FailureReport {
  /// 실패 리포트 고유 식별자
  final String id;

  /// 리포트 소유자 ID
  ///
  /// User 모델의 ID를 참조합니다.
  final String userId;

  /// 실패 일시
  ///
  /// 폭식 또는 실패가 발생한 정확한 시각
  final DateTime failedAt;

  /// 사라진 연속 성공 일수
  ///
  /// 실패 직전까지의 연속 성공 기록
  /// 예: 5일 → 0일
  final int lostStreak;

  /// 사라진 치팅데이 진행도
  ///
  /// 실패 직전까지의 치팅데이 진행도 (0~7일)
  /// 예: 5/7일 → 0/7일
  final int lostCheatDayProgress;

  /// 이번 주 성공률
  ///
  /// 실패한 주의 성공률 (0.0 ~ 1.0)
  /// 예: 5일 성공 / 7일 = 0.71
  final double weekSuccessRate;

  /// 메모 (선택 사항)
  ///
  /// 실패 원인이나 상황을 자유롭게 기록
  /// 예: "회식이 있었는데 참지 못하고 폭식했어요..."
  final String? memo;

  /// 첨부 이미지 URL (선택 사항)
  ///
  /// TODO: Firebase Storage 또는 Supabase Storage 연동
  final String? imageUrl;

  /// 커뮤니티 공개 여부
  ///
  /// true인 경우 다른 사용자의 피드에 표시되어 응원을 받을 수 있습니다.
  final bool isPublic;

  /// 리액션 리스트
  ///
  /// 실패 리포트에 대한 응원 리액션 (주로 🤗 포옹)
  final List<Reaction> reactions;

  /// 댓글 리스트
  ///
  /// 실패 리포트에 대한 응원 댓글
  final List<Comment> comments;

  /// 생성 일시
  final DateTime createdAt;

  /// 실패 리포트 생성자
  const FailureReport({
    required this.id,
    required this.userId,
    required this.failedAt,
    required this.lostStreak,
    required this.lostCheatDayProgress,
    required this.weekSuccessRate,
    this.memo,
    this.imageUrl,
    this.isPublic = false,
    this.reactions = const [],
    this.comments = const [],
    required this.createdAt,
  });

  /// 객체 복사 메서드 (불변성 유지)
  FailureReport copyWith({
    String? id,
    String? userId,
    DateTime? failedAt,
    int? lostStreak,
    int? lostCheatDayProgress,
    double? weekSuccessRate,
    String? memo,
    String? imageUrl,
    bool? isPublic,
    List<Reaction>? reactions,
    List<Comment>? comments,
    DateTime? createdAt,
  }) {
    return FailureReport(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      failedAt: failedAt ?? this.failedAt,
      lostStreak: lostStreak ?? this.lostStreak,
      lostCheatDayProgress:
          lostCheatDayProgress ?? this.lostCheatDayProgress,
      weekSuccessRate: weekSuccessRate ?? this.weekSuccessRate,
      memo: memo ?? this.memo,
      imageUrl: imageUrl ?? this.imageUrl,
      isPublic: isPublic ?? this.isPublic,
      reactions: reactions ?? this.reactions,
      comments: comments ?? this.comments,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  /// 리액션 집계 반환
  ReactionCounts get reactionCounts => ReactionCounts.fromList(reactions);

  /// 응원 리액션 개수
  ///
  /// 실패 리포트에 특화된 응원 리액션 (🤗 포옹, 💪 힘내요) 개수
  int get supportReactionCount {
    final supportTypes = [ReactionType.hug, ReactionType.muscle];
    return reactions
        .where((r) => supportTypes.contains(r.type))
        .length;
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'failedAt': failedAt.toIso8601String(),
      'lostStreak': lostStreak,
      'lostCheatDayProgress': lostCheatDayProgress,
      'weekSuccessRate': weekSuccessRate,
      'memo': memo,
      'imageUrl': imageUrl,
      'isPublic': isPublic,
      'reactions': reactions.map((r) => r.toJson()).toList(),
      'comments': comments.map((c) => c.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory FailureReport.fromJson(Map<String, dynamic> json) {
    return FailureReport(
      id: json['id'] as String,
      userId: json['userId'] as String,
      failedAt: DateTime.parse(json['failedAt'] as String),
      lostStreak: json['lostStreak'] as int,
      lostCheatDayProgress: json['lostCheatDayProgress'] as int,
      weekSuccessRate: (json['weekSuccessRate'] as num).toDouble(),
      memo: json['memo'] as String?,
      imageUrl: json['imageUrl'] as String?,
      isPublic: json['isPublic'] as bool? ?? false,
      reactions: (json['reactions'] as List<dynamic>?)
              ?.map((e) => Reaction.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      comments: (json['comments'] as List<dynamic>?)
              ?.map((e) => Comment.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is FailureReport &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'FailureReport(id: $id, userId: $userId, failedAt: $failedAt, lostStreak: $lostStreak, isPublic: $isPublic)';
  }
}

/// 자기 연민 메시지 제공
///
/// 실패 시 표시할 긍정적 메시지와 경고 메시지를 제공합니다.
class SelfCompassionMessages {
  /// 긍정적 자기 연민 메시지 리스트
  static const List<String> supportive = [
    '괜찮아, 누구나 그래',
    '오늘은 그랬지만, 지금부터 다시 시작하면 돼',
    '연속 기록은 리셋되지만, 너의 노력은 사라지지 않아',
    '실패는 과정이야. 포기만 안 하면 돼',
  ];

  /// 허가 효과 경고 메시지
  ///
  /// "내일부터 하자"는 Licensing Effect(허가 효과)를 유발하므로
  /// 즉각적인 재시작을 강조합니다.
  static const String licensingWarning = '''
⚠️ "내일부터 하자"는 허가 효과!
미래의 좋은 행동을 예약하고
지금 나쁜 행동을 정당화하는 거야.
"지금부터" 다시 시작하자!
''';
}
