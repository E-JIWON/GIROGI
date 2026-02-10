/**
 * 뱃지 컬렉션 컴포넌트
 *
 * 전체 뱃지 목록 표시
 * 카테고리별 필터링
 * 획득 통계
 */

'use client';

import { useState } from 'react';
import { BadgeItem } from './badge-item';
import { BADGES, BADGE_CATEGORY_META } from '@/lib/constants/badges';
import { BadgeCategory } from '@/types/badge';
import { useBadgeStore } from '@/stores/badgeStore';
import { cn } from '@/lib/utils';

type FilterCategory = 'all' | BadgeCategory;

export function BadgeCollection() {
  const { userBadges, getTotalBadgeTypes, getTotalBadgeCount } = useBadgeStore();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');

  // 필터링된 뱃지
  const filteredBadges =
    selectedCategory === 'all'
      ? BADGES
      : BADGES.filter((badge) => badge.category === selectedCategory);

  // 획득 통계
  const totalTypes = getTotalBadgeTypes();
  const totalCount = getTotalBadgeCount();
  const collectionRate = Math.round((totalTypes / BADGES.length) * 100);

  // 카테고리 옵션
  const categories: { value: FilterCategory; label: string; emoji: string }[] = [
    { value: 'all', label: '전체', emoji: '🎯' },
    {
      value: 'protein',
      label: BADGE_CATEGORY_META.protein.name,
      emoji: BADGE_CATEGORY_META.protein.emoji,
    },
    {
      value: 'vegetable',
      label: BADGE_CATEGORY_META.vegetable.name,
      emoji: BADGE_CATEGORY_META.vegetable.emoji,
    },
    {
      value: 'carb',
      label: BADGE_CATEGORY_META.carb.name,
      emoji: BADGE_CATEGORY_META.carb.emoji,
    },
    {
      value: 'dish',
      label: BADGE_CATEGORY_META.dish.name,
      emoji: BADGE_CATEGORY_META.dish.emoji,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 통계 */}
      <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-primary-50 to-blue-50 p-6">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold text-neutral-700">뱃지 컬렉션</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{totalTypes}</p>
            <p className="text-xs text-neutral-600">종류</p>
          </div>
          <div className="text-center border-x border-neutral-200">
            <p className="text-2xl font-bold text-primary-600">{totalCount}</p>
            <p className="text-xs text-neutral-600">총 개수</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{collectionRate}%</p>
            <p className="text-xs text-neutral-600">수집률</p>
          </div>
        </div>

        {/* 진행 바 */}
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-blue-500 transition-all duration-500"
              style={{ width: `${collectionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(({ value, label, emoji }) => {
          const isSelected = selectedCategory === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedCategory(value)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all',
                isSelected
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              )}
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* 뱃지 그리드 */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {filteredBadges.map((badge) => {
          const userBadge = userBadges.find((ub) => ub.badgeId === badge.id);

          return <BadgeItem key={badge.id} badge={badge} userBadge={userBadge} />;
        })}
      </div>

      {/* 빈 상태 */}
      {filteredBadges.length === 0 && (
        <div className="py-12 text-center text-neutral-500">
          <p>해당 카테고리에 뱃지가 없습니다.</p>
        </div>
      )}

      {/* 격려 메시지 */}
      {totalTypes === 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
          <p className="text-sm text-blue-700">
            식사를 기록하고 첫 뱃지를 획득해보세요! 🎯
          </p>
        </div>
      )}

      {collectionRate === 100 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
          <p className="text-sm text-yellow-700">
            🎉 축하합니다! 모든 뱃지를 수집했어요!
          </p>
        </div>
      )}
    </div>
  );
}
