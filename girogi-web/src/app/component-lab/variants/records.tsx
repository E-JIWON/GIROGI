'use client';

import { Camera } from 'lucide-react';
import { TodoCheckbox } from 'bongchil-design-system';
import { WidgetCard } from '@/components/common/widget-card';
import { RecordList } from '../../home/_components/journal/record-list';
import { MealPlaceDisplayNames, MealTimeDisplayNames } from '@/types/enums';
import { MEALS, useMissionState, type Variant } from './shared';

const time = (iso: string) => new Date(iso).toTimeString().slice(0, 5);

export const RECORDS: Variant[] = [
  { key: 'one-card', name: '한 카드 묶음', recommended: true, why: '일기장 RecordList. 미션·식사가 한 카드에 시간 없이 쌓인다. 적게 보여도 되는 홈에 맞다.',
    Render: () => { const s = useMissionState(); return <RecordList missions={s.missions} meals={MEALS} onToggleMission={s.toggle} />; } },
  { key: 'timeline', name: '세로 타임라인', why: '시간순으로 미션(예정)과 식사(완료)를 한 줄에. 하루의 흐름이 보이지만 미션엔 시간이 없어서 슬롯 시간을 가정해야 한다.',
    Render: () => { const s = useMissionState(); const rows = [...s.missions.map((m, i) => ({ t: ['07:30', '12:30', '18:30'][i], label: m.title, kind: '미션', done: m.isCompleted, id: m.id })), ...MEALS.map((m) => ({ t: time(m.createdAt), label: `${MealTimeDisplayNames[m.mealTime]} · ${m.menu}`, kind: '식사', done: true, id: m.id }))].sort((a, b) => a.t.localeCompare(b.t)); return (
      <div className="relative pl-14">
        <span className="absolute left-[46px] top-2 bottom-2 w-px bg-border" />
        {rows.map((r) => <div key={r.id} className="relative mb-2.5 flex items-center gap-3"><span className="absolute -left-14 w-10 text-right font-mono text-[10px] text-ink-4">{r.t}</span><span className={`absolute -left-[11px] top-1/2 size-2 -translate-y-1/2 rounded-full ${r.kind === '미션' ? (r.done ? 'bg-primary' : 'border-[1.5px] border-dashed border-ink/30 bg-surface') : 'bg-comment-sand-solid'}`} /><span className={`text-[12.5px] ${r.kind === '미션' && !r.done ? 'text-ink' : 'text-ink-2'}`}>{r.label}</span><span className="text-[10px] text-ink-4">{r.kind}</span></div>)}
      </div>
    ); } },
  { key: 'stream', name: '끄적끄적 스트림', why: '일기장 scribbles. 종류를 색 사각으로, 최신이 위. 유혹 기록까지 같은 줄에 흘릴 수 있다.',
    Render: () => { const s = useMissionState(); return (
      <ul className="divide-y divide-border border-y border-border">
        {MEALS.map((m) => <li key={m.id} className="flex items-center gap-3 py-2"><span className="size-[14px] rounded-[4px] bg-comment-sand-solid" /><span className="text-[12.5px] text-ink">{MealTimeDisplayNames[m.mealTime]} — {MealPlaceDisplayNames[m.place]} · {m.menu}</span><span className="ml-auto font-mono text-[10px] text-ink-4">{time(m.createdAt)}</span></li>)}
        {s.missions.map((m) => <li key={m.id} className="flex items-center gap-3 py-2"><TodoCheckbox size={14} done={m.isCompleted} onClick={() => s.toggle(m.id)} /><span className={`text-[12.5px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span><span className="ml-auto text-[10px] text-primary">미션</span></li>)}
      </ul>
    ); } },
  { key: 'split', name: '미션 / 식사 2단', why: '성격이 다른 둘을 카드 둘로. 각각 제목이 생겨 명확하지만 세로가 길어진다. 패널 없는 모바일에 맞다.',
    Render: () => { const s = useMissionState(); return (
      <div className="grid gap-3 @md:grid-cols-2">
        <WidgetCard title="미션" noPadding className="[&>div]:px-4 [&>div]:pt-4"><ul className="divide-y divide-border">{s.missions.map((m) => <li key={m.id}><button type="button" onClick={() => s.toggle(m.id)} className="flex w-full items-center gap-2.5 px-4 py-2 text-left"><TodoCheckbox size={15} done={m.isCompleted} readOnly /><span className={`text-[12.5px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span></button></li>)}</ul></WidgetCard>
        <WidgetCard title="식사" noPadding className="[&>div]:px-4 [&>div]:pt-4"><ul className="divide-y divide-border">{MEALS.map((m) => <li key={m.id} className="flex items-center gap-2.5 px-4 py-2"><Camera size={13} className="text-ink-4" /><span className="truncate text-[12.5px] text-ink-2">{MealTimeDisplayNames[m.mealTime]} · {m.menu}</span><span className="ml-auto font-mono text-[10px] text-ink-4">{time(m.createdAt)}</span></li>)}</ul></WidgetCard>
      </div>
    ); } },
  { key: 'slots', name: '시간대 카드', why: '체크리스트 페이지 구조(아침·점심·저녁)를 홈에도. 각 칸에 미션 + 그 끼니 식사. 홈과 체크리스트가 비슷해져 둘 중 하나가 남는다.',
    Render: () => { const s = useMissionState(); const slots = ['아침', '점심', '저녁']; return (
      <div className="grid gap-2 @md:grid-cols-3">
        {slots.map((slot, i) => { const m = s.missions[i]; const meal = MEALS.find((x) => MealTimeDisplayNames[x.mealTime] === slot); return (
          <div key={slot} className="rounded-[var(--radius-m)] bg-surface p-3">
            <div className="mb-2 flex items-baseline justify-between"><span className="text-[12px] font-semibold text-ink-2">{slot}</span><span className="text-[10px] text-ink-4">{meal ? time(meal.createdAt) : '—'}</span></div>
            <button type="button" onClick={() => s.toggle(m.id)} className="flex w-full items-center gap-2 text-left"><TodoCheckbox size={14} done={m.isCompleted} readOnly /><span className={`text-[11.5px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span></button>
            <div className="mt-2 text-[11px] text-ink-3">{meal ? meal.menu : <span className="text-ink-5">아직</span>}</div>
          </div>
        ); })}
      </div>
    ); } },
];
