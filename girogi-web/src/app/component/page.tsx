'use client';

/**
 * /component — 앱에서 실제로 쓰는 컴포넌트 카탈로그 (bongchil-diary /component 결).
 * 왼쪽 목록 → 오른쪽 무대. 각 항목은 실제 컴포넌트를 실제 props로 렌더한다.
 */

import { useState } from 'react';
import { Apple, Camera, Calendar, Flame, FolderOpen, Moon, Pencil, Plus, Trophy, Utensils } from 'lucide-react';
import {
  BasicGlass,
  Button,
  FilterChips,
  LiquidGlass,
  LiquidGlassDefs,
  NavTabs,
  PostItCard,
  Segmented,
  TodoCheckbox,
  Toggle,
} from 'bongchil-design-system';
import { WidgetCard } from '@/components/common/widget-card';
import { ProfilePanel } from '../home/_components/journal/profile-panel';
import { MissionDrawer, type MissionItem } from '../home/_components/journal/mission-drawer';
import { WeekStrip } from '../home/_components/journal/week-strip';
import { StreakBanner } from '../home/_components/journal/streak-banner';
import { PhotoStrip } from '../home/_components/journal/photo-strip';
import { RecordList } from '../home/_components/journal/record-list';
import { RewardStatusCard } from '../home/_components/reward-status-card';
import { getMockRecentDailyRecords } from '@/lib/mock/dailyRecords';

const MEALS = getMockRecentDailyRecords(1)[0]?.meals ?? [];
const MISSIONS: MissionItem[] = [
  { id: 'm1', title: '아침 식사 집에서 먹기', description: '외식/배달 대신 집에서 직접 조리', isCompleted: true, icon: Apple },
  { id: 'm2', title: '점심 30회 이상 씹기', description: '천천히 먹어서 포만감 높이기', isCompleted: false, icon: Utensils },
  { id: 'm3', title: '저녁 8시 전 식사 완료', description: '야식 방지 및 소화 시간 확보', isCompleted: false, icon: Moon },
];
const GRASS = Array.from({ length: 28 }, (_, i) => [1, 2, 3, 5, 6, 9, 10, 12, 16, 17, 18, 19, 20, 24, 25, 26, 27].includes(i));

type Section = { key: string; group: string; name: string; desc: string; render: () => React.ReactNode };

function Stage({ children, width = 'max-w-[560px]' }: { children: React.ReactNode; width?: string }) {
  return <div className={`rounded-[var(--radius-l)] border border-dashed border-ink/15 p-4 ${width}`}>{children}</div>;
}

function useMissions() {
  const [missions, setMissions] = useState(MISSIONS);
  const toggle = (id: string) => setMissions((p) => p.map((m) => (m.id === id ? { ...m, isCompleted: !m.isCompleted } : m)));
  return { missions, toggle };
}
function MissionDrawerDemo() { const { missions, toggle } = useMissions(); return <MissionDrawer missions={missions} onToggle={toggle} />; }
function RecordListDemo() { const { missions, toggle } = useMissions(); return <RecordList missions={missions} meals={MEALS} onToggleMission={toggle} />; }
function ControlsDemo() {
  const [chip, setChip] = useState('all');
  const [seg, setSeg] = useState('week');
  const [on, setOn] = useState(true);
  const [done, setDone] = useState(false);
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 text-[10.5px] text-ink-4">Button — variant × tone</div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="grain" tone="primary" icon={Plus}>grain primary</Button>
          <Button variant="grain" icon={Pencil}>grain default</Button>
          <Button variant="grain" tone="muted">muted</Button>
          <Button variant="grain" tone="danger">danger</Button>
          <Button variant="dotted" tone="primary" icon={Camera}>dotted</Button>
          <Button variant="text" tone="primary">text</Button>
          <Button variant="glass" shape="round" icon={Moon} aria-label="glass round" />
          <Button variant="grain" shape="square" icon={Trophy} aria-label="grain square" />
        </div>
      </div>
      <div>
        <div className="mb-2 text-[10.5px] text-ink-4">Button — size · active</div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="grain" size="xs">xs</Button><Button variant="grain" size="sm">sm</Button><Button variant="grain" size="md">md</Button><Button variant="grain" size="lg">lg</Button>
          <Button variant="grain" size="sm" active color="var(--color-primary)">active</Button>
          <Button variant="grain" size="sm" count={3} color="var(--color-comment-sand-solid)">count</Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div><div className="mb-2 text-[10.5px] text-ink-4">FilterChips</div><FilterChips items={[{ value: 'all', label: '전체' }, { value: 'home', label: '집밥', text: 'text-comment-green-solid' }, { value: 'out', label: '외식', text: 'text-comment-sand-solid' }]} value={chip} onChange={setChip} /></div>
        <div><div className="mb-2 text-[10.5px] text-ink-4">Segmented</div><Segmented groups={[{ items: [{ value: 'week', label: '주' }, { value: 'month', label: '월' }], value: seg, onChange: setSeg }]} /></div>
        <div><div className="mb-2 text-[10.5px] text-ink-4">TodoCheckbox</div><div className="flex items-center gap-2"><TodoCheckbox done={done} onClick={() => setDone(!done)} /><TodoCheckbox done readOnly /></div></div>
        <div><div className="mb-2 text-[10.5px] text-ink-4">Toggle</div><Toggle checked={on} onChange={setOn} label="알림" /></div>
      </div>
      <div>
        <div className="mb-2 text-[10.5px] text-ink-4">NavTabs</div>
        <NavTabs tabs={[{ label: '오늘', isActive: true, onSelect: () => {} }, { label: '체크리스트', isActive: false, onSelect: () => {} }, { label: '커뮤니티', isActive: false, onSelect: () => {} }]} />
      </div>
    </div>
  );
}

