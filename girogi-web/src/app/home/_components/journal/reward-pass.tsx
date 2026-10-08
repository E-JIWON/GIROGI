/** @desc 보상 — 리스트형 패스. 아이콘 타일 · 이름/상태 · 진행 눈금 · 사용 */

'use client';

import { useState } from 'react';
import { Cookie, PartyPopper } from 'lucide-react';
import { DAYS_FOR_CHEAT_DAY, DAYS_FOR_SNACK_BOX } from '@/lib/constants';
import type { RewardType } from '@/types/models';
import { UseRewardPanel } from '../use-reward-panel';

interface RewardPassProps {
  snackBoxCount: number;
  consecutiveDietDays: number;
  userId?: string;
  onRewardUsed?: () => void;
}

function Ticks({ n, of, tone }: { n: number; of: number; tone: string }) {
  return <span className="flex gap-[3px]">{Array.from({ length: of }).map((_, i) => <span key={i} className={`h-[5px] flex-1 rounded-full ${i < n ? tone : 'bg-ink-5/30'}`} />)}</span>;
}

export function RewardPass({ snackBoxCount, consecutiveDietDays, userId = 'user1', onRewardUsed }: RewardPassProps) {
  const [open, setOpen] = useState<RewardType | null>(null);
  const snackProg = consecutiveDietDays % DAYS_FOR_SNACK_BOX;
  const cheatProg = consecutiveDietDays % DAYS_FOR_CHEAT_DAY;
  const cheatReady = consecutiveDietDays >= DAYS_FOR_CHEAT_DAY && cheatProg === 0;
  const rows = [
    { type: 'snackbox' as const, I: Cookie, name: '과자박스', count: snackBoxCount, unit: '개', tile: 'bg-comment-sand text-comment-sand-solid', bar: 'bg-comment-sand-solid',
      prog: snackProg, of: DAYS_FOR_SNACK_BOX, sub: snackProg === 0 && consecutiveDietDays > 0 ? '방금 하나 생겼어요' : `다음까지 ${DAYS_FOR_SNACK_BOX - snackProg}일`, usable: snackBoxCount > 0 },
    { type: 'cheatday' as const, I: PartyPopper, name: '치팅데이', count: cheatReady ? 1 : 0, unit: '장', tile: 'bg-primary-light text-primary', bar: 'bg-primary',
      prog: cheatReady ? DAYS_FOR_CHEAT_DAY : cheatProg, of: DAYS_FOR_CHEAT_DAY, sub: cheatReady ? '오늘 쓸 수 있어요' : `${DAYS_FOR_CHEAT_DAY - cheatProg}일 더`, usable: cheatReady },
  ];
  return (
    <div>
      <header className="mb-2 flex items-baseline gap-2 px-1">
        <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">보상</h2>
        <span className="text-[10.5px] text-ink-4">{DAYS_FOR_SNACK_BOX}일 · {DAYS_FOR_CHEAT_DAY}일 연속마다</span>
      </header>
      <div className="divide-y divide-border/60 overflow-hidden rounded-[14px] border border-border/60 bg-surface">
        {rows.map((r) => (
          <div key={r.type} className="flex items-center gap-3 px-3 py-3">
            <span className={`grid size-9 shrink-0 place-items-center rounded-[10px] ${r.tile}`}><r.I size={17} strokeWidth={1.9} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[12.5px] font-semibold text-ink">{r.name}</span>
                <span className="text-[11px] tabular-nums text-ink-3">{r.count}{r.unit}</span>
              </div>
              <div className="mt-1.5"><Ticks n={r.prog} of={r.of} tone={r.bar} /></div>
              <div className="mt-1 text-[10px] text-ink-4">{r.sub}</div>
            </div>
            <button type="button" disabled={!r.usable} onClick={() => setOpen(r.type)} className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary-subtle disabled:text-ink-5 disabled:hover:bg-transparent">사용</button>
          </div>
        ))}
      </div>
      <UseRewardPanel isOpen={open !== null} onClose={() => setOpen(null)} rewardType={open ?? 'snackbox'} userId={userId} onUsed={() => onRewardUsed?.()} />
    </div>
  );
}
