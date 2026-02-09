# GIROGI 코드 리뷰

> 기존 프로젝트(chatbot-jini-frontend, chatgpt-webapp/personal-topic) 코딩 스타일 기준 비교 리뷰
> 리뷰 일자: 2026-02-09

---

## 요약

| 항목 | 기존 프로젝트 스타일 | GIROGI 현재 상태 | 판정 |
|------|---------------------|------------------|------|
| 파일 네이밍 | kebab-case (`card-topic.tsx`) | PascalCase (`MissionCard.tsx`) | !! 불일치 |
| 폴더 구조 | `_` prefix (`_hook/`, `_types/`, `_components/`) | prefix 없음 | !! 불일치 |
| `'use client'` | 필요한 곳에 빠짐없이 선언 | 대부분 누락 | !!! 심각 |
| import 순서 | ESLint 규칙으로 강제 | 비일관적 | !! 불일치 |
| JSDoc | `/** @desc */` 한국어 주석 | 일반 `//` 주석 | ! 차이 |
| useCallback/useMemo | 적극적으로 사용 | 전혀 미사용 | !! 불일치 |
| memo() | 순수 표시 컴포넌트에 적용 | 전혀 미사용 | ! 차이 |
| 에러 핸들링 | try-catch + toast/modal | 미처리 또는 alert() | !! 불일치 |
| 타입 안전성 | strict, `as const`, Pick, Union | 기본 수준 | ! 차이 |
| 상수 관리 | `as const` + 중앙 집중 | 파일 간 중복 | !! 불일치 |
| Tailwind 동적 클래스 | classnames 라이브러리 사용 | 문자열 보간 (동작 안 함) | !!! 심각 |
| 스토리지 | wrapper 함수 + try-catch | 직접 호출, 에러 처리 없음 | !! 불일치 |
| Boolean 네이밍 | `is*`, `has*`, `show*` 일관적 | 비일관적 | ! 차이 |
| cleanup/메모리 | useEffect cleanup, AbortController | 미처리 | ! 차이 |

**판정 기준**: `!!!` 심각(빌드/런타임 오류) / `!!` 불일치(스타일 위반) / `!` 차이(개선 권장)

---

## 1. 가독성 / 유지보수성

### 1-1. 파일 네이밍 컨벤션 불일치

**기존 스타일** (chatgpt-webapp):
```
card-topic.tsx          # kebab-case
chat-message-box.tsx
form-name.tsx
button-more.tsx
```

**GIROGI 현재**:
```
MissionCard.tsx         # PascalCase
StreakCounter.tsx
WeeklyCalendar.tsx
RewardStatusCard.tsx
```

> CLAUDE.md에서 "컴포넌트: PascalCase.tsx"로 정의했으므로 의도적 선택이라면 무방하나,
> 기존 프로젝트와 스타일 통일이 필요하다면 kebab-case로 변경 고려.

### 1-2. 폴더 구조

**기존 스타일** (chatgpt-webapp):
```
personal-topic/
├── _types/              # underscore prefix로 라우팅에서 제외
├── _components/
├── _hook/
├── (manage)/            # route group
│   ├── _components/
│   ├── _hook/
│   ├── create/page.tsx
│   └── edit/[id]/page.tsx
└── page.tsx
```

**GIROGI 현재**:
```
app/
├── home/page.tsx
├── checklist/page.tsx
├── emergency/page.tsx
├── community/page.tsx
└── profile/page.tsx

components/              # app 폴더 밖에 분리
├── home/
├── checklist/
├── emergency/
└── ...
```

**차이점**:
- 기존 프로젝트는 **feature별 co-location** (페이지 폴더 안에 `_components/`, `_hook/`, `_types/` 배치)
- GIROGI는 `components/`를 최상위에 분리 → 파일 간 거리가 멀어져 탐색 불편
- `_hook/`, `_types/` 폴더 패턴이 없어 hook과 type이 체계적으로 관리되지 않음

### 1-3. JSDoc 주석 스타일

**기존 스타일**:
```typescript
/** @desc 파일 업로드 통합 훅 */
export const useFileUpload = (): UseFileUploadReturn => { ... }

/** @desc 입력값 관련 훅 */
const useInput = () => { ... }
```

