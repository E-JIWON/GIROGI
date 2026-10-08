'use client';

import { Camera, Moon, Sun, Sunrise } from 'lucide-react';
import { TodoCheckbox } from 'bongchil-design-system';
import { MealPlaceDisplayNames, MealTimeDisplayNames } from '@/types/enums';
import { MEALS, useMissionState, type Variant } from './shared';

const time = (iso: string) => new Date(iso).toTimeString().slice(0, 5);
const SLOT_T = ['07:30', '12:30', '18:30'];
const SLOTS = [{ n: '아침', I: Sunrise }, { n: '점심', I: Sun }, { n: '저녁', I: Moon }];
type Row = { id: string; t: string; label: string; kind: '미션' | '식사'; done: boolean; sub?: string };

function useRows() {
  const s = useMissionState();
  const rows: Row[] = [
    ...s.missions.map((m, i) => ({ id: m.id, t: SLOT_T[i], label: m.title, kind: '미션' as const, done: m.isCompleted })),
    ...MEALS.map((m) => ({ id: m.id, t: time(m.createdAt), label: `${MealTimeDisplayNames[m.mealTime]} · ${m.menu}`, kind: '식사' as const, done: true, sub: MealPlaceDisplayNames[m.place] })),
  ].sort((a, b) => a.t.localeCompare(b.t));
  return { ...s, rows };
}
const Dot = ({ r }: { r: Row }) => <span className={`size-2 shrink-0 rounded-full ${r.kind === '식사' ? 'bg-comment-sand-solid' : r.done ? 'bg-primary' : 'border-[1.5px] border-dashed border-ink/30 bg-surface'}`} />;
const Kind = ({ r }: { r: Row }) => <span className={`text-[10px] ${r.kind === '식사' ? 'text-comment-sand-solid' : 'text-primary'}`}>{r.kind}</span>;

