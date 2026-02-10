/**
 * 몸무게 비교 컴포넌트
 *
 * 나 vs 친구 체중 추이 비교
 * - 미니 라인 차트 (SVG)
 * - 감량 수치 비교
 * - 추이 그래프
 */

'use client';

import { WeightRecord } from '@/types';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Scale, Minus } from 'lucide-react';

export interface WeightComparisonProps {
  myWeightHistory: WeightRecord[];
  friendWeightHistory: WeightRecord[];
  friendName: string;
}

export function WeightComparison({
  myWeightHistory,
  friendWeightHistory,
  friendName,
}: WeightComparisonProps) {
  // 데이터가 없으면 빈 상태
  if (myWeightHistory.length === 0 && friendWeightHistory.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500">
        <Scale className="mx-auto mb-3 h-10 w-10 text-neutral-300" />
        <p>아직 체중 기록이 없어요.</p>
      </div>
    );
  }

  // 감량 수치 계산
  const getWeightChange = (history: WeightRecord[]) => {
    if (history.length < 2) return { start: history[0]?.weight ?? 0, end: history[0]?.weight ?? 0, change: 0 };
    const sorted = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const start = sorted[0].weight;
    const end = sorted[sorted.length - 1].weight;
    return { start, end, change: Math.round((end - start) * 10) / 10 };
  };

  const myChange = getWeightChange(myWeightHistory);
  const friendChange = getWeightChange(friendWeightHistory);

  // 감량률 계산
  const myChangePercent = myChange.start > 0 ? Math.round(((myChange.start - myChange.end) / myChange.start) * 1000) / 10 : 0;
  const friendChangePercent = friendChange.start > 0 ? Math.round(((friendChange.start - friendChange.end) / friendChange.start) * 1000) / 10 : 0;

  // 감량 승자
  const changeWinner = myChangePercent > friendChangePercent ? 'me' : myChangePercent < friendChangePercent ? 'friend' : ('tie' as const);

  // SVG 미니 차트 생성
  const MiniChart = ({ data, color }: { data: WeightRecord[]; color: string }) => {
    if (data.length < 2) return null;

    const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const weights = sorted.map((d) => d.weight);
    const minW = Math.min(...weights) - 0.5;
    const maxW = Math.max(...weights) + 0.5;
    const range = maxW - minW || 1;

    const width = 280;
    const height = 80;
    const padding = 8;

    const points = weights.map((w, i) => {
      const x = padding + (i / (weights.length - 1)) * (width - padding * 2);
      const y = padding + (1 - (w - minW) / range) * (height - padding * 2);
      return `${x},${y}`;
    });

    const pathD = points.map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join(' ');

    // 그라데이션 영역
    const areaPath = `${pathD} L${padding + (width - padding * 2)},${height - padding} L${padding},${height - padding} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 80 }}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* 영역 채우기 */}
        <path d={areaPath} fill={`url(#gradient-${color})`} />
        {/* 라인 */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* 포인트 */}
        {points.map((p, i) => {
          const [x, y] = p.split(',').map(Number);
          return (
            <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 4 : 2.5} fill={color} stroke="white" strokeWidth="1.5" />
          );
        })}
      </svg>
    );
  };

  // 트렌드 아이콘
  const TrendIcon = ({ change }: { change: number }) => {
    if (change < 0) return <TrendingDown className="h-5 w-5 text-green-600" />;
    if (change > 0) return <TrendingUp className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-neutral-400" />;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <Scale className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
        <h3 className="text-lg font-bold text-neutral-800">체중 변화 비교</h3>
        <p className="text-sm text-neutral-500">누가 더 열심히 했을까요?</p>
      </div>

      {/* 감량 수치 비교 카드 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 나 */}
        <div className={cn(
          'rounded-2xl border-2 p-4 text-center',
          changeWinner === 'me' ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50' : 'border-neutral-200 bg-white'
        )}>
          <p className="mb-1 text-sm font-medium text-neutral-600">나</p>
          <div className="mb-2 flex items-center justify-center gap-1">
            <TrendIcon change={myChange.change} />
            <span className={cn(
              'text-2xl font-bold',
              myChange.change < 0 ? 'text-green-600' : myChange.change > 0 ? 'text-red-500' : 'text-neutral-500'
            )}>
              {myChange.change > 0 ? '+' : ''}{myChange.change}kg
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            {myChange.start}kg → {myChange.end}kg
          </p>
          <p className={cn(
            'mt-1 text-xs font-semibold',
            myChangePercent > 0 ? 'text-green-600' : 'text-neutral-500'
          )}>
            {myChangePercent > 0 ? `${myChangePercent}% 감량` : '유지 중'}
          </p>
          {changeWinner === 'me' && <p className="mt-2 text-sm">🏆</p>}
        </div>

        {/* 친구 */}
        <div className={cn(
          'rounded-2xl border-2 p-4 text-center',
          changeWinner === 'friend' ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50' : 'border-neutral-200 bg-white'
        )}>
          <p className="mb-1 text-sm font-medium text-neutral-600">{friendName}</p>
          <div className="mb-2 flex items-center justify-center gap-1">
            <TrendIcon change={friendChange.change} />
            <span className={cn(
              'text-2xl font-bold',
              friendChange.change < 0 ? 'text-green-600' : friendChange.change > 0 ? 'text-red-500' : 'text-neutral-500'
            )}>
              {friendChange.change > 0 ? '+' : ''}{friendChange.change}kg
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            {friendChange.start}kg → {friendChange.end}kg
          </p>
          <p className={cn(
            'mt-1 text-xs font-semibold',
            friendChangePercent > 0 ? 'text-green-600' : 'text-neutral-500'
          )}>
            {friendChangePercent > 0 ? `${friendChangePercent}% 감량` : '유지 중'}
          </p>
          {changeWinner === 'friend' && <p className="mt-2 text-sm">🏆</p>}
        </div>
      </div>

      {/* 동점 */}
      {changeWinner === 'tie' && (
        <div className="text-center text-sm text-purple-600">동률! 🤝 둘 다 화이팅!</div>
      )}

      {/* 나의 체중 추이 차트 */}
      {myWeightHistory.length >= 2 && (
        <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-neutral-700">나의 추이</h4>
            <span className="text-xs text-neutral-500">{myWeightHistory.length}회 기록</span>
          </div>
          <MiniChart data={myWeightHistory} color="#4F46E5" />
        </div>
      )}

      {/* 친구 체중 추이 차트 */}
      {friendWeightHistory.length >= 2 && (
        <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-pink-50 to-rose-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-neutral-700">{friendName}의 추이</h4>
            <span className="text-xs text-neutral-500">{friendWeightHistory.length}회 기록</span>
          </div>
          <MiniChart data={friendWeightHistory} color="#E11D48" />
        </div>
      )}

      {/* 격려 문구 */}
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
        <p className="text-sm text-indigo-700">
          💡 체중은 하루 1~2kg 변동이 정상이에요. 추이가 중요합니다!
        </p>
      </div>
    </div>
  );
}
