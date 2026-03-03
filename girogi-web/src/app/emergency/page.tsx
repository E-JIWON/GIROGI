/**
 * 유혹 극복 페이지 (재설계)
 *
 * 감정 기반 개입 시스템:
 * 1. 감정 체크인 → 2. 맞춤 대안 행동 → 3. 가이드 타이머 → 4. 극복 or 자기 연민
 *
 * 심리학 근거:
 * - Appetite Journal 2018: 감정 인식만으로 간식 충동 40% 감소
 * - 4-7-8 호흡법: 자율신경 안정
 * - Self-Compassion (BJP 2021): 실패 후 즉각 복귀 지원
 */

'use client';

import { useState } from 'react';
import {
  Heart,
  RotateCcw,
  FileText,
  Info,
  CheckCircle,
  XCircle,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { WidgetCard } from '@/components/common/widget-card';
import { EmotionCheckIn } from './_components/emotion-check-in';
import { AlternativeActions } from './_components/alternative-actions';
import { GuidedTimer } from './_components/guided-timer';
import { FutureSelfCard } from './_components/future-self-card';
import { FailureReportDialog } from './_components/failure-report-dialog';
import { EmotionType, EmotionTypeDisplayNames } from '@/types/enums';
import { useTemptationStore } from '@/stores/temptationStore';
import { LICENSING_EFFECT_WARNING } from '@/lib/constants';

export default function EmergencyPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { addRecord, getStats, getMonthlyCount } = useTemptationStore();
  const stats = getStats();

  // 목표 데이터 (Mock)
  // TODO: Repository에서 사용자 목표 가져오기
  const goalImageUrl = null;
  const targetWeight = 65.0;
  const currentWeight = 72.5;
  const targetDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  const handleSelectEmotion = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    setSelectedActionId(null);
  };

  const handleSuccess = () => {
    if (selectedEmotion) {
      addRecord({
        emotion: selectedEmotion,
        alternativeActionId: selectedActionId,
        usedTimer: true,
        succeeded: true,
      });
    }
    setSelectedEmotion(null);
    setSelectedActionId(null);
  };

  const handleFailed = () => {
    if (selectedEmotion) {
      addRecord({
        emotion: selectedEmotion,
        alternativeActionId: selectedActionId,
        usedTimer: true,
        succeeded: false,
      });
    }
    setIsDialogOpen(true);
  };

  const handleRestart = () => {
    setSelectedEmotion(null);
    setSelectedActionId(null);
  };

  const monthlyEmotionCount = selectedEmotion ? getMonthlyCount(selectedEmotion) : 0;

  return (
    <div className="min-h-screen bg-white lg:bg-transparent">
      {/* 모바일 헤더 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm lg:hidden">
        <div className="flex items-center justify-between border-b border-neutral-100 px-8 py-4">
          <h1 className="text-lg font-semibold text-neutral-700">유혹 극복</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="px-4 py-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {/* 감정 체크인 */}
          <WidgetCard>
            <EmotionCheckIn
              selectedEmotion={selectedEmotion}
              onSelectEmotion={handleSelectEmotion}
            />
          </WidgetCard>

          {/* 대안 행동 제안 - 감정 선택 후 나타남 */}
          {selectedEmotion ? (
            <WidgetCard span={2}>
              <AlternativeActions
                emotion={selectedEmotion}
                onSelectAction={setSelectedActionId}
              />
            </WidgetCard>
          ) : (
            <WidgetCard span={2} className="flex items-center justify-center">
              <div className="py-8 text-center">
                <p className="text-sm text-neutral-400">
                  왼쪽에서 감정을 선택하면 맞춤 대안 행동이 나타납니다
                </p>
              </div>
            </WidgetCard>
          )}

          {/* 가이드 타이머 */}
          <WidgetCard span={2}>
            <GuidedTimer
              emotion={selectedEmotion}
              onSuccess={handleSuccess}
              onFailed={handleFailed}
            />
          </WidgetCard>

          {/* 미래의 나 (EFT) */}
          <WidgetCard noPadding>
            <div className="p-5">
              <FutureSelfCard
                goalImageUrl={goalImageUrl}
                targetWeight={targetWeight}
                currentWeight={currentWeight}
                targetDate={targetDate}
                emotion={selectedEmotion}
              />
            </div>
          </WidgetCard>

          {/* 나의 현황 - 항상 보이는 자기 연민 + 통계 */}
          <WidgetCard title="나의 현황" span={2}>
            <MyStatusSection
              stats={stats}
              selectedEmotion={selectedEmotion}
              monthlyEmotionCount={monthlyEmotionCount}
              onCreateReport={() => setIsDialogOpen(true)}
              onRestart={handleRestart}
            />
          </WidgetCard>
        </div>
      </main>

      {/* 실패 리포트 다이얼로그 */}
      <FailureReportDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        prefilledEmotion={selectedEmotion}
        monthlyEmotionCount={monthlyEmotionCount}
      />
    </div>
  );
}

