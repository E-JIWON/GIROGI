# 🥊 다이어트 트래커 앱 - Flutter 개발 명세서

## 📋 프로젝트 개요

### 앱 이름
"오늘부터 다시" (가칭)

### 목적
의지력이 아닌 **시스템과 환경 설계**를 통한 다이어트 지원 앱. 심리학 연구 기반의 행동 변화 기법을 적용.

### 타겟 유저
- 바쁜 직장인 (출퇴근 시간 고정)
- 의지력에 의존하는 다이어트에 실패 경험이 있는 사람
- 운동(복싱 등)을 병행하는 사람

### 핵심 철학
1. **의지력에 의존하지 않는다** - 환경 설계와 작은 습관으로 승부
2. **실패해도 자책하지 않는다** - 자기 연민 (Self-compassion)
3. **미래의 나를 상상한다** - Episodic Future Thinking
4. **보상 시스템을 활용한다** - Temptation Bundling

---

## 🧠 연구 기반 핵심 원리

### 1. Episodic Future Thinking (미래 상상)
- **출처**: International Journal of Nursing Studies (2024) 메타분석
- **효과**: 칼로리 섭취 감소, BMI 감소
- **적용**: 유혹을 느낄 때 "건강해진 미래의 나" 이미지 표시

### 2. Temptation Bundling (유혹 묶기)
- **출처**: Katy Milkman, Wharton School 연구
- **효과**: 운동 참여율 10-14% 증가
- **적용**: 좋은 행동 → 보상 적립 시스템

### 3. Implementation Intention (실행 의도)
- **출처**: Peter Gollwitzer 연구
- **효과**: 목표 달성률 증가
- **적용**: "언제 + 어디서 + 무엇을" 형식의 체크리스트

### 4. Tiny Habits (작은 습관)
- **출처**: BJ Fogg, Stanford Behavior Design Lab
- **효과**: 저항 없이 습관 형성
- **적용**: 스쿼트 1개, 샐러드 두 젓가락 등 최소 단위

### 5. Self-Compassion (자기 연민)
- **출처**: British Journal of Health Psychology (2021)
- **효과**: 실패 후 복귀율 증가, 다이어트 지속 의지 증가
- **주의**: "내일부터 하자"는 허가 효과(Licensing Effect) - 금지

### 6. Slow Eating (천천히 씹기)
- **출처**: Scientific Reports (2021)
- **효과**: 식이 유발 열 생성 증가, 포만감 증가
- **적용**: 20-30번 씹기 리마인더

---

## 📱 화면 구성

### 하단 네비게이션 (5개 탭)
```
[ 🏠 홈 ] [ 📋 체크 ] [ 👥 커뮤니티 ] [ 🚨 유혹 ] [ 📊 리포트 ]
```

---

### Screen 1: 홈 (Dashboard)

#### 레이아웃
```
┌─────────────────────────────────┐
│  🔥 연속 {n}일째 성공 중!        │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 오늘의 핵심 미션         │   │
│  │ ☑ 퇴근 전 바나나 먹기    │   │
│  │ ☐ 스쿼트 1개            │   │
│  │ ☐ 작은 그릇 사용         │   │
│  └─────────────────────────┘   │
│                                 │
│  이번 주 현황                    │
│  월 화 수 목 금 토 일            │
│  ✅ ✅ ✅ ⬜ ⬜ ⬜ ⬜            │
│                                 │
│  ┌────────────┬────────────┐   │
│  │🍪 과자박스  │📅 치팅데이  │   │
│  │  {n}개     │  {n}일 남음 │   │
│  └────────────┴────────────┘   │
│                                 │
│     [ 🚨 유혹 느껴? ]           │
│                                 │
└─────────────────────────────────┘
```

#### 컴포넌트
- `StreakCounter`: 연속 성공 일수 (불꽃 애니메이션)
- `CoreMissionCard`: 오늘의 핵심 미션 3개 (체크박스)
- `WeeklyCalendar`: 이번 주 성공/실패 표시
- `RewardStatusRow`: 과자박스 개수 + 치팅데이까지 남은 일수
- `EmergencyButton`: 유혹 극복 모드로 이동하는 FAB

---

### Screen 2: 체크리스트 + 식사 기록

#### 레이아웃
```
┌─────────────────────────────────┐
│  📋 오늘의 체크리스트            │
│                                 │
│  ── 🌅 아침 ──                  │
│  ☐ 10:30 물 500ml              │
│                                 │
│  ── 🌞 점심 ──                  │
│  ☐ 샐러드 두 젓가락 먹기        │
│  ☐ 천천히 씹기 (20번 이상)      │
│                                 │
│  ── 🌆 퇴근 ──                  │
│  ☐ 바나나 or 사과 먹기          │
│                                 │
│  ── 🌙 저녁 ──                  │
│  ☐ 작은 그릇 사용               │
│  ☐ TV 없이 먹기                 │
│  ☐ 천천히 씹기                  │
│                                 │
│  ── 💪 운동 ──                  │
│  ○ 복싱 감  ○ 스쿼트 1개        │
│                                 │
│  ═══════════════════════════    │
│                                 │
│  🍽 식사 기록                    │
│                                 │
│  아침 ─────────────── [+ 추가]  │
│  (기록 없음)                     │
│                                 │
│  점심 ─────────────── [+ 추가]  │
│  🏢 구내식당 | 제육볶음, 밥      │
│  천천히 먹음 ✅                  │
│                                 │
│  저녁 ─────────────── [+ 추가]  │
│  🏠 집밥 | 된장찌개, 계란        │
│  작은 그릇 ✅ TV없이 ✅          │
│                                 │
│  ⚠️ 이번 주 외식: 1/2회         │
│                                 │
└─────────────────────────────────┘
```

#### 컴포넌트
- `TimeSection`: 시간대별 체크리스트 그룹
- `CheckItem`: 개별 체크 항목 (애니메이션 포함)
- `ExerciseToggle`: 복싱/스쿼트 선택 (Radio)
- `MealCard`: 식사 기록 카드
- `MealAddModal`: 식사 추가 바텀시트
- `WeeklyEatingOutCounter`: 외식 횟수 경고

