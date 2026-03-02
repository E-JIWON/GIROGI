# PC 대시보드 UI 전환 계획

> **작성일**: 2026-02-26
> **목표**: 모바일 중심 UI → PC 친화적 사이드바 + 위젯 대시보드
> **레퍼런스**: Cake.io 대시보드 스타일

---

## 현재 상태 (Before)

```
┌──────────────────────────┐
│  GIROGI         (header) │
├──────────────────────────┤
│                          │
│  [스트릭 위젯]           │
│  [진행도] [피드백]       │
│  [미션카드 1]            │
│  [미션카드 2]            │
│  [미션카드 3]            │
│  [주간 캘린더]           │
│  [보상 현황]             │
│                          │
├──────────────────────────┤
│ 홈 체크 🆘 커뮤 프로필   │  ← 하단 탭바
└──────────────────────────┘
 max-w-2xl (896px), 세로 스택
```

**문제점**:
- PC에서 좌우 여백이 과도하게 넓음
- 화면 공간 활용 비효율적
- 정보 밀도가 낮음 (스크롤 많이 필요)

---

## 목표 상태 (After)

```
┌────────────────────────────────────────────────────────┐
│  GIROGI                                    👤 프로필   │
├────────────┬───────────────────────────────────────────┤
│            │                                           │
│  🏠 대시보드│  ┌──────────┐ ┌────────────────────────┐ │
│  ✅ 체크    │  │ 🔥 스트릭 │ │ 📊 이번주 진행도       │ │
│  🆘 유혹    │  │  42일     │ │  ████████░░ 71%       │ │
│  👥 커뮤    │  │  최고 56일│ │  성공 5일 / 실패 2일   │ │
│             │  └──────────┘ └────────────────────────┘ │
│             │                                          │
│             │  ┌────────────────────────┐ ┌──────────┐ │
│             │  │ 🎯 오늘의 핵심 미션     │ │ 🎁 보상  │ │
│             │  │  ✅ 물 마시기           │ │  과자박스 │ │
│             │  │  ☐ 체중 측정           │ │  D-1     │ │
│             │  │  ☐ 스트레칭            │ │  치팅데이 │ │
│             │  │                        │ │  D-4     │ │
│             │  └────────────────────────┘ └──────────┘ │
│             │                                          │
│             │  ┌──────────────────┐ ┌────────────────┐ │
│             │  │ 📅 주간 캘린더    │ │ 🍽 주간 피드백  │ │
│             │  │ 월화수목금토일    │ │  집밥 4 외식 2  │ │
│             │  │ ✅✅✅✅☐☐☐     │ │  배달 1        │ │
│             │  └──────────────────┘ └────────────────┘ │
│             │                                          │
└─────────────┴──────────────────────────────────────────┘
```

---

## 핵심 변경사항

### 1. 레이아웃 시스템

| 항목 | Before | After |
|------|--------|-------|
| 최대 너비 | max-w-2xl (896px) | 제한 없음 (전체 화면) |
| 네비게이션 | 하단 탭바 (고정) | 왼쪽 사이드바 |
| 콘텐츠 배치 | 세로 스택 | 위젯 그리드 |
| 반응형 | 거의 없음 | lg 브레이크포인트 기준 |

### 2. 반응형 전략

```
Mobile (< 1024px):  하단 탭바 유지, 세로 스택 (기존과 동일)
Desktop (>= 1024px): 사이드바 + 위젯 그리드
```

- `lg:` (1024px) 브레이크포인트에서 레이아웃 전환
- 모바일 레이아웃은 그대로 유지 (Flutter WebView 호환)

---

## 구현 단계

### Phase 1: 레이아웃 인프라 (핵심)

**1-1. 사이드바 컴포넌트 생성**
```
파일: src/components/navigation/sidebar.tsx
```
- 로고 + 앱 이름
- 네비게이션 링크 5개 (대시보드, 체크리스트, 유혹극복, 커뮤니티, 프로필)
- 현재 페이지 하이라이트 (primary 색상 배경)
- 아이콘 + 텍스트 레이블
- 하단에 버전 정보 또는 설정 링크

**1-2. 루트 레이아웃 수정**
```
파일: src/app/layout.tsx
```
```tsx
<body>
  {/* Desktop: 사이드바 */}
  <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60">
    <Sidebar />
  </div>

  {/* Main content */}
  <div className="lg:pl-60">
    {/* Desktop: 상단 헤더 */}
    <header className="hidden lg:block">
      <TopBar />
    </header>

    {/* Content */}
    <main className="px-4 py-6 lg:px-8">
      {children}
    </main>
  </div>

  {/* Mobile: 하단 탭바 */}
  <div className="lg:hidden">
    <BottomTabBar />
  </div>
</body>
```

**1-3. 상단 바 컴포넌트 (데스크탑 전용)**
```
파일: src/components/navigation/top-bar.tsx
```
- 페이지 제목 (동적)
- 오른쪽: 프로필 아바타, 알림 아이콘

---

### Phase 2: 위젯 시스템

