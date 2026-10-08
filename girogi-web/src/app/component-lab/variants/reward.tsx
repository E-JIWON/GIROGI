'use client';

/**
 * 보상 시안 (6차) — 실제로 출시된 앱의 보상·스트릭 화면 패턴을 그대로 가져온다
 * 원칙: ① 홈 오른쪽 열 실제 폭(224px)에서 설계 ② 일러스트를 div로 그리지 않는다 — 3D 이모지 에셋(Microsoft Fluent Emoji, MIT)
 *       ③ 카드는 조용하게, 연출은 "받는 순간" 모달에만 ④ 받기 · 쓰기 흐름(모달 → 토스트)은 다섯 시안이 공유
 * 1 혜택 목록 (토스 혜택 탭): 문장형 헤드라인 + 3D 아이콘 행 + 오른쪽 "쓰기"
 * 2 퀘스트 (Duolingo 일일 퀘스트): 진행 바 끝에 상자. 다 차면 상자가 흔들리고, 눌러서 연다
 * 3 앞으로 7일 (스타벅스 별 트랙): 보유 개수 + "이대로 가면" 어느 날 무엇을 받는지 트랙에 미리 꽂아 둔다
 * 4 위젯 타일 (iOS 홈 화면 위젯): 2칸 정사각 타일, 큰 숫자, 보유하면 타일에 색이 든다
 * 5 이번 주 스트릭 (Duolingo 스트릭 · 스냅챗): 불꽃 + 연속 일수, 요일 동그라미, 7번째 칸에 치팅데이
 */

import { Button } from 'bongchil-design-system';
import confetti from 'canvas-confetti';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { FriendsMini } from '../../home/_components/journal/friends-mini';
import { MonthCalendar } from '../../home/_components/journal/month-calendar';

import type { Variant } from './shared';

/* ─── 공유: 데이터 · 흐름 ─── */

const SNACK_OF = 3;
const CHEAT_OF = 7;
const TODAY = new Date(2026, 9, 8);
const MONTH_DONE: Record<number, number> = { 1: 1, 2: 2, 3: 2, 4: 3, 5: 3, 6: 2, 7: 3 };
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

type Kind = 'snack' | 'cheat';
type EmojiName = 'cookie' | 'party' | 'fire' | 'gift' | 'sparkles';
type ModalState = { kind: Kind; mode: 'earned' | 'use' } | null;
interface DemoState { snackProg: number; streak: number; snack: number; cheat: number; best: number; rested: boolean }

const INIT: DemoState = { snackProg: 2, streak: 5, snack: 1, cheat: 0, best: 12, rested: false };
const META: Record<Kind, { name: string; emoji: EmojiName; bar: string; tint: string; text: string }> = {
  snack: { name: '과자박스', emoji: 'cookie', bar: 'bg-comment-sand-solid/75', tint: 'bg-comment-sand', text: 'text-comment-sand-solid' },
  cheat: { name: '치팅데이', emoji: 'party', bar: 'bg-primary-300', tint: 'bg-primary-light', text: 'text-primary' },
};
const COPY = {
  earned: {
    snack: { title: '과자박스를 받았어요', body: '성공일 세 번을 채웠어요. 먹고 싶던 과자 하나, 계획 안에서 즐겨요.', primary: '지금 쓰기', secondary: '나중에 쓸게요' },
    cheat: { title: '치팅데이를 받았어요', body: '7일을 이어왔어요. 하루는 마음 편히 먹고, 다음 날 다시 이어가면 돼요.', primary: '오늘 쓰기', secondary: '나중에 쓸게요' },
  },
  use: {
    snack: { title: '과자박스를 쓸까요?', body: '오늘 기록에 과자박스를 남겨 둘게요. 죄책감은 빼고요.', primary: '쓰기', secondary: '취소' },
    cheat: { title: '오늘을 치팅데이로 할까요?', body: '오늘 하루는 마음껏 먹어요. 내일 다시 이어가면 돼요.', primary: '치팅데이로 하기', secondary: '취소' },
  },
} as const;
const USED_TOAST: Record<Kind, string> = { snack: '과자박스를 썼어요 · 맛있게 드세요', cheat: '오늘은 치팅데이예요 · 즐겁게 드세요' };

