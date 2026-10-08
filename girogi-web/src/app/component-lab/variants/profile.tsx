'use client';

import { Flame, Trophy } from 'lucide-react';
import { ProfilePanel } from '../../home/_components/journal/profile-panel';
import { GRASS, type Variant } from './shared';

const W = { current: 72.4, target: 68, start: 78 };
const Avatar = ({ size = 62, round = 14 }: { size?: number; round?: number }) => (
  <span className="grid shrink-0 place-items-center bg-primary-subtle font-bold text-primary" style={{ width: size, height: size, borderRadius: round, border: '2px dotted var(--color-primary-muted)', fontSize: size * 0.32 }}>다</span>
);

export const PROFILE: Variant[] = [
  { key: 'card-weight', name: '명함 + 잔디 + 체중', recommended: true, why: '명함 블록에 체중 한 줄(현재 · 시작 대비 · 목표). 숫자 하나가 "왜 하는지"를 매일 상기시킨다. 홈에 적용됨.',
    Render: () => <ProfilePanel nickname="다이어터" bio="복싱 다이어트 도전 중!" totalDays={31} grass={GRASS} weight={W} /> },
  { key: 'card-weight-bar', name: '명함 + 체중 진행 바', why: '시작 → 목표 사이에서 현재 위치를 가는 바로. 잔디 대신 체중이 주인공이 된다. 잔디는 하단 독 달력이 대신.',
    Render: () => (
      <div className="flex items-center gap-3.5 px-1">
        <Avatar />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between"><span className="text-[13.5px] font-semibold text-ink">다이어터</span><span className="font-mono text-[10.5px] text-primary/55">D+31</span></div>
          <div className="mt-1 flex items-baseline gap-1.5"><span className="text-[18px] font-semibold tabular-nums tracking-tight text-ink">{W.current}</span><span className="text-[10px] text-ink-4">kg</span><span className="ml-auto text-[10.5px] text-ink-4">목표 {W.target}</span></div>
          <div className="relative mt-1.5 h-1.5 rounded-full bg-ink-5/40"><span className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${((W.start - W.current) / (W.start - W.target)) * 100}%` }} /></div>
          <div className="mt-1 flex justify-between text-[9.5px] text-ink-5"><span>{W.start}</span><span>-{(W.start - W.current).toFixed(1)}kg</span><span>{W.target}</span></div>
        </div>
      </div>
    ) },
  { key: 'compact', name: '가로 띠 (모바일형) + 체중', why: '폰에서 패널이 접힐 때 저널 바 자리에 눕는 한 줄. 체중 칩 추가.',
    Render: () => (
      <div className="flex items-center gap-3">
        <Avatar size={44} round={12} />
        <div className="min-w-0 flex-1"><div className="truncate text-[13px] font-semibold text-ink">다이어터</div><div className="truncate text-[11px] text-ink-4">복싱 다이어트 도전 중!</div></div>
        {[`${W.current}kg`, '7일 연속'].map((t) => <span key={t} className="flex h-[24px] items-center rounded-full border border-border px-2 text-[10.5px] tabular-nums text-ink-3">{t}</span>)}
      </div>
    ) },
  { key: 'stamp', name: '도장 (세로 중앙)', why: '프로필 페이지 헤더용. 통계 칩에 체중을 첫 번째로.',
    Render: () => (
      <div className="flex flex-col items-center text-center">
        <Avatar size={72} round={18} />
        <div className="mt-2 text-[14px] font-semibold text-ink">다이어터</div>
        <div className="text-[11px] text-ink-4">복싱 다이어트 도전 중!</div>
        <div className="mt-3 flex gap-1.5">{[[`${W.current}`, 'kg'], ['31', '기록'], ['7', '연속']].map(([n, l]) => <span key={l} className="flex h-[26px] items-center gap-1 rounded-full border border-border px-2.5 text-[11px] text-ink-3"><b className="tabular-nums text-ink">{n}</b> {l}</span>)}</div>
      </div>
    ) },
  { key: 'text', name: '텍스트만 + 체중', why: '아바타 없이 제일 가볍게. 체중·연속·배지를 한 줄 아이콘으로.',
    Render: () => (
      <div className="px-1">
        <div className="flex items-baseline gap-2"><span className="text-[15px] font-bold tracking-tight text-ink">다이어터</span><span className="font-mono text-[10.5px] text-primary/55">D+31</span></div>
        <p className="mt-0.5 text-[11.5px] text-ink-4">복싱 다이어트 도전 중!</p>
        <div className="mt-2 flex gap-4 text-[11px] text-ink-3"><span className="tabular-nums"><b className="text-ink">{W.current}</b>kg <span className="text-primary">-{(W.start - W.current).toFixed(1)}</span></span><span className="flex items-center gap-1"><Flame size={11} className="text-primary" /> 7일</span><span className="flex items-center gap-1"><Trophy size={11} className="text-comment-sand-solid" /> 6</span></div>
      </div>
    ) },
];