#### 식사 추가 모달
```
┌─────────────────────────────────┐
│  🍽 식사 추가                    │
│                                 │
│  장소                           │
│  ○ 🏠 집밥  ○ 🏢 구내식당       │
│  ○ 🍜 외식  ○ 🛵 배달           │
│                                 │
│  메뉴 (자유 입력)                │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  잘 지킨 것 (다중 선택)          │
│  ☐ 천천히 씹기                  │
│  ☐ 작은 그릇 사용               │
│  ☐ TV 없이 먹기                 │
│  ☐ 단백질 먼저 먹기             │
│                                 │
│        [ 저장하기 ]             │
│                                 │
└─────────────────────────────────┘
```

---

### Screen 3: 커뮤니티 (Community)

#### 3-1. 커뮤니티 피드 (메인)
```
┌─────────────────────────────────┐
│  👥 커뮤니티                     │
│  ┌─────────────────────────┐   │
│  │ [전체] [팔로잉] [영상]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 😊 닉네임 · 2시간 전      │   │
│  │ 오늘 드디어 5일 연속 성공! │   │
│  │ ┌─────────────────────┐ │   │
│  │ │    [식단 이미지]      │ │   │
│  │ └─────────────────────┘ │   │
│  │ 🔥12  💬3  ❤️8          │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💪 운동왕 · 5시간 전      │   │
│  │ 이 영상 보면 도파민 터짐   │   │
│  │ ┌─────────────────────┐ │   │
│  │ │  ▶️ [유튜브 썸네일]   │ │   │
│  │ └─────────────────────┘ │   │
│  │ 🔥24  💬7  ❤️15         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 😢 다이어터A · 1일 전     │   │
│  │ [실패 리포트]             │   │
│  │ 어제 치킨 시켜먹었어요...  │   │
│  │ 5일 연속 기록 날아감 ㅠㅠ  │   │
│  │ 🤗32  💬12  ❤️28         │   │
│  │ "괜찮아 다시 시작하면 돼!" │   │
│  └─────────────────────────┘   │
│                                 │
│            [+ 글쓰기]           │
│                                 │
└─────────────────────────────────┘
```

#### 3-2. 유튜브 숏츠 뷰 (영상 탭)
```
┌─────────────────────────────────┐
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │                         │   │
│  │    ▶️ 유튜브 영상        │   │
│  │       (전체화면)         │   │
│  │                         │   │
│  │                         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  💪 운동왕                       │
│  "이거 보면 운동 욕구 뿜뿜"      │
│                                 │
│  ❤️ 15    💬 7    🔗 공유       │
│                                 │
│     ↑ 위로 스와이프 = 다음 영상  │
│                                 │
└─────────────────────────────────┘
```

#### 3-3. 글쓰기 모달
```
┌─────────────────────────────────┐
│  ✏️ 글쓰기                       │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 오늘 하루 어땠어요?       │   │
│  │                         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  첨부하기                        │
│  [📷 사진] [🎬 유튜브] [📊 기록] │
│                                 │
│  📊 기록 공유 옵션:              │
│  ☐ 오늘의 체크리스트             │
│  ☐ 이번 주 현황                  │
│  ☐ 식사 기록                     │
│  ☐ 실패 리포트                   │
│                                 │
│        [취소]  [게시하기]        │
│                                 │
└─────────────────────────────────┘
```

---

### Screen 4: 다른 사람 프로필

#### 4-1. 프로필 메인
```
┌─────────────────────────────────┐
│  ← 뒤로                         │
│                                 │
│        😊                       │
│      닉네임                      │
│   "한 줄 소개 문구"              │
│                                 │
│  ┌────────┬────────┬────────┐  │
│  │ 🔥 23  │ 💪 47  │ 📅 15  │  │
│  │ 연속   │ 유혹   │ 총     │  │
│  │ 성공   │ 극복   │ 성공일 │  │
│  └────────┴────────┴────────┘  │
│                                 │
│     [팔로우]  [비교하기]         │
│                                 │
│  ── 탭 메뉴 ──                  │
│  [미션] [체크리스트] [식사] [기록]│
│                                 │
└─────────────────────────────────┘
```

