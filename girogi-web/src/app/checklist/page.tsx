/**
 * 체크리스트 페이지
 *
 * 주요 기능:
 * - 시간대별 체크리스트 (아침/점심/퇴근/저녁/운동)
 * - 식사 기록 버튼 (사진, 장소, 메뉴, 준수 행동)
 * - 외식 경고 (주 3회 이상 시)
 *
 * Flutter: lib/presentation/screens/checklist/checklist_screen.dart
 */

'use client';

import { useState, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ChecklistTimeSection } from './_components/checklist-time-section';
import { MealRecordButton } from './_components/meal-record-button';
import { MealRecordSheet } from './_components/meal-record-sheet';
import { MealRecordSummary } from './_components/meal-record-summary';
import { MealTime, TimeSlot, TimeSlotDisplayNames } from '@/types/enums';
import type { MealRecord } from '@/types/models';
import {
  CHECKLIST_ITEMS,
  CHECKLIST_TIME_SLOT_ORDER,
  MEAL_RECORD_TIME_SLOTS,
} from '@/lib/config/checklist-config';
import { useMealRecordStore } from '@/stores/mealRecordStore';

/** TimeSlot → MealTime 매핑 (식사 관련 슬롯만) */
const TIME_SLOT_TO_MEAL_TIME: Partial<Record<TimeSlot, MealTime>> = {
  [TimeSlot.MORNING]: MealTime.BREAKFAST,
  [TimeSlot.LUNCH]: MealTime.LUNCH,
  [TimeSlot.DINNER]: MealTime.DINNER,
};

export default function ChecklistPage() {
  // 단일 checkStates: Record<itemId, boolean>
  const [checkStates, setCheckStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const item of CHECKLIST_ITEMS) {
      initial[item.id] = false;
    }
    return initial;
  });

  // 식사 기록 스토어
  const mealRecordStore = useMealRecordStore();
  const todayStr = new Date().toISOString().slice(0, 10);

  // Sheet 상태
  const [sheetState, setSheetState] = useState<{
    isOpen: boolean;
    mealTime: MealTime | null;
  }>({
    isOpen: false,
    mealTime: null,
  });

  // 주간 외식 횟수 (Mock 데이터)
  const weeklyDiningOutCount = 2;

  // 체크리스트 토글 핸들러 (id 기반)
  const handleToggle = (id: string) => {
    setCheckStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 시간대별 항목을 isChecked와 합쳐서 생성
  const getItemsForSlot = (timeSlot: TimeSlot) => {
    return CHECKLIST_ITEMS
      .filter((item) => item.timeSlot === timeSlot)
      .map((item) => ({
        id: item.id,
        title: item.title,
        when: item.when,
        where: item.where,
        what: item.what,
        icon: item.icon,
        isChecked: checkStates[item.id] ?? false,
      }));
  };

  // 식사 기록 Sheet 열기
  const handleMealRecordTap = (timeSlot: TimeSlot) => {
    const mealTime = TIME_SLOT_TO_MEAL_TIME[timeSlot];
    if (!mealTime) return;
    setSheetState({ isOpen: true, mealTime });
  };

  // 식사 기록 저장
  const handleSaveMealRecord = (record: Partial<MealRecord>) => {
    if (record.mealTime && record.place && record.menu) {
      mealRecordStore.addRecord({
        mealTime: record.mealTime,
        place: record.place,
        menu: record.menu,
        rating: record.rating,
        comment: record.comment,
        badges: record.badges ?? [],
        achievements: record.achievements ?? [],
      });
    }
  };

  // Sheet 닫기
  const handleCloseSheet = () => {
    setSheetState({ isOpen: false, mealTime: null });
  };

  // 해당 시간대에 식사 기록이 있는지 확인
  const hasMealRecordForSlot = (timeSlot: TimeSlot): boolean => {
    const mealTime = TIME_SLOT_TO_MEAL_TIME[timeSlot];
    if (!mealTime) return false;
    return mealRecordStore.hasMealRecord(todayStr, mealTime);
  };

  // 해당 시간대의 식사 기록 조회
  const getMealRecordForSlot = (timeSlot: TimeSlot): MealRecord | undefined => {
    const mealTime = TIME_SLOT_TO_MEAL_TIME[timeSlot];
    if (!mealTime) return undefined;
    const records = mealRecordStore.getRecordsByDate(todayStr);
    return records.find((r) => r.mealTime === mealTime);
  };

  return (
    <div className="min-h-screen bg-white lg:bg-transparent">
        {/* 모바일 헤더 */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm lg:hidden">
          <div className="px-8 py-4 border-b border-neutral-100">
            <h1 className="text-lg font-semibold text-neutral-700">오늘의 체크리스트</h1>
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="px-4 py-4 lg:px-6">
          {/* 외식 경고 배너 (주 3회 이상 시) */}
          {weeklyDiningOutCount >= 3 && (
            <div className="mb-4 flex gap-3 rounded-2xl bg-peach-50 p-4">
              <AlertTriangle className="h-6 w-6 shrink-0 text-temptation" />
              <div>
                <p className="font-semibold text-temptation">외식 빈도 경고</p>
                <p className="mt-1 text-sm text-neutral-800">
                  이번 주 외식 {weeklyDiningOutCount}회 기록되었습니다.
                  집밥 먹기를 추천합니다!
                </p>
              </div>
            </div>
          )}

          {/* 모바일: 세로 스택 / 데스크탑: 2~3 그리드 */}
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            {CHECKLIST_TIME_SLOT_ORDER.map((timeSlot) => {
              const isMealSlot = MEAL_RECORD_TIME_SLOTS.includes(timeSlot);
              const hasRecord = hasMealRecordForSlot(timeSlot);
              const mealRecord = getMealRecordForSlot(timeSlot);

              return (
                <section key={timeSlot} className="rounded-2xl bg-white p-5">
                  <ChecklistTimeSection
                    timeSlot={timeSlot}
                    items={getItemsForSlot(timeSlot)}
                    onToggle={handleToggle}
                  />

                  {/* 식사 관련 슬롯에만 식사 기록 버튼 표시 */}
                  {isMealSlot && (
                    <div className="mt-3 space-y-2">
                      <MealRecordButton
                        mealLabel={TimeSlotDisplayNames[timeSlot]}
                        hasRecord={hasRecord}
                        onTap={() => handleMealRecordTap(timeSlot)}
                      />
                      {/* 기록 완료 시 요약 표시 */}
                      {hasRecord && mealRecord && (
                        <MealRecordSummary record={mealRecord} />
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </main>

      {/* 식사 기록 Sheet */}
      {sheetState.mealTime && (
        <MealRecordSheet
          isOpen={sheetState.isOpen}
          mealTime={sheetState.mealTime}
          onClose={handleCloseSheet}
          onSave={handleSaveMealRecord}
        />
      )}
    </div>
  );
}
