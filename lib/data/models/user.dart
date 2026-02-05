/// 사용자 프로필 모델
///
/// 커뮤니티 기능을 위한 사용자 정보를 저장하는 데이터 모델입니다.
/// 프로필, 통계, 팔로우 관계 등을 포함합니다.
library;

/// 사용자 엔티티
///
/// 앱 사용자의 기본 정보와 공개 통계를 저장합니다.
class User {
  /// 사용자 고유 식별자
  ///
  /// TODO: Firebase Auth 또는 Supabase Auth의 UID 사용
  final String id;

  /// 닉네임
  ///
  /// 커뮤니티에서 표시되는 사용자 이름
  /// 중복 불가, 3~20자 제한 (UI 레벨에서 처리)
  final String nickname;

  /// 프로필 이미지 URL (선택 사항)
  ///
  /// TODO: Firebase Storage 또는 Supabase Storage 연동
  /// null인 경우 기본 아바타 표시
  final String? profileImage;

  /// 한 줄 소개 (선택 사항)
  ///
  /// 프로필 상단에 표시되는 짧은 소개 문구
  /// 최대 100자 (UI 레벨에서 제한)
  final String? bio;

  /// 현재 연속 성공 일수
  ///
  /// 핵심 미션을 연속으로 달성한 일수
  /// 실패 시 0으로 리셋
  final int currentStreak;

  /// 총 성공일
  ///
  /// 앱 사용 기간 동안 성공한 날의 총 합계
  /// 실패해도 누적값은 유지
  final int totalSuccessDays;

  /// 총 유혹 극복 횟수
  ///
  /// 10분 타이머를 완료한 총 횟수
  /// 프로필에 "유혹 마스터" 뱃지 표시 기준
  final int totalTemptationResisted;

  /// 과자박스 적립 수
  ///
  /// 현재 보유한 과자박스 개수
  final int snackBoxCount;

  /// 팔로워 ID 리스트
  ///
  /// 나를 팔로우하는 사용자들의 ID
  /// TODO: Firestore/Supabase에서 별도 컬렉션으로 관리 권장
  final List<String> followers;

  /// 팔로잉 ID 리스트
  ///
  /// 내가 팔로우하는 사용자들의 ID
  /// TODO: Firestore/Supabase에서 별도 컬렉션으로 관리 권장
  final List<String> following;

  /// 계정 생성 일시
  final DateTime createdAt;

  /// 사용자 생성자
  const User({
    required this.id,
    required this.nickname,
    this.profileImage,
    this.bio,
    this.currentStreak = 0,
    this.totalSuccessDays = 0,
    this.totalTemptationResisted = 0,
    this.snackBoxCount = 0,
    this.followers = const [],
    this.following = const [],
    required this.createdAt,
  });

  /// 객체 복사 메서드 (불변성 유지)
  User copyWith({
    String? id,
    String? nickname,
    String? profileImage,
    String? bio,
    int? currentStreak,
    int? totalSuccessDays,
    int? totalTemptationResisted,
    int? snackBoxCount,
    List<String>? followers,
    List<String>? following,
    DateTime? createdAt,
  }) {
    return User(
      id: id ?? this.id,
      nickname: nickname ?? this.nickname,
      profileImage: profileImage ?? this.profileImage,
      bio: bio ?? this.bio,
      currentStreak: currentStreak ?? this.currentStreak,
      totalSuccessDays: totalSuccessDays ?? this.totalSuccessDays,
      totalTemptationResisted:
          totalTemptationResisted ?? this.totalTemptationResisted,
      snackBoxCount: snackBoxCount ?? this.snackBoxCount,
      followers: followers ?? this.followers,
      following: following ?? this.following,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  /// 팔로워 수
  int get followerCount => followers.length;

  /// 팔로잉 수
  int get followingCount => following.length;

  /// 특정 사용자를 팔로우 중인지 확인
  ///
  /// [userId]: 확인할 사용자 ID
  /// 반환: 팔로우 중이면 true
  bool isFollowing(String userId) => following.contains(userId);

  /// 특정 사용자가 나를 팔로우 중인지 확인
  ///
  /// [userId]: 확인할 사용자 ID
  /// 반환: 팔로워이면 true
  bool isFollowedBy(String userId) => followers.contains(userId);

  /// JSON 직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nickname': nickname,
      'profileImage': profileImage,
      'bio': bio,
      'currentStreak': currentStreak,
      'totalSuccessDays': totalSuccessDays,
      'totalTemptationResisted': totalTemptationResisted,
      'snackBoxCount': snackBoxCount,
      'followers': followers,
      'following': following,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  /// JSON 역직렬화 메서드
  ///
  /// TODO: json_serializable 패키지 적용 시 자동 생성으로 전환
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      nickname: json['nickname'] as String,
      profileImage: json['profileImage'] as String?,
      bio: json['bio'] as String?,
      currentStreak: json['currentStreak'] as int? ?? 0,
      totalSuccessDays: json['totalSuccessDays'] as int? ?? 0,
      totalTemptationResisted: json['totalTemptationResisted'] as int? ?? 0,
      snackBoxCount: json['snackBoxCount'] as int? ?? 0,
      followers: (json['followers'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      following: (json['following'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is User && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'User(id: $id, nickname: $nickname, currentStreak: $currentStreak, totalSuccessDays: $totalSuccessDays)';
  }
}
