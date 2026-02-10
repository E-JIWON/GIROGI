/**
 * 업적 시스템 Zustand 스토어
 *
 * 업적 달성 관리
 * localStorage에 자동 저장
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserAchievement } from '@/types/achievement';
import { ACHIEVEMENTS, getAchievementById } from '@/lib/constants/achievements';
import { useBadgeStore } from './badgeStore';
import { useStreakStore } from './streakStore';

interface AchievementStore {
  // State
  userAchievements: UserAchievement[];

  // Actions
  checkAchievements: () => UserAchievement[]; // 새로 달성한 업적 반환
  unlockAchievement: (achievementId: string) => void;
  markAsRead: (achievementId: string) => void;
  getUnreadAchievements: () => UserAchievement[];
  hasAchievement: (achievementId: string) => boolean;

  // Utils
  reset: () => void;
}

const initialState = {
  userAchievements: [],
};

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * 업적 달성 체크
       * 새로 달성한 업적 리스트 반환
       */
      checkAchievements: (): UserAchievement[] => {
        const badgeStore = useBadgeStore.getState();
        const streakStore = useStreakStore.getState();

        const newAchievements: UserAchievement[] = [];

        ACHIEVEMENTS.forEach((achievement) => {
          // 이미 획득한 업적은 스킵
          if (get().hasAchievement(achievement.id)) {
            return;
          }

          let achieved = false;

          switch (achievement.condition.type) {
            case 'badge_count':
              if (achievement.condition.badgeId) {
                const count = badgeStore.getBadgeCount(achievement.condition.badgeId);
                achieved = count >= achievement.condition.targetCount;
              }
              break;

            case 'streak':
              achieved =
                streakStore.streakData.currentStreak >= achievement.condition.targetCount;
              break;

            case 'total_days':
              achieved =
                streakStore.streakData.totalDays >= achievement.condition.targetCount;
              break;

            case 'custom':
              // 커스텀 조건은 나중에 구현 (Phase 2)
              // 예: 생선 뱃지 합산, 고기 없이 7일 등
              break;
          }

          if (achieved) {
            const userAchievement: UserAchievement = {
              achievementId: achievement.id,
              unlockedAt: new Date().toISOString(),
              isNew: true,
            };
            newAchievements.push(userAchievement);
            get().unlockAchievement(achievement.id);
          }
        });

        return newAchievements;
      },

      /**
       * 업적 잠금 해제
       */
      unlockAchievement: (achievementId: string) => {
        const achievement = getAchievementById(achievementId);
        if (!achievement) {
          console.warn(`Achievement not found: ${achievementId}`);
          return;
        }

        // 이미 있으면 무시
        if (get().hasAchievement(achievementId)) {
          return;
        }

        const newAchievement: UserAchievement = {
          achievementId,
          unlockedAt: new Date().toISOString(),
          isNew: true,
        };

        set((state) => ({
          userAchievements: [...state.userAchievements, newAchievement],
        }));
      },

      /**
       * 업적 알림 읽음 처리
       */
      markAsRead: (achievementId: string) => {
        set((state) => ({
          userAchievements: state.userAchievements.map((ua) =>
            ua.achievementId === achievementId ? { ...ua, isNew: false } : ua
          ),
        }));
      },

      /**
       * 읽지 않은 업적 조회
       */
      getUnreadAchievements: (): UserAchievement[] => {
        return get().userAchievements.filter((ua) => ua.isNew);
      },

      /**
       * 업적 보유 여부
       */
      hasAchievement: (achievementId: string): boolean => {
        return get().userAchievements.some((ua) => ua.achievementId === achievementId);
      },

      /**
       * 스토어 초기화 (테스트용)
       */
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'girogi-achievement-storage', // localStorage key
      version: 1,
    }
  )
);
