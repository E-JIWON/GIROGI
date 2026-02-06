/**
 * GIROGI 커뮤니티 Mock 데이터
 *
 * Flutter의 MockPostRepository를 TypeScript로 변환
 * 다양한 타입의 게시글 샘플 데이터 제공
 */

import type {
  Post,
  Comment,
  Reaction,
  FailureReport,
  SharedRecord,
} from '@/types';
import { PostType, ReactionType, SharedRecordType } from '@/types';

/**
 * Mock 댓글 생성
 */
export const mockComments: Comment[] = [
  {
    id: 'comment_1',
    authorId: 'user_2',
    content: '대단해요! 저도 힘내야겠어요!',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45분 전
  },
  {
    id: 'comment_2',
    authorId: 'user_3',
    content: '괜찮아요. 다시 시작하면 돼요!',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
  },
  {
    id: 'comment_3',
    authorId: 'user_1',
    content: '같이 힘내봐요! 💪',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15분 전
  },
];

/**
 * Mock 리액션 생성
 */
export const mockReactions: Reaction[] = [
  {
    userId: 'user_2',
    type: ReactionType.FIRE,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1시간 전
  },
  {
    userId: 'user_3',
    type: ReactionType.CLAP,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
  },
  {
    userId: 'user_1',
    type: ReactionType.HEART,
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20분 전
  },
];

/**
 * Mock 실패 리포트
 */
export const mockFailureReport: FailureReport = {
  id: 'report_1',
  userId: 'user_3',
  failedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1일 전
  lostStreak: 7,
  lostCheatDayProgress: 5,
  weekSuccessRate: 0.71,
  memo: '회식이 있었는데 참지 못하고 폭식했어요...',
  imageUrl: null,
  isPublic: true,
  reactions: [
    {
      userId: 'user_1',
      type: ReactionType.HUG,
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    },
    {
      userId: 'user_2',
      type: ReactionType.HUG,
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    },
  ],
  comments: [mockComments[1]], // "괜찮아요. 다시 시작하면 돼요!"
  createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12시간 전
};

/**
 * Mock 공유 기록
 */
export const mockSharedRecord: SharedRecord = {
  type: SharedRecordType.MEAL,
  recordDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
  data: {
    menu: '샐러드, 닭가슴살',
    place: 'home',
    achievements: ['천천히 먹기', '30회 씹기'],
  },
};

/**
 * Mock 게시글 1 - 텍스트 (경험 공유)
 */
export const mockPost1: Post = {
  id: 'post_1',
  authorId: 'user_1',
  type: PostType.TEXT,
  content: '오늘 드디어 5일 연속 성공! 🎉',
  imageUrl: null,
  youtubeUrl: null,
  failureReport: null,
  sharedRecord: null,
  reactions: [mockReactions[0], mockReactions[1]], // FIRE, CLAP
  comments: [mockComments[0]], // "대단해요! 저도 힘내야겠어요!"
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
};

/**
 * Mock 게시글 2 - 이미지 (식사 기록)
 */
export const mockPost2: Post = {
  id: 'post_2',
  authorId: 'user_2',
  type: PostType.IMAGE,
  content: '오늘의 건강한 저녁 식사',
  imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', // 샐러드 이미지
  youtubeUrl: null,
  failureReport: null,
  sharedRecord: null,
  reactions: [mockReactions[2]], // HEART
  comments: [],
  createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
};

/**
 * Mock 게시글 3 - 유튜브 (동기부여)
 */
export const mockPost3: Post = {
  id: 'post_3',
  authorId: 'user_1',
  type: PostType.YOUTUBE,
  content: '이 영상 보면 운동 욕구 뿜뿜',
  imageUrl: null,
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // 예시 URL
  failureReport: null,
  sharedRecord: null,
  reactions: [mockReactions[0], mockReactions[1], mockReactions[2]],
  comments: [mockComments[2]], // "같이 힘내봐요! 💪"
  createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8시간 전
};

/**
 * Mock 게시글 4 - 실패 리포트
 */
export const mockPost4: Post = {
  id: 'post_4',
  authorId: 'user_3',
  type: PostType.FAILURE_REPORT,
  content: null,
  imageUrl: null,
  youtubeUrl: null,
  failureReport: mockFailureReport,
  sharedRecord: null,
  reactions: mockFailureReport.reactions,
  comments: mockFailureReport.comments,
  createdAt: mockFailureReport.createdAt,
};

/**
 * Mock 게시글 5 - 공유 기록
 */
export const mockPost5: Post = {
  id: 'post_5',
  authorId: 'user_2',
  type: PostType.SHARED_RECORD,
  content: '오늘도 집밥 성공!',
  imageUrl: null,
  youtubeUrl: null,
  failureReport: null,
  sharedRecord: mockSharedRecord,
  reactions: [],
  comments: [],
  createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3시간 전
};

/**
 * Mock 게시글 6 - 동기부여 (텍스트)
 */
