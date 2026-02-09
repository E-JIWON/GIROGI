# GIROGI (기로기) - 개발 및 비즈니스 상세 문서

> 행동경제학과 심리학 연구 기반의 과학적 다이어트 앱
>
> **작성일**: 2026-02-05
> **버전**: MVP 1.0
> **상태**: Phase 1-11 완료 (프로덕션 준비 단계)

---

## 📋 목차

1. [프로젝트 개요 및 비전](#1-프로젝트-개요-및-비전)
2. [비즈니스 모델 및 시장 분석](#2-비즈니스-모델-및-시장-분석)
3. [기술 아키텍처 상세](#3-기술-아키텍처-상세)
4. [구현 완료 내역 (Phase 1-11)](#4-구현-완료-내역-phase-1-11)
5. [파일 구조 및 역할](#5-파일-구조-및-역할)
6. [코드 수정 가이드](#6-코드-수정-가이드)
7. [심리학 이론 적용 상세](#7-심리학-이론-적용-상세)
8. [데이터 흐름 및 상태 관리](#8-데이터-흐름-및-상태-관리)
9. [프로덕션 준비 로드맵](#9-프로덕션-준비-로드맵)
10. [비즈니스 성장 전략](#10-비즈니스-성장-전략)
11. [FAQ 및 트러블슈팅](#11-faq-및-트러블슈팅)
12. [13단계 작업 방식 참고](#12-13단계-작업-방식-참고)

---

## ⚠️ 중요: 작업 전 필수 확인

이 프로젝트는 **체계적인 13단계 개발 방식**으로 진행되었습니다.

### 📂 작업 시 참고 문서 순서

1. **`.claude/GIROGI_프로젝트_계획_및_진행사항.md`** ← 먼저 읽기!

   - Phase 1-11 상세 구현 내역
   - 각 단계별 생성 파일 목록
   - 커밋 히스토리
   - 진행도 요약

2. **`CLAUDE.md`** (이 문서)

   - 종합 개발 가이드
   - 코드 수정 방법
   - 비즈니스 전략

3. **`README.md`**
   - 프로젝트 전체 개요
   - 사용자 관점 문서

### 다른 세션에서 작업할 때

```
1. .claude/GIROGI_프로젝트_계획_및_진행사항.md 읽기
2. 현재 진행 중인 Phase 확인
3. 해당 Phase의 커밋 히스토리 참고
4. 동일한 패턴(구현 → 문서 → 커밋) 유지
```

**핵심**: 13단계 방식을 따르면 유지보수가 쉽습니다!

자세한 내용은 이 문서의 [12. 13단계 작업 방식 참고](#12-13단계-작업-방식-참고) 섹션을 확인하세요.

---

## 1. 프로젝트 개요 및 비전

### 1.1 핵심 문제 정의

**기존 다이어트 앱의 한계:**

- 단순한 칼로리 계산 및 운동 기록에 집중
- 의지력에만 의존하는 접근 방식 → 70% 이상이 3개월 내 포기
- 실패 시 자기비난으로 이어지는 악순환
- 사용자 간 경쟁만 강조하여 스트레스 증가
- 과학적 근거 부족

**타겟 사용자 페인 포인트:**

- **바쁜 직장인**: 복잡한 기록은 부담스러움
- **반복된 실패 경험자**: 동기부여 상실, 자기비난
- **외식이 잦은 사람**: 외부 유혹 관리 어려움
- **의지력 부족 호소자**: 시스템적 해결책 필요

### 1.2 솔루션 (GIROGI의 차별점)

#### 과학적 근거 기반

- **6가지 심리학/행동경제학 이론** 적용
- 국제 저널 논문 기반 (IJNS 2024, BJP 2021 등)
- 의지력이 아닌 **환경 설계**로 행동 변화 유도

#### 자기 연민 (Self-Compassion) 메커니즘

- 실패를 성장의 기회로 전환
- 즉각적인 복귀 지원 (실패 리포트 시스템)
- 자기비난 최소화 → 장기 지속률 향상

#### 소셜 지원 네트워크

- 경쟁이 아닌 **상호 응원** 문화
- 실패 경험 공유로 공감대 형성
- 6종 감정 리액션 (단순 좋아요를 넘어선 감정 표현)

#### 유혹 관리 시스템

- 10분 타이머 (충동 지연 메커니즘)
- 미래 자아 시각화 (EFT 이론)
- 즉각적 개입으로 외식/야식 유혹 차단

### 1.3 프로젝트 비전

**단기 목표 (6개월)**

- MVP 출시 및 초기 사용자 1,000명 확보
- 3개월 지속률 50% 이상 달성 (업계 평균 30%)
- 사용자 피드백 기반 기능 개선

**중기 목표 (1년)**

- 사용자 10만명 확보
- 프리미엄 구독 모델 론칭
- 기업 웰니스 프로그램 B2B 진출

**장기 비전 (3년)**

- 국내 1위 과학적 다이어트 플랫폼
- 건강관리 전반으로 확장 (운동, 수면, 스트레스)
- 의료기관 연계 (영양사, 심리상담사)

---

## 2. 비즈니스 모델 및 시장 분석

### 2.1 시장 규모 및 기회

**국내 다이어트 시장**

- 전체 시장 규모: 약 5조원 (2024년 기준)
- 다이어트 앱 시장: 약 500억원
- 연평균 성장률: 15-20%

**경쟁사 분석**
| 앱 이름 | 강점 | 약점 | GIROGI 차별점 |
|---------|------|------|---------------|
| 눔코치 | 심리 코칭 | 높은 가격 ($59/월) | 무료+프리미엄, 과학적 근거 |
| 다노샵 | 커뮤니티 활성화 | 제품 판매 중심 | 순수 행동 변화 집중 |
| 삼성헬스 | 종합 건강관리 | 다이어트 특화 부족 | 다이어트 전문성 |
| MyFitnessPal | 글로벌 1위 | 칼로리 계산 중심 | 심리학 기반 접근 |

### 2.2 수익 모델

#### Phase 1: 무료 모델 (사용자 확보)

- 전체 기능 무료 제공
- 광고 없는 깨끗한 UX
- 목표: 초기 사용자 10,000명 확보

#### Phase 2: 프리미엄 구독 (Freemium)

**무료 기능:**

- 기본 체크리스트
- 커뮤니티 참여
- 홈 화면 (Streak, 미션)

**프리미엄 기능 (₩9,900/월, ₩99,000/년):**

- 무제한 식사 기록 (사진 업로드)
- 상세 분석 리포트
- 친구 비교 그래프
- 개인 맞춤 미션 AI 추천
- 영양사 1:1 상담 (월 1회)
- 광고 제거

#### Phase 3: B2B 기업 웰니스

- 기업 건강관리 프로그램 제공
- 대시보드로 직원 건강 모니터링
- 가격: ₩5,000/인/월 (최소 100명)

#### Phase 4: 데이터 마네타이제이션

- 익명화된 건강 데이터 분석
- 연구기관/제약사 제휴
- 개인정보 보호법 완전 준수

### 2.3 성장 전략

**바이럴 마케팅**

- 친구 초대 시 양쪽 7일 프리미엄 제공
- 성공 스토리 커뮤니티 공유 기능
- 인스타그램/틱톡 숏폼 콘텐츠

**파트너십**

- 피트니스 센터 제휴 (할인 쿠폰)
- 건강식품 브랜드 협업
- 의료기관 연계 (건강검진 연동)

**콘텐츠 마케팅**

- 블로그: 심리학 기반 다이어트 팁
- 유튜브 채널: 전문가 인터뷰
- 네이버 카페: 사용자 커뮤니티

### 2.4 투자 유치 전략

**Seed 라운드 (목표: 5억원)**

- 용도: 프로덕션 개발 완료, 초기 마케팅
- 밸류에이션: 20억원
- 지분: 25%

**Series A (목표: 30억원)**

- 용도: 팀 확장, 본격 마케팅, B2B 진출
- 조건: MAU 50,000명, 3개월 지속률 50%+

**투자 포인트**

1. **과학적 근거**: 6개 논문 기반 차별화
2. **높은 지속률**: Self-Compassion으로 이탈 방지
3. **소셜 네트워크 효과**: 바이럴 성장 가능
4. **확장 가능성**: 건강관리 전반으로 확장
5. **B2B 시장**: 기업 웰니스 블루오션

---

## 3. 기술 아키텍처 상세

### 3.1 전체 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │Checklist │  │Emergency │  │Community │   │
│  │  Screen  │  │  Screen  │  │  Screen  │  │  Screen  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │               │             │          │
│       └─────────────┴───────────────┴─────────────┘          │
│                            │                                  │
│                      ┌─────▼─────┐                          │
│                      │ Providers │ (Riverpod - 향후 추가)    │
│                      └─────┬─────┘                          │
└────────────────────────────┼──────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────┐
│                      Domain Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  UseCases    │  │   Entities   │  │  Validators  │   │
│  │ (비즈니스 로직)│  │  (순수 객체)  │  │  (검증 로직)  │   │
│  └──────┬───────┘  └──────────────┘  └──────────────┘   │
└─────────┼──────────────────────────────────────────────┘
          │
┌─────────▼──────────────────────────────────────────────────┐
│                       Data Layer                            │
│  ┌───────────────────┐        ┌───────────────────┐       │
│  │   Repositories    │◄──────►│      Models       │       │
│  │  (인터페이스)      │        │  (JSON 직렬화)     │       │
│  └─────────┬─────────┘        └───────────────────┘       │
│            │                                                │
│  ┌─────────▼─────────┐        ┌───────────────────┐       │
│  │  Mock Repository  │        │  Real Repository  │       │
│  │  (현재 단계)       │        │  (향후 구현)       │       │
│  └───────────────────┘        └─────────┬─────────┘       │
└───────────────────────────────────────────┼────────────────┘
                                            │
                         ┌──────────────────▼──────────────┐
                         │   Local DB (Hive/SQLite)        │
                         └──────────────────┬──────────────┘
                                            │
                         ┌──────────────────▼──────────────┐
                         │   Backend (Firebase/Supabase)   │
                         └─────────────────────────────────┘
```

### 3.2 Clean Architecture 레이어 설명

#### Presentation Layer (UI)

- **역할**: 사용자 인터페이스 렌더링, 사용자 입력 처리
- **기술**: Flutter Widgets, Material Design 3
- **특징**:
  - 비즈니스 로직 없음 (순수 UI)
  - StatefulWidget으로 로컬 상태 관리
  - 향후 Riverpod Provider로 전역 상태 관리

#### Domain Layer (비즈니스 로직)

- **역할**: 앱의 핵심 비즈니스 규칙
- **구성요소**:
  - **Entities**: 불변 비즈니스 객체 (예: 연속 성공 계산 로직)
  - **UseCases**: 특정 기능 수행 (예: "미션 완료 처리", "리액션 추가")
  - **Validators**: 입력 검증 (예: 닉네임 유효성 검사)
- **특징**: 프레임워크 독립적 (Flutter 없이도 테스트 가능)

#### Data Layer (데이터 관리)

- **역할**: 데이터 소스 추상화 및 관리
- **구성요소**:
  - **Repository Interface**: 추상 인터페이스
  - **Mock Repository**: 현재 구현 (메모리 기반)
  - **Real Repository**: 향후 구현 (DB 연동)
  - **Models**: JSON 직렬화 가능한 DTO

### 3.3 현재 데이터 흐름 (Mock Repository)

```
1. 사용자 화면 진입 (예: HomeScreen)
   ↓
2. StatefulWidget initState에서 데이터 요청
   ↓
3. MockRepository에서 하드코딩된 샘플 데이터 반환
   ↓
4. setState()로 화면 업데이트
   ↓
5. 사용자 액션 (예: 미션 체크)
   ↓
6. 로컬 상태 업데이트 (실제 DB 저장 X)
```

**주의사항**: 현재는 앱 종료 시 데이터 손실됨 (메모리 기반)

### 3.4 향후 데이터 흐름 (Production)

```
1. 사용자 화면 진입
   ↓
2. Riverpod Provider를 통해 데이터 요청
   ↓
3. Repository가 로컬 DB 먼저 확인 (Offline-first)
   ↓
4. 로컬 데이터 있으면 즉시 반환 → 화면 업데이트
   ↓
5. 백그라운드에서 서버 동기화 시도
   ↓
6. 서버 데이터 수신 시 로컬 DB 업데이트 → 화면 재렌더링
   ↓
7. 사용자 액션 발생 시:
   - 로컬 DB 즉시 업데이트 (Optimistic Update)
   - 백그라운드에서 서버 전송
   - 실패 시 재시도 큐에 추가
```

### 3.5 기술 스택 선택 이유

| 기술           | 선택 이유                                | 대안                                                        |
| -------------- | ---------------------------------------- | ----------------------------------------------------------- |
| **Flutter**    | 크로스 플랫폼, 빠른 개발, 네이티브 성능  | React Native (느림), Native (개발 비용 2배)                 |
| **Riverpod**   | 타입 안전, 테스트 용이, Provider 개선판  | Bloc (보일러플레이트 많음), GetX (너무 magic)               |
| **Hive**       | Flutter 최적화 NoSQL, 빠른 속도          | SQLite (관계형 불필요), SharedPreferences (복잡한 데이터 X) |
| **Firebase**   | BaaS로 빠른 백엔드 구축, 푸시 알림, 인증 | Supabase (오픈소스), 자체 백엔드 (시간/비용)                |
| **Material 3** | 최신 디자인 시스템, 접근성               | Cupertino (iOS만), 커스텀 (시간 소요)                       |

---

## 4. 구현 완료 내역 (Phase 1-11)

### Phase 1: 프로젝트 초기화

**일자**: 2026-02-05
**커밋**: `dccebca`

**작업 내용**:

- Flutter 프로젝트 생성 (`flutter create`)
- Clean Architecture 폴더 구조 생성
- `main.dart`, `app.dart` 진입점 설정
- `pubspec.yaml` 의존성 초기 설정

**파일**:

- `lib/main.dart`: 앱 진입점
- `lib/app.dart`: MaterialApp 루트 위젯
- `lib/core/`, `lib/data/`, `lib/domain/`, `lib/presentation/` 폴더 생성

---

### Phase 2: 데이터 모델 레이어 (14개 모델)

**일자**: 2026-02-05
**커밋**: `8656738`

**작업 내용**:

1. **Enums 정의** (`lib/data/models/enums.dart`)

   - `MealTime`: 아침/점심/저녁 (아이콘, 한글명 Extension)
   - `MealLocation`: 집/외식/배달
   - `ChecklistCategory`: 체크리스트 카테고리
   - `PostType`: 게시글 타입 5종
   - 기타 4개 Enum

2. **핵심 모델 14개 구현**
   - `ChecklistItem`: 체크리스트 항목
   - `Comment`: 댓글 (내용, 작성자, 시간)
   - `DailyRecord`: 일일 통합 기록 (미션, 체크리스트, 식사, 체중)
   - `FailureReport`: 실패 리포트 (상황, 원인, 대응 방안)
   - `MealRecord`: 식사 기록 (사진, 장소, 메뉴, 준수 행동, 저작 횟수)
   - `Post`: 게시글 (5가지 타입 지원)
   - `Reaction`: 6종 감정 리액션 + 집계 메서드
   - `RewardStatus`: 보상 현황 (과자박스, 치팅데이)
   - `SharedRecord`: 기록 공유
   - `User`: 사용자 (프로필, 팔로우, 통계)
   - `UserGoals`: 사용자 목표 (EFT)
   - `UserStats`: 비교 통계 (듀오링고 스타일)
   - `WeightRecord`: 체중 기록

**설계 특징**:

- 모든 모델 `@immutable` (불변 객체)
- `copyWith()` 메서드로 수정 지원
- `toJson()`, `fromJson()` 직렬화
- 필드마다 상세 주석
- TODO 마커로 DB 연동 지점 명시

---

### Phase 3: Repository 레이어

**일자**: 2026-02-05
**커밋**: `df2a493`

**작업 내용**:

1. **Repository 인터페이스 정의**

   - `DailyRecordRepository`: 일일 기록 CRUD
   - `UserRepository`: 사용자 관리
   - `PostRepository`: 게시글/댓글 관리

2. **Mock 구현체**
   - `MockDailyRecordRepository`: 7일 샘플 데이터
   - `MockUserRepository`: 4명 테스트 사용자
   - `MockPostRepository`: 다양한 게시글

**Mock 데이터 예시**:

```dart
// MockDailyRecordRepository
// - 지난 7일간 데이터 자동 생성
// - 성공/실패 패턴 포함 (월~금 성공, 목요일 실패)
// - 각 날짜마다 3개 미션, 체크리스트, 식사 기록

// MockUserRepository
// - 본인 + 친구 3명
// - 팔로우/팔로워 관계 설정
// - 프로필 이미지 URL (임시)

// MockPostRepository
// - 5가지 타입 게시글 각 2개씩
// - 리액션, 댓글 포함
```

---

### Phase 4: Core 레이어 (디자인 시스템)

**일자**: 2026-02-05
**커밋**: `f205574`

**작업 내용**:

1. **AppConstants** (`lib/core/constants/app_constants.dart`)

   - API 상수, DB 상수, UI 상수, 애니메이션 상수
   - 행동 변화 로직 상수 (예: `minCoreMissionsForSuccess = 2`)

2. **AppColors** (`lib/core/theme/app_colors.dart`)

   - Primary: #6366F1 (인디고) → 신뢰감, 안정감
   - Success: #10B981 (초록)
   - Warning: #F59E0B (주황)
   - Error: #EF4444 (빨강)
   - Semantic 색상 + Neutral Grey 계열
   - 기능별 색상 (Streak 그라데이션, 자기 연민 핑크)

3. **AppTypography** (`lib/core/theme/app_typography.dart`)

   - Material 3 타이포그래피 시스템
   - Display, Headline, Title, Body, Label, Caption
   - Custom: `streakCounter` (64sp), `timerDisplay` (48sp)

4. **AppTheme** (`lib/core/theme/app_theme.dart`)
   - Light/Dark 모드 ThemeData
   - ColorScheme, TextTheme, ButtonTheme, CardTheme 등

---

### Phase 5: 메인 네비게이션

**일자**: 2026-02-05
**커밋**: `a261455`

**작업 내용**:

- `MainNavigation` 위젯 (`lib/presentation/navigation/main_navigation.dart`)
- 하단 네비게이션 바 (BottomNavigationBar)
- 5개 탭: 홈, 체크리스트, 유혹 극복(중앙 강조), 커뮤니티, 프로필
- IndexedStack으로 화면 전환 (상태 유지)
- 각 화면 스켈레톤 파일 생성

---

### Phase 6: 홈 화면

**일자**: 2026-02-05
**커밋**: `1832a67`

**파일**:

- `lib/presentation/screens/home/home_screen.dart`
- `lib/presentation/widgets/home/streak_counter.dart`
- `lib/presentation/widgets/home/mission_card.dart`
- `lib/presentation/widgets/home/weekly_calendar.dart`
- `lib/presentation/widgets/home/reward_status_card.dart`

**주요 기능**:

1. **StreakCounter**:

   - 그라데이션 배경 (주황→빨강)
   - 현재 Streak 큰 글씨 (64sp)
   - 최고 기록 작은 글씨

2. **MissionCard**:

   - 3개 미션 표시
   - 체크/언체크 토글
   - 완료 시 초록색 + 취소선

3. **WeeklyCalendar**:

   - 월~일 7일 표시
   - 성공: 초록 원 + 체크
   - 실패: 빨강 원 + X
   - 미래: 회색 빈 원

4. **RewardStatusCard**:
   - 과자박스 개수 표시
   - 치팅데이 카운트다운
   - 보상 규칙 설명 (3일마다 과자박스, 7일마다 치팅데이)

**데이터 흐름**:

```dart
class _HomeScreenState extends State<HomeScreen> {
  int currentStreak = 5; // 하드코딩
  List<Map<String, dynamic>> missions = [...]; // 샘플 데이터

  void _toggleMission(int index) {
    setState(() {
      missions[index]['isCompleted'] = !missions[index]['isCompleted'];
    });
  }
}
```

---

### Phase 7: 체크리스트 화면

**일자**: 2026-02-05
**커밋**: `d5daca2`

**파일**:

- `lib/presentation/screens/checklist/checklist_screen.dart`
- `lib/presentation/widgets/checklist/checklist_time_section.dart`
- `lib/presentation/widgets/checklist/meal_record_button.dart`

**주요 기능**:

1. **ChecklistTimeSection**:

   - 시간대 헤더 (아이콘, 라벨, 완료 카운터)
   - 체크리스트 항목 리스트
   - 완료 항목 취소선 + 회색 처리

2. **MealRecordButton**:

   - 미기록: 흰색 카드 + 레스토랑 아이콘
   - 기록 완료: 초록색 카드 + 체크 아이콘

3. **외식 경고**:
   - `weeklyDiningOutCount >= 3`이면 경고 표시
   - 주황색 컨테이너 + 경고 아이콘

---

### Phase 8: 유혹 극복 화면

**일자**: 2026-02-05
**커밋**: `926ce40`

**파일**:

- `lib/presentation/screens/emergency/emergency_screen.dart`
- `lib/presentation/widgets/emergency/temptation_timer.dart`
- `lib/presentation/widgets/emergency/future_self_card.dart`
- `lib/presentation/widgets/emergency/self_compassion_card.dart`
- `lib/presentation/widgets/emergency/failure_report_dialog.dart`

**주요 기능**:

1. **TemptationTimer** (10분 타이머):

   - CircularProgressIndicator로 진행률 표시
   - 시작/일시정지/재시작/리셋 버튼
   - 완료 후 선택지:
     - "유혹 사라짐" → 성공 기록
     - "먹었습니다" → 자기 연민 모드

2. **FutureSelfCard**:

   - 목표 이미지 업로드 플레이스홀더
   - 목표 체중 vs 현재 체중
   - D-90 같은 카운트다운
   - 동기부여 메시지 4줄

3. **SelfCompassionCard**:

   - 핑크색 컨테이너
   - 자기 연민 메시지 ("완벽한 사람은 없습니다")
   - 전체 성공률 통계 (38/45 = 84%)
   - "다시 시작하기" 버튼

4. **FailureReportDialog**:
   - 3단계 질문:
     - 어떤 상황이었나요?
     - 왜 실패했나요?
     - 다음엔 어떻게 할까요?
   - 커뮤니티 공유 체크박스

**모드 전환**:

- AppBar 하트 아이콘으로 자기 연민 모드 토글
- 일반 모드: 타이머 + 미래 자아
- 자기 연민 모드: SelfCompassionCard

---

### Phase 9: 커뮤니티 화면

**일자**: 2026-02-05
**커밋**: `c2cd420`

**파일**:

- `lib/presentation/screens/community/community_screen.dart`
- `lib/presentation/widgets/community/post_card.dart`
- `lib/presentation/widgets/community/reaction_bar.dart`
- `lib/presentation/widgets/community/post_composer_dialog.dart`

**주요 기능**:

1. **3개 탭**:

   - 전체: 모든 게시글
   - 팔로잉: 팔로우한 사람 게시글만
   - 숏츠: 동영상 콘텐츠 (2열 그리드)

2. **PostCard** (5가지 타입별 렌더링):

   - **경험 공유**: 일반 텍스트 + 이미지
   - **실패 리포트**: 핑크 컨테이너 + 하트 아이콘
   - **동기부여**: 그라데이션 박스 + 큰 글씨
   - **식사 기록**: 식사 사진 + 메뉴 정보
   - **숏츠**: 썸네일 + 재생 버튼

3. **ReactionBar**:

   - 6개 리액션 버튼: 👍❤️💪😭😂🤝
   - 각 리액션 카운트 표시
   - 댓글 버튼 + 댓글 수

4. **PostComposerDialog**:
   - 게시글 타입 선택 (FilterChip)
   - 내용 입력 TextFormField
   - 이미지 추가 버튼 (TODO)
   - 게시 버튼

---

### Phase 10: 프로필 화면

**일자**: 2026-02-05
**커밋**: `ea55055`

**파일**:

- `lib/presentation/screens/profile/profile_screen.dart`
- `lib/presentation/widgets/profile/profile_header.dart`
- `lib/presentation/widgets/profile/meal_timeline_item.dart`

**주요 기능**:

1. **ProfileHeader**:

   - 프로필 이미지 (CircleAvatar 80px)
   - 게시글/팔로워/팔로잉 통계 3열
   - 닉네임, 바이오
   - 본인: "프로필 편집" 버튼
   - 타인: "팔로우" 버튼

2. **NestedScrollView 구조**:

   - 스크롤 시 헤더 고정
   - SliverPersistentHeader로 탭바 고정

3. **2개 탭**:

   - **식사 타임라인**: 최근 7일 식사 기록
   - **기록**: 작성한 게시글 목록

4. **MealTimelineItem**:
   - 왼쪽: 시간 + 점 + 연결선
   - 오른쪽: 식사 정보 카드
   - 식사 사진, 장소, 메뉴, 준수 행동 태그

---

### Phase 11: 공통 위젯

**일자**: 2026-02-05
**커밋**: `6a51ee0`

**파일**:

- `lib/presentation/widgets/common/comment_section.dart`
- `lib/presentation/widgets/common/comparison_chart.dart`

**주요 기능**:

1. **CommentSection**:

   - 댓글 목록 (ListView)
   - 각 댓글: 프로필 이미지 + 닉네임 + 시간 + 내용
   - 하단: 댓글 입력 필드 + 전송 버튼
   - 더보기 버튼 → 바텀시트 (신고/삭제)

2. **ComparisonChart**:
   - 듀오링고 스타일 가로 막대
   - 4가지 타입 (Enum):
     - 연속 성공 일수
     - 전체 성공률
     - 주간 성공 일수
     - 총 다이어트 일수
   - 순위 표시 (1등 그라데이션)
   - FractionallySizedBox로 진행률 바

---

## 5. 파일 구조 및 역할

### 5.1 전체 파일 트리

```
lib/
├── main.dart                                    # 앱 진입점
├── app.dart                                     # MaterialApp 루트 위젯
│
├── core/                                        # 공통 모듈
│   ├── constants/
│   │   └── app_constants.dart                   # 전역 상수 (API, UI, 행동 로직)
│   ├── theme/
│   │   ├── app_colors.dart                      # 색상 팔레트 (Material 3)
│   │   ├── app_typography.dart                  # 타이포그래피 시스템
│   │   └── app_theme.dart                       # 전체 테마 (Light/Dark)
│   └── utils/                                   # 유틸리티 (미구현)
│
├── data/                                        # 데이터 레이어
│   ├── models/                                  # 데이터 모델 (14개)
│   │   ├── enums.dart                           # 8개 Enum 정의
│   │   ├── checklist_item.dart
│   │   ├── comment.dart
│   │   ├── daily_record.dart                    # 일일 통합 기록 (핵심)
│   │   ├── failure_report.dart
│   │   ├── meal_record.dart
│   │   ├── post.dart
│   │   ├── reaction.dart
│   │   ├── reward_status.dart
│   │   ├── shared_record.dart
│   │   ├── user.dart                            # 사용자 모델 (팔로우, 통계)
│   │   ├── user_goals.dart
│   │   ├── user_stats.dart
│   │   └── weight_record.dart
│   └── repositories/                            # Repository 패턴
│       ├── daily_record_repository.dart         # 인터페이스
│       ├── user_repository.dart                 # 인터페이스
│       ├── post_repository.dart                 # 인터페이스
│       └── [각 인터페이스마다 Mock 구현체]
│
├── domain/                                      # 도메인 레이어 (향후 구현)
│   ├── entities/                                # 비즈니스 엔티티
│   └── usecases/                                # UseCase
│
└── presentation/                                # UI 레이어
    ├── navigation/
    │   └── main_navigation.dart                 # 하단 네비게이션 바
    │
    ├── screens/                                 # 5개 주요 화면
    │   ├── home/
    │   │   └── home_screen.dart                 # 홈 화면 (Streak, 미션, 캘린더)
    │   ├── checklist/
    │   │   └── checklist_screen.dart            # 체크리스트 화면
    │   ├── emergency/
    │   │   └── emergency_screen.dart            # 유혹 극복 화면
    │   ├── community/
    │   │   └── community_screen.dart            # 커뮤니티 화면 (3탭)
    │   └── profile/
    │       └── profile_screen.dart              # 프로필 화면 (2탭)
    │
    └── widgets/                                 # 재사용 위젯 (25개+)
        ├── home/                                # 홈 화면 전용 (4개)
        │   ├── streak_counter.dart
        │   ├── mission_card.dart
        │   ├── weekly_calendar.dart
        │   └── reward_status_card.dart
        ├── checklist/                           # 체크리스트 전용 (2개)
        │   ├── checklist_time_section.dart
        │   └── meal_record_button.dart
        ├── emergency/                           # 유혹 극복 전용 (4개)
        │   ├── temptation_timer.dart
        │   ├── future_self_card.dart
        │   ├── self_compassion_card.dart
        │   └── failure_report_dialog.dart
        ├── community/                           # 커뮤니티 전용 (3개)
        │   ├── post_card.dart
        │   ├── reaction_bar.dart
        │   └── post_composer_dialog.dart
        ├── profile/                             # 프로필 전용 (2개)
        │   ├── profile_header.dart
        │   └── meal_timeline_item.dart
        └── common/                              # 공통 위젯 (2개)
            ├── comment_section.dart
            └── comparison_chart.dart
```

### 5.2 주요 파일 역할 상세

#### `lib/main.dart`

```dart
void main() {
  runApp(const GirogiApp());
}
```

- 앱 진입점
- `GirogiApp` 위젯 실행

#### `lib/app.dart`

```dart
class GirogiApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GIROGI',
      theme: AppTheme.lightTheme,      // 라이트 모드
      darkTheme: AppTheme.darkTheme,   // 다크 모드
      home: const MainNavigation(),    // 메인 네비게이션
    );
  }
}
```

- MaterialApp 설정
- 테마 적용
- 홈 화면을 MainNavigation으로 설정

#### `lib/core/constants/app_constants.dart`

```dart
class AppConstants {
  // UI
  static const double defaultPadding = 16.0;
  static const double defaultBorderRadius = 12.0;

  // 행동 로직
  static const int minCoreMissionsForSuccess = 2;  // 3개 중 2개
  static const int daysForSnackBox = 3;            // 과자박스 3일마다
  static const int daysForCheatDay = 7;            // 치팅데이 7일마다
  static const int weeklyDiningOutWarningThreshold = 3; // 외식 경고
}
```

- 매직 넘버 방지
- 비즈니스 규칙 중앙 관리
- **수정 시**: 여기서 한 번만 바꾸면 전체 앱 반영

#### `lib/data/models/daily_record.dart`

```dart
@immutable
class DailyRecord {
  final String id;
  final DateTime date;
  final List<ChecklistItem> coreMissions;       // 핵심 미션 3개
  final List<ChecklistItem> breakfastChecklist; // 아침 체크리스트
  final List<MealRecord> mealRecords;           // 식사 기록
  final WeightRecord? weightRecord;             // 체중 (옵셔널)

  // 성공 여부 계산 (2개 이상 미션 완료)
  bool get isSuccessDay => coreMissions.where((m) => m.isCompleted).length >= 2;

  DailyRecord copyWith({...});                  // 불변 객체 수정
  Map<String, dynamic> toJson();                // JSON 직렬화
  factory DailyRecord.fromJson(Map<String, dynamic> json); // 역직렬화
}
```

- **가장 중요한 모델** (하루 전체 기록)
- 성공/실패 판단 로직 포함
- JSON 변환 메서드 (향후 DB 저장용)

#### `lib/data/repositories/daily_record_repository.dart`

```dart
abstract class DailyRecordRepository {
  Future<DailyRecord?> getRecordByDate(DateTime date);
  Future<List<DailyRecord>> getRecordsInRange({required DateTime start, required DateTime end});
  Future<void> saveRecord(DailyRecord record);
  Future<int> getCurrentStreak();
}

class MockDailyRecordRepository implements DailyRecordRepository {
  final List<DailyRecord> _records = []; // 메모리 기반

  @override
  Future<DailyRecord?> getRecordByDate(DateTime date) async {
    // 하드코딩된 샘플 데이터 반환
  }
}
```

- **인터페이스 패턴**: 추상 클래스로 계약 정의
- **Mock 구현체**: 현재 사용 중 (메모리 기반)
- **향후**: `RealDailyRecordRepository` 구현 (Hive 연동)

#### `lib/presentation/screens/home/home_screen.dart`

```dart
class _HomeScreenState extends State<HomeScreen> {
  int currentStreak = 5; // TODO: Repository에서 가져오기

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('GIROGI')),
      body: RefreshIndicator(
        onRefresh: () async {
          // TODO: Repository에서 최신 데이터
        },
        child: SingleChildScrollView(
          child: Column(
            children: [
              StreakCounter(currentStreak: currentStreak),
              MissionCard(...),
              WeeklyCalendar(...),
              RewardStatusCard(...),
            ],
          ),
        ),
      ),
    );
  }
}
```

- **StatefulWidget**: 로컬 상태 관리
- **TODO 마커**: DB 연동 지점 표시
- **RefreshIndicator**: 당겨서 새로고침

---

## 6. 코드 수정 가이드

### 6.1 자주 수정할 항목

#### ✅ 미션 개수 변경 (3개 → 4개)

**1단계**: 상수 수정

```dart
// lib/core/constants/app_constants.dart
static const int totalCoreMissions = 4;        // 3 → 4
static const int minCoreMissionsForSuccess = 3; // 2 → 3
```

**2단계**: 홈 화면 데이터 수정

```dart
// lib/presentation/screens/home/home_screen.dart
final List<Map<String, dynamic>> missions = [
  {'title': '아침 식사 집에서 먹기', ...},
  {'title': '점심 천천히 먹기', ...},
  {'title': '저녁 8시 전 식사 완료', ...},
  {'title': '물 2L 마시기', ...},  // 추가
];
```

**3단계**: MockRepository 수정

```dart
// lib/data/repositories/daily_record_repository.dart
coreMissions: [
  ChecklistItem(...),  // 1
  ChecklistItem(...),  // 2
  ChecklistItem(...),  // 3
  ChecklistItem(...),  // 4 추가
],
```

#### ✅ 과자박스 보상 주기 변경 (3일 → 5일)

```dart
// lib/core/constants/app_constants.dart
static const int daysForSnackBox = 5;  // 3 → 5
```

**영향 받는 파일**:

- `lib/presentation/widgets/home/reward_status_card.dart` (자동 계산)

#### ✅ 외식 경고 기준 변경 (3회 → 4회)

```dart
// lib/core/constants/app_constants.dart
static const int weeklyDiningOutWarningThreshold = 4;  // 3 → 4
```

**영향 받는 파일**:

- `lib/presentation/screens/checklist/checklist_screen.dart`

#### ✅ 새로운 리액션 추가 (7번째 리액션)

**1단계**: 모델 수정

```dart
// lib/data/models/reaction.dart
class Reaction {
  final int like;
  final int love;
  final int fighting;
  final int touched;
  final int funny;
  final int empathy;
  final int amazing;  // 추가: 👏

  int get totalCount => like + love + fighting + touched + funny + empathy + amazing;
}
```

**2단계**: ReactionBar 수정

```dart
// lib/presentation/widgets/community/reaction_bar.dart
_buildReactionButton(
  emoji: '👏',
  label: '대단',
  count: reactions.amazing,
  onTap: () => onReactionTap('amazing'),
),
```

### 6.2 화면 추가하기

#### 예시: 리포트 화면 추가

**1단계**: 화면 파일 생성

```bash
mkdir lib/presentation/screens/report
touch lib/presentation/screens/report/report_screen.dart
```

**2단계**: 스켈레톤 코드 작성

```dart
// lib/presentation/screens/report/report_screen.dart
class ReportScreen extends StatefulWidget {
  const ReportScreen({super.key});

  @override
  State<ReportScreen> createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('리포트')),
      body: Center(child: Text('리포트 화면')),
    );
  }
}
```

**3단계**: 네비게이션에 추가 (필요 시)

```dart
// lib/presentation/navigation/main_navigation.dart
// BottomNavigationBar에 탭 추가 또는
// 기존 화면에서 Navigator.push()로 이동
```

### 6.3 새로운 위젯 만들기

#### 예시: 배지 위젯 추가

**1단계**: 파일 생성

```dart
// lib/presentation/widgets/common/badge_widget.dart
import 'package:flutter/material.dart';
import 'package:girogi/core/theme/app_colors.dart';
import 'package:girogi/core/theme/app_typography.dart';

class BadgeWidget extends StatelessWidget {
  final String label;
  final IconData icon;
  final Color color;

  const BadgeWidget({
    super.key,
    required this.label,
    required this.icon,
    this.color = AppColors.primary,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color, width: 2),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(width: 8),
          Text(label, style: AppTypography.bodySmall.copyWith(color: color)),
        ],
      ),
    );
  }
}
```

**2단계**: 사용하기

```dart
// 다른 화면에서
BadgeWidget(
  label: '7일 연속',
  icon: Icons.local_fire_department_rounded,
  color: AppColors.streak,
),
```

### 6.4 Mock 데이터 수정하기

#### 예시: 샘플 게시글 내용 변경

```dart
// lib/data/repositories/post_repository.dart
class MockPostRepository implements PostRepository {
  final List<Post> _posts = [
    Post(
      id: 'post1',
      authorId: 'user1',
      type: PostType.experience,
      content: '오늘 외식 유혹 이겨냈어요!',  // 수정
      imageUrl: 'https://example.com/image.jpg',  // 수정
      reactions: Reaction(...),
      commentCount: 5,
      createdAt: DateTime.now().subtract(Duration(hours: 2)),
    ),
    // 더 추가...
  ];
}
```

### 6.5 색상 변경하기

#### Primary 색상 변경 (인디고 → 파랑)

```dart
// lib/core/theme/app_colors.dart
static const Color primary = Color(0xFF2196F3);  // Material Blue
static const Color primaryContainer = Color(0xFFBBDEFB);  // Light Blue
```

**자동 반영**: 모든 화면에서 Primary 색상 사용하는 곳 자동 변경

---

## 7. 심리학 이론 적용 상세

### 7.1 Streak (연속 성공 일수)

**이론**: 도파민 보상 시스템
**논문**: Fogg, BJ. "Tiny Habits" (2019)

**적용 방법**:

1. **시각적 강조**: 홈 화면 최상단 배치
2. **그라데이션**: 주황→빨강 불꽃 느낌
3. **큰 숫자**: 64sp 폰트 (일반 텍스트의 3배)
4. **최고 기록 표시**: "지금까지 최고: 12일" (경쟁심 자극)

**코드**:

```dart
// lib/presentation/widgets/home/streak_counter.dart
Container(
  decoration: BoxDecoration(
    gradient: AppColors.streakGradient, // 오렌지→레드
  ),
  child: Text(
    '$currentStreak일',
    style: AppTypography.streakCounter, // 64sp
  ),
)
```

**예상 효과**:

- 연속 성공 시 도파민 분비 → 습관 강화
- 1일이라도 끊기지 않으려는 동기 부여
- 듀오링고 사례: Streak 도입 후 지속률 50% 증가

---

### 7.2 Tiny Habits (작은 습관)

**이론**: BJ Fogg, Stanford Behavior Design Lab
**핵심**: 최소 행동 단위로 저항 최소화

**적용 방법**:

1. **3개 미션**: 5개가 아닌 3개로 부담 감소
2. **2개만 달성**: 완벽주의 회피 (3개 중 2개만 OK)
3. **구체적 행동**: "운동 30분" → "물 한 잔 마시기"

**미션 설계 원칙**:

```dart
// 나쁜 예 (추상적, 어려움)
"건강하게 식사하기"
"운동 열심히 하기"

// 좋은 예 (구체적, 쉬움)
"아침에 물 한 잔 마시기"
"식사 전 5분 명상"
"계단 1층 올라가기"
```

**코드**:

```dart
// lib/core/constants/app_constants.dart
static const int totalCoreMissions = 3;        // 적은 개수
static const int minCoreMissionsForSuccess = 2; // 완벽하지 않아도 OK
```

---

### 7.3 Implementation Intention (실행 의도)

**이론**: Peter Gollwitzer (1999)
**핵심**: "When-Where-What" 구조화

**적용 방법**:

- **시간대별 체크리스트**: "아침에", "점심에", "저녁에"
- **구체적 행동**: "30회 이상 씹기", "8시 전 식사 완료"

**효과**:

- 모호함 제거 → 실행 확률 2-3배 증가
- "When X happens, I will do Y" 패턴

**코드**:

```dart
// lib/presentation/screens/checklist/checklist_screen.dart
List<Map<String, dynamic>> breakfastChecklist = [
  {'title': '물 한 잔 마시기', 'isChecked': false},  // When: 아침
  {'title': '체중 측정하기', 'isChecked': false},   // When: 아침
];
```

---

### 7.4 Episodic Future Thinking (EFT)

**이론**: IJNS (2024) - 미래 자아 시각화
**효과**: 충동적 섭취 행동 억제, BMI 감소

**적용 방법**:

1. **목표 이미지**: 원하는 몸매 사진 업로드
2. **카운트다운**: "D-90일 후 이 모습"
3. **동기부여 메시지**: "지금 먹으면 후회할까요?"

**코드**:

```dart
// lib/presentation/widgets/emergency/future_self_card.dart
Column(
  children: [
    Image.network(goalImageUrl),        // 목표 이미지
    Text('$daysRemaining일 후'),        // D-day
    Text('목표까지 ${weightDiff}kg'),   // 진행 상황
  ],
)
```

**타이밍**:

- 유혹 극복 화면에서 표시
- 10분 타이머와 함께 노출
- "지금 먹으면 이 목표가 늦어진다"는 메시지

---

### 7.5 Self-Compassion (자기 연민)

**이론**: British Journal of Health Psychology (2021)
**효과**: 실패 후 복귀율 증가, 지속 의지 강화

**적용 방법**:

1. **자기 비난 최소화**: "괜찮습니다", "완벽한 사람은 없습니다"
2. **통계 표시**: "전체 성공률 84%" (실패 1번 ≠ 전부 실패)
3. **실패 리포트**: 원인 분석 + 대응 방안 (학습 기회)
4. **즉각 복귀**: "다시 시작하기" 버튼

**코드**:

```dart
// lib/presentation/widgets/emergency/self_compassion_card.dart
Text('한 번의 실수로 모든 것이 끝나는 건 아닙니다'),
Text('전체 성공률: 84%'),  // 긍정적 프레이밍
ElevatedButton(
  onPressed: _restart,
  child: Text('다시 시작하기'),  // 즉각 액션
),
```

**기존 앱과의 차이**:

- 기존: "실패!" → 자기비난 → 포기
- GIROGI: "괜찮아요" → 학습 → 재시작

---

### 7.6 Temptation Bundling (유혹 묶기)

**이론**: Katy Milkman, Wharton School
**효과**: 운동 참여율 10-14% 증가

**적용 방법**:

1. **과자박스**: 3일 연속 성공 → 1개 획득 → 치팅데이에 사용
2. **치팅데이**: 7일 연속 성공 → 과자박스 사용 가능
3. **즉시 보상 + 지연 보상** 조합

**보상 설계**:

```dart
// lib/core/constants/app_constants.dart
static const int daysForSnackBox = 3;   // 자주 보상 (단기 동기)
static const int daysForCheatDay = 7;   // 큰 보상 (장기 동기)
```

**심리적 효과**:

- "이번 주만 버티면 치팅데이" → 지연된 만족
- "3일마다 과자박스" → 즉각적 보상
- 보상을 위한 다이어트 (외적 동기 → 내적 동기 전환)

---

## 8. 데이터 흐름 및 상태 관리

### 8.1 현재 상태 관리 (StatefulWidget)

#### 흐름 예시: 미션 체크

```
1. 사용자가 미션 카드 탭
   ↓
2. _toggleMission(index) 호출
   ↓
3. setState(() { missions[index]['isCompleted'] = !... })
   ↓
4. Flutter가 build() 재실행
   ↓
5. 화면 업데이트 (체크 표시)
```

**코드**:

```dart
class _HomeScreenState extends State<HomeScreen> {
  List<Map<String, dynamic>> missions = [...];  // 로컬 상태

  void _toggleMission(int index) {
    setState(() {                                // 상태 변경 트리거
      missions[index]['isCompleted'] = !missions[index]['isCompleted'];
    });
  }
}
```

**한계**:

- 화면 닫으면 데이터 손실
- 화면 간 데이터 공유 불가
- 전역 상태 없음

### 8.2 향후 상태 관리 (Riverpod)

#### Provider 정의

```dart
// lib/presentation/providers/daily_record_provider.dart
final dailyRecordProvider = FutureProvider<DailyRecord?>((ref) async {
  final repository = ref.watch(dailyRecordRepositoryProvider);
  final today = DateTime.now();
  return await repository.getRecordByDate(today);
});

final dailyRecordRepositoryProvider = Provider<DailyRecordRepository>((ref) {
  return RealDailyRecordRepository();  // Hive 연동
});
```

#### 사용 예시

```dart
// lib/presentation/screens/home/home_screen.dart
class HomeScreen extends ConsumerWidget {  // StatefulWidget → ConsumerWidget
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final recordAsync = ref.watch(dailyRecordProvider);

    return recordAsync.when(
      data: (record) => _buildContent(record),
      loading: () => CircularProgressIndicator(),
      error: (err, stack) => Text('오류: $err'),
    );
  }
}
```

#### 상태 변경

```dart
// 미션 토글
ref.read(dailyRecordProvider.notifier).toggleMission(index);

