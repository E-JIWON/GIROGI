'use client';

import { Button } from 'bongchil-design-system';
import { WeekStrip } from '../../home/_components/journal/week-strip';
import { DAYS, WEEK, type Variant } from './shared';

const OK = new Set([1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20]); // 17일
const TODAY = 8;

function MiniCalendar({ tone = 'quiet' }: { tone?: 'quiet' | 'card' }) {
  const kept = [...OK].filter((d) => d < TODAY).length;
  const passed = TODAY - 1;
  return (
    <div className={tone === 'card' ? 'rounded-[var(--radius-m)] border border-primary/15 bg-primary-subtle/30 p-2' : ''}>
      <div className="mb-1.5 flex items-baseline justify-between px-0.5">
        <span className="text-[11px] font-medium text-ink-2">10월</span>
        <span className="text-[10px] text-ink-4">{passed}일 중 <b className="tabular-nums text-primary">{kept}일</b> 지킴</span>
      </div>
      <div className="grid grid-cols-7 gap-[3px] text-center">
        {DAYS.map((d) => <span key={d} className="text-[9px] text-ink-5">{d}</span>)}
        {Array.from({ length: 3 }).map((_, i) => <span key={`p${i}`} />)}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
          <span key={d} className={`grid h-5 place-items-center rounded-[4px] text-[9.5px] tabular-nums ${d === TODAY ? 'bg-primary font-semibold text-white' : d < TODAY ? (OK.has(d) ? 'bg-primary/15 text-ink-2' : 'text-ink-4') : 'text-ink-5'}`}>{d}</span>
        ))}
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-ink-5/30"><span className="block h-full rounded-full bg-primary/70" style={{ width: `${(kept / passed) * 100}%` }} /></div>
    </div>
  );
}

export const WEEK_V: Variant[] = [
  { key: 'month', name: '달력 미니', recommended: true, why: '"성공 17일" 날것 대신 "7일 중 7일 지킴" + 아래 가는 진행 바. 오늘은 채운 칸, 지킨 날은 옅은 틴트, 놓친 날은 글자만.', Render: () => <MiniCalendar /> },
  { key: 'month-card', name: '달력 미니 · 카드', why: '같은 달력을 옅은 틴트 카드에 담은 버전. 패널에서 다른 블록과 구분이 더 분명하다.', Render: () => <MiniCalendar tone="card" /> },
  { key: 'boxes', name: '네모 칸 (이번 주)', why: '이전 기본. 주 단위만 보일 때.', Render: () => <WeekStrip weeklyStatus={WEEK} /> },
  { key: 'dots', name: '점 7개', why: '가장 작다. 저널 바나 배너 옆에 끼울 수 있는 크기.',
    Render: () => <div className="flex items-center gap-1.5 px-1">{WEEK.map((on, i) => <span key={i} title={DAYS[i]} className={`size-2.5 rounded-full ${on ? 'bg-primary' : 'bg-ink-5/50'}`} />)}<span className="ml-1 text-[10.5px] text-ink-4">이번 주 3/7</span></div> },
  { key: 'pills', name: '요일 알약', why: '요일 자체를 grain 칩으로. 눌러서 그날 기록으로 이동 가능.',
    Render: () => <div className="flex flex-wrap gap-1">{DAYS.map((d, i) => <Button key={d} variant="grain" size="xs" active={WEEK[i]} color="var(--color-primary)">{d}</Button>)}</div> },
];
