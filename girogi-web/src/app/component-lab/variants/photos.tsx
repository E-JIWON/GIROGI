'use client';

import { useState } from 'react';
import { Camera, MapPin } from 'lucide-react';
import { Segmented } from 'bongchil-design-system';
import type { Variant } from './shared';

/* eslint-disable @next/next/no-img-element */
type Meal = { id: string; t: string; slot: string; menu: string; place: string };
/** 하루 최대치 — 세 끼 + 간식 둘 + 커피 + 야식 + 운동 후 (8개) */
const ALL: Meal[] = [
  { id: 'a', t: '07:40', slot: '아침', menu: '계란국, 현미밥', place: '집' },
  { id: 'b', t: '10:20', slot: '간식', menu: '아메리카노', place: '회사' },
  { id: 'c', t: '12:10', slot: '점심', menu: '제육볶음, 미역국', place: '구내식당' },
  { id: 'd', t: '15:30', slot: '간식', menu: '사과 반 개', place: '회사' },
  { id: 'e', t: '17:50', slot: '간식', menu: '프로틴 쉐이크', place: '헬스장' },
  { id: 'f', t: '19:00', slot: '저녁', menu: '된장찌개, 나물', place: '집' },
  { id: 'g', t: '21:40', slot: '야식', menu: '그릭요거트', place: '집' },
  { id: 'h', t: '23:10', slot: '야식', menu: '라면 반 개', place: '집' },
];
const SETS: Record<string, Meal[]> = { one: ALL.slice(0, 1), three: [ALL[0], ALL[2], ALL[5]], max: ALL };
const img = (seed: string, w = 240, h = 240) => `https://picsum.photos/seed/girogi-${seed}/${w}/${h}`;

/** 각 시안 위에 데이터 양 토글 — 1끼 · 3끼 · 최대 8개 */
function WithData({ children }: { children: (meals: Meal[]) => React.ReactNode }) {
  const [k, setK] = useState('three');
  return (
    <div>
      <div className="mb-3 flex items-center gap-2"><span className="text-[10.5px] text-ink-4">데이터</span><Segmented groups={[{ items: [{ value: 'one', label: '1끼' }, { value: 'three', label: '3끼' }, { value: 'max', label: '최대 8' }], value: k, onChange: setK }]} /></div>
      {children(SETS[k])}
    </div>
  );
}

