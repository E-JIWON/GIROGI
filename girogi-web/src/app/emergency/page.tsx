/**
 * 유혹 극복 페이지
 *
 * 주요 기능:
 * - 10분 타이머 (충동 지연 메커니즘)
 * - 미래 자아 시각화 (EFT 이론)
 * - 자기 연민 모드 (Self-Compassion)
 * - 실패 리포트 생성 및 커뮤니티 공유
 *
 * Flutter: lib/presentation/screens/emergency/emergency_screen.dart
 */

'use client';

import { useState } from 'react';
import { Heart, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TemptationTimer } from './_components/temptation-timer';
import { FutureSelfCard } from './_components/future-self-card';
import { SelfCompassionCard } from './_components/self-compassion-card';
import { FailureReportDialog } from './_components/failure-report-dialog';

export default function EmergencyPage() {
  const [showSelfCompassionMode, setShowSelfCompassionMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 목표 데이터 (Mock)
  // TODO: Repository에서 사용자 목표 가져오기
  const goalImageUrl = null;
  const targetWeight = 65.0;
  const currentWeight = 72.5;
  const targetDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90일 후

  // 자기 연민 모드 토글
  const handleToggleSelfCompassionMode = () => {
    setShowSelfCompassionMode((prev) => !prev);
  };

  // 타이머 완료 시
  const handleTimerComplete = () => {
    console.log('10분이 지났습니다. 아직도 먹고 싶으신가요?');
  };

  // "먹었습니다" 버튼 클릭 시 (자기 연민 모드로 전환)
  const handleSelfCompassionMode = () => {
    setShowSelfCompassionMode(true);
  };

  // 실패 리포트 열기
  const handleOpenFailureReport = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl bg-white min-h-screen">
        {/* 헤더 */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-100">
            <h1 className="text-lg font-semibold text-neutral-700">유혹 극복</h1>

          {/* 자기 연민 모드 토글 버튼 */}
          <button
            onClick={handleToggleSelfCompassionMode}
            className="rounded-full p-2 transition-all hover:bg-neutral-100"
            title="자기 연민 모드"
          >
            <Heart
              className={cn(
                'h-6 w-6 transition-all',
                showSelfCompassionMode
                  ? 'fill-selfcompassion text-selfcompassion'
                  : 'text-neutral-700'
              )}
            />
            </button>
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="px-8 py-6">
          <div className="space-y-4">
          {/* 자기 연민 모드 */}
          {showSelfCompassionMode && (
            <SelfCompassionCard onCreateReport={handleOpenFailureReport} />
          )}

          {/* 일반 모드 */}
          {!showSelfCompassionMode && (
            <>
              {/* 1. 10분 타이머 */}
              <TemptationTimer
                onTimerComplete={handleTimerComplete}
                onSelfCompassionMode={handleSelfCompassionMode}
              />

              {/* 2. 미래 자아 시각화 */}
              <FutureSelfCard
                goalImageUrl={goalImageUrl}
                targetWeight={targetWeight}
                currentWeight={currentWeight}
                targetDate={targetDate}
              />
            </>
          )}
        </div>
      </main>

      {/* 플로팅 액션 버튼 (FAB) - 실패 리포트 */}
      <button
        onClick={handleOpenFailureReport}
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-selfcompassion px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-selfcompassion/90 hover:shadow-xl"
      >
        <FileText className="h-5 w-5" />
        <span>실패 리포트</span>
      </button>

        {/* 실패 리포트 다이얼로그 */}
        <FailureReportDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
}
