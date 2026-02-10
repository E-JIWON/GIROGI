/** @desc 보상 현황 카드 (Temptation Bundling) */

'use client'

import { useState } from 'react'
import { Gift, PartyPopper, Info } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DAYS_FOR_SNACK_BOX, DAYS_FOR_CHEAT_DAY } from '@/lib/constants'

import type { RewardType } from '@/types/models'

import { UseRewardDialog } from './use-reward-dialog'

interface RewardStatusCardProps {
  /**
   * 현재 보유한 과자박스 개수
   */
  snackBoxCount: number;
  /**
   * 연속 다이어트 일수
   */
  consecutiveDietDays: number;
  /**
   * 현재 사용자 ID
   */
  userId?: string;
  /**
   * 보상 사용 후 콜백
   */
  onRewardUsed?: () => void;
}

export function RewardStatusCard({
  snackBoxCount,
  consecutiveDietDays,
  userId = 'user1',
  onRewardUsed,
}: RewardStatusCardProps) {
  // 다이얼로그 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRewardType, setSelectedRewardType] = useState<RewardType>('snackbox')

  // 치팅데이까지 남은 일수 계산
  const daysUntilCheatDay = (() => {
    const remaining =
      DAYS_FOR_CHEAT_DAY - (consecutiveDietDays % DAYS_FOR_CHEAT_DAY);
    return remaining === DAYS_FOR_CHEAT_DAY ? 0 : remaining;
  })();

  // 치팅데이 사용 가능 여부
  const canUseCheatDay =
    daysUntilCheatDay === 0 && consecutiveDietDays >= DAYS_FOR_CHEAT_DAY;

  // 보상 사용 핸들러
  const handleUseReward = (type: RewardType) => {
    setSelectedRewardType(type)
    setIsDialogOpen(true)
  }

  const handleRewardUsed = () => {
    onRewardUsed?.()
  }

  return (
    <div className="rounded-lg bg-neutral-100 p-6">
      {/* 타이틀 */}
      <div className="mb-4 flex items-center gap-2">
        <Gift className="h-5 w-5 text-peach-600" />
        <h3 className="text-base font-semibold text-neutral-900">보상 현황</h3>
      </div>

      {/* 보상 현황 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 과자박스 */}
        <div className="rounded-lg bg-peach-50 p-3">
          <div className="mb-1 flex items-center gap-1">
            <Gift className="h-4 w-4 text-peach-600" />
            <span className="text-sm font-medium text-neutral-800">과자박스</span>
          </div>
          <p className="text-2xl font-bold text-peach-700 mb-2">
            {snackBoxCount}
            <span className="text-base">개</span>
          </p>
          {snackBoxCount > 0 && (
            <button
              onClick={() => handleUseReward('snackbox')}
              className="w-full py-1.5 bg-primary-800 text-white text-sm font-semibold rounded-lg hover:bg-primary-900 transition-colors"
            >
              사용하기
            </button>
          )}
        </div>

        {/* 치팅데이 */}
        <div
          className={cn(
            'rounded-lg p-3',
            canUseCheatDay ? 'bg-cheatday/10' : 'bg-neutral-100'
          )}
        >
          <div className="mb-1 flex items-center gap-1">
            <PartyPopper
              className={cn(
                'h-4 w-4',
                canUseCheatDay ? 'text-cheatday' : 'text-neutral-700'
              )}
            />
            <span className="text-sm font-medium text-neutral-800">치팅데이</span>
          </div>
          {canUseCheatDay ? (
            <>
              <p className="text-2xl font-bold text-cheatday mb-2">사용 가능!</p>
              <button
                onClick={() => handleUseReward('cheatday')}
                className="w-full py-1.5 bg-success-800 text-white text-sm font-semibold rounded-lg hover:bg-success-900 transition-colors"
              >
                사용하기
              </button>
            </>
          ) : (
            <p className="text-2xl font-bold text-neutral-700">
              {daysUntilCheatDay}
              <span className="text-base">일 후</span>
            </p>
          )}
        </div>
      </div>

      {/* 보상 규칙 안내 */}
      <div className="mt-4 flex gap-2 rounded-lg bg-neutral-50 p-3">
        <Info className="h-5 w-5 shrink-0 text-neutral-700" />
        <div className="flex-1">
          <p className="text-sm text-neutral-800 leading-relaxed">
            <span className="font-semibold text-primary">
              {DAYS_FOR_SNACK_BOX}일
            </span>
            마다 과자박스 1개 획득,{' '}
            <span className="font-semibold text-cheatday">
              {DAYS_FOR_CHEAT_DAY}일
            </span>{' '}
            연속 성공 시 치팅데이 사용 가능
          </p>
        </div>
      </div>

      {/* 보상 사용 다이얼로그 */}
      <UseRewardDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        rewardType={selectedRewardType}
        userId={userId}
        onUsed={handleRewardUsed}
      />
    </div>
  );
}
