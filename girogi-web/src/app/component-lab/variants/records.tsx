'use client';

import { useState } from 'react';
import { Camera, ChevronDown, Moon, Plus, Sun, Sunrise } from 'lucide-react';
import { Button, TodoCheckbox } from 'bongchil-design-system';
import { MealPlaceDisplayNames, MealTimeDisplayNames } from '@/types/enums';
import { MEALS, useMissionState, type Variant } from './shared';

const NOW = '19:40';
const time = (iso: string) => new Date(iso).toTimeString().slice(0, 5);
const SLOT_T = ['07:30', '12:30', '18:30'];
const SLOTS = [{ n: '아침', I: Sunrise, from: '00:00' }, { n: '점심', I: Sun, from: '11:00' }, { n: '저녁', I: Moon, from: '16:00' }];
const slotOf = (t: string) => (t < '11:00' ? 0 : t < '16:00' ? 1 : 2);
type Row = { id: string; t: string; label: string; kind: '미션' | '식사'; done: boolean; sub?: string };

function useRows() {
  const s = useMissionState();
  const rows: Row[] = [
    ...s.missions.map((m, i) => ({ id: m.id, t: SLOT_T[i], label: m.title.replace(/^(아침|점심|저녁) /, ''), kind: '미션' as const, done: m.isCompleted })),
    ...MEALS.map((m) => ({ id: m.id, t: time(m.createdAt), label: m.menu, kind: '식사' as const, done: true, sub: `${MealTimeDisplayNames[m.mealTime]} · ${MealPlaceDisplayNames[m.place]}` })),
  ].sort((a, b) => a.t.localeCompare(b.t));
  return { ...s, rows };
}
const Dot = ({ r }: { r: Row }) => <span className={`block size-2 shrink-0 rounded-full ${r.kind === '식사' ? 'bg-comment-sand-solid' : r.done ? 'bg-primary' : 'border-[1.5px] border-dashed border-ink/30 bg-surface'}`} />;
function Line({ r, toggle, dim }: { r: Row; toggle: (id: string) => void; dim?: boolean }) {
  return (
    <div className={`relative flex items-center gap-3 py-1 ${dim ? 'opacity-55' : ''}`}>
      <span className="absolute -left-12 w-8 text-right font-mono text-[10px] text-ink-4">{r.t}</span>
      <span className="absolute -left-[17px]"><Dot r={r} /></span>
      {r.kind === '미션' ? <TodoCheckbox size={14} done={r.done} onClick={() => toggle(r.id)} /> : <span className="size-[14px] shrink-0 rounded-[4px] bg-comment-sand-solid/80" />}
      <span className={`min-w-0 flex-1 truncate text-[12.5px] ${r.kind === '미션' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.label}{r.sub && <span className="ml-1.5 text-ink-4">{r.sub}</span>}</span>
      <span className={`text-[10px] ${r.kind === '식사' ? 'text-comment-sand-solid' : 'text-primary'}`}>{r.kind}</span>
    </div>
  );
}
const NowLine = () => (
  <div className="relative my-1.5 flex items-center gap-2"><span className="absolute -left-12 w-8 text-right font-mono text-[10px] font-medium text-primary">{NOW}</span><span className="absolute -left-[21px] size-3 rounded-full bg-primary ring-4 ring-primary/15" /><span className="h-px flex-1 bg-primary/40" /><span className="text-[10px] text-primary">지금</span></div>
);

export const RECORDS: Variant[] = [
  { key: 'all-now', name: '셋 다 + 지금', why: '시간대 머리 + 세로선·시간 + 색·체크에 "지금" 선. 지난 건 옅게, 앞으로 할 미션은 진하게. 한 리스트.',
    Render: () => { const s = useRows(); return (
      <div className="relative pl-12"><span className="absolute left-[38px] top-2 bottom-2 w-px bg-border" />
        {SLOTS.map(({ n, I }, si) => { const inSlot = s.rows.filter((r) => slotOf(r.t) === si); const nowHere = slotOf(NOW) === si; return (
          <div key={n} className="mb-2"><div className="relative mb-1 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3"><span className="absolute -left-[22px] grid size-4 place-items-center rounded-full bg-surface-warm text-primary"><I size={11} /></span>{n}</div>
            {inSlot.map((r, i) => <div key={r.id}><Line r={r} toggle={s.toggle} dim={r.t < NOW && !(r.kind === '미션' && !r.done)} />{nowHere && r.t < NOW && (inSlot[i + 1]?.t ?? '99') >= NOW && <NowLine />}</div>)}
          </div>
        ); })}
      </div>
    ); } },
  { key: 'cards-now', name: '시간대 카드 · 지금 펼침', recommended: true, why: '시간대마다 카드. 지난 카드는 한 줄 요약으로 접히고(눌러 펼침), 지금 카드만 타임라인 + 지금 선으로 펼쳐진다. 남은 카드는 옅게. 카드 분리 + 셋 다 + 지금.',
    Render: () => { const s = useRows(); const cur = slotOf(NOW); const [open, setOpen] = useState<number[]>([]); return (
      <div className="space-y-2">{SLOTS.map(({ n, I }, si) => { const inSlot = s.rows.filter((r) => slotOf(r.t) === si); const past = si < cur, future = si > cur, expanded = si === cur || open.includes(si); const doneN = inSlot.filter((r) => r.done).length; return (
        <div key={n} className={`rounded-[var(--radius-m)] border ${si === cur ? 'border-primary/40 bg-surface shadow-s' : 'border-border/60 bg-surface/70'} ${future ? 'opacity-60' : ''}`}>
          <button type="button" onClick={() => past && setOpen((o) => (o.includes(si) ? o.filter((x) => x !== si) : [...o, si]))} className="flex w-full items-center gap-2 px-3 py-2 text-left">
            <I size={13} className={si === cur ? 'text-primary' : 'text-ink-4'} /><span className="text-[12px] font-semibold text-ink-2">{n}</span>
            {si === cur && <span className="rounded-full bg-primary px-1.5 text-[9.5px] text-white">지금</span>}
            <span className="ml-auto text-[10.5px] tabular-nums text-ink-4">{doneN}/{inSlot.length}</span>
            {past && <ChevronDown size={13} className={`text-ink-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />}
          </button>
          {!expanded && past && <div className="-mt-1 flex flex-wrap gap-1 px-3 pb-2">{inSlot.map((r) => <span key={r.id} className={`rounded-full px-2 py-0.5 text-[10px] ${r.kind === '식사' ? 'bg-comment-sand text-comment-sand-solid' : r.done ? 'bg-primary-subtle text-primary' : 'bg-danger-subtle text-danger'}`}>{r.label.split(',')[0]}</span>)}</div>}
          {expanded && <div className="relative px-3 pb-2 pl-[60px]"><span className="absolute left-[50px] top-1 bottom-2 w-px bg-border" />{inSlot.map((r, i) => <div key={r.id}><Line r={r} toggle={s.toggle} dim={r.t < NOW && si === cur && !(r.kind === '미션' && !r.done)} />{si === cur && r.t < NOW && (inSlot[i + 1]?.t ?? '99') >= NOW && <NowLine />}</div>)}{si === cur && <div className="mt-1"><Button variant="dotted" tone="primary" size="xs" icon={Plus}>{n} 식사 기록</Button></div>}</div>}
          {future && <div className="-mt-1 px-3 pb-2 text-[10.5px] text-ink-4">{inSlot.filter((r) => r.kind === '미션').map((r) => r.label).join(' · ') || '예정 없음'}</div>}
        </div>
      ); })}</div>
    ); } },
  { key: 'now-hero', name: '지금 카드 + 지난/남은 띠', why: '가운데 큰 "지금" 카드(다음 할 일 + 기록 버튼), 위엔 지난 기록이 스트림 한 줄씩 옅게, 아래엔 남은 미션. 하루 중 "지금 뭐 하지"에 바로 답한다.',
    Render: () => { const s = useRows(); const past = s.rows.filter((r) => r.t < NOW && !(r.kind === '미션' && !r.done)); const pending = s.rows.filter((r) => r.kind === '미션' && !r.done); const next = pending[pending.length - 1]; return (
      <div className="space-y-2">
        <div className="rounded-[var(--radius-m)] bg-surface/60 px-3 py-1.5"><div className="mb-0.5 text-[9.5px] uppercase tracking-[0.15em] text-ink-5">지난 기록 {past.length}</div><div className="flex flex-wrap gap-x-3 gap-y-0.5">{past.map((r) => <span key={r.id} className="flex items-center gap-1 text-[11px] text-ink-3"><Dot r={r} /><span className="font-mono text-[9.5px] text-ink-5">{r.t}</span>{r.label.split(',')[0]}</span>)}</div></div>
        <div className="rounded-[var(--radius-l)] border border-primary/40 bg-surface p-4 shadow-s">
          <div className="flex items-center gap-2"><span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] text-white">{NOW}</span><span className="text-[11px] text-ink-4">지금 할 것</span></div>
          {next ? <button type="button" onClick={() => s.toggle(next.id)} className="mt-2 flex w-full items-center gap-3 text-left"><TodoCheckbox size={20} done={next.done} readOnly /><span className="text-[15px] font-semibold text-ink">{next.label}</span></button> : <div className="mt-2 text-[14px] text-primary">오늘 미션 끝!</div>}
          <div className="mt-3 flex gap-2"><Button variant="grain" tone="primary" size="sm" icon={Camera}>저녁 기록</Button><Button variant="text" size="sm">유혹이 왔어요</Button></div>
        </div>
        {pending.length > 1 && <div className="px-1 text-[10.5px] text-ink-4">남은 미션 {pending.length - 1}개 · {pending.slice(0, -1).map((r) => r.label).join(', ')}</div>}
      </div>
    ); } },
  { key: 'cols-now', name: '가로 3카드 + 지금 막대', why: '세 시간대를 가로로, 위에 하루 전체 시간 막대 + 지금 위치. 카드 안은 스트림 행. 넓은 PC 본문에서 한 줄로 하루가 끝난다. 모바일은 세로로.',
    Render: () => { const s = useRows(); const [h, m] = NOW.split(':').map(Number); const p = ((h * 60 + m - 360) / (18 * 60)) * 100; return (
      <div>
        <div className="relative mb-3 h-1.5 rounded-full bg-ink-5/30"><span className="absolute inset-y-0 left-0 rounded-full bg-primary/60" style={{ width: `${p}%` }} /><span className="absolute -top-1 size-3.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-primary/15" style={{ left: `${p}%` }} /><span className="absolute top-3 -translate-x-1/2 font-mono text-[9.5px] text-primary" style={{ left: `${p}%` }}>{NOW}</span></div>
        <div className="mt-5 grid gap-2 @md:grid-cols-3">{SLOTS.map(({ n, I }, si) => { const inSlot = s.rows.filter((r) => slotOf(r.t) === si); const cur = slotOf(NOW) === si; return (
          <div key={n} className={`rounded-[var(--radius-m)] border p-3 ${cur ? 'border-primary/40 bg-surface' : 'border-border/60 bg-surface/70'}`}><div className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-2"><I size={12} className={cur ? 'text-primary' : 'text-ink-4'} /> {n}{cur && <span className="ml-auto text-[9.5px] font-normal text-primary">지금</span>}</div>
            <ul className="divide-y divide-border/60">{inSlot.map((r) => <li key={r.id} className="flex items-center gap-2 py-1.5">{r.kind === '미션' ? <TodoCheckbox size={13} done={r.done} onClick={() => s.toggle(r.id)} /> : <span className="size-[13px] rounded-[4px] bg-comment-sand-solid/80" />}<span className={`truncate text-[11.5px] ${r.kind === '미션' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.label}</span><span className="ml-auto font-mono text-[9.5px] text-ink-5">{r.t}</span></li>)}</ul>
          </div>
        ); })}</div>
      </div>
    ); } },
];
