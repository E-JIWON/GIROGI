/// 애플리케이션 진입점
///
/// Flutter 앱의 시작점으로, 앱 초기화 및 루트 위젯을 실행합니다.
library;

import 'package:flutter/material.dart';
import 'package:girogi/app.dart';

/// 애플리케이션 메인 함수
///
/// Flutter 프레임워크 초기화 및 앱 실행을 담당합니다.
/// 향후 다음 초기화 작업이 추가될 예정:
/// - Riverpod ProviderScope 래핑
/// - 로컬 저장소 초기화 (Hive/SQLite)
/// - Firebase 초기화
/// - 에러 핸들링 설정
void main() async {
  /// Flutter 바인딩 초기화
  /// 비동기 초기화 작업이 필요한 경우 필수
  WidgetsFlutterBinding.ensureInitialized();

  // TODO: 로컬 저장소 초기화
  // await initializeLocalStorage();

  // TODO: Firebase 초기화 (커뮤니티 기능 구현 시)
  // await Firebase.initializeApp(
  //   options: DefaultFirebaseOptions.currentPlatform,
  // );

  /// 앱 실행
  /// TODO: Riverpod ProviderScope로 래핑
  runApp(
    // ProviderScope(
    //   child: const GirogiApp(),
    // ),
    const GirogiApp(),
  );
}
