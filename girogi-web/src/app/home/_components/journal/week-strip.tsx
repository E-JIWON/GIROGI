/** @desc 좌측 패널 — 이번 주 월~일 성공 칸 */

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export function WeekStrip({ weeklyStatus }: { weeklyStatus: boolean[] }) {
  return (
    <div className="border-t border-border/60 pt-4">
      <span className="mb-2 block px-1 text-[10.5px] text-ink-4">이번 주</span>
      <div className="grid grid-cols-7 gap-1 px-1">
        {DAYS.map((d, i) => (
          <div key={d} className="flex flex-col items-center gap-1">
            <span className={`h-6 w-full rounded-[5px] ${weeklyStatus[i] ? 'bg-primary' : 'border-[1.5px] border-dashed border-ink/20'}`} />
            <span className="text-[9.5px] text-ink-4">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
