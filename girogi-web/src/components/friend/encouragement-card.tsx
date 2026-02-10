/**
 * 응원 메시지 카드
 *
 * 비교 결과에 따른 동기부여 메시지
 * - 앞서고 있을 때: 계속 유지 격려
 * - 뒤처졌을 때: 따라잡기 격려
 * - 동점일 때: 선의의 경쟁 격려
 */

'use client';

import { ComparisonResult, EncouragementType, EncouragementMessage } from '@/types/friend';
import { cn } from '@/lib/utils';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export interface EncouragementCardProps {
  comparison: ComparisonResult;
}

export function EncouragementCard({ comparison }: EncouragementCardProps) {
  const { myProfile, friendProfile, winner, difference } = comparison;

  // 응원 메시지 생성
  const getMessage = (): EncouragementMessage => {
    const friendName = friendProfile.user.username;

    if (winner === 'me') {
      if (difference >= 7) {
        return {
          type: 'ahead',
          emoji: '🔥',
          title: '압도적 1위!',
          message: `${friendName}님을 ${difference}일 앞서고 있어요! 계속 이대로만 가면 승리는 당신 것!`,
        };
      } else {
        return {
          type: 'ahead',
          emoji: '💪',
          title: '조금 앞서고 있어요!',
          message: `${friendName}님보다 ${difference}일 앞서요. 하지만 방심은 금물! 꾸준히 기록하세요.`,
        };
      }
    } else if (winner === 'friend') {
      if (difference <= 3) {
        return {
          type: 'catchup',
          emoji: '⚡',
          title: '따라잡을 수 있어요!',
          message: `${friendName}님과 ${difference}일 차이! 오늘부터 3일만 연속 기록하면 역전 가능!`,
        };
      } else {
        return {
          type: 'behind',
          emoji: '🚀',
          title: '아직 늦지 않았어요!',
          message: `${friendName}님보다 ${difference}일 뒤처졌지만 괜찮아요. 지금부터 시작하면 따라잡을 수 있어요!`,
        };
      }
    } else {
      return {
        type: 'tie',
        emoji: '🤝',
        title: '완벽한 동점!',
        message: `${friendName}님과 동률이에요! 선의의 경쟁을 이어가세요. 누가 먼저 앞서갈까요?`,
      };
    }
  };

  const message = getMessage();

  // 타입별 스타일
  const getStyle = (type: EncouragementType) => {
    switch (type) {
      case 'ahead':
        return {
          icon: Sparkles,
          gradient: 'from-green-400 to-emerald-600',
          bgGradient: 'from-green-50 to-emerald-50',
          borderColor: 'border-green-200',
        };
      case 'catchup':
        return {
          icon: Zap,
          gradient: 'from-yellow-400 to-orange-600',
          bgGradient: 'from-yellow-50 to-orange-50',
          borderColor: 'border-yellow-200',
        };
      case 'behind':
        return {
          icon: TrendingUp,
          gradient: 'from-blue-400 to-blue-600',
          bgGradient: 'from-blue-50 to-indigo-50',
          borderColor: 'border-blue-200',
        };
      case 'tie':
        return {
          icon: Users,
          gradient: 'from-purple-400 to-purple-600',
          bgGradient: 'from-purple-50 to-pink-50',
          borderColor: 'border-purple-200',
        };
    }
  };

  const style = getStyle(message.type);
  const Icon = style.icon;

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-6',
        `bg-gradient-to-br ${style.bgGradient}`,
        style.borderColor
      )}
    >
      {/* 이모지 */}
      <div className="mb-4 text-center text-5xl">{message.emoji}</div>

      {/* 제목 */}
      <h3 className="mb-2 text-center text-xl font-bold text-neutral-800">{message.title}</h3>

      {/* 메시지 */}
      <p className="mb-4 text-center text-sm text-neutral-700">{message.message}</p>

      {/* 액션 버튼 */}
      <button
        type="button"
        className={cn(
          'w-full rounded-xl py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95',
          `bg-gradient-to-r ${style.gradient}`
        )}
      >
        <Icon className="mr-2 inline h-5 w-5" />
        {message.type === 'ahead' && '기록 계속하기'}
        {message.type === 'catchup' && '따라잡으러 가기'}
        {message.type === 'behind' && '다시 시작하기'}
        {message.type === 'tie' && '오늘도 기록하기'}
      </button>
    </div>
  );
}
