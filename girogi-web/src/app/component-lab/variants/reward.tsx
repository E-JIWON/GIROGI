'use client';

/**
 * 보상 시안 (4차) — 레퍼런스에서 뽑은 동작 하나씩
 * 1 젬 (60fps.design · Opal "Tap to Reveal Gem"): 연속 일수만큼 차오르는 보석, 꽉 차면 눌러서 깨뜨린다
 * 2 리퀴드 링 (reelfolio · Viscose "liquid ring that melts apart"): 7방울이 하나씩 차고, 다 차면 녹아 하나로 합쳐진다
 * 3 롤로덱스 (reelfolio · Rolodex "vertical scroll with 3D tilt"): 보상 카드가 3D 원통으로 돈다
 * 4 쏟아지는 폴더 (reelfolio · Folio "folder spills into a grid, fans across" + Comet 포물선): 폴더를 열면 쿠폰이 포물선으로 튀어나와 부채꼴로
 * 5 별 유리병 (brandguidelines · Starbucks 별 적립): 성공한 날마다 별이 병에 떨어져 쌓인다
 */

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ChevronDown, ChevronUp, Cookie, Lock, PartyPopper, Star } from 'lucide-react';
import { Button } from 'bongchil-design-system';
import type { Variant } from './shared';

const COLORS = ['#5a8268', '#c8a050', '#e3efe7', '#f7e6de', '#ffffff'];
const burst = (o: { x?: number; y?: number } = {}) => confetti({ particleCount: 70, spread: 70, startVelocity: 28, origin: { x: o.x ?? 0.5, y: o.y ?? 0.55 }, colors: COLORS, scalar: 0.85 });
const Caption = ({ children }: { children: React.ReactNode }) => <div className="mt-3 text-center text-[11.5px] text-ink-3">{children}</div>;

