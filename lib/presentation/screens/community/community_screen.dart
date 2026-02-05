/// 커뮤니티 화면
///
/// 사용자 간 경험 공유 및 상호 지원을 위한 소셜 피드 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/models/post.dart';
import 'package:girogi/data/repositories/post_repository.dart';
import 'package:girogi/presentation/widgets/community/post_card.dart';
import 'package:girogi/presentation/widgets/community/post_composer_dialog.dart';

/// 커뮤니티 화면 위젯
///
/// 소셜 기능을 통한 동기부여 및 지속 가능성을 제공합니다.
/// 주요 기능:
/// - 피드 (전체/팔로잉/숏츠)
/// - 리액션 시스템 (6종 감정 표현)
/// - 댓글 기반 상호 지원
/// - 유튜브 숏츠 형식 동기부여 콘텐츠
///
/// TODO: Mock Repository 데이터 연동
class CommunityScreen extends StatefulWidget {
  const CommunityScreen({super.key});

  @override
  State<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen>
    with SingleTickerProviderStateMixin {
  /// TODO: Repository에서 데이터 가져오기
  /// 현재는 하드코딩된 샘플 데이터 사용
  final _postRepository = MockPostRepository();

  /// 탭 컨트롤러
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  /// 글쓰기 다이얼로그 열기
  void _openPostComposer() {
    PostComposerDialog.show(context);
  }

  /// 리액션 처리
  void _handleReaction(String postId, String reactionType) {
    // TODO: Repository에 리액션 저장
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$reactionType 리액션을 남겼습니다'),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  /// 댓글 화면으로 이동
  void _goToComments(String postId) {
    // TODO: 댓글 상세 화면으로 이동
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('댓글 화면으로 이동 (TODO)'),
        duration: Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      /// AppBar
      appBar: AppBar(
        title: const Text('커뮤니티'),
        actions: [
          /// 글쓰기 버튼
          IconButton(
            icon: const Icon(Icons.edit_rounded),
            onPressed: _openPostComposer,
            tooltip: '글쓰기',
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: '전체'),
            Tab(text: '팔로잉'),
            Tab(text: '숏츠'),
          ],
        ),
      ),

      /// Body with TabBarView
      body: TabBarView(
        controller: _tabController,
        children: [
          /// 전체 피드
          _buildFeed(showAll: true),

          /// 팔로잉 피드
          _buildFeed(showAll: false),

          /// 숏츠 피드
          _buildShortsFeed(),
        ],
      ),
    );
  }

  /// 피드 빌더
  Widget _buildFeed({required bool showAll}) {
    return FutureBuilder(
      future: _postRepository.getRecentPosts(limit: 20),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(
            child: Text('오류가 발생했습니다: ${snapshot.error}'),
          );
        }

        final posts = snapshot.data ?? [];

        if (posts.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.people_outline_rounded,
                  size: 64,
                  color: AppColors.grey400,
                ),
                const SizedBox(height: 16),
                Text(
                  '아직 게시글이 없습니다',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppColors.grey600,
                      ),
                ),
                const SizedBox(height: 8),
                TextButton.icon(
                  onPressed: _openPostComposer,
                  icon: const Icon(Icons.edit_rounded),
                  label: const Text('첫 게시글 작성하기'),
                ),
              ],
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: () async {
            // TODO: 데이터 새로고침
            await Future.delayed(const Duration(seconds: 1));
          },
          child: ListView.builder(
            padding: const EdgeInsets.all(AppConstants.defaultPadding),
            itemCount: posts.length,
            itemBuilder: (context, index) {
              final post = posts[index];

              return FutureBuilder(
                future: _postRepository.getPostAuthor(post.authorId),
                builder: (context, authorSnapshot) {
                  if (!authorSnapshot.hasData) {
                    return const SizedBox.shrink();
                  }

                  final author = authorSnapshot.data!;

                  return PostCard(
                    post: post,
                    author: author,
                    onReactionTap: (reactionType) =>
                        _handleReaction(post.id, reactionType),
                    onCommentTap: () => _goToComments(post.id),
                    onMoreTap: () {
                      // TODO: 더보기 메뉴 (신고, 차단 등)
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('더보기 메뉴 (TODO)')),
                      );
                    },
                  );
                },
              );
            },
          ),
        );
      },
    );
  }

  /// 숏츠 피드 빌더
  Widget _buildShortsFeed() {
    return FutureBuilder(
      future: _postRepository.getRecentPosts(limit: 20),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(
            child: Text('오류가 발생했습니다: ${snapshot.error}'),
          );
        }

        final allPosts = snapshot.data ?? [];
        final shortsPosts = allPosts.where((post) => post.type == PostType.shorts).toList();

        if (shortsPosts.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.video_library_outlined,
                  size: 64,
                  color: AppColors.grey400,
                ),
                const SizedBox(height: 16),
                Text(
                  '숏츠 콘텐츠가 없습니다',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppColors.grey600,
                      ),
                ),
                const SizedBox(height: 8),
                Text(
                  '곧 동기부여 숏츠가 추가될 예정입니다',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppColors.grey500,
                      ),
                ),
              ],
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: () async {
            // TODO: 데이터 새로고침
            await Future.delayed(const Duration(seconds: 1));
          },
          child: GridView.builder(
            padding: const EdgeInsets.all(AppConstants.defaultPadding),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: AppConstants.defaultPadding,
              mainAxisSpacing: AppConstants.defaultPadding,
              childAspectRatio: 0.7,
            ),
            itemCount: shortsPosts.length,
            itemBuilder: (context, index) {
              final post = shortsPosts[index];

              return FutureBuilder(
                future: _postRepository.getPostAuthor(post.authorId),
                builder: (context, authorSnapshot) {
                  if (!authorSnapshot.hasData) {
                    return const SizedBox.shrink();
                  }

                  final author = authorSnapshot.data!;

                  return PostCard(
                    post: post,
                    author: author,
                    onReactionTap: (reactionType) =>
                        _handleReaction(post.id, reactionType),
                    onCommentTap: () => _goToComments(post.id),
                  );
                },
              );
            },
          ),
        );
      },
    );
  }
}
