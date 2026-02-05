# 오늘부터 다시 - Diet Tracker Application

## 프로젝트 개요

행동경제학 및 심리학 연구 기반의 다이어트 지원 애플리케이션입니다. 의지력 의존적 접근이 아닌 시스템적 환경 설계를 통해 지속 가능한 행동 변화를 유도합니다.

### 핵심 목표

타겟 사용자인 바쁜 직장인을 위한 과학적 근거 기반의 다이어트 관리 시스템 구축. 실패 후 자기비난을 최소화하고 즉각적인 복귀를 지원하는 자기 연민(Self-Compassion) 메커니즘을 통해 장기 지속률을 향상시킵니다.

### 적용 연구 및 이론적 기반

**Episodic Future Thinking (EFT)**
- 출처: International Journal of Nursing Studies (2024)
- 효과: 충동적 섭취 행동 억제, BMI 감소
- 구현: 유혹 상황에서 미래 자아 시각화 인터페이스 제공

**Temptation Bundling**
- 출처: Katy Milkman, Wharton School
- 효과: 운동 참여율 10-14% 증가
- 구현: 긍정적 행동과 보상을 결합한 인센티브 시스템

**Implementation Intention**
- 출처: Peter Gollwitzer
- 효과: 목표 달성률 증대
- 구현: "When-Where-What" 구조화된 체크리스트

**Tiny Habits Methodology**
- 출처: BJ Fogg, Stanford Behavior Design Lab
- 효과: 저항 최소화 습관 형성
- 구현: 최소 행동 단위 기반 미션 설계

**Self-Compassion Theory**
- 출처: British Journal of Health Psychology (2021)
- 효과: 실패 후 복귀율 증가, 지속 의지 강화
- 구현: 실패 리포트 및 긍정적 피드백 루프

**Slow Eating Research**
- 출처: Scientific Reports (2021), Nutrients (2025)
- 효과: 식이유발 열 생성 증가, 포만감 향상
- 구현: 저작 횟수 추적 및 리마인더

---

## 기술 아키텍처

### 기술 스택

**Frontend Framework**
- Flutter 3.38.5 / Dart 3.10.4
- 크로스 플랫폼 네이티브 렌더링

**상태 관리**
- Riverpod (Provider 패턴 기반 반응형 상태 관리)

**데이터 영속성**
- 개발 단계: Mock Repository Pattern
- 프로덕션 전환 예정: Hive (NoSQL) 또는 SQLite + Drift (ORM)

**백엔드 인프라**
- 개발 단계: Mock Data Layer
- 프로덕션 후보: Firebase (BaaS) 또는 Supabase (오픈소스 Firebase 대안)

**UI/UX 라이브러리**
- fl_chart: 데이터 시각화 및 비교 그래프
- Lottie: 마이크로 인터랙션 애니메이션
- image_picker: 네이티브 이미지 선택
- cached_network_image: 이미지 캐싱 및 성능 최적화
- youtube_player_flutter: 임베디드 비디오 재생

### 아키텍처 패턴

**Clean Architecture** 기반 레이어 분리

```
lib/
├── app.dart                          # 루트 위젯 (MaterialApp 설정)
├── main.dart                         # 애플리케이션 진입점
│
├── core/                             # 공통 모듈 레이어
│   ├── constants/                    # 앱 전역 상수 (API, 설정값)
│   ├── theme/                        # 디자인 시스템 (색상, 타이포그래피)
│   └── utils/                        # 공통 유틸리티 (포매터, 검증)
│
├── data/                             # 데이터 레이어
│   ├── models/                       # DTO (JSON 직렬화 모델)
│   ├── repositories/                 # Repository 구현 (Mock/실제 DB)
│   └── local_storage/                # 로컬 영속성 (Hive/SQLite)
│
├── domain/                           # 도메인 레이어
│   ├── entities/                     # 비즈니스 엔티티 (순수 객체)
│   └── usecases/                     # UseCase (비즈니스 로직 캡슐화)
│
└── presentation/                     # 프레젠테이션 레이어
    ├── screens/                      # 화면 단위 UI
    │   ├── home/                     # 홈 화면 (스트릭, 미션, 캘린더)
    │   ├── checklist/                # 체크리스트 화면 (시간대별 체크)
    │   ├── community/                # 커뮤니티 화면 (피드, 숏츠)
    │   ├── emergency/                # 유혹 극복 화면 (타이머, 자기 연민)
    │   ├── profile/                  # 프로필 화면 (다중 탭)
    │   └── report/                   # 리포트 화면 (비교 그래프)
    │
    ├── widgets/                      # 재사용 가능 컴포넌트
    │   ├── common/                   # 공통 위젯 (버튼, 카드 등)
    │   ├── timeline/                 # 타임라인 위젯
    │   ├── reaction/                 # 리액션/댓글 위젯
    │   └── chart/                    # 차트 위젯
    │
    └── providers/                    # Riverpod 상태 관리
```

### 설계 원칙

**Low Coupling, High Cohesion**
- 모듈 간 의존성 최소화
- 단일 책임 원칙 준수
- 인터페이스 기반 추상화

**Reusability & Maintainability**
- 컴포넌트 재사용성 최대화
- 적절한 추상화 레벨 유지
- 과도한 파편화 방지

**Documentation & Code Quality**
- 모든 함수 및 변수에 목적 기반 주석
- Mock 데이터 영역에 TODO 마커 명시
- 실제 DB 연동 전환 지점 문서화

