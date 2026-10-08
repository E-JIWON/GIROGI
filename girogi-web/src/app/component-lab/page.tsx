'use client';

/**
 * /component-lab — 홈(오늘)에 쓰이는 컴포넌트별 시안 5종.
 * 규칙(일기장과 동일): 시안이 둘 이상이면 FilterChips 탭으로 하나씩, 세로 나열 금지.
 */

import { useState } from 'react';
import { FilterChips, NavTabs } from 'bongchil-design-system';
import type { LabEntry } from './variants/shared';
import { PROFILE } from './variants/profile';
import { MISSION } from './variants/missions';
import { WEEK_V } from './variants/week';
import { BANNER } from './variants/banner';
import { PHOTOS } from './variants/photos';
import { RECORDS } from './variants/records';
import { REWARD } from './variants/reward';

const ENTRIES: LabEntry[] = [
  { key: 'profile', name: 'ProfilePanel', desc: '좌측 패널 맨 위 — 누구의 기록인가', variants: PROFILE },
  { key: 'missions', name: 'MissionDrawer', desc: '오늘의 핵심 미션 3개', variants: MISSION },
  { key: 'week', name: 'WeekStrip', desc: '이번 주 성공 여부', variants: WEEK_V },
  { key: 'banner', name: 'StreakBanner', desc: '본문 맨 위 한 줄 격려', variants: BANNER },
  { key: 'photos', name: 'PhotoStrip', desc: '오늘 끼니 사진', variants: PHOTOS },
  { key: 'records', name: 'RecordList', desc: '오늘 기록 (미션 + 식사)', variants: RECORDS },
  { key: 'reward', name: 'RewardStatusCard', desc: '과자박스 · 치팅데이', variants: REWARD },
];

export default function ComponentLabPage() {
  const [entryKey, setEntryKey] = useState(ENTRIES[0].key);
  const [variantKey, setVariantKey] = useState(ENTRIES[0].variants[0].key);
  const entry = ENTRIES.find((e) => e.key === entryKey)!;
  const variant = entry.variants.find((v) => v.key === variantKey) ?? entry.variants[0];
  const pick = (k: string) => { setEntryKey(k); setVariantKey(ENTRIES.find((e) => e.key === k)!.variants[0].key); };

  return (
    <div className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mb-3 flex items-baseline gap-2">
        <h1 className="text-[16px] font-bold tracking-tight text-ink">컴포넌트 랩</h1>
        <span className="text-[11px] text-ink-4">홈(오늘) 조각 {ENTRIES.length}개 × 시안 5</span>
      </div>
      <div className="scrollbar-hide overflow-x-auto"><div className="w-max"><NavTabs tabs={ENTRIES.map((e) => ({ label: e.name, isActive: e.key === entryKey, onSelect: () => pick(e.key) }))} /></div></div>
      <p className="mt-2 text-[12px] text-ink-4">{entry.desc}</p>

      <div className="mt-4">
        <FilterChips items={entry.variants.map((v) => ({ value: v.key, label: `${v.name}${v.recommended ? ' ★' : ''}` }))} value={variant.key} onChange={setVariantKey} />
      </div>

      <div className="mt-4 grid gap-4 @3xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="rounded-[var(--radius-l)] border border-dashed border-ink/15 bg-surface-warm p-5 @container" key={`${entry.key}-${variant.key}`}>
          <div className={entry.key === 'profile' || entry.key === 'missions' || entry.key === 'week' ? 'max-w-[220px]' : 'max-w-[600px]'}>
            <variant.Render />
          </div>
        </div>
        <aside className="rounded-[var(--radius-l)] bg-surface p-4">
          <div className="flex items-baseline gap-2"><span className="text-[13px] font-semibold text-ink">{variant.name}</span>{variant.recommended && <span className="rounded-[var(--radius-s)] bg-primary-light px-1.5 py-0.5 text-[10px] font-medium text-primary">추천</span>}</div>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-2">{variant.why}</p>
          <ol className="mt-4 space-y-1 text-[11px] text-ink-4">
            {entry.variants.map((v, i) => <li key={v.key} className={v.key === variant.key ? 'text-ink-2' : ''}>{i + 1}. {v.name}{v.recommended ? ' ★' : ''}</li>)}
          </ol>
        </aside>
      </div>
    </div>
  );
}
