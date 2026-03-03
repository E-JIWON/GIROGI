/** @desc 감정 체크인 - "왜 먹고 싶으세요?" */

'use client';

import { Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  EmotionType,
  EmotionTypeDisplayNames,
  EmotionTypeIcons,
} from '@/types/enums';

interface EmotionCheckInProps {
  selectedEmotion: EmotionType | null;
  onSelectEmotion: (emotion: EmotionType) => void;
}

const EMOTIONS = Object.values(EmotionType);

export function EmotionCheckIn({
  selectedEmotion,
  onSelectEmotion,
}: EmotionCheckInProps) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-6 w-6 text-temptation" />
        <h3 className="text-base font-semibold text-neutral-900">
          지금 왜 먹고 싶으세요?
        </h3>
      </div>

      <p className="mb-4 text-sm text-neutral-600">
        감정을 인식하는 것만으로 간식 충동이 40% 감소합니다
      </p>

      <div className="flex flex-col gap-2">
        {EMOTIONS.map((emotion) => {
          const isSelected = selectedEmotion === emotion;
          return (
            <button
              key={emotion}
              onClick={() => onSelectEmotion(emotion)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all',
                isSelected
                  ? 'bg-temptation/10 ring-2 ring-temptation'
                  : 'bg-neutral-50 hover:bg-neutral-100'
              )}
            >
              <span className="text-xl">{EmotionTypeIcons[emotion]}</span>
              <span
                className={cn(
                  'text-sm font-medium',
                  isSelected ? 'text-temptation' : 'text-neutral-700'
                )}
              >
                {EmotionTypeDisplayNames[emotion]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
