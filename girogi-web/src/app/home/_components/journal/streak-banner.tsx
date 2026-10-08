/** @desc 본문 상단 유리 띠 — 연속 일수 + 몇 초마다 바뀌는 응원 (컴포넌트 랩 '유리 띠 + 바뀌는 응원') */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Flame } from 'lucide-react';
import { BasicGlass } from 'bongchil-design-system';

const CHEERS = ['오늘도 두 개면 충분해요', '어제의 나보다 하루 더', '내일의 내가 고마워할 거예요', '완벽 말고, 계속'];

export function StreakBanner({ currentStreak }: { currentStreak: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % CHEERS.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <Link href="/checklist" className="block">
      <BasicGlass airy className="flex items-center gap-3 rounded-[13px] px-3.5 py-2.5 transition-colors hover:border-primary/30">
        <Flame size={14} className="flame-pulse shrink-0 text-primary" />
        <span className="shrink-0 text-[12px] text-ink-2">
          {currentStreak > 0 ? <b className="text-primary">{currentStreak}일째</b> : <b className="text-primary">오늘부터</b>} ·
        </span>
        <span key={i} className="fade-up min-w-0 truncate text-[12px] text-ink-2">{CHEERS[i]}</span>
        <ChevronRight size={13} className="ml-auto shrink-0 text-ink-4" />
      </BasicGlass>
    </Link>
  );
}
