/// 프로필 화면
///
/// 사용자의 프로필 정보 및 활동 히스토리를 표시하는 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/data/repositories/user_repository.dart';
import 'package:girogi/data/repositories/daily_record_repository.dart';
import 'package:girogi/presentation/widgets/profile/profile_header.dart';
import 'package:girogi/presentation/widgets/profile/meal_timeline_item.dart';
import 'package:girogi/presentation/widgets/community/post_card.dart';
import 'package:girogi/data/repositories/post_repository.dart';

/// 프로필 화면 위젯
///
/// 다중 탭 구조로 사용자의 활동을 다각도로 보여줍니다.
/// 주요 기능:
/// - 프로필 정보 (닉네임, 바이오, 통계)
/// - 식사 타임라인 탭 (식사 기록 타임라인)
/// - 기록 탭 (공유한 게시글)
/// - 팔로우/팔로잉 네트워크
///
/// TODO: Mock Repository 데이터 연동
class ProfileScreen extends StatefulWidget {
  /// 프로필을 볼 사용자 ID (null이면 본인 프로필)
  final String? userId;

  const ProfileScreen({
    super.key,
    this.userId,
  });

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen>
    with SingleTickerProviderStateMixin {
  /// TODO: Repository에서 데이터 가져오기
  /// 현재는 하드코딩된 샘플 데이터 사용
  final _userRepository = MockUserRepository();
  final _dailyRecordRepository = MockDailyRecordRepository();
  final _postRepository = MockPostRepository();

  /// 탭 컨트롤러
  late TabController _tabController;

  /// 본인 프로필 여부
  bool get isOwnProfile => widget.userId == null;

  /// 팔로우 여부
  /// TODO: Repository에서 가져오기
  bool isFollowing = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  /// 팔로우 토글
  void _toggleFollow() {
    setState(() {
      isFollowing = !isFollowing;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(isFollowing ? '팔로우했습니다' : '팔로우를 취소했습니다'),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  /// 프로필 편집
  void _editProfile() {
    // TODO: 프로필 편집 화면으로 이동
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('프로필 편집 화면 (TODO)'),
        duration: Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      /// AppBar
      appBar: AppBar(
        title: const Text('프로필'),
        actions: [
          if (isOwnProfile)
            /// 설정 버튼 (본인 프로필만)
            IconButton(
              icon: const Icon(Icons.settings_outlined),
              onPressed: () {
                // TODO: 설정 화면으로 이동
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('설정 화면 (TODO)')),
                );
              },
              tooltip: '설정',
            ),
        ],
      ),

      /// Body
      body: FutureBuilder(
        future: _userRepository.getCurrentUser(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError || !snapshot.hasData) {
            return Center(
              child: Text('프로필을 불러올 수 없습니다: ${snapshot.error}'),
            );
          }

          final user = snapshot.data!;

          return NestedScrollView(
            headerSliverBuilder: (context, innerBoxIsScrolled) {
              return [
                /// 프로필 헤더
                SliverToBoxAdapter(
                  child: ProfileHeader(
                    user: user,
                    isOwnProfile: isOwnProfile,
                    isFollowing: isFollowing,
                    onFollowTap: _toggleFollow,
                    onEditProfileTap: _editProfile,
                  ),
                ),

                /// 탭바
                SliverPersistentHeader(
                  pinned: true,
                  delegate: _SliverTabBarDelegate(
                    TabBar(
                      controller: _tabController,
                      tabs: const [
                        Tab(text: '식사 타임라인'),
                        Tab(text: '기록'),
                      ],
                    ),
                  ),
                ),
              ];
            },
            body: TabBarView(
              controller: _tabController,
              children: [
                /// 식사 타임라인 탭
                _buildMealTimelineTab(),

                /// 기록 탭 (게시글)
                _buildPostsTab(user.id),
              ],
            ),
          );
        },
      ),
    );
  }

  /// 식사 타임라인 탭 빌더
  Widget _buildMealTimelineTab() {
    return FutureBuilder(
      future: _dailyRecordRepository.getRecordsInRange(
        start: DateTime.now().subtract(const Duration(days: 7)),
        end: DateTime.now(),
      ),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(child: Text('오류: ${snapshot.error}'));
        }

        final records = snapshot.data ?? [];

        // 모든 식사 기록 수집
        final allMeals = records
            .expand((record) => record.mealRecords)
            .toList()
          ..sort((a, b) => b.timestamp.compareTo(a.timestamp));

        if (allMeals.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.restaurant_outlined,
                  size: 64,
                  color: AppColors.grey400,
                ),
                const SizedBox(height: 16),
                Text(
                  '아직 식사 기록이 없습니다',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppColors.grey600,
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
          child: ListView.builder(
            padding: const EdgeInsets.all(AppConstants.defaultPadding),
            itemCount: allMeals.length,
            itemBuilder: (context, index) {
              return MealTimelineItem(
                mealRecord: allMeals[index],
                isLast: index == allMeals.length - 1,
              );
            },
          ),
        );
      },
    );
  }

  /// 기록 탭 빌더 (게시글)
  Widget _buildPostsTab(String userId) {
    return FutureBuilder(
      future: _postRepository.getUserPosts(userId: userId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(child: Text('오류: ${snapshot.error}'));
        }

        final posts = snapshot.data ?? [];

        if (posts.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.article_outlined,
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
                    onReactionTap: (reactionType) {
                      // TODO: 리액션 처리
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('$reactionType 리액션')),
                      );
                    },
                    onCommentTap: () {
                      // TODO: 댓글 화면으로 이동
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('댓글 화면 (TODO)')),
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
}

/// Sliver 탭바 델리게이트
class _SliverTabBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar _tabBar;

  _SliverTabBarDelegate(this._tabBar);

  @override
  double get minExtent => _tabBar.preferredSize.height;

  @override
  double get maxExtent => _tabBar.preferredSize.height;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return Container(
      color: Theme.of(context).scaffoldBackgroundColor,
      child: _tabBar,
    );
  }

  @override
  bool shouldRebuild(_SliverTabBarDelegate oldDelegate) {
    return false;
  }
}
