/**
 * flutter_inappwebview JS 브릿지 타입 선언
 * Flutter 앱 내에서 실행될 때 window.flutter_inappwebview가 주입됨
 */
interface FlutterInAppWebView {
  callHandler(handlerName: string, ...args: unknown[]): Promise<unknown>
}

interface Window {
  flutter_inappwebview?: FlutterInAppWebView
}
