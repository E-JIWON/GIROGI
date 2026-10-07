'use client';

/**
 * /proposals — 다섯 시안의 미리보기.
 * 전부 같은 목 데이터(data.ts)를 다른 재질로 그린다. 실제 홈 위젯은 건드리지 않는다.
 */

import { useState } from 'react';
import { Flame, Plus, Cookie, Sparkles, UtensilsCrossed } from 'lucide-react';
import {
  BasicGlass,
  Button,
  FilterChips,
  LiquidGlass,
  LiquidGlassDefs,
  PaletteBlobs,
  PageTitle,
  PostItCard,
  Segmented,
  TodoCheckbox,
  Toggle,
} from 'bongchil-design-system';
import { mock } from './data';

const RADIUS = 'rounded-[var(--radius-l)]';
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const doneCount = mock.missions.filter((m) => m.done).length;

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-medium tracking-wide text-ink-3">{children}</div>;
}

/* ────────────────────────── 1 · 종이 책상 (+ 5 · 다크 데스크) ────────────────────────── */

export function PaperDesk({ dark = false }: { dark?: boolean }) {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [done, setDone] = useState(mock.missions.map((m) => m.done));
  const n = done.filter(Boolean).length;

  return (
    <div className={`${dark ? 'dark' : ''} ${RADIUS} p-5 md:p-7`} style={{ background: 'var(--desk-bg)' }}>
      <PageTitle
        title="오늘"
        subtitle={mock.date}
        action={
          <FilterChips
            items={[
              { value: 'week', label: '이번 주' },
              { value: 'month', label: '이번 달' },
            ]}
            value={period}
            onChange={setPeriod}
          />
        }
      />

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {/* 연속 기록 */}
        <BasicGlass airy className={`${RADIUS} p-5 md:col-span-2`}>
          <div className="flex items-start justify-between">
            <div>
              <Label>연속 기록</Label>
              <div className="mt-1 flex items-baseline gap-1.5 text-ink">
                <span className="text-[40px] font-bold leading-none tabular-nums tracking-tight">{mock.streak}</span>
                <span className="text-[14px] text-ink-3">일째</span>
              </div>
            </div>
            <span
              className="grid size-9 place-items-center rounded-[var(--radius-m)] bg-primary-light text-primary"
              aria-hidden
            >
              <Flame size={18} />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {DAYS.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <span
                  className={`h-8 w-full rounded-[var(--radius-s)] ${
                    mock.week[i] ? 'bg-primary' : 'border-[1.5px] border-dashed border-ink/20 bg-surface/50'
                  }`}
                />
                <span className="text-[10px] text-ink-4">{d}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-5 border-t border-border pt-3 text-[11px] text-ink-3">
            <span>이번 주 <b className="text-ink-2">3/7</b></span>
            <span>최장 <b className="text-ink-2">{mock.longest}일</b></span>
            <span>총 <b className="text-ink-2">{mock.total}일</b></span>
          </div>
        </BasicGlass>

        {/* 식사 리포트 */}
        <BasicGlass airy className={`${RADIUS} p-5`}>
          <Label>이번 주 식사</Label>
          <ul className="mt-3 space-y-2.5">
            {mock.report.map((r) => (
              <li key={r.label}>
                <div className="flex justify-between text-[12px]">
                  <span className="text-ink-2">{r.label}</span>
                  <span className="tabular-nums text-ink-3">{r.n}회</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-surface-subtle">
                  <div className="h-full rounded-full bg-primary/70" style={{ width: `${(r.n / 6) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-[var(--radius-m)] bg-primary-subtle px-3 py-2 text-[11px] text-primary">
            외식 2회. 잘 관리하고 있어요.
          </p>
        </BasicGlass>

        {/* 핵심 미션 */}
        <BasicGlass airy className={`${RADIUS} p-5 md:col-span-2`}>
          <div className="flex items-center justify-between">
            <Label>오늘의 핵심 미션</Label>
            <span className="text-[11px] tabular-nums text-ink-3">
              {n}/3 {n >= 2 && <b className="ml-1 text-primary">오늘 성공</b>}
            </span>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {mock.missions.map((m, i) => (
              <li key={m.title} className="flex items-center gap-3 py-2.5">
                {dark ? (
                  <Toggle
                    size="sm"
                    label={m.title}
                    checked={done[i]}
                    onChange={(v) => setDone(done.map((d, j) => (j === i ? v : d)))}
                  />
                ) : (
                  <TodoCheckbox
                    done={done[i]}
                    onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className={`text-[13px] ${done[i] ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</div>
                  <div className="text-[11px] text-ink-4">{m.sub}</div>
                </div>
              </li>
            ))}
          </ul>
        </BasicGlass>

        {/* 오늘의 식사 + 보상 */}
        <BasicGlass airy className={`${RADIUS} flex flex-col p-5`}>
          <Label>오늘의 식사</Label>
          <ul className="mt-3 space-y-2">
            {mock.meals.map((m) => (
              <li key={m.label} className="flex items-center justify-between text-[12px]">
                <span className="text-ink-3">{m.label}</span>
                <span className={m.value ? 'text-ink-2' : 'text-ink-5'}>{m.value ?? '아직'}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2 border-t border-border pt-3 text-[11px] text-ink-3">
            <Cookie size={13} /> 과자박스 {mock.reward.snackBox}
            <span className="mx-1 text-ink-5">·</span>
            <Sparkles size={13} /> 치팅데이 D-{mock.reward.cheatDayIn}
          </div>
          <div className="mt-auto pt-4">
            <Button variant="grain" tone="primary" size="md" icon={Plus}>
              저녁 기록하기
            </Button>
          </div>
        </BasicGlass>
      </div>
    </div>
  );
}

/* ────────────────────────── 2 · 리퀴드 글라스 ────────────────────────── */

export function Glass() {
  const [done, setDone] = useState(mock.missions.map((m) => m.done));
  const card = `${RADIUS} p-5`;
  return (
    <div className={`relative overflow-hidden ${RADIUS} p-5 md:p-7`} style={{ background: 'var(--desk-bg)' }}>
      <LiquidGlassDefs />
      <PaletteBlobs palette={['90,130,104', '200,160,80', '100,190,140']} seed="girogi" count={4} />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-ink-3">{mock.date}</div>
            <h2 className="text-[20px] font-bold tracking-tight text-ink">오늘</h2>
          </div>
          <Button variant="glass" shape="round" icon={Plus} aria-label="기록하기" />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <LiquidGlass className={`${card} md:col-span-2`} contentClassName="block">
            <Label>연속 기록</Label>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-[44px] font-bold leading-none tabular-nums tracking-tight text-ink">{mock.streak}</span>
              <span className="text-[14px] text-ink-3">일째</span>
              <Flame size={18} className="ml-1 self-center text-primary" />
            </div>
            <div className="mt-4 flex gap-1.5">
              {DAYS.map((d, i) => (
                <span
                  key={d}
                  className={`grid h-8 flex-1 place-items-center rounded-full text-[10px] ${
                    mock.week[i] ? 'bg-primary text-white' : 'bg-surface/40 text-ink-4'
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </LiquidGlass>

          <LiquidGlass className={card} contentClassName="block">
            <Label>이번 주 식사</Label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {mock.report.map((r) => (
                <div key={r.label} className="rounded-[var(--radius-m)] bg-surface/40 px-3 py-2">
                  <div className="text-[10px] text-ink-3">{r.label}</div>
                  <div className="text-[18px] font-semibold tabular-nums text-ink">{r.n}</div>
                </div>
              ))}
            </div>
          </LiquidGlass>

          <LiquidGlass className={`${card} md:col-span-2`} contentClassName="block">
            <div className="flex items-center justify-between">
              <Label>오늘의 핵심 미션</Label>
              <span className="text-[11px] tabular-nums text-ink-3">{done.filter(Boolean).length}/3</span>
            </div>
            <ul className="mt-3 space-y-2">
              {mock.missions.map((m, i) => (
                <li key={m.title}>
                  <LiquidGlass
                    as="button"
                    onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))}
                    className="w-full rounded-[var(--radius-m)] px-3 py-2 text-left"
                    contentClassName="flex w-full items-center gap-3"
                  >
                    <TodoCheckbox done={done[i]} readOnly />
                    <span className={`text-[13px] ${done[i] ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span>
                  </LiquidGlass>
                </li>
              ))}
            </ul>
          </LiquidGlass>

          <LiquidGlass className={card} contentClassName="block">
            <Label>오늘의 식사</Label>
            <ul className="mt-3 space-y-2">
              {mock.meals.map((m) => (
                <li key={m.label} className="flex items-center justify-between text-[12px]">
                  <span className="text-ink-3">{m.label}</span>
                  <span className={m.value ? 'text-ink-2' : 'text-ink-5'}>{m.value ?? '아직'}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-ink-3">
              <Cookie size={13} /> {mock.reward.snackBox} <Sparkles size={13} className="ml-2" /> D-{mock.reward.cheatDayIn}
            </div>
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────── 3 · 포스트잇 보드 ────────────────────────── */

const PAPER = ['green', 'yellow', 'pink'] as const;

export function PostIt() {
  const [done, setDone] = useState(mock.missions.map((m) => m.done));
  return (
    <div className={`${RADIUS} p-5 md:p-7`} style={{ background: 'var(--desk-bg)' }}>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-ink-3">{mock.date}</div>
          <h2 className="text-[20px] font-bold tracking-tight text-ink">오늘 할 일 세 장</h2>
        </div>
        <span className="text-[11px] text-ink-4">떼면 완료 · {done.filter(Boolean).length}/3</span>
      </div>

      <div className="mt-6 flex flex-wrap items-start gap-5">
        {/* 연속 기록 — 파란 노트 */}
        <PostItCard
          from="기로기"
          color="blue"
          tape
          width={150}
          caption={`🔥 ${mock.streak}일 연속\n이번 주 3/7 · 최장 ${mock.longest}일`}
          style={{ rotate: '-2.5deg' }}
        />
        {/* 미션 세 장 */}
        {mock.missions.map((m, i) => (
          <button
            key={m.title}
            type="button"
            onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))}
            className="press-effect text-left transition-opacity"
            style={{ rotate: `${[1.5, -1, 2][i]}deg`, opacity: done[i] ? 0.45 : 1 }}
            aria-pressed={done[i]}
          >
            <PostItCard
              from={`미션 ${i + 1}`}
              color={PAPER[i]}
              tape
              width={180}
              caption={`${done[i] ? '✓ ' : ''}${m.title}\n${m.sub}`}
            />
          </button>
        ))}
      </div>

      {/* 아래 — 식사·보상은 작은 종이 줄 */}
      <div className="mt-7 grid gap-3 md:grid-cols-2">
        <BasicGlass airy className={`${RADIUS} p-4`}>
          <Label>오늘의 식사</Label>
          <ul className="mt-2 space-y-1.5">
            {mock.meals.map((m) => (
              <li key={m.label} className="flex items-center gap-2 text-[12px]">
                <UtensilsCrossed size={12} className="text-ink-4" />
                <span className="w-7 text-ink-3">{m.label}</span>
                <span className={m.value ? 'text-ink-2' : 'text-ink-5'}>{m.value ?? '아직'}</span>
              </li>
            ))}
          </ul>
        </BasicGlass>
        <BasicGlass airy className={`${RADIUS} flex items-center justify-between p-4`}>
          <div className="text-[12px] text-ink-2">
            과자박스 <b>{mock.reward.snackBox}</b> · 치팅데이 <b>D-{mock.reward.cheatDayIn}</b>
          </div>
          <Button variant="dotted" tone="primary" size="sm" icon={Plus}>
            기록
          </Button>
        </BasicGlass>
      </div>
    </div>
  );
}

/* ────────────────────────── 4 · 잉크 에디토리얼 ────────────────────────── */

export function Ink() {
  const [period, setPeriod] = useState('week');
  const [done, setDone] = useState(mock.missions.map((m) => m.done));
  const n = done.filter(Boolean).length;
  const row = 'flex items-baseline justify-between border-b border-border py-2.5 text-[12px]';

  return (
    <div className={`${RADIUS} border border-border bg-surface-warm p-5 md:p-8`}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3">{mock.date}</div>
        <Segmented
          groups={[
            {
              items: [
                { value: 'week', label: '주' },
                { value: 'month', label: '월' },
              ],
              value: period,
              onChange: setPeriod,
            },
          ]}
        />
      </div>

      <div className="mt-6 flex items-end gap-3 border-b border-border-strong pb-5">
        <span className="text-[72px] font-semibold leading-[0.85] tabular-nums tracking-tighter text-ink">{mock.streak}</span>
        <div className="pb-1 text-[12px] leading-relaxed text-ink-3">
          일 연속
          <br />
          최장 {mock.longest} · 총 {mock.total}
        </div>
        <div className="ml-auto flex gap-1 pb-1.5">
          {DAYS.map((d, i) => (
            <span
              key={d}
              className={`h-5 w-2 rounded-sm ${mock.week[i] ? 'bg-ink' : 'bg-ink-5'}`}
              title={d}
            />
          ))}
        </div>
      </div>

      <div className="mt-2 grid gap-x-10 md:grid-cols-2">
        <section>
          <div className="pt-3 text-[11px] uppercase tracking-[0.18em] text-ink-3">미션 {n}/3</div>
          <ul>
            {mock.missions.map((m, i) => (
              <li key={m.title} className="flex items-center gap-3 border-b border-border py-2.5">
                <TodoCheckbox size={15} done={done[i]} onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))} />
                <span className={`text-[13px] ${done[i] ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span>
              </li>
            ))}
          </ul>
          {n >= 2 && <p className="pt-2 text-[11px] text-primary">오늘 성공. 2개면 충분하다.</p>}
        </section>

        <section>
          <div className="pt-3 text-[11px] uppercase tracking-[0.18em] text-ink-3">이번 주 식사</div>
          {mock.report.map((r) => (
            <div key={r.label} className={row}>
              <span className="text-ink-2">{r.label}</span>
              <span className="tabular-nums text-ink">{r.n}</span>
            </div>
          ))}
          <div className="pt-3 text-[11px] uppercase tracking-[0.18em] text-ink-3">오늘</div>
          {mock.meals.map((m) => (
            <div key={m.label} className={row}>
              <span className="text-ink-2">{m.label}</span>
              <span className={m.value ? 'text-ink' : 'text-ink-5'}>{m.value ?? '—'}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3 text-[11px] text-ink-3">
            <span>
              과자박스 {mock.reward.snackBox} · 치팅데이 D-{mock.reward.cheatDayIn}
            </span>
            <Button variant="text" tone="primary" size="sm" icon={Plus}>
              저녁 기록
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
