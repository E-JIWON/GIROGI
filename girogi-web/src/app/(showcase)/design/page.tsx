'use client';

import React, { useState } from 'react';
import { CleanButton } from '@/components/examples/CleanButton';
import { CleanCard } from '@/components/examples/CleanCard';
import { CleanInput } from '@/components/examples/CleanInput';
import { CleanBadge } from '@/components/examples/CleanBadge';
import { Flame, PartyPopper, Heart, Check, Sparkles } from 'lucide-react';

export default function DesignShowcasePage() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const validateInput = (value: string) => {
    if (value.length < 3) {
      setInputError('최소 3자 이상 입력하세요');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="min-h-screen py-6">
      <div className="px-4 space-y-6">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            GIROGI 디자인 시스템
          </h1>
          <p className="text-neutral-700 mb-4">
            파스텔 컬러 기반 깔끔한 디자인
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg text-sm">
              라벤더
            </span>
            <span className="px-3 py-1 bg-success-100 text-success-800 rounded-lg text-sm">
              민트
            </span>
            <span className="px-3 py-1 bg-warning-100 text-warning-800 rounded-lg text-sm">
              레몬
            </span>
            <span className="px-3 py-1 bg-error-100 text-error-800 rounded-lg text-sm">
              코랄
            </span>
            <span className="px-3 py-1 bg-peach-100 text-peach-800 rounded-lg text-sm">
              복숭아
            </span>
            <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg text-sm">
              장미
            </span>
            <span className="px-3 py-1 bg-butter-100 text-butter-800 rounded-lg text-sm">
              버터
            </span>
          </div>
        </div>

        {/* 색상 조합 안내 */}
        <CleanCard variant="ivory" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            🌈 최종 색상 팔레트
          </h2>
          <p className="text-neutral-700 mb-6">
            사용자 취향에 맞춘 부드러운 파스텔 톤! 모든 색상이 비슷한 채도로
            통일되어 조화롭습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-[16px] p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">
                기본 색상 (5가지)
              </h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary-500 rounded-full" />
                  Primary (라벤더) - 메인 컬러
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success-400 rounded-full" />
                  Success (탁한 민트) - 완료, 성공 ✨
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-warning-300 rounded-full" />
                  Warning (레몬) - 경고
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-error-300 rounded-full" />
                  Error (코랄) - 오류, 실패
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-info-300 rounded-full" />
                  Info (스카이) - 정보
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-[16px] p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">
                특수 색상 (4가지)
              </h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-peach-300 rounded-full" />
                  Peach (복숭아) - Streak, 과자박스
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-rose-300 rounded-full" />
                  Rose (장미) - 자기 연민
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-butter-300 rounded-full" />
                  Butter (버터) - 치팅데이
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-ivory-300 rounded-full" />
                  Ivory (아이보리) - 배경 강조
                </li>
              </ul>
            </div>
          </div>
        </CleanCard>

        {/* 색상 팔레트 */}
        <CleanCard variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            🎨 컬러 팔레트
          </h2>

          <div className="space-y-6">
            {/* Primary */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Primary (라벤더)
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => (
                    <div key={shade} className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 rounded-[12px] bg-primary-${shade}`}
                      />
                      <span className="text-xs text-neutral-600 mt-1">
                        {shade}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Success */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Success (민트)
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-[12px] bg-success-${shade}`}
                    />
                    <span className="text-xs text-neutral-600 mt-1">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Warning (피치)
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-[12px] bg-warning-${shade}`}
                    />
                    <span className="text-xs text-neutral-600 mt-1">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Error */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Error (코랄)
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-[12px] bg-error-${shade}`}
                    />
                    <span className="text-xs text-neutral-600 mt-1">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Peach */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Peach (복숭아) 🍑
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-[12px] bg-peach-${shade}`}
                    />
                    <span className="text-xs text-neutral-600 mt-1">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rose */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Rose (장미) 🌸
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-[12px] bg-rose-${shade}`}
                    />
                    <span className="text-xs text-neutral-600 mt-1">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Butter */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Butter (버터) 🧈
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-[12px] bg-butter-${shade}`}
                    />
                    <span className="text-xs text-neutral-600 mt-1">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ivory */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Ivory (아이보리) 🤍
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-[12px] bg-ivory-${shade} border border-neutral-200`}
                    />
                    <span className="text-xs text-neutral-600 mt-1">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CleanCard>

        {/* 버튼 */}
        <CleanCard variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">🔘 버튼</h2>

          <div className="space-y-6">
            {/* Size */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                크기
              </h3>
              <div className="flex gap-3 items-center flex-wrap">
                <CleanButton size="sm">Small</CleanButton>
                <CleanButton size="md">Medium</CleanButton>
                <CleanButton size="lg">Large</CleanButton>
              </div>
            </div>

            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                종류
              </h3>
              <div className="flex gap-3 flex-wrap">
                <CleanButton variant="primary">Primary</CleanButton>
                <CleanButton variant="secondary">Secondary</CleanButton>
                <CleanButton variant="success">Success</CleanButton>
                <CleanButton variant="warning">Warning</CleanButton>
                <CleanButton variant="error">Error</CleanButton>
                <CleanButton variant="ghost">Ghost</CleanButton>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                상태
              </h3>
              <div className="flex gap-3 flex-wrap">
                <CleanButton>Normal</CleanButton>
                <CleanButton disabled>Disabled</CleanButton>
                <CleanButton fullWidth>Full Width</CleanButton>
              </div>
            </div>
          </div>
        </CleanCard>

        {/* 카드 */}
        <CleanCard variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">🃏 카드</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CleanCard variant="white" padding="md">
              <h3 className="font-semibold text-neutral-900 mb-2">White</h3>
              <p className="text-sm text-neutral-600">기본 흰색 카드</p>
            </CleanCard>

            <CleanCard variant="neutral" padding="md">
              <h3 className="font-semibold text-neutral-900 mb-2">Neutral</h3>
              <p className="text-sm text-neutral-600">중립적인 회색 카드</p>
            </CleanCard>

            <CleanCard variant="primary" padding="md">
              <h3 className="font-semibold text-primary-800 mb-2">Primary</h3>
              <p className="text-sm text-primary-700">라벤더 배경 카드</p>
            </CleanCard>

            <CleanCard variant="success" padding="md">
              <h3 className="font-semibold text-success-800 mb-2">Success</h3>
              <p className="text-sm text-success-700">성공 상태 카드</p>
            </CleanCard>

            <CleanCard variant="warning" padding="md">
              <h3 className="font-semibold text-warning-800 mb-2">Warning</h3>
              <p className="text-sm text-warning-700">경고 상태 카드</p>
            </CleanCard>

            <CleanCard variant="error" padding="md">
              <h3 className="font-semibold text-error-800 mb-2">Error</h3>
              <p className="text-sm text-error-700">오류 상태 카드</p>
            </CleanCard>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">
              호버 효과
            </h3>
            <CleanCard variant="primary" padding="md" hoverable>
              <p className="text-primary-800">
                마우스를 올려보세요! (scale-up 효과)
              </p>
            </CleanCard>
          </div>
        </CleanCard>

        {/* 입력 필드 */}
        <CleanCard variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            📝 입력 필드
          </h2>

          <div className="space-y-6 max-w-md">
            <CleanInput
              label="이름"
              placeholder="이름을 입력하세요"
              fullWidth
            />

            <CleanInput
              label="이메일"
              type="email"
              placeholder="email@example.com"
              fullWidth
            />

            <CleanInput
              label="비밀번호 (검증 예시)"
              type="text"
              placeholder="최소 3자 이상"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                validateInput(e.target.value);
              }}
              error={inputError}
              fullWidth
            />

            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                크기
              </h3>
              <div className="space-y-3">
                <CleanInput inputSize="sm" placeholder="Small" fullWidth />
                <CleanInput inputSize="md" placeholder="Medium" fullWidth />
                <CleanInput inputSize="lg" placeholder="Large" fullWidth />
              </div>
            </div>
          </div>
        </CleanCard>

        {/* 배지 */}
        <CleanCard variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">🏷️ 배지</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                종류
              </h3>
              <div className="flex gap-2 flex-wrap">
                <CleanBadge variant="primary">Primary</CleanBadge>
                <CleanBadge variant="success">Success</CleanBadge>
                <CleanBadge variant="warning">Warning</CleanBadge>
                <CleanBadge variant="error">Error</CleanBadge>
                <CleanBadge variant="info">Info</CleanBadge>
                <CleanBadge variant="neutral">Neutral</CleanBadge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                크기
              </h3>
              <div className="flex gap-2 items-center flex-wrap">
                <CleanBadge size="sm" variant="primary">
                  Small
                </CleanBadge>
                <CleanBadge size="md" variant="primary">
                  Medium
                </CleanBadge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                아이콘 포함
              </h3>
              <div className="flex gap-2 flex-wrap">
                <CleanBadge variant="success" icon={<span>✓</span>}>
                  완료
                </CleanBadge>
                <CleanBadge variant="warning" icon={<span>⚠</span>}>
                  경고
                </CleanBadge>
                <CleanBadge variant="error" icon={<span>✕</span>}>
                  실패
                </CleanBadge>
                <CleanBadge variant="primary" icon={<span>🔥</span>}>
                  7일 연속
                </CleanBadge>
              </div>
            </div>
          </div>
        </CleanCard>

        {/* 실전 예시 */}
        <CleanCard variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            💎 실전 예시
          </h2>

          <div className="space-y-6">
            {/* Streak 카운터 */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Streak 카운터 (라벤더→코랄 파스텔)
              </h3>
              <div className="bg-gradient-to-r from-primary-300 to-error-300 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Flame className="w-12 h-12 text-white" />
                </div>
                <div className="text-6xl font-bold text-white mb-2">7일</div>
                <div className="text-sm text-white/90">연속 성공!</div>
                <div className="text-xs text-white/70 mt-2">
                  지금까지 최고: 12일
                </div>
              </div>
            </div>

            {/* 치팅데이 카운터 */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                치팅데이 카운터 (탁한 민트)
              </h3>
              <div className="bg-gradient-to-br from-success-100 to-success-200 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-3">
                  <PartyPopper className="w-10 h-10 text-success-800" />
                </div>
                <div className="text-5xl font-bold text-success-900 mb-2">
                  3일 남음
                </div>
                <div className="text-sm text-success-800">치팅데이까지!</div>
                <div className="text-xs text-success-700 mt-2">
                  과자박스 1개 보유 중
                </div>
              </div>
            </div>

            {/* 미션 카드 */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                미션 카드 (개선됨!)
              </h3>
              <CleanCard variant="white" padding="md">
                <h4 className="font-semibold text-neutral-900 mb-4">
                  오늘의 미션
                </h4>
                <div className="space-y-3">
                  {[
                    { id: 1, title: '아침 식사 집에서 먹기', completed: true },
                    { id: 2, title: '점심 천천히 먹기', completed: true },
                    { id: 3, title: '저녁 8시 전 식사 완료', completed: false },
                  ].map((mission) => (
                    <div
                      key={mission.id}
                      className="flex items-center gap-3 py-2"
                    >
                      <div
                        className={`
                        w-5 h-5
                        rounded
                        flex items-center justify-center
                        transition-colors duration-200
                        ${
                          mission.completed
                            ? 'bg-success-400'
                            : 'bg-neutral-200'
                        }
                      `}
                      >
                        {mission.completed && (
                          <Check className="w-3.5 h-3.5 text-white stroke-[2]" />
                        )}
                      </div>
                      <span
                        className={`
                        flex-1
                        ${
                          mission.completed
                            ? 'text-neutral-500 line-through'
                            : 'text-neutral-900'
                        }
                      `}
                      >
                        {mission.title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <CleanBadge variant="success">2/3 완료</CleanBadge>
                </div>
              </CleanCard>
            </div>

            {/* 자기 연민 카드 */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                자기 연민 카드 (개선됨!)
              </h3>
              <div className="bg-rose-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Heart className="w-12 h-12 text-rose-400 fill-rose-400" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">
                    괜찮습니다
                  </h4>
                  <p className="text-sm text-neutral-700 mb-4">
                    한 번의 실수로 모든 것이 끝나는 건 아닙니다.
                    <br />
                    지금까지 당신은 정말 잘해왔어요.
                  </p>
                  <div className="bg-white rounded-xl p-4 mb-4">
                    <div className="text-2xl font-bold text-rose-600">84%</div>
                    <div className="text-xs text-neutral-600">전체 성공률</div>
                  </div>
                  <button
                    className="
                  w-full
                  bg-rose-400
                  text-white
                  py-3
                  rounded-2xl
                  font-medium
                  transition-colors duration-300
                  hover:bg-rose-500
                  flex items-center justify-center gap-2
                "
                  >
                    <Sparkles className="w-4 h-4" />
                    다시 시작하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CleanCard>

        {/* 푸터 */}
        <div className="text-center text-white/80 text-sm py-8">
          <p>GIROGI 디자인 시스템 v1.0</p>
          <p className="mt-2">테두리 없음 · 그림자 없음 · 깔끔한 디자인</p>
        </div>
      </div>
    </div>
  );
}
