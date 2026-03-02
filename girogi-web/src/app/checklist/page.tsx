/**
 * 체크리스트 페이지
 *
 * 주요 기능:
 * - 시간대별 체크리스트 (아침/점심/저녁/운동)
 * - 식사 기록 버튼 (사진, 장소, 메뉴, 준수 행동)
 * - 외식 경고 (주 3회 이상 시)
 *
 * Flutter: lib/presentation/screens/checklist/checklist_screen.dart
 */

'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ChecklistTimeSection } from './_components/checklist-time-section';
import { MealRecordButton } from './_components/meal-record-button';
import { MealRecordSheet } from './_components/meal-record-sheet';
import { MealTime } from '@/types/enums';
import { MealRecord } from '@/types/models';

interface ChecklistItem {
  title: string;
  isChecked: boolean;
  when?: string;
  where?: string;
  what?: string;
  icon?: string;
}

interface MealRecords {
  [key: string]: boolean;
}

export default function ChecklistPage() {
  // 아침 체크리스트 (When-Where-What 형식)
  const [breakfastChecklist, setBreakfastChecklist] = useState<ChecklistItem[]>([
    {
      title: '물 한 잔 마시기',
      when: '기상 후',
      where: '침실',
      what: '물 한 잔 마시기',
      icon: '💧',
      isChecked: true,
    },
    {
      title: '체중 측정하기',
      when: '아침 식사 전',
      where: '화장실',
      what: '체중 측정하기',
      icon: '⚖️',
      isChecked: true,
    },
    {
      title: '스트레칭 5분',
      when: '아침 시간',
      where: '거실',
      what: '스트레칭 5분',
      icon: '🧘',
      isChecked: false,
    },
  ]);

  // 점심 체크리스트 (When-Where-What 형식)
  const [lunchChecklist, setLunchChecklist] = useState<ChecklistItem[]>([
    {
      title: '식사 30회 이상 씹기',
      when: '식사 중',
      where: '식당',
      what: '한 입당 30회 씹기',
      icon: '😋',
      isChecked: false,
    },
    {
      title: '채소 먼저 먹기',
      when: '식사 시작',
      where: '식당',
      what: '채소 반찬 먼저 먹기',
      icon: '🥗',
      isChecked: false,
    },
    {
      title: '배부를 때까지만 먹기',
      when: '식사 중',
      where: '식당',
      what: '80% 배부름에 멈추기',
      icon: '🍽️',
      isChecked: false,
    },
  ]);

  // 저녁 체크리스트 (When-Where-What 형식)
  const [dinnerChecklist, setDinnerChecklist] = useState<ChecklistItem[]>([
    {
      title: '8시 전 식사 완료',
      when: '오후 8시 전',
      where: '집',
      what: '저녁 식사 완료',
      icon: '⏰',
      isChecked: false,
    },
    {
      title: '천천히 먹기',
      when: '식사 중',
      where: '식탁',
      what: '20분 이상 천천히 먹기',
      icon: '🐌',
      isChecked: false,
    },
    {
      title: '과식하지 않기',
      when: '식사 중',
      where: '식탁',
      what: '작은 그릇 사용하기',
      icon: '🍽️',
      isChecked: false,
    },
  ]);

  // 운동 체크리스트 (When-Where-What 형식)
  const [exerciseChecklist, setExerciseChecklist] = useState<ChecklistItem[]>([
    {
      title: '계단 이용하기',
      when: '출퇴근 시',
      where: '건물',
      what: '엘리베이터 대신 계단 이용',
      icon: '🚶',
      isChecked: false,
    },
    {
      title: '스트레칭 10분',
      when: '저녁 시간',
      where: '집',
      what: '전신 스트레칭 10분',
      icon: '🧘',
      isChecked: false,
    },
    {
      title: '산책 20분',
      when: '저녁 식사 후',
      where: '근처 공원',
      what: '가볍게 산책 20분',
      icon: '🚶‍♂️',
      isChecked: false,
    },
  ]);

  // 식사 기록 여부 (아침/점심/저녁)
  const [mealRecords, setMealRecords] = useState<MealRecords>({
    아침: true,
    점심: false,
    저녁: false,
  });

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

  // 체크리스트 토글 핸들러
  const handleToggle = (
    list: ChecklistItem[],
    setList: React.Dispatch<React.SetStateAction<ChecklistItem[]>>,
    index: number
  ) => {
    const newList = [...list];
    newList[index].isChecked = !newList[index].isChecked;
    setList(newList);
  };

  // 식사 기록 Sheet 열기
  const handleMealRecordTap = (mealLabel: string) => {
    const mealTimeMap: Record<string, MealTime> = {
      아침: MealTime.BREAKFAST,
      점심: MealTime.LUNCH,
      저녁: MealTime.DINNER,
    };

    setSheetState({
      isOpen: true,
      mealTime: mealTimeMap[mealLabel],
    });
  };

  // 식사 기록 저장
  const handleSaveMealRecord = (record: Partial<MealRecord>) => {
    console.log('Meal record saved:', record);

    // 기록 완료 표시
    const mealTimeToLabel: Record<MealTime, string> = {
      [MealTime.BREAKFAST]: '아침',
      [MealTime.LUNCH]: '점심',
      [MealTime.DINNER]: '저녁',
      [MealTime.SNACK]: '간식',
    };

    if (record.mealTime) {
      const label = mealTimeToLabel[record.mealTime];
      setMealRecords((prev) => ({ ...prev, [label]: true }));
    }

    // TODO: DailyRecord에 추가
  };

  // Sheet 닫기
  const handleCloseSheet = () => {
    setSheetState({ isOpen: false, mealTime: null });
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

          {/* 모바일: 세로 스택 / 데스크탑: 2x2 그리드 */}
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            {/* 아침 섹션 */}
            <section className="rounded-2xl bg-white p-5">
              <ChecklistTimeSection
                mealTime={MealTime.BREAKFAST}
                items={breakfastChecklist}
                onToggle={(index) =>
                  handleToggle(breakfastChecklist, setBreakfastChecklist, index)
                }
              />
              <div className="mt-3">
                <MealRecordButton
                  mealLabel="아침"
                  hasRecord={mealRecords['아침']}
                  onTap={() => handleMealRecordTap('아침')}
                />
              </div>
            </section>

            {/* 점심 섹션 */}
            <section className="rounded-2xl bg-white p-5">
              <ChecklistTimeSection
                mealTime={MealTime.LUNCH}
                items={lunchChecklist}
                onToggle={(index) =>
                  handleToggle(lunchChecklist, setLunchChecklist, index)
                }
              />
              <div className="mt-3">
                <MealRecordButton
                  mealLabel="점심"
                  hasRecord={mealRecords['점심']}
                  onTap={() => handleMealRecordTap('점심')}
                />
              </div>
            </section>

            {/* 저녁 섹션 */}
            <section className="rounded-2xl bg-white p-5">
              <ChecklistTimeSection
                mealTime={MealTime.DINNER}
                items={dinnerChecklist}
                onToggle={(index) =>
                  handleToggle(dinnerChecklist, setDinnerChecklist, index)
                }
              />
              <div className="mt-3">
                <MealRecordButton
                  mealLabel="저녁"
                  hasRecord={mealRecords['저녁']}
                  onTap={() => handleMealRecordTap('저녁')}
                />
              </div>
            </section>

            {/* 운동 섹션 (식사 기록 버튼 없음) */}
            <section className="rounded-2xl bg-white p-5">
              <ChecklistTimeSection
                mealTime={MealTime.BREAKFAST} // TODO: MealTime enum에 EXERCISE 추가 필요
                items={exerciseChecklist}
                onToggle={(index) =>
                  handleToggle(exerciseChecklist, setExerciseChecklist, index)
                }
              />
            </section>
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
