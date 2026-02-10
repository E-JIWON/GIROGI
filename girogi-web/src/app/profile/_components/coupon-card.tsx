/**
 * 쿠폰 카드 컴포넌트
 *
 * 개별 쿠폰 표시
 * - 치팅데이 쿠폰 (빨강 그라데이션)
 * - 과자박스 쿠폰 (주황 그라데이션)
 * 사용/미사용 상태
 */

'use client';

import { Coupon, CouponType } from '@/types/coupon';
import { cn } from '@/lib/utils';
import { Gift, Candy, Calendar, Check } from 'lucide-react';

export interface CouponCardProps {
  coupon: Coupon;
  onUseTap: (couponId: string) => void;
}

export function CouponCard({ coupon, onUseTap }: CouponCardProps) {
  const isUsed = coupon.isUsed;

  // 쿠폰 타입별 메타데이터
  const getCouponMeta = (type: CouponType) => {
    switch (type) {
      case 'cheat_day':
        return {
          icon: Calendar,
          emoji: '🎉',
          name: '치팅데이',
          description: '오늘 하루 자유롭게 먹어도 OK!',
          gradient: 'from-red-400 to-red-600',
          bgGradient: 'from-red-50 to-orange-50',
        };
      case 'snack_box':
        return {
          icon: Candy,
          emoji: '🍬',
          name: '과자박스',
          description: '간식 1개 먹어도 괜찮아요',
          gradient: 'from-orange-400 to-orange-600',
          bgGradient: 'from-orange-50 to-yellow-50',
        };
    }
  };

  const meta = getCouponMeta(coupon.type);
  const Icon = meta.icon;

  // 발급 시각 포맷
  const issuedDate = new Date(coupon.issuedAt).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  // 사용 시각 포맷
  const usedDate = coupon.usedAt
    ? new Date(coupon.usedAt).toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 p-6 transition-all',
        isUsed
          ? 'border-neutral-200 bg-neutral-50 opacity-60'
          : `border-transparent bg-gradient-to-br ${meta.bgGradient} shadow-md`
      )}
    >
      {/* 배경 아이콘 (워터마크) */}
      <div className="absolute right-4 top-4 opacity-10">
        <Icon className="h-24 w-24" strokeWidth={1} />
      </div>

      {/* 헤더 */}
      <div className="relative mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-xl text-3xl',
              isUsed ? 'bg-neutral-100' : `bg-gradient-to-br ${meta.gradient}`
            )}
          >
            {meta.emoji}
          </div>
          <div>
            <h4
              className={cn(
                'text-lg font-bold',
                isUsed ? 'text-neutral-500' : 'text-neutral-800'
              )}
            >
              {meta.name}
            </h4>
            <p className="text-sm text-neutral-600">{meta.description}</p>
          </div>
        </div>

        {/* 사용 완료 배지 */}
        {isUsed && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200">
            <Check className="h-6 w-6 text-neutral-500" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* 발급/사용 정보 */}
      <div className="relative mb-4 space-y-1 text-sm">
        <p className="text-neutral-600">
          <span className="font-medium">발급일:</span> {issuedDate}
        </p>
        {isUsed && usedDate && (
          <>
            <p className="text-neutral-600">
              <span className="font-medium">사용일:</span> {usedDate}
            </p>
            {coupon.whatAte && (
              <p className="text-neutral-700">
                <span className="font-medium">먹은 것:</span> {coupon.whatAte}
              </p>
            )}
          </>
        )}
      </div>

      {/* 사용 버튼 */}
      {!isUsed && (
        <button
          type="button"
          onClick={() => onUseTap(coupon.id)}
          className={cn(
            'relative w-full rounded-xl py-3 font-semibold text-white transition-all',
            `bg-gradient-to-r ${meta.gradient} hover:shadow-lg active:scale-95`
          )}
        >
          <Gift className="mr-2 inline h-5 w-5" />
          쿠폰 사용하기
        </button>
      )}

      {/* 사용 완료 표시 */}
      {isUsed && (
        <div className="relative flex items-center justify-center rounded-xl border-2 border-neutral-300 bg-white py-3">
          <Check className="mr-2 h-5 w-5 text-neutral-500" strokeWidth={2.5} />
          <span className="font-semibold text-neutral-500">사용 완료</span>
        </div>
      )}

      {/* 사용 완료 오버레이 (대각선 줄무늬) */}
      {isUsed && (
        <div className="absolute inset-0 bg-repeat opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)',
        }} />
      )}
    </div>
  );
}
