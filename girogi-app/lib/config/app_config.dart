import 'package:flutter/foundation.dart';

class AppConfig {
  AppConfig._();

  static const String appName = 'GIROGI';
  static const String userAgent = 'GIROGI-App';

  /// 개발 모드: localhost:8282, 릴리즈 모드: Vercel 배포 URL
  static String get baseUrl {
    if (kDebugMode) {
      return 'http://localhost:8282';
    }
    return 'https://girogi.vercel.app';
  }
}
