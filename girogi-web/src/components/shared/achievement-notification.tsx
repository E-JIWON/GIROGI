/**
 * 업적 달성 알림 컴포넌트
 *
 * 업적 달성 시 표시
 * Confetti + 칭호 표시
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Achievement } from '@/types/achievement';
import { Crown } from 'lucide-react';

export interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
  autoCloseDuration?: number;
}

export function AchievementNotification({
  achievement,
  onClose,
  autoCloseDuration = 4000,
}: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 골드 Confetti
    fireGoldConfetti();

    // 햅틱 피드백 (더 강하게)
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 100, 50]);
    }

    // 자동 닫기
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [achievement, autoCloseDuration, onClose]);

  const fireGoldConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF8C00'], // 골드 색상
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
          />

          {/* Achievement Card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 p-8 shadow-2xl">
              {/* Crown Icon */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 flex justify-center"
              >
                <Crown className="h-16 w-16 fill-yellow-500 text-yellow-600" />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-2 text-center"
              >
                <h3 className="text-2xl font-bold text-yellow-800">🎉 업적 달성!</h3>
              </motion.div>

              {/* Achievement Info */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 rounded-xl bg-white p-6 text-center shadow-md"
              >
                <div className="mb-2 text-6xl">{achievement.emoji}</div>
                <h4 className="mb-2 text-xl font-bold text-neutral-700">
                  {achievement.name}
                </h4>
                <p className="text-sm text-neutral-600">{achievement.description}</p>
              </motion.div>

              {/* Reward */}
              {achievement.reward.type === 'title' && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4 rounded-lg bg-yellow-100 p-4 text-center"
                >
                  <p className="mb-1 text-sm font-medium text-yellow-800">칭호 획득</p>
                  <p className="text-lg font-bold text-yellow-900">
                    "{achievement.reward.value}"
                  </p>
                </motion.div>
              )}

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                type="button"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="w-full rounded-lg bg-yellow-500 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-yellow-600"
              >
                최고예요! 🎊
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
