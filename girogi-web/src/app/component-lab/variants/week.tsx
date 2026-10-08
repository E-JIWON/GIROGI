'use client';

import { DAYS, type Variant } from './shared';

const OK = new Set([1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20]);
const DONE: Record<number, number> = { 1: 3, 2: 2, 3: 2, 4: 1, 5: 3, 6: 2, 7: 3 }; // 그날 지킨 미션 수
const WEIGHED = new Set([1, 3, 4, 6, 7]);
const TODAY = 8;
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const Head = ({ right }: { right: React.ReactNode }) => <div className="mb-1.5 flex items-baseline justify-between px-0.5"><span className="text-[11px] font-medium text-ink-2">10월</span><span className="text-[10px] text-ink-4">{right}</span></div>;
const Week = () => <>{DAYS.map((d) => <span key={d} className="text-[9px] text-ink-5">{d}</span>)}{Array.from({ length: 3 }).map((_, i) => <span key={`p${i}`} />)}</>;
const kept = [...OK].filter((d) => d < TODAY).length;

export const WEEK_V: Variant[] = [
  { key: 'mini', name: '달력 미니', recommended: true, why: '진행 바를 뺐다. 오늘 = 채운 칸, 지킨 날 = 옅은 틴트, 놓친 날 = 글자만. 머리줄 "7일 중 7일 지킴" 하나로 요약.',
    Render: () => (
      <div><Head right={<>{TODAY - 1}일 중 <b className="tabular-nums text-primary">{kept}일</b> 지킴</>} />
        <div className="grid grid-cols-7 gap-[3px] text-center"><Week />{days.map((d) => <span key={d} className={`grid h-5 place-items-center rounded-[4px] text-[9.5px] tabular-nums ${d === TODAY ? 'bg-primary font-semibold text-white' : d < TODAY ? (OK.has(d) ? 'bg-primary/15 text-ink-2' : 'text-ink-4') : 'text-ink-5'}`}>{d}</span>)}</div>
      </div>
    ) },
  { key: 'runs', name: '연속 구간 잇기', why: '이어서 지킨 날들을 한 줄 띠로 잇는다. "몇 일 연속"이 끊김 없이 보이고, 끊긴 자리가 눈에 띈다.',
    Render: () => (
      <div><Head right={<>최장 연속 <b className="tabular-nums text-primary">7일</b></>} />
        <div className="grid grid-cols-7 gap-y-[3px] text-center"><Week />{days.map((d) => { const on = d <= TODAY && (OK.has(d) || d === TODAY); const L = on && d > 1 && (OK.has(d - 1)) && (d + 2) % 7 !== 0; const R = on && d < TODAY && (OK.has(d + 1) || d + 1 === TODAY) && (d + 3) % 7 !== 0; return <span key={d} className={`grid h-5 place-items-center text-[9.5px] tabular-nums ${on ? `bg-primary/20 text-ink ${L ? '' : 'rounded-l-full'} ${R ? '' : 'rounded-r-full'}` : 'text-ink-5'} ${d === TODAY ? '!bg-primary font-semibold text-white rounded-full' : ''}`}>{d}</span>; })}</div>
      </div>
    ) },
  { key: 'tone', name: '농도 달력', why: '그날 지킨 미션 수(0~3)를 색 농도로. 성공/실패 두 칸이 아니라 "얼마나"가 보인다. 아래 작은 범례.',
    Render: () => (
      <div><Head right={<>평균 <b className="tabular-nums text-primary">2.3</b>개</>} />
        <div className="grid grid-cols-7 gap-[3px] text-center"><Week />{days.map((d) => { const n = DONE[d]; const tone = d === TODAY ? 'ring-2 ring-primary text-ink' : n === 3 ? 'bg-primary text-white' : n === 2 ? 'bg-primary/55 text-white' : n === 1 ? 'bg-primary/20 text-ink-2' : d < TODAY ? 'bg-ink-5/25 text-ink-4' : 'text-ink-5'; return <span key={d} className={`grid h-5 place-items-center rounded-[4px] text-[9.5px] tabular-nums ${tone}`}>{d}</span>; })}</div>
        <div className="mt-1.5 flex items-center justify-end gap-1 text-[9px] text-ink-5">0 {[25, 20, 55, 100].map((o, i) => <span key={i} className="size-2 rounded-[2px]" style={{ background: i === 0 ? 'rgb(var(--shadow-ink)/0.12)' : `color-mix(in srgb, var(--color-primary) ${o}%, transparent)` }} />)} 3</div>
      </div>
    ) },
  { key: 'weigh', name: '달력 + 체중 잰 날', why: '지킨 날 틴트는 그대로, 체중을 잰 날엔 숫자 아래 점. "기록 습관"을 같이 본다. 프로필 패널의 체중 블록과 짝.',
    Render: () => (
      <div><Head right={<>체중 <b className="tabular-nums text-primary">5번</b> 잼</>} />
        <div className="grid grid-cols-7 gap-[3px] text-center"><Week />{days.map((d) => <span key={d} className={`relative grid h-6 place-items-center rounded-[4px] pb-1 text-[9.5px] tabular-nums ${d === TODAY ? 'bg-primary font-semibold text-white' : d < TODAY ? (OK.has(d) ? 'bg-primary/15 text-ink-2' : 'text-ink-4') : 'text-ink-5'}`}>{d}{WEIGHED.has(d) && <span className={`absolute bottom-[3px] size-1 rounded-full ${d === TODAY ? 'bg-white' : 'bg-comment-sand-solid'}`} />}</span>)}</div>
      </div>
    ) },
];
