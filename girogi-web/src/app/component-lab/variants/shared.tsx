'use client';

/** /component-lab 시안이 공유하는 목 데이터 · 타입 · 작은 조각 */

import { useState } from 'react';
import { Apple, Moon, Utensils } from 'lucide-react';
import type { MissionItem } from '../../home/_components/journal/mission-drawer';
import { getMockRecentDailyRecords } from '@/lib/mock/dailyRecords';

export type Variant = {
  key: string;
  name: string;
  /** 왜 이 방향인가 — 한 줄 */
  why: string;
  recommended?: boolean;
  Render: () => React.ReactElement;
};

export type LabEntry = { key: string; name: string; desc: string; variants: Variant[] };

export const MEALS = getMockRecentDailyRecords(1)[0]?.meals ?? [];
export const MISSIONS: MissionItem[] = [
  { id: 'm1', title: '아침 식사 집에서 먹기', description: '외식/배달 대신 집에서 직접 조리', isCompleted: true, icon: Apple },
  { id: 'm2', title: '점심 30회 이상 씹기', description: '천천히 먹어서 포만감 높이기', isCompleted: false, icon: Utensils },
  { id: 'm3', title: '저녁 8시 전 식사 완료', description: '야식 방지 및 소화 시간 확보', isCompleted: false, icon: Moon },
];
export const GRASS = Array.from({ length: 28 }, (_, i) => [1, 2, 3, 5, 6, 9, 10, 12, 16, 17, 18, 19, 20, 24, 25, 26, 27].includes(i));
export const WEEK = [true, true, true, false, false, false, false];
export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
export const STREAK = 7;

export function useMissionState() {
  const [missions, setMissions] = useState(MISSIONS);
  const toggle = (id: string) => setMissions((p) => p.map((m) => (m.id === id ? { ...m, isCompleted: !m.isCompleted } : m)));
  return { missions, toggle, done: missions.filter((m) => m.isCompleted).length };
}

export function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[10.5px] text-ink-4">{children}</span>;
}

export const WEIGHT = { current: 72.4, yesterday: 72.7, start: 78, target: 68, monthStart: 73.5, monthTarget: 72 };
