'use client';

/**
 * 저널 셸 — 앱 전체 몸체 (bongchil-diary app-frame 결).
 * 책상 위 카드 한 장: Header(워드마크 + NavTabs + 프로필) → JournalBar(날짜·통계 칩·CTA) → 스크롤 본문 → 하단 중앙 독.
 * 좌측 사이드바·하단 탭바를 대체한다. 모바일도 같은 카드 — 패널만 접힌다.
 */

import { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, ClipboardList, Flame, FolderOpen, Pencil, Plus, Timer, Trophy } from 'lucide-react';
import { BasicGlass, Button, LiquidGlass, LiquidGlassDefs, NavTabs, TodoCheckbox, configure } from 'bongchil-design-system';
import { useStreakStore } from '@/stores/streakStore';
import { useMealRecordStore } from '@/stores/mealRecordStore';
import { mockChecklistItems, mockDailyRecords } from '@/lib/mock/dailyRecords';
import { mockCurrentUser } from '@/lib/mock/users';
import { MealPlace, MealPlaceDisplayNames } from '@/types/enums';

// 디자인 시스템 링크 → next/link (NavTabs href)
configure({ Link: NextLink as never });

const TABS = [
  { label: '오늘', href: '/' },
  { label: '체크리스트', href: '/checklist' },
  { label: '유혹 극복', href: '/emergency' },
  { label: '커뮤니티', href: '/community' },
];

/** 라우트별 저널 바 CTA */
const CTA: Record<string, { label: string; href: string; icon: typeof Plus }> = {
  '/': { label: '기록', href: '/checklist', icon: Plus },
  '/checklist': { label: '식사 기록', href: '/checklist', icon: Pencil },
  '/emergency': { label: '타이머', href: '/emergency', icon: Timer },
  '/community': { label: '글쓰기', href: '/community', icon: Pencil },
  '/profile': { label: '편집', href: '/profile', icon: Pencil },
};

type Dock = 'cal' | 'missions' | 'stats' | null;

