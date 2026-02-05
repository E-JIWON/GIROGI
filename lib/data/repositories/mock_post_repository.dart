/// Mock 게시글 Repository
///
/// 개발 단계에서 사용하는 가짜 게시글 데이터 저장소입니다.
///
/// TODO: 실제 DB 연동 시 다음으로 전환
/// - Firebase: lib/data/repositories/firebase_post_repository.dart
/// - Supabase: lib/data/repositories/supabase_post_repository.dart
library;

import 'package:girogi/data/models/comment.dart';
import 'package:girogi/data/models/enums.dart';
import 'package:girogi/data/models/failure_report.dart';
import 'package:girogi/data/models/post.dart';
import 'package:girogi/data/models/reaction.dart';
import 'package:girogi/data/repositories/post_repository.dart';

/// Mock 게시글 Repository 구현체
class MockPostRepository implements PostRepository {
  /// 메모리 내 데이터 저장소
  final Map<String, Post> _posts = {};

  /// 생성자 - 샘플 데이터 초기화
  MockPostRepository() {
    _initializeSampleData();
  }

  /// 샘플 데이터 초기화
  void _initializeSampleData() {
    final now = DateTime.now();

    // 텍스트 게시글
    _posts['post_1'] = PostFactory.createTextPost(
      id: 'post_1',
      authorId: 'user_1',
      content: '오늘 드디어 5일 연속 성공! 🎉',
      createdAt: now.subtract(const Duration(hours: 2)),
    );

    // 이미지 게시글
    _posts['post_2'] = PostFactory.createImagePost(
      id: 'post_2',
      authorId: 'user_2',
      imageUrl: 'https://example.com/meal.jpg',
      content: '오늘의 건강한 저녁 식사',
      createdAt: now.subtract(const Duration(hours: 5)),
    );

    // 유튜브 게시글
    _posts['post_3'] = PostFactory.createYoutubePost(
      id: 'post_3',
      authorId: 'user_1',
      youtubeUrl: 'https://www.youtube.com/watch?v=example',
      content: '이 영상 보면 운동 욕구 뿜뿜',
      createdAt: now.subtract(const Duration(hours: 8)),
    );

    // 실패 리포트 게시글
    _posts['post_4'] = PostFactory.createFailureReportPost(
      id: 'post_4',
      authorId: 'user_3',
      failureReport: FailureReport(
        id: 'report_1',
        userId: 'user_3',
        failedAt: now.subtract(const Duration(days: 1)),
        lostStreak: 7,
        lostCheatDayProgress: 5,
        weekSuccessRate: 0.71,
        memo: '회식이 있었는데 참지 못하고 폭식했어요...',
        isPublic: true,
        createdAt: now.subtract(const Duration(hours: 12)),
      ),
      createdAt: now.subtract(const Duration(hours: 12)),
    );

    // 리액션과 댓글 추가
    _posts['post_1'] = _posts['post_1']!.copyWith(
      reactions: [
        Reaction(
          userId: 'user_2',
          type: ReactionType.fire,
          createdAt: now.subtract(const Duration(hours: 1)),
        ),
        Reaction(
          userId: 'user_3',
          type: ReactionType.clap,
          createdAt: now.subtract(const Duration(minutes: 30)),
        ),
      ],
      comments: [
        Comment(
          id: 'comment_1',
          authorId: 'user_2',
          content: '대단해요! 저도 힘내야겠어요!',
          createdAt: now.subtract(const Duration(minutes: 45)),
        ),
      ],
    );
  }

  @override
  Future<Post?> getPostById(String postId) async {
    // TODO: Firestore/Supabase 조회로 전환
    return _posts[postId];
  }

  @override
  Future<List<Post>> getFeed({
    bool followingOnly = false,
    int limit = 20,
    String? lastPostId,
  }) async {
    // TODO: Firestore/Supabase 쿼리로 전환
    // 페이지네이션, 정렬, 필터링 적용

    var posts = _posts.values.toList();

    // 최신순 정렬
    posts.sort((a, b) => b.createdAt.compareTo(a.createdAt));

    // 제한 적용
    if (posts.length > limit) {
      posts = posts.sublist(0, limit);
    }

    return posts;
  }

  @override
  Future<List<Post>> getPostsByUser(String userId, {int limit = 20}) async {
    // TODO: Firestore/Supabase 쿼리로 전환

    var posts = _posts.values
        .where((post) => post.authorId == userId)
        .toList();

    posts.sort((a, b) => b.createdAt.compareTo(a.createdAt));

    if (posts.length > limit) {
      posts = posts.sublist(0, limit);
    }

    return posts;
  }

  @override
  Future<List<Post>> getYoutubePosts({int limit = 20}) async {
    // TODO: Firestore/Supabase 쿼리로 전환

    var posts = _posts.values
        .where((post) => post.type == PostType.youtube)
        .toList();

    posts.sort((a, b) => b.createdAt.compareTo(a.createdAt));

    if (posts.length > limit) {
      posts = posts.sublist(0, limit);
    }

    return posts;
  }

  @override
  Future<Post> createPost(Post post) async {
    // TODO: Firestore/Supabase 삽입으로 전환
    _posts[post.id] = post;
    return post;
  }

  @override
  Future<Post> updatePost(Post post) async {
    // TODO: Firestore/Supabase 업데이트로 전환
    _posts[post.id] = post;
    return post;
  }

  @override
  Future<void> deletePost(String postId) async {
    // TODO: Firestore/Supabase 삭제로 전환
    _posts.remove(postId);
  }

  @override
  Future<Post> addReaction(String postId, Reaction reaction) async {
    // TODO: Firestore/Supabase 트랜잭션으로 전환

    final post = _posts[postId];
    if (post == null) throw Exception('게시글을 찾을 수 없습니다');

    // 기존 리액션 제거 (한 사용자당 하나만)
    final reactions = post.reactions
        .where((r) => r.userId != reaction.userId)
        .toList();

    // 새 리액션 추가
    reactions.add(reaction);

    final updatedPost = post.copyWith(reactions: reactions);
    _posts[postId] = updatedPost;

    return updatedPost;
  }

  @override
  Future<Post> removeReaction(String postId, String userId) async {
    // TODO: Firestore/Supabase 트랜잭션으로 전환

    final post = _posts[postId];
    if (post == null) throw Exception('게시글을 찾을 수 없습니다');

    final reactions =
        post.reactions.where((r) => r.userId != userId).toList();

    final updatedPost = post.copyWith(reactions: reactions);
    _posts[postId] = updatedPost;

    return updatedPost;
  }

  @override
  Future<Post> addComment(String postId, Comment comment) async {
    // TODO: Firestore/Supabase 트랜잭션으로 전환

    final post = _posts[postId];
    if (post == null) throw Exception('게시글을 찾을 수 없습니다');

    final comments = [...post.comments, comment];

    final updatedPost = post.copyWith(comments: comments);
    _posts[postId] = updatedPost;

    return updatedPost;
  }

  @override
  Future<Post> deleteComment(String postId, String commentId) async {
    // TODO: Firestore/Supabase 트랜잭션으로 전환

    final post = _posts[postId];
    if (post == null) throw Exception('게시글을 찾을 수 없습니다');

    final comments = post.comments.where((c) => c.id != commentId).toList();

    final updatedPost = post.copyWith(comments: comments);
    _posts[postId] = updatedPost;

    return updatedPost;
  }
}