const SECTIONS: Section[] = [
  { key: 'shell-bar', group: '셸', name: '저널 바 조각', desc: '날짜 · 통계 칩 · 라우트별 CTA. 셸 두 번째 줄.', render: () => (
    <div className="flex items-center gap-3">
      <span className="text-[12px] text-ink-3">10월 8일 목요일</span>
      {['7일 연속', '31일 기록'].map((t) => <span key={t} className="flex h-[26px] items-center rounded-full border border-border px-2.5 text-[11px] text-ink-3">{t}</span>)}
      <div className="ml-auto"><Button variant="grain" tone="primary" size="md" icon={Plus}>기록</Button></div>
    </div>
  ) },
  { key: 'shell-dock', group: '셸', name: '하단 독', desc: 'LiquidGlass 알약 + 3개 토글 버튼 + grain CTA. 팝오버는 셸 안에서만.', render: () => (
    <div className="flex justify-center py-4" style={{ background: 'var(--desk-bg)' }}>
      <LiquidGlassDefs />
      <LiquidGlass className="rounded-full px-1.5 py-1.5" contentClassName="flex items-center gap-0.5">
        {[[Calendar, '10.8'], [FolderOpen, '미션'], [Flame, '7일']].map(([Icon, label]) => {
          const I = Icon as typeof Calendar;
          return <span key={String(label)} className="flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] text-ink-2"><I size={13} /> {String(label)}</span>;
        })}
        <Button variant="grain" tone="primary" size="sm" icon={Plus}>식사</Button>
      </LiquidGlass>
    </div>
  ) },
  { key: 'profile', group: '홈', name: 'ProfilePanel', desc: '아바타 · 이름 · 한 줄 소개 · D+N · 최근 28일 잔디.', render: () => <ProfilePanel nickname="다이어터" bio="복싱 다이어트 도전 중!" totalDays={31} grass={GRASS} /> },
  { key: 'missions', group: '홈', name: 'MissionDrawer', desc: '핵심 미션 3개를 grain 알약으로. 누르면 완료 토글, 2개면 성공.', render: () => <MissionDrawerDemo /> },
  { key: 'week', group: '홈', name: 'WeekStrip', desc: '월~일 성공 칸. 성공=primary, 아직=점선.', render: () => <WeekStrip weeklyStatus={[true, true, true, false, false, false, false]} /> },
  { key: 'banner', group: '홈', name: 'StreakBanner', desc: '연속 기록 격려 한 줄. 체크리스트로 이동.', render: () => <div className="space-y-2"><StreakBanner currentStreak={7} /><StreakBanner currentStreak={0} /></div> },
  { key: 'photos', group: '홈', name: 'PhotoStrip', desc: '오늘 끼니 썸네일 + 점선 추가 칸. 사진 없으면 종이색 칸.', render: () => <PhotoStrip meals={MEALS} /> },
  { key: 'records', group: '홈', name: 'RecordList', desc: '미션 체크 + 식사 기록을 한 카드에. 행 전체가 버튼.', render: () => <RecordListDemo /> },
  { key: 'reward', group: '홈', name: 'RewardStatusCard', desc: '과자박스 · 치팅데이 타일 + 사용 패널.', render: () => <WidgetCard noPadding><RewardStatusCard snackBoxCount={3} consecutiveDietDays={7} /></WidgetCard> },
  { key: 'card', group: '홈', name: 'WidgetCard', desc: '반투명 종이 카드. 모든 카드 표면의 단일 소스.', render: () => <WidgetCard title="제목" action={<Button variant="text" size="sm">액션</Button>}><p className="text-[12px] text-ink-3">본문. border-border/50 · bg-surface/75 · 따뜻한 그림자.</p></WidgetCard> },
  { key: 'controls', group: '디자인 시스템', name: '컨트롤', desc: 'bongchil-design-system에서 가져다 쓰는 것들.', render: () => <ControlsDemo /> },
  { key: 'surfaces', group: '디자인 시스템', name: '표면', desc: 'BasicGlass(가려주는 유리) · LiquidGlass(보여주는 유리) · PostItCard.', render: () => (
    <div className="flex flex-wrap items-start gap-4 rounded-[var(--radius-l)] p-4" style={{ background: 'var(--desk-bg)' }}>
      <LiquidGlassDefs />
      <BasicGlass airy className="w-40 rounded-[var(--radius-l)] p-3 text-[12px] text-ink-2">BasicGlass airy</BasicGlass>
      <BasicGlass opaque className="w-40 rounded-[var(--radius-l)] p-3 text-[12px] text-ink-2">BasicGlass opaque</BasicGlass>
      <LiquidGlass className="w-40 rounded-[var(--radius-l)] p-3 text-[12px] text-ink-2" contentClassName="block">LiquidGlass</LiquidGlass>
      <PostItCard from="기로기" color="yellow" tape width={150} caption="포스트잇 메모" />
    </div>
  ) },
];

