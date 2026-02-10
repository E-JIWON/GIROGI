/// 앱 전역 상수
///
/// 애플리케이션 전체에서 사용되는 상수 값들을 정의합니다.
/// 매직 넘버를 방지하고 일관된 값 사용을 위해 중앙화합니다.
library;

/// 앱 전역 상수 클래스
class AppConstants {
  /// 외부에서 인스턴스 생성을 방지하기 위한 private 생성자
  AppConstants._();

  // ============================================================
  // API 관련 상수
  // ============================================================

  /// API 베이스 URL
  /// TODO: 실제 백엔드 배포 시 프로덕션 URL로 변경
  /// - 개발: http://localhost:3000
  /// - 프로덕션: https://api.yourapp.com
  static const String apiBaseUrl = 'http://localhost:3000';

  /// API 타임아웃 시간 (초)
  /// 네트워크 요청의 최대 대기 시간을 정의하기 위한 상수
  static const int apiTimeout = 30;

  // ============================================================
  // 데이터베이스 관련 상수
  // ============================================================

  /// Hive 박스 이름: 일일 기록
  /// TODO: Hive 로컬 DB 연동 시 사용
  static const String hiveBoxDailyRecords = 'daily_records';

  /// Hive 박스 이름: 사용자 정보
  /// TODO: Hive 로컬 DB 연동 시 사용
  static const String hiveBoxUsers = 'users';

  /// Hive 박스 이름: 게시글
  /// TODO: Hive 로컬 DB 연동 시 사용
  static const String hiveBoxPosts = 'posts';

  // ============================================================
  // 앱 설정 값
  // ============================================================

  /// 기본 페이지네이션 개수
  /// 피드, 게시글 목록 등에서 한 번에 로드할 아이템 수
  static const int defaultPageSize = 20;

  /// 프로필 사진 최대 크기 (MB)
  /// 이미지 업로드 시 파일 크기 제한을 위한 상수
  static const double maxProfileImageSizeMB = 5.0;

  /// 식사 사진 최대 개수
  /// 한 끼 식사에 첨부할 수 있는 최대 사진 수
  static const int maxMealPhotos = 3;

  // ============================================================
  // 행동 변화 로직 상수
  // ============================================================

  /// 핵심 미션 총 개수
  /// 일일 체크리스트 중 핵심 미션의 개수
  static const int totalCoreMissions = 3;

  /// 핵심 미션 최소 달성 개수
  /// 성공일로 인정받기 위해 달성해야 하는 최소 미션 수
  static const int minCoreMissionsForSuccess = 2;

  /// 치팅데이 획득 연속 일수
  /// 연속 성공 며칠 달성 시 치팅데이를 사용할 수 있는지 정의
  static const int daysForCheatDay = 7;

  /// 과자박스 사용 가능 연속 일수
  /// 과자박스를 사용하기 위해 필요한 최소 연속 성공 일수
  static const int daysForSnackBox = 3;

  /// 외식 주간 경고 임계값
  /// 일주일에 외식 몇 회 이상 시 경고를 표시할지 정의
  static const int weeklyDiningOutWarningThreshold = 3;

  /// 유혹 극복 타이머 시간 (분)
  /// Episodic Future Thinking 적용: 충동 지연 시간
  static const int temptationTimerMinutes = 10;

  /// 저작 횟수 목표
  /// Slow Eating 이론 적용: 한 입당 권장 씹는 횟수
  static const int targetChewCount = 30;

  // ============================================================
  // UI 관련 상수
  // ============================================================

  /// 기본 패딩 값
  /// 화면 전체의 좌우 패딩에 사용되는 기본값
  static const double defaultPadding = 16.0;

  /// 작은 패딩 값
  /// 컴포넌트 내부의 작은 여백에 사용
  static const double smallPadding = 8.0;

  /// 큰 패딩 값
  /// 섹션 구분 등 큰 여백에 사용
  static const double largePadding = 24.0;

  /// 기본 보더 라디우스
  /// 카드, 버튼 등의 둥근 모서리 반경
  static const double defaultBorderRadius = 12.0;

  /// 작은 보더 라디우스
  /// 작은 요소의 둥근 모서리 반경
  static const double smallBorderRadius = 8.0;

  /// 큰 보더 라디우스
  /// 모달, 바텀시트 등의 둥근 모서리 반경
  static const double largeBorderRadius = 20.0;

  /// 아이콘 기본 크기
  /// 일반적인 아이콘의 크기
  static const double defaultIconSize = 24.0;

  /// 작은 아이콘 크기
  /// 작은 버튼이나 인라인 아이콘 크기
  static const double smallIconSize = 16.0;

  /// 큰 아이콘 크기
  /// 강조 아이콘이나 일러스트레이션 크기
  static const double largeIconSize = 48.0;

  /// 프로필 이미지 기본 크기
  /// 피드, 댓글 등에서 사용되는 프로필 이미지 크기
  static const double defaultProfileImageSize = 40.0;

  /// 큰 프로필 이미지 크기
  /// 프로필 화면 상단의 프로필 이미지 크기
  static const double largeProfileImageSize = 80.0;

  // ============================================================
  // 애니메이션 관련 상수
  // ============================================================

  /// 기본 애니메이션 지속 시간 (밀리초)
  /// 화면 전환, 페이드 등 일반적인 애니메이션 시간
  static const int defaultAnimationDuration = 300;

  /// 빠른 애니메이션 지속 시간 (밀리초)
  /// 버튼 터치 피드백 등 짧은 애니메이션 시간
  static const int fastAnimationDuration = 150;

  /// 느린 애니메이션 지속 시간 (밀리초)
  /// 스플래시 화면 등 긴 애니메이션 시간
  static const int slowAnimationDuration = 500;

  // ============================================================
  // 정규식 패턴
  // ============================================================

  /// 닉네임 유효성 검증 패턴
  /// 한글, 영문, 숫자 조합 2-10자
  static const String nicknamePattern = r'^[가-힣a-zA-Z0-9]{2,10}$';

  /// 이메일 유효성 검증 패턴
  /// 표준 이메일 형식
  static const String emailPattern =
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';

  // ============================================================
  // 외부 링크
  // ============================================================

  /// 개인정보처리방침 URL
  /// TODO: 실제 정책 페이지 배포 후 URL 변경
  static const String privacyPolicyUrl = 'https://yourapp.com/privacy';

  /// 서비스 이용약관 URL
  /// TODO: 실제 약관 페이지 배포 후 URL 변경
  static const String termsOfServiceUrl = 'https://yourapp.com/terms';

  /// 고객센터 이메일
  /// 문의사항 접수를 위한 이메일 주소
  static const String supportEmail = 'support@yourapp.com';
}