**2-1. WidgetCard 래퍼 컴포넌트**
```
파일: src/components/common/widget-card.tsx
```
```tsx
interface WidgetCardProps {
  title: string
  icon?: ReactNode
  action?: ReactNode      // 우상단 액션 버튼
  size?: 'sm' | 'md' | 'lg' | 'full'  // 그리드 span
  children: ReactNode
}
```
- 통일된 카드 스타일 (배경, 패딩, 라운딩)
- 헤더 (아이콘 + 제목 + 액션)
- 사이즈별 그리드 span 지정

**2-2. 위젯 목록 (기존 컴포넌트 래핑)**

| 위젯 | 기존 컴포넌트 | 그리드 사이즈 |
|------|-------------|-------------|
| 스트릭 | StreakWidget | sm (1 col) |
| 이번주 진행도 | WeeklyProgress | md (2 col) |
| 오늘의 미션 | MissionCard × 3 | md (2 col) |
| 보상 현황 | RewardStatusCard | sm (1 col) |
| 주간 캘린더 | WeeklyCalendar | md (2 col) |
| 주간 피드백 | WeeklyFeedback | sm (1 col) |

---

### Phase 3: 대시보드 페이지

**3-1. 홈 페이지 위젯 그리드화**
```
파일: src/app/page.tsx
```
```tsx
<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
  {/* Row 1 */}
  <WidgetCard size="sm">  <StreakWidget />      </WidgetCard>
  <WidgetCard size="md">  <WeeklyProgress />    </WidgetCard>

  {/* Row 2 */}
  <WidgetCard size="md">  <MissionSection />    </WidgetCard>
  <WidgetCard size="sm">  <RewardStatus />      </WidgetCard>

  {/* Row 3 */}
  <WidgetCard size="md">  <WeeklyCalendar />    </WidgetCard>
  <WidgetCard size="sm">  <WeeklyFeedback />    </WidgetCard>
</div>
```

**그리드 레이아웃**:
```
Desktop (lg:grid-cols-3):
┌─────┬───────────────┐
│ 1col│    2col       │
├─────┴──┬────────────┤
│  2col  │   1col     │
├────────┴──┬─────────┤
│   2col    │  1col   │
└───────────┴─────────┘

Mobile (grid-cols-1):
┌─────────────────────┐
│ 스트릭               │
├─────────────────────┤
│ 이번주 진행도         │
├─────────────────────┤
│ 오늘의 미션           │
├─────────────────────┤
│ 보상 현황             │
└─────────────────────┘
```

---

### Phase 4: 서브 페이지 레이아웃 적용

각 페이지도 넓은 화면에서 위젯 그리드 활용:

**체크리스트** (`/checklist`):
- 시간대별 섹션을 가로 배치 (아침 | 점심 | 저녁 | 운동)

**유혹 극복** (`/emergency`):
- 타이머 위젯 + 미래 자아 위젯 + 자기연민 위젯 가로 배치

**커뮤니티** (`/community`):
- 2컬럼 피드 또는 피드 + 사이드 패널

**프로필** (`/profile`):
- 프로필 카드 + 통계 위젯들 그리드

---

## 디자인 원칙

### 사이드바

- 너비: `w-60` (240px)
- 배경: `bg-white` 또는 `bg-neutral-50`
- 활성 메뉴: `bg-primary-100 text-primary-700`
- 비활성 메뉴: `text-neutral-600 hover:bg-neutral-100`
- 아이콘: Lucide React (기존 사용 중)

### 위젯 카드

- 배경: `bg-white`
- 라운딩: `rounded-2xl` (기존 디자인 시스템)
- 패딩: `p-6`
- 그림자/테두리: 없음 (디자인 시스템 원칙 유지)
- 구분: 배경색 차이로 구분 (body bg vs card bg)

### 그리드

- 기본: `grid-cols-1` (모바일)
- 데스크탑: `lg:grid-cols-3` (3열 그리드)
- 갭: `gap-4` 또는 `gap-6`

---

## 수정 파일 목록

### 새로 생성

| 파일 | 설명 |
|------|------|
| `src/components/navigation/sidebar.tsx` | 사이드바 네비게이션 |
| `src/components/navigation/top-bar.tsx` | 데스크탑 상단 바 |
| `src/components/common/widget-card.tsx` | 위젯 카드 래퍼 |

### 수정

| 파일 | 변경 내용 |
|------|----------|
| `src/app/layout.tsx` | 사이드바/탭바 반응형 전환, max-w 제거 |
| `src/app/page.tsx` | 위젯 그리드 레이아웃 |
| `src/app/globals.css` | body 배경색, 폰트 사이즈 조정 |
| `src/app/checklist/page.tsx` | 넓은 레이아웃 대응 |
| `src/app/emergency/page.tsx` | 넓은 레이아웃 대응 |
| `src/app/community/page.tsx` | 넓은 레이아웃 대응 |
| `src/app/profile/page.tsx` | 넓은 레이아웃 대응 |

### 삭제 없음

- BottomTabBar는 모바일에서 계속 사용

---

## 구현 순서

```
Phase 1 (레이아웃) → Phase 2 (위젯) → Phase 3 (대시보드) → Phase 4 (서브페이지)
```

Phase 1이 완료되면 나머지는 점진적으로 적용 가능.

---

**문서 버전**: 1.0
**작성일**: 2026-02-26