/* ─── 1. 젬 ─── */
function Gem() {
  const [days, setDays] = useState(2);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cracked, setCracked] = useState(false);
  const full = days >= 3;
  const level = (days / 3) * 100;
  const tap = () => {
    if (cracked) { setCracked(false); setDays(0); return; }
    if (!full) { setDays((d) => d + 1); return; }
    setCracked(true); burst({ y: 0.5 });
  };
  return (
    <div className="flex flex-col items-center py-2">
      <button type="button" onClick={tap} onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -22, y: ((e.clientX - r.left) / r.width - 0.5) * 22 }); }} onPointerLeave={() => setTilt({ x: 0, y: 0 })} className="[perspective:600px]" aria-label="젬">
        <div className="relative transition-transform duration-200" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${cracked ? 'scale(1.12) rotateY(360deg)' : ''}`, transition: cracked ? 'transform 0.9s cubic-bezier(0.34,1.4,0.64,1)' : undefined }}>
          <svg viewBox="0 0 120 120" className="size-[150px] drop-shadow-[0_14px_22px_rgba(60,55,45,0.25)]">
            <defs>
              <clipPath id="gem-clip"><polygon points="60,6 108,40 92,106 28,106 12,40" /></clipPath>
              <linearGradient id="gem-liquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fc4a0" /><stop offset="1" stopColor="#3f6250" /></linearGradient>
            </defs>
            <polygon points="60,6 108,40 92,106 28,106 12,40" fill="#f3f1ec" />
            <g clipPath="url(#gem-clip)">
              <g style={{ transform: `translateY(${120 - level * 1.05}px)`, transition: 'transform 0.9s cubic-bezier(0.34,1.2,0.64,1)' }}>
                <path d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6 V140 H0Z" fill="url(#gem-liquid)">
                  <animateTransform attributeName="transform" type="translate" values="0 0; -30 0; 0 0" dur="3s" repeatCount="indefinite" />
                </path>
              </g>
              {/* 면 */}
              <polygon points="60,6 82,40 38,40" fill="#fff" opacity="0.35" />
              <polygon points="12,40 38,40 28,106" fill="#000" opacity="0.06" />
              <polygon points="108,40 82,40 92,106" fill="#fff" opacity="0.18" />
              <polygon points="38,40 82,40 60,106" fill="#fff" opacity="0.08" />
            </g>
            <polygon points="60,6 108,40 92,106 28,106 12,40" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
            <polyline points="12,40 108,40" stroke="#fff" strokeWidth="1" opacity="0.6" />
            {full && !cracked && <circle cx="60" cy="60" r="56" fill="none" stroke="#8fc4a0" strokeWidth="2" opacity="0.6"><animate attributeName="r" values="50;62;50" dur="1.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.7;0;0.7" dur="1.6s" repeatCount="indefinite" /></circle>}
          </svg>
          {cracked && <div className="rise absolute left-1/2 top-1/2 -ml-[52px] -mt-[22px] w-[104px] rounded-[10px] bg-surface px-2 py-1.5 text-center shadow-m"><Cookie size={16} className="mx-auto text-comment-sand-solid" /><div className="text-[11px] font-semibold text-ink">과자박스 +1</div></div>}
        </div>
      </button>
      <Caption>{cracked ? '눌러서 새 젬 시작' : full ? <b className="text-primary">꽉 찼어요 — 눌러서 깨기</b> : <>젬 {days}/3 · 눌러서 하루 채우기 (데모)</>}</Caption>
    </div>
  );
}

/* ─── 2. 리퀴드 링 ─── */
function LiquidRing() {
  const [n, setN] = useState(5);
  const merged = n >= 7;
  const R = 54;
  const add = () => { if (merged) { setN(0); return; } const next = n + 1; setN(next); if (next === 7) setTimeout(() => burst({ y: 0.5 }), 650); };
  return (
    <div className="flex flex-col items-center py-1">
      <svg viewBox="-80 -80 160 160" className="size-[170px] overflow-visible">
        <defs>
          <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" /><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" /></filter>
          <radialGradient id="drop" cx="35%" cy="30%"><stop offset="0" stopColor="#9cc9a9" /><stop offset="1" stopColor="#3f6250" /></radialGradient>
        </defs>
        <circle r={R} fill="none" stroke="var(--color-border-strong)" strokeDasharray="2 5" />
        <g filter="url(#goo)">
          {Array.from({ length: 7 }).map((_, i) => {
            const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
            const on = i < n;
            const x = merged ? 0 : Math.cos(a) * R, y = merged ? 0 : Math.sin(a) * R;
            return <circle key={i} r={on ? (merged ? 20 : 13) : 6} fill={on ? 'url(#drop)' : '#d8d3c8'} style={{ transform: `translate(${x}px, ${y}px)`, transition: `transform 0.8s cubic-bezier(0.6,0,0.2,1) ${merged ? i * 40 : 0}ms, r 0.5s` }} />;
          })}
          {merged && <circle r="34" fill="url(#drop)" style={{ transformOrigin: 'center', animation: 'stamp-press 0.6s 0.55s both' }} />}
        </g>
        {merged ? <g style={{ animation: 'fade-up 0.4s 0.9s both' }}><text y="-2" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">치팅데이</text><text y="12" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.85">도착</text></g>
          : <text y="5" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--color-ink)">{n}<tspan fontSize="9" fill="var(--color-ink-4)">/7</tspan></text>}
      </svg>
      <div className="mt-2"><Button variant="grain" tone="primary" size="sm" onClick={add}>{merged ? '다시' : '하루 성공 (데모)'}</Button></div>
      <Caption>성공한 날마다 한 방울. 일곱 방울이 모이면 녹아 하나가 된다.</Caption>
    </div>
  );
}

/* ─── 3. 롤로덱스 ─── */
const CARDS = [
  { t: '과자박스', s: '10.02 · 3일 연속', I: Cookie, bg: 'linear-gradient(135deg,#f3e3bd,#d9b465)', ok: true },
  { t: '과자박스', s: '10.05 · 3일 연속', I: Cookie, bg: 'linear-gradient(135deg,#f3e3bd,#d9b465)', ok: true },
  { t: '치팅데이', s: '10.07 · 7일 연속', I: PartyPopper, bg: 'linear-gradient(135deg,#bfe0c8,#5a8268)', ok: true },
  { t: '과자박스', s: '10.08 · 3일 연속', I: Cookie, bg: 'linear-gradient(135deg,#f3e3bd,#d9b465)', ok: true },
  { t: '다음 보상', s: '2일 뒤 · 과자박스', I: Lock, bg: 'linear-gradient(135deg,#eeebe4,#d6d0c4)', ok: false },
];
function Rolodex() {
  const [idx, setIdx] = useState(3);
  const wheelLock = useRef(0);
  const go = (d: number) => setIdx((i) => Math.max(0, Math.min(CARDS.length - 1, i + d)));
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div onWheel={(e) => { const t = Date.now(); if (t - wheelLock.current < 220) return; wheelLock.current = t; go(e.deltaY > 0 ? 1 : -1); }} className="relative h-[220px] w-[240px] [perspective:700px]">
        {CARDS.map((c, i) => {
          const off = i - idx;
          const hidden = Math.abs(off) > 2;
          return (
            <button key={i} type="button" onClick={() => setIdx(i)} className="absolute inset-x-0 top-1/2 h-[96px] -mt-[48px] rounded-[16px] p-4 text-left transition-all duration-500" style={{ background: c.bg, transform: `translateY(${off * 46}px) translateZ(${-Math.abs(off) * 60}px) rotateX(${off * -28}deg)`, opacity: hidden ? 0 : 1 - Math.abs(off) * 0.28, zIndex: 10 - Math.abs(off), filter: off ? `blur(${Math.abs(off) * 0.6}px)` : 'none', boxShadow: off === 0 ? '0 16px 30px rgb(var(--shadow-ink)/0.22)' : '0 4px 10px rgb(var(--shadow-ink)/0.08)', pointerEvents: hidden ? 'none' : 'auto' }}>
              <span className="flex items-center gap-2"><c.I size={18} className={c.ok ? 'text-ink/70' : 'text-ink-4'} /><span className={`text-[15px] font-bold ${c.ok ? 'text-ink' : 'text-ink-4'}`}>{c.t}</span><span className="ml-auto font-mono text-[9px] tracking-[0.2em] text-ink/40">#{String(i + 1).padStart(3, '0')}</span></span>
              <span className="mt-1 block text-[11px] text-ink/60">{c.s}</span>
              {off === 0 && c.ok && <span className="mt-2 inline-block rounded-full bg-ink/85 px-2.5 py-0.5 text-[10.5px] text-white">사용하기</span>}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-1"><Button variant="glass" shape="round" icon={ChevronUp} aria-label="위" onClick={() => go(-1)} /><span className="text-center font-mono text-[10px] text-ink-4">{idx + 1}/{CARDS.length}</span><Button variant="glass" shape="round" icon={ChevronDown} aria-label="아래" onClick={() => go(1)} /></div>
    </div>
  );
}

/* ─── 4. 쏟아지는 폴더 ─── */
function Folder() {
  const [open, setOpen] = useState(false);
  const coupons = [{ t: '과자박스', I: Cookie, c: '#e8cf95' }, { t: '과자박스', I: Cookie, c: '#e8cf95' }, { t: '치팅데이', I: PartyPopper, c: '#a9cdb3' }, { t: '과자박스', I: Cookie, c: '#e8cf95' }];
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-2 mt-24 h-[110px] w-[170px]">
        {coupons.map((k, i) => {
          const mid = (coupons.length - 1) / 2;
          const x = (i - mid) * 74, y = -150 - Math.abs(i - mid) * -18, r = (i - mid) * 9;
          return (
            <div key={i} className="absolute left-1/2 top-4 -ml-[38px] flex h-[96px] w-[76px] flex-col items-center justify-center rounded-[10px] border border-white/60" style={{ background: k.c, zIndex: open ? 5 : 1, transform: open ? `translate(${x}px, ${y}px) rotate(${r}deg)` : `translate(0, ${8 + i * 2}px) rotate(${(i - mid) * 2}deg)`, transition: `transform 0.75s cubic-bezier(0.25,1.5,0.5,1) ${open ? i * 70 : (coupons.length - i) * 40}ms`, boxShadow: '0 8px 18px rgb(var(--shadow-ink)/0.18)' }}>
              <k.I size={20} className="text-ink/70" /><span className="mt-1.5 text-[10.5px] font-semibold text-ink">{k.t}</span><span className="font-mono text-[8px] text-ink/50">#{i + 1}</span>
            </div>
          );
        })}
        {/* 폴더 뒷판 · 앞판 */}
        <div className="absolute inset-x-0 bottom-0 h-[96px] rounded-[12px] rounded-tl-none" style={{ background: '#c9b48b', zIndex: 0 }}><span className="absolute -top-3 left-0 h-4 w-16 rounded-t-[8px]" style={{ background: '#c9b48b' }} /></div>
        <button type="button" onClick={() => { setOpen(!open); if (!open) setTimeout(() => burst({ y: 0.45 }), 500); }} className="absolute inset-x-0 bottom-0 z-[3] h-[84px] origin-bottom rounded-[12px] text-left transition-transform duration-500" style={{ background: 'linear-gradient(180deg,#e2cfa6,#d4bd8e)', transform: open ? 'rotateX(-38deg)' : 'none', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}>
          <span className="absolute bottom-3 left-4 text-[12.5px] font-bold text-ink/80">내 보상</span>
          <span className="absolute bottom-3 right-4 font-mono text-[11px] text-ink/60">{coupons.length}장</span>
        </button>
      </div>
      <Caption>{open ? '폴더를 다시 누르면 들어가요' : '폴더를 눌러 열기'}</Caption>
    </div>
  );
}

/* ─── 5. 별 유리병 ─── */
const SLOTS = [[-26, 0], [0, 0], [26, 0], [-13, -22], [13, -22], [-26, -44], [0, -44], [26, -44], [-13, -66], [13, -66]];
function Jar() {
  const [n, setN] = useState(5);
  const [last, setLast] = useState<number | null>(null);
  const [toast, setToast] = useState('');
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 1600); return () => clearTimeout(t); }, [toast]);
  const drop = () => {
    if (n >= SLOTS.length) { setN(0); return; }
    const next = n + 1; setN(next); setLast(next - 1);
    if (next % 3 === 0) setTimeout(() => { setToast('과자박스 +1'); burst({ y: 0.5 }); }, 520);
    if (next === 7) setTimeout(() => setToast('치팅데이 도착!'), 700);
  };
  return (
    <div className="flex flex-col items-center">
      <style>{`@keyframes star-drop{0%{transform:translate(var(--x),-150px) rotate(-90deg)}70%{transform:translate(var(--x),calc(var(--y) + 4px)) rotate(10deg)}85%{transform:translate(var(--x),calc(var(--y) - 6px)) rotate(-4deg)}100%{transform:translate(var(--x),var(--y)) rotate(0)}}`}</style>
      <div className="relative mt-4 h-[170px] w-[120px]">
        {/* 뚜껑 */}
        <div className="absolute left-1/2 top-0 z-10 h-4 w-[70px] -translate-x-1/2 rounded-[4px]" style={{ background: 'linear-gradient(180deg,#b9a27a,#9a845f)' }} />
        {/* 병 */}
        <div className="absolute inset-x-0 bottom-0 top-3 overflow-hidden rounded-b-[34px] rounded-t-[18px] border-2 border-white/70" style={{ background: 'linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,255,255,0.15) 40%,rgba(255,255,255,0.35))', boxShadow: 'inset 0 0 0 1px rgba(60,55,45,0.12), 0 12px 24px rgb(var(--shadow-ink)/0.12)', backdropFilter: 'blur(2px)' }}>
          {SLOTS.slice(0, n).map(([x, y], i) => (
            <Star key={i} size={22} className="absolute bottom-3 left-1/2 -ml-[11px]" fill={i % 3 === 2 ? '#c8a050' : '#5a8268'} stroke="none" style={{ ['--x' as string]: `${x}px`, ['--y' as string]: `${y}px`, transform: `translate(${x}px, ${y}px)`, animation: i === last ? 'star-drop 0.6s cubic-bezier(0.3,0.7,0.4,1) both' : undefined } as React.CSSProperties} />
          ))}
          <span className="pointer-events-none absolute left-3 top-4 h-[110px] w-2 rounded-full bg-white/60" />
        </div>
        {toast && <div className="fade-up absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-[11px] text-white">{toast}</div>}
      </div>
      <div className="mt-3 flex items-center gap-3"><span className="font-mono text-[11px] text-ink-3">{n}/{SLOTS.length}</span><Button variant="grain" tone="primary" size="sm" icon={Star} onClick={drop}>{n >= SLOTS.length ? '병 비우기' : '오늘 성공 (데모)'}</Button></div>
      <Caption>성공한 날마다 별 하나. 세 번째 별은 금색 — 과자박스.</Caption>
    </div>
  );
}

export const REWARD: Variant[] = [
  { key: 'gem', name: '차오르는 젬', recommended: true, why: '60fps.design · Opal "Tap to Reveal Gem". 연속 일수만큼 보석 안 액체가 출렁이며 차오르고, 꽉 차면 숨쉬는 테두리. 누르면 회전하며 깨지고 보상이 튀어나온다. 마우스로 기울기.', Render: () => <Gem /> },
  { key: 'ring', name: '녹아 합쳐지는 링', why: 'reelfolio · Viscose "liquid ring that melts apart". 7일을 일곱 방울로. 하나씩 차다가 7번째에 전부 가운데로 흘러 끈적하게 합쳐진다(SVG goo 필터).', Render: () => <LiquidRing /> },
  { key: 'rolodex', name: '롤로덱스', why: 'reelfolio · Rolodex "vertical scroll with a subtle 3D tilt". 받은 보상 카드가 3D 원통에 꽂혀 돈다. 휠·화살표·클릭으로 돌리고, 가운데 카드만 선명하게 "사용". 맨 끝엔 잠긴 다음 보상.', Render: () => <Rolodex /> },
  { key: 'folder', name: '쏟아지는 폴더', why: 'reelfolio · Folio "folder spills your work, fans it" + Comet 포물선. 폴더를 열면 쿠폰이 하나씩 튀어 올라 부채꼴로 펼쳐진다. 닫으면 역순으로 들어간다.', Render: () => <Folder /> },
  { key: 'jar', name: '별 유리병', why: 'brandguidelines · Starbucks 별 적립. 성공한 날마다 별이 위에서 떨어져 통통 튀며 병에 쌓인다. 3번째마다 금별(과자박스) + 컨페티, 7번째에 치팅데이.', Render: () => <Jar /> },
];
