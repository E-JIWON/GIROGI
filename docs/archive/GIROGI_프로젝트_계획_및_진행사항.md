# GIROGI 다이어트 앱 - 프로젝트 계획 및 진행사항

**최종 업데이트**: 2026-02-05

---

## 📋 프로젝트 개요

**앱 이름**: GIROGI (기로기)
**목적**: 행동경제학 및 심리학 연구 기반의 다이어트 지원 애플리케이션
**타겟 사용자**: 바쁜 직장인
**핵심 가치**: 의지력 의존이 아닌 시스템적 환경 설계를 통한 지속 가능한 행동 변화

### 적용된 심리학 이론

1. **Episodic Future Thinking (EFT)** - 미래 자아 시각화로 충동 억제
2. **Temptation Bundling** - 보상 묶기로 운동 참여율 증가
3. **Implementation Intention** - 구조화된 체크리스트로 목표 달성률 증대
4. **Tiny Habits Methodology** - 최소 행동 단위 기반 습관 형성
5. **Self-Compassion Theory** - 실패 후 복귀율 증가
6. **Slow Eating Research** - 저작 횟수 추적으로 포만감 향상

---

## 🏗️ 기술 스택

### Frontend
- **Flutter** 3.38.5 / Dart 3.10.4
- **상태 관리**: Riverpod (예정)
- **UI/UX**: Material Design 3

### 데이터 영속성
- **개발**: Mock Repository Pattern (메모리 기반)
- **프로덕션**: Hive (NoSQL) 또는 SQLite + Drift (ORM)

### 백엔드
- **개발**: Mock Data Layer
- **프로덕션**: Firebase (BaaS) 또는 Supabase

### 주요 라이브러리 (예정)
- fl_chart (데이터 시각화)
- Lottie (애니메이션)
- image_picker (이미지 선택)
- cached_network_image (이미지 캐싱)
- youtube_player_flutter (비디오 재생)

---

## 📐 아키텍처

### Clean Architecture 기반 레이어 분리

```
lib/
├── core/                   # 공통 모듈
│   ├── constants/         # 전역 상수
│   ├── theme/            # 디자인 시스템
│   └── utils/            # 유틸리티
│
├── data/                  # 데이터 레이어
│   ├── models/           # DTO
│   ├── repositories/     # Repository 구현
│   └── local_storage/    # 로컬 DB
│
├── domain/               # 도메인 레이어
│   ├── entities/        # 비즈니스 엔티티
│   └── usecases/        # 비즈니스 로직
│
└── presentation/         # 프레젠테이션 레이어
    ├── screens/         # 화면 UI
    ├── widgets/         # 재사용 컴포넌트
    └── providers/       # 상태 관리
```

---

## ✅ 전체 개발 단계 (13단계)

### Phase 1: 프로젝트 초기화 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- Flutter 프로젝트 생성
- Clean Architecture 폴더 구조 구축
- app.dart, main.dart 생성
- .gitignore 설정

**커밋**:
```
feat: Flutter 프로젝트 초기화 및 Clean Architecture 구조 설정
```

---

### Phase 2: 데이터 모델 레이어 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- 14개 데이터 모델 구현
  - Enum 타입 (8종) + Extension
  - ChecklistItem, Comment, Reaction
  - MealRecord, WeightRecord
  - RewardStatus, UserGoals
  - DailyRecord, User, SharedRecord
  - FailureReport, Post, UserStats

**모델 설계 특징**:
- 불변 객체 패턴 (copyWith)
- JSON 직렬화/역직렬화
- 모든 필드 목적 기반 주석
- TODO 마커로 DB 전환 지점 명시

**커밋**:
```
feat: 데이터 모델 레이어 구현 (14개 모델)
```

---

### Phase 3: Repository 레이어 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- 3개 Repository 인터페이스
  - DailyRecordRepository
  - UserRepository
  - PostRepository

- 3개 Mock 구현체
  - MockDailyRecordRepository (7일간 샘플 데이터)
  - MockUserRepository (4명 테스트 사용자)
  - MockPostRepository (다양한 타입 게시글)

