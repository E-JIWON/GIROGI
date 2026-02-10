import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:package_info_plus/package_info_plus.dart';

import 'notification_service.dart';

/// Next.js 웹앱 ↔ Flutter 네이티브 통신 브릿지
class BridgeService {
  final NotificationService _notificationService;

  BridgeService(this._notificationService);

  /// WebView 컨트롤러에 JS 핸들러 등록
  void registerHandlers(InAppWebViewController controller) {
    // 푸시알림 예약
    controller.addJavaScriptHandler(
      handlerName: 'scheduleNotification',
      callback: (args) async {
        if (args.isEmpty) return {'success': false, 'error': 'No arguments'};

        try {
          final data = args[0] as Map<String, dynamic>;
          await _notificationService.schedule(
            id: data['id'] as int? ?? 0,
            title: data['title'] as String? ?? 'GIROGI',
            body: data['body'] as String? ?? '',
            delay: Duration(seconds: data['delaySeconds'] as int? ?? 0),
          );
          return {'success': true};
        } catch (e) {
          return {'success': false, 'error': e.toString()};
        }
      },
    );

    // 햅틱 피드백
    controller.addJavaScriptHandler(
      handlerName: 'hapticFeedback',
      callback: (args) {
        final type = args.isNotEmpty ? args[0] as String? : 'medium';
        switch (type) {
          case 'light':
            HapticFeedback.lightImpact();
            break;
          case 'heavy':
            HapticFeedback.heavyImpact();
            break;
          case 'selection':
            HapticFeedback.selectionClick();
            break;
          default:
            HapticFeedback.mediumImpact();
        }
        return {'success': true};
      },
    );

    // 앱 정보 가져오기
    controller.addJavaScriptHandler(
      handlerName: 'getAppInfo',
      callback: (args) async {
        final info = await PackageInfo.fromPlatform();
        return {
          'appName': info.appName,
          'packageName': info.packageName,
          'version': info.version,
          'buildNumber': info.buildNumber,
        };
      },
    );

    // 즉시 알림 표시
    controller.addJavaScriptHandler(
      handlerName: 'showNotification',
      callback: (args) async {
        if (args.isEmpty) return {'success': false, 'error': 'No arguments'};

        try {
          final data = args[0] as Map<String, dynamic>;
          await _notificationService.show(
            id: data['id'] as int? ?? DateTime.now().millisecondsSinceEpoch ~/ 1000,
            title: data['title'] as String? ?? 'GIROGI',
            body: data['body'] as String? ?? '',
          );
          return {'success': true};
        } catch (e) {
          return {'success': false, 'error': e.toString()};
        }
      },
    );
  }
}
