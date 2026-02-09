'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Camera, Check } from 'lucide-react'
import {
  DEFAULT_GOAL_IMAGES,
  ONBOARDING_COMPLETED_KEY,
  GOAL_IMAGE_KEY,
  GOAL_WEIGHT_KEY,
  CURRENT_WEIGHT_KEY,
  GOAL_DATE_KEY,
} from '@/lib/constants'

/**
 * 온보딩 페이지
 *
 * EFT (Episodic Future Thinking) 전략 적용:
 * - 목표 이미지 설정을 필수로 하여 미래 자아 시각화 강화
 * - 기본 이미지 10개 제공 또는 직접 업로드
 * - 목표 체중, 현재 체중, 목표 날짜 입력
 */
export default function OnboardingPage() {
  const router = useRouter()

  // 단계 관리 (1: 목표 이미지, 2: 체중 정보)
  const [step, setStep] = useState<1 | 2>(1)

  // 목표 이미지 선택
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null)

  // 체중 정보
  const [currentWeight, setCurrentWeight] = useState('')
  const [goalWeight, setGoalWeight] = useState('')
  const [goalDate, setGoalDate] = useState('')

  // 이미지 업로드 (임시 - 실제로는 서버 업로드 필요)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomImageUrl(reader.result as string)
        setSelectedImageId(null) // 기본 이미지 선택 해제
      }
      reader.readAsDataURL(file)
    }
  }

  // 1단계 완료 (목표 이미지 선택)
  const handleStep1Complete = () => {
    if (!selectedImageId && !customImageUrl) {
      alert('목표 이미지를 선택하거나 업로드해주세요')
      return
    }
    setStep(2)
  }

  // 2단계 완료 (온보딩 완료)
  const handleComplete = () => {
    // 유효성 검사
    if (!currentWeight || !goalWeight || !goalDate) {
      alert('모든 정보를 입력해주세요')
      return
    }

    const currentWeightNum = parseFloat(currentWeight)
    const goalWeightNum = parseFloat(goalWeight)

    if (isNaN(currentWeightNum) || isNaN(goalWeightNum)) {
      alert('체중은 숫자로 입력해주세요')
      return
    }

    if (currentWeightNum <= goalWeightNum) {
      alert('목표 체중은 현재 체중보다 작아야 합니다')
      return
    }

    // localStorage에 저장
    const goalImageUrl = customImageUrl || DEFAULT_GOAL_IMAGES.find(img => img.id === selectedImageId)?.url || ''

    localStorage.setItem(GOAL_IMAGE_KEY, goalImageUrl)
    localStorage.setItem(CURRENT_WEIGHT_KEY, currentWeight)
    localStorage.setItem(GOAL_WEIGHT_KEY, goalWeight)
    localStorage.setItem(GOAL_DATE_KEY, goalDate)
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true')

    // 홈으로 이동
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* 진행 상태 */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-neutral-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700'
            }`}>
              2
            </div>
          </div>
          <p className="text-center text-sm text-neutral-700">
            {step === 1 ? '목표 이미지 선택' : '체중 정보 입력'}
          </p>
        </div>

        {/* Step 1: 목표 이미지 선택 */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                목표하는 모습을 선택하세요
              </h1>
              <p className="text-neutral-700">
                유혹을 느낄 때 이 이미지를 보면서<br />
                건강해진 미래의 나를 상상해보세요
              </p>
            </div>

            {/* 직접 업로드 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-neutral-300">
              <label htmlFor="image-upload" className="cursor-pointer block">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-neutral-900">나만의 목표 이미지 업로드</p>
                    <p className="text-sm text-neutral-700">원하는 사진을 직접 올려보세요</p>
                  </div>
                  {customImageUrl && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={customImageUrl}
                        alt="업로드된 목표 이미지"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* 기본 이미지 선택 */}
            <div>
              <p className="text-sm font-semibold text-neutral-800 mb-3">
                또는 기본 이미지 중 선택하세요
              </p>
              <div className="grid grid-cols-2 gap-3">
                {DEFAULT_GOAL_IMAGES.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => {
                      setSelectedImageId(image.id)
                      setCustomImageUrl(null) // 커스텀 이미지 선택 해제
                    }}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageId === image.id
                        ? 'border-primary ring-4 ring-primary/20'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {/* Placeholder 배경 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <p className="text-xs text-center text-neutral-700 px-2">
                        {image.description}
                      </p>
                    </div>

                    {/* 선택 체크 */}
                    {selectedImageId === image.id && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 다음 버튼 */}
            <button
              onClick={handleStep1Complete}
              disabled={!selectedImageId && !customImageUrl}
              className="w-full py-4 bg-primary text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              다음
            </button>
          </div>
        )}

        {/* Step 2: 체중 정보 입력 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                목표를 설정하세요
              </h1>
              <p className="text-neutral-700">
                구체적인 목표가 성공 확률을 높입니다
              </p>
            </div>

            {/* 선택한 목표 이미지 미리보기 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-800 mb-3">선택한 목표 이미지</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                {customImageUrl ? (
                  <Image
                    src={customImageUrl}
                    alt="목표 이미지"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <p className="text-sm text-neutral-700">
                      {DEFAULT_GOAL_IMAGES.find(img => img.id === selectedImageId)?.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 체중 입력 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <label htmlFor="current-weight" className="block text-sm font-semibold text-neutral-800 mb-2">
                  현재 체중 (kg)
                </label>
                <input
                  id="current-weight"
                  type="number"
                  step="0.1"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="예: 70.5"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="goal-weight" className="block text-sm font-semibold text-neutral-800 mb-2">
                  목표 체중 (kg)
                </label>
                <input
                  id="goal-weight"
                  type="number"
                  step="0.1"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                  placeholder="예: 65.0"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="goal-date" className="block text-sm font-semibold text-neutral-800 mb-2">
                  목표 날짜
                </label>
                <input
                  id="goal-date"
                  type="date"
                  value={goalDate}
                  onChange={(e) => setGoalDate(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* 감량 예상 */}
              {currentWeight && goalWeight && (
                <div className="bg-primary/5 rounded-lg p-4">
                  <p className="text-sm text-neutral-800">
                    <span className="font-semibold">목표 감량:</span>{' '}
                    <span className="text-primary font-bold text-lg">
                      {(parseFloat(currentWeight) - parseFloat(goalWeight)).toFixed(1)}kg
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* 버튼 그룹 */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-neutral-100 text-neutral-800 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
              >
                이전
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                시작하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
