/// 앱 색상 팔레트
///
/// 앱 전체에서 사용되는 색상을 정의합니다.
/// Material Design 3 및 행동경제학 연구 기반의 색상 심리학을 적용합니다.
library;

import 'package:flutter/material.dart';

/// 앱 색상 클래스
///
/// 일관된 색상 사용을 위한 중앙화된 색상 팔레트입니다.
/// 라이트/다크 모드를 모두 지원합니다.
class AppColors {
  /// 외부에서 인스턴스 생성을 방지하기 위한 private 생성자
  AppColors._();

  // ============================================================
  // Primary Colors (브랜드 색상)
  // ============================================================

  /// Primary 색상
  /// 브랜드 메인 컬러로 버튼, 강조 요소에 사용됩니다.
  /// 색상 심리학: 보라-파랑 계열은 신뢰감과 안정감을 제공
  static const Color primary = Color(0xFF6366F1);

  /// Primary 밝은 색상
  /// Primary 색상의 밝은 변형으로 호버, 선택 상태에 사용
  static const Color primaryLight = Color(0xFF818CF8);

  /// Primary 어두운 색상
  /// Primary 색상의 어두운 변형으로 눌린 상태에 사용
  static const Color primaryDark = Color(0xFF4F46E5);

  /// Primary 컨테이너 색상
  /// Primary 색상의 연한 배경으로 칩, 태그 등에 사용
  static const Color primaryContainer = Color(0xFFE0E7FF);

  // ============================================================
  // Semantic Colors (의미론적 색상)
  // ============================================================

  /// Success 색상
  /// 성공 상태, 완료 체크, 긍정적 피드백에 사용됩니다.
  /// 연속 성공 일수(Streak) 표시에 활용
  static const Color success = Color(0xFF22C55E);

  /// Success 밝은 색상
  /// Success 색상의 밝은 변형
  static const Color successLight = Color(0xFF4ADE80);

  /// Success 어두운 색상
  /// Success 색상의 어두운 변형
  static const Color successDark = Color(0xFF16A34A);

  /// Success 컨테이너 색상
  /// Success 메시지 배경, 성공 카드 등에 사용
  static const Color successContainer = Color(0xFFDCFCE7);

  /// Warning 색상
  /// 경고 메시지, 주의 필요 상태에 사용됩니다.
  /// 외식 빈도 경고, 유혹 상황 알림 등에 활용
  static const Color warning = Color(0xFFF59E0B);

  /// Warning 밝은 색상
  /// Warning 색상의 밝은 변형
  static const Color warningLight = Color(0xFFFBBF24);

  /// Warning 어두운 색상
  /// Warning 색상의 어두운 변형
  static const Color warningDark = Color(0xFFD97706);

  /// Warning 컨테이너 색상
  /// Warning 메시지 배경에 사용
  static const Color warningContainer = Color(0xFFFEF3C7);

  /// Error 색상
  /// 오류 메시지, 실패 상태, 부정적 피드백에 사용됩니다.
  /// 실패 리포트(Failure Report) 표시에 활용
  static const Color error = Color(0xFFEF4444);

  /// Error 밝은 색상
  /// Error 색상의 밝은 변형
  static const Color errorLight = Color(0xFFF87171);

  /// Error 어두운 색상
  /// Error 색상의 어두운 변형
  static const Color errorDark = Color(0xFFDC2626);

  /// Error 컨테이너 색상
  /// Error 메시지 배경, 실패 카드 등에 사용
  static const Color errorContainer = Color(0xFFFEE2E2);

  /// Info 색상
  /// 정보성 메시지, 도움말 등에 사용됩니다.
  static const Color info = Color(0xFF3B82F6);

  /// Info 컨테이너 색상
  /// Info 메시지 배경에 사용
  static const Color infoContainer = Color(0xFFDBEAFE);

  // ============================================================
  // Neutral Colors (중립 색상)
  // ============================================================

  /// Black 색상
  /// 라이트 모드의 기본 텍스트 색상
  static const Color black = Color(0xFF000000);

  /// White 색상
  /// 다크 모드의 기본 텍스트 색상, 라이트 모드의 배경
  static const Color white = Color(0xFFFFFFFF);

  /// Grey 50 (가장 밝음)
  /// 배경, 카드 구분선 등에 사용
  static const Color grey50 = Color(0xFFF9FAFB);

  /// Grey 100
  /// 비활성 배경, 구분선에 사용
  static const Color grey100 = Color(0xFFF3F4F6);

  /// Grey 200
  /// 호버 배경, 구분선에 사용
  static const Color grey200 = Color(0xFFE5E7EB);

  /// Grey 300
  /// 보더, 구분선에 사용
  static const Color grey300 = Color(0xFFD1D5DB);

  /// Grey 400
  /// 아이콘, 부가 텍스트에 사용
  static const Color grey400 = Color(0xFF9CA3AF);