function MonthCalendar() {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const days = new Date(y, m + 1, 0).getDate();
  const pad = (new Date(y, m, 1).getDay() + 6) % 7; // 월요일 시작
  const ok = new Set(mockDailyRecords.filter((r) => r.isSuccessDay).map((r) => format(new Date(r.date), 'yyyy-MM-dd')));
  return (
    <div>
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="text-[11px] font-medium text-primary">{format(today, 'yyyy년 M월')}</span>
        <span className="text-[10px] text-ink-5">성공 {ok.size}일</span>
      </div>
      <div className="grid grid-cols-7 gap-[3px] text-center">
        {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
          <span key={d} className="text-[9px] text-ink-5">{d}</span>
        ))}
        {Array.from({ length: pad }).map((_, i) => <span key={`p${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
          const key = format(new Date(y, m, d), 'yyyy-MM-dd');
          const isToday = d === today.getDate();
          return (
            <span
              key={d}
              className={`grid h-6 place-items-center rounded-[5px] text-[10px] tabular-nums ${
                isToday ? 'bg-primary font-semibold text-white' : ok.has(key) ? 'bg-primary/15 text-ink-2' : d > today.getDate() ? 'text-ink-5' : 'text-ink-3'
              }`}
            >
              {d}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function DockPopover({ which, onClose }: { which: Dock; onClose: () => void }) {
  const { streakData } = useStreakStore();
  const placeStats = useMealRecordStore().getWeeklyPlaceStats();
  if (!which) return null;
  const core = mockChecklistItems.filter((i) => i.isCoreMission);
  return (
    <BasicGlass opaque className="absolute bottom-[calc(100%+10px)] left-1/2 w-[300px] max-w-[calc(100vw-24px)] -translate-x-1/2 rounded-2xl p-3 shadow-l">
      {which === 'cal' && <MonthCalendar />}
      {which === 'missions' && (
        <div>
          <div className="px-1 pb-1 text-[11px] font-medium text-ink-3">오늘의 핵심 미션</div>
          <ul className="space-y-1">
            {core.map((i) => (
              <li key={i.id} className="flex items-center gap-2.5 rounded-[var(--radius-m)] px-2 py-1.5">
                <TodoCheckbox size={15} done={false} readOnly />
                <span className="text-[12.5px] text-ink">{i.title}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-end">
            <Button variant="text" tone="primary" size="sm" icon={ClipboardList} href="/checklist" onClick={onClose}>체크리스트에서 체크</Button>
          </div>
        </div>
      )}
      {which === 'stats' && (
        <div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[['연속', `${streakData.currentStreak}일`], ['최장', `${streakData.longestStreak}일`], ['총', `${streakData.totalDays}일`]].map(([k, v]) => (
              <div key={k} className="rounded-[var(--radius-m)] bg-surface-subtle py-2">
                <div className="text-[10px] text-ink-4">{k}</div>
                <div className="text-[15px] font-semibold tabular-nums text-ink">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {(Object.values(MealPlace) as MealPlace[]).map((p) => {
              const n = placeStats[p] ?? 0;
              return (
                <div key={p} className="flex items-center gap-2 text-[11px]">
                  <span className="w-10 text-ink-3">{MealPlaceDisplayNames[p]}</span>
                  <span className="h-1.5 flex-1 rounded-full bg-surface-subtle"><span className="block h-full rounded-full bg-primary/70" style={{ width: `${Math.min(100, (n / 7) * 100)}%` }} /></span>
                  <span className="w-6 text-right tabular-nums text-ink-3">{n}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </BasicGlass>
  );
}

export function JournalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [dock, setDock] = useState<Dock>(null);
  const { streakData } = useStreakStore();
  const routeKey = '/' + (pathname.split('/')[1] ?? '');
  const cta = CTA[routeKey] ?? CTA['/'];
  const isProfile = routeKey === '/profile';
  const today = format(new Date(), 'M월 d일 EEEE', { locale: ko });

  return (
    <div className="h-dvh p-2 sm:p-4" style={{ background: 'var(--desk-bg)' }}>
      <LiquidGlassDefs />
      <div className="relative mx-auto flex h-full max-w-[1200px] flex-col overflow-hidden rounded-[var(--radius-l)] border border-border bg-surface shadow-m">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-3 py-2.5 sm:px-5">
          <NextLink href="/" className="text-[15px] font-extrabold tracking-tight text-ink">GIROGI</NextLink>
          {/* md 미만: 탭이 둘째 줄 전체 폭 (NavTabs의 max-md:flex-1 결) · md 이상: 워드마크 옆 자연 폭 */}
          <div className="max-md:order-last max-md:basis-full md:w-max">
            <NavTabs tabs={TABS.map((t) => ({ label: t.label, href: t.href, isActive: t.href === '/' ? pathname === '/' : pathname.startsWith(t.href) }))} />
          </div>
          <NextLink
            href="/profile"
            aria-label="프로필"
            className={`ml-auto grid size-7 shrink-0 place-items-center rounded-[9px] text-[11px] font-bold ${isProfile ? 'bg-primary text-white' : 'bg-primary-subtle text-primary'}`}
          >
            {mockCurrentUser.nickname[0]}
          </NextLink>
        </div>

        {/* JournalBar */}
        <div className="flex shrink-0 items-center gap-3 border-b border-border px-3 py-2.5 sm:px-5">
          <span className="text-[12px] text-ink-3">{today}</span>
          <div className="hidden items-center gap-1.5 sm:flex">
            {[`${streakData.currentStreak}일 연속`, `${streakData.totalDays}일 기록`].map((t) => (
              <span key={t} className="flex h-[26px] items-center rounded-full border border-border px-2.5 text-[11px] text-ink-3">{t}</span>
            ))}
          </div>
          <div className="ml-auto shrink-0">
            <Button variant="grain" tone="primary" size="md" icon={cta.icon} href={cta.href}>{cta.label}</Button>
          </div>
        </div>

        {/* 본문 */}
        <main className="@container flex-1 overflow-y-auto bg-surface-warm pb-24" onClick={() => dock && setDock(null)}>
          {children}
        </main>

        {/* BottomDock */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center sm:bottom-4">
          <div className="pointer-events-auto relative">
            <DockPopover which={dock} onClose={() => setDock(null)} />
            <LiquidGlass className="rounded-full px-1.5 py-1.5" contentClassName="flex items-center gap-0.5">
              {([
                ['cal', Calendar, format(new Date(), 'M.d')],
                ['missions', FolderOpen, '미션'],
                ['stats', Trophy, `${streakData.currentStreak}일`],
              ] as const).map(([k, Icon, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setDock(dock === k ? null : k)}
                  aria-pressed={dock === k}
                  className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] transition-colors ${dock === k ? 'bg-primary-subtle text-primary' : 'text-ink-2 hover:bg-surface/60'}`}
                >
                  {k === 'stats' ? <Flame size={13} className="text-primary" /> : <Icon size={13} />} {label}
                </button>
              ))}
              <Button variant="grain" tone="primary" size="sm" icon={Plus} href="/checklist">식사</Button>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </div>
  );
}
