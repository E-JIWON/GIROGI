'use client';

/**
 * 보상 시안 (3차) — 화려한 연출 대신 "앱의 다른 화면과 같은 종이 결"에서 출발.
 * 1 패스 리스트: iOS 설정 · Wallet 목록처럼 아이콘 타일 + 이름 + 진행 눈금 (홈 적용)
 * 2 감상 티켓: bongchil-diary archive-ticket 규격을 보상에 (포스터 · 절취선 · 바코드)
 * 3 영수증: 감열지 영수증 — 언제 무엇을 받았는지 기록이 쌓인다
 * 4 포스트잇: 디자인 시스템 PostItCard + 테이프
 * 5 숫자만: 에디토리얼 — 큰 숫자 · 가는 선 · 텍스트 링크
 */

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Cookie, PartyPopper } from 'lucide-react';
import { PostItCard } from 'bongchil-design-system';
import { RewardPass } from '../../home/_components/journal/reward-pass';
import type { Variant } from './shared';

const NOISE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='128' height='128' filter='url(%23p)' opacity='0.18'/%3E%3C/svg%3E\")";

function Ticket({ kind }: { kind: 'snack' | 'cheat' }) {
  const [flip, setFlip] = useState(false);
  const snack = kind === 'snack';
  const poster = snack ? 'linear-gradient(160deg,#e8cf95 0%,#c8a050 55%,#a27c33 100%)' : 'linear-gradient(160deg,#9cc0a6 0%,#5a8268 55%,#3f6250 100%)';
  const face = 'absolute inset-0 flex flex-col rounded-[10px] bg-surface p-[9px] [backface-visibility:hidden]';
  const shadow = { boxShadow: '0 1px 2px rgb(var(--shadow-ink)/0.08), 0 10px 24px rgb(var(--shadow-ink)/0.10)' };
  return (
    <button type="button" onClick={() => { setFlip(!flip); if (!flip) confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 }, colors: ['#5a8268', '#c8a050', '#fff'], scalar: 0.7 }); }} className="relative h-[232px] w-[150px] text-left [perspective:900px]">
      <span className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]" style={{ transform: `rotateY(${flip ? 180 : 0}deg)` }}>
        <span className={face} style={shadow}>
          <span className="pb-2 pt-0.5 text-center font-mono text-[8px] tracking-[0.26em] text-ink-5">GIROGI · REWARD</span>
          <span className="relative flex flex-1 flex-col items-center justify-end overflow-hidden rounded-[6px] pb-3" style={{ background: poster }}>
            <span className="absolute inset-0" style={{ backgroundImage: NOISE, mixBlendMode: 'overlay' }} />
            <span className="absolute inset-0" style={{ background: 'radial-gradient(90% 60% at 30% 10%, rgba(255,255,255,0.35), transparent 60%)' }} />
            {snack ? <Cookie size={22} className="relative mb-auto mt-4 text-white/85" strokeWidth={1.6} /> : <PartyPopper size={22} className="relative mb-auto mt-4 text-white/85" strokeWidth={1.6} />}
            <span className="relative text-[38px] font-extrabold leading-none tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.25)]">{snack ? '×3' : '×1'}</span>
            <span className="relative mt-1.5 font-mono text-[8px] uppercase tracking-[0.28em] text-white/80">{snack ? 'snack box' : 'cheat day'}</span>
          </span>
          <span className="mt-2.5 grid grid-cols-2 gap-1 px-0.5">
            <span><span className="block text-[8.5px] font-semibold text-ink-5">보유</span><span className="block text-[11px] text-ink-2">{snack ? '3개' : '1장'}</span></span>
            <span><span className="block text-[8.5px] font-semibold text-ink-5">{snack ? '다음' : '상태'}</span><span className="block text-[11px] text-ink-2">{snack ? '2일 뒤' : '오늘 가능'}</span></span>
          </span>
          <span className="relative mt-2 border-t border-dashed border-ink/15 pt-2"><span className="block h-4 bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_1px,transparent_1px_3px,var(--color-ink)_3px_4px,transparent_4px_7px)] opacity-70" /></span>
        </span>
        <span className={`${face} items-center justify-center gap-2 [transform:rotateY(180deg)]`} style={shadow}>
          <span className="font-mono text-[8px] tracking-[0.26em] text-ink-5">USE THIS TICKET</span>
          <span className="text-[13px] font-semibold text-ink">{snack ? '과자박스 1개 사용' : '치팅데이 사용'}</span>
          <span className="px-3 text-center text-[10.5px] leading-relaxed text-ink-4">{snack ? '원하는 간식 하나, 오늘은 당당하게.' : '오늘은 마음껏. 내일 다시 시작.'}</span>
          <span className="mt-2 rounded-full bg-primary px-3 py-1 text-[11px] text-white">사용하기</span>
        </span>
      </span>
    </button>
  );
}

