/** @desc 오늘 기록 — 하루 시간 막대(지금 위치) + 아침 · 점심 · 저녁 카드 3장 */

'use client';

import { format } from 'date-fns';
import { Moon, Sun, Sunrise } from 'lucide-react';
import { TodoCheckbox } from 'bongchil-design-system';
import { MealTimeDisplayNames } from '@/types/enums';
import type { MealRecord } from '@/types/models';
import type { MissionItem } from './mission-drawer';

const SLOTS = [
  { n: '아침', I: Sunrise, from: 6, to: 11 },
  { n: '점심', I: Sun, from: 11, to: 16 },
  { n: '저녁', I: Moon, from: 16, to: 24 },
];
const MISSION_T = ['07:30', '12:30', '18:30'];
const slotOf = (h: number) => (h < 11 ? 0 : h < 16 ? 1 : 2);
type Row = { id: string; t: string; label: string; kind: 'mission' | 'meal'; done: boolean };

interface DayBoardProps {
  missions: MissionItem[];
  meals: MealRecord[];
  onToggleMission: (id: string) => void;
  now?: Date;
}

export function DayBoard({ missions, meals, onToggleMission, now = new Date() }: DayBoardProps) {
  const rows: Row[] = [
    ...missions.map((m, i) => ({ id: m.id, t: MISSION_T[i] ?? '12:00', label: m.slot ? m.title.replace(new RegExp(`^${m.slot} `), '') : m.title, kind: 'mission' as const, done: m.isCompleted })),
    ...meals.map((m) => ({ id: m.id, t: format(new Date(m.createdAt), 'HH:mm'), label: `${MealTimeDisplayNames[m.mealTime]} · ${m.menu}`, kind: 'meal' as const, done: true })),
  ].sort((a, b) => a.t.localeCompare(b.t));
  const nowH = now.getHours() + now.getMinutes() / 60;
  const cur = slotOf(now.getHours());
  const p = Math.max(0, Math.min(100, ((nowH - 6) / 18) * 100));
  const doneAll = rows.filter((r) => r.kind === 'mission' && r.done).length;

  return (
    <div>
      <header className="mb-3 flex items-baseline gap-2 px-1">
        <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">오늘 기록</h2>
        <span className="text-xs text-ink-4">미션 {doneAll}/{missions.length} · 식사 {meals.length}</span>
      </header>

      {/* 하루 막대 06 → 24 */}
      <div className="mb-4 px-1">
        <div className="relative h-[3px] rounded-full bg-ink-5/30">
          <span className="absolute inset-y-0 left-0 rounded-full bg-primary/50" style={{ width: `${p}%` }} />
          {[11, 16].map((h) => <span key={h} className="absolute -top-[3px] h-[9px] w-px bg-ink-5" style={{ left: `${((h - 6) / 18) * 100}%` }} />)}
          <span className="absolute -top-[22px] -translate-x-1/2 rounded-full bg-primary px-1.5 py-px font-mono text-[9.5px] text-white" style={{ left: `${p}%` }}>{format(now, 'HH:mm')}</span>
          <span className="absolute -top-[4px] size-[11px] -translate-x-1/2 rounded-full border-2 border-surface bg-primary" style={{ left: `${p}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[9px] text-ink-5"><span>06</span><span>11</span><span>16</span><span>24</span></div>
      </div>

      <div className="grid gap-2 @xl:grid-cols-3">
        {SLOTS.map(({ n, I }, si) => {
          const inSlot = rows.filter((r) => slotOf(Number(r.t.slice(0, 2))) === si);
          const isCur = si === cur, isPast = si < cur;
          return (
            <section key={n} className={`flex flex-col rounded-[14px] border bg-surface p-3 transition-colors ${isCur ? 'border-primary/35' : 'border-border/70'} ${isPast ? 'bg-surface/60' : ''}`} style={isCur ? { boxShadow: '0 0 0 3px var(--color-primary-subtle)' } : undefined}>
              <div className="mb-2 flex items-center gap-2">
                <span className={`grid size-6 place-items-center rounded-full ${isCur ? 'bg-primary text-white' : 'bg-surface-subtle text-ink-4'}`}><I size={12} /></span>
                <span className="text-[12px] font-semibold text-ink-2">{n}</span>
                {isCur && <span className="text-[10px] text-primary">지금</span>}
                <span className="ml-auto text-[10px] tabular-nums text-ink-4">{inSlot.filter((r) => r.done).length}/{inSlot.length || 0}</span>
              </div>
              <ul className="flex-1 space-y-0.5">
                {inSlot.map((r) => (
                  <li key={r.id} className={`flex items-center gap-2 rounded-[8px] px-1 py-1 ${isPast && r.done ? 'opacity-60' : ''}`}>
                    {r.kind === 'mission'
                      ? <TodoCheckbox size={14} done={r.done} onClick={() => onToggleMission(r.id)} />
                      : <span className="grid size-[14px] shrink-0 place-items-center rounded-[4px] bg-comment-sand"><span className="size-1.5 rounded-full bg-comment-sand-solid" /></span>}
                    <span className={`min-w-0 flex-1 truncate text-[11.5px] ${r.kind === 'mission' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.label}</span>
                    <span className="font-mono text-[9.5px] text-ink-5">{r.t}</span>
                  </li>
                ))}
                {!inSlot.length && <li className="px-1 py-1 text-[11px] text-ink-5">{si > cur ? '아직이에요' : '기록 없음'}</li>}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