#### 4-2. 프로필 - 미션 탭
```
┌─────────────────────────────────┐
│  🎯 오늘의 핵심 미션             │
│  ┌─────────────────────────┐   │
│  │ ✅ 퇴근 전 바나나 먹기    │   │
│  │ ✅ 스쿼트 1개            │   │
│  │ ☐ 작은 그릇 사용         │   │
│  └─────────────────────────┘   │
│                                 │
│  📅 이번 주 현황                 │
│  월 화 수 목 금 토 일            │
│  ✅ ✅ ✅ ✅ ✅ ⬜ ⬜            │
│                                 │
│  🍪 과자박스: 5개 적립           │
│                                 │
│  💪 유혹 극복 횟수               │
│  ┌─────────────────────────┐   │
│  │     이번 주: 12회         │   │
│  │     총 누적: 47회         │   │
│  │                         │   │
│  │  🏆 "유혹 마스터" 뱃지    │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

#### 4-3. 프로필 - 체크리스트 탭
```
┌─────────────────────────────────┐
│  📋 오늘의 체크리스트 구경       │
│                                 │
│  ── 🌅 아침 ──                  │
│  ✅ 10:30 물 500ml              │
│                                 │
│  ── 🌞 점심 ──                  │
│  ✅ 샐러드 두 젓가락 먹기        │
│  ☐ 천천히 씹기 (20번 이상)      │
│                                 │
│  ── 🌆 퇴근 ──                  │
│  ✅ 바나나 or 사과 먹기          │
│                                 │
│  ── 🌙 저녁 ──                  │
│  ☐ 작은 그릇 사용               │
│  ✅ TV 없이 먹기                 │
│  ☐ 천천히 씹기                  │
│                                 │
│  ── 💪 운동 ──                  │
│  ✅ 복싱 감                      │
│                                 │
│  ─────────────────────────      │
│  완료율: 62% (5/8)              │
│  "오늘도 화이팅!" 💬 응원하기    │
│                                 │
└─────────────────────────────────┘
```

#### 4-4. 프로필 - 식사 타임라인 탭 ⭐
```
┌─────────────────────────────────┐
│  🍽 오늘의 식사 기록             │
│                                 │
│      ┌─────────────────┐       │
│   ●──┤ 🍽 저녁 7:30     │       │
│   │  │ 🏠 집밥          │       │
│   │  │ 된장찌개, 계란    │       │
│   │  │ [식사 사진]       │       │
│   │  │ ❤️5 💬2          │       │
│   │  └─────────────────┘       │
│   │                            │
│   │  ── 5시간 전 ──            │
│   │                            │
│   │  ┌─────────────────┐       │
│   ●──┤ 🍌 간식 2:30     │       │
│   │  │ 바나나 1개       │       │
│   │  │ ❤️3 💬1          │       │
│   │  └─────────────────┘       │
│   │                            │
│   │  ── 8시간 전 ──            │
│   │                            │
│   │  ┌─────────────────┐       │
│   ●──┤ 🍱 점심 12:00    │       │
│   │  │ 🏢 구내식당       │       │
│   │  │ 제육볶음, 밥, 국  │       │
│   │  │ [식사 사진]       │       │
│   │  │ ❤️8 💬4          │       │
│   │  └─────────────────┘       │
│   │                            │
│   │  ┌─────────────────┐       │
│   ●──┤ ☕ 아침 8:00     │       │
│      │ 안 먹음 (공복)    │       │
│      │ ❤️2 💬0          │       │
│      └─────────────────┘       │
│                                 │
└─────────────────────────────────┘
```

#### 4-5. 식사 타임라인 - 댓글/리액션 상세
```
┌─────────────────────────────────┐
│  🍽 저녁 7:30                    │
│                                 │
│  🏠 집밥                         │
│  된장찌개, 계란프라이, 밥        │
│  ┌─────────────────────────┐   │
│  │      [식사 사진]         │   │
│  └─────────────────────────┘   │
│                                 │
│  리액션                          │
│  [❤️] [🔥] [💪] [👏] [🤗]       │
│  ❤️5  🔥3  💪2                  │
│                                 │
│  ── 댓글 2개 ──                  │
│  ┌─────────────────────────┐   │
│  │ 😊 유저A · 1시간 전       │   │
│  │ 맛있겠다!! 나도 집밥 먹고  │   │
│  │ 싶어ㅠㅠ                  │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 💪 유저B · 30분 전        │   │
│  │ 건강한 저녁이네요 👍      │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 댓글 입력...         전송 │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

#### 4-6. 프로필 - 기록 탭 (실패 리포트 포함)
```
┌─────────────────────────────────┐
│  📜 기록 히스토리                │
│                                 │
│  ── 2월 5일 (오늘) ──           │
│  ┌─────────────────────────┐   │
│  │ ✅ 5일 연속 성공!         │   │
│  │ 핵심 미션 3/3 완료        │   │
│  │ 유혹 극복 2회             │   │
│  └─────────────────────────┘   │
│                                 │
│  ── 1월 30일 ──                 │
│  ┌─────────────────────────┐   │
│  │ 😢 실패 리포트            │   │
│  │ ─────────────────────   │   │
│  │ 📅 실패 일시: 1/30 21:30  │   │
│  │                         │   │
│  │ 💔 사라진 기록:           │   │
│  │ • 연속 성공: 7일 → 0일    │   │
│  │ • 치팅데이 진행: 리셋     │   │
│  │                         │   │
│  │ 📝 메모:                  │   │
│  │ "회식이 있었는데 참지     │   │
│  │  못하고 폭식했어요..."    │   │
│  │                         │   │
│  │ 🤗18  💬7  ❤️12          │   │
│  │ "괜찮아! 다시 시작하자!"  │   │
│  └─────────────────────────┘   │
│                                 │
│  ── 1월 22일 ──                 │
│  ┌─────────────────────────┐   │
│  │ 🎉 7일 연속 달성!         │   │
│  │ 치팅데이 획득 🍕          │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

### Screen 5: 유혹 극복 모드 (Emergency)

#### 초기 화면
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│        🚨 지금 유혹 느껴?        │
│                                 │
│                                 │
│      ┌─────────────────┐       │
│      │                 │       │
│      │  [유혹 극복 모드] │       │
│      │                 │       │
│      └─────────────────┘       │
│                                 │
│                                 │
│      ────────────────────       │
│                                 │
│      😢 이미 폭식했어?           │
│      [자기 연민 모드]            │
│                                 │
│                                 │
└─────────────────────────────────┘
```

#### 유혹 극복 화면 (버튼 클릭 후)
```
┌─────────────────────────────────┐
│                                 │
│  ✨ 되고 싶은 나를 상상해봐      │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │  🥊 링 위에서 멋있는 나   │   │
│  │                         │   │
│  │  🏃 10km 가볍게 뛰는 나   │   │
│  │                         │   │
│  │  👕 사이즈 걱정없이       │   │
│  │     쇼핑하는 나          │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ─────────────────────────      │
│                                 │
│  💪 지금 참으면                  │
│     내일의 내가 고마워할 거야    │
│                                 │
│  ┌─────────────────────────┐   │
│  │   ⏱ 10분만 기다려보기    │   │
│  │      09:42 남음          │   │
│  └─────────────────────────┘   │
│                                 │
│       [참았어! 성공 🎉]          │
│                                 │
└─────────────────────────────────┘
```

