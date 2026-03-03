/**
 * 홈 페이지
 *
 * 주요 기능:
 * - Streak 카운터 (연속 성공 일수) + 식사 리포트
 * - 핵심 미션 3개 (체크리스트 연동)
 * - 보상 현황 (과자박스, 치팅데이)
 *
 * Flutter: lib/presentation/screens/home/home_screen.dart
 */

'use client';

import { useState, useEffect } from 'react';
import { Apple, Utensils, Moon, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { StreakWidget } from './home/_components/streak-widget';
import { WeeklyFeedback } from './home/_components/weekly-feedback';
import { MissionCard } from './home/_components/mission-card';
import { RewardStatusCard } from './home/_components/reward-status-card';
import { TodayMealsWidget } from './home/_components/today-meals-widget';
import { WidgetCard } from '@/components/common/widget-card';
import {
  mockDailyRecords,
  calculateMockCurrentStreak,
} from '@/lib/mock/dailyRecords';
import { mockCurrentUser } from '@/lib/mock/users';
import { SNACK_BOX_COUNT_KEY } from '@/lib/constants';
import { calculateWeeklyMealStats } from '@/lib/utils/meal-stats';
import { useStreakStore } from '@/stores/streakStore';

interface Mission {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  icon: typeof Apple;
}

export default function Home() {
  const streakStore = useStreakStore();

  // 주간 식사 통계
  const weeklyMealStats = calculateWeeklyMealStats(mockDailyRecords);

  // 과자박스 개수 (localStorage에서 불러오기)
  const [snackBoxCount, setSnackBoxCount] = useState(0);

  useEffect(() => {
    // 초기 과자박스 개수 불러오기
    const storedCount = localStorage.getItem(SNACK_BOX_COUNT_KEY);
    if (storedCount) {
      setSnackBoxCount(parseInt(storedCount));
    } else {
      // 초기값 설정 (Mock 데이터 사용)
      const initialCount = mockCurrentUser.snackBoxCount || 0;
      setSnackBoxCount(initialCount);
      localStorage.setItem(SNACK_BOX_COUNT_KEY, String(initialCount));
    }

    // Streak 데이터 초기화 (Mock 데이터 기반)
    // ISO 문자열 → yyyy-MM-dd 변환 (streakStore가 yyyy-MM-dd로 비교)
    const recordDates = mockDailyRecords.map((record) =>
      format(new Date(record.date), 'yyyy-MM-dd')
    );
    streakStore.updateStreak(recordDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  // 핵심 미션 3개 (체크리스트 페이지에서 설정한 항목)
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'mission1',
      title: '아침 식사 집에서 먹기',
      description: '외식/배달 대신 집에서 직접 조리',
      isCompleted: false,
      icon: Apple,
    },
    {
      id: 'mission2',
      title: '점심 30회 이상 씹기',
      description: '천천히 먹어서 포만감 높이기',
      isCompleted: false,
      icon: Utensils,
    },
    {
      id: 'mission3',
      title: '저녁 8시 전 식사 완료',
      description: '야식 방지 및 소화 시간 확보',
      isCompleted: false,
      icon: Moon,
    },
  ]);

  // 미션 토글 핸들러
  const handleToggleMission = (missionId: string) => {
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === missionId
          ? { ...mission, isCompleted: !mission.isCompleted }
          : mission
      )
    );
  };

  // 완료된 미션 수
  const completedCount = missions.filter((m) => m.isCompleted).length;

  // 보상 사용 후 핸들러
  const handleRewardUsed = () => {
    // localStorage에서 최신 과자박스 개수 불러오기
    const updatedCount = localStorage.getItem(SNACK_BOX_COUNT_KEY);
    if (updatedCount) {
      setSnackBoxCount(parseInt(updatedCount));
    }
  };

  return (
    <div className="min-h-screen">
      {/* 모바일 헤더 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm lg:hidden">
        <div className="px-8 py-4 border-b border-neutral-100">
          <h1 className="text-lg font-semibold text-neutral-700">GIROGI</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="px-4 py-4 lg:px-6">
        {/* 모바일: 세로 스택 / 데스크탑: 3열 위젯 그리드 */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">

          {/* 연속 기록 (2열) */}
          <WidgetCard span={2} noPadding>
            <StreakWidget />
          </WidgetCard>

          {/* 이번 주 식사 리포트 (1열) */}
          <WidgetCard noPadding>
            <WeeklyFeedback
              homeCount={weeklyMealStats.homeCount}
              cafeteriaCount={weeklyMealStats.cafeteriaCount}
              restaurantCount={weeklyMealStats.restaurantCount}
              deliveryCount={weeklyMealStats.deliveryCount}
            />
          </WidgetCard>

          {/* 오늘의 식사 (1열) */}
          <WidgetCard noPadding>
            <TodayMealsWidget />
          </WidgetCard>

          {/* 오늘의 핵심 미션 (2열) */}
          <WidgetCard
            span={2}
            title="오늘의 핵심 미션"
            action={
              <Link
                href="/checklist"
                className="flex items-center gap-1 text-sm text-primary-700 hover:text-primary-800"
              >
                체크리스트
                <ChevronRight className="h-4 w-4" />
              </Link>
            }
          >
            <p className="mb-3 text-sm text-neutral-500">
              체크리스트에서 설정한 핵심 미션이에요. 3개 중 2개만 달성하면 오늘 성공!
            </p>
            <div className="space-y-2">
              {missions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  title={mission.title}
                  description={mission.description}
                  isCompleted={mission.isCompleted}
                  icon={mission.icon}
                  onTap={() => handleToggleMission(mission.id)}
                />
              ))}
            </div>
            {/* 달성 상태 */}
            <div className="mt-3 rounded-lg bg-neutral-50 p-3 text-center">
              <p className="text-sm text-neutral-600">
                오늘 <span className="font-semibold text-primary-700">{completedCount}/3</span> 달성
                {completedCount >= 2 && (
                  <span className="ml-2 font-semibold text-success-700">오늘 성공!</span>
                )}
              </p>
            </div>
          </WidgetCard>

          {/* 보상 현황 (1열) */}
          <WidgetCard noPadding>
            <RewardStatusCard
              snackBoxCount={snackBoxCount}
              consecutiveDietDays={streakStore.streakData.currentStreak}
              userId={mockCurrentUser.id}
              onRewardUsed={handleRewardUsed}
            />
          </WidgetCard>

        </div>
      </main>
    </div>
  );
}
