/**
 * 스트릭 (연속 기록) 시스템 타입 정의
 * 듀오링고 스타일 연속 기록 관리
 */

/**
 * 스트릭 데이터
 */
export interface StreakData {
  currentStreak: number;      // 현재 연속 일수
  longestStreak: number;      // 최장 연속 일수 (역대 최고)
  totalDays: number;          // 총 기록 일수
  lastRecordDate: string;     // ISO 8601 (마지막 기록 날짜, YYYY-MM-DD)
  weeklyStatus: boolean[];    // [월, 화, 수, 목, 금, 토, 일] 7개
}

/**
 * 주간 통계
 */
export interface WeeklyStats {
  recordedDays: number;       // 이번 주 기록한 일수
  totalDays: number;          // 7일
  percentage: number;         // 기록률 (0-100)
  status: boolean[];          // [월, 화, 수, 목, 금, 토, 일]
}
