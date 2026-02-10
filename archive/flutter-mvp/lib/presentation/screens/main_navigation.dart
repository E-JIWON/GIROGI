/// 메인 네비게이션
///
/// 앱의 주요 5개 화면을 하단 네비게이션 바로 관리하는 메인 컨테이너입니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/presentation/screens/home/home_screen.dart';
import 'package:girogi/presentation/screens/checklist/checklist_screen.dart';
import 'package:girogi/presentation/screens/emergency/emergency_screen.dart';
import 'package:girogi/presentation/screens/community/community_screen.dart';
import 'package:girogi/presentation/screens/profile/profile_screen.dart';

/// 메인 네비게이션 화면
///
/// 하단 네비게이션 바를 통해 5개의 주요 화면 간 전환을 관리합니다.
/// 화면 목록:
/// - 홈 (Home): 연속 성공 일수, 핵심 미션, 주간 캘린더
/// - 체크리스트 (Checklist): 시간대별 체크리스트, 식사 기록
/// - 유혹 극복 (Emergency): 10분 타이머, 미래 자아 시각화
/// - 커뮤니티 (Community): 소셜 피드, 리액션, 댓글
/// - 프로필 (Profile): 사용자 프로필, 활동 히스토리
class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  /// 현재 선택된 탭 인덱스
  /// 0: 홈, 1: 체크리스트, 2: 유혹 극복, 3: 커뮤니티, 4: 프로필
  int _currentIndex = 0;

  /// 5개 화면 목록
  /// 인덱스에 따라 표시할 화면을 정의합니다.
  final List<Widget> _screens = const [
    HomeScreen(), // 0: 홈
    ChecklistScreen(), // 1: 체크리스트
    EmergencyScreen(), // 2: 유혹 극복
    CommunityScreen(), // 3: 커뮤니티
    ProfileScreen(), // 4: 프로필
  ];

  /// 탭 변경 핸들러
  ///
  /// 하단 네비게이션 바의 탭을 누르면 호출되어 화면을 전환합니다.
  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      /// 현재 선택된 화면 표시
      body: _screens[_currentIndex],

      /// 하단 네비게이션 바
      bottomNavigationBar: BottomNavigationBar(
        /// 현재 선택된 탭 인덱스
        currentIndex: _currentIndex,

        /// 탭 변경 시 호출되는 콜백
        onTap: _onTabTapped,

        /// 네비게이션 바 타입
        /// fixed: 모든 아이템이 항상 표시되고 고정된 크기 유지
        type: BottomNavigationBarType.fixed,

        /// 네비게이션 바 아이템 목록 (5개)
        items: const [
          /// 홈 탭
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home_rounded),
            label: '홈',
            tooltip: '홈 화면',
          ),

          /// 체크리스트 탭
          BottomNavigationBarItem(
            icon: Icon(Icons.checklist_outlined),
            activeIcon: Icon(Icons.checklist_rounded),
            label: '체크리스트',
            tooltip: '체크리스트 화면',
          ),

          /// 유혹 극복 탭
          /// 중앙 강조 아이템으로 시각적 중요도 표현
          BottomNavigationBarItem(
            icon: Icon(Icons.local_fire_department_outlined),
            activeIcon: Icon(Icons.local_fire_department_rounded),
            label: '유혹 극복',
            tooltip: '유혹 극복 화면',
          ),

          /// 커뮤니티 탭
          BottomNavigationBarItem(
            icon: Icon(Icons.people_outline),
            activeIcon: Icon(Icons.people_rounded),
            label: '커뮤니티',
            tooltip: '커뮤니티 화면',
          ),

          /// 프로필 탭
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person_rounded),
            label: '프로필',
            tooltip: '프로필 화면',
          ),
        ],
      ),
    );
  }
}
