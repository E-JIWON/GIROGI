/**
 * 뱃지 시스템 Zustand 스토어
 *
 * 사용자가 획득한 뱃지 관리
 * localStorage에 자동 저장
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserBadge } from '@/types/badge';
import { getBadgeById } from '@/lib/constants/badges';

interface BadgeStore {
  // State
  userBadges: UserBadge[];

  // Actions
  addBadge: (badgeId: string) => void;
  addBadges: (badgeIds: string[]) => void;
  getBadgeCount: (badgeId: string) => number;
  getTopBadges: (limit: number) => UserBadge[];
  getTotalBadgeTypes: () => number;
  getTotalBadgeCount: () => number;
  hasBadge: (badgeId: string) => boolean;

  // Utils
  reset: () => void;
}

const initialState = {
  userBadges: [],
};

export const useBadgeStore = create<BadgeStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * 뱃지 추가 (1개)
       * 기존에 있으면 count +1, 없으면 신규 생성
       */
      addBadge: (badgeId: string) => {
        const badge = getBadgeById(badgeId);
        if (!badge) {
          console.warn(`Badge not found: ${badgeId}`);
          return;
        }

        set((state) => {
          const existingBadge = state.userBadges.find(
            (ub) => ub.badgeId === badgeId
          );

          const now = new Date().toISOString();

          if (existingBadge) {
            // 기존 뱃지 count +1
            return {
              userBadges: state.userBadges.map((ub) =>
                ub.badgeId === badgeId
                  ? {
                      ...ub,
                      count: ub.count + 1,
                      lastAcquired: now,
                    }
                  : ub
              ),
            };
          } else {
            // 신규 뱃지 생성
            const newBadge: UserBadge = {
              badgeId,
              count: 1,
              firstAcquired: now,
              lastAcquired: now,
            };
            return {
              userBadges: [...state.userBadges, newBadge],
            };
          }
        });
      },

      /**
       * 뱃지 여러 개 추가
       * 식사 기록 시 여러 뱃지를 한 번에 추가
       */
      addBadges: (badgeIds: string[]) => {
        badgeIds.forEach((badgeId) => {
          get().addBadge(badgeId);
        });
      },

      /**
       * 특정 뱃지 획득 횟수 조회
       */
      getBadgeCount: (badgeId: string): number => {
        const userBadge = get().userBadges.find((ub) => ub.badgeId === badgeId);
        return userBadge?.count || 0;
      },

      /**
       * 상위 N개 뱃지 조회 (count 기준 정렬)
       */
      getTopBadges: (limit: number): UserBadge[] => {
        return [...get().userBadges]
          .sort((a, b) => b.count - a.count)
          .slice(0, limit);
      },

      /**
       * 획득한 뱃지 종류 수
       */
      getTotalBadgeTypes: (): number => {
        return get().userBadges.length;
      },

      /**
       * 획득한 뱃지 총 개수
       */
      getTotalBadgeCount: (): number => {
        return get().userBadges.reduce((sum, ub) => sum + ub.count, 0);
      },

      /**
       * 뱃지 보유 여부
       */
      hasBadge: (badgeId: string): boolean => {
        return get().userBadges.some((ub) => ub.badgeId === badgeId);
      },

      /**
       * 스토어 초기화 (테스트용)
       */
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'girogi-badge-storage', // localStorage key
      version: 1,
    }
  )
);
