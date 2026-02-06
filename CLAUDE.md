# GIROGI 개발 가이드

> Claude가 작업할 때 참고하는 문서
> **버전**: 2.0 (간결판)
> **최종 수정**: 2026-02-06

---

## 📂 문서 구조

```
GIROGI/
├── README.md                          # 사용자용 프로젝트 소개
├── CLAUDE.md                          # 이 문서 (Claude용 가이드)
└── .claude/                           # 상세 문서 (git 제외)
    ├── GIROGI_프로젝트_계획_및_진행사항.md    # Flutter Phase 1-11 상세
    ├── GIROGI_Next.js_전환_계획.md            # Next.js 전환 계획 (8단계)
    ├── CLAUDE_FULL.md                        # 이 문서 상세판 (백업)
    └── web_analysis/                         # 기술 스택 심층 분석
        ├── QUICK_REFERENCE.md
        ├── TECH_STACK_SUMMARY.md
        └── TECH_STACK_ANALYSIS_2025.md
```

---

## 🎯 프로젝트 개요

**이름**: GIROGI (기로기)
**목적**: 심리학 기반 과학적 다이어트 앱
**현황**: Flutter MVP 완성 → Next.js로 전환 중

**핵심 차별점**:
- 6가지 심리학 이론 적용 (Streak, Self-Compassion, EFT 등)
- 의지력 아닌 시스템으로 행동 변화
- 실패 후 즉각 복귀 지원

---

## 📁 파일 구조 (핵심만)

### Flutter 앱 (MVP, 보관용)

```
diet_tracker_app/lib/
├── core/
│   ├── constants/app_constants.dart   # 전역 상수 (미션 개수, 보상 규칙 등)
│   └── theme/                        # 색상, 타이포그래피
│
├── data/
│   ├── models/                       # 14개 모델 (DailyRecord, User 등)
│   └── repositories/                 # Mock Repository
│
└── presentation/
    ├── screens/                      # 5개 화면 (home, checklist 등)
    └── widgets/                      # 25개+ 위젯
```

### Next.js 앱 (개발 중)

```
girogi-web/src/
├── app/                    # Next.js 15 App Router
│   └── (auth)/            # 인증 필요 그룹
│       ├── home/
│       ├── checklist/
│       ├── emergency/
│       ├── community/
│       └── profile/
│
├── components/            # UI 컴포넌트
├── lib/                   # API, 훅, 유틸
├── stores/                # Zustand 스토어
└── types/                 # TypeScript 타입
```

---

## ⚙️ 작업 방식

### 13단계 작업 패턴 (Flutter에서 사용)

```
1. 기능 구현
2. README 업데이트 (해당 Phase 내역 추가)
3. Git 커밋 (명확한 메시지)
```

**예시**:
```bash
# Phase 5 완료 후
git add .
git commit -m "feat: 홈 화면 구현 완료 (Phase 5)

- StreakCounter 컴포넌트
- MissionCard 컴포넌트
- WeeklyCalendar 컴포넌트
- RewardStatusCard 컴포넌트"
```

**참고**: `.claude/GIROGI_프로젝트_계획_및_진행사항.md`

---

## 🚀 Next.js 전환 계획

### 전환 이유

**Flutter의 한계**:
- 앱스토어 심사 필요 (업데이트 느림)
- SEO 불가능
- Dart 언어 (본인이 직접 수정 어려움)

**Next.js 선택**:
- 웹 우선 전략 (즉시 배포, SEO)
- TypeScript/React (본인이 수정 가능)
- 앱스토어 수수료 절감 (30% → 0%)
- PWA → Capacitor로 앱 래핑

### 최종 기술 스택 (필수만)

```typescript
// 처음 설치
Next.js 15        // 프레임워크
TypeScript 5.7    // 언어
Tailwind CSS 4.0  // 스타일링
Zustand          // 상태 관리 (클라이언트)
TanStack Query   // 서버 상태
Zod              // 타입 검증

// 나중에 필요하면 추가
shadcn/ui        // UI 컴포넌트
React Hook Form  // 폼 관리
Framer Motion    // 애니메이션
```

### 전환 단계 (8단계)