---

## 구현 현황

### 완료된 구현

**Phase 1: 프로젝트 초기화 및 아키텍처 설계**
- Flutter 프로젝트 생성 및 초기 설정
- Clean Architecture 기반 폴더 구조 구축
- 레이어별 책임 분리 (core/data/domain/presentation)

**Phase 2: 데이터 모델 레이어 (14개 모델)**

심리학 이론을 반영한 완전한 데이터 모델 구현:

*기본 타입 및 체크리스트:*
- Enum 타입 정의 (8종) + Extension (한글명, 아이콘)
- ChecklistItem: Implementation Intention 기반 구조화
- Comment: 커뮤니티 댓글 시스템
- Reaction: 6종 감정 표현 + 집계 유틸리티

*식사 및 건강 추적:*
- MealRecord: Slow Eating 이론 기반 식사 기록
- WeightRecord: 체중 변화 추적

*동기부여 시스템:*
- RewardStatus: Temptation Bundling 보상 로직
- UserGoals: Episodic Future Thinking 미래 비전

*통합 기록 및 사용자:*
- DailyRecord: 일일 활동 통합 기록
- User: 커뮤니티 프로필 + 소셜 기능

*소셜 기능:*
- SharedRecord: 기록 공유 시스템
- FailureReport: Self-Compassion 실패 기록
- Post: 다양한 타입의 커뮤니티 게시글

*통계 및 분석:*
- UserStats: 듀오링고 스타일 비교 통계

**모델 설계 특징:**
- 불변 객체 패턴 (copyWith)
- JSON 직렬화/역직렬화
- 헬퍼 클래스 및 Extension
- TODO 마커로 DB 전환 지점 명시
- 모든 필드 목적 기반 상세 주석

**Phase 3: Repository 레이어 (6개 Repository)**

Repository 패턴으로 데이터 소스를 추상화:

*Repository 인터페이스:*
- DailyRecordRepository: 일일 기록 CRUD 및 통계 계산
- UserRepository: 사용자 프로필 및 팔로우 관리
- PostRepository: 커뮤니티 게시글, 리액션, 댓글 관리

*Mock 구현체 (메모리 기반):*
- MockDailyRecordRepository: 7일간 샘플 데이터
- MockUserRepository: 4명의 테스트 사용자
- MockPostRepository: 다양한 타입의 샘플 게시글

**Repository 설계 특징:**
- 인터페이스 기반 추상화 (의존성 역전)
- Mock 구현체로 UI 개발 즉시 가능
- TODO 마커로 실제 DB 전환 지점 명시
  - Hive/SQLite 로컬 DB 옵션
  - Firebase/Supabase 클라우드 옵션
- 비즈니스 로직 메서드 (연속 성공 계산 등)
- 샘플 데이터로 테스트 시나리오 지원

### 다음 단계

- 테마 및 디자인 시스템 정의
- 하단 네비게이션 바 구현
- 화면별 UI 구현 (홈, 체크리스트, 커뮤니티 등)

---

## 주요 기능

### 홈 대시보드
- 연속 성공 일수 추적 (Streak Counter)
- 일일 핵심 미션 관리 (3개 미션 중 2개 이상 달성)
- 주간 성공률 캘린더 시각화
- 보상 시스템 현황 (과자박스 적립, 치팅데이 카운트다운)

### 체크리스트 시스템
- 시간대별 행동 체크리스트 (아침/점심/퇴근/저녁/운동)
- 식사 기록 (장소, 메뉴, 사진, 준수 행동 다중 선택)
- 주간 외식 빈도 모니터링 및 경고

### 유혹 극복 인터페이스
- 10분 타이머 기반 충동 지연 메커니즘
- 미래 자아 시각화 (Episodic Future Thinking)
- 자기 연민 모드 (실패 후 즉각 복귀 지원)
- 실패 리포트 생성 및 커뮤니티 공유

### 소셜 커뮤니티
- 성공/실패 경험 공유 피드
- 리액션 시스템 (감정 표현 6종)
- 댓글 기반 상호 지원
- 유튜브 숏츠 형식 동기부여 콘텐츠
- 사용자 식사 타임라인 타임라인 뷰

### 프로필 및 소셜 기능
- 다중 탭 프로필 (미션, 체크리스트, 식사 타임라인, 기록 히스토리)
- 팔로우/팔로잉 네트워크
- 타 사용자 데이터 열람 (공개 범위 설정)
- 응원 댓글 및 리액션

### 비교 분석 리포트
- 듀오링고 스타일 친구 비교 그래프
- 주간 습관 달성률 시각화
- 체중 변화 추이 비교 (동의 기반)
- 유혹 극복 빈도 통계

---

## 프로젝트 메타데이터

**패키지 식별자**: com.girogi.diet_tracker_app
**프로젝트명**: diet_tracker_app
**최소 지원 버전**: iOS 12.0+, Android API Level 21+

---

## 개발 환경 설정

### 의존성 설치 및 실행

```bash
cd diet_tracker_app
flutter pub get
flutter run
```

### 프로덕션 빌드

```bash
# iOS
flutter build ios --release

# Android
flutter build apk --release
flutter build appbundle --release
```

---

## 라이선스

MIT License

---

**최종 수정일**: 2026-02-05 (Phase 3: Repository 레이어 완료)
