'use client';

import { Cookie, Gift, PartyPopper } from 'lucide-react';
import { Button } from 'bongchil-design-system';
import { WidgetCard } from '@/components/common/widget-card';
import { RewardStatusCard } from '../../home/_components/reward-status-card';
import type { Variant } from './shared';

const Ring = ({ value, max, label, color }: { value: number; max: number; label: string; color: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <svg viewBox="0 0 40 40" className="size-16 -rotate-90"><circle cx="20" cy="20" r="17" fill="none" stroke="var(--color-border-strong)" strokeWidth="3" /><circle cx="20" cy="20" r="17" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="106.8" strokeDashoffset={106.8 * (1 - value / max)} /></svg>
    <span className="text-[11px] text-ink-3">{label}</span>
  </div>
);

export const REWARD: Variant[] = [
  { key: 'tiles', name: '타일 둘', recommended: true, why: '지금 홈. 과자박스·치팅데이를 색 타일 둘로, 사용 버튼은 grain. 규칙 한 줄이 아래.', Render: () => <WidgetCard noPadding><RewardStatusCard snackBoxCount={3} consecutiveDietDays={7} /></WidgetCard> },
  { key: 'tickets', name: '쿠폰 티켓', why: '프로필 쿠폰 카드와 같은 모양(절취선). 보상이 "쓸 수 있는 표"라는 느낌이 제일 강하다. 규칙 설명 자리가 없다.',
    Render: () => (
      <div className="grid gap-2 @md:grid-cols-2">
        {[['과자박스', '3장', '사용하기', 'bg-comment-sand', 'text-comment-sand-solid', Cookie], ['치팅데이', '1장', '오늘 쓰기', 'bg-comment-green', 'text-comment-green-solid', PartyPopper]].map(([t, n, cta, bg, fg, Icon]) => { const I = Icon as typeof Cookie; return (
          <div key={String(t)} className={`relative flex items-center gap-3 rounded-[var(--radius-m)] ${bg} p-3`}>
            <span className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-surface-warm" /><span className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-surface-warm" />
            <I size={16} className={String(fg)} />
            <div className="min-w-0 flex-1"><div className="text-[12.5px] font-medium text-ink">{String(t)}</div><div className="text-[10.5px] text-ink-4">{String(n)} 보유</div></div>
            <Button variant="grain" tone="primary" size="xs">{String(cta)}</Button>
          </div>
        ); })}
      </div>
    ) },
  { key: 'rings', name: '진행 링 둘', why: '다음 획득까지 얼마나 남았는지를 링으로. "쌓인다"보다 "가까워진다"에 초점. 보유 개수는 작게.',
    Render: () => (
      <div className="flex items-center justify-around rounded-[var(--radius-l)] bg-surface p-4">
        <Ring value={1} max={3} label="과자박스 D-2" color="var(--color-comment-sand-solid)" /><Ring value={7} max={7} label="치팅데이 가능" color="var(--color-primary)" />
        <div className="text-[11px] leading-relaxed text-ink-3">보유 <b className="text-ink">과자박스 3</b><br />오늘 <b className="text-primary">치팅데이</b></div>
      </div>
    ) },
  { key: 'chips', name: '한 줄 칩', why: '가장 작다. 저널 바나 배너에 붙일 수 있는 크기. 사용은 칩을 눌러 패널을 연다.',
    Render: () => (
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="grain" size="sm" icon={Gift} count={3} color="var(--color-comment-sand-solid)">과자박스</Button>
        <Button variant="grain" size="sm" icon={PartyPopper} active color="var(--color-primary)">치팅데이 오늘</Button>
        <span className="text-[10.5px] text-ink-4">3일 → 과자박스 · 7일 → 치팅데이</span>
      </div>
    ) },
  { key: 'drawer', name: '보상 서랍 (패널용)', why: '좌측 패널 미션 서랍 아래 같은 결로 세로 1열. 홈 본문이 짧아지고 패널이 "내 것들"로 모인다.',
    Render: () => (
      <div className="max-w-[200px]">
        <div className="mb-2 px-1 text-[12.5px] font-semibold text-ink-2">보상 서랍</div>
        <div className="grid gap-1.5"><Button variant="grain" size="sm" icon={Gift} count={3} color="var(--color-comment-sand-solid)">과자박스</Button><Button variant="grain" size="sm" icon={PartyPopper} active color="var(--color-primary)">치팅데이</Button></div>
        <p className="mt-2 px-1 text-[10.5px] text-ink-4">3일 연속 → 과자박스 · 7일 → 치팅데이</p>
      </div>
    ) },
];
