/// 댓글 모델
///
/// 커뮤니티 게시글 또는 식사 기록에 남기는 댓글을 표현하는 데이터 모델입니다.
/// 소셜 기능의 일부로 사용자 간 상호 지원을 촉진합니다.
library;

/// 댓글 엔티티
///
/// 게시글, 식사 기록, 실패 리포트 등에 남길 수 있는 댓글입니다.
class Comment {
  /// 댓글 고유 식별자
  final String id;

  /// 댓글 작성자 ID
  /// User 모델의 ID를 참조합니다.
  final String authorId;

  /// 댓글 내용
  /// 최대 길이 제한은 UI 레벨에서 처리합니다.
  final String content;

  /// 댓글 작성 시각
  /// UTC 기준 timestamp
  final DateTime createdAt;

  /// 댓글 생성자
  ///
  /// [id]: 고유 식별자
  /// [authorId]: 작성자 ID
  /// [content]: 댓글 내용
  /// [createdAt]: 작성 시각
  const Comment({
    required this.id,
    required this.authorId,
    required this.content,
    required this.createdAt,
  });

  /// 객체 복사 메서드 (불변성 유지)
  Comment copyWith({
    String? id,
    String? authorId,
    String? content,
    DateTime? createdAt,
  }) {
    return Comment(
      id: id ?? this.id,
      authorId: authorId ?? this.authorId,
      content: content ?? this.content,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  /// TODO: Firestore/Supabase 연동 시 Timestamp 변환 처리 필요
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'authorId': authorId,
      'content': content,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      id: json['id'] as String,
      authorId: json['authorId'] as String,
      content: json['content'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Comment && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'Comment(id: $id, authorId: $authorId, content: $content, createdAt: $createdAt)';
  }
}