// Provider가 자동으로:
// 1. Repository 호출
// 2. DB 업데이트
// 3. 상태 변경 알림
// 4. 모든 리스너 위젯 재빌드
```

### 8.3 Offline-First 전략

#### 목표

- 인터넷 없어도 앱 사용 가능
- 데이터는 로컬 DB에 먼저 저장
- 백그라운드에서 서버 동기화

#### 동기화 흐름

```
[사용자 액션]
    ↓
[로컬 DB 즉시 업데이트] ← Optimistic Update
    ↓
[UI 즉시 반영] (빠른 응답)
    ↓
[백그라운드 서버 전송]
    ↓
[성공] → 끝
[실패] → 재시도 큐 추가
    ↓
[인터넷 연결 시 자동 재시도]
```

#### 코드 예시

```dart
// lib/data/repositories/daily_record_repository.dart (Real)
class RealDailyRecordRepository implements DailyRecordRepository {
  final HiveBox _localDB;
  final FirebaseService _remoteDB;

  @override
  Future<void> saveRecord(DailyRecord record) async {
    // 1. 로컬 즉시 저장
    await _localDB.put(record.date, record.toJson());

    // 2. 백그라운드 동기화
    _syncToServer(record).catchError((error) {
      // 실패 시 재시도 큐 추가
      _retryQueue.add(record);
    });
  }
}
```

### 8.4 캐싱 전략

#### 이미지 캐싱

```dart
// lib/presentation/widgets/community/post_card.dart
CachedNetworkImage(
  imageUrl: post.imageUrl,
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
  cacheManager: CacheManager(
    Config('post_images', maxNrOfCacheObjects: 100),
  ),
);
```

#### API 응답 캐싱

```dart
// lib/data/repositories/user_repository.dart
final _cache = <String, User>{};  // 메모리 캐시

