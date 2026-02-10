/// 앱 테마
///
/// Material Design 3 기반의 앱 테마를 정의합니다.
/// 라이트 모드와 다크 모드를 모두 지원합니다.
library;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';
import 'package:girogi/core/constants/app_constants.dart';

/// 앱 테마 클래스
///
/// 라이트/다크 모드 테마를 생성하는 함수를 제공합니다.
class AppTheme {
  /// 외부에서 인스턴스 생성을 방지하기 위한 private 생성자
  AppTheme._();

  // ============================================================
  // Light Theme
  // ============================================================

  /// 라이트 모드 테마 생성 함수
  ///
  /// Material 3 기반의 밝은 테마를 반환합니다.
  static ThemeData getLightTheme() {
    return ThemeData(
      // Material 3 활성화
      useMaterial3: true,

      // 기본 색상
      brightness: Brightness.light,
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.backgroundLight,

      // Color Scheme (Material 3)
      colorScheme: const ColorScheme.light(
        primary: AppColors.primary,
        primaryContainer: AppColors.primaryContainer,
        secondary: AppColors.streak,
        secondaryContainer: AppColors.successContainer,
        tertiary: AppColors.temptation,
        error: AppColors.error,
        errorContainer: AppColors.errorContainer,
        surface: AppColors.surfaceLight,
        onPrimary: AppColors.white,
        onSecondary: AppColors.white,
        onError: AppColors.white,
        onSurface: AppColors.textPrimaryLight,
        outline: AppColors.grey300,
        shadow: AppColors.shadowLight,
      ),

      // Typography
      textTheme: AppTypography.getTextTheme(isDark: false),

      // AppBar Theme
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.backgroundLight,
        foregroundColor: AppColors.textPrimaryLight,
        elevation: 0,
        centerTitle: true,
        systemOverlayStyle: SystemUiOverlayStyle.dark,
        titleTextStyle: TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimaryLight,
        ),
        iconTheme: IconThemeData(
          color: AppColors.textPrimaryLight,
          size: AppConstants.defaultIconSize,
        ),
      ),

