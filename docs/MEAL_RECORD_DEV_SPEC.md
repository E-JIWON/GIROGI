# 식사 기록 시스템 개발 기획서
> 기술 설계 및 구현 가이드

**작성일**: 2026-02-10
**버전**: 1.0
**상태**: 설계 완료, 개발 대기

---

## 📋 목차

1. [기술 스택](#기술-스택)
2. [데이터 모델](#데이터-모델)
3. [컴포넌트 구조](#컴포넌트-구조)
4. [상태 관리](#상태-관리)
5. [파일 구조](#파일-구조)
6. [API 설계](#api-설계)
7. [구현 단계](#구현-단계)
8. [테스트 시나리오](#테스트-시나리오)

---

## 기술 스택

### 프론트엔드
```yaml
Framework: Next.js 16 (App Router + React 19)
Language: TypeScript 5.7+
Styling: Tailwind CSS 4.0
State Management: Zustand 4.x
Validation: Zod 4.x
Icons: Lucide React
Animations: Framer Motion 11.x
```

### 추가 라이브러리
```bash
# 애니메이션
npm install canvas-confetti
npm install framer-motion

# 날짜 처리
npm install date-fns

# 차트 (Phase 2)
npm install recharts
```

### 브라우저 API
- `localStorage`: 뱃지, 스트릭 데이터 저장
- `navigator.vibrate`: 햅틱 피드백 (모바일)

---

## 데이터 모델

### 1. MealRecord (확장)

**기존 모델 수정**:
```typescript
// girogi-web/src/types/models.ts

export interface MealRecord {
  // 기존 필드
  mealTime: MealTime;
  place: MealPlace;
  menu: string;
  imageUrl?: string;
  achievements: string[];
  isPublic: boolean;

  // 신규 필드 추가
  badges: string[];           // 획득한 뱃지 ID 리스트 ["badge_mackerel", "badge_salad"]
  rating?: number;            // 만족도 (1-5)
  comment?: string;           // 한줄평
  recordedAt: string;         // ISO 8601 (기록 시각)
}
```

### 2. Badge (신규)

```typescript
// girogi-web/src/types/badge.ts

export interface Badge {
  id: string;                 // "badge_mackerel"
  name: string;               // "고등어"
  emoji: string;              // "🐟"
  category: BadgeCategory;    // "protein" | "vegetable" | "carb" | "dish"
  rarity: BadgeRarity;        // "common" | "rare" | "epic" | "legendary"
  description?: string;       // "오메가3가 풍부한 생선"
}

export type BadgeCategory = "protein" | "vegetable" | "carb" | "dish";
export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

export interface UserBadge {
  badgeId: string;
  count: number;              // 획득 횟수
  firstAcquired: string;      // ISO 8601
  lastAcquired: string;       // ISO 8601
}
```

### 3. Achievement (신규)

```typescript
// girogi-web/src/types/achievement.ts

export interface Achievement {
  id: string;                 // "achievement_egg_lover"
  name: string;               // "계란 덕후"
  description: string;        // "계란 뱃지 50개 획득"
  emoji: string;              // "🥚"
  condition: AchievementCondition;
  reward: AchievementReward;
}

export interface AchievementCondition {
  type: "badge_count" | "streak" | "total_days" | "custom";
  badgeId?: string;           // badge_count일 때
  targetCount: number;
}

export interface AchievementReward {
  type: "title" | "theme" | "sticker" | "coupon";
  value: string;              // 칭호명, 테마ID, 스티커ID 등
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt: string;         // ISO 8601
  isNew: boolean;             // 알림 표시 여부
}
```

### 4. Streak (신규)

```typescript
// girogi-web/src/types/streak.ts

export interface StreakData {
  currentStreak: number;      // 현재 연속 일수
  longestStreak: number;      // 최장 연속 일수
  totalDays: number;          // 총 기록 일수
  lastRecordDate: string;     // ISO 8601 (마지막 기록 날짜)
  weeklyStatus: boolean[];    // [월, 화, 수, 목, 금, 토, 일] 7개
}
```

### 5. Coupon (신규)

```typescript
// girogi-web/src/types/coupon.ts

export interface Coupon {
  id: string;
  type: "cheat_day" | "snack_box";
  issuedAt: string;           // ISO 8601
  usedAt?: string;            // ISO 8601 (사용 시)
  isUsed: boolean;
}
```

### 6. UserProfile (확장)

```typescript
// girogi-web/src/types/models.ts

export interface UserProfile {
  // 기존 필드
  userId: string;
  nickname: string;
  avatarUrl?: string;

  // 신규 필드
  badges: UserBadge[];
  achievements: UserAchievement[];
  streak: StreakData;
  coupons: Coupon[];
  currentTitle?: string;      // 현재 칭호
  currentTheme?: string;      // 현재 테마 ID
}
```

---

## 컴포넌트 구조

### 신규 컴포넌트 (Phase 1)

```
girogi-web/src/
├── app/
│   ├── checklist/
│   │   └── _components/
│   │       ├── meal-record-sheet.tsx          ✨ 신규
│   │       ├── meal-place-selector.tsx        ✨ 신규
│   │       ├── meal-tag-selector.tsx          ✨ 신규
│   │       ├── meal-rating.tsx                ✨ 신규
│   │       └── meal-comment-input.tsx         ✨ 신규
│   │
│   ├── profile/
│   │   └── _components/
│   │       ├── badge-collection.tsx           ✨ 신규
│   │       ├── badge-item.tsx                 ✨ 신규
│   │       ├── achievement-list.tsx           ✨ 신규
│   │       └── coupon-list.tsx                ✨ 신규
│   │
│   └── (home)/
│       └── _components/
│           ├── streak-widget.tsx              ✨ 신규
│           ├── weekly-progress.tsx            ✨ 신규
│           └── weekly-feedback.tsx            ✨ 신규
│
├── components/
│   ├── ui/
│   │   ├── badge-pill.tsx                     ✨ 신규 (공통)
│   │   ├── achievement-card.tsx               ✨ 신규 (공통)
│   │   └── confetti-effect.tsx                ✨ 신규 (공통)
│   │
│   └── shared/
│       └── badge-notification.tsx             ✨ 신규
│
├── lib/
│   ├── constants/
│   │   ├── badges.ts                          ✨ 신규
│   │   └── achievements.ts                    ✨ 신규
│   │
│   └── utils/
│       ├── badge-parser.ts                    ✨ 신규
│       ├── streak-calculator.ts               ✨ 신규
│       └── achievement-checker.ts             ✨ 신규
│
├── stores/
│   ├── badgeStore.ts                          ✨ 신규
│   ├── streakStore.ts                         ✨ 신규
│   └── couponStore.ts                         ✨ 신규
│
└── types/
    ├── badge.ts                               ✨ 신규
    ├── achievement.ts                         ✨ 신규
    ├── streak.ts                              ✨ 신규
    └── coupon.ts                              ✨ 신규
```

### 주요 컴포넌트 설명

#### 1. StreakWidget (홈 화면)
```typescript
// girogi-web/src/app/(home)/_components/streak-widget.tsx

export function StreakWidget() {
  // 스트릭 데이터 로드
  // 7일 체크박스 표시
  // 총 기록 일수 표시
  // 불꽃 아이콘 애니메이션
}
```

#### 2. MealRecordSheet (식사 입력)
```typescript
// girogi-web/src/app/checklist/_components/meal-record-sheet.tsx

interface MealRecordSheetProps {
  isOpen: boolean;
  mealTime: MealTime;
  onClose: () => void;
  onSave: (record: MealRecord) => void;
}

export function MealRecordSheet(props: MealRecordSheetProps) {
  // Step 1: 장소 선택
  // Step 2: 메뉴 태그 선택
  // Step 3: 사진 업로드 (선택)
  // Step 4: 저장 → 뱃지 파싱
  // Step 5: 만족도 + 한줄평
  // Step 6: 뱃지 획득 알림
  // Step 7: 업적 체크
}
```

#### 3. BadgeNotification (뱃지 알림)
```typescript
// girogi-web/src/components/shared/badge-notification.tsx

interface BadgeNotificationProps {
  badges: Badge[];
  onClose: () => void;
}

export function BadgeNotification(props: BadgeNotificationProps) {
  // Confetti 애니메이션
  // 뱃지 리스트 표시
  // "🐟 고등어 뱃지 +1" 형식
  // 3초 후 자동 닫힘
}
```

#### 4. BadgeCollection (프로필)
```typescript
// girogi-web/src/app/profile/_components/badge-collection.tsx

export function BadgeCollection() {
  // 사용자 뱃지 목록
  // 카테고리별 필터 (전체, 단백질, 채소, 탄수화물, 요리)
  // 획득 횟수 표시
  // 미획득 뱃지는 회색 처리
}
```

---

## 상태 관리

### Zustand 스토어

#### 1. badgeStore
```typescript
// girogi-web/src/stores/badgeStore.ts

interface BadgeStore {
  userBadges: UserBadge[];

  // Actions
  addBadge: (badgeId: string) => void;
  getBadgeCount: (badgeId: string) => number;
  getTopBadges: (limit: number) => UserBadge[];

  // Persistence
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
}

export const useBadgeStore = create<BadgeStore>()(
  persist(
    (set, get) => ({
      userBadges: [],

      addBadge: (badgeId) => {
        // 기존 뱃지 찾기
        // count +1 또는 신규 생성
        // localStorage 저장
      },

      getBadgeCount: (badgeId) => {
        // 해당 뱃지 획득 횟수 반환
      },

      getTopBadges: (limit) => {
        // count 기준 정렬 후 상위 N개 반환
      },
    }),
    {
      name: 'badge-storage',
    }
  )
);
```

#### 2. streakStore
```typescript
// girogi-web/src/stores/streakStore.ts

interface StreakStore {
  streakData: StreakData;

  // Actions
  recordToday: () => void;
  calculateStreak: (records: DailyRecord[]) => StreakData;
  getWeeklyStatus: () => boolean[];

  // Persistence
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
}

export const useStreakStore = create<StreakStore>()(
  persist(
    (set, get) => ({
      streakData: {
        currentStreak: 0,
        longestStreak: 0,
        totalDays: 0,
        lastRecordDate: '',
        weeklyStatus: [false, false, false, false, false, false, false],
      },

      recordToday: () => {
        // 오늘 기록 추가
        // 연속 일수 계산
        // localStorage 저장
      },

      calculateStreak: (records) => {
        // DailyRecord[] 기반 스트릭 계산
        // 최장 스트릭 업데이트
      },

      getWeeklyStatus: () => {
        // 이번 주 월~일 기록 여부 반환
      },
    }),
    {
      name: 'streak-storage',
    }
  )
);
```

#### 3. achievementStore
```typescript
// girogi-web/src/stores/achievementStore.ts

interface AchievementStore {
  userAchievements: UserAchievement[];

  // Actions
  checkAchievements: () => UserAchievement[];
  unlockAchievement: (achievementId: string) => void;
  markAsRead: (achievementId: string) => void;

  // Persistence
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
}
```

#### 4. couponStore
```typescript
// girogi-web/src/stores/couponStore.ts

interface CouponStore {
  coupons: Coupon[];

  // Actions
  issueCoupon: (type: "cheat_day" | "snack_box") => void;
  useCoupon: (couponId: string) => void;
  getUnusedCoupons: () => Coupon[];

  // Persistence
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
}
```

---

## 파일 구조

### 신규 파일 리스트

#### Types (타입 정의)
```
src/types/
├── badge.ts                    # Badge, UserBadge, BadgeCategory
├── achievement.ts              # Achievement, UserAchievement
├── streak.ts                   # StreakData
└── coupon.ts                   # Coupon
```

#### Constants (상수)
```
src/lib/constants/
├── badges.ts                   # 뱃지 100종 정의
└── achievements.ts             # 업적 조건 정의
```

#### Utils (유틸리티)
```
src/lib/utils/
├── badge-parser.ts             # 메뉴 문자열 → 뱃지 ID 매칭
├── streak-calculator.ts        # 스트릭 계산 로직
└── achievement-checker.ts      # 업적 달성 체크
```

#### Stores (상태 관리)
```
src/stores/
├── badgeStore.ts
├── streakStore.ts
├── achievementStore.ts
└── couponStore.ts
```

#### Components (컴포넌트)
```
src/app/(home)/_components/
├── streak-widget.tsx           # 스트릭 위젯
├── weekly-progress.tsx         # 주간 진행도
└── weekly-feedback.tsx         # 주간 피드백

src/app/checklist/_components/
├── meal-record-sheet.tsx       # 식사 입력 Sheet
├── meal-place-selector.tsx     # 장소 선택
├── meal-tag-selector.tsx       # 태그 선택
├── meal-rating.tsx             # 만족도 별점
└── meal-comment-input.tsx      # 한줄평 입력

src/app/profile/_components/
├── badge-collection.tsx        # 뱃지 컬렉션
├── badge-item.tsx              # 뱃지 아이템
├── achievement-list.tsx        # 업적 리스트
└── coupon-list.tsx             # 쿠폰 리스트

src/components/shared/
├── badge-notification.tsx      # 뱃지 획득 알림
└── achievement-notification.tsx # 업적 달성 알림

src/components/ui/
├── badge-pill.tsx              # 뱃지 UI
├── achievement-card.tsx        # 업적 카드
└── confetti-effect.tsx         # Confetti 애니메이션
```

---

## API 설계

### localStorage 기반 (Phase 1)

**키 구조**:
```typescript
// localStorage keys
const STORAGE_KEYS = {
  BADGES: 'girogi_badges',           // UserBadge[]
  STREAK: 'girogi_streak',           // StreakData
  ACHIEVEMENTS: 'girogi_achievements', // UserAchievement[]
  COUPONS: 'girogi_coupons',         // Coupon[]
  DAILY_RECORDS: 'girogi_records',   // DailyRecord[]
};
```

### 백엔드 API (Phase 2 - 미래)

**엔드포인트 예시**:
```
POST   /api/meals                 # 식사 기록 생성
GET    /api/meals?date=2026-02-10 # 날짜별 조회

GET    /api/badges                # 사용자 뱃지 목록
POST   /api/badges                # 뱃지 획득

GET    /api/achievements          # 업적 목록
POST   /api/achievements/unlock   # 업적 해제

GET    /api/streak                # 스트릭 데이터
POST   /api/streak/record         # 오늘 기록

GET    /api/coupons               # 쿠폰 목록
POST   /api/coupons/use           # 쿠폰 사용

GET    /api/users/:userId/profile # 친구 프로필
GET    /api/friends/league        # 친구 리그
```

---

## 구현 단계

### Phase 1: 기본 게임화 시스템 (1-2주)

#### Week 1: 스트릭 + 뱃지 기본

**1일차: 타입 정의 + 상수**
- [ ] `src/types/badge.ts` 생성
- [ ] `src/types/streak.ts` 생성
- [ ] `src/lib/constants/badges.ts` 생성 (50종)
- [ ] `src/lib/constants/achievements.ts` 생성 (10개)

**2일차: Zustand 스토어**
- [ ] `src/stores/badgeStore.ts` 구현
- [ ] `src/stores/streakStore.ts` 구현
- [ ] localStorage 연동

**3일차: 유틸리티 함수**
- [ ] `badge-parser.ts` 구현 (메뉴 → 뱃지 매칭)
- [ ] `streak-calculator.ts` 구현 (스트릭 계산)

**4일차: 스트릭 위젯**
- [ ] `streak-widget.tsx` 구현
- [ ] 홈 화면에 추가
- [ ] 7일 체크박스 UI

**5일차: 식사 입력 Sheet**
- [ ] `meal-record-sheet.tsx` 기본 구조
- [ ] `meal-place-selector.tsx` 구현
- [ ] `meal-tag-selector.tsx` 구현

#### Week 2: 뱃지 알림 + 프로필

**6일차: 뱃지 획득 로직**
- [ ] 식사 저장 시 뱃지 파싱
- [ ] `badgeStore.addBadge()` 호출
- [ ] `streakStore.recordToday()` 호출

**7일차: 뱃지 알림 UI**
- [ ] `badge-notification.tsx` 구현
- [ ] Confetti 애니메이션 추가
- [ ] 햅틱 피드백

**8일차: 만족도 + 한줄평**
- [ ] `meal-rating.tsx` 구현
- [ ] `meal-comment-input.tsx` 구현
- [ ] Sheet 플로우 통합

**9일차: 프로필 뱃지 컬렉션**
- [ ] `badge-collection.tsx` 구현
- [ ] `badge-item.tsx` UI
- [ ] 카테고리 필터

**10일차: 주간 피드백**
- [ ] `weekly-feedback.tsx` 구현
- [ ] 외식/배달 카운트 로직
- [ ] 경고 메시지 표시

---

### Phase 2: 업적 + 소셜 (2-3주)

**Week 3: 업적 시스템**
- [ ] `achievementStore.ts` 구현
- [ ] `achievement-checker.ts` 로직
- [ ] `achievement-list.tsx` UI
- [ ] 업적 달성 알림

**Week 4: 보상 시스템**
- [ ] `couponStore.ts` 구현
- [ ] 치팅데이 쿠폰 발급 (7일 연속)
- [ ] 과자박스 쿠폰 발급 (3일 연속)
- [ ] `coupon-list.tsx` UI

**Week 5: 친구 프로필 비교**
- [ ] 친구 프로필 화면 추가
- [ ] 뱃지 Top 5 표시
- [ ] 몸무게 간략 비교 그래프
- [ ] 응원하기 기능

---

### Phase 3: 커뮤니티 + 고급 (3-4주)

**Week 6-7: 리그 시스템**
- [ ] 친구 리스트 화면
- [ ] 주간 리그 랭킹
- [ ] 리그 보상 시스템

**Week 8: 월간 리포트**
- [ ] 매월 1일 자동 생성
- [ ] 통계 분석 (가장 많이 먹은 음식 등)
- [ ] 차트 시각화

**Week 9: 테마 + 칭호**
- [ ] 테마 잠금 해제 시스템
- [ ] 칭호 시스템
- [ ] 프로필 커스터마이징

---

## 테스트 시나리오

### 1. 스트릭 카운팅 테스트

```
[시나리오]
1. 월요일: 점심 기록 → 스트릭 1일
2. 화요일: 점심 기록 → 스트릭 2일
3. 수요일: 기록 안 함 → 스트릭 0일 (리셋)
4. 목요일: 점심 기록 → 스트릭 1일

[검증]
- 홈 화면 "🔥 1일 연속" 표시
- 최장 스트릭 "2일" 유지
- 총 기록 일수 "3일"
```

### 2. 뱃지 획득 테스트

```
[시나리오]
1. 메뉴 입력: "고등어구이 + 샐러드 + 현미밥"
2. 저장 클릭

[검증]
- 뱃지 알림: "🐟 고등어 뱃지 +1"
- 뱃지 알림: "🥗 샐러드 뱃지 +1"
- 뱃지 알림: "🍚 현미밥 뱃지 +1"
- Confetti 애니메이션
- 햅틱 진동
```

### 3. 업적 달성 테스트

```
[시나리오]
1. 고등어 뱃지를 50개까지 획득
2. 51번째 고등어 기록

[검증]
- 뱃지 알림: "🐟 고등어 뱃지 +1"
- 업적 알림: "🏆 오메가3 전문가 달성!"
- 칭호: "피쉬 러버" 획득
- 프로필에 칭호 표시
```

### 4. 쿠폰 발급 테스트

```
[시나리오]
1. 7일 연속 기록
2. 7일째 저장 클릭

[검증]
- 스트릭 알림: "🔥 7일 연속!"
- 쿠폰 알림: "🎟️ 치팅데이 쿠폰 획득!"
- 프로필 → 쿠폰 목록에 추가
```

### 5. 주간 피드백 테스트

```
[시나리오]
1. 월요일: 외식 1회
2. 화요일: 외식 1회
3. 수요일: 외식 1회

[검증]
- 홈 화면 주간 피드백:
  "🍜 외식: 3회 ⚠️"
  "💬 외식 3회! 목표는 1회예요"
```

### 6. 만족도 + 한줄평 테스트

```
[시나리오]
1. 식사 기록 저장
2. 만족도: ⭐⭐⭐⭐⭐ (5점)
3. 한줄평: "제육볶음 맛있었음 ㅎㅎ"

[검증]
- MealRecord.rating = 5
- MealRecord.comment = "제육볶음 맛있었음 ㅎㅎ"
- 프로필 → 타임라인에 표시
```

---

## 성능 최적화

### localStorage 최적화
```typescript
// 뱃지 저장 시 debounce (500ms)
const saveBadges = debounce(() => {
  localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(userBadges));
}, 500);
```

### 애니메이션 최적화
```typescript
// Framer Motion으로 GPU 가속
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.3 }}
>
  {/* 뱃지 */}
</motion.div>
```

### 이미지 최적화
```typescript
// Next.js Image 사용
import Image from 'next/image';

<Image
  src="/badges/mackerel.png"
  alt="고등어 뱃지"
  width={64}
  height={64}
  priority
/>
```

---

## 보안 고려사항

### localStorage 보안
- 민감 정보 저장 금지 (비밀번호, 토큰 등)
- 뱃지/스트릭은 공개 정보이므로 OK

### XSS 방지
- 사용자 입력 (한줄평) sanitize
- React 자동 이스케이프 신뢰

---

## 마이그레이션 가이드

### localStorage → Backend API

**Phase 1 → Phase 2 전환 시**:
```typescript
// 1. localStorage 데이터 읽기
const localBadges = localStorage.getItem('girogi_badges');

// 2. 백엔드로 전송
await fetch('/api/migrate', {
  method: 'POST',
  body: JSON.stringify({ badges: localBadges }),
});

// 3. localStorage 삭제
localStorage.removeItem('girogi_badges');
```

---

## 다음 단계

1. ✅ UX 기획서 확인
2. ✅ 개발 기획서 확인
3. ⏳ **사용자 승인 대기** ← 현재 단계
4. 🚀 구현 시작 (Phase 1)

---

**문서 버전**: 1.0
**최종 수정**: 2026-02-10
**다음 문서**: 없음 (구현 시작)