Future<User?> getUserById(String userId) async {
  // 1. 캐시 확인
  if (_cache.containsKey(userId)) {
    return _cache[userId];
  }

  // 2. DB 조회
  final user = await _remoteDB.getUser(userId);

  // 3. 캐시 저장
  _cache[userId] = user;

  return user;
}
```

---

## 9. 프로덕션 준비 로드맵

### 9.1 Phase 12: 상태 관리 도입 (예상 2주)

**작업 내역**:

1. Riverpod 패키지 추가
2. Provider 정의 (5개)
   - `dailyRecordProvider`
   - `userProvider`
   - `postListProvider`
   - `authProvider`
   - `settingsProvider`
3. 모든 화면을 `ConsumerWidget`으로 변경
4. `setState()` 제거

**예상 난이도**: ⭐⭐⭐☆☆ (중간)

---

### 9.2 Phase 13: 로컬 DB 연동 (예상 1주)

**작업 내역**:

1. Hive 패키지 추가
2. Hive Box 정의 (3개)
   - `dailyRecordsBox`
   - `usersBox`
   - `postsBox`
3. `RealDailyRecordRepository` 구현
4. JSON 직렬화 테스트
5. 마이그레이션 로직

**코드 예시**:

```dart
// lib/data/local_storage/hive_service.dart
class HiveService {
  static Future<void> init() async {
    await Hive.initFlutter();
    Hive.registerAdapter(DailyRecordAdapter());  // 자동 생성
    await Hive.openBox<DailyRecord>('daily_records');
  }
}

