'use client';

import { Flame, Trophy } from 'lucide-react';
import { ProfilePanel } from '../../home/_components/journal/profile-panel';
import { GRASS, type Variant } from './shared';

const Avatar = ({ size = 62, round = 14 }: { size?: number; round?: number }) => (
  <span className="grid shrink-0 place-items-center bg-primary-subtle font-bold text-primary" style={{ width: size, height: size, borderRadius: round, border: '2px dotted var(--color-primary-muted)', fontSize: size * 0.32 }}>다</span>
);

export const PROFILE: Variant[] = [
  { key: 'current', name: '명함 + 잔디', recommended: true, why: '일기장 ProfileCard 그대로. 이름·소개·D+·잔디가 한 블록이라 패널 맨 위에 딱 맞는다.',
    Render: () => <ProfilePanel nickname="다이어터" bio="복싱 다이어트 도전 중!" totalDays={31} grass={GRASS} /> },
  { key: 'compact', name: '가로 띠 (모바일형)', why: '폰에서 좌측 패널이 접힐 때 저널 바 자리에 눕는 56px 한 줄. 잔디 대신 칩 둘.',
    Render: () => (
      <div className="flex items-center gap-3">
        <Avatar size={44} round={12} />
        <div className="min-w-0 flex-1"><div className="truncate text-[13px] font-semibold text-ink">다이어터</div><div className="truncate text-[11px] text-ink-4">복싱 다이어트 도전 중!</div></div>
        {['7일 연속', '31일'].map((t) => <span key={t} className="flex h-[24px] items-center rounded-full border border-border px-2 text-[10.5px] text-ink-3">{t}</span>)}
      </div>
    ) },
  { key: 'stamp', name: '도장 (세로 중앙)', why: '프로필 페이지 상단용. 아바타를 크게 두고 통계 세 개를 아래 한 줄로. 패널보다는 페이지 헤더에 맞는다.',
    Render: () => (
      <div className="flex flex-col items-center text-center">
        <Avatar size={72} round={18} />
        <div className="mt-2 text-[14px] font-semibold text-ink">다이어터</div>
        <div className="text-[11px] text-ink-4">복싱 다이어트 도전 중!</div>
        <div className="mt-3 flex gap-1.5">{[['31', '기록'], ['7', '연속'], ['6', '배지']].map(([n, l]) => <span key={l} className="flex h-[26px] items-center gap-1 rounded-full border border-border px-2.5 text-[11px] text-ink-3"><b className="tabular-nums text-ink">{n}</b> {l}</span>)}</div>
      </div>
    ) },
  { key: 'heat', name: '잔디가 주인공', why: '"쌓인다"를 제일 크게 보여주고 싶을 때. 7×4 큰 히트맵 + 작은 아바타. 통계 수치가 많아지면 좁다.',
    Render: () => (
      <div>
        <div className="mb-2 flex items-center gap-2"><Avatar size={28} round={8} /><span className="text-[12.5px] font-semibold text-ink">다이어터</span><span className="ml-auto font-mono text-[10.5px] text-primary/55">D+31</span></div>
        <div className="grid grid-cols-7 gap-1">{GRASS.map((on, i) => <span key={i} className={`aspect-square rounded-[4px] ${on ? 'bg-primary/80' : 'bg-ink-5/40'}`} />)}</div>
        <div className="mt-1.5 flex justify-between text-[10px] text-ink-5"><span>4주 전</span><span>오늘</span></div>
      </div>
    ) },
  { key: 'text', name: '텍스트만', why: '아바타 없이 이름·D+·한 줄 격려. 가장 가볍고, 잔디 대신 연속 불꽃과 배지 수. 밀도 낮은 대시보드에.',
    Render: () => (
      <div className="px-1">
        <div className="flex items-baseline gap-2"><span className="text-[15px] font-bold tracking-tight text-ink">다이어터</span><span className="font-mono text-[10.5px] text-primary/55">D+31</span></div>
        <p className="mt-0.5 text-[11.5px] text-ink-4">복싱 다이어트 도전 중!</p>
        <div className="mt-2 flex gap-4 text-[11px] text-ink-3"><span className="flex items-center gap-1"><Flame size={11} className="text-primary" /> 7일 연속</span><span className="flex items-center gap-1"><Trophy size={11} className="text-comment-sand-solid" /> 배지 6</span></div>
      </div>
    ) },
];
