/**
 * FutureSelfCard 컴포넌트
 *
 * Episodic Future Thinking (EFT) 이론을 적용한 미래 자아 시각화
 * - 목표 이미지 표시 (없으면 플레이스홀더)
 * - 목표 정보 (목표 체중, 현재 체중, 남은 일수)
 * - 동기부여 메시지
 *
 * Flutter: lib/presentation/widgets/emergency/future_self_card.dart
 */

import { Sunrise, ImagePlus, Lightbulb } from 'lucide-react';

interface FutureSelfCardProps {
  /**
   * 목표 이미지 URL
   */
  goalImageUrl?: string | null;
  /**
   * 목표 체중 (kg)
   */
  targetWeight?: number | null;
  /**
   * 현재 체중 (kg)
   */
  currentWeight?: number | null;
  /**
   * 목표 달성 예상 날짜
   */
  targetDate?: Date | null;
}

export function FutureSelfCard({
  goalImageUrl,
  targetWeight,
  currentWeight,
  targetDate,
}: FutureSelfCardProps) {
  const hasGoalInfo = targetWeight && currentWeight;
  const weightDiff = hasGoalInfo ? currentWeight - targetWeight : null;
  const daysRemaining = targetDate
    ? Math.ceil((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="rounded-lg border border-grey-200 bg-white p-4 shadow-md">
      {/* 헤더 */}
      <div className="mb-4 flex items-center gap-3">
        <Sunrise className="h-7 w-7 text-primary" />
        <h3 className="text-base font-semibold text-grey-900">
          미래의 나를 떠올려보세요
        </h3>
      </div>

      {/* 목표 이미지 또는 플레이스홀더 */}
      <div className="mb-4 h-52 w-full overflow-hidden rounded-lg border-2 border-grey-300 bg-grey-100">
        {goalImageUrl ? (
          <img
            src={goalImageUrl}
            alt="목표 이미지"
            className="h-full w-full object-cover"
          />
        ) : (
          // 플레이스홀더
          <div className="flex h-full flex-col items-center justify-center">
            <ImagePlus className="h-16 w-16 text-grey-400" />
            <p className="mt-2 text-sm text-grey-600">
              목표 이미지를 추가하세요
            </p>
            <button className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline">
              <span>추가하기</span>
            </button>
          </div>
        )}
      </div>

      {/* 목표 정보 */}
      {hasGoalInfo ? (
        <div className="mb-4 rounded-lg bg-primary/10 p-4">
          {/* 체중 차이 */}
          <div className="flex items-center justify-between">
            <span className="text-base text-grey-700">목표까지</span>
            <span className="text-lg font-bold text-primary">
              {weightDiff!.toFixed(1)}kg 남음
            </span>
          </div>

          {/* 예상 달성일 */}
          {daysRemaining !== null && (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-base text-grey-700">예상 달성일</span>
              <span className="text-base font-semibold text-grey-900">
                {daysRemaining}일 후
              </span>
            </div>
          )}
        </div>
      ) : (
        // 목표 미설정
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-grey-100 p-4">
          <Sunrise className="h-6 w-6 shrink-0 text-grey-600" />
          <div className="flex-1">
            <p className="text-sm text-grey-700">
              목표를 설정하고 진행 상황을 확인하세요
            </p>
          </div>
          <button className="text-sm font-semibold text-primary hover:underline">
            설정
          </button>
        </div>
      )}

      {/* 동기부여 메시지 */}
      <div className="rounded-lg border-2 border-temptation/30 bg-warning/5 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-temptation" />
          <h4 className="text-sm font-bold text-temptation">
            잠깐만 생각해보세요
          </h4>
        </div>
        <ul className="space-y-1 text-sm leading-relaxed text-grey-800">
          <li>• 지금 먹으면 후회할 것 같나요?</li>
          <li>• 목표 달성이 늦어질 수 있습니다</li>
          <li>• 10분만 기다리면 유혹이 사라집니다</li>
          <li>• 미래의 내가 고마워할 선택을 하세요</li>
        </ul>
      </div>
    </div>
  );
}
