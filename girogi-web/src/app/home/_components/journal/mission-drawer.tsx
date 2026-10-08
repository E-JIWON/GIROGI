/** @desc 좌측 패널 — 핵심 미션: 성공선 + 시간대 + 체크 알약 */

'use client';

import { Check, type LucideIcon } from 'lucide-react';
import { Button } from 'bongchil-design-system';
import { MIN_CORE_MISSIONS_FOR_SUCCESS, TOTAL_CORE_MISSIONS } from '@/lib/constants';

export interface MissionItem {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  icon: LucideIcon;
  /** 시간대 라벨 (아침 · 점심 · 저녁) */
  slot?: string;
}

interface MissionDrawerProps {
  missions: MissionItem[];
  onToggle: (id: string) => void;
}

export function MissionDrawer({ missions, onToggle }: MissionDrawerProps) {
  const done = missions.filter((m) => m.isCompleted).length;
  const ok = done >= MIN_CORE_MISSIONS_FOR_SUCCESS;
  const linePct = (MIN_CORE_MISSIONS_FOR_SUCCESS / TOTAL_CORE_MISSIONS) * 100;
  return (
    <div>
      <div className="mb-3 px-1">
        <div className="mb-1.5 flex items-baseline gap-2">
          <span className="text-[12.5px] font-semibold text-ink-2">{ok ? '오늘 성공' : '핵심 미션'}</span>
          <span className="text-[11px] tabular-nums text-ink-4">{done}/{TOTAL_CORE_MISSIONS}{!ok && ` · ${MIN_CORE_MISSIONS_FOR_SUCCESS - done}개 더`}</span>
        </div>
        <div className="relative grid gap-1" style={{ gridTemplateColumns: `repeat(${TOTAL_CORE_MISSIONS}, 1fr)` }}>
          {Array.from({ length: TOTAL_CORE_MISSIONS }).map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-colors ${i < done ? 'bg-primary' : 'bg-ink-5/40'}`} />)}
          <span className="absolute -top-1 h-3.5 w-px bg-primary/60" style={{ left: `${linePct}%` }} aria-label="성공선" />
        </div>
      </div>
      <div className="grid gap-1.5">
        {missions.map((m) => (
          <div key={m.id} className="flex items-center gap-2">
            {m.slot && <span className={`w-7 shrink-0 text-[10px] ${m.isCompleted ? 'text-primary' : 'text-ink-4'}`}>{m.slot}</span>}
            <Button variant="grain" size="sm" icon={m.isCompleted ? Check : m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => onToggle(m.id)} className="min-w-0 flex-1 justify-start">
              <span className={`truncate ${m.isCompleted ? 'line-through opacity-70' : ''}`}>{m.slot ? m.title.replace(new RegExp(`^${m.slot} `), '') : m.title}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