1. **Phase 1** (2-3일): Next.js 프로젝트 생성
2. **Phase 2** (2-3일): 디자인 시스템 (Tailwind 테마)
3. **Phase 3** (2-3일): 데이터 모델 → Zod 스키마
4. **Phase 4** (3-4일): API 레이어 + Mock 데이터
5. **Phase 5** (3-4일): 홈 화면
6. **Phase 6** (2주): 나머지 4개 화면
7. **Phase 7** (1-2일): 하단 네비게이션
8. **Phase 8** (3-4일): PWA + Vercel 배포

**예상 기간**: 2개월 (1명) 또는 1개월 (2명)

**참고**: `.claude/GIROGI_Next.js_전환_계획.md`

---

## 🔑 핵심 비즈니스 로직

### AppConstants (중요한 것만)

```dart
// lib/core/constants/app_constants.dart
static const int totalCoreMissions = 3;           // 미션 개수
static const int minCoreMissionsForSuccess = 2;   // 성공 조건 (3개 중 2개)
static const int daysForSnackBox = 3;             // 과자박스 (3일마다)
static const int daysForCheatDay = 7;             // 치팅데이 (7일 연속)
static const int weeklyDiningOutWarningThreshold = 3;  // 외식 경고
```

### 성공일 판단

```dart
bool get isSuccessDay =>
  coreMissions.where((m) => m.isCompleted).length >= 2;
```

---

## 🧠 적용된 심리학 이론

1. **Streak (연속 성공)**: 도파민 보상 시스템
2. **Tiny Habits**: 작은 습관 (3개 미션 중 2개만 달성)
3. **Implementation Intention**: 시간대별 체크리스트
4. **Episodic Future Thinking (EFT)**: 미래 자아 시각화
5. **Self-Compassion**: 실패 후 복귀 지원
6. **Temptation Bundling**: 보상 시스템 (과자박스, 치팅데이)

**상세**: `.claude/CLAUDE_FULL.md` 참고

---

## 💻 개발 환경

### Flutter 앱 실행

```bash
cd diet_tracker_app
flutter pub get
flutter run
```

### Next.js 앱 실행 (개발 중)

```bash
cd girogi-web
npm install
npm run dev
```

---

## 📝 작업 시 참고 순서

1. **`.claude/GIROGI_Next.js_전환_계획.md`** ← 다음 Phase 확인
2. **`CLAUDE.md`** (이 문서) ← 핵심 가이드
3. **`.claude/CLAUDE_FULL.md`** ← 상세 내용 (필요시)

---

## 🎨 주요 화면 구성

### Flutter MVP (완성)

1. **HomeScreen**: Streak, 미션, 주간 캘린더, 보상
2. **ChecklistScreen**: 시간대별 체크리스트, 식사 기록
3. **EmergencyScreen**: 10분 타이머, 미래 자아, 자기 연민
4. **CommunityScreen**: 피드, 리액션, 댓글, 숏츠
5. **ProfileScreen**: 식사 타임라인, 비교 차트

### Next.js (개발 예정)

동일한 5개 화면을 Next.js로 재구현

---

## 🚨 주의사항

### 기술 스택 오버 방지

- **처음부터 모든 라이브러리 설치 금지**
- 필요할 때 추가하는 방식
- 예: 폼이 복잡해지면 그때 React Hook Form 설치

### Git 커밋 규칙

```
feat: 새 기능
fix: 버그 수정
docs: 문서 변경
refactor: 리팩토링
style: 스타일 변경
```

### .claude/ 폴더

- **Git에 포함 안 됨** (.gitignore에 등록)
- 상세 문서 및 분석 자료 보관
- 프로젝트 히스토리 기록

---

## 📚 참고 링크

**Flutter 공식 문서**: https://flutter.dev/docs
**Next.js 공식 문서**: https://nextjs.org/docs
**Tailwind CSS 4.0**: https://tailwindcss.com
**TanStack Query**: https://tanstack.com/query

---

**문서 버전**: 2.0 (간결판)
**이전 버전**: `.claude/CLAUDE_FULL.md`
**최종 수정**: 2026-02-06

> 이 문서는 Claude가 작업할 때 빠르게 참고하기 위한 핵심 가이드입니다.
> 상세 내용이 필요하면 `.claude/` 폴더의 문서들을 참고하세요.
