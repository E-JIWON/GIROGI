/**
 * ProfileHeader 컴포넌트
 *
 * 프로필 헤더 (사용자 정보, 통계, 버튼)
 * - 프로필 이미지 (CircleAvatar 80px)
 * - 게시글/팔로워/팔로잉 통계 3열
 * - 닉네임, 바이오
 * - 본인: "프로필 편집" 버튼
 * - 타인: "팔로우" 버튼
 *
 * Flutter: lib/presentation/widgets/profile/profile_header.dart
 */

import { Edit, UserPlus, UserMinus } from 'lucide-react';
import type { User } from '@/types';

interface ProfileHeaderProps {
  /**
   * 사용자 데이터
   */
  user: User;
  /**
   * 본인 프로필 여부
   */
  isOwnProfile: boolean;
  /**
   * 팔로우 여부
   */
  isFollowing?: boolean;
  /**
   * 팔로우 버튼 탭 콜백
   */
  onFollowTap?: () => void;
  /**
   * 프로필 편집 버튼 탭 콜백
   */
  onEditProfileTap?: () => void;
}

export function ProfileHeader({
  user,
  isOwnProfile,
  isFollowing = false,
  onFollowTap,
  onEditProfileTap,
}: ProfileHeaderProps) {
  return (
    <div className="border-b border-grey-200 bg-white p-6">
      <div className="mb-4 flex items-start">
        {/* 프로필 이미지 */}
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.nickname}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-white">
              {user.nickname[0].toUpperCase()}
            </span>
          )}
        </div>

        {/* 통계 (팔로워, 팔로잉) */}
        <div className="ml-4 flex flex-1 justify-around">
          <StatItem label="팔로워" value={user.followers.length.toString()} />
          <StatItem label="팔로잉" value={user.following.length.toString()} />
        </div>
      </div>

      {/* 닉네임 및 바이오 */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-neutral-900">{user.nickname}</h2>
        {user.bio && <p className="mt-2 text-base text-neutral-700">{user.bio}</p>}
      </div>

      {/* 버튼 (팔로우 또는 프로필 편집) */}
      {isOwnProfile ? (
        <button
          onClick={onEditProfileTap}
          className="flex w-full items-center justify-center gap-2 rounded-[16px] border-2 border-grey-300 px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50"
        >
          <Edit className="h-4 w-4" />
          프로필 편집
        </button>
      ) : (
        <button
          onClick={onFollowTap}
          className={`flex w-full items-center justify-center gap-2 rounded-[16px] px-4 py-3 text-sm font-semibold text-white transition-all ${
            isFollowing
              ? 'bg-neutral-600 hover:bg-neutral-700'
              : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {isFollowing ? (
            <>
              <UserMinus className="h-4 w-4" />
              팔로잉
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              팔로우
            </>
          )}
        </button>
      )}
    </div>
  );
}

/**
 * 통계 항목 컴포넌트
 */
function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-bold text-neutral-900">{value}</div>
      <div className="text-xs text-neutral-600">{label}</div>
    </div>
  );
}