#### 자기 연민 모드 (폭식 후)
```
┌─────────────────────────────────┐
│                                 │
│  🤗 괜찮아, 누구나 그래          │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │  ❌ "나는 의지박약이야"   │   │
│  │                         │   │
│  │  ✅ "오늘은 그랬지만,     │   │
│  │     지금부터 다시        │   │
│  │     시작하면 돼"         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ⚠️ 주의                        │
│  ─────────────────────────      │
│  "내일부터 하자"는 허가 효과!    │
│  미래의 좋은 행동을 예약하고     │
│  지금 나쁜 행동을 정당화하는 것  │
│                                 │
│  ─────────────────────────      │
│                                 │
│  🔥 연속 기록은 리셋되지만       │
│     너의 노력은 사라지지 않아    │
│                                 │
│      [지금부터 다시 시작]        │
│                                 │
└─────────────────────────────────┘
```

#### 실패 리포트 생성 화면 ⭐ (새로 추가)
```
┌─────────────────────────────────┐
│  😢 실패 리포트 기록             │
│                                 │
│  📅 실패 일시                    │
│  2월 5일 (목) 21:30             │
│                                 │
│  ─────────────────────────      │
│                                 │
│  💔 사라지는 기록                │
│  ┌─────────────────────────┐   │
│  │ • 연속 성공: 5일 → 0일    │   │
│  │ • 치팅데이 진행: 5/7 → 0  │   │
│  │ • 이번 주 성공률: 71%     │   │
│  └─────────────────────────┘   │
│                                 │
│  📝 무슨 일이 있었어? (선택)     │
│  ┌─────────────────────────┐   │
│  │ 회식이 있었는데 참지      │   │
│  │ 못하고 폭식했어요...      │   │
│  └─────────────────────────┘   │
│                                 │
│  📷 사진 첨부 (선택)             │
│  [+ 사진 추가]                   │
│                                 │
│  ─────────────────────────      │
│                                 │
│  👥 커뮤니티에 공유할까요?       │
│  ☐ 실패 리포트 공유하기          │
│    (다른 사람들의 응원을 받아요) │
│                                 │
│      [기록하고 다시 시작]        │
│                                 │
└─────────────────────────────────┘
```

#### 실패 리포트 상세 (커뮤니티/프로필에서 보이는 형태)
```
┌─────────────────────────────────┐
│  😢 실패 리포트                  │
│  😊 닉네임 · 2시간 전            │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📅 2월 5일 21:30 실패     │   │
│  │                         │   │
│  │ 💔 사라진 기록            │   │
│  │ ────────────────────    │   │
│  │ 연속 성공   5일 → 0일    │   │
│  │ 치팅데이    5/7 → 리셋   │   │
│  │                         │   │
│  │ 📝 메모                   │   │
│  │ "회식이 있었는데 참지     │   │
│  │  못하고 폭식했어요..."    │   │
│  └─────────────────────────┘   │
│                                 │
│  리액션                          │
│  [🤗] [💪] [❤️] [😢] [🔥]       │
│  🤗 18  💪 12  ❤️ 8             │
│                                 │
│  ── 댓글 7개 ──                  │
│  ┌─────────────────────────┐   │
│  │ 😊 유저A · 1시간 전       │   │
│  │ 괜찮아!! 다시 시작하면    │   │
│  │ 되는거야 💪               │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 💪 유저B · 30분 전        │   │
│  │ 나도 어제 실패했어 ㅠㅠ   │   │
│  │ 같이 다시 시작하자!       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 응원 댓글 입력...    전송 │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

### Screen 6: 리포트 (Statistics)

#### 6-1. 주간 리포트 (듀오링고 스타일 비교)
```
┌─────────────────────────────────┐
│  📊 주간 리포트                  │
│                                 │
│  ── 🏆 친구와 비교하기 ──        │
│  ┌─────────────────────────┐   │
│  │ 비교 대상 선택:           │   │
│  │ [😊 닉네임A ▼]           │   │
│  └─────────────────────────┘   │
│                                 │
│  ── 습관 달성률 비교 ──          │
│  ┌─────────────────────────┐   │
│  │        나 vs 닉네임A      │   │
│  │                         │   │
│  │ 100%┬                   │   │
│  │     │  ██               │   │
│  │ 80% ┤  ██ ▓▓  ██       │   │
│  │     │  ██ ▓▓  ██ ▓▓    │   │
│  │ 60% ┤  ██ ▓▓  ██ ▓▓ ██ │   │
│  │     │  ██ ▓▓  ██ ▓▓ ██ │   │
│  │ 40% ┤  ██ ▓▓  ██ ▓▓ ██ │   │
│  │     │  ██ ▓▓  ██ ▓▓ ██ │   │
│  │ 20% ┤  ██ ▓▓  ██ ▓▓ ██ │   │
│  │   0%┴──────────────────│   │
│  │      월  화  수  목  금   │   │
│  │                         │   │
│  │  ██ 나  ▓▓ 닉네임A      │   │
│  └─────────────────────────┘   │
│                                 │
│  ── 이번 주 스코어 ──            │
│  ┌────────────┬────────────┐   │
│  │     나      │  닉네임A   │   │
│  │   🔥 5일    │   🔥 4일   │   │
│  │  연속 성공   │  연속 성공  │   │
│  ├────────────┼────────────┤   │
│  │   💪 8회    │   💪 5회   │   │
│  │  유혹 극복   │  유혹 극복  │   │
│  ├────────────┼────────────┤   │
│  │   🍪 3개    │   🍪 2개   │   │
│  │  과자 적립   │  과자 적립  │   │
│  └────────────┴────────────┘   │
│                                 │
│  🏆 이번 주 승자: 나! (+2점 앞서) │
│                                 │
└─────────────────────────────────┘
```

#### 6-2. 체중 그래프 (비교 모드)
```
┌─────────────────────────────────┐
│  ⚖️ 체중 변화 비교               │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 시작   나: 76kg          │   │
│  │ 대비   닉네임A: 72kg     │   │
│  │                         │   │
│  │  +2 ┬─────────────────  │   │
│  │     │                   │   │
│  │   0 ┼───●───────────── │   │
│  │     │    ╲   ╱╲        │   │
│  │  -1 ┤     ╲_╱  ╲  ●    │   │
│  │     │    ▓▓▓▓▓▓▓╲╱     │   │
│  │  -2 ┤   ▓      ▓ ▓     │   │
│  │     │  ▓        ▓      │   │
│  │  -3 ┴─────────────────  │   │
│  │     1주  2주  3주  4주   │   │
│  │                         │   │
│  │  ── 나  ▓▓ 닉네임A      │   │
│  └─────────────────────────┘   │
│                                 │
│  📊 요약                        │
│  • 나: -1.8kg (시작 대비)       │
│  • 닉네임A: -2.1kg (시작 대비)  │
│                                 │
└─────────────────────────────────┘
```

#### 6-3. 개인 리포트 (기존 유지)
```
┌─────────────────────────────────┐
│  📈 나의 습관 달성률 (이번 주)   │
│                                 │
│  퇴근 전 바나나                  │
│  ████████████░░░░ 85%          │
│                                 │
│  스쿼트/복싱                     │
│  ██████████░░░░░░ 60%          │
│                                 │
│  작은 그릇 사용                  │
│  ████████████████ 100%         │
│                                 │
│  천천히 씹기                     │
│  ██████████████░░ 90%          │
│                                 │
│  ─────────────────────────      │
│                                 │
│  🍽 식사 패턴                    │
│  집밥: 8회 | 구내식당: 5회       │
│  외식: 1회 ✅ (2회 이하 성공)    │
│                                 │
└─────────────────────────────────┘
```

---

### Screen 5: 보상 관리 (Settings 또는 별도 탭)

```
┌─────────────────────────────────┐
│  🎁 보상 시스템 설정             │
│                                 │
│  ── 🍪 과자박스 ──              │
│  ┌─────────────────────────┐   │
│  │ 현재 적립: 3개           │   │
│  │ 🍫 🍫 🍫 ⬜ ⬜           │   │
│  │                         │   │
│  │ 적립 조건:               │   │
│  │ • 복싱 다녀온 날 +1      │   │
│  │                         │   │
│  │ 사용 조건:               │   │
│  │ • 3일 이상 식단 지키면    │   │
│  │   1개 사용 가능          │   │
│  │                         │   │
│  │   [과자 사용하기]        │   │
│  └─────────────────────────┘   │
│                                 │
│  ── 🍕 치팅데이 ──              │
│  ┌─────────────────────────┐   │
│  │ 이번 주 진행: 5/7일       │   │
│  │ ████████████░░░░        │   │
│  │                         │   │
│  │ 획득 조건:               │   │
│  │ • 일주일(7일) 식단 지키기 │   │
│  │                         │   │
│  │ 상태: 2일 남음           │   │
│  └─────────────────────────┘   │
│                                 │
│  ── ✨ 되고 싶은 나 ──          │
│  ┌─────────────────────────┐   │
│  │ • 링 위에서 멋있는 나     │   │
│  │ • 10km 가볍게 뛰는 나     │   │
│  │ • 사이즈 걱정없이 쇼핑    │   │
│  │                         │   │
│  │ [수정하기]               │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

