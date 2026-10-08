'use client';

import { ChevronRight, Flame } from 'lucide-react';
import { BasicGlass } from 'bongchil-design-system';
import { StreakBanner } from '../../home/_components/journal/streak-banner';
import { STREAK, type Variant } from './shared';

export const BANNER: Variant[] = [
  { key: 'tint', name: '틴트 한 줄', recommended: true, why: '일기장 MemoryBanner 자리. 한 줄이라 본문 위에서 안 거슬리고, 누르면 체크리스트.', Render: () => <StreakBanner currentStreak={STREAK} /> },
  { key: 'number', name: '큰 숫자 카드', why: '연속 일수를 주인공으로. 듀오링고식. 숫자가 커질수록 기분 좋지만 0일 때 민망하다.',
    Render: () => (
      <div className="flex items-center gap-4 rounded-[var(--radius-l)] bg-surface p-4">
        <span className="grid size-12 place-items-center rounded-[var(--radius-m)] bg-primary-light text-primary"><Flame size={22} /></span>
        <div><div className="flex items-baseline gap-1 text-ink"><span className="text-[32px] font-bold leading-none tabular-nums">{STREAK}</span><span className="text-[12px] text-ink-3">일 연속</span></div><div className="mt-0.5 text-[11px] text-ink-4">오늘 미션 2개면 {STREAK + 1}일</div></div>
        <ChevronRight size={14} className="ml-auto text-ink-4" />
      </div>
    ) },
  { key: 'glass', name: '유리 띠', why: 'BasicGlass airy로 책상이 비치게. 데스크 배경이 보이는 자리(모바일 상단)에서 예쁘고, 카드 위에선 의미 없다.',
    Render: () => (
      <div className="rounded-[var(--radius-l)] p-3" style={{ background: 'var(--desk-bg)' }}>
        <BasicGlass airy className="flex items-center gap-3 rounded-[13px] px-3.5 py-2.5"><Flame size={14} className="text-primary" /><span className="text-[12px] text-ink-2">연속 <b className="text-primary">{STREAK}일째</b>. 오늘도 두 개면 충분해요.</span></BasicGlass>
      </div>
    ) },
  { key: 'quote', name: '세리프 한 줄', why: '숫자 대신 말. 자기 연민 모드와 어울리는 톤. 격려 문구 풀을 만들어 하루마다 바꾼다.',
    Render: () => (
      <div className="border-l-2 border-primary/50 py-1 pl-3">
        <p className="text-[13.5px] leading-relaxed text-ink-2" style={{ fontFamily: 'var(--font-family-serif)' }}>“완벽한 하루가 아니라, 두 개를 지킨 하루.”</p>
        <p className="mt-1 text-[10.5px] text-ink-4">{STREAK}일째 그렇게 하고 있어요</p>
      </div>
    ) },
  { key: 'progress', name: '다음 보상까지', why: '연속 일수를 치팅데이(7일) 진행 바로. 보상 카드와 역할이 겹치지만, 보상 카드를 없앤다면 이게 그 자리.',
    Render: () => (
      <div className="rounded-[13px] bg-primary-subtle px-3.5 py-2.5">
        <div className="flex items-center justify-between text-[11px]"><span className="text-ink-2">치팅데이까지</span><span className="font-mono text-primary">D-{7 - (STREAK % 7 || 7)}</span></div>
        <div className="mt-1.5 h-1.5 rounded-full bg-surface"><span className="block h-full rounded-full bg-primary" style={{ width: `${((STREAK % 7 || 7) / 7) * 100}%` }} /></div>
      </div>
    ) },
];
