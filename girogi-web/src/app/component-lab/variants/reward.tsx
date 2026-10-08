'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Cookie, Gift, PartyPopper, Sparkles } from 'lucide-react';
import { Button } from 'bongchil-design-system';
import type { Variant } from './shared';

/** 쿠폰 티켓 — 왼쪽 스텁(개수) · 절취선 · 본체(이름·조건·버튼). 다듬은 버전 */
function Ticket({ kind, n, cta, enter = false, tearing = false, onUse }: { kind: 'snack' | 'cheat'; n: number; cta: string; enter?: boolean; tearing?: boolean; onUse?: () => void }) {
  const snack = kind === 'snack';
  const bg = snack ? 'bg-comment-sand' : 'bg-comment-green';
  const fg = snack ? 'text-comment-sand-solid' : 'text-comment-green-solid';
  const Icon = snack ? Cookie : PartyPopper;
  return (
    <div className={`relative flex overflow-hidden rounded-[10px] ${bg} ${enter ? 'ticket-in' : ''} ${tearing ? 'ticket-tear' : ''}`} style={{ boxShadow: '0 2px 10px rgb(var(--shadow-ink)/0.08)' }}>
      {/* 스텁 */}
      <div className={`flex w-[68px] shrink-0 flex-col items-center justify-center gap-0.5 ${fg}`}>
        <Icon size={16} />
        <span className="text-[20px] font-bold leading-none tabular-nums text-ink">{n}</span>
        <span className="text-[9px] text-ink-4">{snack ? '개' : '장'}</span>
      </div>
      {/* 절취선 */}
      <div className="relative w-0 border-l border-dashed border-ink/25"><span className="absolute -left-[7px] -top-[7px] size-3.5 rounded-full bg-surface-warm" /><span className="absolute -bottom-[7px] -left-[7px] size-3.5 rounded-full bg-surface-warm" /></div>
      {/* 본체 */}
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5">
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-semibold text-ink">{snack ? '과자박스' : '치팅데이'}</div>
          <div className="mt-0.5 text-[10px] text-ink-4">{snack ? '3일 연속 성공마다 1개' : '7일 연속 성공 시 1장'}</div>
          <div className="mt-1 font-mono text-[8.5px] tracking-[0.2em] text-ink-5">GRG-{snack ? 'SNK' : 'CHT'}-{String(n).padStart(3, '0')}</div>
        </div>
        <Button variant="grain" tone="primary" size="xs" onClick={onUse}>{cta}</Button>
      </div>
    </div>
  );
}

function Earn() {
  const [tickets, setTickets] = useState([0, 1]);
  const earn = () => {
    setTickets((t) => [...t, t.length]);
    confetti({ particleCount: 70, spread: 60, startVelocity: 28, origin: { y: 0.7 }, colors: ['#5a8268', '#c8a050', '#e3efe7', '#f7e6de'], scalar: 0.8 });
  };
  return (
    <div>
      <div className="mb-3 flex items-center justify-between"><span className="text-[11px] text-ink-4">3일 연속 달성하는 순간</span><Button variant="dotted" tone="primary" size="sm" icon={Sparkles} onClick={earn}>획득 연출 보기</Button></div>
      <div className="space-y-2">{tickets.map((t, i) => <Ticket key={t} kind="snack" n={i + 1} cta="사용" enter={i === tickets.length - 1 && tickets.length > 2} />)}</div>
    </div>
  );
}
function Tear() {
  const [gone, setGone] = useState<number[]>([]);
  const [tearing, setTearing] = useState<number | null>(null);
  const use = (i: number) => { setTearing(i); setTimeout(() => { setGone((g) => [...g, i]); setTearing(null); }, 560); };
  return (
    <div className="space-y-2">
      {[0, 1, 2].filter((i) => !gone.includes(i)).map((i) => <Ticket key={i} kind={i === 2 ? 'cheat' : 'snack'} n={i === 2 ? 1 : 3 - i} cta={i === 2 ? '오늘 쓰기' : '사용'} tearing={tearing === i} onUse={() => use(i)} />)}
      {gone.length === 3 && <div className="py-6 text-center text-[12px] text-ink-4">다 썼어요. 3일 더 가면 또 하나.</div>}
    </div>
  );
}
function Flip() {
  const [f, setF] = useState(false);
  const face = 'absolute inset-0 flex items-center gap-3 rounded-[10px] px-4 [backface-visibility:hidden]';
  return (
    <button type="button" onClick={() => setF(!f)} className="relative h-[84px] w-full text-left [perspective:900px]">
      <span className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]" style={{ transform: `rotateY(${f ? 180 : 0}deg)` }}>
        <span className={`${face} bg-comment-sand`} style={{ boxShadow: '0 2px 10px rgb(var(--shadow-ink)/0.08)' }}><Cookie size={18} className="text-comment-sand-solid" /><span><span className="block text-[13px] font-semibold text-ink">과자박스 <span className="tabular-nums">3</span>개</span><span className="block text-[10.5px] text-ink-4">뒤집어서 규칙 보기</span></span><span className="ml-auto text-[10px] text-ink-4">↻</span></span>
        <span className={`${face} bg-surface [transform:rotateY(180deg)]`} style={{ boxShadow: '0 2px 10px rgb(var(--shadow-ink)/0.08)' }}><Gift size={16} className="text-ink-3" /><span className="text-[11px] leading-relaxed text-ink-2">3일 연속 성공 → 과자박스 1개<br />7일 연속 성공 → 치팅데이 1장<br /><span className="text-ink-4">실패해도 보유한 건 안 사라져요</span></span></span>
      </span>
    </button>
  );
}

export const REWARD: Variant[] = [
  { key: 'ticket', name: '쿠폰 티켓 (다듬음)', recommended: true, why: '스텁에 개수, 절취선, 본체에 이름·조건·일련번호·버튼. 일기장 감상 티켓의 규격을 보상에 맞춰 줄인 것.',
    Render: () => <div className="space-y-2"><Ticket kind="snack" n={3} cta="사용" /><Ticket kind="cheat" n={1} cta="오늘 쓰기" /></div> },
  { key: 'earn', name: '티켓 + 획득 연출', why: '3일 달성 순간 새 티켓이 3D로 넘어오며 꽂히고 컨페티. 버튼으로 연출을 미리 볼 수 있다. (canvas-confetti, 이미 설치돼 있음)',
    Render: () => <Earn /> },
  { key: 'tear', name: '티켓 + 절취 연출', why: '"사용"을 누르면 티켓이 찢겨 날아간다. 쓰는 행위에도 손맛. 다 쓰면 빈 상태 문구.',
    Render: () => <Tear /> },
  { key: 'flip', name: '3D 플립 카드', why: '앞면은 개수, 뒷면은 규칙. 규칙 설명 줄이 사라지고 카드가 한 줄로 납작해진다.',
    Render: () => <Flip /> },
  { key: 'book', name: '티켓북 (겹쳐 쌓기)', why: '여러 장을 부채꼴로 겹쳐 "쌓였다"를 보여준다. 개수가 많을수록 보기 좋고, 1장일 땐 밋밋하다.',
    Render: () => (
      <div className="relative h-[120px]">{[2, 1, 0].map((i) => <div key={i} className="absolute left-0 right-0" style={{ top: i * 14, transform: `rotate(${(i - 1) * 1.5}deg) scale(${1 - i * 0.03})`, zIndex: 3 - i, opacity: 1 - i * 0.25 }}><Ticket kind="snack" n={3 - i} cta="사용" /></div>)}</div>
    ) },
];
