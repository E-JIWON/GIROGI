# GIROGI Next.js 전환 계획 (간략판)

> **작성일**: 2026-02-06
> **예상 기간**: 2개월 (1명 풀타임)
> **진행 방식**: 단계별 완료 → README 업데이트 → 커밋

---

## 전환 이유

### Flutter의 한계
- 앱스토어 심사 필요 (업데이트 느림)
- SEO 불가능 (웹 검색 노출 X)
- 본인이 직접 수정하기 어려움 (Dart 언어)

### Next.js 선택
- 웹 우선 전략 (즉시 배포, SEO 완벽)
- TypeScript/React 익숙 (본인이 수정 가능)
- PWA → Capacitor로 앱 래핑 가능

---

## 최종 기술 스택 (필수만)

```typescript
// 처음에 설치
Next.js 15        // 프레임워크
TypeScript 5.7    // 언어
Tailwind CSS 4.0  // 스타일링
Zustand          // 상태 관리
TanStack Query   // 서버 데이터
Zod              // 타입 검증

// 나중에 필요하면 추가
shadcn/ui        // UI 컴포넌트
React Hook Form  // 폼 관리
Framer Motion    // 애니메이션
```

---

## 전환 단계 (8단계)

### Phase 1: 프로젝트 초기화 (2-3일)

**작업 내용**:
```bash
# 1. Next.js 프로젝트 생성
npx create-next-app@latest girogi-web --typescript --tailwind --app

# 2. 필수 패키지 설치
cd girogi-web
npm install zustand @tanstack/react-query zod

# 3. 폴더 구조 생성
mkdir -p src/{components,lib,stores,types}
```

**산출물**:
- Next.js 프로젝트 뼈대
- Tailwind 설정 완료
- 폴더 구조 생성

**커밋**: `feat: Next.js 프로젝트 초기화 (Phase 1)`

---

### Phase 2: 디자인 시스템 전환 (2-3일)

**작업 내용**:
- Flutter AppColors → Tailwind 테마 변환
- Flutter AppTypography → Tailwind 폰트 설정
- 색상, 간격, 반경 등 디자인 토큰 정의

**예시**:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        success: '#10B981',
        streak: {
          from: '#F59E0B',
          to: '#EF4444',
        },
      },
    },
  },
}
```

**산출물**:
- `tailwind.config.ts` 완성
- Flutter와 동일한 디자인 시스템

**커밋**: `feat: 디자인 시스템 전환 (Phase 2)`

---

### Phase 3: 데이터 모델 변환 (2-3일)

**작업 내용**:
- Flutter 14개 모델 → TypeScript 타입 + Zod 스키마
- Enum 타입 정의
- 비즈니스 로직 함수 분리

**예시**:
```typescript
// src/types/models/dailyRecord.ts
import { z } from 'zod'

export const DailyRecordSchema = z.object({
  id: z.string(),
  date: z.date(),
  coreMissions: z.array(ChecklistItemSchema),
})

export type DailyRecord = z.infer<typeof DailyRecordSchema>

// 비즈니스 로직
export function isSuccessDay(record: DailyRecord): boolean {
  return record.coreMissions.filter(m => m.isCompleted).length >= 2
}
```

**산출물**:
- `src/types/models/` 14개 파일
- Zod 스키마 완성

**커밋**: `feat: 데이터 모델 변환 완료 (Phase 3)`

---

### Phase 4: API 레이어 + Mock 데이터 (3-4일)

**작업 내용**:
- TanStack Query 설정
- Mock 데이터 (MSW 또는 하드코딩)
- API 훅 작성 (`useDailyRecord` 등)

**예시**:
```typescript
// src/lib/hooks/useDailyRecord.ts
import { useQuery } from '@tanstack/react-query'

