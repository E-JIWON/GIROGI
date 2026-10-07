/** @desc 본문 — 오늘 식사 사진 스트립 (bongchil-diary PhotoStrip 결: 고정 높이 썸네일 + 끝에 추가 칸) */

import Link from 'next/link';
import { Camera, Plus } from 'lucide-react';
import { MealTimeDisplayNames } from '@/types/enums';
import type { MealRecord } from '@/types/models';

/* eslint-disable @next/next/no-img-element */
export function PhotoStrip({ meals }: { meals: MealRecord[] }) {
  const tile = 'relative h-[84px] shrink-0 overflow-hidden rounded-xl border border-border/60';
  return (
    <div>
      <header className="mb-2.5 flex items-baseline gap-2 px-1">
        <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">사진</h2>
        <span className="text-xs text-ink-4">{meals.length}끼</span>
        <span className="ml-1 flex-1 self-center border-t border-dashed border-primary/35" />
        <Link href="/profile" className="text-[11px] font-medium text-ink-4 transition-colors hover:text-primary">타임라인</Link>
      </header>
      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-1 pb-1">
        {meals.map((m) => (
          <div key={m.id} className={`${tile} w-[112px] ${m.imageUrl ? '' : 'bg-comment-sand'}`}>
            {m.imageUrl ? (
              <>
                <img src={m.imageUrl} alt={m.menu} className="h-full w-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/50 to-transparent px-2 pb-1.5 pt-4 text-[10px] text-white">
                  {MealTimeDisplayNames[m.mealTime]} · {m.menu}
                </span>
              </>
            ) : (
              /* 사진 없음 — 어두운 그라데이션 대신 종이색 칸 + 잉크 글자 */
              <div className="flex h-full flex-col justify-between p-2">
                <Camera size={14} className="text-comment-sand-solid" />
                <span className="line-clamp-2 text-[10.5px] leading-snug text-ink-2">
                  <span className="text-ink-4">{MealTimeDisplayNames[m.mealTime]}</span> {m.menu}
                </span>
              </div>
            )}
          </div>
        ))}
        {/* 추가 칸 — 썸네일과 같은 높이·모서리의 점선 카드 */}
        <Link href="/checklist" className={`${tile} flex w-[72px] flex-col items-center justify-center gap-1 border-dashed border-ink/20 text-ink-4 transition-colors hover:border-primary hover:text-primary`}>
          <Plus size={14} />
          <span className="text-[10.5px]">기록</span>
        </Link>
      </div>
    </div>
  );
}
