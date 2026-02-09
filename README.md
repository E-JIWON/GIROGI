# GIROGI (기로기)

> 행동경제학과 심리학 연구 기반의 과학적 다이어트 앱
> **상태**: Flutter MVP 완성 → Next.js로 전환 중

---

## 🎯 프로젝트 개요

의지력 의존이 아닌 **시스템적 환경 설계**로 지속 가능한 행동 변화를 유도하는 다이어트 앱입니다.

**핵심 차별점**:
- 6가지 심리학/행동경제학 이론 적용
- 자기 연민(Self-Compassion) 메커니즘으로 실패 후 복귀 지원
- Streak(연속 성공)과 소셜 지원으로 동기부여

---

## ✨ 주요 기능

### 홈 대시보드
- 🔥 연속 성공 일수(Streak) 추적
- ✅ 일일 핵심 미션 (3개 중 2개 달성)
- 📅 주간 성공률 캘린더
- 🎁 보상 시스템 (과자박스, 치팅데이)

### 체크리스트
- ⏰ 시간대별 행동 체크리스트
- 🍽️ 식사 기록 (장소, 메뉴, 사진)
- ⚠️ 외식 빈도 경고 시스템

### 유혹 극복
- ⏱️ 10분 타이머 (충동 지연)
- 🔮 미래 자아 시각화 (EFT 이론)
- 💖 자기 연민 모드 (실패 후 복귀)

### 커뮤니티
- 📝 경험 공유 피드
- 😊 6종 감정 리액션
- 💬 댓글 기반 상호 지원
- 🎬 숏츠 형식 동기부여 콘텐츠

### 프로필
- 👤 식사 타임라인
- 📊 듀오링고 스타일 친구 비교
- 🤝 팔로우/팔로잉 네트워크

---

## 🛠 기술 스택

### Flutter 앱 (MVP 완성)
```
Flutter 3.38.5 / Dart 3.10.4
Clean Architecture
Material Design 3
Mock Repository Pattern
```

### ⚡ Next.js로 전환 중 (2026-02-06~)
```typescript
Next.js 15        // 프레임워크
TypeScript 5.7    // 언어
Tailwind CSS 4.0  // 스타일링
Zustand          // 상태 관리
TanStack Query   // 서버 데이터
Zod              // 타입 검증
```

**전환 이유**:
- 웹 우선 전략 (SEO, 즉시 배포)
- 본인이 직접 수정 가능 (TypeScript/React 익숙)
- 앱스토어 수수료 절감 (30% → 0%)
- PWA → Capacitor로 앱 래핑 가능

---

## 📂 프로젝트 구조

```
diet_tracker_app/          # Flutter MVP (보관용)
└── lib/
    ├── core/              # 테마, 상수
    ├── data/              # 14개 모델, Repository
    ├── domain/            # 비즈니스 로직
    └── presentation/      # 5개 화면, 위젯

girogi-web/                # Next.js 앱 (개발 중)
└── src/
    ├── app/               # App Router
    ├── components/        # UI 컴포넌트
    ├── lib/               # 유틸리티, API
    ├── stores/            # Zustand
    └── types/             # TypeScript 타입
```

---

## 🚀 시작하기

### Flutter 앱 (MVP)
```bash
cd diet_tracker_app
flutter pub get
flutter run
```

### Next.js 앱 (Phase 1-7 완료 ✅)
```bash
cd girogi-web
pnpm install  # 이미 설치 완료
pnpm dev
```

**Phase 1 완료 내역**:
- ✅ Next.js 15 + TypeScript 프로젝트 생성
- ✅ 필수 패키지 설치 (zustand, @tanstack/react-query, zod)
- ✅ 폴더 구조 생성 (components, lib, stores, types)

**Phase 2 완료 내역**:
- ✅ Flutter 디자인 시스템 분석 (AppColors, AppTypography, AppConstants)
- ✅ Tailwind CSS 4.0 테마 설정 완료
  - Primary/Success/Warning/Error 색상 체계
  - Grey 계열 (50-900) 색상
  - Feature 색상 (Streak, CheatDay, SnackBox 등)
