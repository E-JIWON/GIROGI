/**
 * Flutter 네이티브 브릿지 유틸리티
 * WebView 내에서 Flutter 네이티브 기능을 호출하기 위한 인터페이스
 */

/** User-Agent로 앱 내 실행 여부 감지 */
export function isRunningInApp(): boolean {
  if (typeof window === 'undefined') return false
  return (
    navigator.userAgent.includes('GIROGI-App') ||
    !!window.flutter_inappwebview
  )
}

/** Flutter 네이티브 기능 호출 */
async function callNative<T = unknown>(
  handler: string,
  ...args: unknown[]
): Promise<T | null> {
  if (!window.flutter_inappwebview) return null
  try {
    const result = await window.flutter_inappwebview.callHandler(handler, ...args)
    return result as T
  } catch {
    console.warn(`[NativeBridge] ${handler} 호출 실패`)
    return null
  }
}

/** 네이티브 푸시알림 예약 */
export async function scheduleNotification(params: {
  id?: number
  title: string
  body: string
  delaySeconds: number
}): Promise<boolean> {
  const result = await callNative<{ success: boolean }>('scheduleNotification', params)
  return result?.success ?? false
}

/** 네이티브 푸시알림 즉시 표시 */
export async function showNotification(params: {
  id?: number
  title: string
  body: string
}): Promise<boolean> {
  const result = await callNative<{ success: boolean }>('showNotification', params)
  return result?.success ?? false
}

/** 햅틱 피드백 */
export async function hapticFeedback(
  type: 'light' | 'medium' | 'heavy' | 'selection' = 'medium'
): Promise<void> {
  await callNative('hapticFeedback', type)
}

/** 앱 버전 정보 */
export async function getAppInfo(): Promise<{
  appName: string
  packageName: string
  version: string
  buildNumber: string
} | null> {
  return callNative('getAppInfo')
}
