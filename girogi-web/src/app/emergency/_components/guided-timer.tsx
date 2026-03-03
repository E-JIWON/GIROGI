/** @desc 가이드 타이머 - 2분마다 격려 + 심호흡 가이드 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Heart, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmotionType } from '@/types/enums';
import { GUIDED_TIMER_MESSAGES, BREATHING_STEPS, EMOTION_ENCOURAGEMENT } from '@/lib/constants';

interface GuidedTimerProps {
  emotion?: EmotionType | null;
  onTimerComplete?: () => void;
  onSuccess?: () => void;
  onFailed?: () => void;
}

const TIMER_DURATION = 600; // 10분
const MESSAGE_INTERVAL = 120; // 2분마다 격려 메시지

export function GuidedTimer({
  emotion,
  onTimerComplete,
  onSuccess,
  onFailed,
}: GuidedTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingPhaseIndex, setBreathingPhaseIndex] = useState(0);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathingRef = useRef<NodeJS.Timeout | null>(null);

  // 격려 메시지 업데이트
  useEffect(() => {
    const elapsed = TIMER_DURATION - remainingSeconds;
    const messageIndex = Math.floor(elapsed / MESSAGE_INTERVAL) - 1;
    if (messageIndex >= 0 && messageIndex < GUIDED_TIMER_MESSAGES.length) {
      setCurrentMessageIndex(messageIndex);
    }
  }, [remainingSeconds]);

  // 타이머 로직
  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
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

  // 심호흡 애니메이션
  useEffect(() => {
    if (!showBreathing) {
      if (breathingRef.current) {
        clearInterval(breathingRef.current);
        breathingRef.current = null;
      }
      return;
    }

    const currentStep = BREATHING_STEPS[breathingPhaseIndex];
    setBreathingTimer(currentStep.duration);

    breathingRef.current = setInterval(() => {
      setBreathingTimer((prev) => {
        if (prev <= 1) {
          setBreathingPhaseIndex((pi) => (pi + 1) % BREATHING_STEPS.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (breathingRef.current) {
        clearInterval(breathingRef.current);
      }
    };
  }, [showBreathing, breathingPhaseIndex]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - remainingSeconds / TIMER_DURATION;

  const handleStart = () => {
    setIsRunning(true);
    setRemainingSeconds(TIMER_DURATION);
    setIsCompleted(false);
    setCurrentMessageIndex(-1);
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
    setCurrentMessageIndex(-1);
    setShowBreathing(false);
  };

  const currentBreathingStep = BREATHING_STEPS[breathingPhaseIndex];
  const breathingScale =
    currentBreathingStep.phase === 'inhale'
      ? 1 + (1 - breathingTimer / currentBreathingStep.duration) * 0.3
      : currentBreathingStep.phase === 'exhale'
        ? 1.3 - (1 - breathingTimer / currentBreathingStep.duration) * 0.3
        : 1.3;

  return (
    <div>
      {/* 타이틀 */}
      <h3
        className={cn(
          'text-center text-xl font-bold',
          isCompleted ? 'text-success' : 'text-temptation'
        )}
      >
        {isCompleted ? '잘하셨습니다!' : '10분 함께 버텨요'}
      </h3>

      <p className="mt-1 text-center text-sm text-neutral-600">
        {isCompleted
          ? '유혹을 이겨내셨습니다. 아직도 먹고 싶으신가요?'
          : '충동은 보통 10분 내에 사라집니다'}
      </p>

      {/* 격려 메시지 */}
      {currentMessageIndex >= 0 && isRunning && (
        <div className="mt-3 rounded-lg bg-temptation/5 px-3 py-2 text-center text-sm font-medium text-temptation transition-all">
          {emotion
            ? EMOTION_ENCOURAGEMENT[emotion]
            : GUIDED_TIMER_MESSAGES[currentMessageIndex]}
        </div>
      )}

      {/* 원형 타이머 */}
      <div className="my-6 flex justify-center">
        <div className="relative h-52 w-52">
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              cx="104"
              cy="104"
              r="96"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-neutral-200"
            />
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

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isCompleted ? (
              <CheckCircle2 className="h-20 w-20 text-success" strokeWidth={2} />
            ) : (
              <>
                <div className="text-5xl font-bold text-neutral-900">
                  {formatTime(remainingSeconds)}
                </div>
                <div className="mt-2 text-xs text-neutral-600">남은 시간</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 심호흡 가이드 */}
      {showBreathing && !isCompleted && (
        <div className="mb-4 rounded-xl bg-blue-50 p-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Wind className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">4-7-8 호흡법</span>
          </div>
          <div
            className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-blue-200 transition-transform duration-1000"
            style={{ transform: `scale(${breathingScale})` }}
          >
            <span className="text-2xl font-bold text-blue-800">{breathingTimer}</span>
          </div>
          <div className="text-base font-bold text-blue-800">
            {currentBreathingStep.label}
          </div>
          <div className="text-xs text-blue-600">{currentBreathingStep.description}</div>
        </div>
      )}

      {/* 컨트롤 버튼 */}
      {!isCompleted && (
        <div className="space-y-3">
          {!isRunning && remainingSeconds === TIMER_DURATION ? (
            <button
              onClick={handleStart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-temptation px-4 py-3 text-base font-semibold text-white transition-all hover:bg-temptation/90"
            >
              <Play className="h-5 w-5" />
              타이머 시작
            </button>
          ) : isRunning ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handlePause}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-300 px-4 py-3 text-base font-semibold text-neutral-700 transition-all hover:bg-neutral-50"
              >
                <Pause className="h-5 w-5" />
                일시정지
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-300 px-4 py-3 text-base font-semibold text-neutral-700 transition-all hover:bg-neutral-50"
              >
                <RotateCcw className="h-5 w-5" />
                리셋
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleResume}
                className="flex items-center justify-center gap-2 rounded-xl bg-temptation px-4 py-3 text-base font-semibold text-white transition-all hover:bg-temptation/90"
              >
                <Play className="h-5 w-5" />
                재시작
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-300 px-4 py-3 text-base font-semibold text-neutral-700 transition-all hover:bg-neutral-50"
              >
                <RotateCcw className="h-5 w-5" />
                리셋
              </button>
            </div>
          )}

          {/* 심호흡 토글 */}
          {(isRunning || remainingSeconds < TIMER_DURATION) && (
            <button
              onClick={() => setShowBreathing((prev) => !prev)}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                showBreathing
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              )}
            >
              <Wind className="h-4 w-4" />
              {showBreathing ? '심호흡 가이드 끄기' : '심호흡 가이드 켜기'}
            </button>
          )}
        </div>
      )}

      {/* 완료 후 버튼 */}
      {isCompleted && (
        <div className="space-y-3">
          <button
            onClick={onSuccess}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-success px-4 py-3 text-base font-semibold text-white transition-all hover:bg-success/90"
          >
            <CheckCircle2 className="h-5 w-5" />
            극복했습니다!
          </button>
          <button
            onClick={onFailed}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-selfcompassion px-4 py-3 text-base font-semibold text-selfcompassion transition-all hover:bg-selfcompassion/5"
          >
            <Heart className="h-5 w-5" />
            먹었습니다
          </button>
        </div>
      )}
    </div>
  );
}
