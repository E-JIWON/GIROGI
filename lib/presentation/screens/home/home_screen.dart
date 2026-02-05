/// 홈 화면
///
/// 연속 성공 일수, 핵심 미션, 주간 캘린더, 보상 시스템을 표시하는 메인 화면입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/constants/app_constants.dart';
import 'package:girogi/presentation/widgets/home/streak_counter.dart';
import 'package:girogi/presentation/widgets/home/mission_card.dart';
import 'package:girogi/presentation/widgets/home/weekly_calendar.dart';
import 'package:girogi/presentation/widgets/home/reward_status_card.dart';

/// 홈 화면 위젯
///
/// 사용자의 다이어트 진행 상황을 한눈에 보여주는 메인 화면입니다.
/// 주요 기능:
/// - 연속 성공 일수 (Streak) 표시
/// - 일일 핵심 미션 3개 관리
/// - 주간 성공률 캘린더
/// - 보상 시스템 현황 (과자박스, 치팅데이)
///
/// TODO: Mock Repository 데이터 연동
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  /// TODO: Repository에서 데이터 가져오기
  /// 현재는 하드코딩된 샘플 데이터 사용

  /// 현재 연속 성공 일수
  int currentStreak = 5;

  /// 최고 연속 성공 일수
  int bestStreak = 12;

  /// 핵심 미션 목록
  final List<Map<String, dynamic>> missions = [
    {
      'title': '아침 식사 집에서 먹기',
      'description': '외식하지 않고 집에서 준비한 식사',
      'icon': Icons.breakfast_dining_rounded,
      'isCompleted': true,
    },
    {
      'title': '점심 천천히 먹기',
      'description': '30회 이상 씹으며 20분 이상 소요',
      'icon': Icons.restaurant_rounded,
      'isCompleted': true,
    },
    {
      'title': '저녁 8시 전 식사 완료',
      'description': '늦은 식사 피하고 소화 시간 확보',
      'icon': Icons.access_time_rounded,
      'isCompleted': false,
    },
  ];

  /// 주간 성공 기록 (월~일)
  /// true: 성공, false: 실패, null: 미래 날짜
  List<bool?> weeklyRecords = [
    true, // 월
    true, // 화
    true, // 수
    false, // 목
    true, // 금
    true, // 토
    null, // 일 (오늘/미래)
  ];

  /// 과자박스 개수
  int snackBoxCount = 2;

  /// 연속 다이어트 일수
  int consecutiveDietDays = 5;

  /// 미션 토글 핸들러
  void _toggleMission(int index) {
    setState(() {
      missions[index]['isCompleted'] = !missions[index]['isCompleted'];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      /// AppBar
      appBar: AppBar(
        title: const Text('GIROGI'),
        actions: [
          /// 알림 버튼
          /// TODO: 알림 화면 연결
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {
              // TODO: 알림 화면으로 이동
            },
          ),
        ],
      ),

      /// Body
      body: RefreshIndicator(
        /// 당겨서 새로고침
        /// TODO: Repository에서 최신 데이터 가져오기
        onRefresh: () async {
          await Future.delayed(const Duration(seconds: 1));
          // TODO: 데이터 새로고침 로직
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(AppConstants.defaultPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// 1. Streak Counter (연속 성공 일수)
              StreakCounter(
                currentStreak: currentStreak,
                bestStreak: bestStreak,
              ),

              const SizedBox(height: AppConstants.defaultPadding),

              /// 2. 핵심 미션 섹션
              _buildSectionTitle('오늘의 핵심 미션'),
              const SizedBox(height: 12),
              _buildMissionsSection(),

              const SizedBox(height: AppConstants.largePadding),

              /// 3. 주간 캘린더
              WeeklyCalendar(
                weeklyRecords: weeklyRecords,
              ),

              const SizedBox(height: AppConstants.defaultPadding),

              /// 4. 보상 시스템 현황
              RewardStatusCard(
                snackBoxCount: snackBoxCount,
                consecutiveDietDays: consecutiveDietDays,
              ),

              const SizedBox(height: AppConstants.defaultPadding),
            ],
          ),
        ),
      ),
    );
  }

  /// 섹션 타이틀 빌더
  Widget _buildSectionTitle(String title) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.titleLarge,
        ),
        Text(
          '${_getCompletedMissionsCount()}/${missions.length}',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: _getCompletedMissionsCount() >= AppConstants.minCoreMissionsForSuccess
                    ? AppColors.success
                    : AppColors.grey600,
              ),
        ),
      ],
    );
  }

  /// 핵심 미션 섹션 빌더
  Widget _buildMissionsSection() {
    return Column(
      children: List.generate(
        missions.length,
        (index) {
          final mission = missions[index];
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: MissionCard(
              title: mission['title'],
              description: mission['description'],
              icon: mission['icon'],
              isCompleted: mission['isCompleted'],
              onTap: () => _toggleMission(index),
            ),
          );
        },
      ),
    );
  }

  /// 완료된 미션 개수 계산
  int _getCompletedMissionsCount() {
    return missions.where((mission) => mission['isCompleted'] == true).length;
  }
}
