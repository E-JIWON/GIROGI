/// 커뮤니티 게시글 모델
///
/// 소셜 피드에 표시되는 게시글을 나타내는 데이터 모델입니다.
/// 텍스트, 이미지, 유튜브, 실패 리포트, 공유 기록 등 다양한 타입을 지원합니다.
library;

import 'package:diet_tracker_app/data/models/comment.dart';
import 'package:diet_tracker_app/data/models/enums.dart';
import 'package:diet_tracker_app/data/models/failure_report.dart';
import 'package:diet_tracker_app/data/models/reaction.dart';
import 'package:diet_tracker_app/data/models/shared_record.dart';

/// 커뮤니티 게시글 엔티티
///
/// 사용자가 커뮤니티 피드에 게시하는 콘텐츠를 나타냅니다.
/// 타입에 따라 다른 필드를 사용합니다.
class Post {
  /// 게시글 고유 식별자
  final String id;

  /// 작성자 ID
  ///
  /// User 모델의 ID를 참조합니다.
  final String authorId;

  /// 게시글 타입
  ///
  /// text, image, youtube, failureReport, sharedRecord 중 하나
  final PostType type;

  /// 텍스트 내용 (선택 사항)
  ///
  /// 모든 타입에서 추가 설명으로 사용 가능
  /// 최대 길이는 UI 레벨에서 제한
  final String? content;

  /// 이미지 URL (선택 사항)
  ///
  /// type이 image인 경우 필수
  /// TODO: Firebase Storage 또는 Supabase Storage 연동
  final String? imageUrl;

  /// 유튜브 URL (선택 사항)
  ///
  /// type이 youtube인 경우 필수
  /// 숏츠 뷰에서 재생 가능한 형식
  final String? youtubeUrl;

  /// 실패 리포트 (선택 사항)
  ///
  /// type이 failureReport인 경우 필수
  final FailureReport? failureReport;

  /// 공유된 기록 (선택 사항)
  ///
  /// type이 sharedRecord인 경우 필수
  final SharedRecord? sharedRecord;

  /// 리액션 리스트
  ///
  /// 게시글에 남겨진 모든 리액션
  final List<Reaction> reactions;

  /// 댓글 리스트
  ///
  /// 게시글에 남겨진 모든 댓글
  final List<Comment> comments;

  /// 게시 일시
  final DateTime createdAt;

  /// 게시글 생성자
  const Post({
    required this.id,
    required this.authorId,
    required this.type,
    this.content,
    this.imageUrl,
    this.youtubeUrl,
    this.failureReport,
    this.sharedRecord,
    this.reactions = const [],
    this.comments = const [],
    required this.createdAt,
  });

  /// 객체 복사 메서드 (불변성 유지)
  Post copyWith({
    String? id,
    String? authorId,
    PostType? type,
    String? content,
    String? imageUrl,
    String? youtubeUrl,
    FailureReport? failureReport,
    SharedRecord? sharedRecord,
    List<Reaction>? reactions,
    List<Comment>? comments,
    DateTime? createdAt,
  }) {
    return Post(
      id: id ?? this.id,
      authorId: authorId ?? this.authorId,
      type: type ?? this.type,
      content: content ?? this.content,
      imageUrl: imageUrl ?? this.imageUrl,
      youtubeUrl: youtubeUrl ?? this.youtubeUrl,
      failureReport: failureReport ?? this.failureReport,
      sharedRecord: sharedRecord ?? this.sharedRecord,
      reactions: reactions ?? this.reactions,
      comments: comments ?? this.comments,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  /// 리액션 집계 반환
  ReactionCounts get reactionCounts => ReactionCounts.fromList(reactions);

  /// 유효성 검사
  ///
  /// 게시글 타입에 따라 필수 필드가 채워져 있는지 확인합니다.
  /// 반환: 유효하면 true
  bool get isValid {
    switch (type) {
      case PostType.text:
        return content != null && content!.isNotEmpty;
      case PostType.image:
        return imageUrl != null && imageUrl!.isNotEmpty;
      case PostType.youtube:
        return youtubeUrl != null && youtubeUrl!.isNotEmpty;
      case PostType.failureReport:
        return failureReport != null;
      case PostType.sharedRecord:
        return sharedRecord != null;
    }
  }

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'authorId': authorId,
      'type': type.name,
      'content': content,
      'imageUrl': imageUrl,
      'youtubeUrl': youtubeUrl,
      'failureReport': failureReport?.toJson(),
      'sharedRecord': sharedRecord?.toJson(),
      'reactions': reactions.map((r) => r.toJson()).toList(),
      'comments': comments.map((c) => c.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] as String,
      authorId: json['authorId'] as String,
      type: PostType.values.firstWhere(
        (e) => e.name == json['type'],
      ),
      content: json['content'] as String?,
      imageUrl: json['imageUrl'] as String?,
      youtubeUrl: json['youtubeUrl'] as String?,
      failureReport: json['failureReport'] != null
          ? FailureReport.fromJson(
              json['failureReport'] as Map<String, dynamic>)
          : null,
      sharedRecord: json['sharedRecord'] != null
          ? SharedRecord.fromJson(
              json['sharedRecord'] as Map<String, dynamic>)
          : null,
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
      other is Post && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'Post(id: $id, authorId: $authorId, type: $type, createdAt: $createdAt)';
  }
}

/// 게시글 생성 헬퍼 클래스
///
/// 타입별 게시글 생성을 간편하게 하는 팩토리 메서드 제공
class PostFactory {
  /// 텍스트 게시글 생성
  static Post createTextPost({
    required String id,
    required String authorId,
    required String content,
    DateTime? createdAt,
  }) {
    return Post(
      id: id,
      authorId: authorId,
      type: PostType.text,
      content: content,
      createdAt: createdAt ?? DateTime.now(),
    );
  }

  /// 이미지 게시글 생성
  static Post createImagePost({
    required String id,
    required String authorId,
    required String imageUrl,
    String? content,
    DateTime? createdAt,
  }) {
    return Post(
      id: id,
      authorId: authorId,
      type: PostType.image,
      imageUrl: imageUrl,
      content: content,
      createdAt: createdAt ?? DateTime.now(),
    );
  }

  /// 유튜브 게시글 생성
  static Post createYoutubePost({
    required String id,
    required String authorId,
    required String youtubeUrl,
    String? content,
    DateTime? createdAt,
  }) {
    return Post(
      id: id,
      authorId: authorId,
      type: PostType.youtube,
      youtubeUrl: youtubeUrl,
      content: content,
      createdAt: createdAt ?? DateTime.now(),
    );
  }

  /// 실패 리포트 게시글 생성
  static Post createFailureReportPost({
    required String id,
    required String authorId,
    required FailureReport failureReport,
    String? content,
    DateTime? createdAt,
  }) {
    return Post(
      id: id,
      authorId: authorId,
      type: PostType.failureReport,
      failureReport: failureReport,
      content: content,
      createdAt: createdAt ?? DateTime.now(),
    );
  }

  /// 공유 기록 게시글 생성
  static Post createSharedRecordPost({
    required String id,
    required String authorId,
    required SharedRecord sharedRecord,
    String? content,
    DateTime? createdAt,
  }) {
    return Post(
      id: id,
      authorId: authorId,
      type: PostType.sharedRecord,
      sharedRecord: sharedRecord,
      content: content,
      createdAt: createdAt ?? DateTime.now(),
    );
  }
}