// lib/data/repositories/daily_record_repository.dart
class RealDailyRecordRepository implements DailyRecordRepository {
  final Box<DailyRecord> _box = Hive.box('daily_records');

  @override
  Future<DailyRecord?> getRecordByDate(DateTime date) async {
    return _box.get(date.toIso8601String());
  }

  @override
  Future<void> saveRecord(DailyRecord record) async {
    await _box.put(record.date.toIso8601String(), record);
  }
}
```

---

### 9.3 Phase 14: Firebase 백엔드 연동 (예상 2주)

**작업 내역**:

1. Firebase 프로젝트 생성
2. FlutterFire CLI 설정
3. Firebase Auth (이메일/Google/Apple 로그인)
4. Firestore 데이터베이스 설계
5. Cloud Storage (이미지 업로드)
6. Firebase Cloud Messaging (푸시 알림)

**Firestore 컬렉션 구조**:

```
users/
  {userId}/
    - nickname
    - profileImageUrl
    - bio
    - followers: [userId1, userId2]
    - following: [userId3, userId4]

daily_records/
  {userId}/
    {date}/
      - coreMissions: [...]
      - mealRecords: [...]
      - isSuccessDay: true

posts/
  {postId}/
    - authorId
    - type
    - content
    - imageUrl
    - reactions: {...}
    - createdAt

