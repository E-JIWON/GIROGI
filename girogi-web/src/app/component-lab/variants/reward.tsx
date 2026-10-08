'use client';

/**
 * 보상 시안 (5차) — "일기장 안에 원래 있을 법한 물건"에서 출발. 상태가 0.5초 안에 읽히는 것 우선
 * 1 스티커 시트 (수집·촉각): 성공일마다 잎 스티커가 칸에 붙고, 3칸·7칸이 차면 보상 스티커가 대지에 찍혀 나온다. 떼어서 오늘 일기에 붙이면 사용
 * 2 미래의 나에게서 온 편지 (편지·EFT): 연속일마다 봉투에 우표가 붙고, 7장이면 편지가 도착한다. 봉인을 뜯으면 치팅데이 + 한 줄. 과자박스는 3일마다 엽서
 * 3 압화 줄기 (성장): 성공일마다 잎이 돋고 3번째 잎에 꽃이 핀다. 꽃을 따면 페이지에 눌려 압화로 남는다. 7마디가 이어지면 리본
 * 4 주간 창문 (기록): 한 주 띠에 창문 7개. 성공한 날 창문이 열리고 그날 낙서가 보인다. 누적 3번째 창문엔 과자, 7개가 다 열리면 끝의 큰 창문
 * 5 포춘쿠키 접시 (촉각·깨기): 반죽 → 굽는 중 → 쿠키. 깨면 자기연민 한 줄. 치팅데이는 옆 종이봉투에 7일분 부스러기가 차오른다
 */

import { Button } from 'bongchil-design-system';
import { Apple, Cookie, Leaf, Moon, PartyPopper, Utensils } from 'lucide-react';
import { useState } from 'react';

import type { Variant } from './shared';

const SNACK_OF = 3, CHEAT_OF = 7;
const Caption = ({ children }: { children: React.ReactNode }) => <div className="mt-3 text-center text-[11.5px] text-ink-3">{children}</div>;
const DOODLE = [Apple, Utensils, Moon];

/** 다섯 시안이 공유하는 데모 상태 — 과자박스 2/3 · 연속 5/7 · 보유 과자박스 1 에서 시작 */
function useRewardDemo() {
  const [s, set] = useState({ snackProg: 2, streak: 5, snack: 1, cheat: 0, total: 5, rested: false });
  const success = () => set((p) => {
    const snackProg = p.snackProg + 1, streak = p.streak === CHEAT_OF ? 1 : p.streak + 1;
    return { snackProg: snackProg % SNACK_OF, snack: p.snack + (snackProg === SNACK_OF ? 1 : 0), streak, cheat: p.cheat + (streak === CHEAT_OF ? 1 : 0), total: p.total + 1, rested: false };
  });
  const rest = () => set((p) => ({ ...p, streak: 0, rested: true }));
  const useSnack = () => set((p) => ({ ...p, snack: Math.max(0, p.snack - 1) }));
  const useCheat = () => set((p) => ({ ...p, cheat: Math.max(0, p.cheat - 1) }));
  return { ...s, success, rest, useSnack, useCheat };
}

function DemoBar({ onSuccess, onRest, note }: { onSuccess: () => void; onRest: () => void; note?: string }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <Button variant="grain" tone="primary" size="sm" onClick={onSuccess}>하루 성공</Button>
      <Button variant="dotted" tone="muted" size="sm" onClick={onRest}>하루 쉼</Button>
      {note && <span className="text-[10.5px] text-ink-4">{note}</span>}
    </div>
  );
}

/** 사용한 보상이 붙는 "오늘 일기" 한 줄 */
function TodayLine({ used }: { used: ('snack' | 'cheat')[] }) {
  return (
    <div className="mt-3 flex items-center gap-2 border-t border-dashed border-ink/15 pt-2">
      <span className="text-[10.5px] text-ink-4">오늘 일기</span>
      <span className="h-px flex-1 bg-ink/10" />
      {used.map((u, i) => (
        <span key={i} className={`stamp-press inline-flex size-6 items-center justify-center rounded-full ${u === 'snack' ? 'bg-comment-sand text-comment-sand-solid' : 'bg-comment-green text-comment-green-solid'}`} style={{ transform: `rotate(${(i % 2 ? -1 : 1) * (6 + i * 3)}deg)` }}>
          {u === 'snack' ? <Cookie size={13} /> : <PartyPopper size={13} />}
        </span>
      ))}
      {used.length === 0 && <span className="text-[10.5px] text-ink-5">아직 붙인 게 없어요</span>}
    </div>
  );
}

