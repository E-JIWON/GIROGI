/**
 * 홈 페이지
 *
 * 주요 기능:
 * - Streak 카운터 (연속 성공 일수)
 * - 핵심 미션 3개 (3개 중 2개 이상 완료 시 성공)
 * - 주간 캘린더 (7일 성공/실패 기록)
 * - 보상 현황 (과자박스, 치팅데이)
 *
 * Flutter: lib/presentation/screens/home/home_screen.dart
 */

'use client';

import { useState } from 'react';
import { Apple, Utensils, Moon } from 'lucide-react';
import { StreakCounter } from '@/components/home/StreakCounter';
import { MissionCard } from '@/components/home/MissionCard';
import { WeeklyCalendar } from '@/components/home/WeeklyCalendar';
import { RewardStatusCard } from '@/components/home/RewardStatusCard';
import {
  mockDailyRecords,
  calculateMockCurrentStreak,
} from '@/lib/mock/dailyRecords';
import { mockCurrentUser } from '@/lib/mock/users';

interface Mission {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  icon: typeof Apple;
}

export default function Home() {
  // Streak 데이터
  const currentStreak = calculateMockCurrentStreak();
  const bestStreak = mockCurrentUser.bestStreak || 12; // TODO: 실제 최고 기록 계산

  // 주간 기록 데이터 (최근 7일)
  const weeklyRecords = mockDailyRecords
    .slice(0, 7)
    .reverse()
    .map((record) => record.isSuccessDay);

  // 핵심 미션 3개
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

  return (
    <div className="min-h-screen bg-grey-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <h1 className="text-xl font-bold text-grey-900">GIROGI</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="space-y-6">
          {/* Streak 카운터 */}
          <StreakCounter
            currentStreak={currentStreak}
            bestStreak={bestStreak}
          />

          {/* 핵심 미션 섹션 */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-grey-900">
              오늘의 핵심 미션
            </h2>
            <div className="space-y-3">
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
          </section>

          {/* 주간 캘린더 */}
          <WeeklyCalendar weeklyRecords={weeklyRecords} />

          {/* 보상 현황 */}
          <RewardStatusCard
            snackBoxCount={mockCurrentUser.snackBoxCount || 0}
            consecutiveDietDays={currentStreak}
          />
        </div>
      </main>
    </div>
  );
}
