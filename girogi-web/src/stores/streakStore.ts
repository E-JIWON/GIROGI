/**
 * 스트릭 (연속 기록) Zustand 스토어
 *
 * 듀오링고 스타일 연속 기록 관리
 * localStorage에 자동 저장
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StreakData, WeeklyStats } from '@/types/streak';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, parseISO, isSameDay } from 'date-fns';

interface StreakStore {
  // State
  streakData: StreakData;

  // Actions
  recordToday: () => void;
  updateStreak: (recordDates: string[]) => void; // ISO 8601 날짜 배열
  getWeeklyStats: () => WeeklyStats;
  isRecordedToday: () => boolean;

  // Utils
  reset: () => void;
}

const initialState: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  totalDays: 0,
  lastRecordDate: '',
  weeklyStatus: [false, false, false, false, false, false, false],
};

export const useStreakStore = create<StreakStore>()(
  persist(
    (set, get) => ({
      streakData: initialState,

      /**
       * 오늘 기록 추가
       * 연속 일수 계산 및 업데이트
       */
      recordToday: () => {
        const now = new Date();
        const today = format(now, 'yyyy-MM-dd');

        set((state) => {
          const { lastRecordDate, currentStreak, longestStreak, totalDays } = state.streakData;

          // 이미 오늘 기록했으면 무시
          if (lastRecordDate === today) {
            return state;
          }

          // 어제 날짜 계산
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = format(yesterday, 'yyyy-MM-dd');

          // 연속 일수 계산
          let newStreak = 1;
          if (lastRecordDate === yesterdayStr) {
            // 어제 기록이 있으면 연속
            newStreak = currentStreak + 1;
          } else if (lastRecordDate === '') {
            // 첫 기록
            newStreak = 1;
          }
          // 그 외 (어제가 아닌 과거 날짜)면 스트릭 리셋 (newStreak = 1)

          // 최장 스트릭 업데이트
          const newLongestStreak = Math.max(longestStreak, newStreak);

          // 이번 주 요일 계산 (월=0, 일=6)
          const dayOfWeek = now.getDay();
          const weekIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 월요일부터 시작

          const newWeeklyStatus = [...state.streakData.weeklyStatus];
          newWeeklyStatus[weekIndex] = true;

          return {
            streakData: {
              currentStreak: newStreak,
              longestStreak: newLongestStreak,
              totalDays: totalDays + 1,
              lastRecordDate: today,
              weeklyStatus: newWeeklyStatus,
            },
          };
        });
      },

      /**
       * 전체 기록 날짜로 스트릭 재계산
       * DailyRecord 배열을 받아서 스트릭 업데이트
       *
       * @param recordDates - ISO 8601 날짜 배열 (예: ["2026-02-01", "2026-02-02"])
       */
      updateStreak: (recordDates: string[]) => {
        if (recordDates.length === 0) {
          set({ streakData: initialState });
          return;
        }

        // 날짜 정렬 (오래된 순 → 최신 순)
        const sortedDates = [...recordDates].sort();

        // 총 기록 일수
        const totalDays = sortedDates.length;

        // 마지막 기록 날짜
        const lastRecordDate = sortedDates[sortedDates.length - 1];

        // 현재 스트릭 계산 (마지막 날짜부터 역순으로)
        let currentStreak = 0;
        const today = new Date();
        const todayStr = format(today, 'yyyy-MM-dd');

        // 오늘 또는 어제까지 기록이 있어야 스트릭 유지
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = format(yesterday, 'yyyy-MM-dd');

        if (lastRecordDate !== todayStr && lastRecordDate !== yesterdayStr) {
          // 스트릭 끊김
          currentStreak = 0;
        } else {
          // 역순으로 연속 일수 계산
          for (let i = sortedDates.length - 1; i >= 0; i--) {
            const currentDate = parseISO(sortedDates[i]);
            const expectedDate = new Date(today);
            expectedDate.setDate(expectedDate.getDate() - currentStreak);

            if (isSameDay(currentDate, expectedDate)) {
              currentStreak++;
            } else {
              break;
            }
          }
        }

        // 최장 스트릭 계산
        let longestStreak = 1;
        let tempStreak = 1;

        for (let i = 1; i < sortedDates.length; i++) {
          const prevDate = parseISO(sortedDates[i - 1]);
          const currDate = parseISO(sortedDates[i]);

          const dayDiff = Math.floor(
            (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (dayDiff === 1) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
          } else {
            tempStreak = 1;
          }
        }

        // 이번 주 상태 계산
        const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 월요일 시작
        const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
        const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

        const weeklyStatus = daysInWeek.map((day) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          return sortedDates.includes(dayStr);
        });

        set({
          streakData: {
            currentStreak,
            longestStreak,
            totalDays,
            lastRecordDate,
            weeklyStatus,
          },
        });
      },

      /**
       * 이번 주 통계 조회
       */
      getWeeklyStats: (): WeeklyStats => {
        const { weeklyStatus } = get().streakData;
        const recordedDays = weeklyStatus.filter(Boolean).length;

        return {
          recordedDays,
          totalDays: 7,
          percentage: Math.round((recordedDays / 7) * 100),
          status: weeklyStatus,
        };
      },

      /**
       * 오늘 기록 여부 확인
       */
      isRecordedToday: (): boolean => {
        const today = format(new Date(), 'yyyy-MM-dd');
        return get().streakData.lastRecordDate === today;
      },

      /**
       * 스토어 초기화 (테스트용)
       */
      reset: () => {
        set({ streakData: initialState });
      },
    }),
    {
      name: 'girogi-streak-storage', // localStorage key
      version: 1,
    }
  )
);
