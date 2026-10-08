/** @desc 좌측 패널 — 프로필 · 체중(어제 대비 · 이번 달 · 전체) · 28일 잔디 */

export interface WeightSummary {
  current: number;
  yesterday: number;
  start: number;
  target: number;
  monthStart: number;
  monthTarget: number;
}

interface ProfilePanelProps {
  nickname: string;
  bio?: string | null;
  totalDays: number;
  /** 최근 28일, 오래된 날부터 */
  grass: boolean[];
  weight?: WeightSummary;
  /** 최근 7일 체중, 오래된 날부터 */
  weightTrend?: number[];
}

const pct = (from: number, to: number, now: number) => Math.max(0, Math.min(100, ((from - now) / (from - to)) * 100));

function GoalRow({ label, from, to, now }: { label: string; from: number; to: number; now: number }) {
  const left = Math.max(0, now - to);
  return (
    <div>
      <div className="flex items-baseline justify-between text-[10.5px]">
        <span className="text-ink-3">{label} <span className="tabular-nums text-ink-5">{from}→{to}</span></span>
        <span className="tabular-nums text-ink-4">{left === 0 ? '달성' : `${left.toFixed(1)} 남음`}</span>
      </div>
      <div className="mt-1 h-1 rounded-full bg-ink-5/35"><span className="block h-full rounded-full bg-primary/80" style={{ width: `${pct(from, to, now)}%` }} /></div>
    </div>
  );
}

/** 최근 7일 체중선 — 하루 등락보다 흐름 */
function Spark({ pts }: { pts: number[] }) {
  const min = Math.min(...pts) - 0.2, max = Math.max(...pts) + 0.2;
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * 100, ((max - v) / (max - min)) * 28] as const);
  const d = xy.map(([x, y]) => `${x},${y}`).join(' ');
  const [lx, ly] = xy[xy.length - 1];
  return (
    <div className="relative mt-2 h-7">
      <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <polygon points={`0,28 ${d} 100,28`} fill="var(--color-primary)" opacity="0.08" />
        <polyline points={d} fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-surface" style={{ left: `${lx}%`, top: `${(ly / 28) * 100}%` }} />
    </div>
  );
}

export function ProfilePanel({ nickname, bio, totalDays, grass, weight, weightTrend }: ProfilePanelProps) {
  const diff = weight ? weight.current - weight.yesterday : 0;
  return (
    <div className="flex flex-col gap-3 px-1">
      {/* 1행 — 아바타와 이름 두 줄의 높이를 맞춘다 (40px) */}
      <div className="flex items-center gap-2.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-primary-subtle text-[15px] font-bold text-primary" style={{ border: '2px dotted var(--color-primary-muted)' }}>
          {nickname[0]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[13.5px] font-semibold tracking-tight text-ink">{nickname}</span>
            <span className="shrink-0 font-mono text-[10.5px] text-primary/60">D+{totalDays}</span>
          </div>
          <div className="truncate text-[11px] text-ink-4">{bio ?? '의지력 말고 시스템으로'}</div>
        </div>
      </div>

      {/* 2행 — 체중 */}
      {weight && (
        <div className="rounded-[var(--radius-m)] bg-surface-subtle/70 px-3 py-2.5">
          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-semibold leading-none tabular-nums tracking-tight text-ink">{weight.current.toFixed(1)}</span>
            <span className="text-[10.5px] text-ink-4">kg</span>
            <span className={`ml-auto text-[11px] tabular-nums ${diff <= 0 ? 'text-primary' : 'text-danger'}`}>
              어제 {diff <= 0 ? '▼' : '▲'}{Math.abs(diff).toFixed(1)}
            </span>
          </div>
          {weightTrend && weightTrend.length > 1 && <Spark pts={weightTrend} />}
          <div className="mt-2 space-y-2">
            <GoalRow label="이번 달" from={weight.monthStart} to={weight.monthTarget} now={weight.current} />
            <GoalRow label="전체" from={weight.start} to={weight.target} now={weight.current} />
          </div>
        </div>
      )}

      {/* 3행 — 잔디 */}
      <div>
        <div className="mb-1 flex justify-between text-[9.5px] text-ink-5"><span>최근 4주</span><span>{grass.filter(Boolean).length}일 지킴</span></div>
        <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]" aria-label="최근 28일 성공 기록">
          {grass.map((on, i) => (
            <span key={i} className={`h-[7px] rounded-[2px] ${on ? 'bg-primary/80' : 'bg-ink-5/40'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
