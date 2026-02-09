# GIROGI 웹 기술 스택

> Next.js 기반 과학적 다이어트 앱 기술 문서
> **작성일**: 2026-02-09
> **버전**: 2.0 (통합판)

---

## 📋 목차

1. [빠른 참조](#1-빠른-참조)
2. [최종 선정 스택](#2-최종-선정-스택)
3. [선정 이유 상세](#3-선정-이유-상세)
4. [프로젝트 구조](#4-프로젝트-구조)
5. [개발 가이드](#5-개발-가이드)

---

## 1. 빠른 참조

### 🚀 설치 및 시작 (복사해서 사용)

```bash
# 1. 프로젝트 클론 (이미 있다면 생략)
cd girogi-web

# 2. 의존성 설치
npm install

# 3. 개발 서버 시작 (http://localhost:8282)
npm run dev

# 4. 프로덕션 빌드
npm run build

# 5. 린팅
npm run lint
```

### 📦 현재 설치된 패키지 (package.json)

```json
{
  "dependencies": {
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "@tanstack/react-query": "^5.90.20",
    "zustand": "^5.0.11",
    "zod": "^4.3.6",
    "lucide-react": "^0.563.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.1.6"
  }
}
```

### 💻 자주 사용하는 명령어

```bash
# 개발 서버 (포트 8282)
npm run dev

# 타입 체크
npx tsc --noEmit

# 특정 파일 포맷팅
npx prettier --write src/app/page.tsx
```

### 🎨 코드 스니펫

#### Zustand Store

```typescript
// src/stores/useUserStore.ts
import { create } from 'zustand'

interface UserState {
  streak: number
  incrementStreak: () => void
}

export const useUserStore = create<UserState>((set) => ({
  streak: 0,
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
}))
```

#### TanStack Query Hook

```typescript
// src/lib/hooks/useDailyRecord.ts
import { useQuery } from '@tanstack/react-query'

export function useDailyRecord(date: Date) {
  return useQuery({
    queryKey: ['dailyRecord', date],
    queryFn: () => fetch(`/api/daily-record/${date.toISOString()}`).then(res => res.json()),
  })
}
```

#### Zod Schema

```typescript
// src/types/models/dailyRecord.ts
import { z } from 'zod'

export const DailyRecordSchema = z.object({
  id: z.string(),
  date: z.date(),
  coreMissions: z.array(ChecklistItemSchema),
  isSuccessDay: z.boolean(),
})

export type DailyRecord = z.infer<typeof DailyRecordSchema>
```

---

## 2. 최종 선정 스택

### 🎯 핵심 스택 (한눈에 보기)

```
┌─────────────────────────────────────────────────┐
│                   GIROGI WEB                     │
│              Technology Stack 2026               │
└─────────────────────────────────────────────────┘

📦 Framework & Language
├─ Next.js 16 (App Router + React 19)
├─ TypeScript 5.7+
└─ Node.js 20+

🎨 Styling
└─ Tailwind CSS 4.0 (Oxide Engine)

🔄 State Management
├─ Zustand (클라이언트 상태) - 1.2KB
└─ TanStack Query v5 (서버 상태) - 40KB

📝 Validation & Icons
├─ Zod v4 (타입 검증) - 1.37KB
└─ Lucide React (아이콘) - Tree-shakable

🛠️ Tooling
├─ ESLint (Lint)
├─ Prettier (Format)
└─ TypeScript (타입 체크)
```

### 📊 번들 사이즈 (gzipped 기준)

| 카테고리 | 크기 | 비고 |
|---------|------|------|
| Next.js 16 기본 | ~85KB | 필수 |
| Zustand | 1.2KB | ⭐ 최소 |
| TanStack Query | 13KB | 캐싱 강력 |
| Tailwind CSS | 10KB | 런타임 0KB |
| Zod | 1.4KB | ⭐ 작음 |
| 기타 | ~20KB | 아이콘, 유틸 |
| **총합** | **~130KB** | ✅ 목표 달성 |

---

## 3. 선정 이유 상세

### 🏆 주요 기술 선정 근거

#### Next.js 16 (vs React SPA)

**선택 이유**:
- ✅ SEO 필수 (웹 검색 노출)
- ✅ Server Components로 성능 향상
- ✅ App Router (최신 표준)
- ✅ 이미지 최적화 내장

**대안**:
- ❌ Create React App: React 팀이 권장 중단
- ❌ Vite + React: SSR 직접 구현 필요

#### Tailwind CSS 4.0 (vs CSS-in-JS)

**선택 이유**:
- ✅ Oxide Engine으로 **10배 빠른 빌드** (105ms vs 960ms)
- ✅ **0KB 런타임** (styled-components는 15KB)
- ✅ Next.js 16 Server Components **완벽 호환**
- ❌ styled-components/Emotion은 RSC에서 동작 안 함

**대안**:
- ❌ CSS Modules: 유틸리티 클래스 없음
- ❌ styled-components: RSC 호환 안 됨

#### Zustand (vs Recoil/Redux)

**선택 이유**:
- ✅ **1.2KB** 번들 (Recoil 15KB 대비 13배 작음)
- ✅ **초보자도 15분** 안에 학습 가능
- ✅ Redux 대비 **90% 적은 보일러플레이트**
- ✅ 성능 최고 (Flux 패턴으로 최소 리렌더링)

**대안**:
- ❌ Recoil: 2025년 현재까지 실험적 단계, 15KB
- ❌ Redux Toolkit: 보일러플레이트 많음
- ✅ Jotai: 괜찮지만 Zustand가 더 직관적

#### TanStack Query v5 (vs SWR)

**선택 이유**:
- ✅ **무한 스크롤** 내장 (커뮤니티 피드 필수)
- ✅ **Optimistic Update** 강력
- ✅ **DevTools** 우수
- ✅ Next.js 16 App Router 최적화

**대안**:
- 🟡 SWR: 11KB로 더 작지만 기능 부족

#### Zod v4 (vs Valibot/Yup)

**선택 이유**:
- ✅ **TypeScript-first** (타입 추론 완벽)
- ✅ 생태계 성숙 (React Hook Form, tRPC 등)
- ✅ 에러 메시지 커스터마이징 쉬움

**대안**:
- Valibot: 1.37KB로 더 작지만 생태계 작음
- Yup: 타입 추론 약함

---

## 4. 프로젝트 구조

### 📁 디렉토리 구조

```
girogi-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 홈 페이지 (/)
│   │   ├── home/               # 홈 대시보드 (/home)
│   │   ├── checklist/          # 체크리스트 (/checklist)
│   │   ├── emergency/          # 유혹 극복 (/emergency)
│   │   ├── community/          # 커뮤니티 (/community)
│   │   ├── profile/            # 프로필 (/profile)
│   │   └── (showcase)/         # 디자인 쇼케이스 (개발용)
│   │
│   ├── components/             # UI 컴포넌트
│   │   ├── home/               # 홈 전용 컴포넌트
│   │   │   ├── StreakCounter.tsx
│   │   │   ├── MissionCard.tsx
│   │   │   ├── WeeklyCalendar.tsx
│   │   │   └── RewardStatusCard.tsx
│   │   ├── checklist/          # 체크리스트 전용
│   │   ├── emergency/          # 유혹 극복 전용
│   │   ├── community/          # 커뮤니티 전용
│   │   ├── profile/            # 프로필 전용
│   │   ├── navigation/         # 네비게이션 (하단 탭바)
│   │   └── common/             # 공통 컴포넌트
│   │
│   ├── lib/                    # 라이브러리, 유틸리티
│   │   ├── hooks/              # Custom Hooks
│   │   ├── api/                # API 클라이언트
│   │   ├── constants.ts        # 전역 상수
│   │   └── utils/              # 유틸리티 함수
│   │
│   ├── stores/                 # Zustand 스토어
│   │   ├── useUserStore.ts     # 사용자 상태
│   │   ├── useDailyRecordStore.ts
│   │   └── usePostStore.ts
│   │
│   └── types/                  # TypeScript 타입
│       └── models/             # 데이터 모델
│           ├── dailyRecord.ts
│           ├── user.ts
│           └── post.ts
│
├── public/                     # 정적 파일
├── tailwind.config.ts          # Tailwind 설정
├── tsconfig.json               # TypeScript 설정
└── package.json
```

### 🎯 파일 네이밍 규칙

- **컴포넌트**: PascalCase (`StreakCounter.tsx`)
- **페이지**: `page.tsx` (Next.js 규칙)
- **훅**: `use` 접두사 (`useDailyRecord.ts`)
- **타입**: PascalCase (`DailyRecord`, `User`)
- **상수**: UPPER_SNAKE_CASE (`DAYS_FOR_SNACK_BOX`)
- **유틸 함수**: camelCase (`calculateStreak`)

---

## 5. 개발 가이드

### 🎨 코드 스타일

#### TypeScript

```typescript
// ✅ 좋은 예
export function calculateStreak(records: DailyRecord[]): number {
  // 명확한 타입, 순수 함수
}

// ❌ 나쁜 예
function calc(data: any) {
  // any 타입, 모호한 함수명
}
```

#### React 컴포넌트

```typescript
// ✅ 좋은 예
interface StreakCounterProps {
  currentStreak: number
  bestStreak: number
}

export function StreakCounter({ currentStreak, bestStreak }: StreakCounterProps) {
  return (
    <div className="flex flex-col items-center">
      {/* ... */}
    </div>
  )
}

// ❌ 나쁜 예
export default function Component(props: any) {
  // default export, any 타입
}
```

#### Tailwind CSS

```tsx
// ✅ 좋은 예: Utility-first
<div className="flex items-center gap-2 rounded-lg bg-primary p-4">

// ❌ 나쁜 예: 인라인 스타일
<div style={{ display: 'flex', alignItems: 'center' }}>
```

### 🧪 테스트 전략 (예정)

```typescript
// 단위 테스트 (Vitest)
describe('calculateStreak', () => {
  it('연속 성공 일수 계산', () => {
    expect(calculateStreak(mockRecords)).toBe(5)
  })
})

// 컴포넌트 테스트 (React Testing Library)
it('Streak 숫자 표시', () => {
  render(<StreakCounter currentStreak={5} bestStreak={12} />)
  expect(screen.getByText('5일')).toBeInTheDocument()
})
```

### 📋 개발 체크리스트

새로운 기능 추가 시:

- [ ] TypeScript strict 모드 통과
- [ ] Zod 스키마로 데이터 검증
- [ ] Zustand store 또는 TanStack Query 사용
- [ ] Tailwind utility 클래스만 사용
- [ ] 재사용 가능한 컴포넌트로 분리
- [ ] PropTypes 대신 TypeScript interface
- [ ] 상수는 `lib/constants.ts`에 정의
- [ ] 비즈니스 로직은 별도 함수로 분리

---

## 🚀 성능 최적화

### 이미지 최적화

```tsx
import Image from 'next/image'

// ✅ Next.js Image 컴포넌트 사용
<Image
  src="/profile.jpg"
  alt="Profile"
  width={80}
  height={80}
  priority // 중요 이미지
/>

// ❌ 일반 img 태그
<img src="/profile.jpg" />
```

### 코드 스플리팅

```tsx
// ✅ Dynamic import
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

### Tailwind 최적화

```bash
# 프로덕션 빌드 시 자동으로 purge됨
npm run build
```

---

## 🔄 상태 관리 패턴

### Zustand (클라이언트 상태)

**용도**: UI 상태, 전역 설정

```typescript
// ✅ 사용 예
const { streak, incrementStreak } = useUserStore()
```

### TanStack Query (서버 상태)

**용도**: API 데이터, 캐싱

```typescript
// ✅ 사용 예
const { data, isLoading } = useDailyRecord(new Date())
```

### 언제 무엇을 쓸까?

| 상태 종류 | 도구 | 예시 |
|----------|------|------|
| 서버 데이터 | TanStack Query | 일일 기록, 게시글 목록 |
| UI 상태 | Zustand | 모달 열림/닫힘, 선택된 탭 |
| 전역 설정 | Zustand | 사용자 닉네임, Streak |
| 폼 상태 | React Hook Form | 로그인 폼, 게시글 작성 |

---

## 📚 학습 리소스

### 공식 문서 (우선순위 순)

1. **Next.js 16**: https://nextjs.org/docs
2. **Tailwind CSS 4.0**: https://tailwindcss.com/docs
3. **Zustand**: https://docs.pmnd.rs/zustand
4. **TanStack Query**: https://tanstack.com/query/latest/docs
5. **Zod**: https://zod.dev

### 한국어 커뮤니티

- Next.js 한국 사용자 그룹: https://nextjs.kr
- 코드스테이츠: Next.js 무료 강의

---

## ⚠️ 주의사항

### ❌ 절대 사용 금지

| 금지 항목 | 이유 |
|----------|------|
| CSS-in-JS (styled-components, Emotion) | Next.js 16 Server Components 호환 안 됨 |
| Create React App | React 팀 권장 중단 |
| Moment.js | 230KB, Tree-shaking 불가, 유지보수 중단 |
| any 타입 | TypeScript 의미 없어짐 |

### ✅ 반드시 사용

| 필수 항목 | 이유 |
|----------|------|
| TypeScript strict 모드 | 타입 안전성 |
| Tailwind utility 클래스 | 일관성, 성능 |
| Zod 스키마 검증 | 런타임 안전성 |
| Next.js Image 컴포넌트 | 성능 최적화 |

---

## 🔄 마이그레이션 가이드 (Flutter → Next.js)

### 개념 대응표

| Flutter | Next.js | 비고 |
|---------|---------|------|
| Widget | Component | React 컴포넌트 |
| StatefulWidget | useState Hook | 상태 관리 |
| Provider (Riverpod) | Zustand | 전역 상태 |
| MaterialApp | RootLayout | 앱 루트 |
| Navigator | Next.js Router | 페이지 전환 |
| Theme | Tailwind Config | 디자인 토큰 |

### 파일 경로 대응

| Flutter | Next.js |
|---------|---------|
| `lib/presentation/screens/home/` | `src/app/home/` |
| `lib/presentation/widgets/home/` | `src/components/home/` |
| `lib/data/models/` | `src/types/models/` |
| `lib/data/repositories/` | `src/lib/api/` |
| `lib/core/constants/` | `src/lib/constants.ts` |

---

**문서 버전**: 2.0 (통합판)
**마지막 업데이트**: 2026-02-09
**작성자**: Claude AI Assistant
**다음 업데이트**: 프로덕션 배포 후 피드백 반영
