/** @desc 오늘 끼니 — 가로 시간축. 세 끼는 사진 카드, 간식은 축 위 작은 칩 */

import Link from 'next/link';
import { Camera, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { MealTime, MealTimeDisplayNames } from '@/types/enums';
import type { MealRecord } from '@/types/models';

/* eslint-disable @next/next/no-img-element */
export function MealTimeline({ meals }: { meals: MealRecord[] }) {
  const sorted = [...meals].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const mains = sorted.filter((m) => m.mealTime !== MealTime.SNACK).length;
  return (
    <div>
      <header className="mb-2.5 flex items-baseline gap-2 px-1">
        <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">오늘 끼니</h2>
        <span className="text-xs text-ink-4">{mains}끼{sorted.length > mains && ` · 간식 ${sorted.length - mains}`}</span>
        <span className="ml-1 flex-1 self-center border-t border-dashed border-primary/30" />
        <Link href="/profile" className="text-[11px] font-medium text-ink-4 transition-colors hover:text-primary">타임라인</Link>
      </header>

      <div className="scrollbar-hide -mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex w-max items-end gap-2.5">
          {sorted.map((m) => {
            const t = format(new Date(m.createdAt), 'HH:mm');
            if (m.mealTime === MealTime.SNACK) {
              return (
                <div key={m.id} className="flex w-14 flex-col items-center pb-[3px]" title={m.menu}>
                  <div className="grid size-11 place-items-center overflow-hidden rounded-[12px] border border-border bg-surface">
                    {m.imageUrl ? <img src={m.imageUrl} alt={m.menu} className="h-full w-full object-cover" /> : <span className="px-1 text-center text-[9px] leading-tight text-ink-3">{m.menu.split(',')[0]}</span>}
                  </div>
                  <span className="mt-1.5 h-2 w-px bg-border-strong" />
                  <span className="font-mono text-[9.5px] text-ink-4">{t}</span>
                </div>
              );
            }
            return (
              <div key={m.id} className="flex w-[124px] flex-col items-center">
                <div className="relative h-[148px] w-full overflow-hidden rounded-[14px] bg-surface-subtle" style={{ boxShadow: '0 1px 2px rgb(var(--shadow-ink)/0.06), 0 6px 16px rgb(var(--shadow-ink)/0.06)' }}>
                  {m.imageUrl ? <img src={m.imageUrl} alt={m.menu} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-ink-5"><Camera size={18} /></div>}
                  <span className="absolute left-2 top-2 rounded-full bg-surface/85 px-2 py-0.5 text-[10px] font-medium text-ink-2 backdrop-blur-sm">{MealTimeDisplayNames[m.mealTime]}</span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent px-2.5 pb-2 pt-8">
                    <span className="line-clamp-2 text-[11px] leading-snug text-white">{m.menu}</span>
                  </span>
                </div>
                <span className="mt-1.5 h-2 w-px bg-primary/50" />
                <span className="font-mono text-[10px] text-ink-3">{t}</span>
              </div>
            );
          })}
          <Link href="/checklist" className="group flex w-[88px] flex-col items-center">
            <div className="flex h-[148px] w-full flex-col items-center justify-center gap-1.5 rounded-[14px] border border-dashed border-ink/20 text-ink-4 transition-colors group-hover:border-primary/60 group-hover:text-primary">
              <Plus size={16} />
              <span className="text-[10.5px]">기록</span>
            </div>
            <span className="mt-1.5 h-2 w-px border-l border-dashed border-ink/25" />
            <span className="font-mono text-[10px] text-primary">지금</span>
          </Link>
        </div>
        {/* 시간 축 */}
        <div className="-mt-[19px] mb-[17px] h-px w-full bg-border" aria-hidden />
      </div>
    </div>
  );
}
