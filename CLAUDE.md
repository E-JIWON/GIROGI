# GIROGI 개발 가이드

> Claude가 작업할 때 참고하는 핵심 문서
> **버전**: 5.0 (PC 대시보드 UI 전환)
> **최종 수정**: 2026-02-26

---

## 🎯 프로젝트 개요

**이름**: GIROGI (기로기)
**플랫폼**: Next.js 웹앱 + Flutter WebView 네이티브 앱
**목적**: 심리학 연구 기반의 과학적 다이어트 앱
**현황**: Next.js 5개 주요 화면 구현 + Flutter WebView 껍데기 세팅 완료

### 핵심 차별점

- **의지력이 아닌 시스템**: 5가지 심리학 이론 적용
- **자기 연민**: 실패 후 즉각 복귀 지원
- **과학적 근거**: 국제 저널 논문 기반 (IJNS 2024, BJP 2021 등)

---

## 🏗️ 기술 스택

### 웹 (girogi-web)

```yaml
Framework: Next.js 16 (App Router + React 19)
Language: TypeScript 5.7+
Styling: Tailwind CSS 4.0 (Oxide Engine)
State Management:
  - Client: Zustand (1.2KB)
  - Server: TanStack Query v5 (40KB)
Validation: Zod v4 (1.37KB)
Icons: Lucide React (Tree-shakable)
```

### 앱 (girogi-app)

```yaml
Framework: Flutter 3.38+ (WebView shell)
Language: Dart 3.10+
WebView: flutter_inappwebview ^6.1.5
Notifications: flutter_local_notifications ^18.0.0
Network: connectivity_plus ^6.1.0
Platforms: iOS, Android, macOS, Windows
```

### 개발 환경

```bash
# 웹 개발 서버 (http://localhost:8282)
cd girogi-web && npm run dev

# Flutter 앱 실행 (웹 개발서버 필요)
cd girogi-app && flutter run

# 웹 프로덕션 빌드
cd girogi-web && npm run build

# 앱 릴리즈 빌드
cd girogi-app && flutter build ios --release
cd girogi-app && flutter build appbundle --release
cd girogi-app && flutter build macos --release
cd girogi-app && flutter build windows --release
```

**상세**: [docs/TECH_STACK.md](docs/TECH_STACK.md)

---

## 📁 프로젝트 구조

```
GIROGI/
├── girogi-web/              # Next.js 웹앱
│   └── src/
│       ├── app/             # App Router (home, checklist, emergency, community, profile)
│       ├── components/      # UI 컴포넌트 (화면별 폴더 분리)
│       ├── lib/             # API, 훅, 유틸리티, native-bridge.ts
│       ├── stores/          # Zustand 스토어
│       └── types/           # TypeScript 타입, Zod 스키마, flutter-webview.d.ts
│
├── girogi-app/              # Flutter WebView 껍데기
│   ├── lib/
│   │   ├── main.dart        # 엔트리포인트
│   │   ├── app.dart         # MaterialApp 설정
│   │   ├── config/          # app_config.dart (dev/prod URL)
│   │   ├── screens/         # webview_screen, splash_screen, offline_screen
│   │   └── services/        # bridge_service, notification_service, connectivity_service
│   ├── ios/                 # iOS 설정
│   ├── android/             # Android 설정 (minSdk 24)
│   ├── macos/               # macOS 설정
│   └── windows/             # Windows 설정
│
├── archive/                 # 기존 Flutter MVP 코드 보관
│   └── flutter-mvp/
├── docs/                    # 프로젝트 문서
└── CLAUDE.md                # 이 문서
```

---

## 🧠 적용된 심리학 이론 (5가지)

### 1. Episodic Future Thinking (EFT) - 미래 자아 시각화

**효과**: 칼로리 섭취 99kcal 감소, BMI 감소 (IJNS 2024)
**앱 적용**:
- `src/components/emergency/FutureSelfCard.tsx`
- 목표 이미지, D-day 카운트다운, 동기부여 메시지

