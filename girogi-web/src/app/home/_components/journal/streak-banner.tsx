/** @desc 본문 상단 한 줄 배너 (bongchil-diary MemoryBanner 자리) — 연속 기록 격려 */

import Link from 'next/link';
import { ChevronRight, Flame } from 'lucide-react';

export function StreakBanner({ currentStreak }: { currentStreak: number }) {
  return (
    <Link href="/checklist" className="flex items-center gap-3 rounded-[13px] bg-primary-subtle px-3.5 py-2.5 transition-colors hover:bg-primary-muted">
      <Flame size={14} className="shrink-0 text-primary" />
      <span className="text-[12px] text-ink-2">
        {currentStreak > 0 ? (
          <>연속 <b className="text-primary">{currentStreak}일째</b>. 오늘 미션 2개면 {currentStreak + 1}일이 돼요.</>
        ) : (
          <>오늘부터 다시. 미션 2개만 채우면 연속 1일이 시작돼요.</>
        )}
      </span>
      <ChevronRight size={13} className="ml-auto shrink-0 text-ink-4" />
    </Link>
  );
}
