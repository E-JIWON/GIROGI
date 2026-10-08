'use client';

/**
 * /component-lab — 홈(오늘)에 쓰이는 컴포넌트별 시안 5종.
 * 규칙(일기장과 동일): 시안이 둘 이상이면 FilterChips 탭으로 하나씩, 세로 나열 금지.
 */

import { useState } from 'react';
import { FilterChips, NavTabs } from 'bongchil-design-system';
import type { LabEntry } from './variants/shared';
import { REWARD } from './variants/reward';

/** 채택된 것은 /component로 옮기고 여기선 지운다. 남은 건 아직 고르는 중인 것만. */
const ENTRIES: LabEntry[] = [
  { key: 'reward', name: 'RewardStatusCard', desc: '과자박스 · 치팅데이 — 아직 결정 전 (홈엔 임시로 패스 리스트)', variants: REWARD },
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
        <span className="text-[11px] text-ink-4">결정 대기 {ENTRIES.length}개 · 채택된 건 /component</span>
      </div>
      <div className="scrollbar-hide overflow-x-auto"><div className="w-max"><NavTabs tabs={ENTRIES.map((e) => ({ label: e.name, isActive: e.key === entryKey, onSelect: () => pick(e.key) }))} /></div></div>
      <p className="mt-2 text-[12px] text-ink-4">{entry.desc}</p>

      <div className="mt-4">
        <FilterChips items={entry.variants.map((v) => ({ value: v.key, label: `${v.name}${v.recommended ? ' ★' : ''}` }))} value={variant.key} onChange={setVariantKey} />
      </div>

      <div className={`mt-4 grid gap-4 ${entry.key === 'layout' ? '' : '@3xl:grid-cols-[minmax(0,1fr)_260px]'}`}>
        <div className="rounded-[var(--radius-l)] border border-dashed border-ink/15 bg-surface-warm p-5 @container" key={`${entry.key}-${variant.key}`}>
          <div className={entry.key === 'profile' || entry.key === 'missions' || entry.key === 'week' ? 'max-w-[220px]' : entry.key === 'layout' ? '' : 'max-w-[640px]'}>
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
