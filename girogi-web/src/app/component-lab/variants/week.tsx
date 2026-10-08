'use client';

import { Button } from 'bongchil-design-system';
import { WeekStrip } from '../../home/_components/journal/week-strip';
import { DAYS, WEEK, type Variant } from './shared';

export const WEEK_V: Variant[] = [
  { key: 'boxes', name: '네모 칸', recommended: true, why: '성공=채움, 아직=점선. 잔디·체크박스와 같은 언어라 설명 없이 읽힌다.', Render: () => <WeekStrip weeklyStatus={WEEK} /> },
  { key: 'dots', name: '점 7개', why: '가장 작다. 저널 바나 배너 옆에 끼울 수 있는 크기. 요일 글자는 생략.',
    Render: () => <div className="flex items-center gap-1.5 px-1">{WEEK.map((on, i) => <span key={i} title={DAYS[i]} className={`size-2.5 rounded-full ${on ? 'bg-primary' : 'bg-ink-5/50'}`} />)}<span className="ml-1 text-[10.5px] text-ink-4">이번 주 3/7</span></div> },
  { key: 'pills', name: '요일 알약', why: '요일 자체를 grain 칩으로. 눌러서 그날 기록으로 이동시킬 수 있다(링크 가능).',
    Render: () => <div className="flex flex-wrap gap-1">{DAYS.map((d, i) => <Button key={d} variant="grain" size="xs" active={WEEK[i]} color="var(--color-primary)">{d}</Button>)}</div> },
  { key: 'bars', name: '세로 막대', why: '성공 여부가 아니라 "그날 몇 개 했나"(0~3)를 높이로. 정보가 하나 더 들어가지만 읽는 데 반 박자 걸린다.',
    Render: () => { const n = [3, 2, 2, 1, 0, 0, 0]; return (
      <div className="flex items-end gap-1.5 px-1">{n.map((v, i) => <div key={i} className="flex w-6 flex-col items-center gap-1"><span className="flex h-9 w-full items-end rounded-[4px] bg-ink-5/25"><span className={`block w-full rounded-[4px] ${v >= 2 ? 'bg-primary' : 'bg-primary/40'}`} style={{ height: `${(v / 3) * 100}%` }} /></span><span className="text-[9.5px] text-ink-4">{DAYS[i]}</span></div>)}</div>
    ); } },
  { key: 'month', name: '달력 미니', why: '이번 주 대신 이번 달 전체. 하단 독의 달력 팝오버와 중복이라 패널엔 과하지만, 독을 뺀다면 여기.',
    Render: () => (
      <div>
        <div className="mb-1 flex justify-between px-0.5 text-[10.5px]"><span className="font-medium text-primary">10월</span><span className="text-ink-5">성공 17일</span></div>
        <div className="grid grid-cols-7 gap-[3px]">{Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <span key={d} className={`grid h-5 place-items-center rounded-[4px] text-[9.5px] tabular-nums ${d === 8 ? 'bg-primary text-white' : d < 8 && d % 3 !== 0 ? 'bg-primary/15 text-ink-2' : 'text-ink-5'}`}>{d}</span>)}</div>
      </div>
    ) },
];
