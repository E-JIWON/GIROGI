/// 식사 기록 모델
///
/// 사용자의 식사 기록을 저장하는 데이터 모델입니다.
/// 장소, 메뉴, 사진, 준수 행동, 소셜 피드백 등을 포함합니다.
library;

import 'package:diet_tracker_app/data/models/comment.dart';
import 'package:diet_tracker_app/data/models/enums.dart';
import 'package:diet_tracker_app/data/models/reaction.dart';

/// 식사 기록 엔티티
///
/// 개별 식사에 대한 상세 정보를 기록합니다.
/// Slow Eating Research를 적용하여 저작 횟수 등을 추적합니다.
class MealRecord {
  /// 식사 기록 고유 식별자
  final String id;

  /// 식사 시간대 (아침/점심/저녁/간식)
  final MealTime mealTime;

  /// 식사 장소 (집밥/구내식당/외식/배달)
  /// 외식 빈도 추적에 사용됩니다.
  final MealPlace place;

  /// 메뉴 (자유 입력)
  /// 예: "제육볶음, 밥, 된장찌개"
  final String menu;

  /// 식사 사진 URL (선택 사항)
  ///
  /// TODO: Firebase Storage 또는 Supabase Storage 연동 시
  /// 이미지 업로드 후 URL 저장
  final String? imageUrl;

  /// 준수한 행동 리스트
  ///
  /// 예: ["천천히 씹기", "작은 그릇 사용", "TV 없이 먹기", "단백질 먼저 먹기"]
  /// 체크박스로 다중 선택 가능
  final List<String> achievements;

  /// 식사 등록 시각
  final DateTime createdAt;

  /// 리액션 리스트
  /// 커뮤니티에 공개된 경우 다른 사용자가 남긴 리액션
  final List<Reaction> reactions;

  /// 댓글 리스트
  /// 커뮤니티에 공개된 경우 다른 사용자가 남긴 댓글
  final List<Comment> comments;

  /// 커뮤니티 공개 여부
  /// true인 경우 다른 사용자의 피드에 표시됩니다.
  final bool isPublic;

  /// 식사 기록 생성자
  const MealRecord({
    required this.id,
    required this.mealTime,
    required this.place,
    required this.menu,
    this.imageUrl,
    this.achievements = const [],
    required this.createdAt,
    this.reactions = const [],
    this.comments = const [],
    this.isPublic = false,
  });

  /// 객체 복사 메서드 (불변성 유지)
  MealRecord copyWith({
    String? id,
    MealTime? mealTime,
    MealPlace? place,
    String? menu,
    String? imageUrl,
    List<String>? achievements,
    DateTime? createdAt,
    List<Reaction>? reactions,
    List<Comment>? comments,
    bool? isPublic,
  }) {
    return MealRecord(
      id: id ?? this.id,
      mealTime: mealTime ?? this.mealTime,
      place: place ?? this.place,
      menu: menu ?? this.menu,
      imageUrl: imageUrl ?? this.imageUrl,
      achievements: achievements ?? this.achievements,
      createdAt: createdAt ?? this.createdAt,
      reactions: reactions ?? this.reactions,
      comments: comments ?? this.comments,
      isPublic: isPublic ?? this.isPublic,
    );
  }

  /// 외식 여부 판단
  ///
  /// 주간 외식 횟수 제한 (2회)을 체크하기 위해 사용됩니다.
  /// 반환: 외식 또는 배달인 경우 true
  bool get isEatingOut =>
      place == MealPlace.restaurant || place == MealPlace.delivery;

  /// 리액션 집계 반환
  ReactionCounts get reactionCounts => ReactionCounts.fromList(reactions);

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'mealTime': mealTime.name,
      'place': place.name,
      'menu': menu,
      'imageUrl': imageUrl,
      'achievements': achievements,
      'createdAt': createdAt.toIso8601String(),
      'reactions': reactions.map((r) => r.toJson()).toList(),
      'comments': comments.map((c) => c.toJson()).toList(),
      'isPublic': isPublic,
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory MealRecord.fromJson(Map<String, dynamic> json) {
    return MealRecord(
      id: json['id'] as String,
      mealTime: MealTime.values.firstWhere(
        (e) => e.name == json['mealTime'],
      ),
      place: MealPlace.values.firstWhere(
        (e) => e.name == json['place'],
      ),
      menu: json['menu'] as String,
      imageUrl: json['imageUrl'] as String?,
      achievements: (json['achievements'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      createdAt: DateTime.parse(json['createdAt'] as String),
      reactions: (json['reactions'] as List<dynamic>?)
              ?.map((e) => Reaction.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      comments: (json['comments'] as List<dynamic>?)
              ?.map((e) => Comment.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      isPublic: json['isPublic'] as bool? ?? false,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is MealRecord &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'MealRecord(id: $id, mealTime: $mealTime, place: $place, menu: $menu, achievements: ${achievements.length}, isPublic: $isPublic)';
  }
}

/// 기본 준수 행동 옵션
///
/// 식사 추가 모달에서 선택 가능한 행동 리스트입니다.
class DefaultAchievements {
  /// 선택 가능한 준수 행동 리스트
  static const List<String> options = [
    '천천히 씹기',
    '작은 그릇 사용',
    'TV 없이 먹기',
    '단백질 먼저 먹기',
  ];
}
