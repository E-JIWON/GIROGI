'use client';

/**
 * /proposals — 봉칠 디자인 시스템 기준 GIROGI 홈 시안 5종.
 * 기존 페이지는 그대로 두고, 이 라우트에서만 시안을 비교한다.
 */

import { useState } from 'react';
import Link from 'next/link';
import { NavTabs } from 'bongchil-design-system';
import { PROPOSALS, type ProposalKey } from './data';
import { Glass, Ink, PaperDesk, PostIt } from './proposals';

const PREVIEW: Record<ProposalKey, () => React.ReactElement> = {
  paper: () => <PaperDesk />,
  glass: () => <Glass />,
  postit: () => <PostIt />,
  ink: () => <Ink />,
  dark: () => <PaperDesk dark />,
};

export default function DesignPage() {
  const [key, setKey] = useState<ProposalKey>('paper');
  const p = PROPOSALS.find((x) => x.key === key)!;
  const Preview = PREVIEW[key];

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
            <div className="text-[11px] text-ink-3">bongchil-design-system v0.1.2 기준</div>
            <h1 className="text-[22px] font-bold tracking-tight text-ink">GIROGI 홈 시안 5종</h1>
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
            <div className="flex items-baseline gap-2">
              <h2 className="text-[18px] font-bold text-ink">{p.name}</h2>
              <span className="text-[11px] uppercase tracking-[0.15em] text-ink-4">{p.en}</span>
              {p.recommended && (
                <span className="rounded-[var(--radius-s)] bg-primary-light px-1.5 py-0.5 text-[10px] font-medium text-primary">
                  추천
                </span>
              )}
            </div>
            <p className="mt-1 text-[13px] text-ink-2">{p.tagline}</p>
          </div>
          <div className="text-[11px] text-ink-3">
            GIROGI 적합도{' '}
            <span className="ml-1 tracking-[0.2em] text-primary">
              {'●'.repeat(p.fit)}
              <span className="text-ink-5">{'●'.repeat(3 - p.fit)}</span>
            </span>
          </div>
        </section>

        {/* 미리보기 */}
        <div className="mt-4">
          <Preview />
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
                <th className="py-1.5 font-medium">한 줄</th>
                <th className="py-1.5 text-right font-medium">적합도</th>
              </tr>
            </thead>
            <tbody>
              {PROPOSALS.map((x) => (
                <tr
                  key={x.key}
                  onClick={() => setKey(x.key)}
                  className={`cursor-pointer border-t border-border ${x.key === key ? 'text-ink' : 'text-ink-2'}`}
                >
                  <td className="py-2 pr-3 font-medium">
                    {x.name}
                    {x.recommended && <span className="ml-1 text-primary">★</span>}
                  </td>
                  <td className="py-2 pr-3 text-ink-3">{x.tagline}</td>
                  <td className="py-2 text-right tracking-[0.2em] text-primary">
                    {'●'.repeat(x.fit)}
                    <span className="text-ink-5">{'●'.repeat(3 - x.fit)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[11px] text-ink-4">
            추천: <b className="text-ink-2">종이 책상</b>을 기본으로, <b className="text-ink-2">다크 데스크</b>를 같은 토큰으로 밤 테마.
            포스트잇은 홈의 미션 카드에만 부분 적용하면 둘 다 살릴 수 있다.
          </p>
        </section>
      </div>
    </div>
  );
}
