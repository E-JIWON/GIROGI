# GIROGI 디자인 가이드라인

> 파스텔 컬러 기반 깔끔한 디자인 시스템
> **버전**: 1.0
> **업데이트**: 2026-02-09

---

## 📐 디자인 철학

### 핵심 원칙

1. **NO 테두리** - Border 완전 제거
2. **NO 그림자** - Shadow 완전 제거
3. **배경색으로 구분** - 배경색 변화로 요소 계층 표현
4. **충분한 여백** - 여백으로 시각적 계층 구조
5. **부드러운 파스텔** - 눈에 편안한 연한 색상

### 디자인 모토

> "덜어내고, 여백을 주고, 부드럽게"

---

## 🎨 컬러 시스템

### 메인 컬러 팔레트

#### Primary (라벤더)
차분하고 신뢰감 있는 메인 컬러

```css
--color-primary-300: #c0c4dc   /* 연함 */
--color-primary-400: #acb0cf
--color-primary-500: #a6b1e1   /* 메인 ⭐ */
--color-primary-600: #8a94c7   /* 진함 */
```

**사용처**:
- 주요 버튼
- 액션 요소
- 브랜드 강조

#### Success (민트)
상쾌하고 긍정적인 성공 표현

```css
--color-success-200: #cef3e1   /* 배경용 */
--color-success-300: #b4e7ce   /* 메인 ⭐ */
--color-success-400: #9adbb9
```

**사용처**:
- 성공 메시지
- 완료 상태
- Streak 달성

#### Warning (피치)
따뜻하고 부드러운 경고

```css
--color-warning-200: #ffead9   /* 배경용 */
--color-warning-300: #ffd7ba   /* 메인 ⭐ */
--color-warning-400: #ffc49b
```

**사용처**:
- 경고 메시지
- 주의 필요 항목
- 과자박스/치팅데이

#### Error (코랄)
부드러운 핑크 계열 오류 표현

```css
--color-error-200: #ffe1e5    /* 배경용 */
--color-error-300: #ffcbd0    /* 메인 ⭐ */
--color-error-400: #ffb5bb
```

**사용처**:
- 오류 메시지
- 실패 상태
- 자기 연민 모드

#### Info (스카이블루)
밝고 투명한 정보 전달

```css
--color-info-200: #d6eefb     /* 배경용 */
--color-info-300: #b8e0f6     /* 메인 ⭐ */
--color-info-400: #9ad2f1
```

**사용처**:
- 정보 메시지
- 툴팁
- 도움말

### Neutral (라벤더 틴트 그레이)

전체적으로 통일감 있는 회색 톤 (라벤더 약간 섞임)

```css
--color-neutral-50:  #fafafc   /* 배경 */
--color-neutral-100: #f5f6fa   /* 카드 배경 */
--color-neutral-200: #e8eaf0   /* 구분선 */
--color-neutral-300: #d4d7e3   /* 비활성 */
--color-neutral-700: #646b97   /* 보조 텍스트 */
--color-neutral-900: #2c3571   /* 주 텍스트 */
```

---

## 🖼️ 레이아웃 원칙

### 1. 카드 디자인 (테두리/그림자 없음)

#### ❌ 기존 방식 (사용 금지)
```tsx
// 테두리 + 그림자 = 답답함
<div className="border border-gray-200 shadow-md rounded-lg p-4">
  내용
</div>
```

#### ✅ 새로운 방식 (권장)
```tsx
// 배경색으로만 구분 = 깔끔함
<div className="bg-white rounded-[24px] p-6">
  내용
</div>
```

### 2. 계층 구조 표현

