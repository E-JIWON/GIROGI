/// 게시글 Repository
///
/// 커뮤니티 게시글 데이터의 CRUD 작업을 추상화하는 인터페이스입니다.
/// 소셜 피드, 리액션, 댓글 기능을 지원합니다.
library;

import 'package:girogi/data/models/comment.dart';
import 'package:girogi/data/models/enums.dart';
import 'package:girogi/data/models/post.dart';
import 'package:girogi/data/models/reaction.dart';

/// 게시글 Repository 인터페이스
///
/// 데이터 소스(Mock/Firebase/Supabase)에 독립적인 추상 계층입니다.
abstract class PostRepository {
  /// 게시글 ID로 조회
  ///
  /// [postId]: 조회할 게시글 ID
  /// 반환: Post 객체, 없으면 null
  Future<Post?> getPostById(String postId);

  /// 피드 조회 (전체/팔로잉)
  ///
  /// [followingOnly]: true면 팔로잉한 사용자의 게시글만
  /// [limit]: 조회할 개수
  /// [lastPostId]: 페이지네이션을 위한 마지막 게시글 ID
  /// 반환: Post 목록
  Future<List<Post>> getFeed({
    bool followingOnly = false,
    int limit = 20,
    String? lastPostId,
  });

  /// 특정 사용자의 게시글 조회
  ///
  /// [userId]: 조회할 사용자 ID
  /// [limit]: 조회할 개수
  /// 반환: Post 목록
  Future<List<Post>> getPostsByUser(String userId, {int limit = 20});

  /// 유튜브 영상 게시글만 조회 (숏츠 뷰용)
  ///
  /// [limit]: 조회할 개수
  /// 반환: 유튜브 타입 Post 목록
  Future<List<Post>> getYoutubePosts({int limit = 20});

  /// 게시글 생성
  ///
  /// [post]: 생성할 Post 객체
  /// 반환: 생성된 Post 객체
  Future<Post> createPost(Post post);

  /// 게시글 수정
  ///
  /// [post]: 수정할 Post 객체
  /// 반환: 수정된 Post 객체
  Future<Post> updatePost(Post post);

  /// 게시글 삭제
  ///
  /// [postId]: 삭제할 게시글 ID
  Future<void> deletePost(String postId);

  /// 리액션 추가/변경
  ///
  /// [postId]: 게시글 ID
  /// [reaction]: 추가할 Reaction 객체
  /// 반환: 업데이트된 Post 객체
  ///
  /// 한 사용자는 하나의 리액션만 남길 수 있으며,
  /// 이미 리액션이 있으면 교체됩니다.
  Future<Post> addReaction(String postId, Reaction reaction);

  /// 리액션 제거
  ///
  /// [postId]: 게시글 ID
  /// [userId]: 리액션을 제거할 사용자 ID
  /// 반환: 업데이트된 Post 객체
  Future<Post> removeReaction(String postId, String userId);

  /// 댓글 추가
  ///
  /// [postId]: 게시글 ID
  /// [comment]: 추가할 Comment 객체
  /// 반환: 업데이트된 Post 객체
  Future<Post> addComment(String postId, Comment comment);

  /// 댓글 삭제
  ///
  /// [postId]: 게시글 ID
  /// [commentId]: 삭제할 댓글 ID
  /// 반환: 업데이트된 Post 객체
  Future<Post> deleteComment(String postId, String commentId);
}
