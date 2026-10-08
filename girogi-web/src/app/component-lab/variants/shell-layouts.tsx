'use client';

import type { Variant } from './shared';

/** 레이아웃 시안 — 셸 안 본문 배치를 도식으로. 블록 이름은 실제 컴포넌트 */
const B = ({ name, h = 'h-10', tone = 'bg-surface' }: { name: string; h?: string; tone?: string }) => (
  <div className={`flex items-center justify-center rounded-[6px] border border-border/70 ${tone} ${h} text-[9.5px] text-ink-3`}>{name}</div>
);
const Frame = ({ children, mobile = false }: { children: React.ReactNode; mobile?: boolean }) => (
  <div className={`rounded-[10px] border border-border bg-surface-warm p-2 ${mobile ? 'w-[200px]' : 'w-full'}`}>
    <div className="mb-1.5 flex items-center gap-1 rounded-[4px] bg-surface px-2 py-1 text-[8.5px] text-ink-4"><b className="text-ink-2">GIROGI</b> 오늘 · 체크리스트 · 유혹 극복 · 커뮤니티</div>
    <div className="mb-1.5 flex items-center justify-between rounded-[4px] bg-surface px-2 py-1 text-[8.5px] text-ink-4"><span>10월 8일 · 7일 연속</span><span className="rounded-full bg-primary px-1.5 text-white">+ 기록</span></div>
    {children}
    <div className="mt-1.5 flex justify-center"><span className="rounded-full border border-border bg-surface px-3 py-0.5 text-[8.5px] text-ink-4">10.8 · 미션 · 7일 · + 식사</span></div>
  </div>
);
const Pair = ({ pc, mobile }: { pc: React.ReactNode; mobile: React.ReactNode }) => <div className="flex flex-wrap items-start gap-4"><div className="min-w-0 flex-1"><Frame>{pc}</Frame></div><Frame mobile>{mobile}</Frame></div>;

export const LAYOUT: Variant[] = [
  { key: 'panel', name: '좌측 패널 + 본문 (현재)', recommended: true, why: '일기장 메인과 같은 200px 패널. "내 것"(프로필·미션·달력)은 왼쪽, "오늘 쌓인 것"(배너·사진·기록·보상)은 오른쪽. 모바일은 한 열.',
    Render: () => <Pair pc={<div className="grid grid-cols-[64px_1fr] gap-1.5"><div className="space-y-1.5"><B name="Profile" h="h-12" /><B name="Missions" h="h-14" /><B name="Calendar" h="h-14" /></div><div className="space-y-1.5"><B name="Banner" h="h-6" tone="bg-primary-subtle" /><B name="PhotoStrip" h="h-12" /><B name="RecordList" h="h-16" /><B name="Reward" h="h-10" /></div></div>} mobile={<div className="space-y-1.5"><B name="Profile(띠)" h="h-8" /><B name="Missions" h="h-10" /><B name="Banner" h="h-5" tone="bg-primary-subtle" /><B name="PhotoStrip" h="h-10" /><B name="RecordList" h="h-12" /></div>} /> },
  { key: 'three', name: '3열 — 패널 | 본문 | 보조', why: '오른쪽에 보상·달력·친구를 빼서 본문은 기록만. 넓은 화면(1280↑)에서 여백을 쓰고, 좁아지면 보조 열이 아래로 내려간다.',
    Render: () => <Pair pc={<div className="grid grid-cols-[56px_1fr_56px] gap-1.5"><div className="space-y-1.5"><B name="Profile" h="h-12" /><B name="Missions" h="h-14" /></div><div className="space-y-1.5"><B name="Banner" h="h-6" tone="bg-primary-subtle" /><B name="PhotoStrip" h="h-12" /><B name="RecordList" h="h-20" /></div><div className="space-y-1.5"><B name="Reward" h="h-14" /><B name="Calendar" h="h-14" /><B name="Friends" h="h-10" /></div></div>} mobile={<div className="space-y-1.5"><B name="Profile(띠)" h="h-8" /><B name="Banner" h="h-5" tone="bg-primary-subtle" /><B name="RecordList" h="h-14" /><B name="Reward" h="h-8" /></div>} /> },
  { key: 'band', name: '상단 띠 + 2열', why: '패널을 없애고 프로필·미션을 위에 가로 띠로. 본문이 넓어져 사진·기록이 2열로 나란히. 모바일과 구조가 같아서 반응형 분기가 가장 적다.',
    Render: () => <Pair pc={<div className="space-y-1.5"><B name="Profile(띠) · 체중 · Missions 칩 3개" h="h-9" /><B name="Banner" h="h-6" tone="bg-primary-subtle" /><div className="grid grid-cols-2 gap-1.5"><B name="PhotoStrip" h="h-20" /><B name="RecordList" h="h-20" /></div><div className="grid grid-cols-2 gap-1.5"><B name="Reward" h="h-10" /><B name="Calendar" h="h-10" /></div></div>} mobile={<div className="space-y-1.5"><B name="Profile(띠)" h="h-8" /><B name="Missions 칩" h="h-6" /><B name="Banner" h="h-5" tone="bg-primary-subtle" /><B name="PhotoStrip" h="h-10" /><B name="RecordList" h="h-12" /></div>} /> },
  { key: 'bento', name: '벤토 그리드', why: '카드 크기를 다르게 — 기록 2×2, 사진 2×1, 미션·보상·달력 1×1. 대시보드 느낌이 제일 강하고, 카드 안 내용 밀도를 맞추는 게 일이다.',
    Render: () => <Pair pc={<div className="grid grid-cols-4 grid-rows-3 gap-1.5"><div className="col-span-2 row-span-2"><B name="RecordList" h="h-full" /></div><B name="Profile" h="h-12" /><B name="Missions" h="h-12" /><div className="col-span-2"><B name="PhotoStrip" h="h-12" /></div><div className="col-span-2"><B name="Banner" h="h-12" tone="bg-primary-subtle" /></div><B name="Reward" h="h-12" /><B name="Calendar" h="h-12" /></div>} mobile={<div className="space-y-1.5"><B name="Profile" h="h-8" /><div className="grid grid-cols-2 gap-1.5"><B name="Missions" h="h-10" /><B name="Reward" h="h-10" /></div><B name="RecordList" h="h-14" /><B name="PhotoStrip" h="h-8" /></div>} /> },
  { key: 'narrow', name: '중앙 1열 (읽는 화면)', why: '일기장 상세·글쓰기처럼 560px 한 기둥. 위에서 아래로 하루를 읽는다. 패널·그리드 없음. 가장 조용하지만 PC 여백이 많이 남는다.',
    Render: () => <Pair pc={<div className="mx-auto w-2/3 space-y-1.5"><B name="Profile(띠)" h="h-8" /><B name="Banner" h="h-6" tone="bg-primary-subtle" /><B name="Missions" h="h-10" /><B name="PhotoStrip" h="h-12" /><B name="RecordList" h="h-16" /><B name="Reward" h="h-10" /></div>} mobile={<div className="space-y-1.5"><B name="Profile(띠)" h="h-8" /><B name="Banner" h="h-5" tone="bg-primary-subtle" /><B name="Missions" h="h-10" /><B name="RecordList" h="h-12" /></div>} /> },
];
