/**
 * 친구 목록 페이지
 *
 * 전체 친구 목록 표시
 * 빠른 Streak 비교
 * 친구 추가 버튼
 */

'use client';

import { useState } from 'react';
import { FriendListCard } from '@/components/friend/friend-list-card';
import { mockUsers } from '@/lib/mock';
import { useStreakStore } from '@/stores/streakStore';
import { Users, UserPlus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type SortType = 'streak' | 'name';

export default function FriendsPage() {
  const myStreak = useStreakStore((state) => state.streakData.currentStreak);
  const [sortBy, setSortBy] = useState<SortType>('streak');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock: 친구 목록 (실제로는 API에서 가져와야 함)
  const friends = mockUsers.slice(1, 6).filter(Boolean); // 본인 제외, undefined 제거

  // Mock: 친구들의 Streak (실제로는 API에서 가져와야 함)
  const friendStreaks = new Map([
    [friends[0]?.id, 15],
    [friends[1]?.id, 8],
    [friends[2]?.id, 22],
    [friends[3]?.id, 5],
    [friends[4]?.id, 12],
  ]);

  // 검색 필터링
  const filteredFriends = friends.filter((friend) =>
    friend?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 정렬
  const sortedFriends = [...filteredFriends].sort((a, b) => {
    if (sortBy === 'streak') {
      const aStreak = friendStreaks.get(a.id) || 0;
      const bStreak = friendStreaks.get(b.id) || 0;
      return bStreak - aStreak; // 내림차순
    } else {
      return a.username.localeCompare(b.username);
    }
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl bg-white min-h-screen">
        {/* 헤더 */}
        <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white px-4 py-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary-600" />
              <h1 className="text-xl font-bold text-neutral-800">친구 목록</h1>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-600 active:scale-95"
            >
              <UserPlus className="h-4 w-4" />
              친구 추가
            </button>
          </div>

          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="친구 이름 검색..."
              className="w-full rounded-xl border-2 border-neutral-200 py-2 pl-10 pr-4 text-sm transition-colors focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <main className="mx-auto max-w-2xl px-4 py-6">
          {/* 통계 */}
          <div className="mb-6 rounded-xl border border-neutral-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
            <div className="mb-2 text-center">
              <h3 className="text-lg font-semibold text-neutral-700">나의 현재 Streak</h3>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">{myStreak}일</p>
              <p className="mt-1 text-sm text-neutral-600">
                친구 {friends.length}명과 함께 도전 중!
              </p>
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() => setSortBy('streak')}
              className={cn(
                'rounded-full border-2 px-4 py-2 text-sm font-medium transition-all',
                sortBy === 'streak'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              )}
            >
              Streak 순
            </button>
            <button
              type="button"
              onClick={() => setSortBy('name')}
              className={cn(
                'rounded-full border-2 px-4 py-2 text-sm font-medium transition-all',
                sortBy === 'name'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              )}
            >
              이름 순
            </button>
          </div>

          {/* 친구 리스트 */}
          <div className="space-y-3">
            {sortedFriends.map((friend) => (
              <FriendListCard
                key={friend.id}
                friend={friend}
                friendStreak={friendStreaks.get(friend.id) || 0}
                myStreak={myStreak}
              />
            ))}
          </div>

          {/* 빈 상태 */}
          {sortedFriends.length === 0 && (
            <div className="py-12 text-center text-neutral-500">
              <p className="mb-2">검색 결과가 없습니다.</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-sm text-primary-600 hover:underline"
              >
                전체 보기
              </button>
            </div>
          )}

          {/* 격려 문구 */}
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <p className="text-sm text-blue-700">
              💪 친구와 함께하면 목표 달성률이 65% 증가해요!
            </p>
            <p className="mt-1 text-xs text-blue-600">
              (출처: Journal of Consulting and Clinical Psychology, 2011)
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
