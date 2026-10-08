/**
 * 홈 — 저널 셸 본문 (bongchil-diary 메인 결)
 *
 * PC: 좌측 200px 패널(프로필 · 미션 서랍 · 이번 주) + 본문(배너 · 식사 사진 · 오늘 기록 · 보상)
 * 모바일: 한 열. 셸(헤더 · 저널 바 · 하단 독)은 layout.tsx가 그린다.
 * 조각은 home/_components/journal/ 에 하나씩.
 */

'use client';

import { useState, useEffect } from 'react';
import { Apple, Utensils, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { WidgetCard } from '@/components/common/widget-card';
import { RewardStatusCard } from './home/_components/reward-status-card';
import { ProfilePanel } from './home/_components/journal/profile-panel';
import { MissionDrawer, type MissionItem } from './home/_components/journal/mission-drawer';
import { WeekStrip } from './home/_components/journal/week-strip';
import { StreakBanner } from './home/_components/journal/streak-banner';
import { PhotoStrip } from './home/_components/journal/photo-strip';
import { RecordList } from './home/_components/journal/record-list';
import { mockDailyRecords, getMockDailyRecordByDate } from '@/lib/mock/dailyRecords';
import { mockCurrentUser } from '@/lib/mock/users';
import { SNACK_BOX_COUNT_KEY } from '@/lib/constants';
import { useStreakStore } from '@/stores/streakStore';
import { useMealRecordStore } from '@/stores/mealRecordStore';

// 체중 — 목 값. 체중 기록 스토어가 생기면 getCurrentWeight(stats)로 교체
const WEIGHT = { current: 72.4, yesterday: 72.7, start: 78, target: 68, monthStart: 73.5, monthTarget: 72 };

const MISSIONS: MissionItem[] = [
  { id: 'mission1', title: '아침 식사 집에서 먹기', description: '외식/배달 대신 집에서 직접 조리', isCompleted: false, icon: Apple },
  { id: 'mission2', title: '점심 30회 이상 씹기', description: '천천히 먹어서 포만감 높이기', isCompleted: false, icon: Utensils },
  { id: 'mission3', title: '저녁 8시 전 식사 완료', description: '야식 방지 및 소화 시간 확보', isCompleted: false, icon: Moon },
];

export default function Home() {
  const streakStore = useStreakStore();
  const { currentStreak, totalDays, weeklyStatus } = streakStore.streakData;
  const mealStore = useMealRecordStore();

  const [snackBoxCount, setSnackBoxCount] = useState(0);
  const [missions, setMissions] = useState<MissionItem[]>(MISSIONS);

  useEffect(() => {
    const storedCount = localStorage.getItem(SNACK_BOX_COUNT_KEY);
    if (storedCount) {
      setSnackBoxCount(parseInt(storedCount));
    } else {
      const initialCount = mockCurrentUser.snackBoxCount || 0;
      setSnackBoxCount(initialCount);
      localStorage.setItem(SNACK_BOX_COUNT_KEY, String(initialCount));
    }
    streakStore.updateStreak(mockDailyRecords.map((r) => format(new Date(r.date), 'yyyy-MM-dd')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMission = (id: string) =>
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, isCompleted: !m.isCompleted } : m)));

  const handleRewardUsed = () => {
    const updatedCount = localStorage.getItem(SNACK_BOX_COUNT_KEY);
    if (updatedCount) setSnackBoxCount(parseInt(updatedCount));
  };

  // 오늘 식사 — 스토어에 있으면 그것, 없으면 목 기록
  const todayMeals = mealStore.getTodayRecords();
  const meals = todayMeals.length > 0 ? todayMeals : (getMockDailyRecordByDate(new Date())?.meals ?? []);

  // 최근 28일 잔디
  const grass = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return getMockDailyRecordByDate(d)?.isSuccessDay ?? false;
  });

  return (
    <div className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="grid gap-6 @3xl:grid-cols-[200px_minmax(0,1fr)] @3xl:gap-x-9">
        <aside className="flex flex-col gap-5">
          <ProfilePanel nickname={mockCurrentUser.nickname} bio={mockCurrentUser.bio} totalDays={totalDays} grass={grass} weight={WEIGHT} />
          <MissionDrawer missions={missions} onToggle={toggleMission} />
          <WeekStrip weeklyStatus={weeklyStatus} />
        </aside>

        <div className="flex flex-col gap-5">
          <StreakBanner currentStreak={currentStreak} />
          <PhotoStrip meals={meals} />
          <RecordList missions={missions} meals={meals} onToggleMission={toggleMission} />
          <WidgetCard noPadding>
            <RewardStatusCard snackBoxCount={snackBoxCount} consecutiveDietDays={currentStreak} userId={mockCurrentUser.id} onRewardUsed={handleRewardUsed} />
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
