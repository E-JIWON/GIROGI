/// Mock 사용자 Repository
///
/// 개발 단계에서 사용하는 가짜 사용자 데이터 저장소입니다.
/// 메모리 내 Map으로 데이터를 관리하며, 앱 재시작 시 초기화됩니다.
///
/// TODO: 실제 인증 연동 시 다음으로 전환
/// - Firebase: lib/data/repositories/firebase_user_repository.dart
/// - Supabase: lib/data/repositories/supabase_user_repository.dart
library;

import 'package:diet_tracker_app/data/models/user.dart';
import 'package:diet_tracker_app/data/repositories/user_repository.dart';

/// Mock 사용자 Repository 구현체
///
/// 메모리 기반 임시 저장소로, 앱 재시작 시 데이터가 소실됩니다.
class MockUserRepository implements UserRepository {
  /// 메모리 내 데이터 저장소
  /// Key: 사용자 ID, Value: User
  final Map<String, User> _users = {};

  /// 현재 로그인한 사용자 ID
  /// TODO: Firebase Auth 연동 시 실제 UID로 대체
  String? _currentUserId;

  /// 생성자 - 샘플 데이터 초기화
  MockUserRepository() {
    _initializeSampleData();
  }

  /// 샘플 데이터 초기화
  ///
  /// 테스트용 사용자 데이터를 생성합니다.
  void _initializeSampleData() {
    final now = DateTime.now();

    // 현재 사용자 (나)
    final currentUser = User(
      id: 'user_current',
      nickname: '다이어터',
      bio: '복싱 다이어트 도전 중!',
      currentStreak: 5,
      totalSuccessDays: 23,
      totalTemptationResisted: 12,
      snackBoxCount: 3,
      followers: ['user_2', 'user_3'],
      following: ['user_1', 'user_2'],
      createdAt: now.subtract(const Duration(days: 30)),
    );
    _users[currentUser.id] = currentUser;
    _currentUserId = currentUser.id;

    // 친구 1
    _users['user_1'] = User(
      id: 'user_1',
      nickname: '운동왕',
      bio: '매일 복싱!',
      currentStreak: 7,
      totalSuccessDays: 35,
      totalTemptationResisted: 18,
      snackBoxCount: 5,
      followers: ['user_current', 'user_3'],
      following: ['user_2'],
      createdAt: now.subtract(const Duration(days: 60)),
    );

    // 친구 2
    _users['user_2'] = User(
      id: 'user_2',
      nickname: '건강한밥',
      bio: '집밥 최고',
      currentStreak: 3,
      totalSuccessDays: 18,
      totalTemptationResisted: 8,
      snackBoxCount: 2,
      followers: ['user_current', 'user_1'],
      following: ['user_current'],
      createdAt: now.subtract(const Duration(days: 45)),
    );

    // 친구 3
    _users['user_3'] = User(
      id: 'user_3',
      nickname: '다시시작',
      bio: '이번엔 진짜!',
      currentStreak: 1,
      totalSuccessDays: 8,
      totalTemptationResisted: 3,
      snackBoxCount: 1,
      followers: ['user_1'],
      following: ['user_current', 'user_2'],
      createdAt: now.subtract(const Duration(days: 15)),
    );
  }

  @override
  Future<String?> getCurrentUserId() async {
    // TODO: Firebase Auth 연동 시
    // return FirebaseAuth.instance.currentUser?.uid;

    return _currentUserId;
  }

  @override
  Future<User?> getUserById(String userId) async {
    // TODO: Firestore/Supabase 조회로 전환
    // return await _firestore.collection('users').doc(userId).get();

    return _users[userId];
  }

  @override
  Future<User?> getUserByNickname(String nickname) async {
    // TODO: Firestore/Supabase 쿼리로 전환
    // return await _firestore.collection('users')
    //   .where('nickname', isEqualTo: nickname).get();

    try {
      return _users.values.firstWhere((user) => user.nickname == nickname);
    } catch (e) {
      return null;
    }
  }

  @override
  Future<List<User>> getUsersByIds(List<String> userIds) async {
    // TODO: Firestore/Supabase 배치 조회로 전환
    // return await _firestore.collection('users')
    //   .where(FieldPath.documentId, whereIn: userIds).get();

    final users = <User>[];
    for (final id in userIds) {
      final user = _users[id];
      if (user != null) {
        users.add(user);
      }
    }
    return users;
  }

