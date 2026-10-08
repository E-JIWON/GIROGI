'use client';

import { ProfilePanel } from '../../home/_components/journal/profile-panel';
import { GRASS, WEIGHT as W, type Variant } from './shared';

const diff = W.current - W.yesterday;
const Head = () => (
  <div className="flex items-center gap-2.5">
    <span className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-primary-subtle text-[15px] font-bold text-primary" style={{ border: '2px dotted var(--color-primary-muted)' }}>다</span>
    <div className="min-w-0 flex-1"><div className="flex items-baseline justify-between"><span className="text-[13.5px] font-semibold text-ink">다이어터</span><span className="font-mono text-[10.5px] text-primary/60">D+31</span></div><div className="truncate text-[11px] text-ink-4">복싱 다이어트 도전 중!</div></div>
  </div>
);
const Grass = () => <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]">{GRASS.map((on, i) => <span key={i} className={`h-[7px] rounded-[2px] ${on ? 'bg-primary/80' : 'bg-ink-5/40'}`} />)}</div>;
const Ring = ({ p, label, sub }: { p: number; label: string; sub: string }) => (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 40 40" className="size-12 -rotate-90"><circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-border-strong)" strokeWidth="3.5" /><circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-primary)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="100.5" strokeDashoffset={100.5 * (1 - p / 100)} /></svg>
    <span className="mt-1 text-[10.5px] text-ink-2">{label}</span><span className="text-[9.5px] tabular-nums text-ink-4">{sub}</span>
  </div>
);

export const PROFILE: Variant[] = [
  { key: 'stack', name: '3단 쌓기', recommended: true, why: '이름 줄(아바타 40px = 글자 두 줄 높이) → 체중 블록(오늘 · 어제 대비 · 이번 달 · 전체) → 잔디. 한 줄에 하나씩이라 좁은 패널에서도 안 붐빈다. 홈에 적용됨.',
    Render: () => <ProfilePanel nickname="다이어터" bio="복싱 다이어트 도전 중!" totalDays={31} grass={GRASS} weight={W} /> },
  { key: 'rings', name: '3단 + 목표 링 둘', why: '목표 두 개를 막대 대신 링으로 나란히. 진행률이 한눈에 비교되지만 숫자(남은 kg)는 작아진다.',
    Render: () => (
      <div className="flex flex-col gap-3 px-1"><Head />
        <div className="rounded-[var(--radius-m)] bg-surface-subtle/70 px-3 py-2.5">
          <div className="flex items-baseline gap-1"><span className="text-[20px] font-semibold leading-none tabular-nums text-ink">{W.current}</span><span className="text-[10.5px] text-ink-4">kg</span><span className="ml-auto text-[11px] tabular-nums text-primary">어제 ▼{Math.abs(diff).toFixed(1)}</span></div>
          <div className="mt-2 flex justify-around"><Ring p={73} label="이번 달" sub="0.4 남음" /><Ring p={56} label="전체" sub="4.4 남음" /></div>
        </div><Grass />
      </div>
    ) },
  { key: 'cells', name: '3칸 수치', why: '체중 블록을 어제 · 이번 달 · 전체 세 칸 숫자로. 막대 없이 숫자만이라 가장 납작하고 정확하다.',
    Render: () => (
      <div className="flex flex-col gap-3 px-1"><Head />
        <div className="flex items-baseline gap-1 px-0.5"><span className="text-[22px] font-semibold leading-none tabular-nums text-ink">{W.current}</span><span className="text-[10.5px] text-ink-4">kg</span></div>
        <div className="grid grid-cols-3 divide-x divide-border rounded-[var(--radius-m)] border border-border">
          {[['어제', `▼${Math.abs(diff).toFixed(1)}`, 'text-primary'], ['이번 달', '-0.4', 'text-ink'], ['목표까지', '4.4', 'text-ink']].map(([l, v, c]) => <div key={l} className="px-1.5 py-1.5 text-center"><div className="text-[9.5px] text-ink-4">{l}</div><div className={`text-[12.5px] font-semibold tabular-nums ${c}`}>{v}</div></div>)}
        </div><Grass />
      </div>
    ) },
  { key: 'spark', name: '3단 + 7일 체중선', why: '어제 대비 숫자 옆에 최근 7일 체중 스파크라인. 하루 오르내림보다 흐름을 보게 해서 하루 +0.3에 덜 흔들린다.',
    Render: () => { const pts = [73.2, 73.0, 73.1, 72.8, 72.9, 72.7, 72.4]; const min = 72.2, max = 73.4; const d = pts.map((v, i) => `${(i / 6) * 100},${((max - v) / (max - min)) * 28}`).join(' '); return (
      <div className="flex flex-col gap-3 px-1"><Head />
        <div className="rounded-[var(--radius-m)] bg-surface-subtle/70 px-3 py-2.5">
          <div className="flex items-baseline gap-1"><span className="text-[20px] font-semibold leading-none tabular-nums text-ink">{W.current}</span><span className="text-[10.5px] text-ink-4">kg</span><span className="ml-auto text-[11px] tabular-nums text-primary">어제 ▼{Math.abs(diff).toFixed(1)}</span></div>
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-2 h-7 w-full"><polyline points={d} fill="none" stroke="var(--color-primary)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>
          <div className="mt-1 flex justify-between text-[9.5px] text-ink-4"><span>이번 달 0.4 남음</span><span>전체 4.4 남음</span></div>
        </div><Grass />
      </div>
    ); } },
];