/* ─── 1. 스티커 시트 ─── */
function StickerSheet() {
  const d = useRewardDemo();
  const [used, setUsed] = useState<('snack' | 'cheat')[]>([]);
  const [peeling, setPeeling] = useState<string | null>(null);
  const peel = (kind: 'snack' | 'cheat', id: string) => {
    if (peeling) return;
    setPeeling(id);
    setTimeout(() => { setPeeling(null); setUsed((u) => [...u, kind]); (kind === 'snack' ? d.useSnack : d.useCheat)(); }, 520);
  };
  const stickers = [...Array.from({ length: d.snack }, (_, i) => ({ kind: 'snack' as const, id: `s${i}` })), ...Array.from({ length: d.cheat }, (_, i) => ({ kind: 'cheat' as const, id: `c${i}` }))];
  return (
    <div>
      <style>{`@keyframes peel{0%{transform:rotate(0) scale(1)}35%{transform:rotate(-14deg) scale(1.15) translateY(-6px);box-shadow:0 10px 18px rgba(20,18,16,.25)}100%{transform:translateY(74px) rotate(8deg) scale(.7);opacity:0}}`}</style>
      {/* 스티커 대지 */}
      <div className="rounded-[10px] border border-ink/10 bg-surface p-3 shadow-s" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 7px, rgba(20,18,16,.025) 7px 8px)' }}>
        <div className="flex items-baseline justify-between"><span className="text-[12px] font-semibold text-ink-2">이번 주 스티커</span><span className="font-mono text-[10px] text-ink-4">연속 {d.streak}/{CHEAT_OF}</span></div>
        {/* 7칸 띠 — 연속 */}
        <div className="mt-2 flex gap-1.5">
          {Array.from({ length: CHEAT_OF }).map((_, i) => {
            const on = i < d.streak;
            const restMark = d.rested && i === d.streak;
            return (
              <span key={i} className={`relative flex h-9 flex-1 items-center justify-center rounded-[6px] border ${on ? 'border-transparent bg-comment-green' : 'border-dashed border-ink/15 bg-transparent'} transition-colors duration-300 motion-reduce:transition-none`}>
                {on && <Leaf size={15} className={`text-comment-green-solid ${i === d.streak - 1 ? 'stamp-press' : ''}`} style={{ transform: `rotate(${i % 2 ? 18 : -12}deg)` }} />}
                {restMark && <span className="font-mono text-[9px] text-ink-4">쉼</span>}
              </span>
            );
          })}
        </div>
        {/* 3칸 — 누적 */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            {Array.from({ length: SNACK_OF }).map((_, i) => <span key={i} className={`size-5 rounded-full border ${i < d.snackProg ? 'border-transparent bg-comment-sand' : 'border-dashed border-ink/15'} transition-colors duration-300`}>{i < d.snackProg && <span className="block size-full scale-50 rounded-full bg-comment-sand-solid" />}</span>)}
          </div>
          <span className="text-[10.5px] text-ink-4">과자박스까지 {SNACK_OF - d.snackProg}일 · 쉬어도 안 줄어요</span>
          <span className="h-px flex-1 bg-ink/10" />
          {/* 대지 위 보상 스티커 — 들뜬 그림자 */}
          <div className="flex gap-1.5">
            {stickers.map((st) => (
              <button key={st.id} type="button" onClick={() => peel(st.kind, st.id)} aria-label={`${st.kind === 'snack' ? '과자박스' : '치팅데이'} 스티커 떼기`}
                className={`stamp-press flex size-8 items-center justify-center rounded-full border-2 border-white shadow-[0_3px_6px_rgba(20,18,16,.18)] transition-transform hover:-translate-y-0.5 hover:rotate-6 motion-reduce:transition-none ${st.kind === 'snack' ? 'bg-comment-sand text-comment-sand-solid' : 'bg-comment-green text-comment-green-solid'}`}
                style={peeling === st.id ? { animation: 'peel 0.5s ease-in both' } : undefined}>
                {st.kind === 'snack' ? <Cookie size={15} /> : <PartyPopper size={15} />}
              </button>
            ))}
            {stickers.length === 0 && <span className="text-[10.5px] text-ink-5">뗄 스티커 없음</span>}
          </div>
        </div>
        <TodayLine used={used} />
      </div>
      <DemoBar onSuccess={d.success} onRest={d.rest} />
      <Caption>보상 스티커를 누르면 떼어져서 오늘 일기에 붙어요. 쉬는 날엔 띠에 ‘쉼’이 적힐 뿐 과자박스 칸은 그대로.</Caption>
    </div>
  );
}