comments/
  {postId}/
    {commentId}/
      - authorId
      - content
      - createdAt
```

**보안 규칙**:

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자는 자신의 데이터만 수정 가능
    match /daily_records/{userId}/{date} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // 게시글은 누구나 읽기 가능, 작성자만 수정/삭제
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
  }
}
```

---

### 9.4 Phase 15: 이미지 업로드 (예상 3일)

**작업 내역**:

1. `image_picker` 패키지 추가
2. 갤러리/카메라 선택 UI
3. 이미지 압축 (`flutter_image_compress`)
4. Firebase Storage 업로드
5. URL 반환 → DB 저장

**코드 예시**:

```dart
// lib/core/utils/image_picker_util.dart
class ImagePickerUtil {
  static Future<String?> uploadImage() async {
    // 1. 이미지 선택
    final picker = ImagePicker();
    final XFile? image = await picker.pickImage(source: ImageSource.gallery);

    if (image == null) return null;

    // 2. 압축
    final compressedImage = await FlutterImageCompress.compressWithFile(
      image.path,
      quality: 70,
    );

    // 3. Firebase Storage 업로드
    final ref = FirebaseStorage.instance
        .ref()
        .child('meal_images/${DateTime.now().millisecondsSinceEpoch}.jpg');
    await ref.putData(compressedImage);

    // 4. URL 반환
    return await ref.getDownloadURL();
  }
}
```