**Repository 설계 특징**:
- 인터페이스 기반 추상화
- Mock 구현체로 즉시 UI 개발 가능
- TODO 마커로 실제 DB 전환 지점 명시

**커밋**:
```
feat: Repository 패턴 구현 (인터페이스 + Mock 구현체)
```

---

### Phase 4: Core 레이어 (테마, 색상, 상수) ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- AppConstants: 앱 전역 상수
  - API 관련 (베이스 URL, 타임아웃)
  - 데이터베이스 (Hive 박스 이름)
  - 행동 변화 로직 (미션 개수, 치팅데이 조건)
  - UI 상수 (패딩, 보더 라디우스, 아이콘 크기)
  - 애니메이션 (기본/빠른/느린 시간)

- AppColors: 색상 시스템
  - Primary (#6366F1 인디고)
  - Semantic (Success, Warning, Error, Info)
  - Neutral (Grey 50~900)
  - Feature-specific (Streak, 치팅데이, 자기 연민)
  - 그라데이션 및 그림자
  - 라이트/다크 모드 지원

- AppTypography: Material 3 타이포그래피
  - Display/Headline/Title/Body/Label Styles
  - Custom Styles (Streak Counter, Timer Display)
  - 유틸리티 메서드

- AppTheme: 완전한 테마 시스템
  - 라이트/다크 모드 ThemeData
  - Material 3 ColorScheme
  - 컴포넌트별 테마 (Button, Card, Input 등)

**커밋**:
```
feat: Material Design 3 기반 디자인 시스템 구축
```

---

### Phase 5: 프로젝트 구조 재정리 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- diet_tracker_app 서브폴더 제거
- 모든 파일을 루트로 이동
- 앱 이름 변경 (GIROGI)
- 패키지명 변경 (girogi)
- Android/iOS 설정 업데이트
- 모든 import 경로 변경

**커밋**:
```
refactor: 프로젝트 구조 재정리 및 앱 이름 변경 (GIROGI)
```

---

### Phase 6: 메인 네비게이션 및 화면 스켈레톤 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- MainNavigation 구현
  - 하단 네비게이션 바 (BottomNavigationBar)
  - 5개 탭 구조 (고정형)
  - StatefulWidget 상태 관리
  - 화면 전환 로직

- 5개 화면 스켈레톤 생성
  - HomeScreen (홈)
  - ChecklistScreen (체크리스트)
  - EmergencyScreen (유혹 극복)
  - CommunityScreen (커뮤니티)
  - ProfileScreen (프로필)

**구현 특징**:
- 각 화면마다 적절한 아이콘 및 라벨
- AppBar 기본 구성 (타이틀, 액션 버튼)
- 임시 UI (아이콘, 제목, 설명)
- 심리학 이론 기반 주석
- Material 3 테마 자동 적용

**생성된 파일**:
- `lib/presentation/screens/main_navigation.dart`
- `lib/presentation/screens/home/home_screen.dart`
- `lib/presentation/screens/checklist/checklist_screen.dart`
- `lib/presentation/screens/emergency/emergency_screen.dart`
- `lib/presentation/screens/community/community_screen.dart`
- `lib/presentation/screens/profile/profile_screen.dart`

**커밋**:
```
feat: 메인 네비게이션 및 5개 화면 스켈레톤 구현
```

---

### Phase 7: 홈 화면 구현 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- 연속 성공 일수 카운터 (Streak)
  - 애니메이션 효과 (불 이모지 + 그라데이션)
  - 최고 기록 표시
- 핵심 미션 3개 표시 (2개 이상 달성 시 성공)
  - MissionCard 위젯 구현
  - 체크박스 토글 기능
  - 달성률 표시 (2/3개 이상 시 성공)
- 주간 성공률 캘린더
  - 7일 단위 달력 뷰
  - 성공/실패/미래 일자 구분
- 보상 시스템 현황
  - 과자박스 적립 (3일마다 1개)
  - 치팅데이 카운트다운 (7일 연속 성공)
  - 진행률 바 및 애니메이션

**생성된 파일**:
- `lib/presentation/screens/home/home_screen.dart`
- `lib/presentation/widgets/home/streak_counter.dart`
- `lib/presentation/widgets/home/mission_card.dart`
- `lib/presentation/widgets/home/weekly_calendar.dart`
- `lib/presentation/widgets/home/reward_status_card.dart`

**커밋**:
```
feat: 홈 화면 구현 완료 (Phase 7)
```

---

### Phase 8: 체크리스트 화면 구현 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- 시간대별 체크리스트 (4개 섹션)
  - 아침 (기상, 아침 식사)
  - 점심 (점심 식사)
  - 퇴근 (유혹 극복, 운동)
  - 저녁 (저녁 식사, 취침)
- ChecklistTimeSection 위젯
  - 시간대별 그룹화
  - 진행률 표시
  - 확장/축소 기능
- ChecklistItem 위젯
  - 체크박스 토글
  - 완료 시간 표시
  - 선택적 설명
- 식사 기록 기능
  - MealRecordButton 위젯
  - 사진 업로드 플레이스홀더
  - 장소, 메뉴 입력
  - 준수 행동 체크 (천천히 먹기, 30회 씹기 등)
- 주간 외식 빈도 경고

**생성된 파일**:
- `lib/presentation/screens/checklist/checklist_screen.dart`
- `lib/presentation/widgets/checklist/checklist_time_section.dart`
- `lib/presentation/widgets/checklist/meal_record_button.dart`

**커밋**:
```
feat: 체크리스트 화면 구현 완료 (Phase 8)
```

---

### Phase 9: 유혹 극복 화면 구현 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- 10분 유혹 타이머 (Temptation Timer)
  - CircularProgressIndicator 애니메이션
  - 분:초 포맷 표시
  - 시작/일시정지/재개/초기화 기능
  - 완료 시 축하 메시지
- 미래 자아 시각화 카드 (Episodic Future Thinking)
  - 목표 이미지 표시 (네트워크 이미지)
  - 동기부여 메시지
  - "목표 다시 보기" 액션 버튼
- 자기 연민 카드 (Self-Compassion)
  - 부드러운 색상 테마
  - 긍정적 피드백 메시지
  - 실패 후 복귀 지원
- 실패 리포트 다이얼로그
  - 실패 원인 선택 (피로, 스트레스, 사회적 압력 등)
  - 감정 기록
  - 다음 전략 작성
  - 커뮤니티 공유 옵션

**생성된 파일**:
- `lib/presentation/screens/emergency/emergency_screen.dart`
- `lib/presentation/widgets/emergency/temptation_timer.dart`
- `lib/presentation/widgets/emergency/future_self_card.dart`
- `lib/presentation/widgets/emergency/self_compassion_card.dart`
- `lib/presentation/widgets/emergency/failure_report_dialog.dart`

**커밋**:
```
feat: 유혹 극복 화면 구현 완료 (Phase 9)
```

---

### Phase 10: 커뮤니티 화면 구현 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- 2탭 구조 (전체 피드 / 팔로잉 피드)
  - TabController 기반 탭 전환
  - 각 탭별 필터링 로직
- 게시글 카드 (PostCard 위젯)
  - 작성자 프로필 (아바타, 닉네임, 시간)
  - 게시글 타입별 콘텐츠 표시
    - 텍스트 게시글
    - 이미지 게시글 (1장 이상)
    - 유튜브 게시글 (썸네일 + 재생 버튼)
    - 실패 리포트 (특별 스타일)
  - 좋아요/댓글 수 표시
- 리액션 바 (ReactionBar 위젯)
  - 6종 감정 표현 (좋아요, 응원, 공감, 놀람, 슬픔, 화남)
  - 각 리액션별 카운트 표시
  - 사용자가 선택한 리액션 하이라이트
  - BottomSheet UI
- 글쓰기 기능 (PostComposerDialog)
  - 텍스트 입력 필드
  - 이미지 첨부 옵션
  - 유튜브 URL 입력 옵션
  - 게시 버튼
- RefreshIndicator로 피드 새로고침

**생성된 파일**:
- `lib/presentation/screens/community/community_screen.dart`
- `lib/presentation/widgets/community/post_card.dart`
- `lib/presentation/widgets/community/reaction_bar.dart`
- `lib/presentation/widgets/community/post_composer_dialog.dart`

**커밋**:
```
feat: 커뮤니티 화면 구현 완료 (Phase 10)
```

---

### Phase 11: 프로필 화면 구현 ✅ 완료
**완료일**: 2026-02-05

**작업 내용**:
- NestedScrollView 기반 스크롤 구조
  - 헤더 고정/축소 애니메이션
  - SliverPersistentHeader로 탭바 고정
- 프로필 헤더 (ProfileHeader 위젯)
  - 프로필 이미지 (또는 초성 아바타)
  - 닉네임, 바이오
  - 통계 (게시글, 팔로워, 팔로잉 수)
  - 팔로우/편집 버튼 (본인 여부에 따라)
- 2탭 구조 (식사 타임라인 / 기록)
  - TabController 기반 탭 전환
  - 각 탭별 콘텐츠 표시
- 식사 타임라인 탭
  - MealTimelineItem 위젯
  - 세로 타임라인 UI (점, 연결선)
  - 시간대별 색상 구분 (아침/점심/저녁)
  - 식사 사진, 장소, 메뉴 표시
  - 준수 행동 태그
  - 집밥/외식 배지
- 기록 탭
  - 사용자가 공유한 게시글 목록
  - PostCard 위젯 재사용
  - 리액션/댓글 기능 연동

**생성된 파일**:
- `lib/presentation/screens/profile/profile_screen.dart`
- `lib/presentation/widgets/profile/profile_header.dart`
- `lib/presentation/widgets/profile/meal_timeline_item.dart`

**특별 기능**:
- 공통 위젯 추가 구현
  - CommentSection: 댓글 섹션 위젯
  - ComparisonChart: 듀오링고 스타일 비교 차트

**커밋**:
```
feat: 프로필 화면 구현 완료 (Phase 11)
feat: 공통 위젯 구현 완료 (Phase 11) - MVP 완성
```

---

### Phase 12-13: 프로덕션 준비 단계 ⏳ 향후 작업

**Phase 11에서 MVP 완성됨**

Phase 12-13의 핵심 기능은 Phase 11에 포함되어 구현되었습니다:
- ✅ ComparisonChart 위젯 (듀오링고 스타일 비교 차트)
- ✅ CommentSection 위젯 (댓글 섹션)
- ✅ ReactionBar 위젯 (6종 감정 표현)
- ✅ MealTimelineItem 위젯 (식사 타임라인)

**향후 프로덕션 작업 계획** (Phase 12 이후):
1. **상태 관리 전환**
   - StatefulWidget → Riverpod 마이그레이션
   - Provider 구조 설계
   - 전역 상태 관리

2. **데이터베이스 통합**
   - Mock Repository → Hive 또는 SQLite
   - 로컬 데이터 영속성
   - 오프라인 퍼스트 전략

3. **백엔드 연동**
   - Firebase 또는 Supabase 설정
   - 인증 시스템 구현
   - 실시간 동기화

4. **이미지 처리**
   - image_picker 통합
   - 이미지 압축 및 업로드
   - cached_network_image 적용

5. **고급 차트 기능**
   - fl_chart 라이브러리 통합
   - 체중 변화 추이 차트
   - 주간 습관 달성률 시각화

6. **알림 시스템**
   - Push Notification
   - 로컬 알림 (미션 리마인더)

7. **성능 최적화**
   - 이미지 레이지 로딩
   - 무한 스크롤 페이지네이션
   - 캐싱 전략

8. **앱스토어 배포**
   - Android/iOS 빌드 설정
   - 앱 아이콘 및 스플래시 스크린
   - 버전 관리 및 배포

**참고**: 자세한 프로덕션 로드맵은 `CLAUDE.md` 문서 참조

---

## 📊 진행도 요약

| 단계 | 상태 | 완료율 |
|------|------|--------|
| Phase 1: 프로젝트 초기화 | ✅ 완료 | 100% |
| Phase 2: 데이터 모델 | ✅ 완료 | 100% |
| Phase 3: Repository | ✅ 완료 | 100% |
| Phase 4: Core 레이어 | ✅ 완료 | 100% |
| Phase 5: 구조 재정리 | ✅ 완료 | 100% |
| Phase 6: 네비게이션 바 | ✅ 완료 | 100% |
| Phase 7: 홈 화면 | ✅ 완료 | 100% |
| Phase 8: 체크리스트 | ✅ 완료 | 100% |
| Phase 9: 유혹 극복 | ✅ 완료 | 100% |
| Phase 10: 커뮤니티 | ✅ 완료 | 100% |
| Phase 11: 프로필 + 공통 위젯 | ✅ 완료 | 100% |
| Phase 12-13: 프로덕션 준비 | ⏳ 향후 작업 | 0% |

**MVP 진행도**: 11/11 단계 완료 (100%) 🎉
**전체 진행도**: 11/13 단계 완료 (85%)

---

## 🎯 다음 작업

**🎉 MVP 개발 완료!**

Phase 1-11까지 모든 핵심 기능 구현이 완료되었습니다.

**향후 프로덕션 준비 작업**:
1. **Riverpod 상태 관리 적용** (가장 우선)
   - StatefulWidget을 Provider 기반으로 전환
   - 전역 상태 관리 구조 설계

2. **데이터베이스 통합**
   - Mock Repository를 Hive 또는 SQLite로 교체
   - 로컬 영속성 구현

3. **백엔드 연동**
   - Firebase/Supabase 설정
   - 인증 및 실시간 동기화

4. **이미지 업로드 기능**
   - image_picker 통합
   - 이미지 압축 및 저장

5. **배포 준비**
   - 앱 아이콘, 스플래시 스크린
   - Android/iOS 스토어 제출

**참고**: 자세한 내용은 `CLAUDE.md` 문서의 "9. 프로덕션 준비 로드맵" 참조

---

## 📝 개발 원칙

1. **Low Coupling, High Cohesion**
   - 모듈 간 의존성 최소화
   - 단일 책임 원칙 준수

2. **Reusability & Maintainability**
   - 컴포넌트 재사용성 최대화
   - 적절한 추상화 레벨 유지

3. **Documentation**
   - 모든 함수/변수에 목적 기반 주석
   - Mock 데이터 영역에 TODO 마커 명시

4. **Code Quality**
   - 일관된 코드 스타일
   - 명확한 네이밍 컨벤션

---

## 🔗 관련 문서

- [프로젝트 명세서](./Diet%20Tracker%20App%20Spec%20-%20Claude.md)
- [README.md](../README.md)

---

**프로젝트 시작일**: 2026-02-05
**MVP 완료일**: 2026-02-05
**마지막 업데이트**: 2026-02-05
**개발자**: Claude & bongchil

---

## 📌 중요: 13단계 작업 방식

이 프로젝트는 **체계적인 13단계 방식**으로 개발되었습니다.

### 작업 방식
1. **단계별 순차 개발**: Phase 1 → Phase 11까지 순차적으로 진행
2. **각 단계마다**:
   - 기능 구현
   - README.md 업데이트
   - Git 커밋 (명확한 커밋 메시지)
3. **Clean Architecture 준수**: 레이어 분리 및 책임 분담
4. **Mock 데이터 먼저**: Repository 패턴으로 나중에 DB 교체 용이

### 작업 시 참고사항
- **새 기능 추가 시**: 어느 Phase에 해당하는지 확인
- **코드 수정 시**: 해당 Phase의 구현 내역 참고
- **문서 참고 순서**:
  1. 이 파일 (`GIROGI_프로젝트_계획_및_진행사항.md`) - Phase별 상세 내역
  2. `CLAUDE.md` - 종합 가이드 및 수정 방법
  3. `README.md` - 프로젝트 전체 개요

### 다른 세션에서 작업 시
다른 Claude Code 세션에서 작업할 때는:
1. 이 파일을 먼저 읽어 전체 구조 파악
2. 진행 중인 Phase 확인
3. 관련 Phase의 커밋 히스토리 참고
4. 동일한 패턴 (구현 → 문서 → 커밋) 유지

**핵심**: 13단계 방식을 따라 일관성 있게 개발하면 유지보수가 쉽습니다!