## 🗂 데이터 모델

### 1. DailyRecord (일일 기록)
```dart
class DailyRecord {
  final String id;
  final DateTime date;
  final Map<String, bool> checklist; // 체크리스트 항목별 완료 여부
  final List<MealRecord> meals; // 식사 기록
  final ExerciseType? exercise; // 복싱 or 스쿼트 or null
  final bool isSuccessDay; // 핵심 미션 3개 중 2개 이상 완료 시 true
  final bool hadBinge; // 폭식 여부
  final int temptationResisted; // 유혹 극복 횟수
}
```

### 2. MealRecord (식사 기록) - 이미지 추가
```dart
class MealRecord {
  final String id;
  final MealTime mealTime; // 아침, 점심, 저녁, 간식
  final MealPlace place; // 집밥, 구내식당, 외식, 배달
  final String menu; // 자유 입력
  final String? imageUrl; // 식사 사진 (선택)
  final List<String> achievements; // 지킨 것들 (천천히 씹기 등)
  final DateTime createdAt; // 등록 시간
  final List<Reaction> reactions; // 리액션
  final List<Comment> comments; // 댓글
  final bool isPublic; // 커뮤니티 공개 여부
}

enum MealTime { breakfast, lunch, dinner, snack }
enum MealPlace { home, cafeteria, restaurant, delivery }
```

### 3. WeightRecord (체중 기록)
```dart
class WeightRecord {
  final String id;
  final DateTime date;
  final double weight; // kg
}
```

### 4. Reward (보상)
```dart
class RewardStatus {
  final int snackBoxCount; // 과자박스 적립 개수
  final int consecutiveDietDays; // 연속 식단 준수 일수
  final DateTime? lastCheatDay; // 마지막 치팅데이
}
```

### 5. UserGoals (되고 싶은 나)
```dart
class UserGoals {
  final List<String> futureVisions; // 되고 싶은 나 목록
  // 예: ["링 위에서 멋있는 나", "10km 가볍게 뛰는 나"]
}
```

### 6. ChecklistItem (체크리스트 항목)
```dart
class ChecklistItem {
  final String id;
  final String title;
  final TimeOfDay timeSlot; // 아침, 점심, 퇴근, 저녁, 운동
  final bool isCoreMission; // 핵심 미션 여부
}
```

### 7. User (사용자 프로필) - 커뮤니티용 ⭐
```dart
class User {
  final String id;
  final String nickname;
  final String? profileImage;
  final String? bio; // 한 줄 소개
  final int currentStreak; // 연속 성공 일수
  final int totalSuccessDays; // 총 성공일
  final int totalTemptationResisted; // 총 유혹 극복 횟수
  final int snackBoxCount; // 과자박스 적립 수
  final List<String> followers;
  final List<String> following;
  final DateTime createdAt;
}
```