- ✅ 타이포그래피 변환 (Pretendard 폰트)
  - Display/Headline/Title/Body/Label 시스템
  - Custom 폰트 (streakCounter, timerDisplay)
- ✅ 디자인 토큰 정의
  - Spacing (8, 16, 24px 등)
  - Border Radius (8, 12, 20px)
  - Animation Duration (150, 300, 500ms)
- ✅ 커스텀 그라데이션 유틸리티 (Streak, Success, Primary)

**Phase 3 완료 내역**:
- ✅ Flutter 데이터 모델 14개 분석
  - Enums: 7개 (MealTime, MealPlace, ExerciseType 등)
  - Models: DailyRecord, User, MealRecord, Post 등
- ✅ TypeScript 타입 정의 생성
  - `src/types/enums.ts` - 7개 Enum + 디스플레이 맵
  - `src/types/common.ts` - Comment, Reaction 공통 타입
  - `src/types/user.ts` - User, UserGoals, UserStats
  - `src/types/models.ts` - DailyRecord, Post 등 핵심 모델
  - `src/types/index.ts` - 통합 export
- ✅ Zod 스키마 정의 (런타임 검증)
  - `src/types/schemas.ts` - 모든 모델의 Zod 스키마
  - Form 검증 스키마 (signup, login, profile 등)
  - API 응답 파싱용 스키마
- ✅ 타입 안전성 확보
  - TypeScript 인터페이스 ↔ Zod 스키마 동기화
  - 헬퍼 함수 제공 (isEatingOut, getWeightChange 등)

**Phase 4 완료 내역**:
- ✅ Mock 데이터 생성 (UI 개발용)
  - `src/lib/mock/users.ts` - 사용자 4명 (본인 + 친구 3명)
  - `src/lib/mock/dailyRecords.ts` - 최근 7일 일일 기록
  - `src/lib/mock/posts.ts` - 게시글 6개 (다양한 타입)
  - `src/lib/mock/index.ts` - 통합 export
- ✅ Mock 데이터 헬퍼 함수
  - 사용자 조회 (ID, 닉네임, 팔로우/팔로잉)
  - 일일 기록 조회 (날짜, 범위, Streak 계산)
  - 게시글 관리 (CRUD, 리액션, 댓글)
- ✅ Flutter Mock Repository와 100% 호환
  - 동일한 데이터 구조 및 비즈니스 로직
  - 백엔드 없이 UI 개발 가능

**Phase 5 완료 내역**:
- ✅ 홈 화면 컴포넌트 구현 (4개)
  - `src/components/home/StreakCounter.tsx` - 연속 성공 일수 카운터
  - `src/components/home/MissionCard.tsx` - 핵심 미션 카드
  - `src/components/home/WeeklyCalendar.tsx` - 주간 성공률 캘린더
  - `src/components/home/RewardStatusCard.tsx` - 보상 현황 (과자박스, 치팅데이)
- ✅ 유틸리티 함수 생성
  - `src/lib/utils.ts` - cn() 함수 (clsx + tailwind-merge)
- ✅ 홈 페이지 구현
  - `src/app/page.tsx` - 4개 컴포넌트 조립
  - Mock 데이터 연동 (Streak 계산, 주간 기록)
  - 미션 토글 인터랙션 (useState)
- ✅ 추가 패키지 설치
  - `lucide-react` - 아이콘 라이브러리
  - `clsx` + `tailwind-merge` - 조건부 클래스 관리
- ✅ Flutter 디자인 100% 재현
  - 그라데이션 배경, 색상 체계, 타이포그래피
  - 반응형 레이아웃, 인터랙션 애니메이션

**Phase 6-1 완료 내역** (체크리스트 화면):
- ✅ 체크리스트 컴포넌트 구현 (2개)
  - `src/components/checklist/ChecklistTimeSection.tsx` - 시간대별 체크리스트
  - `src/components/checklist/MealRecordButton.tsx` - 식사 기록 버튼
- ✅ 체크리스트 페이지 구현
  - `src/app/checklist/page.tsx` - 4개 시간대 섹션 (아침/점심/저녁/운동)
  - 외식 경고 배너 (주 3회 이상 시)
  - useState로 로컬 상태 관리
