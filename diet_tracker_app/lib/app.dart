/// 애플리케이션 루트 위젯
///
/// MaterialApp 설정 및 라우팅을 담당하는 최상위 위젯입니다.
/// 테마, 로케일, 초기 라우트 등 앱 전역 설정을 정의합니다.
library;

import 'package:flutter/material.dart';

/// 앱의 진입점 위젯
///
/// 앱 전역 설정 (테마, 라우팅, 로케일 등)을 관리합니다.
class DietTrackerApp extends StatelessWidget {
  const DietTrackerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      /// 앱 타이틀 (태스크 스위처에 표시)
      title: '오늘부터 다시',

      /// 디버그 배너 비활성화 (개발 중에는 true)
      debugShowCheckedModeBanner: true,

      /// 라이트 테마 설정
      /// TODO: core/theme/app_theme.dart에서 정의된 테마 적용
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6366F1), // 인디고
        ),
        useMaterial3: true,
      ),

      /// 다크 테마 설정
      /// TODO: core/theme/app_theme.dart에서 정의된 다크 테마 적용
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6366F1),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),

      /// 시스템 테마 자동 전환 설정
      themeMode: ThemeMode.system,

      /// 초기 화면
      /// TODO: presentation/screens/home/home_screen.dart 연결
      home: const Scaffold(
        body: Center(
          child: Text(
            '오늘부터 다시',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),

      /// 라우팅 설정
      /// TODO: 화면별 라우트 정의 추가
      // routes: {
      //   '/home': (context) => const HomeScreen(),
      //   '/checklist': (context) => const ChecklistScreen(),
      //   '/community': (context) => const CommunityScreen(),
      //   '/emergency': (context) => const EmergencyScreen(),
      //   '/report': (context) => const ReportScreen(),
      // },
    );
  }
}