### 8. Post (커뮤니티 게시글) ⭐
```dart
class Post {
  final String id;
  final String authorId;
  final PostType type; // text, image, youtube, failureReport
  final String? content; // 텍스트 내용
  final String? imageUrl; // 이미지
  final String? youtubeUrl; // 유튜브 링크
  final FailureReport? failureReport; // 실패 리포트 (type이 failureReport일 때)
  final SharedRecord? sharedRecord; // 공유된 기록 (체크리스트, 식사 등)
  final List<Reaction> reactions;
  final List<Comment> comments;
  final DateTime createdAt;
}

enum PostType { text, image, youtube, failureReport, sharedRecord }
```

### 9. FailureReport (실패 리포트) ⭐
```dart
class FailureReport {
  final String id;
  final String oderId;
  final DateTime failedAt; // 실패 일시
  final int lostStreak; // 사라진 연속 기록
  final int lostCheatDayProgress; // 사라진 치팅데이 진행도
  final double weekSuccessRate; // 이번 주 성공률
  final String? memo; // 메모 (무슨 일이 있었는지)
  final String? imageUrl; // 사진 (선택)
  final bool isPublic; // 커뮤니티 공개 여부
  final List<Reaction> reactions;
  final List<Comment> comments;
  final DateTime createdAt;
}
```

### 10. SharedRecord (공유된 기록) ⭐
```dart
class SharedRecord {
  final SharedRecordType type; // checklist, meal, weekStatus
  final DateTime recordDate;
  final Map<String, dynamic> data; // 실제 기록 데이터
}

enum SharedRecordType { checklist, meal, weekStatus }
```

### 11. Reaction (리액션) ⭐
```dart
class Reaction {
  final String oderId;
  final ReactionType type;
  final DateTime createdAt;
}

enum ReactionType { heart, fire, muscle, clap, hug, sad }
// ❤️ 🔥 💪 👏 🤗 😢
```

### 12. Comment (댓글) ⭐
```dart
class Comment {
  final String id;
  final String authorId;
  final String content;
  final DateTime createdAt;
}
```

### 13. UserStats (통계) - 비교용 ⭐
```dart
class UserStats {
  final String oderId;
  final int currentStreak; // 현재 연속 성공
  final int longestStreak; // 최장 연속 기록
  final int totalSuccessDays; // 총 성공 일수
  final int totalTemptationResisted; // 총 유혹 극복 수
  final int snackBoxCount; // 과자박스 적립 수
  final List<double> weeklyProgress; // 주간 달성률 (비교 그래프용)
  final List<WeightRecord> weightHistory; // 체중 히스토리 (비교 그래프용)
}
```

---

## 🧩 핵심 컴포넌트 (커뮤니티)

### 1. MealTimeline (식사 타임라인)
```dart
/// 연혁 형식 식사 기록
/// 
/// ()
/// │ 7:30 저녁 - 집밥
/// │
/// ()
/// │ 2:30 간식 - 바나나
/// │
/// ()
/// │ 12:00 점심 - 구내식당

class MealTimeline extends StatelessWidget {
  final List<MealRecord> meals;
  final bool showReactions; // 리액션/댓글 표시 여부
  final bool isMyProfile; // 내 프로필인지 (댓글 달기 가능 여부)
}
```

### 2. ReactionBar (리액션 바)
```dart
/// 감정 표현 선택
/// [❤️] [🔥] [💪] [👏] [🤗] [😢]

class ReactionBar extends StatelessWidget {
  final Map<ReactionType, int> counts;
  final ReactionType? myReaction;
  final Function(ReactionType) onReact;
}
```

### 3. CommentSection (댓글 섹션)
```dart
class CommentSection extends StatelessWidget {
  final List<Comment> comments;
  final Function(String) onAddComment;
  final bool canComment;
}
```

### 4. CompareChart (듀오링고 스타일 비교 차트)
```dart
/// 1개 그래프에 2개 값 표시
/// ██ 나  ▓▓ 상대방

class CompareChart extends StatelessWidget {
  final List<double> myData;
  final List<double> otherData;
  final List<String> labels; // 월, 화, 수, ...
  final String myLabel;
  final String otherLabel;
}
```

### 5. ShortsPlayer (유튜브 숏츠 뷰)
```dart
/// 세로 스와이프로 영상 넘기기

class ShortsPlayer extends StatelessWidget {
  final List<Post> videoPosts;
  final int initialIndex;
}
```

### 6. FailureReportCard (실패 리포트 카드)
```dart
class FailureReportCard extends StatelessWidget {
  final FailureReport report;
  final bool showReactions;
  final bool showComments;
}
```

### 7. ProfileStatsRow (프로필 통계 행)
```dart
/// ┌────────┬────────┬────────┐
/// │ 🔥 23  │ 💪 47  │ 📅 15  │
/// │ 연속   │ 유혹   │ 총     │
/// └────────┴────────┴────────┘

class ProfileStatsRow extends StatelessWidget {
  final int currentStreak;
  final int temptationResisted;
  final int totalSuccessDays;
}
```

---

## 🎯 핵심 비즈니스 로직

### 1. 연속 성공 일수 (Streak) 계산
```
- 하루가 "성공"인 조건: 핵심 미션 3개 중 2개 이상 완료
- 핵심 미션: 퇴근 전 바나나, 스쿼트/복싱, 작은 그릇 사용
- 폭식 기록 시 streak 리셋
```

### 2. 과자박스 적립 로직
```
- 복싱 다녀온 날 → +1 적립
- 3일 이상 연속 식단 지키면 → 1개 사용 가능
```

### 3. 치팅데이 획득 로직
```
- 7일 연속 식단 지키면 → 치팅데이 1회 획득
- 치팅데이 사용해도 streak 유지
```

### 4. 외식 횟수 제한
```
- 주 2회까지만 허용
- 초과 시 경고 표시
```

### 5. 유혹 극복 타이머
```
- 10분 카운트다운
- 완료 시 "성공" 기록 + 격려 메시지
```

---

## 🛠 기술 스택

### Flutter
- **상태관리**: Riverpod 또는 Provider
- **로컬 저장소**: Hive 또는 SQLite (drift)
- **차트**: fl_chart
- **애니메이션**: Lottie (스트릭 불꽃, 성공 효과)
- **알림**: flutter_local_notifications
- **이미지 선택**: image_picker
- **이미지 캐싱**: cached_network_image
- **유튜브 재생**: youtube_player_flutter