- ✅ Implementation Intention 이론 적용
  - 시간대별 구조화된 행동 체크리스트
  - 구체적 행동 목표 ("30회 이상 씹기", "8시 전 식사 완료")

**Phase 7 완료 내역** (유혹 극복 화면):
- ✅ 유혹 극복 컴포넌트 구현 (4개)
  - `src/components/emergency/TemptationTimer.tsx` - 10분 타이머 (원형 진행률, 시작/일시정지/리셋)
  - `src/components/emergency/FutureSelfCard.tsx` - 미래 자아 시각화 (EFT 이론)
  - `src/components/emergency/SelfCompassionCard.tsx` - 자기 연민 카드 (통계, 재시작)
  - `src/components/emergency/FailureReportDialog.tsx` - 실패 리포트 다이얼로그 (3단계 질문)
- ✅ 유혹 극복 페이지 구현
  - `src/app/emergency/page.tsx` - 자기 연민 모드 토글, FAB 버튼
  - 일반 모드: 타이머 + 미래 자아
  - 자기 연민 모드: 자기 연민 카드
- ✅ 심리학 이론 적용
  - Episodic Future Thinking (EFT) - 미래 자아 시각화로 충동 억제
  - Self-Compassion - 실패 후 즉시 복귀 지원
  - Temptation Bundling - 10분 타이머로 충동 지연

**Phase 8 완료 내역** (커뮤니티 화면):
- ✅ 커뮤니티 컴포넌트 구현 (3개)
  - `src/components/community/ReactionBar.tsx` - 6종 감정 리액션 바 (👍❤️💪😭😂🤝)
  - `src/components/community/PostCard.tsx` - 게시글 카드 (5가지 타입별 렌더링)
  - `src/components/community/PostComposerDialog.tsx` - 글쓰기 다이얼로그 (타입 선택, 내용 입력)
- ✅ 커뮤니티 페이지 구현
  - `src/app/community/page.tsx` - 3개 탭 (전체, 팔로잉, 숏츠)
  - 피드: 리스트 뷰
  - 숏츠: 2열 그리드 뷰
- ✅ 게시글 타입별 렌더링
  - **경험 공유**: 일반 텍스트 + 이미지
  - **실패 리포트**: 핑크 컨테이너 + 하트 아이콘
  - **동기부여**: 그라데이션 박스 + 큰 글씨
  - **식사 기록**: 식사 사진 + 메뉴 정보
  - **숏츠**: 썸네일 + 재생 버튼
- ✅ 6종 리액션 시스템
  - 좋아요, 최고, 화이팅, 감동, 웃김, 공감
  - 리액션 요약 (상위 3개 + 총 개수)
  - 댓글 버튼

**Phase 9 완료 내역** (프로필 화면):
- ✅ 프로필 컴포넌트 구현 (2개)
  - `src/components/profile/ProfileHeader.tsx` - 프로필 헤더 (통계, 버튼)
  - `src/components/profile/MealTimelineItem.tsx` - 식사 타임라인 항목 (타임라인 UI)
- ✅ 프로필 페이지 구현
  - `src/app/profile/page.tsx` - 2개 탭 (식사 타임라인, 기록)
  - 본인/타인 프로필 구분
  - 팔로우/언팔로우 기능
- ✅ ProfileHeader 기능
  - 프로필 이미지 (80px 원형)
  - 게시글/팔로워/팔로잉 통계 3열
  - 닉네임, 바이오
  - 본인: "프로필 편집" 버튼
  - 타인: "팔로우" 버튼
- ✅ 식사 타임라인
  - 최근 7일 식사 기록
  - 시간대별 색상 구분 (아침=주황, 점심=황갈색, 저녁=보라)
  - 타임라인 연결선 UI
  - 식사 사진, 장소, 메뉴, 준수 행동 태그

**Phase 10 완료 내역** (공통 위젯):
- ✅ 공통 컴포넌트 구현 (2개)
  - `src/components/common/CommentSection.tsx` - 댓글 목록 + 입력 UI
  - `src/components/common/ComparisonChart.tsx` - 듀오링고 스타일 친구 비교 차트