const celebrate = () => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  confetti({ particleCount: 46, spread: 64, startVelocity: 30, origin: { y: 0.42 }, colors: ['#5A8268', '#C8A050', '#E3EFE7', '#F3DFAE'], scalar: 0.8, zIndex: 60 });
};

/** 다섯 시안이 공유하는 상태 — autoReveal=false면 받은 보상이 "열기 전" 상태로 쌓인다(퀘스트형) */
function useRewardFlow(autoReveal = true) {
  const [s, setS] = useState<DemoState>(INIT);
  const [pending, setPending] = useState<Kind[]>([]);
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<{ kind: Kind; msg: string } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const showToast = (kind: Kind) => {
    setToast({ kind, msg: USED_TOAST[kind] });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2400);
  };
  const success = () => {
    const snackProg = s.snackProg + 1;
    const streak = s.streak >= CHEAT_OF ? 1 : s.streak + 1;
    const earned: Kind[] = [...(snackProg === SNACK_OF ? ['snack' as const] : []), ...(streak === CHEAT_OF ? ['cheat' as const] : [])];
    const add = (k: Kind) => (autoReveal && earned.includes(k) ? 1 : 0);
    setS({ snackProg: snackProg % SNACK_OF, streak, best: Math.max(s.best, streak), rested: false, snack: s.snack + add('snack'), cheat: s.cheat + add('cheat') });
    if (!earned.length) return;
    if (autoReveal) { setModal({ kind: earned[earned.length - 1], mode: 'earned' }); celebrate(); } else setPending((p) => [...p, ...earned]);
  };
  const rest = () => setS({ ...s, streak: 0, rested: true });
  const reset = () => { setS(INIT); setPending([]); setModal(null); setToast(null); };
  const reveal = (k: Kind) => {
    setPending((p) => { const i = p.indexOf(k); return i < 0 ? p : [...p.slice(0, i), ...p.slice(i + 1)]; });
    setS((p) => ({ ...p, snack: p.snack + (k === 'snack' ? 1 : 0), cheat: p.cheat + (k === 'cheat' ? 1 : 0) }));
    setModal({ kind: k, mode: 'earned' });
    celebrate();
  };
  const askUse = (k: Kind) => setModal({ kind: k, mode: 'use' });
  const confirm = () => {
    if (!modal) return;
    const k = modal.kind;
    setS((p) => ({ ...p, snack: k === 'snack' ? Math.max(0, p.snack - 1) : p.snack, cheat: k === 'cheat' ? Math.max(0, p.cheat - 1) : p.cheat }));
    setModal(null);
    showToast(k);
  };
  const close = () => setModal(null);
  return { ...s, pending, modal, toast, success, rest, reset, reveal, askUse, confirm, close };
}
type Flow = ReturnType<typeof useRewardFlow>;

/** 오늘로부터 offset일 뒤 — 짧게(트랙 라벨) · 길게(문장) */
const weekdayOf = (offset: number) => WEEKDAY[new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + offset).getDay()];
const dayLabel = (offset: number) => (offset === 0 ? '오늘' : offset === 1 ? '내일' : weekdayOf(offset));
const dayWord = (offset: number) => (offset <= 1 ? dayLabel(offset) : `${weekdayOf(offset)}요일`);
/** 오늘은 아직 안 지킨 날 — n번 더 지키면 받는 날은 오늘 + (n-1) */
const dueWord = (n: number) => dayWord(n - 1);

/* ─── 공유: 조각 ─── */

function Emoji({ name, size, className = '' }: { name: EmojiName; size: number; className?: string }) {
  return <Image src={`/rewards/${name}.png`} alt="" width={size} height={size} draggable={false} className={`select-none ${className}`} />;
}