**GIROGI 현재**:
```typescript
// 미래 자아 시각화 카드 (EFT - Episodic Future Thinking)
// 연구 기반: IJNS 2024 - 목표 이미지 시각화...
export function FutureSelfCard({ ... }) { ... }
```

> 기존 프로젝트는 `/** @desc */` JSDoc 형식을 일관되게 사용.
> GIROGI는 일반 `//` 주석으로 설명이 길고 비정형적.

---

## 2. 코드 스타일 일관성

### 2-1. `'use client'` 누락 (심각)

기존 프로젝트에서는 클라이언트 컴포넌트에 빠짐없이 `'use client'`를 선언하나,
GIROGI에서는 **13개 파일**에서 누락:

| 파일 | useState/onClick 사용 | `'use client'` |
|------|----------------------|----------------|
| `StreakCounter.tsx` | - | 누락 |
| `WeeklyCalendar.tsx` | - | 누락 |
| `MissionCard.tsx` | onClick | 누락 |
| `ChecklistTimeSection.tsx` | - | 누락 |
| `FutureSelfCard.tsx` | useState, useEffect | **있음** |
| `SelfCompassionCard.tsx` | - | 누락 |
| `FailureReportDialog.tsx` | useState | 누락 |
| `PostCard.tsx` | useState | 누락 |
| `PostComposerDialog.tsx` | useState | 누락 |
| `ReactionBar.tsx` | - | 누락 |
| `ProfileHeader.tsx` | - | 누락 |
| `MealTimelineItem.tsx` | - | 누락 |
| `TemptationTimer.tsx` | useState, useEffect, useRef | 누락 |

> Next.js App Router에서 `useState`, `onClick` 등 클라이언트 기능 사용 시
> `'use client'`가 없으면 **빌드 에러 또는 런타임 하이드레이션 에러** 발생.

### 2-2. import 순서

**기존 스타일** (ESLint `import/order` 규칙 적용):
```typescript
// 1. React / Next.js
import React, { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';

// 2. 외부 라이브러리
import classNames from 'classnames';

// 3. 내부 모듈 (@/ alias)
import { useAppSelector } from '@/redux/hooks';
import MessageDate from '@/components/MessageDate';

// 4. type imports (별도 그룹)
import type { StreamingMessage } from '../_hook/useUserTopicChat';

// 5. 로컬 상대 경로
import ChatMessageFiles from './chat-message-files';
```

**GIROGI 현재** (비일관적):
```typescript
// 순서가 파일마다 다름
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'
import type { Post, User } from '@/types'

// 다른 파일에서는:
import { useState, useEffect } from 'react'
import { Sunrise, ImagePlus, Lightbulb } from 'lucide-react'
import { EFT_MOTIVATION_MESSAGES } from '@/lib/constants'
```

> ESLint `import/order` 규칙이 설정되어 있지 않아 일관성 부재.

### 2-3. useCallback / useMemo 미사용

**기존 스타일**:
```typescript
// 핸들러는 반드시 useCallback으로 래핑
const handleFileRemove = useCallback((fileId: string) => {
  setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
}, []);

// 비용이 큰 연산은 useMemo
const { historyMessages, sessionMessages } = useMemo(() => {
  return messages.reduce<...>((acc, msg) => { ... }, { ... });
}, [messages]);
```

**GIROGI 현재**:
```typescript
// useCallback 없이 인라인 핸들러
const handleMissionToggle = (missionId: string) => {
  setMissions(prev => prev.map(m =>
    m.id === missionId ? { ...m, isCompleted: !m.isCompleted } : m
  ));
};

// useMemo 없이 매 렌더마다 재계산
const completedMissions = missions.filter(m => m.isCompleted).length;
```

> 기존 프로젝트에서는 **핸들러 = useCallback, 파생값 = useMemo**가 규칙.
> GIROGI에서는 두 가지 모두 전혀 사용하지 않음.

### 2-4. memo() 미사용

**기존 스타일**:
```typescript
const CardTopic = memo(function CardTopic({ item }: { item: GptsItem }) {
  // ...
});
export default CardTopic;
```

**GIROGI 현재**: `memo()` 사용 없음.

> 리스트 아이템(`PostCard`, `MealTimelineItem` 등)은 `memo()`로 감싸는 것이 기존 패턴.

