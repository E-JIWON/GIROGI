/**
 * 홈 — 저널 셸 본문 (bongchil-diary 메인 결)
 *
 * PC: 좌측 200px 패널(프로필·미션 서랍·보상) + 본문(배너·식사 사진·오늘 기록)
 * 모바일: 한 열. 셸(헤더·저널 바·하단 독)은 layout.tsx가 그린다.
 */

'use client';

import { useState, useEffect } from 'react';
import { Apple, Utensils, Moon, Camera, ChevronRight, Flame, Plus } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button, TodoCheckbox } from 'bongchil-design-system';
import { RewardStatusCard } from './home/_components/reward-status-card';
import { WidgetCard } from '@/components/common/widget-card';
import { mockDailyRecords, getMockDailyRecordByDate } from '@/lib/mock/dailyRecords';
import { mockCurrentUser } from '@/lib/mock/users';
import { SNACK_BOX_COUNT_KEY } from '@/lib/constants';
import { useStreakStore } from '@/stores/streakStore';
import { useMealRecordStore } from '@/stores/mealRecordStore';
import { MealTimeDisplayNames, MealPlaceDisplayNames } from '@/types/enums';

interface Mission {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  icon: typeof Apple;
}

const MISSIONS: Mission[] = [
  { id: 'mission1', title: '아침 식사 집에서 먹기', description: '외식/배달 대신 집에서 직접 조리', isCompleted: false, icon: Apple },
  { id: 'mission2', title: '점심 30회 이상 씹기', description: '천천히 먹어서 포만감 높이기', isCompleted: false, icon: Utensils },
  { id: 'mission3', title: '저녁 8시 전 식사 완료', description: '야식 방지 및 소화 시간 확보', isCompleted: false, icon: Moon },
];