/** 숫자가 바뀔 때 아래에서 굴러 올라온다 */
function Num({ value, className = '' }: { value: number | string; className?: string }) {
  return <span className="inline-block overflow-hidden align-bottom"><span key={value} className={`inline-block tabular-nums motion-safe:animate-[reward-num_.32s_cubic-bezier(.2,.8,.2,1)] ${className}`}>{value}</span></span>;
}

function Bar({ value, of, tone, className = 'h-[5px]' }: { value: number; of: number; tone: string; className?: string }) {
  return (
    <span className={`block overflow-hidden rounded-full bg-ink-5/25 ${className}`}>
      <span className={`block h-full rounded-full ${tone} transition-[width] duration-500 ease-[cubic-bezier(.34,1.3,.64,1)] motion-reduce:transition-none`} style={{ width: `${Math.min(100, (value / of) * 100)}%` }} />
    </span>
  );
}

function SectionHeader({ meta }: { meta: string }) {
  return (
    <header className="mb-2 flex items-baseline gap-2 px-1">
      <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">보상</h2>
      <span className="text-[10.5px] text-ink-4">{meta}</span>
    </header>
  );
}

const CARD = 'overflow-hidden rounded-[14px] border border-border/60 bg-surface';

/** 가진 보상 — 이모지 + 개수 칩, 누르면 쓰기 */
function OwnedChips({ flow }: { flow: Flow }) {
  const owned = (['snack', 'cheat'] as const).filter((k) => flow[k] > 0);
  if (owned.length === 0) return <span className="text-[10.5px] text-ink-5">아직 없어요</span>;
  return (
    <span className="flex gap-1">
      {owned.map((k) => (
        <button key={k} type="button" onClick={() => flow.askUse(k)} aria-label={`${META[k].name} ${flow[k]}개 쓰기`} title={`${META[k].name} 쓰기`}
          className="flex items-center gap-0.5 rounded-full border border-border/70 bg-surface py-0.5 pl-0.5 pr-2 text-[11px] font-semibold text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-warm">
          <Emoji name={META[k].emoji} size={18} /><Num value={flow[k]} />
        </button>
      ))}
    </span>
  );
}

/** 받는 순간 · 쓰는 순간 — 모든 시안 공용 */
function RewardModal({ flow }: { flow: Flow }) {
  const { modal, confirm, close } = flow;
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, close]);
  if (!modal) return null;
  const m = COPY[modal.mode][modal.kind];
  const meta = META[modal.kind];
  const earned = modal.mode === 'earned';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={m.title}>
      <button type="button" aria-label="닫기" onClick={close} className="absolute inset-0 bg-ink/20 backdrop-blur-[3px] motion-safe:animate-[reward-fade_.2s_ease-out]" />
      <div className="relative w-full max-w-[300px] rounded-[24px] border border-border/60 bg-surface px-6 pb-5 pt-7 text-center shadow-l motion-safe:animate-[reward-rise_.32s_cubic-bezier(.2,.8,.2,1)]">
        <div className="relative mx-auto flex size-[112px] items-center justify-center">
          {earned && <span className={`absolute inset-2 rounded-full ${meta.tint} blur-xl motion-safe:animate-[reward-glow_2.4s_ease-in-out_infinite]`} />}
          <Emoji name={meta.emoji} size={earned ? 104 : 80} className="relative motion-safe:animate-[reward-pop_.6s_cubic-bezier(.34,1.5,.64,1)_.06s_both]" />
          {earned && <Emoji name="sparkles" size={30} className="absolute -right-1 top-1 motion-safe:animate-[reward-pop_.5s_cubic-bezier(.34,1.5,.64,1)_.3s_both]" />}
        </div>
        <h3 className="mt-3 text-[17px] font-bold tracking-tight text-ink">{m.title}</h3>
        <p className="mx-auto mt-1.5 max-w-[230px] text-[12.5px] leading-relaxed text-ink-3">{m.body}</p>
        <div className="mt-5 flex flex-col items-stretch gap-1">
          <Button variant="grain" tone="primary" onClick={confirm} className="w-full justify-center">{m.primary}</Button>
          <Button variant="text" tone="muted" size="sm" onClick={close} className="w-full justify-center">{m.secondary}</Button>
        </div>
      </div>
    </div>
  );
}

