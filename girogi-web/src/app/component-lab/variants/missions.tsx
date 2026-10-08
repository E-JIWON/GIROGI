'use client';

import { Check } from 'lucide-react';
import { Button } from 'bongchil-design-system';
import { useMissionState, type Variant } from './shared';

const SLOT = ['아침', '점심', '저녁'];

/** 성공선 헤더 — 3칸 중 2칸째에 눈금 */
function SuccessLine({ done }: { done: number }) {
  return (
    <div className="mb-3 px-1">
      <div className="mb-1.5 flex items-baseline gap-2"><span className="text-[12.5px] font-semibold text-ink-2">{done >= 2 ? '오늘 성공' : '핵심 미션'}</span><span className="text-[11px] tabular-nums text-ink-4">{done}/3{done < 2 && ` · ${2 - done}개 더`}</span></div>
      <div className="relative grid grid-cols-3 gap-1">{[0, 1, 2].map((i) => <span key={i} className={`h-1.5 rounded-full transition-colors ${i < done ? 'bg-primary' : 'bg-ink-5/40'}`} />)}<span className="absolute -top-1 left-[66.6%] h-3.5 w-px bg-primary/60" /></div>
    </div>
  );
}

export const MISSION: Variant[] = [
  { key: 'line-slot-check', name: '성공선 + 시간대 + 체크', recommended: true, why: '성공선으로 규칙, 시간대 접두로 "언제", 체크 아이콘으로 "됐는지". 세 질문에 답하는 최소 조합.',
    Render: () => { const s = useMissionState(); return (
      <div><SuccessLine done={s.done} />
        <div className="grid gap-1.5">{s.missions.map((m, i) => (
          <div key={m.id} className="flex items-center gap-2"><span className={`w-7 shrink-0 text-[10px] ${m.isCompleted ? 'text-primary' : 'text-ink-4'}`}>{SLOT[i]}</span><Button variant="grain" size="sm" icon={m.isCompleted ? Check : m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => s.toggle(m.id)} className="flex-1 justify-start"><span className={m.isCompleted ? 'line-through opacity-70' : ''}>{m.title.replace(/^(아침|점심|저녁) /, '')}</span></Button></div>
        ))}</div>
      </div>
    ); } },
  { key: 'line-tag-check', name: '성공선 + 꼬리표 + 체크', why: '시간대 대신 오른쪽 "완료/아직" 글자. 색에 기대지 않고 상태가 읽힌다. 미션 이름은 원문 그대로.',
    Render: () => { const s = useMissionState(); return (
      <div><SuccessLine done={s.done} />
        <div className="grid gap-1.5">{s.missions.map((m) => (
          <div key={m.id} className="flex items-center gap-2"><Button variant="grain" size="sm" icon={m.isCompleted ? Check : m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => s.toggle(m.id)} className="flex-1 justify-start"><span className={m.isCompleted ? 'line-through opacity-70' : ''}>{m.title}</span></Button><span className={`w-7 shrink-0 text-right text-[10px] ${m.isCompleted ? 'font-medium text-primary' : 'text-ink-5'}`}>{m.isCompleted ? '완료' : '아직'}</span></div>
        ))}</div>
      </div>
    ); } },
  { key: 'line-all', name: '성공선 + 시간대 + 꼬리표 + 체크', why: '넷 다. 정보는 가장 분명하지만 200px 패널에선 알약이 짧아져 미션 이름이 잘린다. 패널을 220px로 넓히면 쓸 만하다.',
    Render: () => { const s = useMissionState(); return (
      <div><SuccessLine done={s.done} />
        <div className="grid gap-1.5">{s.missions.map((m, i) => (
          <div key={m.id} className="flex items-center gap-1.5"><span className={`w-6 shrink-0 text-[10px] ${m.isCompleted ? 'text-primary' : 'text-ink-4'}`}>{SLOT[i]}</span><Button variant="grain" size="sm" icon={m.isCompleted ? Check : m.icon} active={m.isCompleted} color="var(--color-primary)" onClick={() => s.toggle(m.id)} className="min-w-0 flex-1 justify-start"><span className={`truncate ${m.isCompleted ? 'line-through opacity-70' : ''}`}>{m.title.replace(/^(아침|점심|저녁) /, '')}</span></Button><span className={`w-6 shrink-0 text-right text-[9.5px] ${m.isCompleted ? 'text-primary' : 'text-ink-5'}`}>{m.isCompleted ? '완료' : '아직'}</span></div>
        ))}</div>
      </div>
    ); } },
  { key: 'line-seg-pills', name: '성공선이 곧 알약', why: '성공선 3칸 자체를 미션 버튼으로. 칸이 차오르는 게 곧 체크. 가장 게임 같고, 미션 이름은 아래 한 줄로만.',
    Render: () => { const s = useMissionState(); return (
      <div className="px-1">
        <div className="mb-2 flex items-baseline gap-2"><span className="text-[12.5px] font-semibold text-ink-2">{s.done >= 2 ? '오늘 성공' : '핵심 미션'}</span><span className="text-[11px] tabular-nums text-ink-4">{s.done}/3</span></div>
        <div className="relative grid grid-cols-3 gap-1">
          {s.missions.map((m, i) => <button key={m.id} type="button" onClick={() => s.toggle(m.id)} className={`flex h-9 flex-col items-center justify-center rounded-[8px] text-[10px] transition-colors ${m.isCompleted ? 'bg-primary text-white' : 'border-[1.5px] border-dashed border-ink/25 text-ink-3 hover:border-primary/50'}`}>{m.isCompleted ? <Check size={14} strokeWidth={3} /> : SLOT[i]}</button>)}
          <span className="pointer-events-none absolute -bottom-1.5 left-[66.6%] h-12 w-px -translate-y-1 bg-primary/50" />
        </div>
        <ul className="mt-2.5 space-y-1">{s.missions.map((m, i) => <li key={m.id} className={`text-[10.5px] ${m.isCompleted ? 'text-ink-4 line-through' : 'text-ink-2'}`}><span className="mr-1 text-ink-5">{SLOT[i]}</span>{m.title.replace(/^(아침|점심|저녁) /, '')}</li>)}</ul>
      </div>
    ); } },
];
