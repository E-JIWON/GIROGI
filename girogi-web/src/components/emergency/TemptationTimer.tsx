/**
 * TemptationTimer 컴포넌트
 *
 * 10분 타이머로 충동을 지연시키는 위젯
 * - 원형 진행률 표시 (SVG로 구현)
 * - 시작/일시정지/재시작/리셋 버튼
 * - 완료 후 선택지: "유혹 사라짐" 또는 "자기 연민 모드"
 *
 * Flutter: lib/presentation/widgets/emergency/temptation_timer.dart
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemptationTimerProps {
  /**
   * 타이머 완료 콜백
   */
  onTimerComplete?: () => void;
  /**
   * "먹었습니다" 버튼 클릭 콜백 (자기 연민 모드로 전환)
   */
  onSelfCompassionMode?: () => void;
}

/** 타이머 지속 시간 (초) */
const TIMER_DURATION = 600; // 10분

export function TemptationTimer({
  onTimerComplete,
  onSelfCompassionMode,
}: TemptationTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 로직
  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            // 타이머 완료
            setIsRunning(false);
            setIsCompleted(true);
            setRemainingSeconds(0);
            onTimerComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingSeconds, onTimerComplete]);

  // 시간 포맷 (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 진행률 계산 (0~1)
  const progress = 1 - remainingSeconds / TIMER_DURATION;

  // 버튼 핸들러
  const handleStart = () => {
    setIsRunning(true);
    setRemainingSeconds(TIMER_DURATION);
    setIsCompleted(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(TIMER_DURATION);
    setIsCompleted(false);
  };

  const handleTemptationGone = () => {
    // TODO: 성공 기록 저장
    handleReset();
  };

  return (
    <div className="rounded-md border border-neutral-200 bg-white p-6">
      {/* 타이틀 */}
      <h3
        className={cn(
          'text-center text-xl font-bold',
          isCompleted ? 'text-success' : 'text-temptation'
        )}
      >
        {isCompleted ? '잘하셨습니다!' : '10분만 기다려보세요'}
      </h3>

      {/* 설명 */}
      <p className="mt-2 text-center text-sm text-neutral-700">
        {isCompleted
          ? '유혹을 이겨내셨습니다. 아직도 먹고 싶으신가요?'
          : '충동은 보통 10분 내에 사라집니다'}
      </p>

      {/* 원형 타이머 디스플레이 */}
      <div className="my-8 flex justify-center">
        <div className="relative h-52 w-52">
          {/* SVG 원형 진행률 */}
          <svg className="h-full w-full -rotate-90 transform">
            {/* 배경 원 */}
            <circle
              cx="104"
              cy="104"
              r="96"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-neutral-200"
            />
            {/* 진행률 원 */}
            <circle
              cx="104"
              cy="104"
              r="96"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 96}`}
              strokeDashoffset={`${2 * Math.PI * 96 * (1 - progress)}`}
              className={cn(
                'transition-all duration-1000',
                isCompleted ? 'text-success' : 'text-temptation'
              )}
              strokeLinecap="round"
            />
          </svg>

          {/* 중앙 콘텐츠 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isCompleted ? (
              <CheckCircle2 className="h-20 w-20 text-success" strokeWidth={2} />
            ) : (
              <>
                <div className="text-5xl font-bold text-neutral-900">
                  {formatTime(remainingSeconds)}
                </div>
                <div className="mt-2 text-xs text-neutral-700">남은 시간</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      {!isCompleted && (
        <div className="space-y-3">
          {!isRunning && remainingSeconds === TIMER_DURATION ? (
            // 시작 전
            <button
              onClick={handleStart}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-temptation px-4 py-3 text-base font-semibold text-white transition-all hover:bg-temptation/90"
            >
              <Play className="h-5 w-5" />
              타이머 시작
            </button>
          ) : isRunning ? (
            // 진행 중
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handlePause}
                className="flex items-center justify-center gap-2 rounded-md border-2 border-neutral-300 px-4 py-3 text-base font-semibold text-neutral-700 transition-all hover:bg-neutral-50"
              >
                <Pause className="h-5 w-5" />
                일시정지
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-md border-2 border-neutral-300 px-4 py-3 text-base font-semibold text-neutral-700 transition-all hover:bg-neutral-50"
              >
                <RotateCcw className="h-5 w-5" />
                리셋
              </button>
            </div>
          ) : (
            // 일시정지 상태
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleResume}
                className="flex items-center justify-center gap-2 rounded-md bg-temptation px-4 py-3 text-base font-semibold text-white transition-all hover:bg-temptation/90"
              >
                <Play className="h-5 w-5" />
                재시작
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-md border-2 border-neutral-300 px-4 py-3 text-base font-semibold text-neutral-700 transition-all hover:bg-neutral-50"
              >
                <RotateCcw className="h-5 w-5" />
                리셋
              </button>
            </div>
          )}
        </div>
      )}

      {/* 완료 후 버튼 */}
      {isCompleted && (
        <div className="space-y-3">
          {/* 유혹 사라짐 */}
          <button
            onClick={handleTemptationGone}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-success px-4 py-3 text-base font-semibold text-white transition-all hover:bg-success/90"
          >
            <CheckCircle2 className="h-5 w-5" />
            네, 유혹이 사라졌습니다
          </button>

          {/* 자기 연민 모드 */}
          <button
            onClick={onSelfCompassionMode}
            className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-selfcompassion px-4 py-3 text-base font-semibold text-selfcompassion transition-all hover:bg-selfcompassion/5"
          >
            <Heart className="h-5 w-5" />
            아니요, 먹었습니다 (자기 연민 모드)
          </button>
        </div>
      )}
    </div>
  );
}