### 2. Temptation Bundling - 유혹 묶기

**효과**: 운동 참여율 10-14% 증가 (Katy Milkman)
**앱 적용**:
- `src/components/home/RewardStatusCard.tsx`
- 과자박스 (3일), 치팅데이 (7일) 보상 시스템

### 3. Implementation Intention - 실행 의도

**효과**: 목표 달성률 2-3배 증가 (Peter Gollwitzer)
**앱 적용**:
- `src/app/checklist/page.tsx`
- 시간대별 체크리스트 ("언제 + 어디서 + 무엇을")

### 4. Tiny Habits - 작은 습관

**효과**: 저항 없이 습관 형성 (BJ Fogg, Stanford)
**앱 적용**:
- `src/components/home/MissionCard.tsx`
- 3개 미션 중 2개만 달성하면 성공 (완벽주의 회피)

### 5. Self-Compassion - 자기 연민

**효과**: 실패 후 복귀율 증가 (BJP 2021)
**앱 적용**:
- `src/components/emergency/SelfCompassionCard.tsx`
- 자기비난 최소화, 즉각 복귀 지원

**상세**: [docs/RESEARCH_STRATEGIES.md](docs/RESEARCH_STRATEGIES.md)

---

## ✅ 현재 구현 상태

### 완료된 작업

- ✅ **5개 주요 화면** 구현 (home, checklist, emergency, community, profile)
- ✅ **디자인 시스템** 완성 (Tailwind 4.0 테마, Galmuri11 폰트)
- ✅ **컴포넌트 구조** 갖춰짐 (화면별 폴더 분리)
- ✅ **필수 라이브러리** 설치 (Zustand, TanStack Query, Zod 등)
- ✅ **Flutter WebView 껍데기** 세팅 (girogi-app/)
- ✅ **JS ↔ Dart 브릿지** 구현 (알림, 햅틱, 앱 정보)
- ✅ **네이티브 기능**: 푸시알림, 오프라인 처리, 스플래시
- ✅ **식사 기록 시스템** + 게이미피케이션
- ✅ **친구 프로필 페이지** + 비교 콘텐츠
- ✅ **체중 비교 차트** (단일 겹침 그래프)

### 현재 레이아웃 (변경 예정)

- 모바일 중심: `max-w-2xl` (896px), 하단 탭바
- 세로 스택 레이아웃, PC에서 공간 낭비 심함

---

## 🚀 현재 진행: PC 대시보드 UI 전환

> **상세 계획**: [docs/PC_DASHBOARD_UI_PLAN.md](docs/PC_DASHBOARD_UI_PLAN.md)

### 목표

모바일 중심 UI → PC 친화적 **사이드바 + 위젯 대시보드** 레이아웃

### 핵심 변경

| 항목 | Before | After |
|------|--------|-------|
| 네비게이션 | 하단 탭바 | 왼쪽 사이드바 (데스크탑) |
| 콘텐츠 | 세로 스택, max-w-2xl | 위젯 그리드, 전체 너비 |
| 반응형 | 거의 없음 | lg (1024px) 기준 전환 |

### 구현 단계

- ✅ **Phase 1**: 레이아웃 인프라 (사이드바 + 루트 레이아웃 수정)
- ✅ **Phase 2**: 위젯 시스템 (WidgetCard 래퍼 + 기존 컴포넌트 래핑)
- ✅ **Phase 3**: 대시보드 페이지 (홈 위젯 그리드화)
- ✅ **Phase 4**: 서브 페이지 적용 (체크리스트, 유혹극복, 커뮤니티, 프로필)

### 주요 파일

**신규**: `sidebar.tsx`, `top-bar.tsx`, `widget-card.tsx`
**수정**: `layout.tsx`, `page.tsx`, 각 서브페이지

---

## 🔑 핵심 비즈니스 로직

### 상수 정의 (src/lib/constants.ts)

