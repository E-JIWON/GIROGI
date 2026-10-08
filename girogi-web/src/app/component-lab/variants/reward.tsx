'use client';

/**
 * 보상 시안 — 레퍼런스
 * 1 스크래치: Focus Tree 스트릭 보상 (긁어야 보상이 드러남, "여는 것 자체가 보상")
 * 2 스탬프 카드: 카페 적립 도장판
 * 3 월렛 패스: Apple Wallet 카드 스택
 * 4 보물 상자: Duolingo 상자 열기 + 60fps.design 완료 컨페티
 * 5 메달: Apple Fitness 어워드 · Pulpwren 첫 스트릭 배지 (기울기 + 광택)
 */

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, Cookie, Gift, PartyPopper, Sparkles } from 'lucide-react';
import { Button } from 'bongchil-design-system';
import type { Variant } from './shared';

const burst = (y = 0.6) => confetti({ particleCount: 80, spread: 70, startVelocity: 30, origin: { y }, colors: ['#5a8268', '#c8a050', '#e3efe7', '#f7e6de', '#ffffff'], scalar: 0.85 });

/* 1. 스크래치 카드 */
function Scratch() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!; const r = c.getBoundingClientRect(); c.width = r.width; c.height = r.height;
    const g = ctx.createLinearGradient(0, 0, c.width, c.height); g.addColorStop(0, '#b9b2a3'); g.addColorStop(0.5, '#d9d3c6'); g.addColorStop(1, '#a9a293');
    ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < 400; i++) { ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.25})`; ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 1.5, 1.5); }
    ctx.fillStyle = 'rgba(60,55,45,0.75)'; ctx.font = '600 13px Pretendard, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('긁어서 열기', c.width / 2, c.height / 2 + 4);
    ctx.globalCompositeOperation = 'destination-out';
  }, [key]);
  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1 || revealed) return;
    const c = ref.current!; const ctx = c.getContext('2d')!; const r = c.getBoundingClientRect();
    ctx.beginPath(); ctx.arc(e.clientX - r.left, e.clientY - r.top, 16, 0, Math.PI * 2); ctx.fill();
  };
  const check = () => {
    const c = ref.current!; const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data; let clear = 0;
    for (let i = 3; i < d.length; i += 64) if (d[i] === 0) clear++;
    if (clear / (d.length / 64) > 0.45) { setRevealed(true); burst(); }
  };
  return (
    <div className="mx-auto max-w-[320px]">
      <div className="mb-2 text-center text-[11px] text-ink-4">3일 연속 달성! 오늘의 보상</div>
      <div className="relative h-[150px] overflow-hidden rounded-[16px] bg-gradient-to-br from-comment-sand to-surface shadow-m">
        <div className="absolute inset-0 flex flex-col items-center justify-center"><Cookie size={34} className="text-comment-sand-solid" /><div className="mt-2 text-[17px] font-bold text-ink">과자박스 1개</div><div className="text-[11px] text-ink-4">원하는 간식 하나, 오늘 당당하게</div></div>
        <canvas key={key} ref={ref} onPointerMove={scratch} onPointerDown={scratch} onPointerUp={check} className={`absolute inset-0 h-full w-full cursor-pointer touch-none transition-opacity duration-500 ${revealed ? 'opacity-0' : ''}`} />
      </div>
      <div className="mt-2 text-center"><Button variant="text" size="sm" onClick={() => { setRevealed(false); setKey((k) => k + 1); }}>다시 덮기</Button></div>
    </div>
  );
}

/* 2. 스탬프 카드 */
function Stamps() {
  const [n, setN] = useState(4);
  const [fresh, setFresh] = useState<number | null>(null);
  const stamp = () => { if (n >= 7) { setN(0); return; } const next = n + 1; setN(next); setFresh(next); if (next === 3 || next === 6 || next === 7) burst(0.65); };
  return (
    <div className="mx-auto max-w-[360px] rounded-[14px] border border-comment-brown-solid/20 p-4" style={{ background: 'linear-gradient(160deg,#fbf6ec,#f1e8d6)', boxShadow: '0 6px 20px rgb(var(--shadow-ink)/0.10)' }}>
      <div className="flex items-baseline justify-between"><span className="text-[13px] font-bold tracking-tight text-ink">GIROGI 도장판</span><span className="font-mono text-[10px] text-ink-4">NO. 0031</span></div>
      <div className="mt-0.5 text-[10.5px] text-ink-4">3칸마다 과자박스 · 7칸 채우면 치팅데이</div>
      <div className="mt-3 grid grid-cols-7 gap-1.5">{Array.from({ length: 7 }, (_, i) => i + 1).map((i) => { const on = i <= n; const prize = i === 3 || i === 6 ? 'snack' : i === 7 ? 'cheat' : null; return (
        <div key={i} className={`relative grid aspect-square place-items-center rounded-full border-[1.5px] border-dashed ${prize ? 'border-comment-sand-solid/70' : 'border-ink/20'}`}>
          {!on && (prize === 'snack' ? <Cookie size={13} className="text-comment-sand-solid/60" /> : prize === 'cheat' ? <PartyPopper size={13} className="text-primary/60" /> : <span className="text-[10px] text-ink-5">{i}</span>)}
          {on && <span className={`absolute inset-[-3px] grid place-items-center rounded-full bg-primary text-white ${fresh === i ? 'stamp-press' : ''}`} style={{ transform: 'rotate(-8deg)', boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)' }}><Check size={14} strokeWidth={3} /></span>}
        </div>
      ); })}</div>
      <div className="mt-3 flex items-center justify-between"><span className="text-[11px] text-ink-3">{n >= 7 ? '치팅데이 도착!' : n >= 3 ? `과자박스 ${Math.floor(n / 3)}개 받음` : `${3 - n}칸 더`}</span><Button variant="grain" tone="primary" size="sm" onClick={stamp}>{n >= 7 ? '새 도장판' : '오늘 도장'}</Button></div>
    </div>
  );
}

/* 3. 월렛 패스 */
function Wallet() {
  const [front, setFront] = useState(0);
  const passes = [
    { t: '과자박스', n: '3', unit: '개', sub: '3일 연속 성공마다 1개', bg: 'linear-gradient(135deg,#c8a050,#a8803a)', I: Cookie },
    { t: '치팅데이', n: '1', unit: '장', sub: '7일 연속 성공 · 오늘 사용 가능', bg: 'linear-gradient(135deg,#5a8268,#3f6250)', I: PartyPopper },
  ];
  return (
    <div className="relative mx-auto h-[220px] max-w-[340px]">
      {passes.map((p, i) => { const isFront = i === front; return (
        <button key={p.t} type="button" onClick={() => setFront(i)} className="absolute inset-x-0 overflow-hidden rounded-[14px] p-4 text-left text-white transition-all duration-500" style={{ background: p.bg, top: isFront ? 52 : 0, zIndex: isFront ? 2 : 1, transform: isFront ? 'none' : 'scale(0.95)', boxShadow: '0 10px 30px rgb(var(--shadow-ink)/0.25)' }}>
          <span className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 10% 0%, rgba(255,255,255,0.28), transparent 55%)' }} />
          <span className="relative flex items-center gap-2"><p.I size={15} /><span className="text-[12px] font-semibold tracking-wide">{p.t}</span><span className="ml-auto font-mono text-[10px] opacity-70">GIROGI PASS</span></span>
          <span className="relative mt-4 flex items-baseline gap-1"><span className="text-[34px] font-bold leading-none tabular-nums">{p.n}</span><span className="text-[12px] opacity-80">{p.unit}</span></span>
          <span className="relative mt-1 block text-[11px] opacity-80">{p.sub}</span>
          <span className="relative mt-3 flex items-end justify-between"><span className="block h-7 w-36 bg-[repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_3px,#fff_3px_5px,transparent_5px_8px)] opacity-80" /><span className="rounded-full bg-white/20 px-2.5 py-1 text-[10.5px] backdrop-blur">사용하기</span></span>
        </button>
      ); })}
    </div>
  );
}

/* 4. 보물 상자 */
function Chest() {
  const [st, setSt] = useState<'idle' | 'shake' | 'open'>('idle');
  const open = () => { if (st !== 'idle') { setSt('idle'); return; } setSt('shake'); setTimeout(() => { setSt('open'); burst(0.55); }, 1000); };
  return (
    <div className="flex flex-col items-center py-4">
      <div className={`relative mt-10 h-[90px] w-[120px] [perspective:400px] ${st === 'shake' ? 'shake' : ''}`}>
        {st === 'open' && <span className="glow-burst absolute -inset-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(200,160,80,0.55), transparent 65%)' }} />}
        {st === 'open' && <div className="rise absolute left-1/2 top-0 z-0 -ml-[46px] w-[92px] rounded-[10px] bg-surface p-2 text-center shadow-m"><Cookie size={18} className="mx-auto text-comment-sand-solid" /><div className="mt-1 text-[11px] font-semibold text-ink">과자박스 +1</div></div>}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[58px] rounded-b-[12px] rounded-t-[4px]" style={{ background: 'linear-gradient(180deg,#8a6a3e,#6d5230)', boxShadow: 'inset 0 -6px 0 rgba(0,0,0,0.15), 0 8px 18px rgb(var(--shadow-ink)/0.25)' }}><span className="absolute inset-x-0 top-3 h-2 bg-[#c8a050]" /><span className="absolute left-1/2 top-1 h-6 w-5 -translate-x-1/2 rounded-[4px] bg-[#e1c27a] ring-2 ring-[#8a6a3e]" /></div>
        <div className="absolute inset-x-0 top-[2px] z-20 h-[34px] origin-bottom rounded-t-[16px] transition-transform duration-500 [transform-style:preserve-3d]" style={{ background: 'linear-gradient(180deg,#9d7b4a,#7a5c35)', transform: st === 'open' ? 'translateY(-6px) rotateX(-115deg)' : 'none' }}><span className="absolute inset-x-0 bottom-2 h-2 bg-[#c8a050]" /></div>
      </div>
      <div className="mt-4 text-[12px] text-ink-3">{st === 'open' ? '3일 연속 달성 보상!' : '3일 연속 달성 — 상자가 도착했어요'}</div>
      <div className="mt-2"><Button variant="grain" tone="primary" size="sm" icon={Gift} onClick={open}>{st === 'open' ? '다시' : '열기'}</Button></div>
    </div>
  );
}

/* 5. 메달 (기울기 + 광택) */
function Medal({ label, sub, I, from, to, locked }: { label: string; sub: string; I: typeof Cookie; from: string; to: string; locked?: boolean }) {
  const [t, setT] = useState({ x: 0, y: 0, gx: 50, gy: 30 });
  return (
    <div className="flex flex-col items-center">
      <div onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; setT({ x: (0.5 - py) * 24, y: (px - 0.5) * 24, gx: px * 100, gy: py * 100 }); }} onPointerLeave={() => setT({ x: 0, y: 0, gx: 50, gy: 30 })} className="[perspective:500px]">
        <div className="relative grid size-[104px] place-items-center rounded-full transition-transform duration-150" style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`, background: locked ? 'linear-gradient(145deg,#e4e0d8,#cfc9bd)' : `linear-gradient(145deg,${from},${to})`, boxShadow: '0 10px 24px rgb(var(--shadow-ink)/0.22), inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -3px 0 rgba(0,0,0,0.12)' }}>
          <div className="grid size-[78px] place-items-center rounded-full" style={{ background: locked ? '#ebe7df' : 'rgba(255,255,255,0.18)', boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)' }}><I size={30} className={locked ? 'text-ink-5' : 'text-white'} strokeWidth={1.8} /></div>
          {!locked && <span className="pointer-events-none absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.55), transparent 45%)` }} />}
        </div>
      </div>
      <div className="mt-2.5 text-[12.5px] font-semibold text-ink">{label}</div>
      <div className="text-[10.5px] text-ink-4">{sub}</div>
    </div>
  );
}