### 백엔드 (커뮤니티용) ⭐
- **옵션 1**: Firebase (Auth + Firestore + Storage)
- **옵션 2**: Supabase (Auth + PostgreSQL + Storage)
- **이미지 저장**: Firebase Storage 또는 Supabase Storage
- **실시간 업데이트**: Firestore 또는 Supabase Realtime

### 폴더 구조 (권장)
```
lib/
├── main.dart
├── app.dart
│
├── core/
│   ├── constants/
│   ├── theme/
│   └── utils/
│
├── data/
│   ├── models/
│   │   ├── daily_record.dart
│   │   ├── meal_record.dart
│   │   ├── weight_record.dart
│   │   ├── user.dart
│   │   ├── post.dart
│   │   ├── failure_report.dart
│   │   ├── comment.dart
│   │   └── reaction.dart
│   ├── repositories/
│   │   ├── record_repository.dart
│   │   ├── user_repository.dart
│   │   └── post_repository.dart
│   └── local_storage/
│
├── domain/
│   ├── entities/
│   └── usecases/
│
├── presentation/
│   ├── screens/
│   │   ├── home/
│   │   ├── checklist/
│   │   ├── community/           # 커뮤니티 ⭐
│   │   │   ├── feed_screen.dart
│   │   │   ├── shorts_screen.dart
│   │   │   ├── post_create_screen.dart
│   │   │   └── widgets/
│   │   ├── profile/             # 프로필 ⭐
│   │   │   ├── profile_screen.dart
│   │   │   ├── mission_tab.dart
│   │   │   ├── checklist_tab.dart
│   │   │   ├── meal_timeline_tab.dart
│   │   │   ├── history_tab.dart
│   │   │   └── widgets/
│   │   ├── emergency/
│   │   │   ├── temptation_screen.dart
│   │   │   ├── self_compassion_screen.dart
│   │   │   └── failure_report_screen.dart  # 실패 리포트 ⭐
│   │   └── report/
│   │       ├── report_screen.dart
│   │       ├── compare_screen.dart         # 비교 화면 ⭐
│   │       └── widgets/
│   ├── widgets/
│   │   ├── common/
│   │   ├── timeline/            # 타임라인 위젯 ⭐
│   │   │   └── meal_timeline.dart
│   │   ├── reaction/            # 리액션 위젯 ⭐
│   │   │   ├── reaction_bar.dart
│   │   │   └── comment_section.dart
│   │   └── chart/               # 비교 차트 ⭐
│   │       └── compare_chart.dart
│   └── providers/
│
└── l10n/ (다국어 - 선택)
```

---

## 📋 개발 순서 (권장)

### Phase 1: 기본 구조
1. 프로젝트 생성 및 폴더 구조 세팅
2. 테마 및 색상 정의
3. 하단 네비게이션 구현 (5탭)
4. 라우팅 설정

### Phase 2: 데이터 레이어
1. 데이터 모델 정의 (User, Post, FailureReport 등 포함)
2. Hive 또는 SQLite 설정
3. Repository 패턴 구현
4. Firebase 또는 Supabase 설정 (커뮤니티용)

### Phase 3: 홈 화면
1. 스트릭 카운터 위젯
2. 핵심 미션 카드
3. 주간 캘린더
4. 보상 현황 카드

### Phase 4: 체크리스트 화면
1. 시간대별 체크리스트
2. 식사 기록 카드 (이미지 첨부 가능)
3. 식사 추가 모달
4. 외식 횟수 카운터

### Phase 5: 유혹 극복 화면
1. 메인 버튼 UI
2. 동기부여 화면 (되고 싶은 나)
3. 10분 타이머
4. 자기 연민 모드
5. **실패 리포트 생성 화면** ⭐
6. **실패 리포트 커뮤니티 공유** ⭐

### Phase 6: 커뮤니티 화면 ⭐
1. 커뮤니티 피드 (전체/팔로잉/영상 탭)
2. 게시글 카드 (텍스트, 이미지, 유튜브)
3. 유튜브 숏츠 뷰 (스와이프)
4. 글쓰기 모달 (기록 공유 옵션)
5. 리액션 바 (❤️🔥💪👏🤗😢)
6. 댓글 섹션

### Phase 7: 프로필 화면 ⭐
1. 프로필 메인 (통계 카드)
2. 미션 탭 (핵심 미션, 주간 현황, 유혹 극복)
3. 체크리스트 탭 (구경 전용)
4. **식사 타임라인 탭** (연혁 형식, 댓글/리액션)
5. 기록 탭 (성공/실패 히스토리)
6. 팔로우/팔로잉

### Phase 8: 리포트 화면
1. **듀오링고 스타일 비교 그래프** ⭐
2. 체중 비교 그래프 (나 vs 친구)
3. 개인 습관 달성률
4. 주간 스코어 비교

### Phase 9: 마무리
1. 리마인더 알림 (10:30 물, 5시 바나나)
2. 이미지 업로드 최적화
3. 온보딩 화면 (선택)
4. 버그 수정 및 최적화

---

## 🎨 디자인 가이드

### 색상 팔레트 (제안)
```dart
// Primary
primaryColor: Color(0xFF6366F1), // 인디고 (보라빛 파랑)

// Success / Positive
successColor: Color(0xFF22C55E), // 그린

// Warning
warningColor: Color(0xFFF59E0B), // 앰버

// Error / Danger
errorColor: Color(0xFFEF4444), // 레드

// Background
backgroundColor: Color(0xFFF8FAFC), // 연한 그레이
cardColor: Colors.white,

// Text
textPrimary: Color(0xFF1E293B),
textSecondary: Color(0xFF64748B),
```

### 폰트
- 한글: Pretendard 또는 Noto Sans KR
- 이모지: 시스템 기본

### 아이콘
- Lucide Icons 또는 Material Icons

