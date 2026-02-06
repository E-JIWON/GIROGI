# GIROGI (기로기)

> 행동경제학과 심리학 연구 기반의 과학적 다이어트 앱
> **상태**: Flutter MVP 완성 → Next.js로 전환 중

---

## 🎯 프로젝트 개요

의지력 의존이 아닌 **시스템적 환경 설계**로 지속 가능한 행동 변화를 유도하는 다이어트 앱입니다.

**핵심 차별점**:
- 6가지 심리학/행동경제학 이론 적용
- 자기 연민(Self-Compassion) 메커니즘으로 실패 후 복귀 지원
- Streak(연속 성공)과 소셜 지원으로 동기부여

---

## ✨ 주요 기능

### 홈 대시보드
- 🔥 연속 성공 일수(Streak) 추적
- ✅ 일일 핵심 미션 (3개 중 2개 달성)
- 📅 주간 성공률 캘린더
- 🎁 보상 시스템 (과자박스, 치팅데이)

### 체크리스트
- ⏰ 시간대별 행동 체크리스트
- 🍽️ 식사 기록 (장소, 메뉴, 사진)
- ⚠️ 외식 빈도 경고 시스템

### 유혹 극복
- ⏱️ 10분 타이머 (충동 지연)
- 🔮 미래 자아 시각화 (EFT 이론)
- 💖 자기 연민 모드 (실패 후 복귀)

### 커뮤니티
- 📝 경험 공유 피드
- 😊 6종 감정 리액션
- 💬 댓글 기반 상호 지원
- 🎬 숏츠 형식 동기부여 콘텐츠

### 프로필
- 👤 식사 타임라인
- 📊 듀오링고 스타일 친구 비교
- 🤝 팔로우/팔로잉 네트워크

---

## 🛠 기술 스택

### Flutter 앱 (MVP 완성)
```
Flutter 3.38.5 / Dart 3.10.4
Clean Architecture
Material Design 3
Mock Repository Pattern
```

### ⚡ Next.js로 전환 중 (2026-02-06~)
```typescript
Next.js 15        // 프레임워크
TypeScript 5.7    // 언어
Tailwind CSS 4.0  // 스타일링
Zustand          // 상태 관리
TanStack Query   // 서버 데이터
Zod              // 타입 검증
```

**전환 이유**:
- 웹 우선 전략 (SEO, 즉시 배포)
- 본인이 직접 수정 가능 (TypeScript/React 익숙)
- 앱스토어 수수료 절감 (30% → 0%)
- PWA → Capacitor로 앱 래핑 가능

---

## 📂 프로젝트 구조

```
diet_tracker_app/          # Flutter MVP (보관용)
└── lib/
    ├── core/              # 테마, 상수
    ├── data/              # 14개 모델, Repository
    ├── domain/            # 비즈니스 로직
    └── presentation/      # 5개 화면, 위젯

girogi-web/                # Next.js 앱 (개발 중)
└── src/
    ├── app/               # App Router
    ├── components/        # UI 컴포넌트
    ├── lib/               # 유틸리티, API
    ├── stores/            # Zustand
    └── types/             # TypeScript 타입
```

---

## 🚀 시작하기

### Flutter 앱 (MVP)
```bash
cd diet_tracker_app
flutter pub get
flutter run
```

### Next.js 앱 (개발 중)
```bash
cd girogi-web
npm install
npm run dev
```

---

## 📚 문서

- **상세 개발 가이드**: `CLAUDE.md`
- **Next.js 전환 계획**: `.claude/GIROGI_Next.js_전환_계획.md`
- **기술 스택 분석**: `.claude/web_analysis/`

---

## 📄 라이선스

MIT License

---

**최종 수정**: 2026-02-06 (Next.js 전환 시작)
