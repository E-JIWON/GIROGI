/**
 * FailureReportDialog 컴포넌트
 *
 * 실패 상황을 기록하고 분석하는 다이얼로그
 * - 3단계 질문 폼
 * - 허가 효과 경고
 * - 커뮤니티 공유 체크박스
 * - 폼 검증
 *
 * Flutter: lib/presentation/widgets/emergency/failure_report_dialog.dart
 */

'use client';

import { useState } from 'react';
import { FileText, X, Save, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LICENSING_EFFECT_WARNING } from '@/lib/constants';

interface FailureReportDialogProps {
  /**
   * 다이얼로그 표시 여부
   */
  isOpen: boolean;
  /**
   * 닫기 콜백
   */
  onClose: () => void;
}

export function FailureReportDialog({
  isOpen,
  onClose,
}: FailureReportDialogProps) {
  const [situation, setSituation] = useState('');
  const [reason, setReason] = useState('');
  const [solution, setSolution] = useState('');
  const [shareWithCommunity, setShareWithCommunity] = useState(false);

  const [errors, setErrors] = useState<{
    situation?: string;
    reason?: string;
    solution?: string;
  }>({});

  // 폼 검증
  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!situation.trim()) {
      newErrors.situation = '상황을 입력해주세요';
    }
    if (!reason.trim()) {
      newErrors.reason = '실패 원인을 입력해주세요';
    }
    if (!solution.trim()) {
      newErrors.solution = '대응 방안을 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 저장 핸들러
  const handleSave = () => {
    if (!validate()) return;

    // TODO: Repository에 실패 리포트 저장
    // TODO: 커뮤니티 공유 옵션 처리
    console.log({
      situation,
      reason,
      solution,
      shareWithCommunity,
    });

    // 초기화 및 닫기
    setSituation('');
    setReason('');
    setSolution('');
    setShareWithCommunity(false);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* 다이얼로그 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg overflow-hidden rounded-lg bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 스크롤 가능한 컨텐츠 */}
          <div className="max-h-[85vh] overflow-y-auto p-6">
            {/* 헤더 */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-7 w-7 text-selfcompassion" />
                <h2 className="text-xl font-bold text-neutral-900">실패 리포트</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-neutral-100"
              >
                <X className="h-6 w-6 text-neutral-700" />
              </button>
            </div>

            {/* 허가 효과 경고 */}
            <div className="mb-4 rounded-md bg-peach-100 p-3">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 shrink-0 text-temptation" />
                <div>
                  <p className="text-sm font-bold text-temptation mb-1">
                    {LICENSING_EFFECT_WARNING}
                  </p>
                  <p className="text-xs text-neutral-800">
                    리포트를 작성하고 <strong>지금 바로</strong> 다시 시작하세요. "내일부터"는 실패의 시작입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 안내 메시지 */}
            <div className="mb-4 flex gap-2 rounded-lg bg-info/10 p-3">
              <Lightbulb className="h-5 w-5 shrink-0 text-info" />
              <p className="text-xs text-neutral-800">
                실패 원인을 분석하면 같은 상황에서 더 잘 대처할 수 있습니다
              </p>
            </div>

            {/* 폼 */}
            <div className="space-y-4">
              {/* 1. 어떤 상황이었나요? */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-900">
                  1. 어떤 상황이었나요?
                </label>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="예: 회식 자리에서 술과 안주를 먹었다"
                  className={cn(
                    'w-full rounded p-3 text-base transition-colors',
                    errors.situation
                      ? 'bg-error-50 focus:bg-error-100'
                      : 'bg-neutral-50 focus:bg-neutral-100'
                  )}
                  rows={2}
                />
                {errors.situation && (
                  <p className="mt-1 text-xs text-error">{errors.situation}</p>
                )}
              </div>

              {/* 2. 왜 실패했나요? */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-900">
                  2. 왜 실패했나요?
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="예: 분위기상 거절하기 어려웠다"
                  className={cn(
                    'w-full rounded p-3 text-base transition-colors',
                    errors.reason
                      ? 'bg-error-50 focus:bg-error-100'
                      : 'bg-neutral-50 focus:bg-neutral-100'
                  )}
                  rows={2}
                />
                {errors.reason && (
                  <p className="mt-1 text-xs text-error">{errors.reason}</p>
                )}
              </div>

              {/* 3. 다음엔 어떻게 할까요? */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-900">
                  3. 다음엔 어떻게 할까요?
                </label>
                <textarea
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="예: 미리 저칼로리 식사를 하고 가겠다"
                  className={cn(
                    'w-full rounded p-3 text-base transition-colors',
                    errors.solution
                      ? 'bg-error-50 focus:bg-error-100'
                      : 'bg-neutral-50 focus:bg-neutral-100'
                  )}
                  rows={2}
                />
                {errors.solution && (
                  <p className="mt-1 text-xs text-error">{errors.solution}</p>
                )}
              </div>

              {/* 커뮤니티 공유 체크박스 */}
              <div className="rounded-lg bg-neutral-100 p-3">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={shareWithCommunity}
                    onChange={(e) => setShareWithCommunity(e.target.checked)}
                    className="mt-1 h-4 w-4 cursor-pointer accent-primary"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-neutral-900">
                      커뮤니티에 공유하기
                    </div>
                    <div className="text-xs text-neutral-700">
                      다른 사람들의 응원과 조언을 받을 수 있습니다
                    </div>
                  </div>
                </label>
              </div>

              {/* 저장 버튼 */}
              <button
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-selfcompassion px-4 py-3 text-base font-semibold text-white transition-all hover:bg-selfcompassion/90"
              >
                <Save className="h-5 w-5" />
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