- ✅ CommentSection 기능
  - 댓글 목록 (스크롤 가능)
  - 각 댓글: 프로필 이미지 + 닉네임 + 시간 + 내용
  - 하단: 댓글 입력 필드 + 전송 버튼
  - 더보기 메뉴 (본인: 삭제, 타인: 신고)
  - 시간 포맷팅 (방금 전, N분 전, N일 전)
  - Enter 키로 댓글 작성
- ✅ ComparisonChart 기능
  - 4가지 비교 타입 (연속 성공 일수, 전체 성공률, 주간 성공 일수, 총 다이어트 일수)
  - 가로 막대 그래프 (진행률 표시)
  - 1등 강조 (금색 그라데이션)
  - 순위 표시 (1, 2, 3...)
  - 본인 강조 (Primary 색상)
  - 빈 상태 처리 (친구 없을 때)

**Phase 11 완료 내역** (네비게이션 통합 및 연구 기반 개선 - Task 1):
- ✅ 하단 네비게이션 바 구현
  - `src/components/navigation/BottomNavigation.tsx` - 5개 탭 네비게이션
  - 홈/체크리스트/유혹 극복/커뮤니티/프로필
  - 중앙 강조 버튼 (유혹 극복)
  - Active 상태 표시
- ✅ 메인 레이아웃 구현
  - `src/app/layout.tsx` - 전역 레이아웃 설정
  - Pretendard 폰트 로드
  - Providers 래퍼 (향후 Zustand, TanStack Query)
- ✅ 라우팅 설정
  - `src/app/(showcase)/*` - 5개 화면 라우트 그룹
  - `/home`, `/checklist`, `/emergency`, `/community`, `/profile`
- ✅ **연구 기반 개선 Task 1: EFT 목표 이미지 필수화**
  - `src/lib/constants.ts` - 전역 상수 파일 생성
    - 미션 상수 (TOTAL_CORE_MISSIONS=3, MIN_CORE_MISSIONS_FOR_SUCCESS=2)
    - 보상 시스템 상수 (DAYS_FOR_SNACK_BOX=3, DAYS_FOR_CHEAT_DAY=7)
    - 경고 기준 (WEEKLY_DINING_OUT_WARNING_THRESHOLD=3)
    - **10개 기본 목표 이미지** (건강한 체형, 운동 모습, 자신감 등)
    - **10개 EFT 동기부여 메시지** (기존 4개 + 신규 6개)
    - **시간대별 맞춤 메시지** (아침/오후/저녁)
    - 자기 연민 메시지, localStorage 키 상수
  - `src/app/onboarding/page.tsx` - 온보딩 페이지 구현
    - **2단계 프로세스**:
      - Step 1: 목표 이미지 선택 (10개 기본 이미지 OR 커스텀 업로드)
      - Step 2: 체중 정보 입력 (현재/목표 체중, 목표 날짜)
    - **목표 이미지 필수화** (선택 없이 진행 불가)
    - 이미지 업로드 기능 (FileReader API)
    - 진행 상태 표시 (1/2 단계)
    - 유효성 검증 (체중 숫자 확인, 목표 < 현재)
    - localStorage 저장 (GOAL_IMAGE_KEY, CURRENT_WEIGHT_KEY, GOAL_WEIGHT_KEY, GOAL_DATE_KEY)
    - 완료 후 /home으로 자동 이동
- ✅ **연구 분석 보고서 권고 반영** (`.claude/250209-다이어트앱-연구기반-분석.md`)
  - EFT 효과 강화: 목표 이미지 필수 설정으로 미래 자아 시각화 강제
  - 동기부여 메시지 다양화: 4개 → 10개 (반복 노출 효과 감소 방지)
  - 시간대별 맞춤: 아침/오후/저녁 상황별 메시지

---

## 📚 문서

- **상세 개발 가이드**: `CLAUDE.md`
- **Next.js 전환 계획**: `.claude/GIROGI_Next.js_전환_계획.md`
- **기술 스택 분석**: `.claude/web_analysis/`

---

## 📄 라이선스

MIT License

---

**최종 수정**: 2026-02-09 (Phase 11: 네비게이션 통합 및 연구 기반 개선 Task 1 완료)
