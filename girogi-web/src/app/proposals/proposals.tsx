'use client';

/**
 * /proposals — 시안 미리보기.
 * 1. 종이 책상: 다섯 화면(대시보드·체크리스트·유혹 극복·커뮤니티·프로필)
 * 2~5. bongchil-diary에서 가져온 네 가지 몸체 (저널 셸 · 다락방 벽 · 끄적끄적 스트림 · 하루 티켓)
 * 전부 같은 목 데이터(data.ts)를 쓴다. 실제 앱 화면은 건드리지 않는다.
 */

import { useState } from 'react';
import {
  Calendar,
  Camera,
  Cookie,
  Download,
  Flame,
  FolderOpen,
  Footprints,
  Heart,
  Home,
  MessageCircle,
  Moon,
  Pencil,
  Plus,
  RotateCcw,
  Sparkles,
  Sun,
  Sunrise,
  Timer,
  Trophy,
  Users,
  Wind,
  Droplets,
  ClipboardList,
  AlertCircle,
  Ticket as TicketIcon,
} from 'lucide-react';
import {
  BasicGlass,
  Button,
  FilterChips,
  LiquidGlass,
  LiquidGlassDefs,
  NavTabs,
  PageTitle,
  PostItCard,
  Segmented,
  TodoCheckbox,
} from 'bongchil-design-system';
import { mock, type ScreenKey } from './data';