---

## 📝 체크리스트 기본 항목

```dart
final defaultChecklist = [
  // 아침
  ChecklistItem(title: '10:30 물 500ml', timeSlot: 'morning', isCoreMission: false),
  
  // 점심
  ChecklistItem(title: '샐러드 두 젓가락 먹기', timeSlot: 'lunch', isCoreMission: false),
  ChecklistItem(title: '천천히 씹기 (20번 이상)', timeSlot: 'lunch', isCoreMission: false),
  
  // 퇴근
  ChecklistItem(title: '바나나 or 사과 먹기', timeSlot: 'afterWork', isCoreMission: true), // ⭐ 핵심
  
  // 저녁
  ChecklistItem(title: '작은 그릇 사용', timeSlot: 'dinner', isCoreMission: true), // ⭐ 핵심
  ChecklistItem(title: 'TV 없이 먹기', timeSlot: 'dinner', isCoreMission: false),
  ChecklistItem(title: '천천히 씹기', timeSlot: 'dinner', isCoreMission: false),
  
  // 운동 (택1)
  ChecklistItem(title: '복싱', timeSlot: 'exercise', isCoreMission: true), // ⭐ 핵심
  ChecklistItem(title: '스쿼트 1개', timeSlot: 'exercise', isCoreMission: true), // ⭐ 핵심
];
```

---

## 💬 동기부여 문구 (되고 싶은 나)

### 기본 제공 (수정 가능)
```dart
final defaultFutureVisions = [
  '🥊 링 위에서 개 멋있는 나',
  '🏃 10km를 가볍게 뛰는 나',
  '👕 사이즈 걱정없이 쇼핑하는 나',
];
```

### 자기 연민 문구
```dart
final selfCompassionMessages = [
  '괜찮아, 누구나 그래',
  '오늘은 그랬지만, 지금부터 다시 시작하면 돼',
  '연속 기록은 리셋되지만, 너의 노력은 사라지지 않아',
  '실패는 과정이야. 포기만 안 하면 돼',
];

final licensingWarning = '''
⚠️ "내일부터 하자"는 허가 효과!
미래의 좋은 행동을 예약하고
지금 나쁜 행동을 정당화하는 거야.
"지금부터" 다시 시작하자!
''';
```

---

## 🔔 알림 설정 (선택)

```dart
final defaultReminders = [
  Reminder(time: TimeOfDay(hour: 10, minute: 30), message: '💧 물 500ml 마실 시간!'),
  Reminder(time: TimeOfDay(hour: 17, minute: 0), message: '🍌 퇴근 전 바나나 먹기!'),
  Reminder(time: TimeOfDay(hour: 21, minute: 0), message: '📝 오늘 하루 기록해볼까?'),
];
```

---

## ⚠️ 주의사항

1. **의지력에 의존하는 기능 금지**: "오늘 하루 금식" 같은 극단적 기능 없음
2. **자책 유도 금지**: 실패해도 부정적 문구 표시 안 함
3. **허가 효과 방지**: "내일 하면 돼" 같은 문구 절대 사용 안 함
4. **숫자 강조 최소화**: 칼로리 계산, 체중 집착 유도 안 함
5. **작은 성공 강조**: 1개라도 했으면 칭찬

---

## 🔒 프로필 공개/비공개 정보

### 공개 (다른 사람이 볼 수 있음)
- ✅ 오늘의 핵심 미션 현황
- ✅ 이번 주 현황 (월~일 캘린더)
- ✅ 과자박스 적립 개수
- ✅ 유혹 극복 횟수 (이번 주 / 누적)
- ✅ 체크리스트 (완료 여부만)
- ✅ 식사 타임라인 (사진, 메뉴)
- ✅ 기록 히스토리 (성공/실패)
- ✅ 연속 성공 일수
- ✅ 총 성공일

### 비공개 (나만 볼 수 있음)
- 🔒 나의 보상 현황 상세 (사용 내역)
- 🔒 치팅데이 잔여 여부
- 🔒 "되고 싶은 나" 목록
- 🔒 체중 기록 (본인만 / 비교 허용 시만 공개)

---

## 🚀 MVP 범위

### MVP v1 (개인용 - 먼저)
첫 버전에서 꼭 필요한 것:
- [ ] 홈 화면 (스트릭 + 핵심 미션)
- [ ] 체크리스트 (체크만 가능)
- [ ] 유혹 극복 모드 (타이머 + 동기부여)
- [ ] 간단한 식사 기록 (이미지 첨부)
- [ ] 로컬 저장

### MVP v2 (커뮤니티 추가)
- [ ] 회원가입/로그인
- [ ] 커뮤니티 피드
- [ ] 게시글 작성 (텍스트, 이미지)
- [ ] 리액션/댓글
- [ ] 프로필 화면 (기본)

### MVP v3 (소셜 기능 확장)
- [ ] 유튜브 숏츠 뷰
- [ ] 식사 타임라인 (연혁 형식)
- [ ] 실패 리포트 공유
- [ ] 팔로우/팔로잉
- [ ] 프로필 탭들 (미션, 체크리스트, 식사, 기록)

### MVP v4 (비교 기능)
- [ ] 듀오링고 스타일 비교 그래프
- [ ] 체중 비교 그래프
- [ ] 주간 스코어 비교
- [ ] 알림

---

## 📚 참고 자료

### 연구 논문
- Episodic Future Thinking: International Journal of Nursing Studies (2024)
- Temptation Bundling: Katy Milkman, Wharton School
- Self-Compassion: British Journal of Health Psychology (2021)
- Slow Eating: Scientific Reports (2021), Nutrients (2025)
- Tiny Habits: BJ Fogg, Stanford

### 서적
- "Atomic Habits" - James Clear
- "Tiny Habits" - BJ Fogg
- "How to Change" - Katy Milkman

---

이 문서를 기반으로 Flutter 앱을 개발해주세요.
사용자의 의지력이 아닌 시스템과 환경이 행동을 바꾸도록 설계하는 것이 핵심입니다.