---

## 3. 잠재적 버그 / 사이드이펙트

### 3-1. Tailwind 동적 클래스 (빌드 시 누락됨)

**문제 파일**: `ChecklistTimeSection.tsx`, `UseRewardDialog.tsx`

```typescript
// ChecklistTimeSection.tsx:73-75
const bgColorClass = `bg-${colorClass}`;        // Tailwind에서 동작 안 함
const textColorClass = `text-${colorClass}`;
const borderColorClass = `border-${colorClass}`;

// UseRewardDialog.tsx:97
className={`bg-${color}-50`}                    // 동작 안 함
```

**기존 스타일** (classnames 라이브러리 사용):
```typescript
import classNames from 'classnames';

className={classNames(
  'fixed inset-0 z-drawer bg-black/70',
  isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
)}
```

**해결 방법**: 객체 매핑 또는 classnames 라이브러리 사용
```typescript
const colorMap = {
  morning: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500' },
  afternoon: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500' },
  evening: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500' },
} as const;
```

### 3-2. localStorage 에러 핸들링 부재

**기존 스타일** (chatbot-jini):
```javascript
const loadFromStorage = (key, defaultValue) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return defaultValue;
  }
};
```

**GIROGI 현재** (에러 핸들링 없음):
```typescript
// OnboardingPage.tsx - try-catch 없음
localStorage.setItem(GOAL_IMAGE_KEY, goalImage);
localStorage.setItem(GOAL_WEIGHT_KEY, targetWeight);

// UseRewardDialog.tsx:65 - JSON.parse가 throw할 수 있음
const existingUsages = localStorage.getItem(REWARD_USAGE_KEY);
const usages = existingUsages ? JSON.parse(existingUsages) : [];

// page.tsx - parseInt 결과 NaN 가능
const savedCount = localStorage.getItem(SNACK_BOX_COUNT_KEY);
if (savedCount) setSnackBoxCount(parseInt(savedCount));
```

> 기존 프로젝트는 **스토리지 접근을 래퍼 함수로 추상화**하고 항상 try-catch 적용.
> GIROGI는 직접 호출 + 에러 처리 없음 → 스토리지 비활성화 환경에서 크래시.

### 3-3. 라우팅 경로 오류

```typescript
// OnboardingPage.tsx:92
router.push('/home');
```

> `/home` 라우트가 실제로 존재하는지 확인 필요. `page.tsx`가 `/`에 있다면 `/home`은 404.

### 3-4. 비편향 셔플 알고리즘 미사용

```typescript
// FutureSelfCard.tsx
const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);  // 편향된 셔플
  return shuffled.slice(0, count);
};
```

> `Math.random() - 0.5`는 균일 분포가 아님. Fisher-Yates 알고리즘 사용이 정석.

### 3-5. 타입 안전성 미흡

```typescript
// PostCard.tsx:44 - ReactionType enum 대신 string 사용
onReactionTap?: (reactionType: string) => void;
// 기존 스타일이라면:
onReactionTap?: (reactionType: ReactionType) => void;

// page.tsx:39 - 하드코딩된 fallback
const bestStreak = mockCurrentUser.bestStreak || 12;
```

### 3-6. useEffect cleanup 부재

**기존 스타일**:
```typescript
useEffect(() => {
  const controller = new AbortController();
  fetchData(controller.signal);
  return () => controller.abort();  // cleanup
}, []);
```

**GIROGI 현재**:
```typescript
// TemptationTimer.tsx - setInterval cleanup은 있으나
useEffect(() => {
  if (isRunning && timeLeft > 0) {
    timerRef.current = setInterval(() => { ... }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }
}, [isRunning, timeLeft]);
// 하지만 다른 컴포넌트들의 useEffect에는 cleanup 없음
```

---

## 4. 성능

### 4-1. 불필요한 리렌더링

**홈 페이지 (`page.tsx`)**:
```typescript
// missions 상태가 변경되면 전체 페이지 리렌더링
const [missions, setMissions] = useState(initialMissions);

// 매 렌더마다 재계산 (useMemo 미사용)
const completedMissions = missions.filter(m => m.isCompleted).length;
const isSuccess = completedMissions >= MIN_CORE_MISSIONS_FOR_SUCCESS;
```

