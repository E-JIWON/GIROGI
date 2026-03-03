/**
 * 식사 기록 Zustand 스토어
 *
 * 식사 기록의 저장/조회/통계 관리
 * localStorage에 자동 저장
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MealTime, MealPlace } from '@/types/enums';
import type { MealRecord } from '@/types/models';

interface MealRecordStore {
  // State
  records: MealRecord[];

  // Actions
  addRecord: (record: Omit<MealRecord, 'id' | 'createdAt' | 'reactions' | 'comments' | 'isPublic' | 'imageUrl'>) => void;
  getRecordsByDate: (dateStr: string) => MealRecord[];
  hasMealRecord: (dateStr: string, mealTime: MealTime) => boolean;
  getTodayRecords: () => MealRecord[];
  getWeeklyPlaceStats: () => Record<MealPlace, number>;

  // Utils
  reset: () => void;
}

function toDateKey(isoStr: string): string {
  return isoStr.slice(0, 10);
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useMealRecordStore = create<MealRecordStore>()(
  persist(
    (set, get) => ({
      records: [],

      addRecord: (record) => {
        const newRecord: MealRecord = {
          ...record,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          imageUrl: null,
          isPublic: false,
          reactions: [],
          comments: [],
        };
        set((state) => ({
          records: [...state.records, newRecord],
        }));
      },

      getRecordsByDate: (dateStr: string): MealRecord[] => {
        const { records } = get();
        return records.filter((r) => toDateKey(r.createdAt) === dateStr);
      },

      hasMealRecord: (dateStr: string, mealTime: MealTime): boolean => {
        const { records } = get();
        return records.some(
          (r) => toDateKey(r.createdAt) === dateStr && r.mealTime === mealTime
        );
      },

      getTodayRecords: (): MealRecord[] => {
        const { records } = get();
        const today = todayKey();
        return records.filter((r) => toDateKey(r.createdAt) === today);
      },

      getWeeklyPlaceStats: (): Record<MealPlace, number> => {
        const { records } = get();
        const now = new Date();
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = weekAgo.toISOString().slice(0, 10);

        const stats: Record<MealPlace, number> = {
          [MealPlace.HOME]: 0,
          [MealPlace.CAFETERIA]: 0,
          [MealPlace.RESTAURANT]: 0,
          [MealPlace.DELIVERY]: 0,
        };

        for (const record of records) {
          if (toDateKey(record.createdAt) >= weekAgoStr) {
            stats[record.place]++;
          }
        }

        return stats;
      },

      reset: () => {
        set({ records: [] });
      },
    }),
    {
      name: 'girogi-meal-record-storage',
      version: 1,
    }
  )
);
