/**
 * 식사 태그 선택 컴포넌트
 *
 * 자주 먹는 태그 + 직접 입력
 * 선택한 태그는 primary 배경
 */

'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MealTagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

// 기본 태그 (자주 먹는 음식)
const DEFAULT_TAGS = [
  '제육볶음',
  '샐러드',
  '된장찌개',
  '비빔밥',
  '닭가슴살',
  '계란',
  '고등어',
  '현미밥',
  '김치찌개',
  '불고기',
];

export function MealTagSelector({ selectedTags, onTagsChange }: MealTagSelectorProps) {
  const [isCustomInputOpen, setIsCustomInputOpen] = useState(false);
  const [customTagInput, setCustomTagInput] = useState('');

  const handleToggleTag = (tag: string) => {
    // 햅틱 피드백
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    if (selectedTags.includes(tag)) {
      // 제거
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      // 추가
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    const trimmed = customTagInput.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      onTagsChange([...selectedTags, trimmed]);
      setCustomTagInput('');
      setIsCustomInputOpen(false);

      // 햅틱 피드백
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-neutral-700">뭐 드셨어요?</h3>

      {/* 선택된 태그 표시 */}
      {selectedTags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 rounded-full bg-primary-500 px-3 py-1 text-sm text-white"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="rounded-full hover:bg-primary-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 기본 태그 */}
      <div className="mb-3 flex flex-wrap gap-2">
        {DEFAULT_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleToggleTag(tag)}
              className={cn(
                'rounded-full border-2 px-4 py-2 text-sm font-medium transition-all',
                isSelected
                  ? 'scale-105 border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* 직접 입력 */}
      {!isCustomInputOpen ? (
        <button
          type="button"
          onClick={() => setIsCustomInputOpen(true)}
          className="flex items-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
        >
          <Plus className="h-4 w-4" />
          <span>직접 입력</span>
        </button>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={customTagInput}
            onChange={(e) => setCustomTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddCustomTag();
              } else if (e.key === 'Escape') {
                setIsCustomInputOpen(false);
                setCustomTagInput('');
              }
            }}
            placeholder="메뉴 이름 입력"
            autoFocus
            className="flex-1 rounded-lg border-2 border-primary-300 px-4 py-2 text-sm outline-none focus:border-primary-500"
          />
          <button
            type="button"
            onClick={handleAddCustomTag}
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          >
            추가
          </button>
          <button
            type="button"
            onClick={() => {
              setIsCustomInputOpen(false);
              setCustomTagInput('');
            }}
            className="rounded-lg border-2 border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
}