      // BottomNavigationBar Theme
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.surfaceLight,
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.grey400,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
        selectedLabelStyle: TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
        unselectedLabelStyle: TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 12,
          fontWeight: FontWeight.w400,
        ),
      ),

      // Card Theme
      cardTheme: CardTheme(
        color: AppColors.surfaceLight,
        elevation: 2,
        shadowColor: AppColors.shadowLight,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        ),
        margin: const EdgeInsets.all(AppConstants.smallPadding),
      ),

      // ElevatedButton Theme
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.white,
          elevation: 2,
          shadowColor: AppColors.shadowLight,
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.defaultPadding,
            vertical: 12,
          ),
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(AppConstants.defaultBorderRadius),
          ),
          textStyle: const TextStyle(
            fontFamily: AppTypography.defaultFontFamily,
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // OutlinedButton Theme
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.primary,
          side: const BorderSide(color: AppColors.primary, width: 1.5),
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.defaultPadding,
            vertical: 12,
          ),
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(AppConstants.defaultBorderRadius),
          ),
          textStyle: const TextStyle(
            fontFamily: AppTypography.defaultFontFamily,
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // TextButton Theme
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.primary,
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.defaultPadding,
            vertical: 12,
          ),
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(AppConstants.defaultBorderRadius),
          ),
          textStyle: const TextStyle(
            fontFamily: AppTypography.defaultFontFamily,
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // FloatingActionButton Theme
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.white,
        elevation: 4,
        shape: CircleBorder(),
      ),

      // Chip Theme
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.primaryContainer,
        labelStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: AppColors.primary,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
        ),
      ),

      // InputDecoration Theme
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.grey50,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: AppConstants.defaultPadding,
          vertical: 12,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.grey300),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.grey300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.error),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.error, width: 2),
        ),
        labelStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 16,
          color: AppColors.grey600,
        ),
        hintStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 16,
          color: AppColors.grey400,
        ),
      ),

      // Dialog Theme
      dialogTheme: DialogTheme(
        backgroundColor: AppColors.surfaceLight,
        elevation: 8,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.largeBorderRadius),
        ),
        titleTextStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimaryLight,
        ),
        contentTextStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 16,
          color: AppColors.textSecondaryLight,
        ),
      ),

      // SnackBar Theme
      snackBarTheme: SnackBarThemeData(
        backgroundColor: AppColors.grey900,
        contentTextStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 14,
          color: AppColors.white,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
        ),
        behavior: SnackBarBehavior.floating,
      ),

      // Divider Theme
      dividerTheme: const DividerThemeData(
        color: AppColors.dividerLight,
        thickness: 1,
        space: 1,
      ),

      // Icon Theme
      iconTheme: const IconThemeData(
        color: AppColors.grey700,
        size: AppConstants.defaultIconSize,
      ),

      // Switch Theme
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primary;
          }
          return AppColors.grey400;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primaryLight;
          }
          return AppColors.grey200;
        }),
      ),

      // Checkbox Theme
      checkboxTheme: CheckboxThemeData(
        fillColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primary;
          }
          return AppColors.grey300;
        }),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
        ),
      ),

      // ProgressIndicator Theme
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: AppColors.primary,
        linearTrackColor: AppColors.grey200,
        circularTrackColor: AppColors.grey200,
      ),
    );
  }

  // ============================================================
  // Dark Theme
  // ============================================================

  /// 다크 모드 테마 생성 함수
  ///
  /// Material 3 기반의 어두운 테마를 반환합니다.
  static ThemeData getDarkTheme() {
    return ThemeData(
      // Material 3 활성화
      useMaterial3: true,

      // 기본 색상
      brightness: Brightness.dark,
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.backgroundDark,

      // Color Scheme (Material 3)
      colorScheme: const ColorScheme.dark(
        primary: AppColors.primary,
        primaryContainer: AppColors.primaryDark,
        secondary: AppColors.streak,
        secondaryContainer: Color(0xFF4B2C20),
        tertiary: AppColors.temptation,
        error: AppColors.error,
        errorContainer: Color(0xFF5C1D1D),
        surface: AppColors.surfaceDark,
        onPrimary: AppColors.white,
        onSecondary: AppColors.white,
        onError: AppColors.white,
        onSurface: AppColors.textPrimaryDark,
        outline: AppColors.grey700,
        shadow: AppColors.shadowDark,
      ),

      // Typography
      textTheme: AppTypography.getTextTheme(isDark: true),

      // AppBar Theme
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.backgroundDark,
        foregroundColor: AppColors.textPrimaryDark,
        elevation: 0,
        centerTitle: true,
        systemOverlayStyle: SystemUiOverlayStyle.light,
        titleTextStyle: TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimaryDark,
        ),
        iconTheme: IconThemeData(
          color: AppColors.textPrimaryDark,
          size: AppConstants.defaultIconSize,
        ),
      ),

      // BottomNavigationBar Theme
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.surfaceDark,
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.grey600,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
        selectedLabelStyle: TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
        unselectedLabelStyle: TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 12,
          fontWeight: FontWeight.w400,
        ),
      ),

      // Card Theme
      cardTheme: CardTheme(
        color: AppColors.surfaceDark,
        elevation: 4,
        shadowColor: AppColors.shadowDark,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
        ),
        margin: const EdgeInsets.all(AppConstants.smallPadding),
      ),

      // ElevatedButton Theme
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.white,
          elevation: 4,
          shadowColor: AppColors.shadowDark,
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.defaultPadding,
            vertical: 12,
          ),
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(AppConstants.defaultBorderRadius),
          ),
          textStyle: const TextStyle(
            fontFamily: AppTypography.defaultFontFamily,
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // OutlinedButton Theme
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.primary,
          side: const BorderSide(color: AppColors.primary, width: 1.5),
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.defaultPadding,
            vertical: 12,
          ),
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(AppConstants.defaultBorderRadius),
          ),
          textStyle: const TextStyle(
            fontFamily: AppTypography.defaultFontFamily,
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // TextButton Theme
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.primary,
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.defaultPadding,
            vertical: 12,
          ),
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(AppConstants.defaultBorderRadius),
          ),
          textStyle: const TextStyle(
            fontFamily: AppTypography.defaultFontFamily,
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // FloatingActionButton Theme
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.white,
        elevation: 6,
        shape: CircleBorder(),
      ),

      // Chip Theme
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.primaryDark,
        labelStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: AppColors.white,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
        ),
      ),

      // InputDecoration Theme
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.surfaceDark,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: AppConstants.defaultPadding,
          vertical: 12,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.grey700),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.grey700),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.error),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.defaultBorderRadius),
          borderSide: const BorderSide(color: AppColors.error, width: 2),
        ),
        labelStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 16,
          color: AppColors.grey400,
        ),
        hintStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 16,
          color: AppColors.grey600,
        ),
      ),

      // Dialog Theme
      dialogTheme: DialogTheme(
        backgroundColor: AppColors.surfaceDark,
        elevation: 12,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.largeBorderRadius),
        ),
        titleTextStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimaryDark,
        ),
        contentTextStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 16,
          color: AppColors.textSecondaryDark,
        ),
      ),

      // SnackBar Theme
      snackBarTheme: SnackBarThemeData(
        backgroundColor: AppColors.grey200,
        contentTextStyle: const TextStyle(
          fontFamily: AppTypography.defaultFontFamily,
          fontSize: 14,
          color: AppColors.grey900,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.smallBorderRadius),
        ),
        behavior: SnackBarBehavior.floating,
      ),

      // Divider Theme
      dividerTheme: const DividerThemeData(
        color: AppColors.dividerDark,
        thickness: 1,
        space: 1,
      ),

      // Icon Theme
      iconTheme: const IconThemeData(
        color: AppColors.grey300,
        size: AppConstants.defaultIconSize,
      ),

      // Switch Theme
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primary;
          }
          return AppColors.grey600;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primaryDark;
          }
          return AppColors.grey800;
        }),
      ),

      // Checkbox Theme
      checkboxTheme: CheckboxThemeData(
        fillColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.primary;
          }
          return AppColors.grey700;
        }),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
        ),
      ),

      // ProgressIndicator Theme
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: AppColors.primary,
        linearTrackColor: AppColors.grey800,
        circularTrackColor: AppColors.grey800,
      ),
    );
  }
}