```typescript
// 미션 및 성공 조건
export const TOTAL_CORE_MISSIONS = 3
export const MIN_CORE_MISSIONS_FOR_SUCCESS = 2

// 보상 시스템
export const DAYS_FOR_SNACK_BOX = 3     // 과자박스 (3일마다)
export const DAYS_FOR_CHEAT_DAY = 7     // 치팅데이 (7일 연속)

// 경고 기준
export const WEEKLY_DINING_OUT_WARNING_THRESHOLD = 3  // 외식 경고
```

### 성공일 판단 로직

```typescript
// src/types/models/dailyRecord.ts
export function isSuccessDay(record: DailyRecord): boolean {
  return record.coreMissions.filter(m => m.isCompleted).length >= 2
}
```

---

## 📝 코드 스타일 및 컨벤션

### TypeScript

- ✅ strict 모드 사용
- ✅ any 타입 금지
- ✅ 명확한 interface/type 정의

### React 컴포넌트

- ✅ Named export (default export 지양)
- ✅ Props interface 필수
- ✅ Functional component only

### Tailwind CSS

- ✅ Utility-first 접근
- ✅ 인라인 스타일 금지
- ✅ `className` 속성만 사용

### 파일 네이밍

- 컴포넌트: `PascalCase.tsx`
- 훅: `use*.ts`
- 타입: `PascalCase`
- 상수: `UPPER_SNAKE_CASE`

**상세**: [docs/TECH_STACK.md](docs/TECH_STACK.md#5-개발-가이드)

---

## ⚙️ 작업 방식

### 코드 작성 시

```
1. 기능 구현 (TypeScript + React)
2. 테스트 (수동 확인)
3. Git 커밋 (명확한 메시지)
```

**커밋 메시지 형식**:
```
feat: EFT 목표 이미지 필수화 구현

- 온보딩 페이지 추가 (src/app/onboarding/page.tsx)
- 목표 이미지 업로드 컴포넌트
- 기본 이미지 10개 제공
```

### Git 커밋 규칙

```
feat: 새 기능
fix: 버그 수정
docs: 문서 변경
refactor: 리팩토링
style: 스타일 변경
```

---

## 📚 참고 문서

### 현재 작업 문서

1. **`CLAUDE.md`** (이 문서) ← 항상 먼저 읽기
2. **`docs/PC_DASHBOARD_UI_PLAN.md`** ← PC UI 전환 작업 시

### 아카이브 (필요할 때만 참조)

- `docs/TECH_STACK.md` - 기술 스택 선정 이유
- `docs/RESEARCH_STRATEGIES.md` - 심리학 이론 상세
- `docs/FUTURE_FEATURES.md` - 미래 기능 아이디어
- `docs/archive/` - 과거 계획 문서들 (완료됨)
- `.claude/250209-*`, `.claude/250210-*` - 과거 분석 보고서 (완료됨)

---

## 🚨 주의사항

### ❌ 절대 사용 금지

- **CSS-in-JS** (styled-components, Emotion): Next.js 16 RSC 호환 안 됨
- **any 타입**: TypeScript 의미 없어짐
- **default export**: Named export만 사용

### ✅ 반드시 사용

- **TypeScript strict 모드**: 타입 안전성
- **Tailwind utility 클래스**: 일관성, 성능
- **Zod 스키마 검증**: 런타임 안전성
- **Next.js Image 컴포넌트**: 성능 최적화

---

## 🌐 외부 링크

**공식 문서**:
- Next.js 16: https://nextjs.org/docs
- Tailwind CSS 4.0: https://tailwindcss.com
- Zustand: https://docs.pmnd.rs/zustand
- TanStack Query: https://tanstack.com/query/latest/docs

---

**문서 버전**: 5.0 (PC 대시보드 UI 전환)
**최종 수정**: 2026-02-26

> 이 문서는 Claude가 GIROGI 프로젝트를 이해하고 작업하기 위한 핵심 가이드입니다.
> 현재 작업: 모바일 중심 UI → PC 친화적 사이드바 + 위젯 대시보드 전환
