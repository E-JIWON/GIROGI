import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

import '../config/app_config.dart';
import '../services/bridge_service.dart';
import '../services/connectivity_service.dart';
import 'offline_screen.dart';
import 'splash_screen.dart';

class WebViewScreen extends StatefulWidget {
  final BridgeService bridgeService;
  final ConnectivityService connectivityService;

  const WebViewScreen({
    super.key,
    required this.bridgeService,
    required this.connectivityService,
  });

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  InAppWebViewController? _controller;
  bool _isLoading = true;
  bool _hasError = false;

  @override
  void initState() {
    super.initState();
    widget.connectivityService.onStatusChange.listen((isOnline) {
      if (isOnline && _hasError) {
        _reload();
      }
    });
  }

  void _reload() {
    setState(() {
      _hasError = false;
      _isLoading = true;
    });
    _controller?.loadUrl(
      urlRequest: URLRequest(url: WebUri(AppConfig.baseUrl)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        final controller = _controller;
        if (controller != null && await controller.canGoBack()) {
          controller.goBack();
        }
      },
      child: Scaffold(
        body: SafeArea(
          child: Stack(
            children: [
              if (_hasError)
                OfflineScreen(onRetry: _reload)
              else
                InAppWebView(
                  initialUrlRequest: URLRequest(
                    url: WebUri(AppConfig.baseUrl),
                  ),
                  initialSettings: InAppWebViewSettings(
                    // 앱 느낌을 위한 설정
                    userAgent:
                        '${AppConfig.userAgent} Mozilla/5.0',
                    supportZoom: false,
                    // localStorage 활성화
                    domStorageEnabled: true,
                    databaseEnabled: true,
                    // 성능
                    javaScriptEnabled: true,
                    // iOS 설정
                    allowsBackForwardNavigationGestures: true,
                    // Android 설정
                    useWideViewPort: false,
                    // localhost 허용 (개발 모드)
                    allowUniversalAccessFromFileURLs: kDebugMode,
                    // 오버스크롤 비활성화
                    overScrollMode: OverScrollMode.NEVER,
                    disallowOverScroll: true,
                  ),
                  onWebViewCreated: (controller) {
                    _controller = controller;
                    widget.bridgeService.registerHandlers(controller);
                  },
                  onLoadStart: (controller, url) {
                    setState(() {
                      _isLoading = true;
                    });
                  },
                  onLoadStop: (controller, url) {
                    setState(() {
                      _isLoading = false;
                    });
                  },
                  onReceivedError: (controller, request, error) {
                    // 메인 프레임 로드 실패 시에만 에러 화면 표시
                    if (request.isForMainFrame ?? false) {
                      setState(() {
                        _hasError = true;
                        _isLoading = false;
                      });
                    }
                  },
                  // 외부 링크는 시스템 브라우저로 열기
                  shouldOverrideUrlLoading:
                      (controller, navigationAction) async {
                    final url = navigationAction.request.url;
                    if (url != null) {
                      final baseHost = Uri.parse(AppConfig.baseUrl).host;
                      // localhost나 배포 URL이 아닌 외부 링크
                      if (url.host != baseHost &&
                          url.host != 'localhost' &&
                          url.host != '127.0.0.1') {
                        return NavigationActionPolicy.CANCEL;
                      }
                    }
                    return NavigationActionPolicy.ALLOW;
                  },
                ),
              // 로딩 오버레이
              if (_isLoading && !_hasError) const SplashScreen(),
            ],
          ),
        ),
      ),
    );
  }
}