export const REWARD: Variant[] = [
  { key: 'scratch', name: '스크래치 카드', recommended: true, why: 'Focus Tree. 보상이 가려져 있고 손가락으로 긁어야 나온다 — 받는 행위 자체가 보상. 45% 넘게 긁으면 컨페티. 직접 긁어봐.', Render: () => <Scratch /> },
  { key: 'stamps', name: '스탬프 카드', why: '카페 도장판. 7칸 중 3·6칸이 과자박스, 7칸이 치팅데이. "오늘 도장"을 누르면 도장이 쾅 찍힌다. 보상까지 몇 칸인지가 가장 직관적.', Render: () => <Stamps /> },
  { key: 'wallet', name: '월렛 패스', why: 'Apple Wallet. 보상이 진짜 "쓸 수 있는 카드"로 보인다. 누르면 앞으로 나온다. 색 그라데이션이 화면에서 가장 화려한 요소가 되므로 홈 한 군데만.', Render: () => <Wallet /> },
  { key: 'chest', name: '보물 상자', why: 'Duolingo 상자. 흔들리다 뚜껑이 열리고 보상 카드가 솟아오르며 컨페티. 획득 순간의 연출용 — 평소엔 닫힌 상자만 작게.', Render: () => <Chest /> },
  { key: 'medal', name: '기울어지는 메달', why: 'Apple Fitness 어워드 · Pulpwren 배지. 마우스(폰은 자이로)에 따라 기울고 광택이 따라 움직인다. 잠긴 메달은 회색. 컬렉션이 쌓이는 맛.',
    Render: () => <div className="flex flex-wrap justify-center gap-8 py-2"><Medal label="과자박스 ×3" sub="3일 연속" I={Cookie} from="#d9b465" to="#a9802f" /><Medal label="치팅데이" sub="7일 연속" I={PartyPopper} from="#6f9a7d" to="#3f6250" /><Medal label="한 달 완주" sub="잠김 · 30일" I={Sparkles} from="#000" to="#000" locked /></div> },
];
