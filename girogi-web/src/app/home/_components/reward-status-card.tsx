/** @desc 보상 현황 카드 (Temptation Bundling) — 디자인 시스템 토큰·grain 버튼 */

'use client'

import { useState } from 'react'
import { Gift, PartyPopper } from 'lucide-react'
import { Button } from 'bongchil-design-system'

import { cn } from '@/lib/utils'
import { DAYS_FOR_SNACK_BOX, DAYS_FOR_CHEAT_DAY } from '@/lib/constants'
import type { RewardType } from '@/types/models'
import { UseRewardPanel } from './use-reward-panel'

interface RewardStatusCardProps {
  snackBoxCount: number;
  consecutiveDietDays: number;
  userId?: string;
  onRewardUsed?: () => void;
}

export function RewardStatusCard({ snackBoxCount, consecutiveDietDays, userId = 'user1', onRewardUsed }: RewardStatusCardProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedRewardType, setSelectedRewardType] = useState<RewardType>('snackbox')

  const daysUntilSnackBox = (() => {
    const remaining = DAYS_FOR_SNACK_BOX - (consecutiveDietDays % DAYS_FOR_SNACK_BOX);
    return remaining === DAYS_FOR_SNACK_BOX && consecutiveDietDays > 0 ? 0 : remaining;
  })();
  const daysUntilCheatDay = (() => {
    const remaining = DAYS_FOR_CHEAT_DAY - (consecutiveDietDays % DAYS_FOR_CHEAT_DAY);
    return remaining === DAYS_FOR_CHEAT_DAY ? 0 : remaining;
  })();
  const canUseCheatDay = daysUntilCheatDay === 0 && consecutiveDietDays >= DAYS_FOR_CHEAT_DAY;

  const open = (type: RewardType) => { setSelectedRewardType(type); setIsPanelOpen(true) }

  return (
    <div className="p-5">
      <div className="flex items-baseline gap-2">
        <h3 className="flex items-center gap-1.5 text-[13px] font-semibold tracking-tight text-ink-2"><Gift size={14} className="text-secondary" /> 보상</h3>
        <span className="text-xs text-ink-4">핵심 미션을 채우면 쌓여요</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {/* 과자박스 */}
        <div className="rounded-[var(--radius-m)] bg-comment-sand p-3">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-3"><Gift size={12} className="text-comment-sand-solid" /> 과자박스</div>
          <div className="mt-1 flex items-baseline gap-1 text-ink">
            <span className="text-[22px] font-semibold leading-none tabular-nums">{snackBoxCount}</span>
            <span className="text-[11px] text-ink-3">개</span>
          </div>
          <div className="mt-1 text-[10.5px] text-ink-4">{daysUntilSnackBox > 0 ? `다음 획득까지 ${daysUntilSnackBox}일` : '획득 가능'}</div>
          {snackBoxCount > 0 && (
            <div className="mt-2.5">
              <Button variant="grain" tone="primary" size="sm" onClick={() => open('snackbox')}>사용하기</Button>
            </div>
          )}
        </div>

        {/* 치팅데이 */}
        <div className={cn('rounded-[var(--radius-m)] p-3', canUseCheatDay ? 'bg-comment-green' : 'bg-surface-subtle')}>
          <div className="flex items-center gap-1.5 text-[11px] text-ink-3">
            <PartyPopper size={12} className={canUseCheatDay ? 'text-comment-green-solid' : 'text-ink-4'} /> 치팅데이
          </div>
          {canUseCheatDay ? (
            <>
              <div className="mt-1 text-[15px] font-semibold leading-tight text-comment-green-solid">오늘 가능</div>
              <div className="mt-1 text-[10.5px] text-ink-4">마음껏 먹어도 OK</div>
              <div className="mt-2.5">
                <Button variant="grain" tone="primary" size="sm" onClick={() => open('cheatday')}>사용하기</Button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-1 flex items-baseline gap-1 text-ink">
                <span className="text-[22px] font-semibold leading-none tabular-nums">{daysUntilCheatDay}</span>
                <span className="text-[11px] text-ink-3">일 후</span>
              </div>
              <div className="mt-1 text-[10.5px] text-ink-4">{DAYS_FOR_CHEAT_DAY}일 연속 성공 시</div>
            </>
          )}
        </div>
      </div>

      <p className="mt-3 text-[10.5px] leading-relaxed text-ink-4">
        {DAYS_FOR_SNACK_BOX}일 연속 → 과자박스 1개 · {DAYS_FOR_CHEAT_DAY}일 연속 → 치팅데이
      </p>

      <UseRewardPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} rewardType={selectedRewardType} userId={userId} onUsed={() => onRewardUsed?.()} />
    </div>
  );
}
