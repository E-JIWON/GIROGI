'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { BasicGlass, Button } from 'bongchil-design-system';
import { STREAK, type Variant } from './shared';

const Desk = ({ children }: { children: React.ReactNode }) => <div className="rounded-[var(--radius-l)] p-3" style={{ background: 'var(--desk-bg)' }}>{children}</div>;
const CHEERS = ['오늘도 두 개면 충분해요', '어제의 나보다 하루 더', '내일의 내가 고마워할 거예요', '지금 이 선택이 7일을 8일로'];

function Rotating() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % CHEERS.length), 2600); return () => clearInterval(t); }, []);
  return <span key={i} className="fade-up inline-block text-[12px] text-ink-2">{CHEERS[i]}</span>;
}

export const BANNER: Variant[] = [
  { key: 'glass', name: '유리 띠', why: 'BasicGlass airy. 책상 배경이 비치는 띠. 기준.',
    Render: () => <Desk><BasicGlass airy className="flex items-center gap-3 rounded-[13px] px-3.5 py-2.5"><Flame size={14} className="text-primary" /><span className="text-[12px] text-ink-2">연속 <b className="text-primary">{STREAK}일째</b>. 오늘도 두 개면 충분해요.</span></BasicGlass></Desk> },
  { key: 'glass-pulse', name: '유리 띠 + 불꽃 펄스', recommended: true, why: '불꽃이 숨 쉬듯 커졌다 작아진다. 글은 짧고 세게: "7일째. 오늘도 간다." 응원은 말보다 움직임이 먼저.',
    Render: () => <Desk><BasicGlass airy className="flex items-center gap-3 rounded-[13px] px-3.5 py-2.5"><span className="grid size-7 place-items-center rounded-full bg-primary-light"><Flame size={15} className="flame-pulse text-primary" /></span><span className="text-[12.5px] text-ink"><b className="text-primary">{STREAK}일째.</b> 오늘도 간다.</span><span className="ml-auto text-[10.5px] text-ink-4">미션 2개면 {STREAK + 1}일</span></BasicGlass></Desk> },
  { key: 'glass-dots', name: '유리 띠 + 치팅데이 점', why: '7개 점 중 몇 개 채웠는지. "3일만 더 가면 치팅데이"가 바로 보인다. 보상이 응원이 되는 구조.',
    Render: () => { const n = STREAK % 7 || 7; return <Desk><BasicGlass airy className="flex items-center gap-3 rounded-[13px] px-3.5 py-2.5"><Flame size={14} className="text-primary" /><span className="text-[12px] text-ink-2"><b className="text-primary">{STREAK}일째</b></span><span className="flex gap-1">{Array.from({ length: 7 }).map((_, i) => <span key={i} className={`size-2 rounded-full ${i < n ? 'bg-primary' : 'bg-ink-5/40'}`} />)}</span><span className="ml-auto text-[10.5px] text-ink-3">{n === 7 ? '치팅데이 도착' : `치팅데이까지 ${7 - n}일`}</span></BasicGlass></Desk>; } },
  { key: 'glass-cta', name: '유리 띠 + 큰 숫자 + 버튼', why: '왼쪽에 큰 7, 오른쪽에 "오늘 미션 시작" grain 버튼. 배너가 읽는 것에서 누르는 것으로 바뀐다.',
    Render: () => <Desk><BasicGlass airy className="flex items-center gap-3 rounded-[13px] px-3.5 py-2"><span className="flex items-baseline gap-0.5"><span className="text-[24px] font-bold leading-none tabular-nums text-primary">{STREAK}</span><span className="text-[11px] text-ink-3">일</span></span><span className="text-[12px] text-ink-2">잘 하고 있어요. 오늘 건 아직이에요.</span><span className="ml-auto"><Button variant="grain" tone="primary" size="sm" icon={ArrowRight}>오늘 미션</Button></span></BasicGlass></Desk> },
  { key: 'glass-cheer', name: '유리 띠 + 바뀌는 응원', why: '응원 문구가 몇 초마다 바뀐다. 매일 열어도 같은 말이 아니라서 질리지 않는다. 문구 풀만 늘리면 된다.',
    Render: () => <Desk><BasicGlass airy className="flex items-center gap-3 rounded-[13px] px-3.5 py-2.5"><Flame size={14} className="flame-pulse text-primary" /><span className="text-[12px] text-ink-2"><b className="text-primary">{STREAK}일째</b> · </span><Rotating /></BasicGlass></Desk> },
];
