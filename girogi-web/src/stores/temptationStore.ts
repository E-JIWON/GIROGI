/**
 * 유혹 극복 Zustand 스토어
 *
 * 감정 기록, 성공/실패, 월별 통계 관리
 * localStorage에 자동 저장
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmotionType } from '@/types/enums';
import type { TemptationRecord } from '@/types/models';

interface TemptationStats {
  totalAttempts: number;
  successCount: number;
  successRate: number;
  emotionCounts: Record<EmotionType, number>;
  /** 이번 달 감정별 횟수 */
  monthlyEmotionCounts: Record<EmotionType, number>;
}

interface TemptationStore {
  // State
  records: TemptationRecord[];

  // Actions
  addRecord: (record: Omit<TemptationRecord, 'id' | 'recordedAt'>) => void;
  getStats: () => TemptationStats;
  getMonthlyCount: (emotion: EmotionType) => number;

  // Utils
  reset: () => void;
}

function isCurrentMonth(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

const emptyEmotionCounts = (): Record<EmotionType, number> => ({
  [EmotionType.HUNGRY]: 0,
  [EmotionType.STRESS]: 0,
  [EmotionType.BOREDOM]: 0,
  [EmotionType.HABITUAL]: 0,
  [EmotionType.REWARD_SEEKING]: 0,
});

export const useTemptationStore = create<TemptationStore>()(
  persist(
    (set, get) => ({
      records: [],

      addRecord: (record) => {
        const newRecord: TemptationRecord = {
          ...record,
          id: crypto.randomUUID(),
          recordedAt: new Date().toISOString(),
        };
        set((state) => ({
          records: [...state.records, newRecord],
        }));
      },

      getStats: (): TemptationStats => {
        const { records } = get();
        const totalAttempts = records.length;
        const successCount = records.filter((r) => r.succeeded).length;
        const successRate = totalAttempts > 0 ? Math.round((successCount / totalAttempts) * 100) : 0;

        const emotionCounts = emptyEmotionCounts();
        const monthlyEmotionCounts = emptyEmotionCounts();

        for (const record of records) {
          emotionCounts[record.emotion]++;
          if (isCurrentMonth(record.recordedAt)) {
            monthlyEmotionCounts[record.emotion]++;
          }
        }

        return {
          totalAttempts,
          successCount,
          successRate,
          emotionCounts,
          monthlyEmotionCounts,
        };
      },

      getMonthlyCount: (emotion: EmotionType): number => {
        const { records } = get();
        return records.filter(
          (r) => r.emotion === emotion && isCurrentMonth(r.recordedAt)
        ).length;
      },

      reset: () => {
        set({ records: [] });
      },
    }),
    {
      name: 'girogi-temptation-storage',
      version: 1,
    }
  )
);
