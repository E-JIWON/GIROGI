'use client';

import { Check } from 'lucide-react';
import { Button } from 'bongchil-design-system';
import { MissionDrawer } from '../../home/_components/journal/mission-drawer';
import { useMissionState, type Variant } from './shared';

const SLOT = ['아침', '점심', '저녁'];
const Head = ({ done, label = '오늘의 핵심 미션' }: { done: number; label?: string }) => (
  <div className="mb-2 flex items-baseline gap-2 px-1"><span className="text-[12.5px] font-semibold text-ink-2">{label}</span><span className="text-[11px] tabular-nums text-ink-4">{done}/3{done >= 2 && <b className="ml-1 text-primary">성공</b>}</span></div>
);

export const MISSION: Variant[] = [
  { key: 'pills', name: 'grain 알약 (현재)', why: '기준. 눌리면 오라가 켜지지만, 켜진 게 "완료"인지 "선택"인지 한 번 더 읽어야 한다.',
    Render: () => { const s = useMissionState(); return <MissionDrawer missions={s.missions} onToggle={s.toggle} />; } },
  { key: 'pills-check', name: '알약 + 체크 아이콘', recommended: true, why: '완료되면 아이콘이 체크로 바뀌고 글자에 취소선. "완료"가 아이콘 하나로 읽힌다. 가장 작은 수정.',
    Render: () => { const s = useMissionState(); return (
      <div><Head done={s.done} />
        <div className="grid gap-1.5">{s.missions.map((m) => <Button key={m.id} variant="grain" size="sm" icon={m.isCompleted ? Check : m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => s.toggle(m.id)}><span className={m.isCompleted ? 'line-through opacity-70' : ''}>{m.title}</span></Button>)}</div>
      </div>
    ); } },
  { key: 'pills-slot', name: '알약 + 시간대 접두', why: '아침 · 점심 · 저녁 라벨을 앞에 붙여 "언제 할 일"이 보인다. 체크리스트의 슬롯 구조와 이어진다.',
    Render: () => { const s = useMissionState(); return (
      <div><Head done={s.done} />
        <div className="grid gap-1.5">{s.missions.map((m, i) => (
          <div key={m.id} className="flex items-center gap-2"><span className={`w-7 shrink-0 text-[10px] ${m.isCompleted ? 'text-primary' : 'text-ink-4'}`}>{SLOT[i]}</span><Button variant="grain" size="sm" icon={m.isCompleted ? Check : undefined} active={m.isCompleted} color="var(--color-primary)" onClick={() => s.toggle(m.id)} className="flex-1 justify-start">{m.title.replace(/^(아침|점심|저녁) /, '')}</Button></div>
        ))}</div>
      </div>
    ); } },
  { key: 'pills-status', name: '알약 + 상태 꼬리표', why: '알약 오른쪽에 "완료 / 아직" 꼬리표. 색을 못 보는 사람에게도 글자로 상태가 전달된다.',
    Render: () => { const s = useMissionState(); return (
      <div><Head done={s.done} />
        <div className="grid gap-1.5">{s.missions.map((m) => (
          <div key={m.id} className="flex items-center gap-2"><Button variant="grain" size="sm" icon={m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => s.toggle(m.id)} className="flex-1 justify-start">{m.title}</Button><span className={`w-7 shrink-0 text-right text-[10px] ${m.isCompleted ? 'font-medium text-primary' : 'text-ink-5'}`}>{m.isCompleted ? '완료' : '아직'}</span></div>
        ))}</div>
      </div>
    ); } },
  { key: 'pills-progress', name: '알약 + 성공선', why: '위에 3칸 중 2칸이 "성공선"임을 눈금으로. 2개 채우는 순간 헤더가 "오늘 성공"으로 바뀐다. 게임 규칙이 보인다.',
    Render: () => { const s = useMissionState(); return (
      <div><Head done={s.done} label={s.done >= 2 ? '오늘 성공' : '핵심 미션'} />
        <div className="relative mb-3 grid grid-cols-3 gap-1">{[0, 1, 2].map((i) => <span key={i} className={`h-1.5 rounded-full ${i < s.done ? 'bg-primary' : 'bg-ink-5/40'}`} />)}<span className="absolute -top-1 left-[66.6%] h-3.5 w-px bg-primary/60" /><span className="absolute -top-4 left-[66.6%] -translate-x-1/2 text-[9px] text-primary">성공선</span></div>
        <div className="grid gap-1.5">{s.missions.map((m) => <Button key={m.id} variant="grain" size="sm" icon={m.isCompleted ? Check : m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => s.toggle(m.id)}>{m.title}</Button>)}</div>
      </div>
    ); } },
  { key: 'pills-two-line', name: '두 줄 알약', why: '제목 아래 설명을 작은 글자로. 알약이 키가 커지지만 "왜 이 미션인지"가 패널에서 바로 읽힌다.',
    Render: () => { const s = useMissionState(); return (
      <div><Head done={s.done} />
        <div className="grid gap-1.5">{s.missions.map((m) => (
          <button key={m.id} type="button" onClick={() => s.toggle(m.id)} className={`flex items-center gap-2.5 rounded-[var(--radius-m)] border px-3 py-2 text-left transition-colors ${m.isCompleted ? 'border-primary/40 bg-primary-subtle' : 'border-border bg-surface hover:border-border-strong'}`}>
            <span className={`grid size-5 shrink-0 place-items-center rounded-[6px] ${m.isCompleted ? 'bg-primary text-white' : 'border-[1.5px] border-dashed border-ink/30'}`}>{m.isCompleted && <Check size={12} strokeWidth={3} />}</span>
            <span className="min-w-0"><span className={`block text-[12px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span><span className="block truncate text-[10px] text-ink-4">{m.description}</span></span>
          </button>
        ))}</div>
      </div>
    ); } },
];