function Toast({ flow }: { flow: Flow }) {
  if (!flow.toast) return null;
  return (
    <div role="status" className="fixed bottom-28 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink py-2 pl-2.5 pr-4 text-[12px] text-surface shadow-m motion-safe:animate-[reward-rise_.25s_ease-out]">
      <Emoji name={META[flow.toast.kind].emoji} size={20} />{flow.toast.msg}
    </div>
  );
}

/** 시안을 홈 오른쪽 열 실제 폭(224px) 그대로, 위 달력 · 아래 친구 사이에 넣어 본다 */
function InSitu({ flow, children }: { flow: Flow; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-4 @xl:flex-row @xl:gap-8">
      <div className="flex w-[224px] shrink-0 flex-col gap-6">
        <div className="pointer-events-none rounded-[14px] border border-border/60 bg-surface p-3 opacity-45" aria-hidden><MonthCalendar today={TODAY} done={MONTH_DONE} /></div>
        {children}
        <div className="pointer-events-none opacity-45" aria-hidden><FriendsMini /></div>
      </div>
      <div className="flex flex-col gap-2 rounded-[12px] border border-dashed border-ink/15 p-3 @xl:sticky @xl:top-4">
        <span className="text-[10.5px] font-medium text-ink-4">데모 조작 (실제 화면엔 없음)</span>
        <div className="flex flex-wrap gap-1.5">
          <Button variant="dotted" tone="primary" size="sm" onClick={flow.success}>하루 성공</Button>
          <Button variant="dotted" tone="muted" size="sm" onClick={flow.rest}>하루 쉼</Button>
          <Button variant="dotted" tone="muted" size="sm" onClick={flow.reset}>처음으로</Button>
        </div>
        <span className="font-mono text-[10px] text-ink-4">과자 {flow.snackProg}/{SNACK_OF} · 연속 {flow.streak}/{CHEAT_OF} · 보유 🍪{flow.snack} 🎉{flow.cheat}</span>
      </div>
      <RewardModal flow={flow} />
      <Toast flow={flow} />
    </div>
  );
}

/* ─── 1. 혜택 목록 (토스 혜택 탭) ─── */

function BenefitRow({ kind, title, sub, action }: { kind: Kind; title: string; sub: string; action: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-surface-subtle"><Emoji name={META[kind].emoji} size={28} /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12.5px] font-semibold tracking-tight text-ink">{title}</span>
        <span className="block truncate text-[10.5px] text-ink-4">{sub}</span>
      </span>
      {action}
    </div>
  );
}