  @override
  Future<User> createUser(User user) async {
    // TODO: Firestore/Supabase 삽입으로 전환
    // await _firestore.collection('users').doc(user.id).set(user.toJson());

    _users[user.id] = user;
    return user;
  }

  @override
  Future<User> updateUser(User user) async {
    // TODO: Firestore/Supabase 업데이트로 전환
    // await _firestore.collection('users').doc(user.id).update(user.toJson());

    _users[user.id] = user;
    return user;
  }

  @override
  Future<void> deleteUser(String userId) async {
    // TODO: Firebase Auth + Firestore 삭제로 전환
    // await FirebaseAuth.instance.currentUser?.delete();
    // await _firestore.collection('users').doc(userId).delete();

    _users.remove(userId);
    if (_currentUserId == userId) {
      _currentUserId = null;
    }
  }

  @override
  Future<User> followUser(String userId) async {
    // TODO: Firestore/Supabase 트랜잭션으로 전환
    // 두 사용자의 팔로우 관계를 원자적으로 업데이트

    final currentId = await getCurrentUserId();
    if (currentId == null) {
      throw Exception('로그인이 필요합니다');
    }

    final currentUser = _users[currentId];
    final targetUser = _users[userId];

    if (currentUser == null || targetUser == null) {
      throw Exception('사용자를 찾을 수 없습니다');
    }

    // 나의 following 목록에 추가
    final updatedCurrentUser = currentUser.copyWith(
      following: [...currentUser.following, userId],
    );
    _users[currentId] = updatedCurrentUser;

    // 상대방의 followers 목록에 추가
    final updatedTargetUser = targetUser.copyWith(
      followers: [...targetUser.followers, currentId],
    );
    _users[userId] = updatedTargetUser;

    return updatedCurrentUser;
  }

  @override
  Future<User> unfollowUser(String userId) async {
    // TODO: Firestore/Supabase 트랜잭션으로 전환

    final currentId = await getCurrentUserId();
    if (currentId == null) {
      throw Exception('로그인이 필요합니다');
    }

    final currentUser = _users[currentId];
    final targetUser = _users[userId];

    if (currentUser == null || targetUser == null) {
      throw Exception('사용자를 찾을 수 없습니다');
    }

    // 나의 following 목록에서 제거
    final updatedCurrentUser = currentUser.copyWith(
      following: currentUser.following.where((id) => id != userId).toList(),
    );
    _users[currentId] = updatedCurrentUser;

    // 상대방의 followers 목록에서 제거
    final updatedTargetUser = targetUser.copyWith(
      followers: targetUser.followers.where((id) => id != currentId).toList(),
    );
    _users[userId] = updatedTargetUser;

    return updatedCurrentUser;
  }

  @override
  Future<List<User>> getFollowers(String userId) async {
    // TODO: Firestore/Supabase 쿼리로 전환

    final user = _users[userId];
    if (user == null) return [];

    return getUsersByIds(user.followers);
  }

  @override
  Future<List<User>> getFollowing(String userId) async {
    // TODO: Firestore/Supabase 쿼리로 전환

    final user = _users[userId];
    if (user == null) return [];

    return getUsersByIds(user.following);
  }

  @override
  Future<User> updateUserStats({
    required String userId,
    int? currentStreak,
    int? totalSuccessDays,
    int? totalTemptationResisted,
    int? snackBoxCount,
  }) async {
    // TODO: Firestore/Supabase 부분 업데이트로 전환
    // await _firestore.collection('users').doc(userId).update({...});

    final user = _users[userId];
    if (user == null) {
      throw Exception('사용자를 찾을 수 없습니다');
    }

    final updatedUser = user.copyWith(
      currentStreak: currentStreak ?? user.currentStreak,
      totalSuccessDays: totalSuccessDays ?? user.totalSuccessDays,
      totalTemptationResisted:
          totalTemptationResisted ?? user.totalTemptationResisted,
      snackBoxCount: snackBoxCount ?? user.snackBoxCount,
    );

    _users[userId] = updatedUser;
    return updatedUser;
  }
}
