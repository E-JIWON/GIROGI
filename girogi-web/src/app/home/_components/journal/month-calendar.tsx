/** @desc 이번 달 농도 달력 — 그날 지킨 미션 수(0~3)를 색 농도로 */

const DOW = ['월', '화', '수', '목', '금', '토', '일'];

interface MonthCalendarProps {
  /** 기준일 (오늘) */
  today: Date;
  /** 일(1~31) → 지킨 미션 수 0~3. 없는 날은 기록 없음 */
  done: Record<number, number>;
}

export function MonthCalendar({ today, done }: MonthCalendarProps) {
  const y = today.getFullYear(), m = today.getMonth(), d0 = today.getDate();
  const days = new Date(y, m + 1, 0).getDate();
  const pad = (new Date(y, m, 1).getDay() + 6) % 7;
  const past = Object.entries(done).filter(([d]) => Number(d) < d0).map(([, v]) => v);
  const avg = past.length ? past.reduce((a, b) => a + b, 0) / past.length : 0;
  const tone = (n?: number) => (n === 3 ? 'bg-primary text-white' : n === 2 ? 'bg-primary/55 text-white' : n === 1 ? 'bg-primary/20 text-ink-2' : n === 0 ? 'bg-ink-5/25 text-ink-4' : 'text-ink-5');
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between px-0.5">
        <span className="text-[11px] font-medium text-ink-2">{m + 1}월</span>
        <span className="text-[10px] text-ink-4">하루 평균 <b className="tabular-nums text-primary">{avg.toFixed(1)}</b>개</span>
      </div>
      <div className="grid grid-cols-7 gap-[3px] text-center">
        {DOW.map((d) => <span key={d} className="text-[9px] text-ink-5">{d}</span>)}
        {Array.from({ length: pad }).map((_, i) => <span key={`p${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => (
          <span key={d} className={`grid h-5 place-items-center rounded-[4px] text-[9.5px] tabular-nums ${d === d0 ? 'font-semibold text-ink ring-2 ring-inset ring-primary' : tone(d < d0 ? done[d] ?? 0 : undefined)}`}>{d}</span>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-end gap-1 text-[9px] text-ink-5">
        0 {['bg-ink-5/25', 'bg-primary/20', 'bg-primary/55', 'bg-primary'].map((c) => <span key={c} className={`size-2 rounded-[2px] ${c}`} />)} 3
      </div>
    </div>
  );
}
