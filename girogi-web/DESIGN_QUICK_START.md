# 파스텔 디자인 시스템 빠른 시작 가이드

> 5분 만에 GIROGI 디자인 시스템 이해하기

---

## 🎨 핵심 3가지 원칙

### 1. NO 테두리
```tsx
// ❌ 사용하지 마세요
<div className="border border-gray-200">...</div>

// ✅ 대신 배경색으로 구분
<div className="bg-white">...</div>
```

### 2. NO 그림자
```tsx
// ❌ 사용하지 마세요
<div className="shadow-lg">...</div>

// ✅ 배경색 변화로 계층 표현
<div className="bg-neutral-100">...</div>
```

### 3. 파스텔 컬러만
```tsx
// ❌ 강한 색상
<div className="bg-blue-600">...</div>

// ✅ 파스텔 톤 (300~400)
<div className="bg-primary-300">...</div>
```

---

## 🌈 메인 컬러 (외우세요!)

```tsx
// Primary (라벤더) - 메인
bg-primary-300   #c0c4dc
bg-primary-500   #a6b1e1 ⭐

// Success (민트) - 완료
bg-success-300   #b4e7ce ⭐

// Warning (피치) - 경고
bg-warning-300   #ffd7ba ⭐

// Error (코랄) - 실패
bg-error-300     #ffcbd0 ⭐

// Info (스카이) - 정보
bg-info-300      #b8e0f6 ⭐

// Neutral (회색) - 배경
bg-neutral-50    #fafafc (페이지)
bg-neutral-100   #f5f6fa (카드)
bg-neutral-900   #2c3571 (텍스트)
```

---

## 🚀 즉시 사용 가능한 컴포넌트

### 버튼
```tsx
import { CleanButton } from '@/components/examples/CleanButton';

<CleanButton variant="primary" size="md">
  확인
</CleanButton>

<CleanButton variant="secondary">
  취소
</CleanButton>
```

### 카드
```tsx
import { CleanCard } from '@/components/examples/CleanCard';

<CleanCard variant="white" padding="lg">
  내용
</CleanCard>

<CleanCard variant="primary">
  강조 카드
</CleanCard>
```

### 입력 필드
```tsx
import { CleanInput } from '@/components/examples/CleanInput';

<CleanInput
  label="이름"
  placeholder="입력하세요"
  fullWidth
/>
```

### 배지
```tsx
import { CleanBadge } from '@/components/examples/CleanBadge';

<CleanBadge variant="success">
  완료
</CleanBadge>

<CleanBadge variant="warning" icon={<span>⚠</span>}>
  경고
</CleanBadge>
```

---

## 📐 레이아웃 패턴

### 페이지 구조
```tsx
export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      {/* 페이지 배경: neutral-50 */}

      <CleanCard variant="white" padding="lg">
        {/* 1차 카드: white */}

        <div className="bg-neutral-100 rounded-[16px] p-4">
          {/* 2차 카드: neutral-100 */}
        </div>
      </CleanCard>
    </div>
  );
}
```

### 여백 규칙
```tsx
// 작은 요소
p-3 gap-2

// 중간 요소
p-4 gap-3

// 큰 카드
p-6 gap-4

// 페이지
p-6 gap-6
```

### Border Radius
```tsx
// 작은 요소
rounded-[12px]

// 중간 요소
rounded-[16px]

// 큰 카드 (기본)
rounded-[24px]

// 원형
rounded-full
```

---

## 💡 자주 사용하는 패턴

### 성공 메시지
```tsx
<div className="bg-success-100 text-success-800 px-4 py-3 rounded-[16px]">
  ✓ 완료되었습니다!
</div>
```

### 경고 메시지
```tsx
<div className="bg-warning-100 text-warning-800 px-4 py-3 rounded-[16px]">
  ⚠️ 주의하세요!
</div>
```

### 오류 메시지
```tsx
<div className="bg-error-100 text-error-800 px-4 py-3 rounded-[16px]">
  ✕ 오류가 발생했습니다
</div>
```

### 미션 체크 항목
```tsx
<div className="bg-neutral-50 rounded-[16px] p-4 flex items-center gap-3">
  <div className="w-6 h-6 bg-success-300 rounded-full flex items-center justify-center">
    <span className="text-white text-sm">✓</span>
  </div>
  <span>아침 식사 집에서 먹기</span>
</div>
```

### Streak 카운터
```tsx
<div className="bg-gradient-warning rounded-[24px] p-8 text-center">
  <div className="text-6xl font-bold text-white mb-2">
    7일
  </div>
  <div className="text-sm text-white/80">
    연속 성공! 🔥
  </div>
</div>
```

---

## 🎯 쇼케이스 페이지

모든 컴포넌트를 한눈에 볼 수 있습니다:

```bash
cd girogi-web
npm run dev
```

브라우저에서:
```
http://localhost:3000/design
```

---

## 📚 더 자세한 내용

- **DESIGN_GUIDE.md**: 전체 디자인 가이드라인
- **globals.css**: 색상 정의 및 CSS 변수
- **src/components/examples/**: 예시 컴포넌트 코드

---

## ✅ 체크리스트 (새 컴포넌트 만들 때)

- [ ] `border` 사용 안 함
- [ ] `shadow` 사용 안 함
- [ ] 파스텔 색상 (300~400 톤)
- [ ] 최소 `p-4` 이상 여백
- [ ] `rounded-[12px]` 이상 radius
- [ ] 배경색으로 계층 구분
- [ ] `transition-colors duration-300` 추가

---

**이것만 기억하세요!**

1. **테두리/그림자 없음**
2. **파스텔 300~400 사용**
3. **충분한 여백 (p-6)**

끝! 이제 바로 시작하세요 🚀