/* ─── 2. 미래의 나에게서 온 편지 ─── */
function Letter() {
  const d = useRewardDemo();
  const [opened, setOpened] = useState(false);
  const arrived = d.cheat > 0;
  const stamps = arrived ? CHEAT_OF : d.streak;
  const open = () => { if (!arrived || opened) return; setOpened(true); };
  const take = () => { setOpened(false); d.useCheat(); };
  return (
    <div>
      <div className="relative mx-auto h-[236px] max-w-[360px] overflow-hidden rounded-[10px] bg-surface-warm" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 23px, rgba(20,18,16,.06) 23px 24px)' }}>
        {/* 엽서 — 과자박스 */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {Array.from({ length: d.snack }).map((_, i) => (
            <button key={i} type="button" onClick={d.useSnack} className="stamp-press relative h-[52px] w-[76px] rounded-[4px] border border-ink/10 bg-surface p-1.5 text-left shadow-s transition-transform hover:-rotate-2 motion-reduce:transition-none" style={{ transform: `rotate(${-3 + i * 2}deg)` }} aria-label="엽서 사용">
              <Cookie size={13} className="text-comment-sand-solid" /><span className="mt-0.5 block text-[9.5px] font-semibold text-ink-2">과자박스</span><span className="block text-[8px] text-ink-4">누르면 사용</span>
            </button>
          ))}
          <span className="text-[10px] text-ink-4">엽서 {d.snack}장 · 다음까지 {SNACK_OF - d.snackProg}일</span>
        </div>
        {/* 봉투 */}
        <button type="button" onClick={open} aria-label="편지" className="absolute left-1/2 w-[230px] -translate-x-1/2 transition-all duration-700 motion-reduce:transition-none [perspective:600px]" style={{ top: arrived ? 84 : 172, transitionTimingFunction: 'cubic-bezier(.34,1.2,.64,1)' }}>
          <div className="relative h-[130px] rounded-[6px] border border-ink/15 bg-[#f6efe1] shadow-m">
            {/* 우표 7장 */}
            <div className="absolute right-2 top-2 grid grid-cols-4 gap-1">
              {Array.from({ length: CHEAT_OF }).map((_, i) => (
                <span key={i} className={`flex size-[22px] items-center justify-center border border-dashed ${i < stamps ? 'border-comment-green-solid/40 bg-comment-green' : 'border-ink/15'} transition-colors duration-300`}>
                  {i < stamps && <Leaf size={11} className={`text-comment-green-solid ${i === stamps - 1 ? 'stamp-press' : ''}`} />}
                </span>
              ))}
            </div>
            <div className="absolute bottom-3 left-3 text-left"><span className="block text-[9px] text-ink-4">받는 사람</span><span className="block text-[12px] font-semibold text-ink-2" style={{ fontFamily: 'cursive' }}>7일 뒤의 나에게</span></div>
            {d.rested && !arrived && <span className="absolute left-3 top-3 rotate-[-8deg] rounded-[3px] border-2 border-comment-brown-solid/60 px-1.5 py-0.5 font-mono text-[9px] text-comment-brown-solid/80">보류 · 우표는 그대로</span>}
            {/* 덮개 + 봉인 */}
            <div className="absolute inset-x-0 top-0 h-[64px] origin-top transition-transform duration-700 motion-reduce:transition-none" style={{ transform: opened ? 'rotateX(-170deg)' : 'none', transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-ink/10 bg-[#efe6d2]" />
              {arrived && !opened && <span className="stamp-press absolute left-1/2 top-[44px] flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-comment-brown-solid shadow-s"><span className="size-5 rounded-full border border-white/40" /></span>}
            </div>
            {/* 편지지 */}
            {opened && <div className="stamp-press absolute inset-x-4 top-3 z-10 rounded-[4px] border border-ink/10 bg-surface p-3 text-left shadow-m"><span className="flex items-center gap-1.5 text-[12px] font-bold text-primary"><PartyPopper size={14} /> 치팅데이 1장</span><p className="mt-1 text-[10.5px] leading-snug text-ink-3">이번 주는 네가 해냈어. 오늘은 고르고 싶은 걸 골라.</p><Button variant="text" tone="primary" size="sm" onClick={take}>받기</Button></div>}
          </div>
        </button>
      </div>
      <DemoBar onSuccess={d.success} onRest={d.rest} note={arrived ? '봉인을 눌러 뜯기' : `우표 ${stamps}/${CHEAT_OF}`} />
      <Caption>연속한 날마다 우표 한 장. 일곱 장이면 편지가 페이지 위로 올라와요. 쉬면 ‘보류’ 도장만 찍히고 우표는 남아요.</Caption>
    </div>
  );
}

/* ─── 3. 압화 줄기 ─── */
function PressedFlower() {
  const d = useRewardDemo();
  const [pressed, setPressed] = useState(0);
  const [plucking, setPlucking] = useState(false);
  const leaves = Math.min(d.total, 10);
  const pluck = () => { if (!d.snack || plucking) return; setPlucking(true); setTimeout(() => { setPlucking(false); setPressed((p) => p + 1); d.useSnack(); }, 600); };
  const step = 15;
  return (
    <div>
      <style>{`@keyframes pluck{0%{transform:scale(1)}40%{transform:translate(18px,-10px) rotate(30deg) scale(1.1)}100%{transform:translate(120px,-30px) rotate(90deg) scaleY(.2);opacity:0}}@keyframes grow{0%{transform:scale(0)}100%{transform:scale(1)}}`}</style>
      <div className="relative mx-auto flex h-[200px] max-w-[360px] items-end rounded-[10px] bg-surface-warm px-4">
        <svg viewBox="0 0 120 180" className="h-[180px] w-[120px] overflow-visible">
          {/* 줄기 — 성공일 수만큼 */}
          <path d={`M60 180 Q58 ${180 - leaves * step * 0.5} 60 ${180 - leaves * step}`} fill="none" stroke="#5A8268" strokeWidth="2" strokeLinecap="round" className="transition-all duration-500 motion-reduce:transition-none" />
          {Array.from({ length: leaves }).map((_, i) => {
            const y = 180 - (i + 1) * step, left = i % 2 === 0, bloom = (i + 1) % SNACK_OF === 0, inStreak = i >= leaves - d.streak;
            return (
              <g key={i} style={{ transformOrigin: `60px ${y}px`, animation: i === leaves - 1 ? 'grow .4s cubic-bezier(.34,1.4,.64,1) both' : undefined }}>
                {/* 마디 (연속이면 진하게) */}
                <circle cx="60" cy={y} r="2" fill={inStreak ? '#5A8268' : '#C8C2B6'} />
                <path d={left ? `M60 ${y} q-18 -4 -22 -14 q14 -2 22 14` : `M60 ${y} q18 -4 22 -14 q-14 -2 -22 14`} fill={inStreak ? '#9fbfa9' : '#d2d8cf'} stroke={inStreak ? '#5A8268' : '#b8bdb4'} strokeWidth="0.8" />
                {bloom && (() => { const idx = Math.floor((i + 1) / SNACK_OF); const alive = idx > pressed && idx <= pressed + d.snack + (plucking ? 1 : 0); const isPlucking = plucking && idx === pressed + 1; return alive ? (
                  <g style={{ transformOrigin: `${left ? 32 : 88}px ${y - 16}px`, animation: isPlucking ? 'pluck .6s ease-in both' : undefined, cursor: 'pointer' }} onClick={pluck}>
                    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={left ? 32 : 88} cy={y - 22} rx="4" ry="7" fill="#f3dfae" stroke="#C8A050" strokeWidth="0.6" transform={`rotate(${a} ${left ? 32 : 88} ${y - 16})`} />)}
                    <circle cx={left ? 32 : 88} cy={y - 16} r="3.5" fill="#C8A050" />
                  </g>) : null; })()}
              </g>
            );
          })}
          {/* 리본 — 7마디 연속 */}
          {d.cheat > 0 && (() => { const t = 180 - leaves * step - 24; return <g className="stamp-press" style={{ transformOrigin: `60px ${t}px` }} onClick={d.useCheat} cursor="pointer"><ellipse cx="49" cy={t} rx="10" ry="5.5" fill="#9fbfa9" stroke="#5A8268" strokeWidth="1" transform={`rotate(-22 49 ${t})`} /><ellipse cx="71" cy={t} rx="10" ry="5.5" fill="#9fbfa9" stroke="#5A8268" strokeWidth="1" transform={`rotate(22 71 ${t})`} /><path d={`M60 ${t + 2} l-6 15 M60 ${t + 2} l6 15`} stroke="#5A8268" strokeWidth="2" strokeLinecap="round" /><circle cx="60" cy={t} r="3.5" fill="#5A8268" /></g>; })()}
        </svg>
        {/* 압화 — 쓴 보상 */}
        <div className="mb-4 ml-auto flex flex-col items-end gap-1">
          <span className="text-[10px] text-ink-4">압화 {pressed}장</span>
          <div className="flex gap-1">{Array.from({ length: pressed }).map((_, i) => <span key={i} className="stamp-press flex size-7 items-center justify-center rounded-[4px] border border-ink/10 bg-surface shadow-s"><span className="size-3 rounded-full bg-[#e9d39c] opacity-70" style={{ transform: `scaleY(.6) rotate(${i * 30}deg)` }} /></span>)}</div>
          <span className="mt-1 text-[10px] text-ink-4">잎 {leaves} · 연속 {d.streak}마디{d.cheat ? ' · 리본 = 치팅데이' : ''}</span>
          {d.snack > 0 && <span className="text-[10px] font-semibold text-comment-sand-solid">꽃 {d.snack}송이 — 눌러서 따기</span>}
        </div>
      </div>
      <DemoBar onSuccess={d.success} onRest={d.rest} />
      <Caption>성공일마다 잎 한 장, 세 번째 잎에 꽃. 꽃을 따면 옆에 압화로 눌려 남아요. 쉬면 마디 색만 옅어지고 잎은 떨어지지 않아요.</Caption>
    </div>
  );
}

/* ─── 4. 주간 창문 ─── */
function WeekWindows() {
  const d = useRewardDemo();
  const [week, setWeek] = useState<('ok' | 'rest' | null)[]>(['ok', 'ok', 'ok', 'ok', 'ok', null, null]);
  const [taken, setTaken] = useState<number[]>([]);
  const [bigClosed, setBigClosed] = useState(false);
  const idx = week.findIndex((w) => w === null);
  const rowFull = idx === -1;
  const mark = (v: 'ok' | 'rest') => { if (rowFull) { setWeek([v, null, null, null, null, null, null]); setTaken([]); setBigClosed(false); } else setWeek((w) => w.map((x, i) => (i === idx ? v : x))); (v === 'ok' ? d.success : d.rest)(); };
  const bigOpen = week.every((w) => w === 'ok') && !bigClosed;
  // 누적 3번째마다 과자가 든 창문 — 이 주 안에서의 전역 번호
  const base = d.total - week.filter((w) => w === 'ok').length;
  const okNo = week.reduce<number[]>((acc, w, i) => { acc[i] = w === 'ok' ? (i ? Math.max(...acc.slice(0, i)) : 0) + 1 : i ? Math.max(...acc.slice(0, i)) : 0; return acc; }, []);
  return (
    <div>
      <div className="rounded-[10px] bg-surface-warm p-3">
        <div className="mb-2 flex items-baseline justify-between"><span className="text-[12px] font-semibold text-ink-2">10월 둘째 주</span><span className="font-mono text-[10px] text-ink-4">열린 창문 {week.filter((w) => w === 'ok').length}/{CHEAT_OF}</span></div>
        <div className="flex gap-1.5">
          {week.map((w, i) => {
            const n = base + okNo[i];
            const hasCookie = w === 'ok' && n % SNACK_OF === 0 && !taken.includes(i);
            const Doodle = DOODLE[i % 3];
            return (
              <div key={i} className="relative aspect-[3/4] flex-1 [perspective:400px]">
                {/* 창문 안 */}
                <div className="absolute inset-0 flex items-center justify-center rounded-[5px] border border-ink/10 bg-surface">
                  {w === 'ok' && (hasCookie ? <button type="button" onClick={() => { setTaken((t) => [...t, i]); d.useSnack(); }} className="stamp-press flex size-7 items-center justify-center rounded-full bg-comment-sand text-comment-sand-solid shadow-s" aria-label="과자 꺼내기"><Cookie size={14} /></button> : taken.includes(i) ? <span className="font-mono text-[9px] text-ink-4">먹음</span> : <Doodle size={15} className="text-comment-green-solid/80" />)}
                </div>
                {/* 창문 문짝 */}
                <div className={`absolute inset-0 origin-left rounded-[5px] border transition-transform duration-500 motion-reduce:transition-none ${w === 'rest' ? 'border-ink/10 bg-surface-subtle' : 'border-ink/10 bg-[#efe6d2]'}`} style={{ transform: w === 'ok' ? 'rotateY(-150deg)' : 'none', backfaceVisibility: 'hidden' }}>
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-ink-4">{w === 'rest' ? '쉼' : ['월', '화', '수', '목', '금', '토', '일'][i]}</span>
                </div>
              </div>
            );
          })}
          {/* 큰 창문 — 치팅데이 */}
          <div className="relative aspect-[3/4] flex-[1.4] [perspective:400px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[5px] border border-primary/30 bg-comment-green">
              {d.cheat > 0 ? <button type="button" onClick={d.useCheat} className="stamp-press flex flex-col items-center text-primary" aria-label="치팅데이 사용"><PartyPopper size={18} /><span className="mt-0.5 text-[9px] font-semibold">치팅데이</span></button> : <span className="text-[9px] text-ink-4">사용함</span>}
            </div>
            <div className="absolute inset-0 origin-left rounded-[5px] border border-ink/10 bg-[#e6dcc4] transition-transform duration-700 motion-reduce:transition-none" style={{ transform: bigOpen ? 'rotateY(-150deg)' : 'none', backfaceVisibility: 'hidden' }}><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[9px] leading-tight text-ink-4">7일<br />연속</span></div>
          </div>
        </div>
        {/* 지난 주 띠 — 쌓인다 */}
        <div className="mt-2 flex gap-1.5 opacity-40">{['ok', 'ok', 'rest', 'ok', 'ok', 'ok', 'rest'].map((w, i) => <span key={i} className={`h-2 flex-1 rounded-[2px] ${w === 'ok' ? 'bg-comment-green-solid/60' : 'bg-ink/10'}`} />)}<span className="h-2 flex-[1.4] rounded-[2px] bg-ink/10" /></div>
        <div className="mt-1 text-[10px] text-ink-4">지난 주 · 과자박스까지 {SNACK_OF - d.snackProg}일 (주가 바뀌어도 이어져요)</div>
      </div>
      <DemoBar onSuccess={() => mark('ok')} onRest={() => mark('rest')} />
      <Caption>성공한 날 창문이 열리고 그날 낙서가 보여요. 누적 3번째 창문엔 과자, 일곱 개가 다 열리면 끝의 큰 창문이 열려요.</Caption>
    </div>
  );
}

/* ─── 5. 포춘쿠키 접시 ─── */
const FORTUNES = ['오늘 과자는 네 몫이야.', '사흘을 지켰어. 그걸로 충분해.', '맛있게 먹는 것도 계획의 일부야.'];
function FortuneCookie() {
  const d = useRewardDemo();
  const [cracked, setCracked] = useState(false);
  const [fi, setFi] = useState(0);
  const stage = d.snack > 0 ? 3 : d.snackProg; // 0 빈 접시 · 1 반죽 · 2 굽는 중 · 3 쿠키
  const crack = () => { if (stage < 3 || cracked) return; setCracked(true); };
  const finish = () => { setCracked(false); setFi((i) => (i + 1) % FORTUNES.length); d.useSnack(); };
  const crumbs = d.cheat > 0 ? CHEAT_OF : d.streak;
  return (
    <div>
      <style>{`@keyframes crackL{to{transform:translate(-26px,4px) rotate(-18deg)}}@keyframes crackR{to{transform:translate(26px,4px) rotate(18deg)}}@keyframes slip{0%{transform:translateY(6px) scaleX(.2);opacity:0}100%{transform:translateY(-18px) scaleX(1);opacity:1}}@keyframes bake{0%,100%{opacity:.5}50%{opacity:1}}`}</style>
      <div className="mx-auto flex max-w-[360px] items-end justify-center gap-8 rounded-[10px] bg-surface-warm px-4 pb-4 pt-6">
        {/* 접시 */}
        <div className="flex flex-col items-center">
          <div className="relative h-[90px] w-[150px]">
            {cracked && <div className="absolute left-1/2 top-2 z-10 w-[120px] -translate-x-1/2 rounded-[3px] border border-ink/10 bg-surface px-2 py-1 text-center text-[10px] leading-snug text-ink-2 shadow-s" style={{ animation: 'slip .5s .25s cubic-bezier(.34,1.3,.64,1) both' }}>{FORTUNES[fi]}</div>}
            <button type="button" onClick={crack} aria-label="쿠키" className="absolute left-1/2 top-[30px] -translate-x-1/2 [perspective:300px]">
              {stage === 0 && <span className="block h-6 w-10 rounded-full border border-dashed border-ink/15" />}
              {stage === 1 && <span className="stamp-press block size-9 rounded-[50%_50%_45%_55%] bg-[#e9dcc0] shadow-inner" />}
              {stage === 2 && <span className="block h-9 w-11 rounded-[50%_50%_45%_55%] bg-[#e2c48e]" style={{ animation: 'bake 1.2s ease-in-out infinite' }} />}
              {stage === 3 && (
                <span className="relative block h-10 w-14">
                  <span className="absolute inset-y-0 left-0 w-1/2 rounded-l-full bg-[#dfb86f] shadow-s" style={{ animation: cracked ? 'crackL .4s ease-out both' : undefined }} />
                  <span className="absolute inset-y-0 right-0 w-1/2 rounded-r-full bg-[#dfb86f] shadow-s" style={{ animation: cracked ? 'crackR .4s ease-out both' : undefined }} />
                  {!cracked && <span className="absolute left-1/2 top-1 h-8 w-px -translate-x-1/2 rotate-[8deg] bg-[#b8924a]/50" />}
                  {!cracked && d.snack > 1 && <span className="absolute -right-2 -top-2 rounded-full bg-comment-sand-solid px-1.5 font-mono text-[9px] text-white">×{d.snack}</span>}
                </span>
              )}
            </button>
            {/* 접시 */}
            <span className="absolute bottom-0 left-0 h-7 w-full rounded-[50%] border border-ink/10 bg-surface shadow-s" /><span className="absolute bottom-[7px] left-5 h-3 w-[110px] rounded-[50%] bg-surface-subtle" />
          </div>
          <span className="mt-2 text-[10.5px] text-ink-3">{cracked ? <Button variant="text" tone="primary" size="sm" onClick={finish}>잘 먹었어요</Button> : ['빈 접시', '반죽 1/3', '굽는 중 2/3', '쿠키 완성 — 눌러서 깨기'][stage]}</span>
        </div>
        {/* 종이봉투 — 치팅데이 */}
        <button type="button" onClick={d.cheat > 0 ? d.useCheat : undefined} aria-label="종이봉투" className="flex flex-col items-center">
          <div className="relative h-[86px] w-[64px] overflow-hidden rounded-b-[6px] border border-ink/10 bg-[#e8dcc3]" style={{ clipPath: 'polygon(6% 0,94% 0,100% 100%,0 100%)' }}>
            <span className="absolute inset-x-0 bottom-0 bg-[#c9a86a]/70 transition-[height] duration-500 motion-reduce:transition-none" style={{ height: `${(crumbs / CHEAT_OF) * 100}%` }} />
            {Array.from({ length: crumbs }).map((_, i) => <span key={i} className="absolute size-1.5 rounded-full bg-[#a9833f]" style={{ left: `${12 + ((i * 37) % 70)}%`, bottom: `${4 + i * 9}%` }} />)}
            {d.cheat > 0 && <span className="stamp-press absolute inset-x-0 top-1 flex justify-center"><PartyPopper size={14} className="text-primary" /></span>}
          </div>
          {d.cheat > 0 ? <span className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-primary"><span className="inline-block h-2 w-5 rounded-full bg-primary" />묶음 — 치팅데이</span> : <span className="mt-2 text-[10px] text-ink-4">부스러기 {crumbs}/{CHEAT_OF}</span>}
        </button>
      </div>
      <DemoBar onSuccess={d.success} onRest={d.rest} />
      <Caption>1일차 반죽, 2일차 굽는 중, 3일차 쿠키. 깨면 자기연민 한 줄. 봉투엔 연속일만큼 부스러기가 차고 일곱 번째에 묶여요.</Caption>
    </div>
  );
}

export const REWARD: Variant[] = [
  { key: 'sticker', name: '스티커 시트', recommended: true, why: '호보니치·미도리 다이어리에 끼워 두는 스티커 대지. 3칸·7칸이 같은 대지에 있어 과자박스·치팅데이·보유 수가 한곳에 모이고, "떼어서 오늘 일기에 붙인다"가 사용 행위와 정확히 맞는다.', Render: () => <StickerSheet /> },
  { key: 'letter', name: '미래의 나에게서 온 편지', why: 'EFT(미래 자아) 연계. 연속일마다 우표가 붙고 7장이면 봉투가 페이지 위로 올라온다. 밀랍 봉인을 뜯으면 치팅데이 + 미래의 내가 쓴 한 줄. 과자박스는 3일마다 오는 엽서.', Render: () => <Letter /> },
  { key: 'flower', name: '압화 줄기', why: 'Forest의 "키워서 쌓기"를 일기장 여백의 압화로. 잎 수 = 누적, 이어진 마디 = 연속이라 길이만 봐도 읽힌다. 꽃을 따면 페이지에 눌려 압화로 남는다.', Render: () => <PressedFlower /> },
  { key: 'windows', name: '주간 창문', why: '어드벤트 캘린더를 한 주 띠로. 열린 창문 수가 곧 상태고, 열린 창문 안에 그날 낙서가 있어 기록과 보상이 한 줄에 겹친다. 쉰 날은 닫힌 채 두고 지난 주 띠가 아래로 쌓인다.', Render: () => <WeekWindows /> },
  { key: 'cookie', name: '포춘쿠키 접시', why: '과자박스와 가장 직결된 물건. 반죽→굽는 중→쿠키 3단계가 3일 진행이고, 깨면 자기연민(Self-Compassion) 한 줄이 나온다. 치팅데이는 옆 종이봉투에 부스러기가 차는 걸로.', Render: () => <FortuneCookie /> },
];