function Benefits() {
  const f = useRewardFlow();
  const snackLeft = SNACK_OF - f.snackProg;
  const cheatLeft = CHEAT_OF - (f.streak % CHEAT_OF);
  const usable = f.snack + f.cheat;
  const headline = usable > 0
    ? <>{f.cheat > 0 ? '치팅데이' : '과자박스'} <Num value={f.cheat > 0 ? f.cheat : f.snack} />{f.cheat > 0 ? '장을' : '개를'}<br />쓸 수 있어요</>
    : <>{dueWord(snackLeft)} 지키면<br />과자박스를 받아요</>;
  const spendBtn = (k: Kind) => <Button variant="grain" tone="primary" size="sm" onClick={() => f.askUse(k)}>쓰기</Button>;
  return (
    <InSitu flow={f}>
      <div>
        <SectionHeader meta="3일 · 7일 연속마다" />
        <div className={CARD}>
          <div className="px-3.5 pb-2 pt-3.5">
            <p className="text-[15px] font-bold leading-snug tracking-tight text-ink">{headline}</p>
            <p className="mt-1 text-[11px] text-ink-4">{f.rested ? '어제는 쉬었어요 · 과자박스는 그대로' : f.streak === CHEAT_OF ? '7일을 이어왔어요' : `치팅데이까지 ${cheatLeft}일 남았어요`}</p>
          </div>
          <div className="pb-1.5">
            <BenefitRow kind="snack" title="과자박스" sub={f.snack > 0 ? `${snackLeft}번 더 지키면 +1` : `${snackLeft}번 더 지키면 받아요`} action={f.snack > 0 ? spendBtn('snack') : <span className="font-mono text-[10.5px] text-ink-4">{f.snackProg}/{SNACK_OF}</span>} />
            <BenefitRow kind="cheat" title="치팅데이" sub={f.cheat > 0 ? `${f.cheat}장 있어요` : `${cheatLeft}일 더 이어가면 받아요`} action={f.cheat > 0 ? spendBtn('cheat') : <span className="text-[10.5px] tabular-nums text-ink-4">{cheatLeft}일</span>} />
          </div>
        </div>
      </div>
    </InSitu>
  );
}

/* ─── 2. 퀘스트 (Duolingo 일일 퀘스트) ─── */

function QuestRow({ title, sub, value, of, kind, ready, onOpen }: { title: string; sub: string; value: number; of: number; kind: Kind; ready: boolean; onOpen: () => void }) {
  return (
    <div className="px-3 py-3">
      <div className="text-[12.5px] font-semibold tracking-tight text-ink">{title}</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="relative block flex-1">
          <Bar value={ready ? of : value} of={of} tone={META[kind].bar} className="h-[16px]" />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-ink-2"><Num value={ready ? of : value} />&nbsp;/ {of}</span>
        </span>
        <button type="button" onClick={onOpen} disabled={!ready} aria-label={ready ? `${META[kind].name} 상자 열기` : `${META[kind].name} 상자`}
          className={`-my-2 shrink-0 transition-[filter,opacity] duration-300 ${ready ? 'cursor-pointer motion-safe:animate-[reward-wiggle_1.6s_ease-in-out_infinite]' : 'opacity-55 grayscale-[.6]'}`}>
          <Emoji name="gift" size={32} />
        </button>
      </div>
      <p className={`mt-1.5 text-[10.5px] ${ready ? `font-semibold ${META[kind].text}` : 'text-ink-4'}`}>{ready ? '다 채웠어요 · 상자를 눌러 열어요' : sub}</p>
    </div>
  );
}

function Quest() {
  const f = useRewardFlow(false);
  return (
    <InSitu flow={f}>
      <div>
        <SectionHeader meta="퀘스트 2개" />
        <div className={`${CARD} divide-y divide-border/60`}>
          <QuestRow kind="snack" title="성공일 3번 채우기" value={f.snackProg} of={SNACK_OF} ready={f.pending.includes('snack')} onOpen={() => f.reveal('snack')} sub="쉬는 날이 있어도 줄지 않아요" />
          <QuestRow kind="cheat" title="7일 연속 성공하기" value={f.streak % CHEAT_OF} of={CHEAT_OF} ready={f.pending.includes('cheat')} onOpen={() => f.reveal('cheat')} sub={f.rested ? '어제는 쉬었어요 · 오늘부터 다시 1일' : `${CHEAT_OF - (f.streak % CHEAT_OF)}일 더 이어가면 돼요`} />
          <div className="flex items-center gap-2 bg-surface-warm px-3 py-2">
            <span className="mr-auto whitespace-nowrap text-[10.5px] text-ink-4">가진 보상</span>
            <OwnedChips flow={f} />
          </div>
        </div>
      </div>
    </InSitu>
  );
}

/* ─── 3. 앞으로 7일 (스타벅스 별 트랙) ─── */

