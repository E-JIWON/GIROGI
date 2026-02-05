/// 앱 전역에서 사용되는 Enum 타입 정의
///
/// 식사 시간, 장소, 게시글 타입 등 분류가 필요한 모든 데이터 타입을 정의합니다.
library;

/// 식사 시간대 분류
///
/// 사용자의 식사 기록을 시간대별로 구분하기 위한 Enum
enum MealTime {
  /// 아침 식사
  breakfast,

  /// 점심 식사
  lunch,

  /// 저녁 식사
  dinner,

  /// 간식
  snack,
}

/// 식사 장소 분류
///
/// 식사 환경을 추적하여 외식 빈도 등을 분석하기 위한 Enum
enum MealPlace {
  /// 집에서 조리한 식사
  home,

  /// 회사 구내식당
  cafeteria,

  /// 외부 식당 (외식)
  restaurant,

  /// 배달 음식
  delivery,
}

/// 운동 타입 분류
///
/// 체크리스트에서 선택 가능한 운동 종류
enum ExerciseType {
  /// 복싱 운동
  boxing,

  /// 최소 단위 운동 (스쿼트 1개 등)
  minimal,
}

/// 커뮤니티 게시글 타입
///
/// 게시글의 콘텐츠 유형을 구분하기 위한 Enum
enum PostType {
  /// 텍스트 게시글
  text,

  /// 이미지 게시글
  image,

  /// 유튜브 영상 게시글
  youtube,

  /// 실패 리포트 게시글
  failureReport,

  /// 공유된 기록 게시글 (체크리스트, 식사 등)
  sharedRecord,
}

/// 공유 가능한 기록 타입
///
/// 커뮤니티에 공유할 수 있는 개인 기록의 종류
enum SharedRecordType {
  /// 체크리스트 기록
  checklist,

  /// 식사 기록
  meal,

  /// 주간 성공 현황
  weekStatus,
}

/// 리액션 타입
///
/// 게시글이나 댓글에 남길 수 있는 감정 표현 (총 6종)
enum ReactionType {
  /// 하트 (좋아요)
  heart,

  /// 불 (열정, 동기부여)
  fire,

  /// 근육 (힘내요, 화이팅)
  muscle,

  /// 박수 (잘했어요)
  clap,

  /// 포옹 (응원, 위로)
  hug,

  /// 슬픔 (공감, 함께 힘내요)
  sad,
}

/// 시간대 슬롯
///
/// 체크리스트를 시간대별로 그룹화하기 위한 Enum
enum TimeSlot {
  /// 아침 시간대
  morning,

  /// 점심 시간대
  lunch,

  /// 퇴근 시간대
  afterWork,

  /// 저녁 시간대
  dinner,

  /// 운동 시간
  exercise,
}

/// Enum Extension - 한글 표시명 제공
extension MealTimeExtension on MealTime {
  /// 한글 표시명 반환
  String get displayName {
    switch (this) {
      case MealTime.breakfast:
        return '아침';
      case MealTime.lunch:
        return '점심';
      case MealTime.dinner:
        return '저녁';
      case MealTime.snack:
        return '간식';
    }
  }
}

extension MealPlaceExtension on MealPlace {
  /// 한글 표시명 반환
  String get displayName {
    switch (this) {
      case MealPlace.home:
        return '집밥';
      case MealPlace.cafeteria:
        return '구내식당';
      case MealPlace.restaurant:
        return '외식';
      case MealPlace.delivery:
        return '배달';
    }
  }

  /// 아이콘 이모지 반환
  String get icon {
    switch (this) {
      case MealPlace.home:
        return '🏠';
      case MealPlace.cafeteria:
        return '🏢';
      case MealPlace.restaurant:
        return '🍜';
      case MealPlace.delivery:
        return '🛵';
    }
  }
}

extension ExerciseTypeExtension on ExerciseType {
  /// 한글 표시명 반환
  String get displayName {
    switch (this) {
      case ExerciseType.boxing:
        return '복싱';
      case ExerciseType.minimal:
        return '스쿼트 1개';
    }
  }
}

extension ReactionTypeExtension on ReactionType {
  /// 이모지 반환
  String get emoji {
    switch (this) {
      case ReactionType.heart:
        return '❤️';
      case ReactionType.fire:
        return '🔥';
      case ReactionType.muscle:
        return '💪';
      case ReactionType.clap:
        return '👏';
      case ReactionType.hug:
        return '🤗';
      case ReactionType.sad:
        return '😢';
    }
  }
}

extension TimeSlotExtension on TimeSlot {
  /// 한글 표시명 반환
  String get displayName {
    switch (this) {
      case TimeSlot.morning:
        return '아침';
      case TimeSlot.lunch:
        return '점심';
      case TimeSlot.afterWork:
        return '퇴근';
      case TimeSlot.dinner:
        return '저녁';
      case TimeSlot.exercise:
        return '운동';
    }
  }

  /// 아이콘 이모지 반환
  String get icon {
    switch (this) {
      case TimeSlot.morning:
        return '🌅';
      case TimeSlot.lunch:
        return '🌞';
      case TimeSlot.afterWork:
        return '🌆';
      case TimeSlot.dinner:
        return '🌙';
      case TimeSlot.exercise:
        return '💪';
    }
  }
}
