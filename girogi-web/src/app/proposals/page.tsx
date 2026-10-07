'use client';

/**
 * /proposals — 봉칠 디자인 시스템 · 봉칠 일기장을 참고한 GIROGI 시안 5종.
 * 기존 페이지는 그대로 두고, 이 라우트에서만 시안을 비교한다.
 */

import { useState } from 'react';
import Link from 'next/link';
import { FilterChips, NavTabs } from 'bongchil-design-system';
import { PROPOSALS, SCREENS, type ProposalKey, type ScreenKey } from './data';
import { AtticWall, DayTicket, PaperDesk, ScribbleStream } from './proposals';
import { JournalShell } from './journal-shell';

export default function ProposalsPage() {
  const [key, setKey] = useState<ProposalKey>('paper');
  const [screen, setScreen] = useState<ScreenKey>('dashboard');
  const p = PROPOSALS.find((x) => x.key === key)!;

  return (
    <div
      className="min-h-screen bg-surface-subtle text-ink"
      style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif' }}
    >
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
      />

      <div className="mx-auto max-w-[1024px] px-4 py-6 md:px-8 md:py-8">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] text-ink-3">bongchil-design-system v0.1.2 · bongchil-diary 참고</div>
            <h1 className="text-[22px] font-bold tracking-tight text-ink">GIROGI 시안 5종</h1>
          </div>
          <Link href="/" className="text-[12px] text-ink-3 underline underline-offset-2 hover:text-ink">
            현재 홈과 비교 →
          </Link>
        </header>

        <div className="mt-5">
          <NavTabs
            tabs={PROPOSALS.map((x) => ({
              label: `${x.name}${x.recommended ? ' ★' : ''}`,
              isActive: x.key === key,
              onSelect: () => setKey(x.key),
            }))}
          />
        </div>

        {/* 시안 설명 */}
        <section className="mt-5 grid gap-4 md:grid-cols-[1fr_280px]">
          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-[18px] font-bold text-ink">{p.name}</h2>
              <span className="text-[11px] uppercase tracking-[0.15em] text-ink-4">{p.en}</span>
              {p.recommended && (
                <span className="rounded-[var(--radius-s)] bg-primary-light px-1.5 py-0.5 text-[10px] font-medium text-primary">추천</span>
              )}
            </div>
            <p className="mt-1 text-[13px] text-ink-2">{p.tagline}</p>
            <p className="mt-1 text-[11px] text-ink-4">출처 · {p.from}</p>
          </div>
          <div className="text-[11px] text-ink-3">
            GIROGI 적합도{' '}
            <span className="ml-1 tracking-[0.2em] text-primary">
              {'●'.repeat(p.fit)}
              <span className="text-ink-5">{'●'.repeat(3 - p.fit)}</span>
            </span>
          </div>
        </section>

        {/* 종이 책상은 화면별로 */}
        {key === 'paper' && (
          <div className="mt-4">
            <FilterChips items={SCREENS.map((s) => ({ value: s.key, label: s.label }))} value={screen} onChange={setScreen} />
          </div>
        )}

        {/* 미리보기 */}
        <div className="mt-4">
          {key === 'paper' && <PaperDesk screen={screen} />}
          {key === 'journal' && <JournalShell />}
          {key === 'attic' && <AtticWall />}
          {key === 'stream' && <ScribbleStream />}
          {key === 'ticket' && <DayTicket />}
        </div>

        {/* 왜 · 주의 */}
        <section className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius-l)] bg-surface p-5">
            <div className="text-[11px] font-medium text-ink-3">왜 이 방향인가</div>
            <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-ink-2">
              {p.why.map((w) => (
                <li key={w} className="flex gap-2">
                  <span className="text-primary">＋</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-l)] bg-surface p-5">
            <div className="text-[11px] font-medium text-ink-3">주의할 점</div>
            <p className="mt-2 text-[12px] leading-relaxed text-ink-2">{p.watch}</p>
          </div>
        </section>

        {/* 한눈에 */}
        <section className="mt-5 rounded-[var(--radius-l)] bg-surface p-5">
          <div className="text-[11px] font-medium text-ink-3">한눈에</div>
          <table className="mt-2 w-full text-[12px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.15em] text-ink-4">
                <th className="py-1.5 font-medium">시안</th>
                <th className="py-1.5 font-medium">어디서 왔나</th>
                <th className="py-1.5 font-medium">한 줄</th>
                <th className="py-1.5 text-right font-medium">적합도</th>
              </tr>
            </thead>
            <tbody>
              {PROPOSALS.map((x) => (
                <tr key={x.key} onClick={() => setKey(x.key)} className={`cursor-pointer border-t border-border ${x.key === key ? 'text-ink' : 'text-ink-2'}`}>
                  <td className="py-2 pr-3 font-medium whitespace-nowrap">
                    {x.name}
                    {x.recommended && <span className="ml-1 text-primary">★</span>}
                  </td>
                  <td className="py-2 pr-3 text-[11px] text-ink-4">{x.from}</td>
                  <td className="py-2 pr-3 text-ink-3">{x.tagline}</td>
                  <td className="py-2 text-right tracking-[0.2em] text-primary">
                    {'●'.repeat(x.fit)}
                    <span className="text-ink-5">{'●'.repeat(3 - x.fit)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-4">
            추천 조합: <b className="text-ink-2">저널 셸</b>을 몸체로, 안쪽 화면은 <b className="text-ink-2">종이 책상</b> 결로.
            홈 상단에 <b className="text-ink-2">하루 티켓</b> 한 장, 프로필에 <b className="text-ink-2">다락방 벽</b> 탭, 체크리스트는 <b className="text-ink-2">끄적끄적 스트림</b>으로 합치면 다섯 시안이 한 앱에 들어간다.
          </p>
        </section>
      </div>
    </div>
  );
}
