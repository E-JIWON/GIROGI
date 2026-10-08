'use client';

import { Camera, MapPin } from 'lucide-react';
import { MealPlaceDisplayNames, MealTimeDisplayNames } from '@/types/enums';
import { MEALS, type Variant } from './shared';

/* eslint-disable @next/next/no-img-element */
/** 랩 전용 — 진짜 사진 느낌을 보려고 시드 이미지 사용 (앱에선 m.imageUrl) */
const img = (seed: string, w = 240, h = 240) => `https://picsum.photos/seed/girogi-${seed}/${w}/${h}`;
const time = (iso: string) => new Date(iso).toTimeString().slice(0, 5);
const rows = MEALS.map((m) => ({ id: m.id, t: time(m.createdAt), slot: MealTimeDisplayNames[m.mealTime], menu: m.menu, place: MealPlaceDisplayNames[m.place] }));

export const PHOTOS: Variant[] = [
  { key: 'timeline', name: '시간 점 + 썸네일 (현재)', why: '기준. 36px 썸네일이라 사진이 뭔지 안 보인다.',
    Render: () => (
      <div className="relative pl-5"><span className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
        {rows.map((r) => <div key={r.id} className="relative mb-2 flex items-center gap-3"><span className="absolute -left-5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary" /><span className="font-mono text-[10px] text-ink-4">{r.t}</span><img src={img(r.id)} alt="" className="size-9 rounded-[6px] object-cover" /><span className="truncate text-[12px] text-ink-2">{r.slot} · {r.menu}</span></div>)}
      </div>
    ) },
  { key: 'timeline-64', name: '시간 점 + 64px 썸네일 + 장소', recommended: true, why: '썸네일을 64px로 키우고 메뉴 아래 장소 칩. 사진이 보이면서도 한 끼가 한 줄. 홈에 그대로 넣을 수 있는 크기.',
    Render: () => (
      <div className="relative pl-5"><span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
        {rows.map((r) => <div key={r.id} className="relative mb-2.5 flex items-center gap-3"><span className="absolute -left-5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary" /><span className="w-9 font-mono text-[10px] text-ink-4">{r.t}</span><img src={img(r.id)} alt="" className="size-16 rounded-[8px] border border-border/60 object-cover" /><span className="min-w-0"><span className="block truncate text-[12.5px] text-ink">{r.slot} · {r.menu}</span><span className="mt-0.5 inline-flex items-center gap-1 text-[10.5px] text-ink-4"><MapPin size={10} /> {r.place}</span></span></div>)}
      </div>
    ) },
  { key: 'timeline-wide', name: '시간 점 + 가로형 카드', why: '썸네일 80px + 오른쪽에 메뉴·장소·"잘한 것" 칩까지. 끼니 하나가 작은 기록 카드. 정보 가장 많음, 세로 가장 길다.',
    Render: () => (
      <div className="relative pl-5"><span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
        {MEALS.map((m) => <div key={m.id} className="relative mb-2.5 flex gap-3 rounded-[var(--radius-m)] border border-border/60 bg-surface p-2"><span className="absolute -left-5 top-5 size-2 rounded-full bg-primary" /><img src={img(m.id, 320, 240)} alt="" className="h-20 w-24 shrink-0 rounded-[6px] object-cover" /><div className="min-w-0 flex-1 py-0.5"><div className="flex items-baseline justify-between"><span className="text-[12.5px] font-medium text-ink">{MealTimeDisplayNames[m.mealTime]} · {m.menu}</span><span className="font-mono text-[10px] text-ink-4">{time(m.createdAt)}</span></div><div className="mt-0.5 text-[10.5px] text-ink-4">{MealPlaceDisplayNames[m.place]}</div><div className="mt-1.5 flex flex-wrap gap-1">{m.achievements.slice(0, 2).map((a) => <span key={a} className="rounded-[4px] bg-comment-green px-1.5 py-0.5 text-[9.5px] text-comment-green-solid">{a}</span>)}</div></div></div>)}
      </div>
    ) },
  { key: 'horizontal', name: '가로 시간축 + 사진', why: '시간이 왼쪽→오른쪽으로 흐르고 사진이 축 위에 선다. 하루가 한눈에. 끼니 4개 넘으면 가로 스크롤.',
    Render: () => (
      <div className="scrollbar-hide overflow-x-auto pb-1"><div className="relative flex w-max gap-6 px-2 pt-2"><span className="absolute inset-x-2 bottom-[22px] h-px bg-border" />
        {rows.map((r) => <div key={r.id} className="relative flex w-[104px] flex-col items-center"><img src={img(r.id)} alt="" className="size-[88px] rounded-[10px] border border-border/60 object-cover" /><span className="mt-1.5 truncate text-[11px] text-ink-2">{r.slot} · {r.menu.split(',')[0]}</span><span className="mt-1 size-2 rounded-full bg-primary ring-4 ring-surface-warm" /><span className="mt-1 font-mono text-[10px] text-ink-4">{r.t}</span></div>)}
      </div></div>
    ) },
  { key: 'grid-time', name: '시간 라벨 + 2열 사진', why: '사진을 제일 크게. 타일 위에 시간·끼니만 얹는다. 하루 끼니 사진이 보기 좋게 쌓이고, 선은 없다.',
    Render: () => (
      <div className="grid grid-cols-2 gap-2">{rows.map((r) => <div key={r.id} className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-border/60"><img src={img(r.id, 400, 300)} alt="" className="h-full w-full object-cover" /><span className="absolute left-2 top-2 rounded-full bg-surface/90 px-2 py-0.5 font-mono text-[10px] text-ink-2">{r.t}</span><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 pb-1.5 pt-5 text-[11px] text-white">{r.slot} · {r.menu}</span></div>)}<div className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-[10px] border border-dashed border-ink/20 text-ink-4"><Camera size={14} /><span className="text-[10.5px]">저녁 기록</span></div></div>
    ) },
];