---

### 9.5 Phase 16: 푸시 알림 (예상 3일)

**알림 종류**:

1. **일일 리마인더**: 오후 8시 "오늘 미션 완료하셨나요?"
2. **Streak 위험**: 23시 55분 "5분 안에 기록하지 않으면 Streak가 끊깁니다!"
3. **커뮤니티 알림**: 내 게시글에 댓글/리액션
4. **팔로우 알림**: 친구가 성공일 달성

**구현**:

```dart
// lib/core/services/notification_service.dart
class NotificationService {
  static Future<void> init() async {
    await FirebaseMessaging.instance.requestPermission();

    // FCM 토큰 가져오기
    final token = await FirebaseMessaging.instance.getToken();
    print('FCM Token: $token');  // 서버에 저장

    // 포그라운드 메시지 처리
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      _showLocalNotification(message);
    });

    // 백그라운드 메시지 처리
    FirebaseMessaging.onBackgroundMessage(_backgroundHandler);
  }

  static Future<void> _backgroundHandler(RemoteMessage message) async {
    print('백그라운드 메시지: ${message.notification?.title}');
  }
}
```

**서버 측 (Cloud Functions)**:

```javascript
// functions/index.js
exports.sendStreakWarning = functions.pubsub
  .schedule('55 23 * * *') // 매일 23:55
  .timeZone('Asia/Seoul')
  .onRun(async (context) => {
    const users = await admin.firestore().collection('users').get();

    for (const user of users.docs) {
      const todayRecord = await getTodayRecord(user.id);

      if (!todayRecord) {
        // Streak가 끊길 위험!
        await admin.messaging().send({
          token: user.data().fcmToken,
          notification: {
            title: '⚠️ Streak 위험!',
            body: '5분 안에 기록하지 않으면 연속 성공이 끊깁니다!',
          },
        });
      }
    }
  });
```

---

### 9.6 Phase 17: 테스트 작성 (예상 1주)

#### Unit Test (비즈니스 로직)

```dart
// test/data/models/daily_record_test.dart
void main() {
  group('DailyRecord', () {
    test('성공일 판단 - 2개 완료 시 true', () {
      final record = DailyRecord(
        id: 'test1',
        date: DateTime.now(),
        coreMissions: [
          ChecklistItem(title: 'M1', isCompleted: true),
          ChecklistItem(title: 'M2', isCompleted: true),
          ChecklistItem(title: 'M3', isCompleted: false),
        ],
      );

      expect(record.isSuccessDay, true);
    });

    test('실패일 판단 - 1개 완료 시 false', () {
      // ...
    });
  });
}
```

#### Widget Test (UI)

```dart
// test/presentation/widgets/home/streak_counter_test.dart
void main() {
  testWidgets('Streak 숫자 표시', (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: StreakCounter(currentStreak: 5, bestStreak: 12),
        ),
      ),
    );

    expect(find.text('5일'), findsOneWidget);
    expect(find.text('지금까지 최고: 12일'), findsOneWidget);
  });
}
```

#### Integration Test (E2E)

```dart
// integration_test/app_test.dart
void main() {
  testWidgets('홈 → 미션 체크 → Streak 증가', (WidgetTester tester) async {
    app.main();
    await tester.pumpAndSettle();

    // 1. 홈 화면 확인
    expect(find.text('GIROGI'), findsOneWidget);

    // 2. 첫 번째 미션 체크
    await tester.tap(find.byType(MissionCard).first);
    await tester.pumpAndSettle();

    // 3. 체크 표시 확인
    expect(find.byIcon(Icons.check_circle_rounded), findsWidgets);
  });
}
```

---

### 9.7 Phase 18: 앱스토어 배포 (예상 1주)

#### iOS App Store

**1단계**: Apple Developer 계정 ($99/년)

**2단계**: 앱 아이콘 및 스플래시

```bash
flutter pub add flutter_launcher_icons
flutter pub add flutter_native_splash

# pubspec.yaml 설정 후
flutter pub run flutter_launcher_icons
flutter pub run flutter_native_splash:create
```

**3단계**: 프로덕션 빌드

```bash
flutter build ios --release
```

**4단계**: Xcode에서 Archive → App Store Connect 업로드

**5단계**: 스크린샷 준비 (5.5인치, 6.5인치)

- 홈 화면 (Streak)
- 체크리스트
- 유혹 극복 (타이머)
- 커뮤니티
- 프로필

**6단계**: 앱 설명 작성

```
[제목] GIROGI - 과학적 다이어트 앱

[부제목] 심리학 기반 습관 형성, 자기 연민으로 지속 가능

[설명]
🔥 연속 성공 일수로 동기부여
📝 Implementation Intention 체크리스트
⏰ 10분 타이머로 유혹 극복
💬 응원하는 커뮤니티
💖 실패해도 괜찮아요 (Self-Compassion)

[키워드]
다이어트, 습관, 심리학, 동기부여, 자기 연민
```

#### Android Play Store

**1단계**: Google Play Console ($25 일회성)

**2단계**: 프로덕션 빌드

```bash
# 서명 키 생성
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# android/key.properties 파일 생성
storePassword=<password>
keyPassword=<password>
keyAlias=upload
storeFile=/Users/username/upload-keystore.jks

# 빌드
flutter build appbundle --release
```

**3단계**: Play Console에 업로드

- AAB 파일: `build/app/outputs/bundle/release/app-release.aab`
- 스크린샷 (7인치, 10인치 태블릿 포함)

**4단계**: 콘텐츠 등급 설정 (EVERYONE)

**5단계**: 개인정보처리방침 URL 제공

---

### 9.8 프로덕션 체크리스트

#### 필수 항목

- [ ] 모든 TODO 제거 또는 처리
- [ ] API 키 환경 변수화 (`.env` 파일)
- [ ] 에러 핸들링 (try-catch)
- [ ] 로딩 상태 표시 (CircularProgressIndicator)
- [ ] 네트워크 오류 처리 (offline 모드)
- [ ] 권한 요청 (카메라, 갤러리, 알림)
- [ ] 앱 버전 관리 (`pubspec.yaml` version)
- [ ] 크래시 리포팅 (Firebase Crashlytics)
- [ ] Analytics 연동 (Firebase Analytics)

#### 성능 최적화