// ─── 나의 현황 섹션 (자기 연민 카드 대체) ───

interface MyStatusSectionProps {
  stats: {
    totalAttempts: number;
    successCount: number;
    successRate: number;
    monthlyEmotionCounts: Record<EmotionType, number>;
  };
  selectedEmotion: EmotionType | null;
  monthlyEmotionCount: number;
  onCreateReport: () => void;
  onRestart: () => void;
}

function MyStatusSection({
  stats,
  selectedEmotion,
  monthlyEmotionCount,
  onCreateReport,
  onRestart,
}: MyStatusSectionProps) {
  const { totalAttempts, successCount, successRate } = stats;

  return (
    <div className="space-y-4">
      {/* 자기 연민 메시지 */}
      <div className="rounded-xl bg-error-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Heart className="h-5 w-5 text-error-800" fill="currentColor" />
          <span className="text-sm font-bold text-error-800">괜찮습니다</span>
        </div>
        <p className="text-sm leading-relaxed text-neutral-700">
          한 번의 실수로 모든 것이 끝나는 건 아닙니다. 중요한 건 다시 시작하는 것입니다.
        </p>
      </div>

      {/* 허가 효과 경고 */}
      <div className="flex gap-2 rounded-xl bg-peach-100 p-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-temptation" />
        <div>
          <p className="text-sm font-bold text-temptation">{LICENSING_EFFECT_WARNING}</p>
          <p className="mt-0.5 text-xs text-neutral-700">
            "내일부터"는 실패를 정당화하는 허가 효과입니다
          </p>
        </div>
      </div>

      {/* 감정 패턴 */}
      {selectedEmotion && monthlyEmotionCount > 0 && (
        <div className="rounded-xl bg-neutral-50 p-3">
          <p className="text-sm text-neutral-700">
            이번 달 <strong className="text-temptation">{EmotionTypeDisplayNames[selectedEmotion]}</strong> 간식 충동:{' '}
            <strong className="text-temptation">{monthlyEmotionCount}회</strong>
          </p>
        </div>
      )}

      {/* 통계 */}
      <div className="rounded-xl bg-neutral-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-neutral-600">전체 성공률</span>
          <span className="text-xl font-bold text-success-800">
            {totalAttempts > 0 ? successRate : '--'}%
          </span>
        </div>

        {totalAttempts > 0 && (
          <>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full bg-success-500 transition-all"
                style={{ width: `${successRate}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="h-5 w-5 text-success-800" />
                <div className="text-sm font-bold text-success-800">{successCount}회</div>
                <div className="text-xs text-neutral-500">극복</div>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-white py-2">
                <XCircle className="h-5 w-5 text-error-800" />
                <div className="text-sm font-bold text-error-800">
                  {totalAttempts - successCount}회
                </div>
                <div className="text-xs text-neutral-500">실패</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Calendar className="h-5 w-5 text-neutral-600" />
                <div className="text-sm font-bold text-neutral-700">{totalAttempts}회</div>
                <div className="text-xs text-neutral-500">전체</div>
              </div>
            </div>
          </>
        )}

        {totalAttempts === 0 && (
          <p className="text-center text-sm text-neutral-400">아직 기록이 없습니다</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-error-800 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-error-900"
        >
          <RotateCcw className="h-4 w-4" />
          다시 시작하기
        </button>
        <button
          onClick={onCreateReport}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-800 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-900"
        >
          <FileText className="h-4 w-4" />
          실패 리포트
        </button>
      </div>

      {/* 안내 */}
      <div className="flex gap-2 rounded-xl bg-primary-50 p-3">
        <Info className="h-4 w-4 shrink-0 text-primary-800" />
        <p className="text-xs leading-relaxed text-neutral-700">
          실패 리포트를 작성하면 같은 실수를 반복하지 않게 됩니다
        </p>
      </div>
    </div>
  );
}
