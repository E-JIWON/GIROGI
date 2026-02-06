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
import { ChecklistTimeSection } from '@/components/checklist/ChecklistTimeSection';
import { MealRecordButton } from '@/components/checklist/MealRecordButton';
import { MealTime } from '@/types/enums';

interface ChecklistItem {
  title: string;
  isChecked: boolean;
}

interface MealRecords {
  [key: string]: boolean;
}

export default function ChecklistPage() {
  // 아침 체크리스트
  const [breakfastChecklist, setBreakfastChecklist] = useState<ChecklistItem[]>([
    { title: '물 한 잔 마시기', isChecked: true },
    { title: '체중 측정하기', isChecked: true },
    { title: '스트레칭 5분', isChecked: false },
  ]);

  // 점심 체크리스트
  const [lunchChecklist, setLunchChecklist] = useState<ChecklistItem[]>([
    { title: '식사 30회 이상 씹기', isChecked: false },
    { title: '채소 먼저 먹기', isChecked: false },
    { title: '배부를 때까지만 먹기', isChecked: false },
  ]);

  // 저녁 체크리스트
  const [dinnerChecklist, setDinnerChecklist] = useState<ChecklistItem[]>([
    { title: '8시 전 식사 완료', isChecked: false },
    { title: '천천히 먹기', isChecked: false },
    { title: '과식하지 않기', isChecked: false },
  ]);

  // 운동 체크리스트
  const [exerciseChecklist, setExerciseChecklist] = useState<ChecklistItem[]>([
    { title: '계단 이용하기', isChecked: false },
    { title: '스트레칭 10분', isChecked: false },
    { title: '산책 20분', isChecked: false },
  ]);

  // 식사 기록 여부 (아침/점심/저녁)
  const [mealRecords, setMealRecords] = useState<MealRecords>({
    아침: true,
    점심: false,
    저녁: false,
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

  // 식사 기록 핸들러 (TODO: 실제 식사 기록 페이지로 이동)
  const handleMealRecordTap = (mealLabel: string) => {
    console.log(`${mealLabel} 기록하기 클릭`);
    // TODO: 식사 기록 다이얼로그 또는 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-grey-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <h1 className="text-xl font-bold text-grey-900">오늘의 체크리스트</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="space-y-6">
          {/* 외식 경고 배너 (주 3회 이상 시) */}
          {weeklyDiningOutCount >= 3 && (
            <div className="flex gap-3 rounded-lg border border-warning/20 bg-warning/10 p-4">
              <AlertTriangle className="h-6 w-6 shrink-0 text-warning" />
              <div>
                <p className="font-semibold text-warning">외식 빈도 경고</p>
                <p className="mt-1 text-sm text-grey-700">
                  이번 주 외식 {weeklyDiningOutCount}회 기록되었습니다.
                  집밥 먹기를 추천합니다!
                </p>
              </div>
            </div>
          )}

          {/* 아침 섹션 */}
          <section>
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
          <section>
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
          <section>
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
          <section>
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
    </div>
  );
}
