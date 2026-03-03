/** @desc 감정별 맞춤 대안 행동 제안 */

'use client';

import { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmotionType, EmotionTypeDisplayNames } from '@/types/enums';
import { ALTERNATIVE_ACTIONS, EMOTION_ENCOURAGEMENT } from '@/lib/constants';

interface AlternativeActionsProps {
  emotion: EmotionType;
  onSelectAction?: (actionId: string) => void;
}

export function AlternativeActions({
  emotion,
  onSelectAction,
}: AlternativeActionsProps) {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const actions = ALTERNATIVE_ACTIONS[emotion];
  const encouragement = EMOTION_ENCOURAGEMENT[emotion];

  const handleSelect = (actionId: string) => {
    setSelectedActionId(actionId);
    onSelectAction?.(actionId);
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-temptation" />
        <h3 className="text-base font-semibold text-neutral-900">
          대신 이걸 해봐요
        </h3>
      </div>

      {/* 감정별 격려 메시지 */}
      <p className="mb-4 rounded-lg bg-temptation/5 px-3 py-2 text-sm text-temptation">
        {encouragement}
      </p>

      <div className="flex flex-col gap-2">
        {actions.map((action) => {
          const isSelected = selectedActionId === action.id;
          return (
            <button
              key={action.id}
              onClick={() => handleSelect(action.id)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all',
                isSelected
                  ? 'bg-success/10 ring-2 ring-success'
                  : 'bg-neutral-50 hover:bg-neutral-100'
              )}
            >
              <span className="text-xl">{action.icon}</span>
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    'text-sm font-medium',
                    isSelected ? 'text-success-800' : 'text-neutral-800'
                  )}
                >
                  {action.title}
                </div>
                <div className="text-xs text-neutral-500">{action.description}</div>
              </div>
              {isSelected && (
                <Check className="h-5 w-5 shrink-0 text-success" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
