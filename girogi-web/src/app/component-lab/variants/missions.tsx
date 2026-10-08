'use client';

import { Button, PostItCard, TodoCheckbox, Toggle } from 'bongchil-design-system';
import { MissionDrawer } from '../../home/_components/journal/mission-drawer';
import { useMissionState, type Variant } from './shared';

export const MISSION: Variant[] = [
  { key: 'pills', name: 'grain 알약 1열', recommended: true, why: '일기장 서랍장 알약과 같은 재질. 눌리면 오라가 켜져 "지금 켜짐"이 한눈에. 좁은 패널에 딱.',
    Render: () => { const s = useMissionState(); return <MissionDrawer missions={s.missions} onToggle={s.toggle} />; } },
  { key: 'checklist', name: '체크 리스트', why: '체크리스트 페이지와 같은 손맛(TodoCheckbox). 설명까지 보여야 할 때. 알약보다 세로가 길다.',
    Render: () => { const s = useMissionState(); return (
      <div>
        <div className="mb-2 px-1 text-[12.5px] font-semibold text-ink-2">오늘의 핵심 미션 <span className="ml-1 text-[11px] font-normal text-ink-4">{s.done}/3</span></div>
        <ul className="divide-y divide-border rounded-[var(--radius-m)] border border-border bg-surface">
          {s.missions.map((m) => (
            <li key={m.id}><button type="button" onClick={() => s.toggle(m.id)} className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left"><TodoCheckbox size={15} done={m.isCompleted} readOnly /><span><span className={`block text-[12.5px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span><span className="block text-[10.5px] text-ink-4">{m.description}</span></span></button></li>
          ))}
        </ul>
      </div>
    ); } },
  { key: 'toggle', name: '뒤집히는 토글', why: 'Toggle 플립 카드로 "완료"를 뒤집는 동작으로. 재미있지만 체크 의미가 약해 설명 라벨이 필요.',
    Render: () => { const s = useMissionState(); return (
      <div className="space-y-2">
        {s.missions.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-[var(--radius-m)] bg-surface px-3 py-2">
            <Toggle size="sm" checked={m.isCompleted} onChange={() => s.toggle(m.id)} label={m.title} />
            <span className={`text-[12.5px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span>
          </div>
        ))}
      </div>
    ); } },
  { key: 'postit', name: '포스트잇 3장', why: '냉장고 메모 느낌. 감정적 기능과 잘 맞지만 패널 폭(200px)에선 비좁다. 홈 본문 상단에 가로로 둘 때 좋다.',
    Render: () => { const s = useMissionState(); const colors = ['green', 'yellow', 'pink'] as const; return (
      <div className="flex flex-wrap gap-4 pt-3">
        {s.missions.map((m, i) => (
          <button key={m.id} type="button" onClick={() => s.toggle(m.id)} className="press-effect" style={{ rotate: `${[-2, 1.5, -1][i]}deg`, opacity: m.isCompleted ? 0.45 : 1 }}>
            <PostItCard from={`미션 ${i + 1}`} color={colors[i]} tape width={150} caption={`${m.isCompleted ? '✓ ' : ''}${m.title}`} />
          </button>
        ))}
      </div>
    ); } },
  { key: 'ring', name: '진행 세그먼트 + 칩', why: '맨 위에 3칸 세그먼트 바로 "2개면 성공"을 시각화. 미션 수가 고정(3)이라 가능한 표현.',
    Render: () => { const s = useMissionState(); return (
      <div>
        <div className="mb-2 flex items-center gap-2 px-1"><span className="text-[12.5px] font-semibold text-ink-2">핵심 미션</span><span className="text-[11px] text-ink-4">{s.done >= 2 ? '오늘 성공' : `${2 - s.done}개 더`}</span></div>
        <div className="mb-3 grid grid-cols-3 gap-1">{[0, 1, 2].map((i) => <span key={i} className={`h-1.5 rounded-full ${i < s.done ? 'bg-primary' : i === 1 ? 'bg-primary/25' : 'bg-ink-5/40'}`} />)}</div>
        <div className="flex flex-wrap gap-1.5">{s.missions.map((m) => <Button key={m.id} variant="grain" size="sm" icon={m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => s.toggle(m.id)}>{m.title.split(' ')[0]}</Button>)}</div>
      </div>
    ); } },
];