export function useDailyRecord(date: Date) {
  return useQuery({
    queryKey: ['dailyRecord', date],
    queryFn: () => fetchDailyRecord(date),
  })
}
```

**산출물**:
- TanStack Query Provider 설정
- Mock 데이터 (7일치)
- 3개 Repository 대응 훅

**커밋**: `feat: API 레이어 및 Mock 데이터 구현 (Phase 4)`

---

### Phase 5: 홈 화면 (3-4일)

**작업 내용**:
- StreakCounter 컴포넌트
- MissionCard 컴포넌트
- WeeklyCalendar 컴포넌트
- RewardStatusCard 컴포넌트
- `/home` 페이지 조립

**Flutter 대응**:
```
lib/presentation/screens/home/         → src/app/(auth)/home/page.tsx
lib/presentation/widgets/home/         → src/components/home/
```

**산출물**:
- 4개 컴포넌트
- `/home` 페이지 완성

**커밋**: `feat: 홈 화면 구현 완료 (Phase 5)`

---

### Phase 6: 나머지 화면 (2주)

**6-1. 체크리스트 화면 (2-3일)**
- ChecklistTimeSection
- MealRecordButton
- `/checklist` 페이지

**커밋**: `feat: 체크리스트 화면 구현 (Phase 6-1)`

**6-2. 유혹 극복 화면 (3-4일)**
- TemptationTimer (10분 타이머)
- FutureSelfCard
- SelfCompassionCard
- FailureReportDialog
- `/emergency` 페이지

**커밋**: `feat: 유혹 극복 화면 구현 (Phase 6-2)`

**6-3. 커뮤니티 화면 (3-4일)**
- PostCard (5가지 타입)
- ReactionBar (6종 리액션)
- PostComposerDialog
- `/community` 페이지

**커밋**: `feat: 커뮤니티 화면 구현 (Phase 6-3)`

**6-4. 프로필 화면 (2-3일)**
- ProfileHeader
- MealTimelineItem
- `/profile` 페이지

**커밋**: `feat: 프로필 화면 구현 (Phase 6-4)`

---

### Phase 7: 네비게이션 (1-2일)

**작업 내용**:
- BottomNav 컴포넌트 (5개 탭)
- 페이지 전환 동작
- 공통 레이아웃 적용

**예시**:
```tsx
// src/components/common/BottomNav.tsx
const tabs = [
  { label: '홈', href: '/home', icon: '🏠' },
  { label: '체크리스트', href: '/checklist', icon: '✅' },
  { label: '유혹 극복', href: '/emergency', icon: '🆘' },
  { label: '커뮤니티', href: '/community', icon: '👥' },
  { label: '프로필', href: '/profile', icon: '👤' },
]
```

**산출물**:
- 하단 네비게이션 완성
- Flutter MainNavigation 대응

**커밋**: `feat: 하단 네비게이션 구현 (Phase 7)`

---

### Phase 8: PWA + 배포 (3-4일)

**작업 내용**:
- PWA 설정 (`next-pwa`)
- manifest.json 생성
- Vercel 배포
- 도메인 연결 (선택)

**예시**:
```json
// manifest.json
{
  "name": "GIROGI",
  "short_name": "GIROGI",
  "start_url": "/home",
  "display": "standalone"
}
```

**산출물**:
- PWA 설치 가능
- 프로덕션 URL

**커밋**: `feat: PWA 설정 및 배포 완료 (Phase 8)`

---

## 이후 단계 (선택)

### Phase 9: 인증 시스템 (1주)
- Supabase Auth 또는 Firebase Auth
- 로그인/회원가입 페이지
- Mock → 실제 DB 전환

### Phase 10: Capacitor 앱 래핑 (1주)
- iOS/Android 앱 생성
- WebView로 Next.js 로드
- 네이티브 기능 (카메라, 푸시)

---

## 폴더 구조 (최종)

```
girogi-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # 인증 필요 그룹
│   │   │   ├── home/
│   │   │   ├── checklist/
│   │   │   ├── emergency/
│   │   │   ├── community/
│   │   │   └── profile/
│   │   ├── layout.tsx
│   │   └── page.tsx            # 랜딩
│   │
│   ├── components/             # UI 컴포넌트
│   │   ├── home/
│   │   ├── checklist/
│   │   ├── emergency/
│   │   ├── community/
│   │   ├── profile/
│   │   └── common/
│   │
│   ├── lib/                    # 유틸리티
│   │   ├── api/                # API 클라이언트
│   │   ├── hooks/              # 커스텀 훅
│   │   └── utils/              # 헬퍼 함수
│   │
│   ├── stores/                 # Zustand 스토어
│   │   └── uiStore.ts
│   │
│   └── types/                  # TypeScript 타입
│       └── models/             # 14개 모델
│
├── public/                     # 정적 파일
├── .env.local                  # 환경 변수
├── tailwind.config.ts
└── package.json
```

---

## Flutter 앱 유지 전략

**단기 (현재)**:
- Flutter 앱은 그대로 보관
- Next.js 웹 앱 개발에 집중

**중기 (6개월 후)**:
- Next.js PWA 안정화
- Capacitor로 앱 래핑 시작

**장기 (1년 후)**:
- Capacitor 앱 출시
- Flutter 앱 단계적 중단

---

## 예상 일정 및 비용

**일정**:
- 1명 풀타임: 2개월
- 2명 팀: 1개월

**비용**:
- 개발: ₩8,000,000 (또는 본인 개발 시 무료)
- 호스팅: Vercel Pro $20/월
- 도메인: ₩15,000/년

---

## 작업 방식

**각 Phase마다**:
```
1. 기능 구현
2. README.md 업데이트 (해당 Phase 내역 추가)
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

---

**문서 버전**: 1.0 (간략판)
**최종 수정**: 2026-02-06

> 상세 기술 분석은 `.claude/web_analysis/` 참고