- [ ] 이미지 압축 (500KB 이하)
- [ ] 리스트 Lazy Loading (pagination)
- [ ] 캐싱 적용 (이미지, API)
- [ ] 불필요한 재빌드 최소화 (`const` 사용)
- [ ] 무한 스크롤 최적화

#### 보안

- [ ] HTTPS only
- [ ] API 키 난독화
- [ ] 민감 정보 암호화 (Hive Encrypted Box)
- [ ] 인증 토큰 secure storage

---

## 10. 비즈니스 성장 전략

### 10.1 사용자 획득 전략

#### Phase 1: 오가닉 성장 (0-1,000명)

**기간**: 출시 후 1-2개월
**목표**: Product-Market Fit 검증

**전략**:

1. **페이스북 그룹 마케팅**

   - "다이어트 정보 공유" 그룹 참여
   - 직접 홍보 X, 가치 제공 먼저
   - 예: "과학적으로 검증된 다이어트 방법 5가지" 포스팅

2. **인스타그램 마이크로 인플루언서**

   - 팔로워 5-10K 다이어트 인플루언서 10명 선정
   - 무료 프리미엄 1년 제공 → 리뷰 요청
   - 예상 비용: 0원 (제품 제공만)

3. **네이버 카페 운영**
   - "GIROGI 다이어트 커뮤니티" 개설
   - 매일 과학적 다이어트 팁 업로드
   - 사용자 성공 스토리 공유

#### Phase 2: 바이럴 성장 (1,000-10,000명)

**기간**: 3-6개월
**목표**: 입소문, 리텐션 50%+

**전략**:

1. **친구 초대 프로그램**

   ```
   초대한 사람: 프리미엄 7일
   초대받은 사람: 프리미엄 7일
   → 양쪽 Win-Win
   ```

2. **Streak 공유 기능**

   - "30일 연속 성공!" 배지 → 인스타 스토리 공유
   - 앱 다운로드 링크 자동 삽입
   - Open Graph 최적화 (썸네일 예쁘게)

3. **숏폼 콘텐츠 마케팅**
   - 틱톡/릴스: "다이어트 실패하는 이유 TOP 3"
   - 영상 말미: "GIROGI 앱 사용하면 자동 관리"
   - 예상 조회수: 영상당 10-50K

#### Phase 3: 유료 마케팅 (10,000-100,000명)

**기간**: 6-12개월
**목표**: 폭발적 성장

**전략**:

1. **페이스북/인스타 광고**

   - 예산: 월 500만원
   - 타겟: 25-40세 여성, 직장인, 다이어트 관심사
   - CAC (Customer Acquisition Cost): ₩5,000
   - LTV (Lifetime Value): ₩50,000 (프리미엄 6개월 구독 가정)
   - LTV/CAC = 10x (건강한 비율)

2. **구글 앱 광고 (UAC)**

   - 예산: 월 300만원
   - CPI (Cost Per Install): ₩3,000
   - 타겟: "다이어트 앱" 검색자

3. **인플루언서 마케팅 (규모)**
   - 메가 인플루언서 (100K+) 3명
   - 예산: 1명당 300만원 = 900만원
   - 예상 전환율: 0.5% (100K → 500 다운로드)

### 10.2 수익 최적화 전략

#### A/B 테스트

1. **프리미엄 가격 테스트**

   - A안: ₩9,900/월
   - B안: ₩12,900/월
   - C안: ₩7,900/월
   - 목표: Conversion Rate × Price 최대화

2. **페이월 타이밍**

   - A안: 7일 후
   - B안: 14일 후
   - C안: 30일 후
   - 가설: 14일이 optimal (습관 형성 기간)

3. **프리미엄 기능 구성**
   - A안: 모든 기능 무료 (광고만)
   - B안: 식사 기록 5개까지 무료
   - C안: 친구 비교 프리미엄만
   - 목표: 가장 아쉬운 기능 찾기

#### 수익 다각화

1. **기업 웰니스 B2B**

   - 삼성, 네이버, 카카오 등 대기업 타겟
   - 제안서: "직원 건강 → 생산성 20% 향상"
   - 가격: ₩5,000/인/월 (100명 기준 월 500만원)

2. **제휴 마케팅**

   - 샐러디, 잇츠온 같은 건강식 브랜드
   - 앱 내 할인 쿠폰 제공 → 수수료 10%

3. **데이터 판매 (익명화)**
   - 제약사: "다이어트 성공 패턴 데이터"
   - 연구기관: "한국인 식습관 데이터"
   - 가격: 데이터셋당 1,000만원+

### 10.3 리텐션 전략

#### 목표 지표

- **D1 Retention**: 70% (앱 설치 다음 날 재방문)
- **D7 Retention**: 50%
- **D30 Retention**: 30%
- **3개월 지속률**: 50% (업계 평균 30%)

#### 전략

1. **온보딩 최적화**

   - 첫 방문 시 튜토리얼 (30초 이내)
   - 첫 미션 즉시 완료 가능 ("물 한 잔 마시기")
   - 첫 Streak 1일 달성 → 축하 애니메이션

2. **푸시 알림 (신중하게)**

   - 오후 8시: "오늘 미션 완료했나요?" (주 3회만)
   - 23시 55분: "Streak 위험!" (진짜 위험할 때만)
   - 친구 응원: "친구가 30일 달성!" (주 1회)

3. **소셜 프루프**

   - "오늘 1,234명이 미션 완료했어요!"
   - "당신은 상위 10%입니다!"
   - Gamification (레벨, 배지)

4. **Habit Loop 강화**
   - Cue: 매일 같은 시간 알림
   - Routine: 미션 체크
   - Reward: Streak 증가, 과자박스

---

## 11. FAQ 및 트러블슈팅

### 11.1 개발 관련 FAQ

#### Q1: Flutter 버전 업그레이드 시 주의사항?

**A**:

```bash
# 1. 현재 버전 확인
flutter --version

# 2. 업그레이드 (신중하게)
flutter upgrade

# 3. 의존성 호환성 체크
flutter pub outdated

# 4. 깨진 부분 수정
flutter pub get
flutter clean
flutter run

# 5. 테스트 실행
flutter test
```

**주의**: Material 3 breaking changes 확인 필요

#### Q2: 빌드 에러 해결 방법?

**A**:

```bash
# 만능 해결책
flutter clean
flutter pub get
cd ios && pod install && cd ..  # iOS only
flutter run
```

#### Q3: 상태가 업데이트 안 돼요

**A**: `setState()` 호출 확인

```dart
// 잘못된 예
void updateData() {
  myData = newValue;  // 화면 업데이트 X
}

// 올바른 예
void updateData() {
  setState(() {
    myData = newValue;  // 화면 업데이트 O
  });
}
```

#### Q4: Mock 데이터를 실제 DB로 어떻게 전환?

**A**:

1. `RealDailyRecordRepository` 구현
2. Provider에서 Mock → Real로 변경

```dart
// Before
final repo = MockDailyRecordRepository();

// After
final repo = RealDailyRecordRepository();
```

3. 모든 `TODO: Repository` 주석 찾아서 처리

### 11.2 비즈니스 관련 FAQ

#### Q1: 무료 vs 유료 어떻게 정할까요?

**A**:

- **무료**: 습관 형성 핵심 기능 (Streak, 미션, 커뮤니티)
- **유료**: 분석/비교 (친구 비교, 상세 리포트)
- 원칙: 혼자서도 다이어트 성공 가능해야 함

#### Q2: 경쟁사 대비 어떻게 포지셔닝?

**A**:

- **눔코치**: 고가, 코칭 중심 → GIROGI는 저가, Self-service
- **다이어트 앱들**: 칼로리 중심 → GIROGI는 심리학 중심
- **삼성헬스**: 종합 건강 → GIROGI는 다이어트 특화

#### Q3: B2B 진출 시 고려사항?

**A**:

1. **컴플라이언스**: 개인정보 처리방침 강화
2. **대시보드**: 기업용 관리자 페이지 필요
3. **SSO**: 기업 계정 통합 로그인
4. **계약서**: 법무 검토 필수

### 11.3 트러블슈팅

#### 문제: 앱이 느려요

**원인**:

- 불필요한 재빌드 (`setState()` 남용)
- 이미지 미압축
- 리스트 너무 큼 (pagination 없음)

**해결**:

```dart
// 1. const 사용
const Text('고정 텍스트')  // 재빌드 안 됨

// 2. ListView.builder 사용
ListView.builder(  // Lazy loading
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
)

// 3. 이미지 캐싱
CachedNetworkImage(imageUrl: url)
```

#### 문제: 데이터가 날아가요

**원인**: Mock Repository (메모리 기반)

**해결**: Hive 연동 (Phase 13)

#### 문제: 푸시 알림 안 와요

**원인**:

1. FCM 토큰 미등록
2. iOS: APNS 인증서 문제
3. Android: 배터리 최적화

**해결**:

```dart
// 토큰 확인
final token = await FirebaseMessaging.instance.getToken();
print('Token: $token');  // 서버에 이 토큰 저장했는지 확인

// iOS: Xcode Capabilities에서 Push Notifications 켜기
// Android: manifest에 권한 추가
```

---

## 12. 13단계 작업 방식 참고

### 12.1 개발 방식 개요

이 프로젝트는 **체계적인 13단계(Phase) 방식**으로 개발되었습니다. 각 단계는 명확한 목표를 가지고 순차적으로 진행되었으며, 일관된 패턴을 따릅니다.

### 12.2 작업 패턴

**각 Phase마다 동일한 3단계 프로세스:**

```
1. 기능 구현
   ↓
2. README.md 업데이트 (해당 Phase 내역 추가)
   ↓
3. Git 커밋 (명확한 커밋 메시지)
```

**예시**:

