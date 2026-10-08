'use client';

/** 레이아웃 — 3열 · 벤토를 실제 컴포넌트로 축소 렌더 (zoom 0.62) */

import { useState } from 'react';
import { Apple, Moon, Utensils, Users } from 'lucide-react';
import { WidgetCard } from '@/components/common/widget-card';
import { ProfilePanel } from '../../home/_components/journal/profile-panel';
import { MissionDrawer, type MissionItem } from '../../home/_components/journal/mission-drawer';
import { StreakBanner } from '../../home/_components/journal/streak-banner';
import { PhotoStrip } from '../../home/_components/journal/photo-strip';
import { RecordList } from '../../home/_components/journal/record-list';
import { RewardStatusCard } from '../../home/_components/reward-status-card';
import { WEEK_V } from './week';
import { GRASS, MEALS, WEIGHT, type Variant } from './shared';

const Calendar = WEEK_V[0].Render;
const INIT: MissionItem[] = [
  { id: 'm1', title: '아침 식사 집에서 먹기', description: '외식/배달 대신 집에서 직접 조리', isCompleted: true, icon: Apple },
  { id: 'm2', title: '점심 30회 이상 씹기', description: '천천히 먹어서 포만감 높이기', isCompleted: true, icon: Utensils },
  { id: 'm3', title: '저녁 8시 전 식사 완료', description: '야식 방지 및 소화 시간 확보', isCompleted: false, icon: Moon },
];
function useM() { const [m, setM] = useState(INIT); return { m, t: (id: string) => setM((p) => p.map((x) => (x.id === id ? { ...x, isCompleted: !x.isCompleted } : x))) }; }
const Friends = () => (
  <div><div className="mb-2 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-2"><Users size={13} /> 친구</div>
    {[['운동왕', 21], ['건강한밥', 9], ['다시시작', 1]].map(([n, d]) => <div key={String(n)} className="flex items-center justify-between py-1 text-[12px]"><span className="text-ink-2">{n}</span><span className="tabular-nums text-ink-4">{d}일</span></div>)}
  </div>
);
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-[12px] border border-border bg-surface-warm">
    <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2 text-[11px] text-ink-4"><b className="text-ink">GIROGI</b> 오늘 · 체크리스트 · 유혹 극복 · 커뮤니티<span className="ml-auto">10월 8일 · 7일 연속</span></div>
    <div className="@container p-5" style={{ zoom: 0.62, width: 1160 }}>{children}</div>
  </div>
);

function ThreeCol() {
  const { m, t } = useM();
  return (
    <Frame>
      <div className="grid grid-cols-[200px_minmax(0,1fr)_240px] gap-8">
        <aside className="flex flex-col gap-5"><ProfilePanel nickname="다이어터" bio="복싱 다이어트 도전 중!" totalDays={31} grass={GRASS} weight={WEIGHT} /><MissionDrawer missions={m} onToggle={t} /></aside>
        <main className="flex flex-col gap-5"><StreakBanner currentStreak={7} /><PhotoStrip meals={MEALS} /><RecordList missions={m} meals={MEALS} onToggleMission={t} /></main>
        <aside className="flex flex-col gap-4"><WidgetCard noPadding><RewardStatusCard snackBoxCount={3} consecutiveDietDays={7} /></WidgetCard><WidgetCard><Calendar /></WidgetCard><WidgetCard><Friends /></WidgetCard></aside>
      </div>
    </Frame>
  );
}
function Bento() {
  const { m, t } = useM();
  return (
    <Frame>
      <div className="grid grid-cols-4 gap-3" style={{ gridAutoRows: 'minmax(120px,auto)' }}>
        <WidgetCard className="col-span-1 row-span-2"><ProfilePanel nickname="다이어터" bio="복싱 다이어트 도전 중!" totalDays={31} grass={GRASS} weight={WEIGHT} /></WidgetCard>
        <div className="col-span-3"><StreakBanner currentStreak={7} /><div className="mt-3"><PhotoStrip meals={MEALS} /></div></div>
        <WidgetCard className="col-span-2 row-span-2"><RecordList missions={m} meals={MEALS} onToggleMission={t} /></WidgetCard>
        <WidgetCard className="col-span-1"><MissionDrawer missions={m} onToggle={t} /></WidgetCard>
        <WidgetCard className="col-span-1"><Calendar /></WidgetCard>
        <WidgetCard noPadding className="col-span-2"><RewardStatusCard snackBoxCount={3} consecutiveDietDays={7} /></WidgetCard>
        <WidgetCard className="col-span-1"><Friends /></WidgetCard>
      </div>
    </Frame>
  );
}

export const LAYOUT: Variant[] = [
  { key: 'three', name: '3열 — 패널 | 본문 | 보조', recommended: true, why: '실제 컴포넌트로 렌더(62% 축소). 왼쪽 "나", 가운데 "오늘 쌓인 것", 오른쪽 "보상·달력·친구". 본문이 기록에만 집중한다. 1280px 이상에서만 3열, 그 아래는 보조 열이 본문 밑으로.', Render: () => <ThreeCol /> },
  { key: 'bento', name: '벤토 그리드', why: '실제 컴포넌트로 렌더. 기록이 2×2로 가장 크고, 프로필·미션·달력·보상·친구가 1×1~2×1 타일. 대시보드처럼 한눈에 다 보이지만 칸마다 높이가 달라 빈틈이 생긴다(기록이 길면 옆 타일이 늘어남).', Render: () => <Bento /> },
];