  /// Grey 500
  /// 보조 텍스트에 사용
  static const Color grey500 = Color(0xFF6B7280);

  /// Grey 600
  /// 일반 텍스트에 사용
  static const Color grey600 = Color(0xFF4B5563);

  /// Grey 700
  /// 강조 텍스트에 사용
  static const Color grey700 = Color(0xFF374151);

  /// Grey 800
  /// 제목, 헤더에 사용
  static const Color grey800 = Color(0xFF1F2937);

  /// Grey 900 (가장 어두움)
  /// 메인 텍스트, 다크 모드 배경에 사용
  static const Color grey900 = Color(0xFF111827);

  // ============================================================
  // Functional Colors (기능적 색상)
  // ============================================================

  /// 배경 색상 (라이트 모드)
  /// 앱 전체 배경에 사용되는 기본 색상
  static const Color backgroundLight = white;

  /// 배경 색상 (다크 모드)
  /// 다크 모드의 앱 전체 배경에 사용
  static const Color backgroundDark = Color(0xFF0F172A);

  /// 표면 색상 (라이트 모드)
  /// 카드, 모달 등의 배경에 사용
  static const Color surfaceLight = white;

  /// 표면 색상 (다크 모드)
  /// 다크 모드의 카드, 모달 배경에 사용
  static const Color surfaceDark = Color(0xFF1E293B);

  /// 구분선 색상 (라이트 모드)
  /// 리스트 구분선, 보더 등에 사용
  static const Color dividerLight = grey200;

  /// 구분선 색상 (다크 모드)
  /// 다크 모드의 구분선에 사용
  static const Color dividerDark = Color(0xFF334155);

  // ============================================================
  // Text Colors (텍스트 색상)
  // ============================================================

  /// Primary 텍스트 색상 (라이트 모드)
  /// 본문 텍스트에 사용되는 기본 색상
  static const Color textPrimaryLight = grey900;

  /// Primary 텍스트 색상 (다크 모드)
  /// 다크 모드의 본문 텍스트 색상
  static const Color textPrimaryDark = grey50;

  /// Secondary 텍스트 색상 (라이트 모드)
  /// 보조 설명, 부가 정보에 사용
  static const Color textSecondaryLight = grey600;

  /// Secondary 텍스트 색상 (다크 모드)
  /// 다크 모드의 보조 텍스트 색상
  static const Color textSecondaryDark = grey400;

  /// Disabled 텍스트 색상 (라이트 모드)
  /// 비활성 상태의 텍스트 색상
  static const Color textDisabledLight = grey400;

  /// Disabled 텍스트 색상 (다크 모드)
  /// 다크 모드의 비활성 텍스트 색상
  static const Color textDisabledDark = grey600;

  // ============================================================
  // Feature-specific Colors (기능별 색상)
  // ============================================================

  /// Streak 색상
  /// 연속 성공 일수 표시에 사용되는 강조 색상
  /// 도파민 자극을 위한 생동감 있는 그라데이션 효과 활용
  static const Color streak = Color(0xFFFF6B35);

  /// 치팅데이 색상
  /// 보상 시스템(Temptation Bundling) 강조에 사용
  static const Color cheatDay = Color(0xFFF4A261);

  /// 과자박스 색상
  /// 보상 아이템 강조에 사용
  static const Color snackBox = Color(0xFFE9C46A);

  /// 유혹 극복 색상
  /// 유혹 극복 인터페이스 및 타이머에 사용
  static const Color temptation = Color(0xFF2A9D8F);

  /// 자기 연민 색상
  /// Self-Compassion 모드 강조에 사용
  /// 따뜻하고 포용적인 느낌의 색상
  static const Color selfCompassion = Color(0xFFE07A5F);

  /// 커뮤니티 색상
  /// 소셜 기능 강조에 사용
  static const Color community = Color(0xFF264653);

  // ============================================================
  // Gradient Colors (그라데이션 색상)
  // ============================================================

  /// Streak 그라데이션
  /// 연속 성공 일수 카드 배경에 사용되는 그라데이션
  static const LinearGradient streakGradient = LinearGradient(
    colors: [Color(0xFFFF6B35), Color(0xFFFF8E53)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Success 그라데이션
  /// 성공 축하 화면 배경에 사용
  static const LinearGradient successGradient = LinearGradient(
    colors: [Color(0xFF22C55E), Color(0xFF4ADE80)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Primary 그라데이션
  /// 버튼, 강조 요소에 사용되는 그라데이션
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [Color(0xFF6366F1), Color(0xFF818CF8)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // ============================================================
  // Shadow Colors (그림자 색상)
  // ============================================================

  /// 그림자 색상 (라이트 모드)
  /// 카드, 버튼 등의 그림자에 사용
  static const Color shadowLight = Color(0x1A000000);

  /// 그림자 색상 (다크 모드)
  /// 다크 모드의 그림자에 사용
  static const Color shadowDark = Color(0x40000000);
}
