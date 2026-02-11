/**
 * 몸무게 비교 컴포넌트
 *
 * 나 vs 친구 체중 7일 추이 비교
 * - 단일 SVG 차트에 두 라인 겹침
 * - 나: 초록, 친구: 빨강
 * - Y축/X축 + 상대 범위 (min~max)
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
  if (myWeightHistory.length === 0 && friendWeightHistory.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500">
        <Scale className="mx-auto mb-3 h-10 w-10 text-neutral-300" />
        <p>아직 체중 기록이 없어요.</p>
      </div>
    );
  }

  // 최근 7일치만 추출
  const getLast7Days = (history: WeightRecord[]): WeightRecord[] => {
    const sorted = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sorted.slice(-7);
  };

  const myData = getLast7Days(myWeightHistory);
  const friendData = getLast7Days(friendWeightHistory);

  // 감량 수치 계산
  const getWeightChange = (history: WeightRecord[]) => {
    if (history.length < 2) return { start: history[0]?.weight ?? 0, end: history[0]?.weight ?? 0, change: 0 };
    const sorted = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const start = sorted[0].weight;
    const end = sorted[sorted.length - 1].weight;
    return { start, end, change: Math.round((end - start) * 10) / 10 };
  };

  const myChange = getWeightChange(myData);
  const friendChange = getWeightChange(friendData);

  const myChangePercent = myChange.start > 0 ? Math.round(((myChange.start - myChange.end) / myChange.start) * 1000) / 10 : 0;
  const friendChangePercent = friendChange.start > 0 ? Math.round(((friendChange.start - friendChange.end) / friendChange.start) * 1000) / 10 : 0;

  const changeWinner = myChangePercent > friendChangePercent ? 'me' : myChangePercent < friendChangePercent ? 'friend' : ('tie' as const);

  const TrendIcon = ({ change }: { change: number }) => {
    if (change < 0) return <TrendingDown className="h-5 w-5 text-green-600" />;
    if (change > 0) return <TrendingUp className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-neutral-400" />;
  };

  // ── 통합 차트 ──
  const CombinedChart = () => {
    const myWeights = myData.map((d) => d.weight);
    const friendWeights = friendData.map((d) => d.weight);
    const allWeights = [...myWeights, ...friendWeights];

    if (allWeights.length < 2) return null;

    const dataMin = Math.min(...allWeights);
    const dataMax = Math.max(...allWeights);
    const padding = (dataMax - dataMin) * 0.1 || 0.5;
    const minW = dataMin - padding;
    const maxW = dataMax + padding;
    const range = maxW - minW;

    // 차트 크기
    const width = 320;
    const height = 180;
    const left = 44; // Y축 라벨 공간
    const right = 12;
    const top = 16;
    const bottom = 28; // X축 라벨 공간
    const chartW = width - left - right;
    const chartH = height - top - bottom;

    // X축에 쓸 날짜 (7일 기준 - 더 많은 쪽 사용)
    const dateSource = myData.length >= friendData.length ? myData : friendData;
    const xLabels = dateSource.map((d) => {
      const date = new Date(d.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    const maxPoints = Math.max(myData.length, friendData.length);

    // 포인트 좌표 계산
    const toPoints = (weights: number[]) =>
      weights.map((w, i) => ({
        x: left + (weights.length > 1 ? (i / (weights.length - 1)) * chartW : chartW / 2),
        y: top + (1 - (w - minW) / range) * chartH,
      }));

    const myPoints = toPoints(myWeights);
    const friendPoints = toPoints(friendWeights);

    const toPath = (pts: { x: number; y: number }[]) =>
      pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');

    // Y축 눈금 (4단계)
    const yTicks = Array.from({ length: 5 }, (_, i) => {
      const val = minW + (range * i) / 4;
      return { val: Math.round(val * 10) / 10, y: top + chartH - (chartH * i) / 4 };
    });

    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-neutral-700">7일 체중 추이</h4>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <span className="inline-block h-2 w-4 rounded-sm bg-green-500" /> 나
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <span className="inline-block h-2 w-4 rounded-sm bg-red-500" /> {friendName}
            </span>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 200 }}>
          {/* Y축 선 */}
          <line x1={left} y1={top} x2={left} y2={top + chartH} stroke="#d4d4d4" strokeWidth="1" />

          {/* X축 선 */}
          <line x1={left} y1={top + chartH} x2={left + chartW} y2={top + chartH} stroke="#d4d4d4" strokeWidth="1" />

          {/* Y축 눈금 + 라벨 + 가이드라인 */}
          {yTicks.map(({ val, y }, i) => (
            <g key={i}>
              <line x1={left - 4} y1={y} x2={left} y2={y} stroke="#a3a3a3" strokeWidth="1" />
              <line x1={left} y1={y} x2={left + chartW} y2={y} stroke="#e5e5e5" strokeWidth="0.5" strokeDasharray="4,3" />
              <text x={left - 7} y={y + 4} textAnchor="end" fontSize="9" fill="#737373">
                {val}
              </text>
            </g>
          ))}

          {/* X축 라벨 */}
          {xLabels.map((label, i) => {
            const x = left + (maxPoints > 1 ? (i / (maxPoints - 1)) * chartW : chartW / 2);
            return (
              <text key={i} x={x} y={top + chartH + 16} textAnchor="middle" fontSize="9" fill="#737373">
                {label}
              </text>
            );
          })}

          {/* 친구 라인 (빨강, 아래 레이어) */}
          {friendPoints.length >= 2 && (
            <>
              <path d={toPath(friendPoints)} fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {friendPoints.map((p, i) => (
                <circle key={`f${i}`} cx={p.x} cy={p.y} r={i === friendPoints.length - 1 ? 4 : 2.5} fill="#EF4444" stroke="white" strokeWidth="1.5" />
              ))}
            </>
          )}

          {/* 나 라인 (초록, 위 레이어) */}
          {myPoints.length >= 2 && (
            <>
              <path d={toPath(myPoints)} fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {myPoints.map((p, i) => (
                <circle key={`m${i}`} cx={p.x} cy={p.y} r={i === myPoints.length - 1 ? 4 : 2.5} fill="#22C55E" stroke="white" strokeWidth="1.5" />
              ))}
            </>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <Scale className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
        <h3 className="text-lg font-bold text-neutral-800">체중 변화 비교</h3>
        <p className="text-sm text-neutral-500">최근 7일 추이</p>
      </div>

      {/* 감량 수치 비교 카드 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 나 */}
        <div className={cn(
          'rounded-2xl border-2 p-4 text-center',
          changeWinner === 'me' ? 'border-green-400 bg-green-50' : 'border-neutral-200 bg-white'
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
          changeWinner === 'friend' ? 'border-green-400 bg-green-50' : 'border-neutral-200 bg-white'
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

      {changeWinner === 'tie' && (
        <div className="text-center text-sm text-purple-600">동률! 둘 다 화이팅!</div>
      )}

      {/* 통합 7일 추이 차트 */}
      <CombinedChart />

      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
        <p className="text-sm text-indigo-700">
          체중은 하루 1~2kg 변동이 정상이에요. 추이가 중요합니다!
        </p>
      </div>
    </div>
  );
}
