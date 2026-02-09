# GIROGI 개발 가이드

> Claude가 작업할 때 참고하는 핵심 문서
> **버전**: 3.0 (Next.js 기준)
> **최종 수정**: 2026-02-09

---

## 🎯 프로젝트 개요

**이름**: GIROGI (기로기)
**플랫폼**: Next.js 웹 애플리케이션 (PWA 예정)
**목적**: 심리학 연구 기반의 과학적 다이어트 앱
**현황**: Next.js 전환 완료, 5개 주요 화면 구현됨

### 핵심 차별점

- **의지력이 아닌 시스템**: 5가지 심리학 이론 적용
- **자기 연민**: 실패 후 즉각 복귀 지원
- **과학적 근거**: 국제 저널 논문 기반 (IJNS 2024, BJP 2021 등)

---

## 🏗️ 기술 스택

### 필수 스택

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

### 개발 환경

```bash
# 개발 서버 시작 (http://localhost:8282)
npm run dev

# 프로덕션 빌드
npm run build

# 린팅
npm run lint
```

**상세**: [docs/TECH_STACK.md](docs/TECH_STACK.md)

---

## 📁 프로젝트 구조

```
girogi-web/src/
├── app/                    # Next.js 16 App Router
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈 페이지 (/)
│   ├── home/               # ✅ 홈 대시보드
│   ├── checklist/          # ✅ 체크리스트 화면
│   ├── emergency/          # ✅ 유혹 극복 화면
│   ├── community/          # ✅ 커뮤니티 화면
│   └── profile/            # ✅ 프로필 화면
│
├── components/             # UI 컴포넌트
│   ├── home/               # 홈 전용 (StreakCounter, MissionCard 등)
│   ├── checklist/          # 체크리스트 전용
│   ├── emergency/          # 유혹 극복 전용
│   ├── community/          # 커뮤니티 전용
│   ├── profile/            # 프로필 전용
│   ├── navigation/         # 하단 탭바
│   └── common/             # 공통 컴포넌트
│
├── lib/                    # API, 훅, 유틸리티
├── stores/                 # Zustand 스토어
└── types/                  # TypeScript 타입 및 Zod 스키마
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
- ✅ **디자인 시스템** 완성 (Tailwind 4.0 테마)
- ✅ **컴포넌트 구조** 갖춰짐 (화면별 폴더 분리)
- ✅ **필수 라이브러리** 설치 (Zustand, TanStack Query, Zod 등)

### 현재 작업 중

- ⏳ **API 연동** (현재 Mock 데이터)
- ⏳ **인증 시스템** (로그인, 회원가입)
- ⏳ **PWA 설정** (오프라인 지원, 설치 가능)

### 미구현 (백엔드 필요)

- ❌ Firebase/Supabase 연동
- ❌ 이미지 업로드
- ❌ 푸시 알림 (PWA 제약 있음)

---

## 🚀 다음 할 일

> `.claude/250209-다이어트앱-연구기반-분석.md` 보고서 기반

### 🔥 최우선 (연구 효과 극대화)

**1. EFT 목표 이미지 필수화**
- 온보딩 시 목표 이미지 설정 강제
- 기본 이미지 10개 제공 (헬스 모델, 운동복 입은 사람 등)
- 파일: `src/app/onboarding/page.tsx` (신규 생성)
- 예상 효과: EFT ⭐⭐⭐⭐☆ → ⭐⭐⭐⭐⭐

**2. 보상 사용 메커니즘 구현**
- "과자박스 사용하기" 버튼 추가
- 사용 시 기록 남기기 (언제, 무엇을 먹었는지)
- 파일: `src/components/home/RewardStatusCard.tsx` 수정
- 예상 효과: Temptation Bundling 완성

**3. EFT 동기부여 메시지 다양화**
- 10가지 메시지를 랜덤으로 표시
- 시간대별 맞춤 메시지 (아침/점심/저녁)
- 파일: `src/lib/constants.ts` + `FutureSelfCard.tsx`
- 예상 효과: 반복 노출 시 효과 감소 방지

### ⭐ 중요 (연구 의도 정확도 향상)

**4. Implementation Intention "When-Where-What" 형식화**
- 체크리스트 항목: "🕐 10:30에 💼 사무실에서 💧 물 500ml"
- 사용자 커스터마이징 가능
- 파일: `src/app/checklist/page.tsx` 수정
- 예상 효과: Implementation Intention ⭐⭐⭐☆☆ → ⭐⭐⭐⭐⭐

**5. Self-Compassion 허가 효과 경고 강화**
- "⚠️ '내일부터'는 금물! 지금 바로 다시 시작하세요" 문구 추가
- 실패 리포트 작성 권장 팝업
- 파일: `src/components/emergency/SelfCompassionCard.tsx`

**6. Tiny Habits 점진적 증가 로직**
- 1주차: 스쿼트 1개 → 2주차: 3개 → 3주차: 5개
- 파일: `src/lib/constants.ts` + `MissionCard.tsx`

### 💡 권장 (사용자 경험 개선)

**7. 환경 설계 온보딩 체크리스트**
- "배달앱 삭제했나요?" (Yes/No)
- "과자를 눈에 안 보이는 곳에 뒀나요?"
- 파일: `src/app/onboarding/page.tsx`

**8. Slow Eating 타이머**
- 식사 시작 시 20분 타이머
- 20분 경과 시 "천천히 잘 드셨네요!" 칭찬
- 파일: `src/components/checklist/` (신규)

**9. 푸시 알림 시스템 (PWA 제약 고려)**
- 10:30 물 리마인더
- 저녁 8시 "지금 먹으면 늦어요" 경고
- 23:55 "Streak 위험!" 긴급 알림
- 파일: `src/lib/notifications.ts` (신규)

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

### 필수 문서 (읽는 순서)

1. **`CLAUDE.md`** (이 문서) ← 먼저 읽기
2. **`docs/TECH_STACK.md`** ← 개발 시작 전
3. **`docs/RESEARCH_STRATEGIES.md`** ← 기능 구현 시
4. **`.claude/250209-다이어트앱-연구기반-분석.md`** ← 상세 분석 필요시

### 미래 기능 아이디어

- **`docs/FUTURE_FEATURES.md`** ← 나중에 구현하면 좋은 추가 기능
  - 심리학 연구 기반 10가지 추천 기능 (사진 일기, 습관 스택킹, 책임 파트너 등)
  - 4단계 로드맵 (Phase 1-4)
  - 우선순위별 정리 (구현 난이도 + 효과 기준)

### Flutter 시점 문서 (아카이브)

- `docs/archive/` 폴더에 보관
- Flutter MVP 개발 히스토리 (Phase 1-11)
- 참고용으로만 사용 (더 이상 개발하지 않음)

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

**문서 버전**: 3.0 (Next.js 기준)
**이전 버전**: `docs/archive/CLAUDE_FULL.md` (Flutter 기준)
**최종 수정**: 2026-02-09

> 이 문서는 Claude가 GIROGI 프로젝트를 이해하고 작업하기 위한 핵심 가이드입니다.
> Next.js 전환이 완료되었으며, 5개 주요 화면이 구현되어 있습니다.
> 다음 단계는 연구 분석 보고서의 개선 제안을 코드에 반영하는 것입니다.
