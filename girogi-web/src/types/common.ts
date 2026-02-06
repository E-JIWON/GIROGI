/**
 * GIROGI 공통 타입 정의
 *
 * Comment, Reaction 등 여러 모델에서 공통으로 사용되는 타입
 */

import { ReactionType } from './enums';

/**
 * 댓글 엔티티
 *
 * 게시글, 식사 기록, 실패 리포트 등에 남길 수 있는 댓글
 */
export interface Comment {
  /** 댓글 고유 식별자 */
  id: string;
  /** 댓글 작성자 ID (User 모델의 ID 참조) */
  authorId: string;
  /** 댓글 내용 */
  content: string;
  /** 댓글 작성 시각 (ISO 8601 문자열) */
  createdAt: string;
}

/**
 * 리액션 엔티티
 *
 * 사용자가 콘텐츠에 남기는 감정 표현
 * 한 사용자는 하나의 콘텐츠에 하나의 리액션만 남길 수 있음
 */
export interface Reaction {
  /** 리액션을 남긴 사용자 ID (User 모델의 ID 참조) */
  userId: string;
  /** 리액션 타입 (heart, fire, muscle, clap, hug, sad) */
  type: ReactionType;
  /** 리액션 생성 시각 (ISO 8601 문자열) */
  createdAt: string;
}

/**
 * 리액션 집계 헬퍼 타입
 *
 * 특정 콘텐츠에 대한 리액션 통계
 */
export interface ReactionCounts {
  /** 리액션 타입별 개수 */
  counts: Record<ReactionType, number>;
  /** 전체 리액션 개수 */
  total: number;
}

/**
 * 리액션 리스트로부터 집계 생성
 *
 * @param reactions - 집계할 리액션 리스트
 * @returns 타입별 개수를 포함한 ReactionCounts 객체
 */
export function createReactionCounts(reactions: Reaction[]): ReactionCounts {
  const counts = {
    [ReactionType.HEART]: 0,
    [ReactionType.FIRE]: 0,
    [ReactionType.MUSCLE]: 0,
    [ReactionType.CLAP]: 0,
    [ReactionType.HUG]: 0,
    [ReactionType.SAD]: 0,
  } as Record<ReactionType, number>;

  for (const reaction of reactions) {
    counts[reaction.type] = (counts[reaction.type] || 0) + 1;
  }

  return {
    counts,
    total: reactions.length,
  };
}

/**
 * 특정 타입의 리액션 개수 반환
 *
 * @param reactionCounts - 리액션 집계 객체
 * @param type - 조회할 리액션 타입
 * @returns 해당 타입의 리액션 개수 (없으면 0)
 */
export function getReactionCount(
  reactionCounts: ReactionCounts,
  type: ReactionType
): number {
  return reactionCounts.counts[type] || 0;
}

/**
 * 가장 많은 리액션 타입 반환
 *
 * @param reactionCounts - 리액션 집계 객체
 * @returns 가장 많이 받은 리액션 타입 (없으면 null)
 */
export function getMostCommonReaction(
  reactionCounts: ReactionCounts
): ReactionType | null {
  const entries = Object.entries(reactionCounts.counts) as [
    ReactionType,
    number
  ][];

  if (entries.length === 0) return null;

  return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}
