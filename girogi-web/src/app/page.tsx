/**
 * 홈 — 3열 (컴포넌트 랩에서 채택한 조합)
 *
 * 왼쪽 "나": 프로필(체중 · 7일선 · 잔디) · 핵심 미션(성공선)
 * 가운데 "오늘": 응원 띠 · 오늘 끼니(가로 시간축) · 오늘 기록(시간 막대 + 시간대 카드 3장)
 * 오른쪽 "쌓인 것": 농도 달력 · 보상 · 친구
 * 좁아지면 한 열로 (나 → 오늘 → 쌓인 것)
 */

'use client';

import { useState, useEffect } from 'react';
import { Apple, Utensils, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { ProfilePanel } from './home/_components/journal/profile-panel';
import { MissionDrawer, type MissionItem } from './home/_components/journal/mission-drawer';
import { StreakBanner } from './home/_components/journal/streak-banner';
import { MealTimeline } from './home/_components/journal/meal-timeline';
import { DayBoard } from './home/_components/journal/day-board';
import { MonthCalendar } from './home/_components/journal/month-calendar';
import { RewardPass } from './home/_components/journal/reward-pass';
import { FriendsMini } from './home/_components/journal/friends-mini';
import { mockDailyRecords, getMockDailyRecordByDate } from '@/lib/mock/dailyRecords';
import { mockCurrentUser } from '@/lib/mock/users';
import { SNACK_BOX_COUNT_KEY } from '@/lib/constants';
import { useStreakStore } from '@/stores/streakStore';
import { useMealRecordStore } from '@/stores/mealRecordStore';

// 체중 — 목 값. 체중 기록 스토어가 생기면 교체
const WEIGHT = { current: 72.4, yesterday: 72.7, start: 78, target: 68, monthStart: 73.5, monthTarget: 72 };
const WEIGHT_7D = [73.2, 73.0, 73.1, 72.8, 72.9, 72.7, 72.4];

const MISSIONS: MissionItem[] = [
  { id: 'mission1', slot: '아침', title: '아침 식사 집에서 먹기', description: '외식/배달 대신 집에서 직접 조리', isCompleted: false, icon: Apple },
  { id: 'mission2', slot: '점심', title: '점심 30회 이상 씹기', description: '천천히 먹어서 포만감 높이기', isCompleted: false, icon: Utensils },
  { id: 'mission3', slot: '저녁', title: '저녁 8시 전 식사 완료', description: '야식 방지 및 소화 시간 확보', isCompleted: false, icon: Moon },
];

export default function Home() {
  const streakStore = useStreakStore();
  const { currentStreak, totalDays } = streakStore.streakData;
  const mealStore = useMealRecordStore();

  const [snackBoxCount, setSnackBoxCount] = useState(0);
  const [missions, setMissions] = useState<MissionItem[]>(MISSIONS);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(SNACK_BOX_COUNT_KEY);
    const initial = stored ? parseInt(stored) : mockCurrentUser.snackBoxCount || 0;
    setSnackBoxCount(initial);
    if (!stored) localStorage.setItem(SNACK_BOX_COUNT_KEY, String(initial));
    streakStore.updateStreak(mockDailyRecords.map((r) => format(new Date(r.date), 'yyyy-MM-dd')));
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMission = (id: string) => setMissions((p) => p.map((m) => (m.id === id ? { ...m, isCompleted: !m.isCompleted } : m)));
  const handleRewardUsed = () => {
    const v = localStorage.getItem(SNACK_BOX_COUNT_KEY);
    if (v) setSnackBoxCount(parseInt(v));
  };

  const todayMeals = mealStore.getTodayRecords();
  const meals = todayMeals.length > 0 ? todayMeals : (getMockDailyRecordByDate(new Date())?.meals ?? []);

  const grass = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return getMockDailyRecordByDate(d)?.isSuccessDay ?? false;
  });

  // 이번 달 날짜별 지킨 미션 수 — 목: 성공일은 2~3, 기록만 있으면 1
  const today = now ?? new Date();
  const monthDone: Record<number, number> = {};
  for (let d = 1; d < today.getDate(); d++) {
    const r = getMockDailyRecordByDate(new Date(today.getFullYear(), today.getMonth(), d));
    monthDone[d] = r ? (r.isSuccessDay ? 2 + (d % 2) : 1) : 0;
  }

  return (
    <div className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="grid gap-6 @3xl:grid-cols-[196px_minmax(0,1fr)_224px] @3xl:gap-x-7">
        {/* 나 */}
        <aside className="flex flex-col gap-6">
          <ProfilePanel nickname={mockCurrentUser.nickname} bio={mockCurrentUser.bio} totalDays={totalDays} grass={grass} weight={WEIGHT} weightTrend={WEIGHT_7D} />
          <MissionDrawer missions={missions} onToggle={toggleMission} />
        </aside>

        {/* 오늘 */}
        <div className="@container flex min-w-0 flex-col gap-6">
          <StreakBanner currentStreak={currentStreak} />
          <MealTimeline meals={meals} />
          {now && <DayBoard missions={missions} meals={meals} onToggleMission={toggleMission} now={now} />}
        </div>

        {/* 쌓인 것 */}
        <aside className="flex flex-col gap-6">
          <div className="rounded-[14px] border border-border/60 bg-surface p-3"><MonthCalendar today={today} done={monthDone} /></div>
          <RewardPass snackBoxCount={snackBoxCount} consecutiveDietDays={currentStreak} userId={mockCurrentUser.id} onRewardUsed={handleRewardUsed} />
          <FriendsMini />
        </aside>
      </div>
    </div>
  );
}
