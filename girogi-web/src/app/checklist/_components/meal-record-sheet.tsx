/**
 * 식사 기록 Sheet 컴포넌트
 *
 * 우측에서 슬라이드 인
 * 전체 입력 플로우 관리
 * - Step 1: 장소 선택
 * - Step 2: 메뉴 태그 선택
 * - Step 3: 만족도 + 한줄평
 * - Step 4: 뱃지 획득 알림
 */

'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MealPlaceSelector } from './meal-place-selector';
import { MealTagSelector } from './meal-tag-selector';
import { MealRating } from './meal-rating';
import { MealCommentInput } from './meal-comment-input';
import { BadgeNotification } from '@/components/shared/badge-notification';
import { MealPlace, MealTime } from '@/types/enums';
import { MealRecord } from '@/types/models';
import { Badge } from '@/types/badge';
import { parseBadgesFromTags } from '@/lib/utils/badge-parser';
import { getBadgesByIds } from '@/lib/constants/badges';
import { useBadgeStore } from '@/stores/badgeStore';
import { useStreakStore } from '@/stores/streakStore';
import { cn } from '@/lib/utils';

export interface MealRecordSheetProps {
  isOpen: boolean;
  mealTime: MealTime;
  onClose: () => void;
  onSave: (record: Partial<MealRecord>) => void;
}

const MEAL_TIME_LABELS: Record<MealTime, string> = {
  [MealTime.BREAKFAST]: '아침',
  [MealTime.LUNCH]: '점심',
  [MealTime.DINNER]: '저녁',
  [MealTime.SNACK]: '간식',
};

export function MealRecordSheet({ isOpen, mealTime, onClose, onSave }: MealRecordSheetProps) {
  const badgeStore = useBadgeStore();
  const streakStore = useStreakStore();

  // Form 상태
  const [selectedPlace, setSelectedPlace] = useState<MealPlace | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  // Step 관리
  const [currentStep, setCurrentStep] = useState<'place' | 'tags' | 'rating'>('place');

  // 뱃지 알림 상태
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [acquiredBadges, setAcquiredBadges] = useState<Badge[]>([]);

  // 저장 가능 여부
  const canSave = selectedPlace !== null && selectedTags.length > 0;

  // Sheet 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedPlace(null);
      setSelectedTags([]);
      setRating(null);
      setComment('');
      setCurrentStep('place');
    }
  }, [isOpen]);

  // Step 자동 진행
  useEffect(() => {
    if (selectedPlace !== null && currentStep === 'place') {
      setCurrentStep('tags');
    }
  }, [selectedPlace, currentStep]);

  const handleSave = () => {
    if (!canSave) return;

    // 메뉴 문자열 생성
    const menu = selectedTags.join(', ');

    // 뱃지 파싱
    const badgeIds = parseBadgesFromTags(selectedTags);

    // 뱃지 추가
    badgeStore.addBadges(badgeIds);

    // 스트릭 기록
    streakStore.recordToday();

    // MealRecord 생성
    const record: Partial<MealRecord> = {
      mealTime,
      place: selectedPlace!,
      menu,
      badges: badgeIds,
      rating: rating || undefined,
      comment: comment || undefined,
      achievements: [],
      isPublic: false,
      createdAt: new Date().toISOString(),
      reactions: [],
      comments: [],
    };

    // 저장 콜백 호출
    onSave(record);

    // Sheet 닫기
    onClose();

    // 뱃지 알림 표시
    if (badgeIds.length > 0) {
      const badges = getBadgesByIds(badgeIds);
      setAcquiredBadges(badges);
      setShowBadgeNotification(true);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sheet */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-700">
            🍽️ {MEAL_TIME_LABELS[mealTime]} 기록
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="h-[calc(100%-140px)] overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Step 1: 장소 선택 */}
            {currentStep === 'place' && (
              <MealPlaceSelector selectedPlace={selectedPlace} onSelect={setSelectedPlace} />
            )}

            {/* Step 2: 태그 선택 */}
            {currentStep === 'tags' && (
              <>
                <MealPlaceSelector selectedPlace={selectedPlace} onSelect={setSelectedPlace} />
                <div className="border-t border-neutral-200 pt-6">
                  <MealTagSelector selectedTags={selectedTags} onTagsChange={setSelectedTags} />
                </div>
              </>
            )}

            {/* Step 3: 만족도 + 한줄평 */}
            {currentStep === 'rating' && (
              <>
                <MealPlaceSelector selectedPlace={selectedPlace} onSelect={setSelectedPlace} />
                <div className="border-t border-neutral-200 pt-6">
                  <MealTagSelector selectedTags={selectedTags} onTagsChange={setSelectedTags} />
                </div>
                <div className="border-t border-neutral-200 pt-6">
                  <MealRating rating={rating} onRatingChange={setRating} />
                </div>
                <div className="border-t border-neutral-200 pt-6">
                  <MealCommentInput comment={comment} onCommentChange={setComment} />
                </div>
              </>
            )}

          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-6 py-4">
          {currentStep === 'tags' && canSave && (
            <button
              type="button"
              onClick={() => setCurrentStep('rating')}
              className="w-full rounded-lg bg-primary-500 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600"
            >
              다음
            </button>
          )}

          {currentStep === 'rating' && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-lg border-2 border-neutral-300 py-3 text-base font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                나중에
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-lg bg-primary-500 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600"
              >
                저장
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 뱃지 획득 알림 */}
      {showBadgeNotification && (
        <BadgeNotification
          badges={acquiredBadges}
          onClose={() => setShowBadgeNotification(false)}
        />
      )}
    </>
  );
}
