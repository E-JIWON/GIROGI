'use client';

/** @desc 실패 후 복귀 지원 카드 (Self-Compassion) */

import { Heart, RotateCcw, FileText, Info, CheckCircle, XCircle, Calendar, AlertTriangle } from 'lucide-react';
import { LICENSING_EFFECT_WARNING } from '@/lib/constants';

interface SelfCompassionCardProps {
  /**
   * 실패 리포트 생성 콜백
   */
  onCreateReport?: () => void;
}

export function SelfCompassionCard({ onCreateReport }: SelfCompassionCardProps) {
  // TODO: Repository에서 실제 통계 데이터 가져오기
  const totalAttempts = 45;
  const successCount = 38;
  const successRate = Math.round((successCount / totalAttempts) * 100);

  const handleRestart = () => {
    // TODO: 오늘 기록 초기화 및 재시작
    console.log('다시 시작하기');
  };

  return (
    <div className="rounded-lg bg-error-50 p-6">
      {/* 헤더 */}
      <div className="mb-4 flex items-center gap-3">
        <Heart className="h-8 w-8 text-error-800" fill="currentColor" />
        <h2 className="text-2xl font-bold text-error-800">괜찮습니다</h2>
      </div>

      {/* 자기 연민 메시지 */}
      <div className="mb-4">
        <h3 className="mb-3 text-lg font-semibold text-neutral-900">
          한 번의 실수로 모든 것이 끝나는 건 아닙니다
        </h3>
        <ul className="space-y-2 text-base leading-relaxed text-neutral-800">
          <li>• 완벽한 사람은 없습니다</li>
          <li>• 실패는 배움의 기회입니다</li>
          <li>• 중요한 건 다시 일어서는 것입니다</li>
          <li>• 지금 바로 다시 시작할 수 있습니다</li>
        </ul>
      </div>

      {/* 허가 효과 경고 (Licensing Effect) */}
      <div className="mb-6 rounded-md bg-peach-100 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="h-6 w-6 shrink-0 text-temptation" />
          <div>
            <h4 className="mb-2 text-base font-bold text-temptation">
              {LICENSING_EFFECT_WARNING}
            </h4>
            <p className="text-sm leading-relaxed text-neutral-800">
              "내일부터 다시 하면 돼"라는 생각은 <strong>실패를 정당화</strong>하고 재시작을 미루게 만듭니다.
              <strong className="text-temptation"> 지금 이 순간</strong>부터 다시 시작하세요!
            </p>
          </div>
        </div>
      </div>

      {/* 통계 정보 */}
      <div className="mb-6 rounded-md bg-white p-4">
        {/* 성공률 */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-base text-neutral-700">전체 성공률</span>
          <span className="text-2xl font-bold text-success-800">{successRate}%</span>
        </div>

        {/* 진행률 바 */}
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full bg-success-500 transition-all"
            style={{ width: `${successRate}%` }}
          />
        </div>

        {/* 통계 상세 */}
        <div className="grid grid-cols-3 gap-2">
          {/* 성공 */}
          <div className="flex flex-col items-center gap-1">
            <CheckCircle className="h-6 w-6 text-success-800" />
            <div className="text-sm font-bold text-success-800">{successCount}일</div>
            <div className="text-xs text-neutral-700">성공</div>
          </div>

          {/* 실패 */}
          <div className="flex flex-col items-center gap-1 bg-neutral-100 rounded py-2">
            <XCircle className="h-6 w-6 text-error-800" />
            <div className="text-sm font-bold text-error-800">
              {totalAttempts - successCount}일
            </div>
            <div className="text-xs text-neutral-700">실패</div>
          </div>

          {/* 전체 */}
          <div className="flex flex-col items-center gap-1">
            <Calendar className="h-6 w-6 text-neutral-700" />
            <div className="text-sm font-bold text-neutral-700">{totalAttempts}일</div>
            <div className="text-xs text-neutral-700">전체</div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="space-y-3">
        {/* 다시 시작하기 (주요 액션) */}
        <button
          onClick={handleRestart}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-error-800 px-4 py-4 text-lg font-bold text-white transition-all hover:bg-error-900 active:scale-[0.98]"
        >
          <RotateCcw className="h-6 w-6" />
          지금 바로 다시 시작하기
        </button>

        {/* 실패 리포트 작성 (권장) */}
        <button
          onClick={onCreateReport}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary-800 px-4 py-3 text-base font-semibold text-white transition-all hover:bg-primary-900 active:scale-[0.98]"
        >
          <FileText className="h-5 w-5" />
          실패 리포트 작성 (권장)
        </button>
      </div>

      {/* 안내 메시지 */}
      <div className="mt-4 flex gap-2 rounded-md bg-primary-50 p-3">
        <Info className="h-5 w-5 shrink-0 text-primary-800" />
        <p className="text-sm leading-relaxed text-neutral-800">
          <strong className="text-primary-700">실패 리포트 작성을 권장합니다.</strong> 상황, 원인, 대응 방안을 정리하면 같은 실수를 반복하지 않게 됩니다. 커뮤니티에 공유하면 응원도 받을 수 있어요!
        </p>
      </div>
    </div>
  );
}