const R = 'rounded-[var(--radius-l)]';
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TONE: Record<string, string> = {
  green: 'var(--color-comment-green-solid)',
  sand: 'var(--color-comment-sand-solid)',
  pink: 'var(--color-comment-pink-solid)',
  sky: 'var(--color-comment-sky-solid)',
};

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-medium tracking-wide text-ink-3">{children}</div>;
}
function Avatar({ name, tone = 'green', size = 28 }: { name: string; tone?: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[var(--radius-s)] text-[11px] font-semibold text-white"
      style={{ width: size, height: size, background: TONE[tone] ?? TONE.green }}
    >
      {name[0]}
    </span>
  );
}
function Desk({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${R} p-5 md:p-7 ${className}`} style={{ background: 'var(--desk-bg)' }}>
      {children}
    </div>
  );
}
function useMissions() {
  const [done, setDone] = useState(mock.missions.map((m) => m.done));
  const toggle = (i: number) => setDone(done.map((d, j) => (j === i ? !d : d)));
  return { done, toggle, n: done.filter(Boolean).length };
}

/* ═══════════════════════ 1 · 종이 책상 — 다섯 화면 ═══════════════════════ */

function PaperDashboard() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const { done, toggle, n } = useMissions();
  return (
    <>
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
        <BasicGlass airy className={`${R} p-5 md:col-span-2`}>
          <div className="flex items-start justify-between">
            <div>
              <Label>연속 기록</Label>
              <div className="mt-1 flex items-baseline gap-1.5 text-ink">
                <span className="text-[40px] font-bold leading-none tabular-nums tracking-tight">{mock.streak}</span>
                <span className="text-[14px] text-ink-3">일째</span>
              </div>
            </div>
            <span className="grid size-9 place-items-center rounded-[var(--radius-m)] bg-primary-light text-primary" aria-hidden>
              <Flame size={18} />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {DAYS.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <span className={`h-8 w-full rounded-[var(--radius-s)] ${mock.week[i] ? 'bg-primary' : 'border-[1.5px] border-dashed border-ink/20 bg-surface/50'}`} />
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

        <BasicGlass airy className={`${R} p-5`}>
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
          <p className="mt-4 rounded-[var(--radius-m)] bg-primary-subtle px-3 py-2 text-[11px] text-primary">외식 2회. 잘 관리하고 있어요.</p>
        </BasicGlass>

        <BasicGlass airy className={`${R} p-5 md:col-span-2`}>
          <div className="flex items-center justify-between">
            <Label>오늘의 핵심 미션</Label>
            <span className="text-[11px] tabular-nums text-ink-3">
              {n}/3 {n >= 2 && <b className="ml-1 text-primary">오늘 성공</b>}
            </span>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {mock.missions.map((m, i) => (
              <li key={m.title} className="flex items-center gap-3 py-2.5">
                <TodoCheckbox done={done[i]} onClick={() => toggle(i)} />
                <div className="min-w-0 flex-1">
                  <div className={`text-[13px] ${done[i] ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</div>
                  <div className="text-[11px] text-ink-4">{m.sub}</div>
                </div>
              </li>
            ))}
          </ul>
        </BasicGlass>

        <BasicGlass airy className={`${R} flex flex-col p-5`}>
          <Label>오늘의 식사</Label>
          <ul className="mt-3 space-y-2">
            {mock.meals.map((m) => (
              <li key={m.label} className="flex items-center justify-between text-[12px]">
                <span className="text-ink-3">{m.label}</span>
                <span className={m.value ? 'text-ink-2' : 'text-ink-5'}>{m.value ?? '아직'}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-[11px] text-ink-3">
            <Cookie size={13} /> 과자박스 {mock.reward.snackBox}
            <span className="mx-1 text-ink-5">·</span>
            <Sparkles size={13} /> 치팅데이 D-{mock.reward.cheatDayIn}
          </div>
          <div className="mt-auto pt-4">
            <Button variant="grain" tone="primary" size="md" icon={Plus}>저녁 기록하기</Button>
          </div>
        </BasicGlass>
      </div>
    </>
  );
}

function PaperChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({ '아침-0': true, '아침-1': true, '점심-0': true });
  const [place, setPlace] = useState('home');
  const total = mock.checklist.reduce((a, s) => a + s.items.length, 0);
  const n = Object.values(done).filter(Boolean).length;
  const ICON = { 아침: Sunrise, 점심: Sun, 저녁: Moon, 밤: Moon } as const;
  return (
    <>
      <PageTitle
        title="체크리스트"
        subtitle={`${mock.date} · ${n}/${total}`}
        action={<Button variant="grain" tone="primary" size="md" icon={Pencil}>항목 편집</Button>}
      />
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {mock.checklist.map((s) => {
          const Icon = ICON[s.slot as keyof typeof ICON];
          return (
            <BasicGlass airy key={s.slot} className={`${R} p-5`}>
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-[var(--radius-s)] bg-primary-light text-primary"><Icon size={14} /></span>
                <div className="text-[13px] font-semibold text-ink">{s.slot}</div>
                <div className="text-[11px] tabular-nums text-ink-4">{s.time}</div>
                <div className="ml-auto">
                  {s.meal ? (
                    <span className="text-[11px] text-ink-3">{s.meal}</span>
                  ) : s.slot !== '밤' ? (
                    <Button variant="dotted" tone="primary" size="sm" icon={Camera}>식사 기록</Button>
                  ) : null}
                </div>
              </div>
              <ul className="mt-3 divide-y divide-border">
                {s.items.map((it, i) => {
                  const k = `${s.slot}-${i}`;
                  return (
                    <li key={k} className="flex items-center gap-3 py-2">
                      <TodoCheckbox done={!!done[k]} onClick={() => setDone({ ...done, [k]: !done[k] })} />
                      <span className={`text-[13px] ${done[k] ? 'text-ink-4 line-through' : 'text-ink'}`}>{it}</span>
                    </li>
                  );
                })}
              </ul>
              {s.slot === '저녁' && (
                <div className="mt-3 border-t border-border pt-3">
                  <Label>어디서 먹었나</Label>
                  <div className="mt-2">
                    <FilterChips
                      items={[
                        { value: 'home', label: '집', icon: Home },
                        { value: 'office', label: '회사' },
                        { value: 'out', label: '외식', text: 'text-comment-sand-solid' },
                        { value: 'delivery', label: '배달', text: 'text-comment-pink-solid' },
                      ]}
                      value={place}
                      onChange={setPlace}
                    />
                  </div>
                </div>
              )}
            </BasicGlass>
          );
        })}
      </div>
    </>
  );
}

