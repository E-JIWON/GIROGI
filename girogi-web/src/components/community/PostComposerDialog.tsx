/**
 * PostComposerDialog 컴포넌트
 *
 * 새로운 게시글을 작성하는 다이얼로그
 * - 게시글 타입 선택 (experience, motivation, mealRecord)
 * - 내용 입력
 * - 이미지 추가 버튼 (TODO)
 * - 게시 버튼
 *
 * Flutter: lib/presentation/widgets/community/post_composer_dialog.dart
 */

'use client';

import { useState } from 'react';
import { Edit, X, Send, ImagePlus, Lightbulb, Heart, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PostType } from '@/types/enums';

interface PostComposerDialogProps {
  /**
   * 다이얼로그 표시 여부
   */
  isOpen: boolean;
  /**
   * 닫기 콜백
   */
  onClose: () => void;
}

type ComposerPostType = 'experience' | 'motivation' | 'mealRecord';

const POST_TYPE_CONFIG = {
  experience: {
    label: '경험 공유',
    icon: Lightbulb,
    placeholder: '다이어트 경험을 공유해주세요\n예: 오늘은 외식 유혹을 이겨냈어요!',
  },
  motivation: {
    label: '동기부여',
    icon: Heart,
    placeholder: '동기부여가 되는 말을 남겨주세요\n예: 작은 성공이 모여 큰 변화를 만듭니다',
  },
  mealRecord: {
    label: '식사 기록',
    icon: UtensilsCrossed,
    placeholder: '오늘의 식사를 기록해주세요\n예: 집밥으로 건강하게 먹었어요',
  },
} as const;

export function PostComposerDialog({ isOpen, onClose }: PostComposerDialogProps) {
  const [selectedType, setSelectedType] = useState<ComposerPostType>('experience');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handlePublish = () => {
    if (!content.trim()) {
      setError('내용을 입력해주세요');
      return;
    }

    // TODO: Repository에 게시글 저장
    console.log({ type: selectedType, content });

    // 초기화 및 닫기
    setContent('');
    setSelectedType('experience');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* 다이얼로그 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-h-[85vh] overflow-y-auto p-6">
            {/* 헤더 */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Edit className="h-7 w-7 text-primary" />
                <h2 className="text-xl font-bold text-grey-900">글쓰기</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-grey-100"
              >
                <X className="h-6 w-6 text-grey-600" />
              </button>
            </div>

            {/* 게시글 타입 선택 */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-grey-900">
                게시글 타입
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(POST_TYPE_CONFIG).map(([type, config]) => {
                  const Icon = config.icon;
                  const isSelected = selectedType === type;

                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type as ComposerPostType)}
                      className={cn(
                        'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{config.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 내용 입력 */}
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold text-grey-900">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setError('');
                }}
                placeholder={POST_TYPE_CONFIG[selectedType].placeholder}
                className={cn(
                  'w-full rounded-lg border p-3 text-base',
                  error
                    ? 'border-error focus:border-error'
                    : 'border-grey-300 focus:border-primary'
                )}
                rows={5}
              />
              {error && <p className="mt-1 text-xs text-error">{error}</p>}
            </div>

            {/* 이미지 추가 버튼 */}
            <button
              onClick={() => {
                // TODO: 이미지 선택 기능
                console.log('이미지 추가 (TODO)');
              }}
              className="mb-6 flex items-center gap-2 rounded-lg border-2 border-grey-300 px-4 py-2 text-sm font-medium text-grey-700 transition-all hover:border-primary hover:text-primary"
            >
              <ImagePlus className="h-5 w-5" />
              이미지 추가
            </button>

            {/* 게시 버튼 */}
            <button
              onClick={handlePublish}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-white transition-all hover:bg-primary/90"
            >
              <Send className="h-5 w-5" />
              게시하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
