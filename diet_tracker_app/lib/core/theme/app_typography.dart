/// 앱 타이포그래피
///
/// 앱 전체에서 사용되는 텍스트 스타일을 정의합니다.
/// Material Design 3 타이포그래피 시스템을 따릅니다.
library;

import 'package:flutter/material.dart';
import 'package:diet_tracker_app/core/theme/app_colors.dart';

/// 앱 타이포그래피 클래스
///
/// 일관된 텍스트 스타일 사용을 위한 중앙화된 타이포그래피 시스템입니다.
class AppTypography {
  /// 외부에서 인스턴스 생성을 방지하기 위한 private 생성자
  AppTypography._();

  // ============================================================
  // Font Family
  // ============================================================

  /// 기본 폰트 패밀리
  /// TODO: pubspec.yaml에 Pretendard 또는 Noto Sans KR 추가
  /// 현재는 시스템 기본 폰트 사용
  static const String defaultFontFamily = 'Pretendard';

  // ============================================================
  // Display Styles (큰 제목)
  // ============================================================

  /// Display Large
  /// 스플래시 화면, 온보딩 메인 타이틀에 사용
  static const TextStyle displayLarge = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 57,
    fontWeight: FontWeight.w700,
    height: 1.12,
    letterSpacing: -0.25,
  );

  /// Display Medium
  /// 큰 섹션 헤더에 사용
  static const TextStyle displayMedium = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 45,
    fontWeight: FontWeight.w700,
    height: 1.16,
    letterSpacing: 0,
  );

  /// Display Small
  /// 화면 타이틀에 사용
  static const TextStyle displaySmall = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 36,
    fontWeight: FontWeight.w700,
    height: 1.22,
    letterSpacing: 0,
  );

  // ============================================================
  // Headline Styles (헤드라인)
  // ============================================================

  /// Headline Large
  /// 메인 페이지 헤더에 사용
  static const TextStyle headlineLarge = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 32,
    fontWeight: FontWeight.w700,
    height: 1.25,
    letterSpacing: 0,
  );

  /// Headline Medium
  /// 섹션 헤더, 다이얼로그 타이틀에 사용
  static const TextStyle headlineMedium = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 28,
    fontWeight: FontWeight.w600,
    height: 1.29,
    letterSpacing: 0,
  );

  /// Headline Small
  /// 작은 섹션 헤더에 사용
  static const TextStyle headlineSmall = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 24,
    fontWeight: FontWeight.w600,
    height: 1.33,
    letterSpacing: 0,
  );

  // ============================================================
  // Title Styles (타이틀)
  // ============================================================

  /// Title Large
  /// AppBar 타이틀, 카드 헤더에 사용
  static const TextStyle titleLarge = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 22,
    fontWeight: FontWeight.w600,
    height: 1.27,
    letterSpacing: 0,
  );

  /// Title Medium
  /// 리스트 타이틀, 카드 제목에 사용
  static const TextStyle titleMedium = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w600,
    height: 1.5,
    letterSpacing: 0.15,
  );

  /// Title Small
  /// 작은 카드 제목, 버튼 레이블에 사용
  static const TextStyle titleSmall = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w600,
    height: 1.43,
    letterSpacing: 0.1,
  );

  // ============================================================
  // Body Styles (본문)
  // ============================================================

  /// Body Large
  /// 긴 본문 텍스트에 사용
  static const TextStyle bodyLarge = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
    letterSpacing: 0.5,
  );

  /// Body Medium
  /// 일반 본문 텍스트에 사용 (가장 많이 사용)
  static const TextStyle bodyMedium = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.43,
    letterSpacing: 0.25,
  );

  /// Body Small
  /// 작은 본문, 부가 설명에 사용
  static const TextStyle bodySmall = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.33,
    letterSpacing: 0.4,
  );

  // ============================================================
  // Label Styles (라벨)
  // ============================================================

  /// Label Large
  /// 버튼 텍스트, 탭 레이블에 사용
  static const TextStyle labelLarge = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.43,
    letterSpacing: 0.1,
  );

  /// Label Medium
  /// 작은 버튼, 칩 레이블에 사용
  static const TextStyle labelMedium = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.33,
    letterSpacing: 0.5,
  );

  /// Label Small
  /// 매우 작은 레이블, 배지에 사용
  static const TextStyle labelSmall = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 11,
    fontWeight: FontWeight.w500,
    height: 1.45,
    letterSpacing: 0.5,
  );

  // ============================================================
  // Custom Styles (커스텀 스타일)
  // ============================================================

  /// Streak Counter
  /// 연속 성공 일수 표시에 사용되는 강조 스타일
  static const TextStyle streakCounter = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 48,
    fontWeight: FontWeight.w800,
    height: 1.0,
    letterSpacing: -1.0,
  );

  /// Mission Title
  /// 핵심 미션 타이틀 표시에 사용
  static const TextStyle missionTitle = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 18,
    fontWeight: FontWeight.w700,
    height: 1.4,
    letterSpacing: 0,
  );

  /// Timer Display
  /// 유혹 극복 타이머 숫자 표시에 사용
  static const TextStyle timerDisplay = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 64,
    fontWeight: FontWeight.w900,
    height: 1.0,
    letterSpacing: -2.0,
  );

  /// Comment Text
  /// 커뮤니티 댓글 텍스트에 사용
  static const TextStyle commentText = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.5,
    letterSpacing: 0.25,
  );

  /// Caption
  /// 이미지 캡션, 작은 부가 정보에 사용
  static const TextStyle caption = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.33,
    letterSpacing: 0.4,
  );

  /// Overline
  /// 섹션 라벨, 카테고리 태그에 사용
  static const TextStyle overline = TextStyle(
    fontFamily: defaultFontFamily,
    fontSize: 10,
    fontWeight: FontWeight.w600,
    height: 1.6,
    letterSpacing: 1.5,
  );

  // ============================================================
  // Utility Methods
  // ============================================================

  /// 라이트 모드용 TextTheme 생성 함수
  ///
  /// Material 3 TextTheme을 생성하여 반환합니다.
  static TextTheme getTextTheme({bool isDark = false}) {
    final Color primaryColor =
        isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight;
    final Color secondaryColor =
        isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight;

    return TextTheme(
      // Display
      displayLarge: displayLarge.copyWith(color: primaryColor),
      displayMedium: displayMedium.copyWith(color: primaryColor),
      displaySmall: displaySmall.copyWith(color: primaryColor),

      // Headline
      headlineLarge: headlineLarge.copyWith(color: primaryColor),
      headlineMedium: headlineMedium.copyWith(color: primaryColor),
      headlineSmall: headlineSmall.copyWith(color: primaryColor),

      // Title
      titleLarge: titleLarge.copyWith(color: primaryColor),
      titleMedium: titleMedium.copyWith(color: primaryColor),
      titleSmall: titleSmall.copyWith(color: primaryColor),

      // Body
      bodyLarge: bodyLarge.copyWith(color: primaryColor),
      bodyMedium: bodyMedium.copyWith(color: primaryColor),
      bodySmall: bodySmall.copyWith(color: secondaryColor),

      // Label
      labelLarge: labelLarge.copyWith(color: primaryColor),
      labelMedium: labelMedium.copyWith(color: secondaryColor),
      labelSmall: labelSmall.copyWith(color: secondaryColor),
    );
  }

  /// 특정 색상을 적용한 TextStyle 반환 함수
  ///
  /// [style]: 기본 TextStyle
  /// [color]: 적용할 색상
  /// 반환: 색상이 적용된 TextStyle
  static TextStyle withColor(TextStyle style, Color color) {
    return style.copyWith(color: color);
  }

  /// 특정 FontWeight를 적용한 TextStyle 반환 함수
  ///
  /// [style]: 기본 TextStyle
  /// [fontWeight]: 적용할 FontWeight
  /// 반환: FontWeight가 적용된 TextStyle
  static TextStyle withWeight(TextStyle style, FontWeight fontWeight) {
    return style.copyWith(fontWeight: fontWeight);
  }
}