export const RECORDS: Variant[] = [
  { key: 'tl-stream', name: '타임라인 × 스트림', recommended: true, why: '세로선·시간(타임라인) + 종류 색 사각·체크(스트림). 시간순으로 흐르고, 미션은 체크로 바로 완료. 한 리스트에 다 들어간다.',
    Render: () => { const s = useRows(); return (
      <div className="relative pl-12"><span className="absolute left-[38px] top-2 bottom-2 w-px bg-border" />
        {s.rows.map((r) => <div key={r.id} className="relative mb-1 flex items-center gap-3 py-1"><span className="absolute -left-12 w-8 text-right font-mono text-[10px] text-ink-4">{r.t}</span><span className="absolute -left-[17px]"><Dot r={r} /></span>{r.kind === '미션' ? <TodoCheckbox size={14} done={r.done} onClick={() => s.toggle(r.id)} /> : <span className="size-[14px] rounded-[4px] bg-comment-sand-solid/80" />}<span className={`min-w-0 flex-1 truncate text-[12.5px] ${r.kind === '미션' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.label}{r.sub && <span className="ml-1.5 text-ink-4">{r.sub}</span>}</span><Kind r={r} /></div>)}
      </div>
    ); } },
  { key: 'tl-stream-now', name: '타임라인 × 스트림 + 지금', why: '위와 같되 "지금" 선이 시간축에 꽂힌다. 지난 일은 옅게, 앞으로 할 미션은 진하게. 오늘 어디쯤 왔는지가 보인다.',
    Render: () => { const s = useRows(); const now = '15:10'; return (
      <div className="relative pl-12"><span className="absolute left-[38px] top-2 bottom-2 w-px bg-border" />
        {s.rows.map((r, i) => { const past = r.t < now; const showNow = past && (s.rows[i + 1]?.t ?? '99') >= now; return (
          <div key={r.id}>
            <div className={`relative mb-1 flex items-center gap-3 py-1 ${past && !(r.kind === '미션' && !r.done) ? 'opacity-60' : ''}`}><span className="absolute -left-12 w-8 text-right font-mono text-[10px] text-ink-4">{r.t}</span><span className="absolute -left-[17px]"><Dot r={r} /></span>{r.kind === '미션' ? <TodoCheckbox size={14} done={r.done} onClick={() => s.toggle(r.id)} /> : <Camera size={13} className="text-comment-sand-solid" />}<span className={`min-w-0 flex-1 truncate text-[12.5px] ${r.kind === '미션' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.label}</span><Kind r={r} /></div>
            {showNow && <div className="relative my-1.5 flex items-center gap-2"><span className="absolute -left-12 w-8 text-right font-mono text-[10px] text-primary">{now}</span><span className="absolute -left-[21px] size-3 rounded-full bg-primary ring-4 ring-primary/15" /><span className="h-px flex-1 bg-primary/40" /><span className="text-[10px] text-primary">지금</span></div>}
          </div>
        ); })}
      </div>
    ); } },
  { key: 'slot-tl', name: '시간대 카드 × 타임라인', why: '아침·점심·저녁 헤더로 묶고, 각 묶음 안은 시간이 흐르는 타임라인 행. 구조는 체크리스트, 안쪽은 기록. 긴 하루도 세 덩어리로 읽힌다.',
    Render: () => { const s = useRows(); return (
      <div className="space-y-3">{SLOTS.map(({ n, I }, i) => { const inSlot = s.rows.filter((r) => (r.kind === '미션' ? r.t === SLOT_T[i] : r.label.startsWith(n))); return (
        <div key={n} className="rounded-[var(--radius-m)] bg-surface p-3"><div className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-2"><I size={12} className="text-primary" /> {n}<span className="ml-auto font-mono text-[10px] font-normal text-ink-4">{inSlot[0]?.t ?? '—'}</span></div>
          <div className="relative pl-4"><span className="absolute left-[3px] top-1 bottom-1 w-px bg-border" />{inSlot.length ? inSlot.map((r) => <div key={r.id} className="relative flex items-center gap-2 py-1"><span className="absolute -left-4"><Dot r={r} /></span>{r.kind === '미션' ? <TodoCheckbox size={13} done={r.done} onClick={() => s.toggle(r.id)} /> : <Camera size={12} className="text-comment-sand-solid" />}<span className={`truncate text-[12px] ${r.kind === '미션' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.label.replace(`${n} · `, '')}</span></div>) : <div className="py-1 text-[11px] text-ink-5">아직 없음</div>}</div>
        </div>
      ); })}</div>
    ); } },
  { key: 'slot-stream', name: '시간대 카드 × 스트림', why: '세 시간대를 가로 3칸으로, 칸 안은 스트림 행(색 사각 + 한 줄). 가장 납작하다. PC 본문 폭에 맞고 모바일은 1열로 떨어진다.',
    Render: () => { const s = useRows(); return (
      <div className="grid gap-2 @md:grid-cols-3">{SLOTS.map(({ n, I }, i) => { const inSlot = s.rows.filter((r) => (r.kind === '미션' ? r.t === SLOT_T[i] : r.label.startsWith(n))); return (
        <div key={n} className="rounded-[var(--radius-m)] border border-border/60 bg-surface p-3"><div className="mb-2 flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-2"><I size={12} className="text-primary" /> {n}</div>
          <ul className="divide-y divide-border/60">{inSlot.map((r) => <li key={r.id} className="flex items-center gap-2 py-1.5">{r.kind === '미션' ? <TodoCheckbox size={13} done={r.done} onClick={() => s.toggle(r.id)} /> : <span className="size-[13px] rounded-[4px] bg-comment-sand-solid/80" />}<span className={`truncate text-[11.5px] ${r.kind === '미션' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.label.replace(`${n} · `, '')}</span></li>)}{!inSlot.length && <li className="py-1.5 text-[11px] text-ink-5">아직 없음</li>}</ul>
        </div>
      ); })}</div>
    ); } },
  { key: 'all-three', name: '셋 다 (헤더 + 선 + 색)', why: '시간대 헤더(묶음) + 세로선·시간(흐름) + 색 사각·체크(종류). 정보는 제일 많고 규칙이 셋이라 처음엔 복잡해 보인다. 기록이 많은 사용자용.',
    Render: () => { const s = useRows(); return (
      <div className="relative pl-12"><span className="absolute left-[38px] top-2 bottom-2 w-px bg-border" />
        {SLOTS.map(({ n, I }, i) => { const inSlot = s.rows.filter((r) => (r.kind === '미션' ? r.t === SLOT_T[i] : r.label.startsWith(n))); return (
          <div key={n} className="mb-2"><div className="relative mb-1 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3"><span className="absolute -left-[22px] grid size-4 place-items-center rounded-full bg-surface-warm text-primary"><I size={11} /></span>{n}</div>
            {inSlot.map((r) => <div key={r.id} className="relative mb-0.5 flex items-center gap-3 py-1"><span className="absolute -left-12 w-8 text-right font-mono text-[10px] text-ink-4">{r.t}</span><span className="absolute -left-[17px]"><Dot r={r} /></span>{r.kind === '미션' ? <TodoCheckbox size={14} done={r.done} onClick={() => s.toggle(r.id)} /> : <span className="size-[14px] rounded-[4px] bg-comment-sand-solid/80" />}<span className={`min-w-0 flex-1 truncate text-[12.5px] ${r.kind === '미션' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.label.replace(`${n} · `, '')}</span><Kind r={r} /></div>)}
          </div>
        ); })}
      </div>
    ); } },
];
