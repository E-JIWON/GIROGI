/** @desc 보상 사용 패널 - Panel 프리미티브 활용 */

'use client'

import { useState, useEffect } from 'react'
import { Gift, PartyPopper, History } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Panel } from '@/components/ui/panel'

import type { RewardType, RewardUsage } from '@/types/models'

import { REWARD_USAGE_KEY, SNACK_BOX_COUNT_KEY, REWARD_COLORS } from '@/lib/constants'
import { loadFromStorage, saveToStorage } from '@/lib/utils/storage'

interface UseRewardPanelProps {
  /** 패널 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 보상 타입 */
  rewardType: RewardType
  /** 현재 사용자 ID */
  userId: string
  /** 사용 완료 후 콜백 */
  onUsed?: () => void
}

export function UseRewardPanel({
  isOpen,
  onClose,
  rewardType,
  userId,
  onUsed,
}: UseRewardPanelProps) {
  const [food, setFood] = useState('')
  const [memo, setMemo] = useState('')
  const [usageHistory, setUsageHistory] = useState<RewardUsage[]>([])

  // 사용 내역 불러오기
  useEffect(() => {
    if (isOpen) {
      const usages = loadFromStorage<RewardUsage[]>(REWARD_USAGE_KEY, [])
      setUsageHistory(usages.filter((u) => u.type === rewardType).reverse())
    }
  }, [isOpen, rewardType])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!food.trim()) {
      alert('먹은 음식을 입력해주세요')
      return
    }

    const usage: RewardUsage = {
      id: `reward_${Date.now()}`,
      userId,
      type: rewardType,
      food: food.trim(),
      memo: memo.trim() || undefined,
      usedAt: new Date().toISOString(),
    }

    const usages = loadFromStorage<RewardUsage[]>(REWARD_USAGE_KEY, [])
    usages.push(usage)
    saveToStorage(REWARD_USAGE_KEY, usages)

    if (rewardType === 'snackbox') {
      const currentCount = loadFromStorage<number>(SNACK_BOX_COUNT_KEY, 0)
      saveToStorage(SNACK_BOX_COUNT_KEY, currentCount - 1)
    }

    onUsed?.()
    setFood('')
    setMemo('')
    onClose()
  }

  const title = rewardType === 'snackbox' ? '과자박스 사용' : '치팅데이 사용'
  const Icon = rewardType === 'snackbox' ? Gift : PartyPopper
  const colorClasses = rewardType === 'snackbox' ? REWARD_COLORS.snackBox : REWARD_COLORS.cheatDay

  return (
    <Panel
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      titleIcon={<Icon className={cn('h-6 w-6', colorClasses.text)} />}
    >
      {/* 안내 */}
      <div className={cn('mb-6 rounded-lg p-4', colorClasses.bg50)}>
        <p className="text-sm text-neutral-700 leading-relaxed">
          {rewardType === 'snackbox'
            ? '3일 연속 미션 달성으로 획득한 과자박스예요. 좋아하는 간식을 하나 골라 먹을 수 있어요! 사용하면 1개가 차감됩니다.'
            : '7일 연속 미션 달성으로 해금된 치팅데이예요. 오늘 하루 마음껏 먹어도 괜찮아요! 내일부터 다시 시작하면 됩니다.'}
        </p>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="food" className="block text-sm font-semibold text-neutral-700 mb-2">
            무엇을 먹었나요? <span className="text-error">*</span>
          </label>
          <input
            id="food"
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="예: 치킨, 피자, 아이스크림"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="memo" className="block text-sm font-semibold text-neutral-700 mb-2">
            메모 (선택사항)
          </label>
          <textarea
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="어떤 상황이었나요?"
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-neutral-100 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-200 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className={cn(
              'flex-1 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity',
              colorClasses.bg500,
              colorClasses.textWhite
            )}
          >
            사용하기
          </button>
        </div>
      </form>

      {/* 사용 내역 */}
      {usageHistory.length > 0 && (
        <div className="mt-8 border-t border-neutral-100 pt-6">
          <div className="mb-3 flex items-center gap-2">
            <History className="h-4 w-4 text-neutral-500" />
            <h3 className="text-sm font-semibold text-neutral-700">사용 내역</h3>
          </div>
          <div className="space-y-3">
            {usageHistory.slice(0, 5).map((usage) => (
              <div key={usage.id} className="rounded-lg bg-neutral-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-800">{usage.food}</span>
                  <span className="text-xs text-neutral-500">
                    {new Date(usage.usedAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                {usage.memo && (
                  <p className="mt-1 text-xs text-neutral-500">{usage.memo}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  )
}
