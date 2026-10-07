/** @desc 좌측 패널 — 핵심 미션 서랍 (bongchil-diary DrawerCard bare 결: 알약 1열, 누르면 토글) */

'use client';

import type { LucideIcon } from 'lucide-react';
import { Button } from 'bongchil-design-system';
import { MIN_CORE_MISSIONS_FOR_SUCCESS, TOTAL_CORE_MISSIONS } from '@/lib/constants';

export interface MissionItem {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  icon: LucideIcon;
}

interface MissionDrawerProps {
  missions: MissionItem[];
  onToggle: (id: string) => void;
}

export function MissionDrawer({ missions, onToggle }: MissionDrawerProps) {
  const done = missions.filter((m) => m.isCompleted).length;
  const success = done >= MIN_CORE_MISSIONS_FOR_SUCCESS;
  return (
    <div>
      <div className="mb-2 flex items-baseline gap-2 px-1">
        <span className="text-[12.5px] font-semibold text-ink-2">오늘의 핵심 미션</span>
        <span className="text-[11px] tabular-nums text-ink-4">
          {done}/{TOTAL_CORE_MISSIONS}
          {success && <b className="ml-1 text-primary">성공</b>}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {missions.map((m) => (
          <Button key={m.id} variant="grain" size="sm" icon={m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => onToggle(m.id)}>
            {m.title}
          </Button>
        ))}
      </div>
      <p className="mt-2 px-1 text-[10.5px] leading-relaxed text-ink-4">
        {TOTAL_CORE_MISSIONS}개 중 {MIN_CORE_MISSIONS_FOR_SUCCESS}개만 달성하면 오늘 성공. 체크리스트에서 바꿀 수 있어요.
      </p>
    </div>
  );
}
