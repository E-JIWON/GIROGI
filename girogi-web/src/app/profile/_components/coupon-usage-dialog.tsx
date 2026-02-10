/**
 * 쿠폰 사용 다이얼로그
 *
 * 쿠폰 사용 확인 모달
 * - 치팅데이: 오늘 하루 자유롭게 먹기
 * - 과자박스: 간식 1개 허용
 * 사용 시 기록 입력 (무엇을 먹었는지)
 */

'use client';

import { useState, useEffect } from 'react';
import { Coupon, CouponType } from '@/types/coupon';
import { useCouponStore } from '@/stores/couponStore';
import { cn } from '@/lib/utils';
import { X, Gift, Sparkles } from 'lucide-react';

export interface CouponUsageDialogProps {
  isOpen: boolean;
  couponId: string | null;
  onClose: () => void;
}

export function CouponUsageDialog({ isOpen, couponId, onClose }: CouponUsageDialogProps) {
  const { coupons, useCoupon } = useCouponStore();
  const [whatAte, setWhatAte] = useState('');

  // 선택된 쿠폰 찾기
  const selectedCoupon = couponId ? coupons.find((c) => c.id === couponId) : null;

  // 쿠폰 타입별 메타데이터
  const getCouponMeta = (type: CouponType) => {
    switch (type) {
      case 'cheat_day':
        return {
          emoji: '🎉',
          name: '치팅데이',
          description: '오늘 하루 자유롭게 먹어도 OK!',
          gradient: 'from-red-400 to-red-600',
          placeholder: '예: 치킨, 피자, 케이크',
        };
      case 'snack_box':
        return {
          emoji: '🍬',
          name: '과자박스',
          description: '간식 1개 먹어도 괜찮아요',
          gradient: 'from-orange-400 to-orange-600',
          placeholder: '예: 초코파이, 감자칩',
        };
    }
  };

  // 쿠폰이 바뀔 때마다 입력 초기화
  useEffect(() => {
    if (isOpen) {
      setWhatAte('');
    }
  }, [isOpen, couponId]);

  if (!selectedCoupon) return null;

  const meta = getCouponMeta(selectedCoupon.type);

  // 사용 확인
  const handleConfirm = () => {
    if (!whatAte.trim()) {
      alert('무엇을 먹었는지 입력해주세요!');
      return;
    }

    useCoupon(selectedCoupon.id, whatAte.trim());

    // 햅틱 피드백
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10, 50, 10]);
    }

    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl transition-all',
          isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
        )}
      >
        {/* 헤더 */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-xl text-3xl',
                `bg-gradient-to-br ${meta.gradient}`
              )}
            >
              {meta.emoji}
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-800">{meta.name} 사용</h3>
              <p className="text-sm text-neutral-600">{meta.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 입력 필드 */}
        <div className="mb-6">
          <label htmlFor="what-ate" className="mb-2 block text-sm font-medium text-neutral-700">
            무엇을 먹었나요?
          </label>
          <input
            id="what-ate"
            type="text"
            value={whatAte}
            onChange={(e) => setWhatAte(e.target.value)}
            placeholder={meta.placeholder}
            maxLength={50}
            className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 text-base transition-colors focus:border-primary-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-500">{whatAte.length}/50자</p>
        </div>

        {/* 안내 메시지 */}
        <div className="mb-6 rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            <Sparkles className="mr-1 inline h-4 w-4" />
            쿠폰 사용 후에도 Streak은 유지됩니다!
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-neutral-200 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!whatAte.trim()}
            className={cn(
              'flex-1 rounded-xl py-3 font-semibold text-white transition-all',
              whatAte.trim()
                ? `bg-gradient-to-r ${meta.gradient} hover:shadow-lg active:scale-95`
                : 'cursor-not-allowed bg-neutral-300'
            )}
          >
            <Gift className="mr-2 inline h-5 w-5" />
            사용하기
          </button>
        </div>
      </div>
    </>
  );
}
