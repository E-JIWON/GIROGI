'use client';

import { Camera, Plus } from 'lucide-react';
import { PhotoStrip } from '../../home/_components/journal/photo-strip';
import { MealTimeDisplayNames } from '@/types/enums';
import { MEALS, type Variant } from './shared';

const Tile = ({ label, className = '' }: { label: string; className?: string }) => (
  <div className={`relative overflow-hidden rounded-xl border border-border/60 bg-comment-sand ${className}`}><div className="flex h-full flex-col justify-between p-2"><Camera size={13} className="text-comment-sand-solid" /><span className="line-clamp-2 text-[10.5px] leading-snug text-ink-2">{label}</span></div></div>
);
const labels = MEALS.map((m) => `${MealTimeDisplayNames[m.mealTime]} ${m.menu}`);

export const PHOTOS: Variant[] = [
  { key: 'strip', name: '필름 스트립', recommended: true, why: '일기장 PhotoStrip. 가로 스크롤이라 끼니 수가 늘어도 레이아웃이 안 깨진다. 추가 칸이 끝에.', Render: () => <PhotoStrip meals={MEALS} /> },
  { key: 'polaroid', name: '폴라로이드', why: '다락방 벽 결. 살짝 기울어진 흰 테두리. 사진이 있을 때만 예쁘고, 없으면 빈 액자가 어색하다.',
    Render: () => (
      <div className="flex flex-wrap gap-4 pt-2">{labels.map((l, i) => <div key={l} className="w-[120px] rounded-[3px] bg-white p-1.5 pb-5 shadow-m" style={{ rotate: `${[-3, 2, -1][i % 3]}deg` }}><div className="grid aspect-square place-items-center rounded-[2px] bg-comment-sand text-comment-sand-solid"><Camera size={16} /></div><div className="mt-1.5 truncate text-center text-[10px] text-ink-2">{l}</div></div>)}</div>
    ) },
  { key: 'grid3', name: '끼니 3칸 고정', why: '아침·점심·저녁 자리를 항상 비워두고 채운다. "저녁 아직"이 바로 보인다. 간식이 끼면 칸이 깨진다.',
    Render: () => (
      <div className="grid grid-cols-3 gap-2">{['아침', '점심', '저녁'].map((slot, i) => labels[i] ? <Tile key={slot} label={labels[i]} className="h-[84px]" /> : <div key={slot} className="flex h-[84px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-ink/20 text-ink-4"><Plus size={13} /><span className="text-[10.5px]">{slot}</span></div>)}</div>
    ) },
  { key: 'cover', name: '큰 사진 + 작은 둘', why: '오늘 대표 끼니 하나를 크게. 커뮤니티 공유 썸네일과 같은 구도. 어떤 끼니가 대표인지 규칙이 필요.',
    Render: () => (
      <div className="grid h-[160px] grid-cols-[1.4fr_1fr] gap-2"><Tile label={labels[0] ?? '대표'} /><div className="grid grid-rows-2 gap-2">{labels.slice(1, 3).map((l) => <Tile key={l} label={l} />)}</div></div>
    ) },
  { key: 'timeline', name: '시간 점 + 썸네일', why: '프로필 식사 타임라인의 축소판. 시간 정보가 들어간다. 홈에서는 기록 리스트와 겹쳐서 둘 중 하나만.',
    Render: () => (
      <div className="relative pl-5">
        <span className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
        {MEALS.map((m) => <div key={m.id} className="relative mb-2 flex items-center gap-3"><span className="absolute -left-5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary" /><span className="font-mono text-[10px] text-ink-4">{new Date(m.createdAt).toTimeString().slice(0, 5)}</span><div className="grid size-9 place-items-center rounded-[6px] bg-comment-sand text-comment-sand-solid"><Camera size={12} /></div><span className="truncate text-[12px] text-ink-2">{MealTimeDisplayNames[m.mealTime]} · {m.menu}</span></div>)}
      </div>
    ) },
];