export const PHOTOS: Variant[] = [
  { key: 'horizontal', name: '가로 시간축 + 사진', recommended: true, why: '시간이 왼→오로 흐르고 사진이 축 위에 선다. 8개면 가로 스크롤로 밀리고, 지금 시간 이후는 비어 있다. 쌓일수록 하루가 필름처럼 길어진다.',
    Render: () => <WithData>{(meals) => (
      <div className="scrollbar-hide overflow-x-auto pb-1"><div className="relative flex w-max gap-5 px-2 pt-1"><span className="absolute inset-x-2 bottom-[22px] h-px bg-border" />
        {meals.map((m) => <div key={m.id} className="relative flex w-[96px] flex-col items-center"><img src={img(m.id)} alt="" className={`size-[84px] rounded-[10px] border object-cover ${m.slot === '간식' || m.slot === '야식' ? 'border-comment-sand-solid/50' : 'border-border/60'}`} /><span className="mt-1.5 w-full truncate text-center text-[10.5px] text-ink-2"><span className="text-ink-4">{m.slot}</span> {m.menu.split(',')[0]}</span><span className={`mt-1 size-2 rounded-full ring-4 ring-surface-warm ${m.slot === '간식' || m.slot === '야식' ? 'bg-comment-sand-solid' : 'bg-primary'}`} /><span className="mt-1 font-mono text-[10px] text-ink-4">{m.t}</span></div>)}
        <div className="relative flex w-[72px] flex-col items-center"><div className="flex size-[84px] items-center justify-center rounded-[10px] border border-dashed border-ink/20 text-ink-4"><Camera size={15} /></div><span className="mt-1.5 text-[10.5px] text-ink-4">추가</span><span className="mt-1 size-2 rounded-full border border-dashed border-ink/30 bg-surface ring-4 ring-surface-warm" /><span className="mt-1 font-mono text-[10px] text-ink-5">지금</span></div>
      </div></div>
    )}</WithData> },
  { key: 'timeline-64', name: '세로 시간 점 + 64px', why: '세로로 쌓인다. 8개면 세로 약 600px — 홈 본문 한 화면을 넘는다. 3개까지는 가장 정돈돼 보인다.',
    Render: () => <WithData>{(meals) => (
      <div className="relative pl-5"><span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
        {meals.map((m) => <div key={m.id} className="relative mb-2.5 flex items-center gap-3"><span className={`absolute -left-5 top-1/2 size-2 -translate-y-1/2 rounded-full ${m.slot === '간식' || m.slot === '야식' ? 'bg-comment-sand-solid' : 'bg-primary'}`} /><span className="w-9 font-mono text-[10px] text-ink-4">{m.t}</span><img src={img(m.id)} alt="" className="size-16 rounded-[8px] border border-border/60 object-cover" /><span className="min-w-0"><span className="block truncate text-[12.5px] text-ink">{m.slot} · {m.menu}</span><span className="mt-0.5 inline-flex items-center gap-1 text-[10.5px] text-ink-4"><MapPin size={10} /> {m.place}</span></span></div>)}
      </div>
    )}</WithData> },
  { key: 'grouped', name: '가로 시간축 · 끼니만 크게', why: '세 끼는 큰 사진, 간식·야식은 축 위 작은 동그라미로. 8개여도 폭이 크게 안 늘고, "끼니"와 "군것질"이 구분된다.',
    Render: () => <WithData>{(meals) => (
      <div className="scrollbar-hide overflow-x-auto pb-1"><div className="relative flex w-max items-end gap-3 px-2 pt-1"><span className="absolute inset-x-2 bottom-[22px] h-px bg-border" />
        {meals.map((m) => { const main = ['아침', '점심', '저녁'].includes(m.slot); return main ? (
          <div key={m.id} className="relative flex w-[96px] flex-col items-center"><img src={img(m.id)} alt="" className="size-[84px] rounded-[10px] border border-border/60 object-cover" /><span className="mt-1.5 w-full truncate text-center text-[10.5px] text-ink-2">{m.slot} · {m.menu.split(',')[0]}</span><span className="mt-1 size-2 rounded-full bg-primary ring-4 ring-surface-warm" /><span className="mt-1 font-mono text-[10px] text-ink-4">{m.t}</span></div>
        ) : (
          <div key={m.id} className="relative flex w-[44px] flex-col items-center" title={`${m.slot} · ${m.menu}`}><img src={img(m.id, 120, 120)} alt="" className="size-9 rounded-full border-2 border-comment-sand-solid/60 object-cover" /><span className="mt-1 w-full truncate text-center text-[9px] text-ink-4">{m.slot}</span><span className="mt-1 size-1.5 rounded-full bg-comment-sand-solid ring-4 ring-surface-warm" /><span className="mt-1 font-mono text-[9px] text-ink-5">{m.t}</span></div>
        ); })}
      </div></div>
    )}</WithData> },
  { key: 'grid-time', name: '2열 사진 + 시간 라벨', why: '사진이 제일 크다. 8개면 4줄 — 대신 끼니 사진이 앨범처럼 쌓여 하루 끝에 보기 좋다.',
    Render: () => <WithData>{(meals) => (
      <div className="grid grid-cols-2 gap-2 @md:grid-cols-3">{meals.map((m) => <div key={m.id} className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-border/60"><img src={img(m.id, 400, 300)} alt="" className="h-full w-full object-cover" /><span className="absolute left-2 top-2 rounded-full bg-surface/90 px-2 py-0.5 font-mono text-[10px] text-ink-2">{m.t}</span><span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/55 to-transparent px-2 pb-1.5 pt-5 text-[11px] text-white">{m.slot} · {m.menu}</span></div>)}</div>
    )}</WithData> },
];
