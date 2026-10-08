'use client';

import { StreakBanner } from '../../home/_components/journal/streak-banner';
import { STREAK, type Variant } from './shared';

export const BANNER: Variant[] = [
  { key: 'glass-cheer', name: '유리 띠 + 바뀌는 응원', recommended: true, why: '선택됨 — 홈에 적용. 불꽃 펄스 + 응원 문구가 2.8초마다 바뀐다. 문구 풀은 컴포넌트 안 CHEERS 배열.',
    Render: () => <div className="rounded-[var(--radius-l)] p-3" style={{ background: 'var(--desk-bg)' }}><StreakBanner currentStreak={STREAK} /></div> },
];
