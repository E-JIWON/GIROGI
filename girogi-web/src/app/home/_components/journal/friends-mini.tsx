/** @desc 오른쪽 열 — 친구 연속 기록 */

import Link from 'next/link';
import { Flame } from 'lucide-react';

const FRIENDS = [{ n: '운동왕', d: 21, c: 'var(--color-comment-green-solid)' }, { n: '건강한밥', d: 9, c: 'var(--color-comment-sand-solid)' }, { n: '다시시작', d: 1, c: 'var(--color-comment-pink-solid)' }];

export function FriendsMini() {
  return (
    <div>
      <header className="mb-2 flex items-baseline gap-2 px-1"><h2 className="text-[13px] font-semibold tracking-tight text-ink-2">친구</h2><Link href="/friends" className="ml-auto text-[11px] text-ink-4 hover:text-primary">전체</Link></header>
      <ul className="space-y-1.5 px-1">
        {FRIENDS.map((f) => (
          <li key={f.n} className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-[7px] text-[10.5px] font-semibold text-white" style={{ background: f.c }}>{f.n[0]}</span>
            <span className="text-[12px] text-ink-2">{f.n}</span>
            <span className="ml-auto flex items-center gap-1 text-[11px] tabular-nums text-ink-4"><Flame size={11} className="text-primary" />{f.d}일</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
