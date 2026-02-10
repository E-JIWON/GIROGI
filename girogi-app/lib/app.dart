import 'package:flutter/material.dart';

import 'config/app_config.dart';
import 'screens/webview_screen.dart';
import 'services/bridge_service.dart';
import 'services/connectivity_service.dart';

class GirogiApp extends StatelessWidget {
  final BridgeService bridgeService;
  final ConnectivityService connectivityService;

  const GirogiApp({
    super.key,
    required this.bridgeService,
    required this.connectivityService,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: AppConfig.appName,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: const Color(0xFF6366F1),
        useMaterial3: true,
      ),
      home: WebViewScreen(
        bridgeService: bridgeService,
        connectivityService: connectivityService,
      ),
    );
  }
}
