import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app.dart';
import 'services/bridge_service.dart';
import 'services/connectivity_service.dart';
import 'services/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 상태바 스타일 (라이트 모드)
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      statusBarBrightness: Brightness.light,
    ),
  );

  // 서비스 초기화
  final notificationService = NotificationService();
  await notificationService.init();
  await notificationService.requestPermissions();

  final connectivityService = ConnectivityService();
  await connectivityService.init();

  final bridgeService = BridgeService(notificationService);

  runApp(GirogiApp(
    bridgeService: bridgeService,
    connectivityService: connectivityService,
  ));
}