export default function Home() {
  const streakStore = useStreakStore();
  const { currentStreak, totalDays, weeklyStatus } = streakStore.streakData;
  const mealStore = useMealRecordStore();

  const [snackBoxCount, setSnackBoxCount] = useState(0);
  const [missions, setMissions] = useState<Mission[]>(MISSIONS);

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
  const completedCount = missions.filter((m) => m.isCompleted).length;

  const handleRewardUsed = () => {
    const updatedCount = localStorage.getItem(SNACK_BOX_COUNT_KEY);
    if (updatedCount) setSnackBoxCount(parseInt(updatedCount));
  };

  // 오늘 식사 — 스토어에 있으면 그것, 없으면 목 기록
  const todayMeals = mealStore.getTodayRecords();
  const meals = todayMeals.length > 0 ? todayMeals : (getMockDailyRecordByDate(new Date())?.meals ?? []);

  // 최근 28일 잔디 (목 기록 기준 성공일)
  const grass = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return getMockDailyRecordByDate(d)?.isSuccessDay ?? false;
  });

  return (
    <div className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="grid gap-6 @3xl:grid-cols-[200px_minmax(0,1fr)] @3xl:gap-x-9">
        {/* ── 좌측 패널 ── */}
        <aside className="flex flex-col gap-5">
          {/* 프로필 + 잔디 */}
          <div className="flex items-center gap-3.5 px-1">
            <span
              className="grid size-[62px] shrink-0 place-items-center rounded-[14px] bg-primary-subtle text-[20px] font-bold text-primary"
              style={{ border: '2px dotted var(--color-primary-muted)' }}
            >
              {mockCurrentUser.nickname[0]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[13.5px] font-semibold tracking-tight text-ink">{mockCurrentUser.nickname}</span>
                <span className="shrink-0 font-mono text-[10.5px] font-medium text-primary/55">D+{totalDays}</span>
              </div>
              <div className="mt-0.5 truncate text-[11.5px] leading-[1.45] text-ink-4">{mockCurrentUser.bio ?? '의지력 말고 시스템으로'}</div>
              <div className="mt-1.5 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]">
                {grass.map((on, i) => (
                  <span key={i} className={`h-[7px] rounded-[2px] ${on ? 'bg-primary/80' : 'bg-ink-5/40'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* 미션 서랍 */}
          <div>
            <div className="mb-2 flex items-baseline gap-2 px-1">
              <span className="text-[12.5px] font-semibold text-ink-2">오늘의 핵심 미션</span>
              <span className="text-[11px] text-ink-4">{completedCount}/3{completedCount >= 2 && <b className="ml-1 text-primary">성공</b>}</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {missions.map((m) => (
                <Button key={m.id} variant="grain" size="sm" icon={m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => toggleMission(m.id)}>
                  {m.title}
                </Button>
              ))}
            </div>
            <p className="mt-2 px-1 text-[10.5px] leading-relaxed text-ink-4">3개 중 2개만 달성하면 오늘 성공. 체크리스트에서 바꿀 수 있어요.</p>
          </div>

          {/* 이번 주 */}
          <div className="border-t border-border/60 pt-4">
            <span className="mb-2 block px-1 text-[10.5px] text-ink-4">이번 주</span>
            <div className="grid grid-cols-7 gap-1 px-1">
              {['월', '화', '수', '목', '금', '토', '일'].map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-1">
                  <span className={`h-6 w-full rounded-[5px] ${weeklyStatus[i] ? 'bg-primary' : 'border-[1.5px] border-dashed border-ink/20'}`} />
                  <span className="text-[9.5px] text-ink-4">{d}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* ── 본문 ── */}
        <div className="flex flex-col gap-5">
          {/* 배너 */}
          <div className="flex items-center gap-3 rounded-[13px] bg-primary-subtle px-3.5 py-2.5">
            <Flame size={14} className="shrink-0 text-primary" />
            <span className="text-[12px] text-ink-2">
              {currentStreak > 0 ? (
                <>연속 <b className="text-primary">{currentStreak}일째</b>. 오늘 미션 2개면 {currentStreak + 1}일이 돼요.</>
              ) : (
                <>오늘부터 다시. 미션 2개만 채우면 연속 1일이 시작돼요.</>
              )}
            </span>
            <Link href="/checklist" className="ml-auto shrink-0 text-ink-4"><ChevronRight size={13} /></Link>
          </div>

          {/* 사진 스트립 */}
          <div>
            <header className="mb-2.5 flex items-baseline gap-2 px-1">
              <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">사진</h2>
              <span className="text-xs text-ink-4">{meals.filter((m) => m.imageUrl).length}장</span>
              <span className="ml-1 flex-1 self-center border-t border-dashed border-primary/35" />
              <Link href="/profile" className="text-[11px] font-medium text-ink-4 hover:text-primary">타임라인</Link>
            </header>
            <div className="scrollbar-hide flex gap-2 overflow-x-auto px-1">
              {meals.map((m) => (
                <div key={m.id} className="relative h-[84px] w-[96px] shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface-warm/40">
                  {m.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.imageUrl} alt={m.menu} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center text-ink-4"><Camera size={16} /></div>
                  )}
                  <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/45 to-transparent px-1.5 pb-1 pt-3 text-[9px] text-white">
                    {MealTimeDisplayNames[m.mealTime]} · {m.menu}
                  </span>
                </div>
              ))}
              <Button variant="dotted" size="sm" icon={Plus} href="/checklist" className="!h-auto !w-11 shrink-0 justify-center !rounded-xl" aria-label="식사 기록" />
            </div>
          </div>

          {/* 오늘 기록 */}
          <div>
            <header className="mb-2 flex items-baseline gap-2 px-1">
              <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">기록</h2>
              <span className="text-xs text-ink-4">오늘 {completedCount + meals.length}건</span>
            </header>
            <WidgetCard noPadding className="divide-y divide-border/60">
              {missions.map((m) => (
                <div key={m.id} className="flex items-center gap-3 px-4 py-2.5">
                  <TodoCheckbox size={15} done={m.isCompleted} onClick={() => toggleMission(m.id)} />
                  <div className="min-w-0 flex-1">
                    <div className={`text-[12.5px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</div>
                    <div className="text-[10.5px] text-ink-4">{m.description}</div>
                  </div>
                </div>
              ))}
              {meals.map((m) => (
                <div key={m.id} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="grid size-[15px] place-items-center text-ink-4"><Camera size={12} /></span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink-2">
                    {MealTimeDisplayNames[m.mealTime]} · {m.menu}
                    <span className="ml-1.5 text-ink-4">{MealPlaceDisplayNames[m.place]}</span>
                  </span>
                  <span className="font-mono text-[10px] text-ink-4">{format(new Date(m.createdAt), 'HH:mm')}</span>
                </div>
              ))}
              {meals.length === 0 && (
                <div className="px-4 py-3 text-[12px] text-ink-4">아직 식사 기록이 없어요. 하단 독의 + 식사로 적어보세요.</div>
              )}
            </WidgetCard>
          </div>

          {/* 보상 */}
          <WidgetCard noPadding className="overflow-hidden">
            <RewardStatusCard snackBoxCount={snackBoxCount} consecutiveDietDays={currentStreak} userId={mockCurrentUser.id} onRewardUsed={handleRewardUsed} />
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