**기존 스타일이라면**:
```typescript
const completedMissions = useMemo(
  () => missions.filter(m => m.isCompleted).length,
  [missions]
);

const handleMissionToggle = useCallback((missionId: string) => {
  setMissions(prev => prev.map(m =>
    m.id === missionId ? { ...m, isCompleted: !m.isCompleted } : m
  ));
}, []);
```

### 4-2. 이미지 에러 핸들링

```typescript
// PostCard.tsx:145-148
onError={(e) => {
  (e.target as HTMLImageElement).style.display = 'none';
}}
```

> 인라인 스타일로 숨기는 것은 접근성, 레이아웃 시프트 문제 발생.
> fallback UI 또는 placeholder 이미지 표시가 기존 패턴.

### 4-3. 리스트 렌더링 최적화 부재

```typescript
// community/page.tsx - 모든 포스트를 한 번에 렌더링
{filteredPosts.map((post) => (
  <PostCard key={post.id} ... />  // memo() 미적용
))}
```

> 기존 프로젝트에서는 리스트 아이템에 `memo()` 적용 + 페이지네이션 사용.

---

## 5. 중복 / 추상화

### 5-1. 상수 중복 정의

```typescript
// constants.ts에 정의됨
export const DAYS_FOR_SNACK_BOX = 3;
export const DAYS_FOR_CHEAT_DAY = 7;

// RewardStatusCard.tsx에서 재정의 (!!!)
const DAYS_FOR_SNACK_BOX = 3;
const DAYS_FOR_CHEAT_DAY = 7;
```

> 동일 상수를 두 곳에서 정의 → 하나만 변경 시 불일치 발생.

### 5-2. 색상 매핑 중복

```typescript
// ChecklistTimeSection.tsx:42-60
const getTimeSlotColor = (timeSlot: string) => {
  switch (timeSlot) {
    case 'morning': return 'orange-500';
    case 'afternoon': return 'amber-500';
    // ...
  }
};

// MealTimelineItem.tsx:31-56 - 유사한 색상 매핑 반복
const mealTypeConfig = {
  breakfast: { color: 'text-orange-500', bg: 'bg-orange-50', ... },
  lunch: { color: 'text-amber-600', bg: 'bg-amber-50', ... },
  // ...
};
```

> 기존 프로젝트라면 `_types/` 또는 `lib/constants.ts`에 통합 매핑 정의.

### 5-3. 시간 포맷 함수 중복

```typescript
// PostCard.tsx:254
const formatTimestamp = (date: Date): string => { ... };

// MealTimelineItem.tsx:73
new Date(record.loggedAt).toLocaleTimeString('ko-KR', { ... });
```

> 기존 프로젝트에서는 `_utils/helper.js`에 `formatYYMMDD()`, `getCurrentTime()` 등 통합 관리.

### 5-4. 다이얼로그/모달 구조 중복

`FailureReportDialog.tsx`, `PostComposerDialog.tsx`, `UseRewardDialog.tsx` 모두 유사한 구조:
```typescript
// 반복되는 패턴:
<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
  <div className="bg-white rounded-2xl ...">
    <div className="flex justify-between ...">  {/* 헤더 */}
    <div className="...">                        {/* 본문 */}
    <div className="flex gap-3 ...">             {/* 버튼 */}
  </div>
</div>
```

> 기존 프로젝트에서는 공통 Modal/Dialog 컴포넌트를 만들어 재사용:
> ```typescript
> openModal({ type: 'confirm', title: '삭제', messageContent: '...', onConfirm: () => {} });
> ```

### 5-5. 버튼 스타일 중복

여러 파일에서 동일한 Primary 버튼 스타일 반복:
```typescript
// 파일 A
<button className="w-full py-3 bg-primary text-white rounded-xl font-semibold">

// 파일 B
<button className="flex-1 py-3 bg-primary text-white rounded-xl font-medium">

// 파일 C
<button className="w-full py-2.5 bg-primary text-white rounded-lg font-medium">
```

> 미세한 차이(py-3/py-2.5, rounded-xl/rounded-lg, font-semibold/font-medium)가
> 의도인지 실수인지 판별 불가 → 공통 Button 컴포넌트 필요.

---

## 6. 기존 프로젝트에서 사용하지만 GIROGI에 없는 패턴