export const mockPost6: Post = {
  id: 'post_6',
  authorId: 'user_current',
  type: PostType.TEXT,
  content:
    '다이어트는 단거리 달리기가 아니라 마라톤이에요. 천천히 꾸준히 가는 것이 중요합니다! 💪',
  imageUrl: null,
  youtubeUrl: null,
  failureReport: null,
  sharedRecord: null,
  reactions: [
    {
      userId: 'user_1',
      type: ReactionType.MUSCLE,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      userId: 'user_2',
      type: ReactionType.HEART,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ],
  comments: [
    {
      id: 'comment_4',
      authorId: 'user_1',
      content: '맞아요! 급하게 하면 요요가 와요',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ],
  createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6시간 전
};

/**
 * 모든 Mock 게시글 배열 (최신순)
 */
export const mockPosts: Post[] = [
  mockPost1, // 2시간 전
  mockPost5, // 3시간 전
  mockPost2, // 5시간 전
  mockPost6, // 6시간 전
  mockPost3, // 8시간 전
  mockPost4, // 12시간 전
];

/**
 * 게시글 ID로 Map 변환 (빠른 조회용)
 */
export const mockPostsMap = new Map<string, Post>(
  mockPosts.map((post) => [post.id, post])
);

/**
 * 게시글 ID로 조회
 */
export function getMockPostById(postId: string): Post | undefined {
  return mockPostsMap.get(postId);
}

/**
 * 사용자 ID로 게시글 필터링
 */
export function getMockPostsByUser(
  userId: string,
  limit: number = 20
): Post[] {
  const userPosts = mockPosts.filter((post) => post.authorId === userId);

  if (userPosts.length > limit) {
    return userPosts.slice(0, limit);
  }

  return userPosts;
}

/**
 * 유튜브 게시글만 필터링
 */
export function getMockYoutubePosts(limit: number = 20): Post[] {
  const youtubePosts = mockPosts.filter(
    (post) => post.type === PostType.YOUTUBE
  );

  if (youtubePosts.length > limit) {
    return youtubePosts.slice(0, limit);
  }

  return youtubePosts;
}

/**
 * 팔로잉 사용자의 게시글만 필터링
 */
export function getMockFollowingPosts(
  followingIds: string[],
  limit: number = 20
): Post[] {
  const followingPosts = mockPosts.filter((post) =>
    followingIds.includes(post.authorId)
  );

  if (followingPosts.length > limit) {
    return followingPosts.slice(0, limit);
  }

  return followingPosts;
}

/**
 * 전체 피드 조회 (페이지네이션)
 */
export function getMockFeed(limit: number = 20, lastPostId?: string): Post[] {
  let startIndex = 0;

  if (lastPostId) {
    const lastPostIndex = mockPosts.findIndex((post) => post.id === lastPostId);
    if (lastPostIndex !== -1) {
      startIndex = lastPostIndex + 1;
    }
  }

  const feed = mockPosts.slice(startIndex, startIndex + limit);
  return feed;
}

/**
 * 게시글에 리액션 추가 (또는 변경)
 */
export function addMockReaction(
  postId: string,
  userId: string,
  reactionType: ReactionType
): Post | null {
  const post = getMockPostById(postId);
  if (!post) return null;

  // 기존 리액션 제거 (한 사용자당 하나만)
  const reactions = post.reactions.filter((r) => r.userId !== userId);

  // 새 리액션 추가
  reactions.push({
    userId,
    type: reactionType,
    createdAt: new Date().toISOString(),
  });

  const updatedPost: Post = {
    ...post,
    reactions,
  };

  // Map 업데이트
  mockPostsMap.set(postId, updatedPost);

  return updatedPost;
}

/**
 * 게시글 리액션 제거
 */
export function removeMockReaction(postId: string, userId: string): Post | null {
  const post = getMockPostById(postId);
  if (!post) return null;

  const reactions = post.reactions.filter((r) => r.userId !== userId);

  const updatedPost: Post = {
    ...post,
    reactions,
  };

  mockPostsMap.set(postId, updatedPost);

  return updatedPost;
}

/**
 * 게시글에 댓글 추가
 */
export function addMockComment(
  postId: string,
  authorId: string,
  content: string
): Post | null {
  const post = getMockPostById(postId);
  if (!post) return null;

  const newComment: Comment = {
    id: `comment_${Date.now()}`,
    authorId,
    content,
    createdAt: new Date().toISOString(),
  };

  const updatedPost: Post = {
    ...post,
    comments: [...post.comments, newComment],
  };

  mockPostsMap.set(postId, updatedPost);

  return updatedPost;
}

/**
 * 댓글 삭제
 */
export function deleteMockComment(
  postId: string,
  commentId: string
): Post | null {
  const post = getMockPostById(postId);
  if (!post) return null;

  const comments = post.comments.filter((c) => c.id !== commentId);

  const updatedPost: Post = {
    ...post,
    comments,
  };

  mockPostsMap.set(postId, updatedPost);

  return updatedPost;
}