function PaperEmergency() {
  const [emotion, setEmotion] = useState('스트레스');
  const [running, setRunning] = useState(false);
  const ICONS = [Wind, Footprints, Droplets];
  return (
    <>
      <PageTitle title="유혹 극복" subtitle="10분만 미루면 대부분 지나간다" />
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <BasicGlass airy className={`${R} p-5`}>
          <Label>지금 기분은</Label>
          <div className="mt-3">
            <FilterChips items={mock.emotions.map((e) => ({ value: e, label: e }))} value={emotion} onChange={setEmotion} />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-ink-2">
            {emotion}일 때는 음식이 답이 아닐 때가 많아요. 아래 중 하나를 먼저 해보세요.
          </p>
        </BasicGlass>

        <BasicGlass airy className={`${R} p-5 md:col-span-2`}>
          <Label>대신 해볼 것</Label>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {mock.alternatives.map((a, i) => {
              const Icon = ICONS[i];
              return (
                <li key={a.title} className="rounded-[var(--radius-m)] bg-surface/60 p-3">
                  <Icon size={16} className="text-primary" />
                  <div className="mt-2 text-[13px] font-medium text-ink">{a.title}</div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-ink-4">{a.sub}</div>
                </li>
              );
            })}
          </ul>
        </BasicGlass>

        <BasicGlass airy className={`${R} flex flex-col items-center p-5 md:col-span-2`}>
          <Label>10분 타이머</Label>
          <div className="relative mt-3 grid size-36 place-items-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-border-strong)" strokeWidth="3" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeDasharray="289" strokeDashoffset={running ? 100 : 289} className="transition-[stroke-dashoffset] duration-700" />
            </svg>
            <div className="text-center">
              <div className="text-[28px] font-bold tabular-nums leading-none text-ink">{running ? '06:32' : '10:00'}</div>
              <div className="mt-1 text-[10px] text-ink-4">{running ? '지나가는 중' : '충동은 파도처럼 온다'}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="grain" tone="primary" size="md" icon={Timer} active={running} onClick={() => setRunning(!running)}>
              {running ? '버티는 중' : '타이머 시작'}
            </Button>
            <Button variant="text" tone="muted" size="md" icon={RotateCcw}>초기화</Button>
          </div>
        </BasicGlass>

        <BasicGlass airy className={`${R} p-5`}>
          <Label>미래의 나</Label>
          <div className="mt-3 grid h-28 place-items-center rounded-[var(--radius-m)] bg-primary-subtle text-primary">
            <Sunrise size={28} />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-[13px] font-medium text-ink">{mock.future.weight}kg</span>
            <span className="text-[11px] tabular-nums text-ink-3">D-{mock.future.dday}</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-4">{mock.future.note}</p>
        </BasicGlass>

        <BasicGlass airy className={`${R} p-5 md:col-span-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <Label>그래도 먹었다면</Label>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-2">
                한 끼는 한 끼일 뿐이에요. "내일부터"가 아니라 다음 끼니부터. 기록해두면 패턴이 보여요.
              </p>
            </div>
            <Button variant="dotted" tone="danger" size="md" icon={AlertCircle}>먹었어요, 기록할게요</Button>
          </div>
        </BasicGlass>
      </div>
    </>
  );
}

function PaperCommunity() {
  const [filter, setFilter] = useState('all');
  return (
    <>
      <PageTitle
        title="커뮤니티"
        subtitle="친구 3명 · 오늘 글 2"
        action={<Button variant="grain" tone="primary" size="md" icon={Pencil}>글쓰기</Button>}
      />
      <div className="mt-3">
        <FilterChips
          items={[
            { value: 'all', label: '전체' },
            { value: 'friends', label: '친구', icon: Users, text: 'text-comment-sky-solid' },
            { value: 'comeback', label: '다시 시작', text: 'text-comment-pink-solid' },
          ]}
          value={filter}
          onChange={setFilter}
        />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="space-y-3 md:col-span-2">
          {mock.posts.map((p) => (
            <BasicGlass airy key={p.who} className={`${R} p-5`}>
              <div className="flex items-center gap-2.5">
                <Avatar name={p.who} tone={p.tone} />
                <div className="text-[13px] font-medium text-ink">{p.who}</div>
                <div className="text-[11px] text-ink-4">{p.when}</div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-2">{p.text}</p>
              <div className="mt-3 flex items-center gap-2">
                <Button variant="grain" size="sm" icon={Heart} count={p.hearts} color="var(--color-comment-pink-solid)">좋아요</Button>
                <Button variant="grain" size="sm" icon={Flame} count={p.fire} color="var(--color-comment-sand-solid)">열정</Button>
                <Button variant="text" tone="muted" size="sm" icon={MessageCircle} count={p.comments}>댓글</Button>
              </div>
            </BasicGlass>
          ))}
        </div>
        <BasicGlass airy className={`${R} h-fit p-5`}>
          <Label>친구</Label>
          <ul className="mt-3 divide-y divide-border">
            {mock.friends.map((f, i) => (
              <li key={f.who} className="flex items-center gap-2.5 py-2.5">
                <Avatar name={f.who} tone={['green', 'sand', 'pink'][i]} size={24} />
                <span className="text-[13px] text-ink">{f.who}</span>
                <span className="ml-auto flex items-center gap-1 text-[11px] tabular-nums text-ink-3">
                  <Flame size={11} className="text-primary" /> {f.streak}일
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Button variant="dotted" size="sm" icon={Plus}>친구 추가</Button>
          </div>
        </BasicGlass>
      </div>
    </>
  );
}

function PaperProfile() {
  const [tab, setTab] = useState('timeline');
  return (
    <>
      <BasicGlass airy className={`${R} p-5`}>
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-[var(--radius-m)] bg-primary-subtle text-[20px] font-bold text-primary" style={{ border: '2px dotted var(--color-primary-muted)' }}>다</span>
          <div className="min-w-0">
            <div className="text-[16px] font-bold text-ink">다이어터</div>
            <div className="text-[12px] text-ink-4">의지력 말고 시스템으로</div>
          </div>
          <div className="ml-auto hidden items-center gap-1.5 sm:flex">
            {[`${mock.total}일 기록`, `${mock.streak}일 연속`, `${mock.badges.length} 배지`].map((t) => (
              <span key={t} className="flex h-[26px] items-center rounded-full border border-border px-2.5 text-[11px] text-ink-3">{t}</span>
            ))}
          </div>
          <Button variant="dotted" size="sm" icon={Pencil}>편집</Button>
        </div>
      </BasicGlass>
      <div className="mt-4">
        <Segmented
          groups={[
            {
              items: [
                { value: 'timeline', label: '식사 타임라인' },
                { value: 'badges', label: '배지' },
                { value: 'coupons', label: '쿠폰' },
              ],
              value: tab,
              onChange: setTab,
            },
          ]}
        />
      </div>
      <div className="mt-3">
        {tab === 'timeline' && (
          <BasicGlass airy className={`${R} p-5`}>
            <Label>오늘</Label>
            <ul className="mt-3">
              {mock.meals.map((m) => (
                <li key={m.label} className="grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b border-border py-2.5 last:border-0">
                  <span className="text-[11px] tabular-nums text-ink-4">{m.time || '—'}</span>
                  <span className={`text-[13px] ${m.value ? 'text-ink' : 'text-ink-5'}`}>{m.label} · {m.value ?? '아직'}</span>
                  {m.value && <Button variant="dotted" size="sm" icon={Camera}>사진</Button>}
                </li>
              ))}
            </ul>
          </BasicGlass>
        )}
        {tab === 'badges' && (
          <BasicGlass airy className={`${R} p-5`}>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {mock.badges.map((b, i) => (
                <div key={b} className="flex flex-col items-center gap-2 text-center">
                  <span className={`grid size-12 place-items-center rounded-full ${i < 4 ? 'bg-primary-light text-primary' : 'border-[1.5px] border-dashed border-ink/20 text-ink-5'}`}>
                    <Trophy size={18} />
                  </span>
                  <span className="text-[11px] text-ink-2">{b}</span>
                </div>
              ))}
            </div>
          </BasicGlass>
        )}
        {tab === 'coupons' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {mock.coupons.map((c) => (
              <BasicGlass airy key={c.title} className={`${R} flex items-center gap-4 p-5`}>
                <span className="grid size-10 place-items-center rounded-[var(--radius-m)] bg-primary-light text-primary"><TicketIcon size={18} /></span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-ink">{c.title} <span className="ml-1 tabular-nums text-ink-3">× {c.left}</span></div>
                  <div className="text-[11px] text-ink-4">{c.sub}</div>
                </div>
                <Button variant="grain" tone="primary" size="sm">사용</Button>
              </BasicGlass>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export function PaperDesk({ screen }: { screen: ScreenKey }) {
  return (
    <Desk>
      {screen === 'dashboard' && <PaperDashboard />}
      {screen === 'checklist' && <PaperChecklist />}
      {screen === 'emergency' && <PaperEmergency />}
      {screen === 'community' && <PaperCommunity />}
      {screen === 'profile' && <PaperProfile />}
    </Desk>
  );
}

/* ═══════════════════════ 2 · 저널 셸 (bongchil-diary app-frame) ═══════════════════════ */

export function JournalShell() {
  const [tab, setTab] = useState('home');
  const [place, setPlace] = useState('all');
  const { done, toggle, n } = useMissions();
  return (
    <Desk className="!p-3 md:!p-5">
      <LiquidGlassDefs />
      {/* 책상 위 카드 한 장 */}
      <div className={`relative flex h-[560px] flex-col overflow-hidden ${R} border border-border bg-surface shadow-m`}>
        {/* Header — 워드마크 + NavTabs */}
        <div className="flex items-center gap-4 border-b border-border px-5 py-3">
          <span className="text-[15px] font-extrabold tracking-tight text-ink">GIROGI</span>
          <NavTabs
            tabs={[
              { label: '오늘', isActive: tab === 'home', onSelect: () => setTab('home') },
              { label: '체크리스트', isActive: tab === 'check', onSelect: () => setTab('check') },
              { label: '유혹 극복', isActive: tab === 'sos', onSelect: () => setTab('sos') },
              { label: '커뮤니티', isActive: tab === 'friends', onSelect: () => setTab('friends') },
            ]}
          />
          <span className="ml-auto grid size-8 place-items-center rounded-[var(--radius-m)] text-ink-3"><Moon size={15} /></span>
        </div>

        {/* JournalBar — 프로필 + 통계 칩 + CTA / 필터 */}
        <div className="shrink-0 border-b border-border px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-primary-subtle text-[13px] font-bold text-primary" style={{ border: '2px dotted var(--color-primary-muted)' }}>다</span>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-medium text-ink">다이어터</div>
              <div className="truncate text-[11px] text-ink-4">의지력 말고 시스템으로</div>
            </div>
            <div className="ml-1 hidden items-center gap-1.5 sm:flex">
              {[`${mock.streak}일 연속`, `${mock.total}일 기록`, `${mock.badges.length} 배지`].map((t) => (
                <span key={t} className="flex h-[26px] items-center rounded-full border border-border px-2.5 text-[11px] text-ink-3">{t}</span>
              ))}
            </div>
            <div className="ml-auto">
              <Button variant="grain" tone="primary" size="md" icon={Plus}>기록</Button>
            </div>
          </div>
          <div className="mt-2.5">
            <FilterChips
              items={[
                { value: 'all', label: '전체' },
                { value: 'home', label: '집밥', text: 'text-comment-green-solid' },
                { value: 'office', label: '회사밥', text: 'text-comment-sky-solid' },
                { value: 'out', label: '외식', text: 'text-comment-sand-solid' },
                { value: 'delivery', label: '배달', text: 'text-comment-pink-solid' },
              ]}
              value={place}
              onChange={setPlace}
            />
          </div>
        </div>

        {/* 스크롤 영역 — 3열 대시보드 (DashCard · HeatmapCard · RecordList) */}
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-20">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[var(--radius-m)] border border-border bg-surface-warm p-4">
              <Label>연속</Label>
              <div className="mt-1 flex items-baseline gap-1 text-ink">
                <span className="text-[32px] font-bold leading-none tabular-nums">{mock.streak}</span>
                <span className="text-[12px] text-ink-3">일</span>
                <Flame size={14} className="ml-1 self-center text-primary" />
              </div>
              <div className="mt-3 flex gap-1">
                {DAYS.map((d, i) => (
                  <span key={d} className={`h-1.5 flex-1 rounded-full ${mock.week[i] ? 'bg-primary' : 'bg-ink-5/50'}`} title={d} />
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-m)] border border-border bg-surface-warm p-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <Label>최근 5주</Label>
                <span className="text-[10px] text-ink-4">성공한 날</span>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {mock.heat.flat().map((on, i) => (
                  <span key={i} className={`h-4 rounded-[3px] ${on ? 'bg-primary/80' : 'bg-ink-5/30'}`} />
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-m)] border border-border bg-surface-warm p-4 md:col-span-3">
              <div className="flex items-center justify-between">
                <Label>오늘의 기록</Label>
                <span className="text-[11px] tabular-nums text-ink-3">미션 {n}/3</span>
              </div>
              <ul className="mt-2 divide-y divide-border">
                {mock.missions.map((m, i) => (
                  <li key={m.title} className="flex items-center gap-3 py-2">
                    <TodoCheckbox size={15} done={done[i]} onClick={() => toggle(i)} />
                    <span className={`text-[12.5px] ${done[i] ? 'text-ink-4 line-through' : 'text-ink'}`}>{m.title}</span>
                    <span className="ml-auto text-[10px] text-ink-4">{m.slot}</span>
                  </li>
                ))}
                {mock.meals.filter((m) => m.value).map((m) => (
                  <li key={m.label} className="flex items-center gap-3 py-2">
                    <span className="grid size-[15px] place-items-center text-ink-4"><Camera size={12} /></span>
                    <span className="text-[12.5px] text-ink-2">{m.label} · {m.value}</span>
                    <span className="ml-auto text-[10px] tabular-nums text-ink-4">{m.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BottomDock — 하단 중앙 독 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <LiquidGlass className="pointer-events-auto rounded-full px-2 py-1.5" contentClassName="flex items-center gap-1">
            {[
              { icon: Calendar, label: '10.7' },
              { icon: FolderOpen, label: '미션' },
              { icon: Trophy, label: '통계' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] text-ink-2">
                <Icon size={13} /> {label}
              </span>
            ))}
            <Button variant="grain" tone="primary" size="sm" icon={Plus}>식사</Button>
          </LiquidGlass>
        </div>
      </div>
    </Desk>
  );
}

/* ═══════════════════════ 3 · 다락방 벽 (records-canvas) ═══════════════════════ */

const WALL_ITEMS: { kind: 'photo' | 'note'; x: number; y: number; r: number; text: string; sub?: string; color?: string }[] = [
  { kind: 'photo', x: 4, y: 8, r: -4, text: '아침 · 계란국', sub: '10.7' },
  { kind: 'note', x: 30, y: 6, r: 2, text: '저녁 8시 전 식사 완료', color: 'yellow' },
  { kind: 'photo', x: 54, y: 12, r: 3, text: '점심 · 비빔밥', sub: '10.7' },
  { kind: 'note', x: 78, y: 4, r: -2, text: '🔥 7일 연속', color: 'blue' },
  { kind: 'photo', x: 14, y: 52, r: 2, text: '저녁 · 두부조림', sub: '10.6' },
  { kind: 'note', x: 42, y: 56, r: -3, text: '편의점 앞 10분 버팀', color: 'green' },
  { kind: 'photo', x: 68, y: 50, r: -2, text: '점심 · 샐러드', sub: '10.6' },
];

export function AtticWall() {
  return (
    <Desk className="!p-3 md:!p-5">
      <div
        className={`relative h-[520px] overflow-hidden ${R} border border-border bg-surface-warm`}
        style={{ backgroundImage: 'radial-gradient(rgb(var(--shadow-ink)/0.12) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      >
        <div className="absolute left-4 top-3 flex items-center gap-2 text-[11px] text-ink-3">
          <span className="font-semibold text-ink">10월의 벽</span>
          <span className="text-ink-4">사진 {WALL_ITEMS.filter((i) => i.kind === 'photo').length} · 메모 {WALL_ITEMS.filter((i) => i.kind === 'note').length}</span>
        </div>
        {WALL_ITEMS.map((it, i) =>
          it.kind === 'photo' ? (
            <div
              key={i}
              className="absolute w-[132px] rounded-[3px] bg-white p-1.5 pb-6 shadow-m"
              style={{ left: `${it.x}%`, top: `${it.y}%`, rotate: `${it.r}deg` }}
            >
              <div className="deco-tape" aria-hidden><div className="deco-tape-shine" /></div>
              <div className="img-vintage grid aspect-[4/3] place-items-center rounded-[2px] bg-primary-subtle text-primary"><Camera size={18} /></div>
              <div className="mt-2 text-center text-[10.5px] text-ink-2">{it.text} <span className="text-ink-4">{it.sub}</span></div>
            </div>
          ) : (
            <div key={i} className="absolute" style={{ left: `${it.x}%`, top: `${it.y}%`, rotate: `${it.r}deg` }}>
              <PostItCard from="기로기" color={it.color ?? 'yellow'} tape width={140} caption={it.text} />
            </div>
          ),
        )}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button variant="grain" size="sm" icon={Camera}>사진</Button>
          <Button variant="grain" tone="primary" size="sm" icon={Plus}>포스트잇</Button>
        </div>
      </div>
    </Desk>
  );
}

/* ═══════════════════════ 4 · 끄적끄적 스트림 (scribbles) ═══════════════════════ */

export function ScribbleStream() {
  const [kind, setKind] = useState('미션');
  const [filter, setFilter] = useState('all');
  const [rows, setRows] = useState(mock.scribbles);
  const KIND_COLOR: Record<string, string> = { 미션: 'var(--color-primary)', 식사: 'var(--color-comment-sand-solid)', 유혹: 'var(--color-comment-pink-solid)' };
  const shown = rows.filter((r) => filter === 'all' || r.kind === filter);
  return (
    <Desk>
      <PageTitle title="오늘" subtitle={mock.date} />
      {/* Composer */}
      <BasicGlass className={`mt-4 ${R} p-3`}>
        <div className="flex items-center gap-2">
          <Segmented
            groups={[{ items: [{ value: '미션', label: '미션' }, { value: '식사', label: '식사' }, { value: '유혹', label: '유혹' }], value: kind, onChange: setKind }]}
          />
          <span className="flex-1 truncate text-[12.5px] text-ink-4">
            {kind === '미션' ? '오늘 지킬 한 가지…' : kind === '식사' ? '뭐 먹었나 — 장소 · 메뉴' : '지금 뭐가 당기나, 어디서'}
          </span>
          <Button variant="grain" tone="primary" size="sm" icon={Plus}>적기</Button>
        </div>
      </BasicGlass>
      <div className="mt-3">
        <FilterChips
          items={[
            { value: 'all', label: '전체', count: rows.length },
            { value: '미션', label: '미션', text: 'text-primary', count: rows.filter((r) => r.kind === '미션').length },
            { value: '식사', label: '식사', text: 'text-comment-sand-solid', count: rows.filter((r) => r.kind === '식사').length },
            { value: '유혹', label: '유혹', text: 'text-comment-pink-solid', count: rows.filter((r) => r.kind === '유혹').length },
          ]}
          value={filter}
          onChange={setFilter}
        />
      </div>
      {/* Stream */}
      <div className="mt-4">
        <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-ink-4">오늘 · 화</div>
        <ul className="divide-y divide-border border-y border-border">
          {shown.map((r, i) => (
            <li key={i} className="flex items-center gap-3 py-2.5">
              {r.kind === '미션' ? (
                <TodoCheckbox size={15} done={r.done} onClick={() => setRows(rows.map((x) => (x === r ? { ...x, done: !x.done } : x)))} />
              ) : (
                <span className="size-[15px] rounded-[4px]" style={{ background: KIND_COLOR[r.kind] }} />
              )}
              <span className={`text-[13px] ${r.kind === '미션' && r.done ? 'text-ink-4 line-through' : 'text-ink'}`}>{r.text}</span>
              <span className="ml-auto flex items-center gap-2 text-[10px] text-ink-4">
                <span style={{ color: KIND_COLOR[r.kind] }}>{r.kind}</span>
                <span className="tabular-nums">{r.time}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mb-1 mt-5 text-[10px] uppercase tracking-[0.18em] text-ink-4">어제 · 월</div>
        <ul className="divide-y divide-border border-y border-border opacity-70">
          {['저녁 — 집밥 · 두부조림', '점심 30회 이상 씹기', '아침 — 집밥 · 요거트'].map((t, i) => (
            <li key={t} className="flex items-center gap-3 py-2.5">
              {i === 1 ? <TodoCheckbox size={15} done readOnly /> : <span className="size-[15px] rounded-[4px]" style={{ background: KIND_COLOR['식사'] }} />}
              <span className={`text-[13px] ${i === 1 ? 'text-ink-4 line-through' : 'text-ink-2'}`}>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </Desk>
  );
}

/* ═══════════════════════ 5 · 하루 티켓 (archive-ticket) ═══════════════════════ */

function Mono({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[9px] tracking-[0.24em] text-ink-5 ${className}`}>{children}</span>;
}

export function DayTicket() {
  const [flipped, setFlipped] = useState(false);
  const face = 'absolute inset-0 flex flex-col rounded-[10px] border border-border bg-surface p-4 shadow-m [backface-visibility:hidden]';
  return (
    <Desk>
      <div className="grid gap-6 md:grid-cols-[260px_1fr] md:items-start">
        {/* 티켓 — 클릭하면 뒤집힌다 */}
        <button type="button" onClick={() => setFlipped(!flipped)} className="relative mx-auto h-[400px] w-[250px] text-left [perspective:1200px]" aria-pressed={flipped}>
          <span className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]" style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}>
            {/* 앞면 — 포스터 */}
            <span className={face}>
              <Mono className="text-center">GIROGI · DAY TICKET</Mono>
              <span className="relative mt-2 flex flex-1 flex-col items-center justify-end overflow-hidden rounded-[6px] bg-primary p-3 text-center text-white">
                <span className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_10%,rgba(255,255,255,0.25),transparent_60%)]" />
                <span className="relative font-mono text-[8.5px] uppercase tracking-[0.3em] text-white/75">October 7, 2026</span>
                <span className="relative mt-1 text-[44px] font-extrabold leading-none tracking-tight">DAY {mock.day}</span>
                <span className="relative mt-1.5 font-mono text-[8.5px] tracking-[0.2em] text-white/75">STREAK {mock.streak} · SUCCESS</span>
              </span>
              <span className="mt-3 grid grid-cols-3 gap-2">
                {[['미션', '2/3'], ['식사', '3'], ['외식', '0']].map(([k, v]) => (
                  <span key={k} className="flex flex-col"><Mono>{k}</Mono><span className="mt-0.5 text-[13px] font-semibold tabular-nums text-ink">{v}</span></span>
                ))}
              </span>
              <span className="mt-auto border-t border-ink/10 pt-2.5">
                <span className="block h-6 bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_1px,transparent_1px_3px,var(--color-ink)_3px_5px,transparent_5px_7px)] opacity-80" />
                <Mono className="mt-1 block text-center">GRG-20261007-0031</Mono>
              </span>
            </span>
            {/* 뒷면 — 상세 */}
            <span className={`${face} [transform:rotateY(180deg)]`}>
              <Mono>DETAILS</Mono>
              <span className="mt-3 space-y-2">
                {mock.missions.map((m) => (
                  <span key={m.title} className="flex items-center gap-2 text-[12px]"><TodoCheckbox size={13} done={m.done} readOnly /><span className={m.done ? 'text-ink-2' : 'text-ink-4'}>{m.title}</span></span>
                ))}
              </span>
              <span className="mt-4 border-t border-ink/10 pt-3 space-y-1.5">
                {mock.meals.map((m) => (
                  <span key={m.label} className="flex justify-between text-[12px]"><span className="text-ink-3">{m.label}</span><span className={m.value ? 'text-ink' : 'text-ink-5'}>{m.value ?? '—'}</span></span>
                ))}
              </span>
              <span className="mt-4 border-t border-ink/10 pt-3">
                <span className="flex justify-between text-[10px] text-ink-4"><span>치팅데이까지</span><span className="font-mono">D-{mock.reward.cheatDayIn}</span></span>
                <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-ink/10"><span className="block h-full rounded-full bg-secondary" style={{ width: '57%' }} /></span>
              </span>
              <Mono className="mt-auto block text-center">TAP TO FLIP BACK</Mono>
            </span>
          </span>
        </button>

        {/* 티켓북 + 액션 */}
        <div>
          <PageTitle title="티켓북" subtitle="성공한 날마다 한 장" />
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {DAYS.map((d, i) => (
              <div key={d} className={`flex aspect-[5/7] flex-col items-center justify-between rounded-[6px] border p-1.5 ${mock.week[i] ? 'border-primary/40 bg-primary-light' : 'border-dashed border-ink/15 bg-surface/40'}`}>
                <Mono>{d}</Mono>
                {mock.week[i] ? <TicketIcon size={14} className="text-primary" /> : <span className="text-[10px] text-ink-5">—</span>}
                <Mono>{mock.week[i] ? 'OK' : ''}</Mono>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-ink-3">
            티켓을 누르면 뒤집혀 상세가 보인다. 이미지로 저장하면 지금 보이는 면이 그대로 PNG로 떨어진다. 커뮤니티에 붙이는 공유물이 따로 필요 없다.
          </p>
          <div className="mt-4 flex gap-2">
            <Button variant="grain" tone="primary" size="md" icon={Download}>이미지로 저장</Button>
            <Button variant="dotted" size="md" icon={ClipboardList}>오늘 체크리스트</Button>
          </div>
        </div>
      </div>
    </Desk>
  );
}
