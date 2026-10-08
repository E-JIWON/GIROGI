/** @desc 좌측 패널 — 프로필 + 최근 28일 잔디 (bongchil-diary ProfileCard bare 결) */

interface ProfilePanelProps {
  nickname: string;
  bio?: string | null;
  totalDays: number;
  /** 최근 28일, 오래된 날부터 */
  grass: boolean[];
  /** 체중 — 현재 · 목표 · 시작 (kg). 없으면 줄 생략 */
  weight?: { current: number; target: number; start: number };
}

export function ProfilePanel({ nickname, bio, totalDays, grass, weight }: ProfilePanelProps) {
  return (
    <div className="flex items-center gap-3.5 px-1">
      <span
        className="grid size-[62px] shrink-0 place-items-center rounded-[14px] bg-primary-subtle text-[20px] font-bold text-primary"
        style={{ border: '2px dotted var(--color-primary-muted)' }}
      >
        {nickname[0]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[13.5px] font-semibold tracking-tight text-ink">{nickname}</span>
          <span className="shrink-0 font-mono text-[10.5px] font-medium text-primary/55">D+{totalDays}</span>
        </div>
        <div className="mt-0.5 truncate text-[11.5px] leading-[1.45] text-ink-4">{bio ?? '의지력 말고 시스템으로'}</div>
        {weight && (
          <div className="mt-1 flex items-baseline gap-1.5 text-[11px]">
            <span className="text-[14px] font-semibold tabular-nums tracking-tight text-ink">{weight.current.toFixed(1)}<span className="ml-0.5 text-[10px] font-normal text-ink-4">kg</span></span>
            <span className="tabular-nums text-primary">{weight.current - weight.start > 0 ? '+' : ''}{(weight.current - weight.start).toFixed(1)}</span>
            <span className="text-ink-4">· 목표 {weight.target}</span>
          </div>
        )}
        <div className="mt-1.5 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]" aria-label="최근 28일 성공 기록">
          {grass.map((on, i) => (
            <span key={i} className={`h-[7px] rounded-[2px] ${on ? 'bg-primary/80' : 'bg-ink-5/40'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
