'use client';

/**
 * 저널 셸 — bongchil-diary의 app-frame을 GIROGI에 입힌 시안.
 * 책상 위 카드 한 장 안에 Header(NavTabs) + JournalBar + 스크롤 콘텐츠 + 하단 중앙 독.
 * PC는 일기장 메인처럼 좌측 200px 패널(프로필·미션 서랍·종류·달력) + 본문, 모바일은 한 열.
 */

import { useState } from 'react';
import {
  Calendar,
  Camera,
  ChevronRight,
  Coffee,
  Flame,
  FolderOpen,
  Home,
  Moon,
  Plus,
  Smartphone,
  Monitor,
  Trophy,
  Utensils,
  UtensilsCrossed,
  Zap,
} from 'lucide-react';
import {
  BasicGlass,
  Button,
  FilterChips,
  LiquidGlass,
  LiquidGlassDefs,
  NavTabs,
  Segmented,
  TodoCheckbox,
} from 'bongchil-design-system';
import { mock } from './data';
import { PaperChecklist, PaperCommunity, PaperEmergency, PaperProfile } from './proposals';

type Tab = 'home' | 'check' | 'sos' | 'friends' | 'me';
type Dock = 'cal' | 'missions' | 'stats' | 'add' | null;

const TAB_CTA: Record<Tab, string> = { home: '기록', check: '항목 편집', sos: '타이머 시작', friends: '글쓰기', me: '편집' };
const PLACES = [
  { value: 'all', label: '전체' },
  { value: 'home', label: '집밥', text: 'text-comment-green-solid' },
  { value: 'office', label: '회사밥', text: 'text-comment-sky-solid' },
  { value: 'out', label: '외식', text: 'text-comment-sand-solid' },
  { value: 'delivery', label: '배달', text: 'text-comment-pink-solid' },
];
const KINDS = [
  { icon: Home, label: '집밥' },
  { icon: Utensils, label: '회사밥' },
  { icon: UtensilsCrossed, label: '외식' },
  { icon: Zap, label: '배달' },
  { icon: Coffee, label: '간식' },
];
/** 10월 달력 — 성공한 날 (목 데이터 heat에서 앞 31칸) */
const OCT = Array.from({ length: 31 }, (_, i) => ({ d: i + 1, ok: mock.heat.flat()[i] ?? false }));

const card = 'rounded-2xl border border-border/50 bg-surface/75 shadow-[0_2px_14px_rgb(var(--shadow-ink)/0.04)] backdrop-blur-sm';

/* ── 좌측 패널 조각 (diary ProfileCard · DrawerCard · 종류 · DockCalendar bare) ── */

