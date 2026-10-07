/** @desc 본문 — 오늘 기록 리스트 (bongchil-diary RecordList 결): 미션 체크 + 식사 기록 한 묶음 */

'use client';

import { Camera } from 'lucide-react';
import { format } from 'date-fns';
import { TodoCheckbox } from 'bongchil-design-system';
import { WidgetCard } from '@/components/common/widget-card';
import { MealPlaceDisplayNames, MealTimeDisplayNames } from '@/types/enums';
import type { MealRecord } from '@/types/models';
import type { MissionItem } from './mission-drawer';

interface RecordListProps {
  missions: MissionItem[];
  meals: MealRecord[];
  onToggleMission: (id: string) => void;
}

export function RecordList({ missions, meals, onToggleMission }: RecordListProps) {
  const done = missions.filter((m) => m.isCompleted).length;
  return (
    <div>
      <header className="mb-2 flex items-baseline gap-2 px-1">
        <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">기록</h2>
        <span className="text-xs text-ink-4">오늘 {done + meals.length}건</span>
      </header>
      <WidgetCard noPadding className="divide-y divide-border/60">
        {missions.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onToggleMission(m.id)}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-surface-subtle/60"
          >
            <TodoCheckbox size={16} done={m.isCompleted} readOnly />
            <span className="min-w-0 flex-1">
              <span className={`block text-[12.5px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span>
              <span className="block text-[10.5px] text-ink-4">{m.description}</span>
            </span>
            <span className="shrink-0 text-[10px] text-ink-4">미션</span>
          </button>
        ))}
        {meals.map((m) => (
          <div key={m.id} className="flex items-center gap-3 px-4 py-2.5">
            <span className="grid size-4 place-items-center text-ink-4"><Camera size={13} /></span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink-2">
              {MealTimeDisplayNames[m.mealTime]} · {m.menu}
              <span className="ml-1.5 text-ink-4">{MealPlaceDisplayNames[m.place]}</span>
            </span>
            <span className="shrink-0 font-mono text-[10px] text-ink-4">{format(new Date(m.createdAt), 'HH:mm')}</span>
          </div>
        ))}
        {meals.length === 0 && (
          <div className="px-4 py-3 text-[12px] text-ink-4">아직 식사 기록이 없어요. 하단 독의 + 식사로 적어보세요.</div>
        )}
      </WidgetCard>
    </div>
  );
}
