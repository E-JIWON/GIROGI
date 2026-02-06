/**
 * SelfCompassionCard 컴포넌트
 *
 * Self-Compassion 이론을 적용한 실패 후 복귀 지원
 * - 자기 연민 메시지
 * - 통계 정보 (전체 성공률, 성공/실패/전체 일수)
 * - "다시 시작하기" 버튼
 * - "실패 리포트 작성" 버튼
 *
 * Flutter: lib/presentation/widgets/emergency/self_compassion_card.dart
 */

import { Heart, RotateCcw, EditNote, Info, CheckCircle, XCircle, Calendar } from 'lucide-react';

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
    <div className="rounded-lg border-2 border-selfcompassion bg-selfcompassion/5 p-6 shadow-md">
      {/* 헤더 */}
      <div className="mb-4 flex items-center gap-3">
        <Heart className="h-8 w-8 text-selfcompassion" fill="currentColor" />
        <h2 className="text-2xl font-bold text-selfcompassion">괜찮습니다</h2>
      </div>

      {/* 자기 연민 메시지 */}
      <div className="mb-4">
        <h3 className="mb-3 text-lg font-semibold text-grey-900">
          한 번의 실수로 모든 것이 끝나는 건 아닙니다
        </h3>
        <ul className="space-y-2 text-base leading-relaxed text-grey-800">
          <li>• 완벽한 사람은 없습니다</li>
          <li>• 실패는 배움의 기회입니다</li>
          <li>• 중요한 건 다시 일어서는 것입니다</li>
          <li>• 지금 바로 다시 시작할 수 있습니다</li>
        </ul>
      </div>

      {/* 통계 정보 */}
      <div className="mb-6 rounded-lg border border-grey-300 bg-white p-4">
        {/* 성공률 */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-base text-grey-700">전체 성공률</span>
          <span className="text-2xl font-bold text-success">{successRate}%</span>
        </div>

        {/* 진행률 바 */}
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-grey-200">
          <div
            className="h-full bg-success transition-all"
            style={{ width: `${successRate}%` }}
          />
        </div>

        {/* 통계 상세 */}
        <div className="grid grid-cols-3 gap-2">
          {/* 성공 */}
          <div className="flex flex-col items-center gap-1">
            <CheckCircle className="h-6 w-6 text-success" />
            <div className="text-sm font-bold text-success">{successCount}일</div>
            <div className="text-xs text-grey-600">성공</div>
          </div>

          {/* 실패 */}
          <div className="flex flex-col items-center gap-1 border-x border-grey-300">
            <XCircle className="h-6 w-6 text-error" />
            <div className="text-sm font-bold text-error">
              {totalAttempts - successCount}일
            </div>
            <div className="text-xs text-grey-600">실패</div>
          </div>

          {/* 전체 */}
          <div className="flex flex-col items-center gap-1">
            <Calendar className="h-6 w-6 text-grey-700" />
            <div className="text-sm font-bold text-grey-700">{totalAttempts}일</div>
            <div className="text-xs text-grey-600">전체</div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="space-y-3">
        {/* 다시 시작하기 */}
        <button
          onClick={handleRestart}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-selfcompassion px-4 py-3 text-base font-semibold text-white transition-all hover:bg-selfcompassion/90"
        >
          <RotateCcw className="h-5 w-5" />
          다시 시작하기
        </button>

        {/* 실패 리포트 작성 */}
        <button
          onClick={onCreateReport}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-selfcompassion px-4 py-3 text-base font-semibold text-selfcompassion transition-all hover:bg-selfcompassion/5"
        >
          <EditNote className="h-5 w-5" />
          실패 리포트 작성
        </button>
      </div>

      {/* 안내 메시지 */}
      <div className="mt-4 flex gap-2 rounded-lg bg-info/10 p-3">
        <Info className="h-5 w-5 shrink-0 text-info" />
        <p className="text-xs leading-relaxed text-grey-800">
          실패 리포트를 작성하면 같은 상황을 대비할 수 있습니다. 커뮤니티에
          공유하여 응원을 받을 수도 있습니다.
        </p>
      </div>
    </div>
  );
}
