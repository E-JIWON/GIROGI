import Cocoa
import FlutterMacOS

class MainFlutterWindow: NSWindow {
  private var trackingArea: NSTrackingArea?
  private let trafficLightButtons: [NSWindow.ButtonType] = [.closeButton, .miniaturizeButton, .zoomButton]

  override func awakeFromNib() {
    let flutterViewController = FlutterViewController()
    self.contentViewController = flutterViewController

    // 화면 중앙 배치
    let windowSize = NSSize(width: 1080, height: 720)
    if let screen = NSScreen.main {
      let screenFrame = screen.visibleFrame
      let x = screenFrame.midX - windowSize.width / 2
      let y = screenFrame.midY - windowSize.height / 2
      self.setFrame(NSRect(x: x, y: y, width: windowSize.width, height: windowSize.height), display: true)
    }

    // 타이틀바 제거 + 콘텐츠 확장
    self.titlebarAppearsTransparent = true
    self.titleVisibility = .hidden
    self.styleMask.insert(.fullSizeContentView)

    // 창 드래그 가능하도록
    self.isMovableByWindowBackground = true

    // 최소 크기
    self.minSize = NSSize(width: 600, height: 400)

    // 신호등 버튼 기본 숨김
    setTrafficLightsHidden(true)

    // 호버 감지 영역 설정
    setupTrackingArea()

    RegisterGeneratedPlugins(registry: flutterViewController)

    super.awakeFromNib()
  }

  private func setTrafficLightsHidden(_ hidden: Bool) {
    for buttonType in trafficLightButtons {
      standardWindowButton(buttonType)?.alphaValue = hidden ? 0 : 1
    }
  }

  private func setupTrackingArea() {
    guard let contentView = self.contentView else { return }
    // 타이틀바 영역 (상단 40px)
    let trackingRect = NSRect(x: 0, y: contentView.bounds.height - 40, width: 80, height: 40)
    trackingArea = NSTrackingArea(
      rect: trackingRect,
      options: [.mouseEnteredAndExited, .activeAlways, .inVisibleRect],
      owner: self,
      userInfo: nil
    )
    contentView.addTrackingArea(trackingArea!)
  }

  override func mouseEntered(with event: NSEvent) {
    NSAnimationContext.runAnimationGroup { context in
      context.duration = 0.15
      setTrafficLightsHidden(false)
    }
  }

  override func mouseExited(with event: NSEvent) {
    NSAnimationContext.runAnimationGroup { context in
      context.duration = 0.15
      setTrafficLightsHidden(true)
    }
  }
}
