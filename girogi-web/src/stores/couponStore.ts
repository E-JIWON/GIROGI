/**
 * 쿠폰 시스템 Zustand 스토어
 *
 * 치팅데이, 과자박스 쿠폰 관리
 * localStorage에 자동 저장
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Coupon, CouponType, COUPON_META } from '@/types/coupon';

interface CouponStore {
  // State
  coupons: Coupon[];

  // Actions
  issueCoupon: (type: CouponType) => Coupon;
  useCoupon: (couponId: string, whatAte?: string) => void;
  getUnusedCoupons: (type?: CouponType) => Coupon[];
  getUsedCoupons: (type?: CouponType) => Coupon[];
  getCouponById: (couponId: string) => Coupon | undefined;
  canIssueCheatDayCoupon: (currentStreak: number) => boolean;
  canIssueSnackBoxCoupon: (currentStreak: number) => boolean;

  // Utils
  reset: () => void;
}

const initialState = {
  coupons: [],
};

export const useCouponStore = create<CouponStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * 쿠폰 발급
       * 스트릭 달성 시 자동 발급
       */
      issueCoupon: (type: CouponType): Coupon => {
        const newCoupon: Coupon = {
          id: crypto.randomUUID(),
          type,
          issuedAt: new Date().toISOString(),
          isUsed: false,
        };

        set((state) => ({
          coupons: [...state.coupons, newCoupon],
        }));

        return newCoupon;
      },

      /**
       * 쿠폰 사용
       */
      useCoupon: (couponId: string, whatAte?: string) => {
        set((state) => ({
          coupons: state.coupons.map((coupon) =>
            coupon.id === couponId
              ? {
                  ...coupon,
                  isUsed: true,
                  usedAt: new Date().toISOString(),
                  whatAte,
                }
              : coupon
          ),
        }));
      },

      /**
       * 미사용 쿠폰 조회
       */
      getUnusedCoupons: (type?: CouponType): Coupon[] => {
        return get().coupons.filter(
          (coupon) => !coupon.isUsed && (type ? coupon.type === type : true)
        );
      },

      /**
       * 사용한 쿠폰 조회
       */
      getUsedCoupons: (type?: CouponType): Coupon[] => {
        return get().coupons.filter(
          (coupon) => coupon.isUsed && (type ? coupon.type === type : true)
        );
      },

      /**
       * 쿠폰 ID로 조회
       */
      getCouponById: (couponId: string): Coupon | undefined => {
        return get().coupons.find((coupon) => coupon.id === couponId);
      },

      /**
       * 치팅데이 쿠폰 발급 가능 여부
       * 7일 연속 달성 시 발급 가능
       */
      canIssueCheatDayCoupon: (currentStreak: number): boolean => {
        return currentStreak >= COUPON_META.cheat_day.requiredStreak;
      },

      /**
       * 과자박스 쿠폰 발급 가능 여부
       * 3일 연속 달성 시 발급 가능
       */
      canIssueSnackBoxCoupon: (currentStreak: number): boolean => {
        return currentStreak >= COUPON_META.snack_box.requiredStreak;
      },

      /**
       * 스토어 초기화 (테스트용)
       */
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'girogi-coupon-storage', // localStorage key
      version: 1,
    }
  )
);