function Track() {
  const f = useRewardFlow();
  const ahead = Array.from({ length: 7 }, (_, d) => ({
    d,
    snack: (f.snackProg + d + 1) % SNACK_OF === 0,
    cheat: (f.streak % CHEAT_OF) + d + 1 === CHEAT_OF,
  }));
  const firstSnack = ahead.find((a) => a.snack)?.d;
  const firstCheat = ahead.find((a) => a.cheat)?.d;
  return (
    <InSitu flow={f}>
      <div>
        <SectionHeader meta="이대로 가면" />
        <div className={CARD}>
          {/* 보유 — 스타벅스 "별 잔액" 자리 */}
          <div className="grid grid-cols-2 divide-x divide-border/60 border-b border-border/60">
            {(['snack', 'cheat'] as const).map((k) => (
              <button key={k} type="button" disabled={f[k] === 0} onClick={() => f.askUse(k)} className="group flex items-center gap-2 px-3 py-2.5 text-left disabled:cursor-default">
                <Emoji name={META[k].emoji} size={26} className={f[k] === 0 ? 'opacity-40 grayscale' : ''} />
                <span className="min-w-0">
                  <span className="flex items-center gap-1"><span className="text-[20px] font-bold leading-none tracking-tight text-ink"><Num value={f[k]} /></span>{f[k] > 0 && <span className={`rounded-full ${META[k].tint} px-1.5 py-px text-[9.5px] font-semibold ${META[k].text} group-hover:brightness-95`}>쓰기</span>}</span>
                  <span className="mt-0.5 block text-[10px] text-ink-4">{META[k].name}</span>
                </span>
              </button>
            ))}
          </div>
          {/* 트랙 */}
          <div className="px-3 pb-3 pt-2">
            <div className="relative grid grid-cols-7">
              <span className="absolute inset-x-[7%] top-[37px] h-[2px] rounded-full bg-ink-5/30" />
              {ahead.map((a) => {
                const reward: Kind | null = a.cheat ? 'cheat' : a.snack ? 'snack' : null;
                return (
                  <div key={a.d} className="relative flex flex-col items-center">
                    <span className="flex h-[26px] items-end">{reward && <Emoji key={`${reward}-${f.snackProg}-${f.streak}`} name={META[reward].emoji} size={22} className="motion-safe:animate-[reward-pop_.45s_cubic-bezier(.34,1.5,.64,1)_both]" />}</span>
                    <span className="relative z-[1] mt-1.5 flex size-[12px] items-center justify-center">
                      <span className={`rounded-full ${reward ? `size-[10px] ${reward === 'cheat' ? 'bg-primary' : 'bg-comment-sand-solid'}` : 'size-[6px] bg-ink-5/50'} ${a.d === 0 ? 'ring-2 ring-primary/35 ring-offset-2 ring-offset-surface' : ''}`} />
                    </span>
                    <span className={`mt-1.5 text-[9.5px] ${a.d === 0 ? 'font-semibold text-ink-2' : reward ? 'font-medium text-ink-3' : 'text-ink-4'}`}>{dayLabel(a.d)}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-ink-3">
              {firstSnack !== undefined && <><b className="font-semibold text-ink-2">{dayWord(firstSnack)}</b> 지키면 과자박스</>}
              {firstSnack !== undefined && firstCheat !== undefined && <br />}
              {firstCheat !== undefined && <><b className="font-semibold text-ink-2">{dayWord(firstCheat)}</b>까지 이어가면 치팅데이</>}
            </p>
            {f.rested && <p className="mt-0.5 text-[10.5px] text-ink-4">어제 쉬어서 치팅데이 날짜만 밀렸어요</p>}
          </div>
        </div>
      </div>
    </InSitu>
  );
}

/* ─── 4. 위젯 타일 (iOS 홈 화면 위젯) ─── */

function Tile({ kind, count, value, of, foot, onUse }: { kind: Kind; count: number; value: number; of: number; foot: string; onUse: () => void }) {
  const has = count > 0;
  const m = META[kind];
  return (
    <button type="button" onClick={has ? onUse : undefined} disabled={!has}
      className={`flex aspect-square flex-col justify-between rounded-[18px] border p-2.5 text-left transition-[background-color,transform] duration-300 disabled:cursor-default ${has ? `${m.tint} border-transparent hover:-translate-y-0.5 active:scale-[.98]` : 'border-border/60 bg-surface'}`}>
      <span className="flex items-start justify-between">
        <Emoji name={m.emoji} size={34} className={has ? '' : 'opacity-50 grayscale-[.5]'} />
        {has && <span className={`rounded-full bg-surface/80 px-1.5 py-0.5 text-[9.5px] font-semibold ${m.text}`}>쓰기</span>}
      </span>
      <span>
        <span className="flex items-baseline gap-0.5">
          {has ? <><span className="text-[26px] font-bold leading-none tracking-tight text-ink"><Num value={count} /></span><span className="text-[11px] font-medium text-ink-3">{kind === 'snack' ? '개' : '장'}</span></>
            : <><span className="text-[26px] font-bold leading-none tracking-tight text-ink-3"><Num value={of - value} /></span><span className="text-[11px] font-medium text-ink-4">일</span></>}
        </span>
        <span className="mt-1 block text-[10.5px] font-medium text-ink-3">{has ? m.name : `${m.name}까지`}</span>
        <span className="mt-1.5 flex gap-[2px]">{Array.from({ length: of }).map((_, i) => <span key={i} className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${i < value ? (kind === 'snack' ? 'bg-comment-sand-solid' : 'bg-primary') : 'bg-ink-5/30'}`} />)}</span>
        <span className="mt-1 block text-[9.5px] text-ink-4">{foot}</span>
      </span>
    </button>
  );
}

function Widgets() {
  const f = useRewardFlow();
  const snackLeft = SNACK_OF - f.snackProg;
  const streakVal = f.streak % CHEAT_OF === 0 && f.streak > 0 ? CHEAT_OF : f.streak;
  return (
    <InSitu flow={f}>
      <div>
        <SectionHeader meta="3일 · 7일 연속마다" />
        <div className="grid grid-cols-2 gap-2">
          <Tile kind="snack" count={f.snack} value={f.snackProg} of={SNACK_OF} foot={`${snackLeft}번 더 지키면 +1`} onUse={() => f.askUse('snack')} />
          <Tile kind="cheat" count={f.cheat} value={streakVal} of={CHEAT_OF} foot={f.rested ? '오늘부터 다시 1일' : `${f.streak}일째 이어가는 중`} onUse={() => f.askUse('cheat')} />
        </div>
      </div>
    </InSitu>
  );
}

/* ─── 5. 이번 주 스트릭 (Duolingo 스트릭 · 스냅챗) ─── */

function Streak() {
  const f = useRewardFlow();
  const s = f.streak % CHEAT_OF === 0 && f.streak > 0 ? CHEAT_OF : f.streak; // 7을 채운 날은 7칸 다 찬 채로
  const full = s === CHEAT_OF;
  // 칸 i의 날짜 = 오늘 + (i - s). s칸은 오늘(아직 안 함)
  const slots = Array.from({ length: CHEAT_OF }, (_, i) => ({ i, offset: i - s, done: i < s }));
  const snackAt = (offset: number) => offset >= 0 && (f.snackProg + offset + 1) % SNACK_OF === 0;
  return (
    <InSitu flow={f}>
      <div>
        <SectionHeader meta="7일 연속이면 치팅데이" />
        <div className={CARD}>
          <div className="flex items-center gap-2 px-3 pt-3">
            <Emoji name="fire" size={30} className={f.streak === 0 ? 'opacity-40 grayscale' : ''} />
            <span className="flex items-baseline gap-1"><span className="text-[26px] font-bold leading-none tracking-tight text-ink"><Num value={f.streak} /></span><span className="text-[12px] font-medium text-ink-3">일 연속</span></span>
            <span className="ml-auto text-[10px] text-ink-4">최고 {f.best}일</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 px-3">
            {slots.map(({ i, offset, done }) => {
              const isToday = offset === 0;
              const last = i === CHEAT_OF - 1;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className={`text-[9.5px] ${isToday ? 'font-semibold text-ink-2' : 'text-ink-4'}`}>{isToday ? '오늘' : WEEKDAY[new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + offset).getDay()]}</span>
                  <span className={`relative flex size-[24px] items-center justify-center rounded-full transition-colors duration-300 ${done ? 'bg-primary' : isToday ? 'border-2 border-primary/50 bg-surface' : 'bg-surface-subtle'}`}>
                    {done && !last && <Check size={13} strokeWidth={3} className="text-white motion-safe:animate-[reward-pop_.35s_cubic-bezier(.34,1.5,.64,1)_both]" />}
                    {last && <Emoji name="party" size={done ? 20 : 18} className={done ? 'motion-safe:animate-[reward-pop_.5s_cubic-bezier(.34,1.5,.64,1)_both]' : 'opacity-70'} />}
                    {!last && snackAt(offset) && <Emoji name="cookie" size={13} className="absolute -right-1.5 -top-1.5" />}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2.5 px-3 text-[11px] text-ink-3">
            {full ? <b className="font-semibold text-primary">7일을 채웠어요</b> : f.rested ? '어제는 쉬었어요 · 오늘 다시 시작해요' : <><b className="font-semibold text-ink-2">{dueWord(CHEAT_OF - s)}</b>까지 이어가면 치팅데이</>}
          </p>
          <div className="mt-3 flex items-center gap-2 border-t border-border/60 bg-surface-warm px-3 py-2">
            <span className="mr-auto whitespace-nowrap text-[10.5px] text-ink-4">가진 보상</span>
            <OwnedChips flow={f} />
          </div>
        </div>
      </div>
    </InSitu>
  );
}

export const REWARD: Variant[] = [
  { key: 'benefits', name: '혜택 목록', recommended: true, why: '토스 혜택 탭 패턴. 숫자 대신 문장 헤드라인("과자박스 1개를 쓸 수 있어요")이 먼저 읽히고, 3D 아이콘 행 오른쪽에 바로 "쓰기". 224px에서 가장 덜 붐비고, 지금 홈의 리스트 결을 그대로 잇는다.', Render: () => <Benefits /> },
  { key: 'quest', name: '퀘스트', why: 'Duolingo 일일 퀘스트 그대로. 진행 바 안에 2 / 3, 끝에 상자. 다 차면 상자가 흔들리고 눌러서 연다 — "받는 행위"가 하나 생겨서 보상감이 가장 크다. 아래 줄에 가진 보상 칩.', Render: () => <Quest /> },
  { key: 'track', name: '앞으로 7일', why: '스타벅스 별 트랙 + 배송 조회. 위엔 보유 개수, 아래엔 "이대로 가면" 어느 날 무엇을 받는지 7일 트랙에 미리 꽂아 둔다. 내일 받을 게 보이면 오늘 안 깨고 싶어진다.', Render: () => <Track /> },
  { key: 'widgets', name: '위젯 타일', why: 'iOS 홈 화면 위젯. 정사각 타일 2개, 큰 숫자 하나씩. 가진 게 있으면 타일에 색이 들고 "쓰기"가 붙는다. 없으면 D-n. 가장 빨리 읽힌다.', Render: () => <Widgets /> },
  { key: 'streak', name: '이번 주 스트릭', why: 'Duolingo 스트릭 · 스냅챗. 불꽃 + 연속 일수, 요일 동그라미에 체크, 7번째 칸에 치팅데이가 미리 앉아 있다. 과자박스 받는 날엔 작은 쿠키 배지. 아래 줄에 보유 + 쓰기.', Render: () => <Streak /> },
];