function ProfileBare({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3.5 px-1">
      <span
        className={`grid shrink-0 place-items-center rounded-[14px] bg-primary-subtle font-bold text-primary ${compact ? 'size-11 text-[15px]' : 'size-[62px] text-[20px]'}`}
        style={{ border: '2px dotted var(--color-primary-muted)' }}
      >
        다
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[13.5px] font-semibold tracking-tight text-ink">다이어터</span>
          <span className="shrink-0 font-mono text-[10.5px] font-medium text-primary/55">D+{mock.total}</span>
        </div>
        <div className="mt-0.5 truncate text-[11.5px] leading-[1.45] text-ink-4">의지력 말고 시스템으로</div>
        <div className="mt-1.5 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]">
          {mock.heat.flat().slice(0, 28).map((on, i) => (
            <span key={i} className={`h-[7px] rounded-[2px] ${on ? 'bg-primary/80' : 'bg-ink-5/40'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MissionDrawer({ done, toggle }: { done: boolean[]; toggle: (i: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline gap-2 px-1">
        <span className="text-[12.5px] font-semibold text-ink-2">미션 서랍</span>
        <span className="text-[11px] text-ink-4">{done.filter(Boolean).length}/3</span>
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {mock.missions.map((m, i) => (
          <Button key={m.title} variant="grain" size="sm" active={done[i]} color="var(--color-primary)" onClick={() => toggle(i)} count={done[i] ? 1 : 0}>
            {m.slot} · {m.title.replace(/ .*/, '')}
          </Button>
        ))}
      </div>
    </div>
  );
}

function KindGrid({ kind, setKind }: { kind: string; setKind: (k: string) => void }) {
  return (
    <div className="border-t border-border/60 pt-4">
      <span className="mb-2 block px-1 text-[10.5px] text-ink-4">종류</span>
      <div className="grid grid-cols-5 gap-1">
        {KINDS.map(({ icon: Icon, label }) => {
          const on = kind === label;
          return (
            <div key={label} className="flex flex-col items-center gap-1">
              <Button variant="grain" shape="square" size="sm" icon={Icon} active={on} aria-label={label} onClick={() => setKind(on ? '' : label)} />
              <span className={`text-[10.5px] ${on ? 'text-ink-2' : 'text-ink-4'}`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthCalendar({ quiet = false }: { quiet?: boolean }) {
  return (
    <div className={quiet ? '' : 'rounded-lg border border-primary/15 bg-primary-subtle/20 p-1.5'}>
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="text-[11px] font-medium text-primary">2026년 10월</span>
        <span className="text-[10px] text-ink-5">성공 {OCT.filter((d) => d.ok).length}일</span>
      </div>
      <div className="grid grid-cols-7 gap-[3px] text-center">
        {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
          <span key={d} className="text-[9px] text-ink-5">{d}</span>
        ))}
        {Array.from({ length: 3 }).map((_, i) => <span key={`pad${i}`} />)}
        {OCT.map(({ d, ok }) => (
          <span
            key={d}
            className={`grid h-6 place-items-center rounded-[5px] text-[10px] tabular-nums ${
              d === 7 ? 'bg-primary font-semibold text-white' : ok ? 'bg-primary/15 text-ink-2' : d > 7 ? 'text-ink-5' : 'text-ink-3'
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── 본문 조각 (MemoryBanner · PhotoStrip · RecordList) ── */

function HomeBody({ done, toggle, place }: { done: boolean[]; toggle: (i: number) => void; place: string }) {
  const meals = mock.meals.filter((m) => m.value);
  const photos = [
    { label: '아침 · 계란국', w: 76, tone: 'green' },
    { label: '점심 · 비빔밥', w: 96, tone: 'sand' },
    { label: '어제 저녁 · 두부조림', w: 76, tone: 'green' },
    { label: '어제 점심 · 샐러드', w: 110, tone: 'sky' },
  ].filter((p) => place === 'all' || (place === 'home' && p.tone === 'green') || (place === 'office' && p.tone === 'sand') || (place === 'out' && p.tone === 'sky'));
  return (
    <div className="flex flex-col gap-5">
      {/* MemoryBanner → "일주일 전 오늘" */}
      <div className="relative flex items-center gap-3 overflow-hidden rounded-[13px] bg-primary-subtle px-3.5 py-2.5">
        <Flame size={14} className="shrink-0 text-primary" />
        <span className="text-[12px] text-ink-2">
          일주일 전 오늘, 연속 기록이 끊겼다가 다시 시작한 날. 오늘로 <b className="text-primary">{mock.streak}일째</b>.
        </span>
        <ChevronRight size={13} className="ml-auto shrink-0 text-ink-4" />
      </div>

      {/* PhotoStrip → 식사 사진 */}
      <div>
        <header className="mb-2.5 flex items-baseline gap-2 px-1">
          <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">사진</h2>
          <span className="text-xs text-ink-4">{photos.length}장</span>
          <span className="ml-1 flex-1 self-center border-t border-dashed border-primary/35" />
          <span className="text-[11px] font-medium text-ink-4">앨범</span>
        </header>
        <div className="scrollbar-hide flex gap-2 overflow-x-auto px-1">
          {photos.map((p) => (
            <div key={p.label} className="relative h-[84px] shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface-warm/40" style={{ width: p.w }}>
              <div className="grid h-full place-items-center text-ink-4"><Camera size={16} /></div>
              <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/45 to-transparent px-1.5 pb-1 pt-3 text-[9px] text-white">{p.label}</span>
            </div>
          ))}
          <Button variant="dotted" size="sm" icon={Plus} className="!h-auto !w-11 shrink-0 justify-center !rounded-xl" aria-label="사진 추가" />
        </div>
      </div>

      {/* RecordList → 오늘 기록 */}
      <div>
        <header className="mb-2 flex items-baseline gap-2 px-1">
          <h2 className="text-[13px] font-semibold tracking-tight text-ink-2">기록</h2>
          <span className="text-xs text-ink-4">오늘 {meals.length + done.filter(Boolean).length}건</span>
        </header>
        <div className={`${card} divide-y divide-border/60`}>
          {mock.missions.map((m, i) => (
            <div key={m.title} className="flex items-center gap-3 px-4 py-2.5">
              <TodoCheckbox size={15} done={done[i]} onClick={() => toggle(i)} />
              <span className={`text-[12.5px] ${done[i] ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span>
              <span className="ml-auto text-[10px] text-ink-4">{m.slot}</span>
            </div>
          ))}
          {meals.map((m) => (
            <div key={m.label} className="flex items-center gap-3 px-4 py-2.5">
              <span className="grid size-[15px] place-items-center text-ink-4"><Camera size={12} /></span>
              <span className="text-[12.5px] text-ink-2">{m.label} · {m.value}</span>
              <span className="ml-auto font-mono text-[10px] text-ink-4">{m.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 하단 독 팝오버 ── */

function DockPopover({ which, done, toggle, onClose }: { which: Dock; done: boolean[]; toggle: (i: number) => void; onClose: () => void }) {
  const [place, setPlace] = useState('home');
  if (!which) return null;
  return (
    <BasicGlass opaque className="absolute bottom-[calc(100%+10px)] left-1/2 w-[300px] -translate-x-1/2 rounded-2xl p-3 shadow-l">
      {which === 'cal' && <MonthCalendar />}
      {which === 'missions' && (
        <div className="space-y-1">
          <div className="px-1 pb-1 text-[11px] font-medium text-ink-3">오늘의 미션 {done.filter(Boolean).length}/3</div>
          {mock.missions.map((m, i) => (
            <button key={m.title} type="button" onClick={() => toggle(i)} className="flex w-full items-center gap-2.5 rounded-[var(--radius-m)] px-2 py-1.5 text-left hover:bg-surface-subtle">
              <TodoCheckbox size={15} done={done[i]} readOnly />
              <span className={`text-[12.5px] ${done[i] ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span>
            </button>
          ))}
        </div>
      )}
      {which === 'stats' && (
        <div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[['연속', `${mock.streak}일`], ['최장', `${mock.longest}일`], ['총', `${mock.total}일`]].map(([k, v]) => (
              <div key={k} className="rounded-[var(--radius-m)] bg-surface-subtle py-2">
                <div className="text-[10px] text-ink-4">{k}</div>
                <div className="text-[15px] font-semibold tabular-nums text-ink">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {mock.report.map((r) => (
              <div key={r.label} className="flex items-center gap-2 text-[11px]">
                <span className="w-10 text-ink-3">{r.label}</span>
                <span className="h-1.5 flex-1 rounded-full bg-surface-subtle"><span className="block h-full rounded-full bg-primary/70" style={{ width: `${(r.n / 6) * 100}%` }} /></span>
                <span className="w-6 text-right tabular-nums text-ink-3">{r.n}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {which === 'add' && (
        <div>
          <div className="px-1 pb-2 text-[11px] font-medium text-ink-3">저녁 기록</div>
          <FilterChips items={PLACES.slice(1)} value={place} onChange={setPlace} />
          <div className="mt-2.5 rounded-[var(--radius-m)] border border-border bg-surface px-3 py-2 text-[12px] text-ink-5">메뉴 — 예: 두부조림, 현미밥</div>
          <div className="mt-2.5 flex justify-end gap-2">
            <Button variant="text" tone="muted" size="sm" onClick={onClose}>취소</Button>
            <Button variant="grain" tone="primary" size="sm" icon={Camera}>사진과 함께 저장</Button>
          </div>
        </div>
      )}
    </BasicGlass>
  );
}

/* ── 셸 ── */

export function JournalShell() {
  const [device, setDevice] = useState<'pc' | 'mobile'>('pc');
  const [tab, setTab] = useState<Tab>('home');
  const [place, setPlace] = useState('all');
  const [kind, setKind] = useState('');
  const [dock, setDock] = useState<Dock>(null);
  const [done, setDone] = useState(mock.missions.map((m) => m.done));
  const toggle = (i: number) => setDone(done.map((d, j) => (j === i ? !d : d)));
  const mobile = device === 'mobile';
  const go = (t: Tab) => { setTab(t); setDock(null); };

  return (
    <div className="rounded-[var(--radius-l)] p-3 md:p-5" style={{ background: 'var(--desk-bg)' }}>
      <LiquidGlassDefs />
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] text-ink-3">일기장 메인과 같은 셸 — 좌측 패널 · 본문 · 하단 독</span>
        <Segmented
          groups={[{ items: [{ value: 'pc', label: 'PC', icon: Monitor }, { value: 'mobile', label: '모바일', icon: Smartphone }], value: device, onChange: (v) => setDevice(v as 'pc' | 'mobile') }]}
        />
      </div>

      {/* 책상 위 카드 한 장 */}
      <div className={`relative mx-auto flex h-[600px] flex-col overflow-hidden rounded-[var(--radius-l)] border border-border bg-surface shadow-m transition-[max-width] duration-300 ${mobile ? 'max-w-[390px]' : 'max-w-none'}`}>
        {/* Header */}
        <div className={`flex items-center gap-3 border-b border-border py-2.5 ${mobile ? 'px-3' : 'px-5'}`}>
          <span className="text-[15px] font-extrabold tracking-tight text-ink">GIROGI</span>
          <div className="scrollbar-hide min-w-0 overflow-x-auto">
            <NavTabs
              tabs={[
                { label: '오늘', isActive: tab === 'home', onSelect: () => go('home') },
                { label: '체크리스트', isActive: tab === 'check', onSelect: () => go('check') },
                { label: '유혹 극복', isActive: tab === 'sos', onSelect: () => go('sos') },
                { label: '커뮤니티', isActive: tab === 'friends', onSelect: () => go('friends') },
              ]}
            />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="glass" shape="round" size="sm" icon={Moon} aria-label="다크 모드" />
            <button type="button" onClick={() => go('me')} className={`grid size-7 place-items-center rounded-[9px] text-[11px] font-bold ${tab === 'me' ? 'bg-primary text-white' : 'bg-primary-subtle text-primary'}`} aria-label="프로필">다</button>
          </div>
        </div>

        {/* JournalBar — 모바일은 compact 프로필 띠, PC는 통계 칩 + CTA */}
        <div className={`shrink-0 border-b border-border py-2.5 ${mobile ? 'px-3' : 'px-5'}`}>
          <div className="flex items-center gap-3">
            {mobile ? (
              <ProfileBare compact />
            ) : (
              <>
                <span className="text-[12px] text-ink-3">{mock.date}</span>
                <div className="flex items-center gap-1.5">
                  {[`${mock.streak}일 연속`, `${mock.total}일 기록`, `${mock.badges.length} 배지`].map((t) => (
                    <span key={t} className="flex h-[26px] items-center rounded-full border border-border px-2.5 text-[11px] text-ink-3">{t}</span>
                  ))}
                </div>
              </>
            )}
            {tab === 'home' && (
              <div className="ml-auto shrink-0">
                <Button variant="grain" tone="primary" size="md" icon={Plus}>{TAB_CTA[tab]}</Button>
              </div>
            )}
          </div>
          {tab === 'home' && (
            <div className="scrollbar-hide mt-2 flex items-center gap-2 overflow-x-auto">
              <FilterChips items={PLACES} value={place} onChange={setPlace} className="flex-nowrap" />
              {!mobile && (
                <span className="ml-auto flex shrink-0 gap-3 text-[11px] text-ink-4">
                  <span className="flex items-center gap-1"><Camera size={11} /> 사진</span>
                  <span className="flex items-center gap-1"><FolderOpen size={11} /> 기록</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* 스크롤 영역 */}
        <div className={`@container flex-1 overflow-y-auto bg-surface-warm pb-24 ${mobile ? 'px-3 pt-3' : 'px-5 pt-4'}`} onClick={() => dock && setDock(null)}>
          {tab === 'home' ? (
            <div className={`grid gap-6 ${mobile ? 'grid-cols-1' : 'grid-cols-[200px_minmax(0,1fr)] gap-x-9'}`}>
              {!mobile && (
                <aside className="flex flex-col gap-5">
                  <ProfileBare />
                  <MissionDrawer done={done} toggle={toggle} />
                  <KindGrid kind={kind} setKind={setKind} />
                  <MonthCalendar quiet />
                </aside>
              )}
              <HomeBody done={done} toggle={toggle} place={place} />
            </div>
          ) : (
            <div className="[&_.glass]:!bg-surface">
              {tab === 'check' && <PaperChecklist />}
              {tab === 'sos' && <PaperEmergency />}
              {tab === 'friends' && <PaperCommunity />}
              {tab === 'me' && <PaperProfile />}
            </div>
          )}
        </div>

        {/* BottomDock */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <div className="pointer-events-auto relative">
            <DockPopover which={dock} done={done} toggle={toggle} onClose={() => setDock(null)} />
            <LiquidGlass className="rounded-full px-1.5 py-1.5" contentClassName="flex items-center gap-0.5">
              {([
                ['cal', Calendar, '10.7'],
                ['missions', FolderOpen, `미션 ${done.filter(Boolean).length}/3`],
                ['stats', Trophy, '통계'],
              ] as const).map(([k, Icon, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setDock(dock === k ? null : k)}
                  aria-pressed={dock === k}
                  className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] transition-colors ${dock === k ? 'bg-primary-subtle text-primary' : 'text-ink-2 hover:bg-surface/60'}`}
                >
                  <Icon size={13} /> {label}
                </button>
              ))}
              <Button variant="grain" tone="primary" size="sm" icon={Plus} active={dock === 'add'} onClick={() => setDock(dock === 'add' ? null : 'add')}>식사</Button>
            </LiquidGlass>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-ink-4">
        상단 탭 · 프로필 아이콘 · 하단 독(날짜·미션·통계·+식사) · 장소 필터 전부 눌러볼 수 있다. 다른 탭의 내용은 종이 책상 화면을 그대로 카드 안에 넣은 것.
      </p>
    </div>
  );
}
