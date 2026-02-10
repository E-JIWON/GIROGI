/**
 * 쿠폰 리스트 컴포넌트
 *
 * 전체 쿠폰 목록 표시
 * 필터링 (전체, 사용 가능, 사용 완료)
 * 통계
 */

'use client';

import { useState } from 'react';
import { CouponCard } from './coupon-card';
import { useCouponStore } from '@/stores/couponStore';
import { cn } from '@/lib/utils';
import { Gift, Ticket, CheckCircle2 } from 'lucide-react';

type FilterType = 'all' | 'available' | 'used';

export interface CouponListProps {
  onUseCoupon: (couponId: string) => void;
}

export function CouponList({ onUseCoupon }: CouponListProps) {
  const { coupons } = useCouponStore();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  // 통계
  const totalCoupons = coupons.length;
  const availableCoupons = coupons.filter((c) => !c.isUsed).length;
  const usedCoupons = coupons.filter((c) => c.isUsed).length;

  // 필터링
  const filteredCoupons = coupons.filter((coupon) => {
    if (selectedFilter === 'available') return !coupon.isUsed;
    if (selectedFilter === 'used') return coupon.isUsed;
    return true;
  });

  // 정렬 (미사용 → 사용 완료 순, 최신순)
  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    // 미사용이 먼저
    if (!a.isUsed && b.isUsed) return -1;
    if (a.isUsed && !b.isUsed) return 1;

    // 같은 상태면 최신순
    return new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime();
  });

  // 필터 옵션
  const filters: { value: FilterType; label: string; icon: typeof Gift }[] = [
    { value: 'all', label: '전체', icon: Gift },
    { value: 'available', label: '사용 가능', icon: Ticket },
    { value: 'used', label: '사용 완료', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6">
      {/* 통계 */}
      <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="mb-4 text-center">
          <Gift className="mx-auto mb-2 h-8 w-8 text-purple-600" />
          <h3 className="text-lg font-semibold text-neutral-700">보상 쿠폰</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{availableCoupons}</p>
            <p className="text-xs text-neutral-600">사용 가능</p>
          </div>
          <div className="border-x border-neutral-200 text-center">
            <p className="text-2xl font-bold text-purple-600">{usedCoupons}</p>
            <p className="text-xs text-neutral-600">사용 완료</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{totalCoupons}</p>
            <p className="text-xs text-neutral-600">전체</p>
          </div>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map(({ value, label, icon: Icon }) => {
          const isSelected = selectedFilter === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedFilter(value)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all',
                isSelected
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* 쿠폰 리스트 */}
      <div className="space-y-4">
        {sortedCoupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} onUseTap={onUseCoupon} />
        ))}
      </div>

      {/* 빈 상태 */}
      {sortedCoupons.length === 0 && (
        <div className="py-12 text-center text-neutral-500">
          <p>해당하는 쿠폰이 없습니다.</p>
        </div>
      )}

      {/* 격려 메시지 */}
      {totalCoupons === 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
          <p className="text-sm text-blue-700">
            연속 기록하고 보상 쿠폰을 받아보세요! 🎁
          </p>
          <p className="mt-1 text-xs text-blue-600">
            3일 연속: 과자박스 · 7일 연속: 치팅데이
          </p>
        </div>
      )}

      {availableCoupons > 0 && (
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-center">
          <p className="text-sm text-purple-700">
            🎉 사용 가능한 쿠폰이 {availableCoupons}개 있어요!
          </p>
        </div>
      )}
    </div>
  );
}