**배경색 단계로 구분**:
1. **페이지 배경**: `bg-neutral-50` (#fafafc)
2. **1차 카드**: `bg-white` (#ffffff)
3. **2차 카드 (중첩)**: `bg-neutral-100` (#f5f6fa)
4. **3차 강조**: `bg-primary-50` (#f5f6fb)

**예시**:
```tsx
<div className="bg-neutral-50 min-h-screen p-6">
  {/* 페이지 배경 */}

  <div className="bg-white rounded-[24px] p-6 mb-4">
    {/* 1차 카드 */}

    <div className="bg-neutral-100 rounded-[16px] p-4">
      {/* 2차 중첩 카드 */}
    </div>
  </div>
</div>
```

### 3. 여백 시스템

**충분한 여백으로 숨 쉬는 디자인**:

```tsx
// 작은 컴포넌트
p-3  (12px)  // 내부 여백
gap-2 (8px)  // 요소 간격

// 중간 컴포넌트
p-4  (16px)
gap-3 (12px)

// 큰 컴포넌트 (카드)
p-6  (24px)
gap-4 (16px)

// 페이지
p-6  (24px)
gap-6 (24px)
```

### 4. Border Radius

**부드러운 모서리**:

```css
rounded-[12px]  /* 작은 요소 */
rounded-[16px]  /* 중간 요소 */
rounded-[24px]  /* 큰 카드 */
rounded-full    /* 원형 (프로필 등) */
```

---

## 🔤 타이포그래피

### Font Family
```css
Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif
```

### Font Sizes

```tsx
text-xs    (11px)  // 캡션, 작은 라벨
text-sm    (12px)  // 보조 텍스트
text-base  (14px)  // 본문
text-lg    (16px)  // 중요 본문
text-xl    (18px)  // 소제목
text-2xl   (24px)  // 제목
text-3xl   (30px)  // 큰 제목
text-5xl   (48px)  // Streak 숫자
text-6xl   (64px)  // 타이머
```

### Font Weights

```tsx
font-normal     (400)  // 일반 텍스트
font-medium     (500)  // 강조 텍스트
font-semibold   (600)  // 제목
font-bold       (700)  // 큰 제목
```

### Text Colors

```tsx
text-neutral-900  // 주요 텍스트 (#2c3571)
text-neutral-700  // 보조 텍스트 (#646b97)
text-neutral-500  // 부가 텍스트 (#9ca1bd)
text-neutral-400  // 비활성 텍스트 (#b8bcd0)
```

---

## 🎯 컴포넌트 스타일 가이드

### 버튼

#### Primary 버튼
```tsx
<button className="
  bg-primary-500
  text-white
  px-6 py-3
  rounded-[16px]
  font-medium
  transition-colors duration-300
  hover:bg-primary-600
">
  확인
</button>
```

#### Secondary 버튼
```tsx
<button className="
  bg-neutral-100
  text-neutral-900
  px-6 py-3
  rounded-[16px]
  font-medium
  transition-colors duration-300
  hover:bg-neutral-200
">
  취소
</button>
```

#### Ghost 버튼 (배경 없음)
```tsx
<button className="
  text-primary-500
  px-4 py-2
  font-medium
  transition-colors duration-300
  hover:text-primary-600
">
  더보기
</button>
```

### 입력 필드

```tsx
<input
  type="text"
  placeholder="입력하세요"
  className="
    w-full
    bg-neutral-50
    text-neutral-900
    px-4 py-3
    rounded-[16px]
    transition-colors duration-150
    focus:bg-neutral-100
    focus:outline-none
    placeholder:text-neutral-400
  "
/>
```

### 카드

#### 기본 카드
```tsx
<div className="
  bg-white
  rounded-[24px]
  p-6
">
  {/* 내용 */}
</div>
```

#### 강조 카드 (배경색 있음)
```tsx
<div className="
  bg-primary-100
  rounded-[24px]
  p-6
">
  {/* 내용 */}
</div>
```

#### 그라데이션 카드 (특수 상황)
```tsx
<div className="
  bg-gradient-primary
  text-white
  rounded-[24px]
  p-6
">
  {/* 내용 */}
</div>
```

### 배지 (Badge)

```tsx
<span className="
  inline-flex
  items-center
  gap-1
  bg-success-100
  text-success-700
  px-3 py-1
  rounded-full
  text-sm
  font-medium
">
  <CheckIcon className="w-4 h-4" />
  완료
</span>
```

### 구분선

```tsx
{/* 얇은 구분선 */}
<div className="h-px bg-neutral-200" />

{/* 여백 있는 구분선 */}
<div className="border-t border-neutral-200 my-4" />
```

---

## 💡 실전 예시

### 홈 화면 Streak 카운터

```tsx
<div className="
  bg-gradient-warning
  rounded-[24px]
  p-8
  text-center
">
  <div className="text-6xl font-bold text-white mb-2">
    7일
  </div>
  <div className="text-sm text-white/80">
    연속 성공! 🔥
  </div>
  <div className="text-xs text-white/60 mt-2">
    지금까지 최고: 12일
  </div>
</div>
```

### 미션 카드

```tsx
<div className="
  bg-white
  rounded-[24px]
  p-6
  space-y-4
">
  <h3 className="text-lg font-semibold text-neutral-900">
    오늘의 미션
  </h3>

  {missions.map((mission) => (
    <div key={mission.id} className="
      bg-neutral-50
      rounded-[16px]
      p-4
      flex
      items-center
      gap-3
      transition-colors duration-300
      hover:bg-neutral-100
    ">
      <div className={`
        w-6 h-6
        rounded-full
        flex items-center justify-center
        ${mission.completed
          ? 'bg-success-300'
          : 'bg-neutral-200'
        }
      `}>
        {mission.completed && (
          <CheckIcon className="w-4 h-4 text-white" />
        )}
      </div>

      <span className={`
        flex-1
        ${mission.completed
          ? 'text-neutral-500 line-through'
          : 'text-neutral-900'
        }
      `}>
        {mission.title}
      </span>
    </div>
  ))}
</div>
```

### 주간 캘린더

```tsx
<div className="
  bg-white
  rounded-[24px]
  p-6
">
  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
    이번 주
  </h3>

  <div className="flex justify-between gap-2">
    {weekDays.map((day) => (
      <div key={day.date} className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">
          {day.label}
        </span>

        <div className={`
          w-12 h-12
          rounded-full
          flex items-center justify-center
          ${day.status === 'success'
            ? 'bg-success-200'
            : day.status === 'fail'
            ? 'bg-error-200'
            : 'bg-neutral-100'
          }
        `}>
          {day.status === 'success' && (
            <CheckIcon className="w-6 h-6 text-success-700" />
          )}
          {day.status === 'fail' && (
            <XIcon className="w-6 h-6 text-error-700" />
          )}
          {day.status === 'future' && (
            <span className="text-sm text-neutral-400">
              {day.date}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
```

### 자기 연민 카드

```tsx
<div className="
  bg-error-100
  rounded-[24px]
  p-6
  text-center
">
  <div className="text-4xl mb-4">💖</div>

  <h3 className="text-xl font-bold text-error-800 mb-2">
    괜찮습니다
  </h3>

  <p className="text-sm text-error-700 mb-4">
    한 번의 실수로 모든 것이 끝나는 건 아닙니다.
    <br />
    지금까지 당신은 정말 잘해왔어요.
  </p>

  <div className="bg-white/50 rounded-[16px] p-4 mb-4">
    <div className="text-2xl font-bold text-error-800">84%</div>
    <div className="text-xs text-error-700">전체 성공률</div>
  </div>

  <button className="
    w-full
    bg-error-300
    text-white
    py-3
    rounded-[16px]
    font-medium
    transition-colors duration-300
    hover:bg-error-400
  ">
    다시 시작하기
  </button>
</div>
```

---

## 🚫 하지 말아야 할 것

### ❌ 테두리 사용
```tsx
// 절대 하지 마세요!
<div className="border border-gray-300">...</div>
```

### ❌ 그림자 사용
```tsx
// 절대 하지 마세요!
<div className="shadow-lg">...</div>
<div className="drop-shadow-md">...</div>
```

### ❌ 강한 색상
```tsx
// 파스텔이 아닌 강한 색상 금지
<div className="bg-blue-600">...</div>  // ❌
<div className="bg-red-500">...</div>   // ❌

// 대신 파스텔 사용
<div className="bg-primary-300">...</div>  // ✅
<div className="bg-error-300">...</div>    // ✅
```

### ❌ 좁은 여백
```tsx
// 답답한 여백
<div className="p-2">...</div>  // ❌

// 충분한 여백
<div className="p-6">...</div>  // ✅
```

---

## 🎨 색상 조합 예시

### 성공 표현
```tsx
<div className="bg-success-100 text-success-800">
  미션 완료! 🎉
</div>
```

### 경고 표현
```tsx
<div className="bg-warning-100 text-warning-800">
  외식 3회 초과! ⚠️
</div>
```

### 정보 표현
```tsx
<div className="bg-info-100 text-info-800">
  오늘 1,234명이 미션을 완료했어요 💪
</div>
```

### 오류 표현
```tsx
<div className="bg-error-100 text-error-800">
  다시 시도해주세요
</div>
```

---

## 📱 반응형 디자인

### 모바일 우선
```tsx
<div className="
  p-4           {/* 모바일: 16px */}
  md:p-6        {/* 태블릿: 24px */}
  lg:p-8        {/* 데스크톱: 32px */}
">
  ...
</div>
```

### Grid 레이아웃
```tsx
<div className="
  grid
  grid-cols-1       {/* 모바일: 1열 */}
  md:grid-cols-2    {/* 태블릿: 2열 */}
  lg:grid-cols-3    {/* 데스크톱: 3열 */}
  gap-4
">
  ...
</div>
```

---

## 🎬 애니메이션

### 부드러운 전환
```tsx
// 배경색 전환
className="transition-colors duration-300"

// 투명도 전환
className="transition-opacity duration-300"

// 여러 속성 전환
className="transition-all duration-300"
```

### 호버 효과
```tsx
<button className="
  bg-primary-500
  hover:bg-primary-600
  transition-colors duration-300
">
  클릭
</button>
```

---

## 📝 체크리스트

새 컴포넌트를 만들 때 확인하세요:

- [ ] 테두리 없음 (border 사용 X)
- [ ] 그림자 없음 (shadow 사용 X)
- [ ] 파스텔 색상 사용 (300~400 톤)
- [ ] 충분한 여백 (최소 p-4 이상)
- [ ] 부드러운 border-radius (최소 12px)
- [ ] 배경색으로 계층 구분
- [ ] 부드러운 transition 추가
- [ ] 반응형 고려 (md:, lg: 등)

---

## 🎯 요약

**핵심 3가지**:
1. **테두리/그림자 없음** → 배경색으로 구분
2. **파스텔 컬러** → 300~400 톤 사용
3. **충분한 여백** → 최소 p-4 이상

**이 원칙만 지켜도 깔끔한 디자인 완성!**

---

**문서 버전**: 1.0
**최종 수정**: 2026-02-09
**작성자**: Claude for GIROGI

> 이 가이드를 따라 일관되고 깔끔한 디자인을 만들어보세요! 🎨