function Receipt() {
  const lines = [['10.02', '3일 연속', '+ 과자박스'], ['10.05', '3일 연속', '+ 과자박스'], ['10.06', '사용', '− 과자박스'], ['10.07', '7일 연속', '+ 치팅데이'], ['10.08', '3일 연속', '+ 과자박스']];
  return (
    <div className="mx-auto w-[260px] bg-[#fdfcf8] px-5 pb-6 pt-5 font-mono text-ink-2" style={{ boxShadow: '0 8px 22px rgb(var(--shadow-ink)/0.12)', WebkitMaskImage: 'linear-gradient(-45deg,transparent 6px,#000 6px),linear-gradient(45deg,transparent 6px,#000 6px)', WebkitMaskPosition: 'bottom', WebkitMaskSize: '12px 100%', WebkitMaskRepeat: 'repeat-x' }}>
      <div className="text-center text-[12px] font-bold tracking-[0.3em] text-ink">GIROGI</div>
      <div className="mt-0.5 text-center text-[9px] text-ink-4">보상 내역 · 2026.10</div>
      <div className="my-3 border-t border-dashed border-ink/25" />
      {lines.map(([d, w, r]) => <div key={d + r} className="flex justify-between py-0.5 text-[10.5px]"><span className="text-ink-4">{d}</span><span className="flex-1 px-2 text-ink-3">{w}</span><span className={r.startsWith('−') ? 'text-ink-4' : 'text-ink'}>{r}</span></div>)}
      <div className="my-3 border-t border-dashed border-ink/25" />
      <div className="flex justify-between text-[11px]"><span>과자박스</span><b className="text-ink">3</b></div>
      <div className="flex justify-between text-[11px]"><span>치팅데이</span><b className="text-primary">1</b></div>
      <div className="mt-4 text-center text-[9px] tracking-[0.2em] text-ink-5">* 오늘도 수고했어요 *</div>
    </div>
  );
}

export const REWARD: Variant[] = [
  { key: 'pass', name: '패스 리스트', recommended: true, why: '앱 다른 카드와 같은 흰 종이 + 가는 테두리. 줄마다 색 타일 아이콘 · 이름과 개수 · 다음 보상까지 눈금 · 오른쪽 "사용". 장식 없이 정보만 — 오른쪽 열(224px)에 맞춤. 홈에 적용됨.',
    Render: () => <div className="max-w-[260px]"><RewardPass snackBoxCount={3} consecutiveDietDays={7} /></div> },
  { key: 'ticket', name: '감상 티켓', why: '일기장 archive-ticket 규격 그대로 — 포스터(그레인 + 빛) · 필드 두 칸 · 절취선 · 바코드. 누르면 뒤집혀 사용 화면. 프로필 "보상" 탭이나 획득 순간에 어울린다.',
    Render: () => <div className="flex flex-wrap justify-center gap-4 py-2"><Ticket kind="snack" /><Ticket kind="cheat" /></div> },
  { key: 'receipt', name: '영수증', why: '감열지 영수증. 언제 받고 언제 썼는지 기록이 아래로 쌓이고 맨 아래 잔액. 보상을 "숫자"가 아니라 "이력"으로 보여준다. 톱니 하단은 CSS 마스크.',
    Render: () => <Receipt /> },
  { key: 'postit', name: '포스트잇', why: '디자인 시스템 PostItCard. 냉장고에 붙은 메모처럼 가볍다. 다락방 벽 · 끄적끄적 결과 이어지지만, 개수 · 진행 정보는 못 담는다.',
    Render: () => <div className="flex flex-wrap justify-center gap-5 py-3"><div style={{ rotate: '-2deg' }}><PostItCard from="기로기" color="yellow" tape width={170} caption={'과자박스 3개\n오늘 하나 써도 돼요'} /></div><div style={{ rotate: '1.5deg' }}><PostItCard from="기로기" color="green" tape width={170} caption={'치팅데이 도착\n7일 버틴 나에게'} /></div></div> },
  { key: 'numbers', name: '숫자만', why: '상자도 타일도 없이 큰 숫자 · 가는 구분선 · 텍스트 링크. 가장 조용하다. 잉크 에디토리얼 톤이라 주변이 시끄러울 때 쉼표 역할.',
    Render: () => (
      <div className="mx-auto max-w-[280px] divide-y divide-border">
        {[['과자박스', '3', '다음까지 2일', 'text-ink'], ['치팅데이', '1', '오늘 쓸 수 있어요', 'text-primary']].map(([n, v, s, c]) => (
          <div key={n} className="flex items-end gap-4 py-3"><span className={`text-[44px] font-light leading-none tabular-nums tracking-tight ${c}`}>{v}</span><span className="min-w-0 flex-1 pb-1"><span className="block text-[12.5px] font-semibold text-ink">{n}</span><span className="block text-[10.5px] text-ink-4">{s}</span></span><span className="pb-1 text-[11px] text-primary underline decoration-primary/30 underline-offset-4">사용</span></div>
        ))}
      </div>
    ) },
];