```bash
# Phase 7 작업
1. 홈 화면 위젯 4개 구현
2. README.md에 Phase 7 섹션 추가
3. git commit -m "feat: 홈 화면 구현 완료 (Phase 7)"
```

### 12.3 13단계 전체 구조

| Phase       | 이름               | 주요 산출물            | 상태 |
| ----------- | ------------------ | ---------------------- | ---- |
| Phase 1     | 프로젝트 초기화    | 폴더 구조, main.dart   | ✅   |
| Phase 2     | 데이터 모델        | 14개 모델              | ✅   |
| Phase 3     | Repository         | 인터페이스 + Mock      | ✅   |
| Phase 4     | Core 레이어        | 테마, 색상, 상수       | ✅   |
| Phase 5     | 구조 재정리        | 앱 이름 변경           | ✅   |
| Phase 6     | 네비게이션         | 하단 탭바              | ✅   |
| Phase 7     | 홈 화면            | 4개 위젯               | ✅   |
| Phase 8     | 체크리스트         | 시간대별 체크리스트    | ✅   |
| Phase 9     | 유혹 극복          | 타이머, EFT, 자기 연민 | ✅   |
| Phase 10    | 커뮤니티           | 피드, 게시글, 리액션   | ✅   |
| Phase 11    | 프로필 + 공통 위젯 | 타임라인, 차트         | ✅   |
| Phase 12-13 | 프로덕션 준비      | Riverpod, DB, 배포     | ⏳   |

### 12.4 상세 내역 참고 문서

**`.claude/GIROGI_프로젝트_계획_및_진행사항.md`** 파일을 반드시 확인하세요!

이 파일에는 다음 정보가 담겨 있습니다:

- 각 Phase별 작업 일자
- 생성된 파일 목록
- 주요 기능 설명
- Git 커밋 해시
- 진행도 요약 표

**예시 구조**:

```markdown
### Phase 7: 홈 화면 구현 ✅ 완료

**완료일**: 2026-02-05

**작업 내용**:

- 연속 성공 일수 카운터 (Streak)
  - 애니메이션 효과 (불 이모지 + 그라데이션)
  - 최고 기록 표시
- 핵심 미션 3개 표시
  ...

**생성된 파일**:

- lib/presentation/screens/home/home_screen.dart
- lib/presentation/widgets/home/streak_counter.dart
  ...

**커밋**:
```

feat: 홈 화면 구현 완료 (Phase 7)

```

```

### 12.5 다른 세션에서 작업할 때

새로운 Claude Code 세션에서 작업을 시작할 때는 다음 순서를 따르세요:

#### 1단계: 현재 상태 파악

```bash
# Git 히스토리 확인
git log --oneline -20

# 진행 상황 문서 읽기
cat .claude/GIROGI_프로젝트_계획_및_진행사항.md
```

#### 2단계: 진행 중인 Phase 확인

- 진행도 요약 테이블에서 현재 단계 파악
- 완료된 Phase와 대기 중인 Phase 구분

#### 3단계: 관련 커밋 확인

```bash
# 특정 Phase의 커밋 찾기
git log --grep="Phase 7"

# 커밋 상세 내용 보기
git show <commit-hash>
```

#### 4단계: 동일한 패턴 유지

- 기능 구현 → README 업데이트 → Git 커밋
- 커밋 메시지 형식: `feat: <설명> (Phase N)`

### 12.6 작업 시 참고 순서

코드를 수정하거나 새 기능을 추가할 때는 다음 순서로 문서를 참고하세요:

1. **`.claude/GIROGI_프로젝트_계획_및_진행사항.md`** ← 먼저!

   - 어떤 Phase에 속하는지 확인
   - 해당 Phase의 구현 내역 참고
   - 생성된 파일 목록 확인

2. **`CLAUDE.md`** (이 문서)

   - 코드 수정 가이드 (섹션 6)
   - 구체적인 수정 방법 및 예시
   - 비즈니스 로직 이해

3. **`README.md`**
   - 프로젝트 전체 개요
   - 사용자 관점 설명

### 12.7 왜 13단계 방식인가?

#### 장점

1. **명확한 진행 상황**

   - 어디까지 완료했는지 한눈에 파악
   - 다음에 할 일이 명확함

2. **일관된 코드 품질**

   - 동일한 패턴 반복
   - 예측 가능한 구조

3. **쉬운 유지보수**

   - Phase별로 파일이 정리됨
   - 문제 발생 시 해당 Phase 커밋 확인

4. **협업 용이**

   - 다른 개발자도 쉽게 이해
   - 문서만 읽으면 전체 파악 가능

5. **롤백 쉬움**
   - Phase 단위로 되돌리기 가능
   - 커밋 메시지가 명확해서 찾기 쉬움

#### Clean Architecture와의 조합

13단계 방식은 Clean Architecture와 완벽하게 맞아떨어집니다:

```
Phase 1-2: 프로젝트 구조 + 도메인 레이어 (Data Models)
Phase 3: 데이터 레이어 (Repository)
Phase 4: Core 레이어 (Theme, Constants)
Phase 5-6: 프레젠테이션 레이어 기반 (Navigation)
Phase 7-11: 프레젠테이션 레이어 확장 (5개 화면)
Phase 12+: 프로덕션 준비 (상태 관리, DB)
```

### 12.8 핵심 원칙

> **"13단계 방식을 따르면 유지보수가 쉽습니다!"**

- 각 Phase는 독립적이면서도 연결됨
- 순서를 지키면 의존성 문제 없음
- 문서화를 게을리하지 않음
- 커밋 메시지를 명확하게 작성

### 12.9 작업 체크리스트

새로운 Phase를 시작할 때 확인하세요:

- [ ] 이전 Phase가 100% 완료되었나?
- [ ] README.md가 업데이트되었나?
- [ ] 커밋이 완료되었나?
- [ ] `.claude/GIROGI_프로젝트_계획_및_진행사항.md`를 읽었나?
- [ ] 이번 Phase의 목표가 명확한가?
- [ ] 필요한 파일 구조를 알고 있나?

### 12.10 예시: Phase 7 작업 흐름

실제 작업 과정을 예시로 보여드립니다:

```
[Phase 7 시작]

1. 계획서 확인
   - .claude/GIROGI_프로젝트_계획_및_진행사항.md 읽기
   - Phase 7: 홈 화면 구현
   - 필요한 위젯: 4개

2. 구현
   - StreakCounter 위젯 작성
   - MissionCard 위젯 작성
   - WeeklyCalendar 위젯 작성
   - RewardStatusCard 위젯 작성
   - home_screen.dart에서 조립

3. 테스트
   - flutter run으로 실행
   - UI 확인
   - 기능 동작 확인

4. 문서화
   - README.md에 Phase 7 섹션 추가
   - 각 위젯 설명 작성

5. 커밋
   git add .
   git commit -m "feat: 홈 화면 구현 완료 (Phase 7)"

6. 진행 상황 업데이트
   - .claude/GIROGI_프로젝트_계획_및_진행사항.md 업데이트
   - Phase 7을 ✅ 완료로 표시

[Phase 8 시작 준비]
```

---

## 13. 마무리

### 13.1 프로젝트 현황 요약

**완료된 작업**:

- ✅ MVP 개발 완료 (Phase 1-11)
- ✅ 5개 주요 화면 구현
- ✅ 25개 이상 재사용 위젯
- ✅ 14개 데이터 모델
- ✅ Mock Repository 패턴
- ✅ Material Design 3 디자인 시스템
- ✅ 6가지 심리학 이론 적용

**즉시 가능한 것**:

- 앱 실행 및 데모 (Mock 데이터)
- UI/UX 테스트
- 사용자 피드백 수집
- 투자 프레젠테이션

**아직 필요한 것**:

- 상태 관리 (Riverpod)
- 실제 DB 연동 (Hive + Firebase)
- 이미지 업로드
- 푸시 알림
- 앱스토어 배포

**예상 일정**:

- 프로덕션 준비: 6-8주
- 앱스토어 심사: 1-2주
- **총: 2-3개월 후 출시 가능**

### 13.2 연락처 및 지원

**참고 자료**:

- Flutter 공식 문서: https://flutter.dev/docs
- Riverpod 가이드: https://riverpod.dev
- Firebase 문서: https://firebase.google.com/docs

---

**문서 버전**: 1.0
**최종 수정**: 2026-02-05
**작성자**: Claude (Anthropic AI Assistant)
**프로젝트 상태**: MVP 완성, 프로덕션 준비 단계

> 이 문서는 GIROGI 프로젝트의 모든 것을 담고 있습니다.
> 개발, 비즈니스, 심리학 이론까지 완전히 이해할 수 있도록 작성되었습니다.
> 수정이 필요하거나 궁금한 점이 있다면 언제든 이 문서를 참고하세요!

---

## 💡 중요 업데이트: Next.js 전환

**업데이트 날짜**: 2026-02-06

### 전환 배경

Flutter MVP 완성 후, 다음 이유로 **Next.js로 전환** 결정:

1. **웹 우선 전략**: 앱스토어 심사 없이 즉시 배포
2. **SEO 최적화**: 오가닉 트래픽 확보 (Flutter는 불가능)
3. **개발자 접근성**: 본인이 직접 수정 가능 (TypeScript/React 익숙)
4. **비용 절감**: 앱스토어 수수료 30% → 0% (웹 결제)

### 최종 기술 스택

- Next.js 15 (App Router)
- TypeScript 5.7
- Tailwind CSS 4.0
- Zustand (상태 관리)
- TanStack Query (서버 데이터)
- Zod (타입 검증)

### 상세 계획

📄 **전체 전환 계획**: `.claude/GIROGI_Next.js_전환_계획.md` 참고  
📊 **기술 스택 분석**: `.claude/web_analysis/` 참고

### Flutter 앱 운명

---
