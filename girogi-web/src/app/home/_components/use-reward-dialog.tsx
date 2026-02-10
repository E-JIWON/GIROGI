/** @desc 보상 사용 다이얼로그 (Temptation Bundling) */

'use client'

import { useState } from 'react'
import { X, Gift, PartyPopper } from 'lucide-react'
import clsx from 'clsx'

import type { RewardType, RewardUsage } from '@/types/models'

import { REWARD_USAGE_KEY, SNACK_BOX_COUNT_KEY, REWARD_COLORS } from '@/lib/constants'
import { loadFromStorage, saveToStorage } from '@/lib/utils/storage'

interface UseRewardDialogProps {
  /** 다이얼로그 표시 여부 */
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

export function UseRewardDialog({
  isOpen,
  onClose,
  rewardType,
  userId,
  onUsed,
}: UseRewardDialogProps) {
  const [food, setFood] = useState('')
  const [memo, setMemo] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!food.trim()) {
      alert('먹은 음식을 입력해주세요')
      return
    }

    // 보상 사용 기록 생성
    const usage: RewardUsage = {
      id: `reward_${Date.now()}`,
      userId,
      type: rewardType,
      food: food.trim(),
      memo: memo.trim() || undefined,
      usedAt: new Date().toISOString(),
    }

    // localStorage에 저장
    const usages = loadFromStorage<RewardUsage[]>(REWARD_USAGE_KEY, [])
    usages.push(usage)
    saveToStorage(REWARD_USAGE_KEY, usages)

    // 과자박스 사용 시 개수 차감
    if (rewardType === 'snackbox') {
      const currentCount = loadFromStorage<number>(SNACK_BOX_COUNT_KEY, 0)
      saveToStorage(SNACK_BOX_COUNT_KEY, currentCount - 1)
    }

    // 완료 콜백
    onUsed?.()

    // 상태 초기화 및 닫기
    setFood('')
    setMemo('')
    onClose()
  }

  const title = rewardType === 'snackbox' ? '과자박스 사용' : '치팅데이 사용'
  const Icon = rewardType === 'snackbox' ? Gift : PartyPopper
  const colorClasses = rewardType === 'snackbox' ? REWARD_COLORS.snackBox : REWARD_COLORS.cheatDay

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={clsx('h-6 w-6', colorClasses.text)} />
            <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-neutral-100 transition-colors"
          >
            <X className="h-5 w-5 text-neutral-700" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 먹은 음식 */}
          <div>
            <label
              htmlFor="food"
              className="block text-sm font-semibold text-neutral-700 mb-2"
            >
              무엇을 먹었나요? <span className="text-error">*</span>
            </label>
            <input
              id="food"
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              placeholder="예: 치킨, 피자, 아이스크림"
              className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* 메모 */}
          <div>
            <label
              htmlFor="memo"
              className="block text-sm font-semibold text-neutral-700 mb-2"
            >
              메모 (선택사항)
            </label>
            <textarea
              id="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="어떤 상황이었나요?"
              rows={3}
              className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* 안내 메시지 */}
          <div className={clsx('rounded-md p-3', colorClasses.bg50)}>
            <p className="text-sm text-neutral-700">
              {rewardType === 'snackbox'
                ? '과자박스를 사용하면 개수가 1개 차감됩니다.'
                : '치팅데이를 즐기세요! 내일부터 다시 시작하면 됩니다.'}
            </p>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-100 text-neutral-700 rounded-md font-semibold hover:bg-neutral-200 transition-colors"
            >
              취소
            </button>
            <button type="submit" className={clsx('flex-1 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity', colorClasses.bg500, colorClasses.textWhite)}>
              사용하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