| 패턴 | chatbot-jini | chatgpt-webapp | GIROGI |
|------|:---:|:---:|:---:|
| ESLint import/order | O | O | X |
| Prettier 설정 | O | O | ? |
| classnames 라이브러리 | - | O | X |
| 스토리지 래퍼 함수 | O | - | X |
| 검증 결과 객체 `{isValid, message}` | O | O | X |
| Toast/Modal 피드백 | O | O | X (alert 사용) |
| useCallback/useMemo | O | O | X |
| memo() | - | O | X |
| AbortController cleanup | - | O | X |
| `as const` 상수 | - | O | X |
| Error Boundary | - | - | X |
| `/** @desc */` JSDoc | O | O | X |

---

## 7. 우선순위별 수정 권장 사항

### P0 - 즉시 수정 (빌드/런타임 오류)

1. **`'use client'` 추가** - 13개 파일
2. **동적 Tailwind 클래스 수정** - `bg-${color}` → 객체 매핑
3. **라우팅 경로 확인** - `/home` → `/`

### P1 - 빠른 시일 내 수정 (안정성)

4. **localStorage 래퍼 함수** 생성 + try-catch 적용
5. **상수 중복 제거** - `RewardStatusCard.tsx`에서 import로 변경
6. **공통 Dialog 컴포넌트** 추출
7. **JSON.parse 에러 핸들링** 추가

### P2 - 스타일 통일 (일관성)

8. **ESLint import/order 규칙** 추가
9. **useCallback/useMemo** 적용 (핸들러, 파생값)
10. **`/** @desc */` JSDoc** 형식으로 주석 통일
11. **classnames 라이브러리** 도입 (조건부 클래스)
12. **공통 Button 컴포넌트** 추출
13. **색상 매핑, 시간 포맷** 유틸 함수로 통합

### P3 - 장기 개선 (아키텍처)

14. **feature co-location** 구조로 전환 (`_components/`, `_hook/`, `_types/`)
15. **memo()** 리스트 아이템에 적용
16. **alert() → toast/modal** 시스템 교체
17. **검증 결과 객체 패턴** 도입
18. **Error Boundary** 추가
19. **파일 네이밍** kebab-case 통일 검토

---

## 8. 종합 평가

### AI 생성 코드의 특징적 패턴

GIROGI 코드에서 AI가 작성한 흔적이 보이는 부분:

1. **장황한 주석**: 심리학 이론 설명이 코드 안에 과도하게 포함 (기존 프로젝트는 `@desc` 한 줄)
2. **Mock 데이터 인라인 삽입**: 컴포넌트 파일 안에 대량의 더미 데이터 하드코딩
3. **성능 최적화 누락**: useCallback/useMemo/memo가 전혀 없음 (기존 프로젝트와 가장 큰 차이)
4. **에러 핸들링 부재**: "일단 동작하는" 코드 위주, defensive programming 부족
5. **스타일 미세 불일치**: 같은 버튼인데 py-3/py-2.5, rounded-xl/rounded-lg 등 미묘하게 다름
6. **동적 Tailwind 클래스**: 문자열 보간으로 클래스명 생성 (Tailwind 빌드 원리 이해 부족)
7. **`'use client'` 누락**: Next.js App Router의 서버/클라이언트 구분을 정확히 처리하지 못함

### 점수

| 항목 | 점수 (10점 만점) | 비고 |
|------|:---:|------|
| 가독성 | 7 | 구조는 명확하나 주석 과다, 네이밍 불일치 |
| 스타일 일관성 | 4 | 기존 프로젝트와 상당한 차이 |
| 타입 안전성 | 7 | 기본적 타입 정의는 좋으나 고급 패턴 부재 |
| 버그 안전성 | 4 | 동적 Tailwind, localStorage 미처리, 'use client' 누락 |
| 성능 | 5 | 메모이제이션 전무, 리스트 최적화 없음 |
| 중복/추상화 | 4 | 상수/색상/다이얼로그/버튼 중복 다수 |
| **종합** | **5.2** | **P0 수정 후 안정성 확보 → P1~P2로 스타일 통일 권장** |

---

*이 리뷰는 수정 사항을 포함하지 않습니다. 수정이 필요하면 우선순위별로 요청해 주세요.*
