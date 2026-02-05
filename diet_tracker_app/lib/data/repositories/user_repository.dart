/// 사용자 Repository
///
/// 사용자 프로필 데이터의 CRUD 작업을 추상화하는 인터페이스입니다.
/// 커뮤니티 기능을 위한 사용자 정보 관리를 담당합니다.
library;

import 'package:diet_tracker_app/data/models/user.dart';

/// 사용자 Repository 인터페이스
///
/// 데이터 소스(Mock/Firebase Auth/Supabase Auth)에 독립적인 추상 계층입니다.
abstract class UserRepository {
  /// 현재 로그인한 사용자 ID 조회
  ///
  /// 반환: 사용자 ID, 로그인하지 않은 경우 null
  /// TODO: Firebase Auth 또는 Supabase Auth 연동 시 실제 UID 반환
  Future<String?> getCurrentUserId();

  /// 사용자 ID로 프로필 조회
  ///
  /// [userId]: 조회할 사용자 ID
  /// 반환: User 객체, 없으면 null
  Future<User?> getUserById(String userId);

  /// 닉네임으로 사용자 검색
  ///
  /// [nickname]: 검색할 닉네임
  /// 반환: 일치하는 User 객체, 없으면 null
  Future<User?> getUserByNickname(String nickname);

  /// 여러 사용자 ID로 프로필 목록 조회
  ///
  /// [userIds]: 조회할 사용자 ID 목록
  /// 반환: User 객체 목록
  /// 팔로워/팔로잉 목록 표시에 사용됩니다.
  Future<List<User>> getUsersByIds(List<String> userIds);

  /// 사용자 프로필 생성
  ///
  /// [user]: 생성할 User 객체
  /// 반환: 생성된 User 객체
  /// TODO: Firebase Auth 회원가입 후 호출
  Future<User> createUser(User user);

  /// 사용자 프로필 수정
  ///
  /// [user]: 수정할 User 객체
  /// 반환: 수정된 User 객체
  Future<User> updateUser(User user);

  /// 사용자 삭제 (회원 탈퇴)
  ///
  /// [userId]: 삭제할 사용자 ID
  /// TODO: Firebase Auth 계정 삭제도 함께 처리
  Future<void> deleteUser(String userId);

  /// 팔로우 추가
  ///
  /// [userId]: 팔로우할 사용자 ID
  /// 반환: 업데이트된 User 객체
  Future<User> followUser(String userId);

  /// 언팔로우
  ///
  /// [userId]: 언팔로우할 사용자 ID
  /// 반환: 업데이트된 User 객체
  Future<User> unfollowUser(String userId);

  /// 팔로워 목록 조회
  ///
  /// [userId]: 대상 사용자 ID
  /// 반환: 팔로워 User 목록
  Future<List<User>> getFollowers(String userId);

  /// 팔로잉 목록 조회
  ///
  /// [userId]: 대상 사용자 ID
  /// 반환: 팔로잉 User 목록
  Future<List<User>> getFollowing(String userId);

  /// 사용자 통계 업데이트
  ///
  /// [userId]: 업데이트할 사용자 ID
  /// [currentStreak]: 현재 연속 성공 일수
  /// [totalSuccessDays]: 총 성공일
  /// [totalTemptationResisted]: 총 유혹 극복 횟수
  /// [snackBoxCount]: 과자박스 개수
  /// 반환: 업데이트된 User 객체
  Future<User> updateUserStats({
    required String userId,
    int? currentStreak,
    int? totalSuccessDays,
    int? totalTemptationResisted,
    int? snackBoxCount,
  });
}