export default function ComponentCatalogPage() {
  const [active, setActive] = useState(SECTIONS[0].key);
  const groups = Array.from(new Set(SECTIONS.map((s) => s.group)));
  return (
    <div className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mb-4 flex items-baseline gap-2">
        <h1 className="text-[16px] font-bold tracking-tight text-ink">컴포넌트</h1>
        <span className="text-[11px] text-ink-4">앱에서 실제로 쓰는 것만 · {SECTIONS.length}개</span>
      </div>
      <div className="grid gap-6 @3xl:grid-cols-[180px_minmax(0,1fr)]">
        <nav className="@3xl:sticky @3xl:top-0 @3xl:self-start">
          <div className="flex flex-wrap gap-1 @3xl:flex-col @3xl:gap-0">
            {groups.map((g) => (
              <div key={g} className="@3xl:mb-3">
                <div className="hidden px-2 pb-1 text-[10px] uppercase tracking-[0.15em] text-ink-5 @3xl:block">{g}</div>
                {SECTIONS.filter((s) => s.group === g).map((s) => (
                  <button key={s.key} type="button" onClick={() => setActive(s.key)} className={`block rounded-[var(--radius-s)] px-2 py-1 text-left text-[12px] transition-colors ${active === s.key ? 'bg-primary-subtle text-primary' : 'text-ink-3 hover:text-ink'}`}>{s.name}</button>
                ))}
              </div>
            ))}
          </div>
        </nav>
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.key} id={s.key} className={active === s.key ? '' : 'hidden @3xl:block'}>
              <div className="mb-2 flex items-baseline gap-2">
                <h2 className="text-[13px] font-semibold text-ink-2">{s.name}</h2>
                <span className="text-[10px] uppercase tracking-[0.15em] text-ink-5">{s.group}</span>
              </div>
              <p className="mb-3 text-[12px] text-ink-4">{s.desc}</p>
              <Stage>{s.render()}</Stage>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
