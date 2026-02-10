/**
 * 뱃지 획득 알림 컴포넌트
 *
 * Confetti 애니메이션
 * 획득한 뱃지 리스트 표시
 * "🐟 고등어 뱃지 +1" 형식
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Badge, BadgeNotificationItem } from '@/types/badge';
import { getBadgesByIds } from '@/lib/constants/badges';
import { cn } from '@/lib/utils';

export interface BadgeNotificationProps {
  badges: Badge[];
  onClose: () => void;
  autoCloseDuration?: number; // 자동 닫힘 시간 (ms, 기본 3000)
}

export function BadgeNotification({
  badges,
  onClose,
  autoCloseDuration = 3000,
}: BadgeNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Confetti 발사
    if (badges.length > 0) {
      fireConfetti();
    }

    // 햅틱 피드백
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10]);
    }

    // 자동 닫기
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // 애니메이션 후 닫기
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [badges, autoCloseDuration, onClose]);

  const fireConfetti = () => {
    const count = 100;
    const defaults = {
      origin: { y: 0.6 },
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
          />

          {/* Notification Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl">
              {/* 헤더 */}
              <div className="mb-4 text-center">
                <div className="mb-2 text-5xl">✨</div>
                <h3 className="text-xl font-bold text-neutral-700">뱃지 획득!</h3>
              </div>

              {/* 뱃지 리스트 */}
              <div className="space-y-2">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 rounded-lg bg-primary-50 p-3"
                  >
                    <div className="text-3xl">{badge.emoji}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-700">{badge.name} 뱃지</p>
                      <p className="text-sm text-neutral-500">+1</p>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="text-2xl"
                    >
                      🎉
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* 닫기 버튼 */}
              <button
                type="button"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="mt-4 w-full rounded-lg bg-neutral-100 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-200"
              >
                확인
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
