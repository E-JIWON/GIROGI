/**
 * GIROGI Zod 스키마 정의
 *
 * 런타임 타입 검증 및 API 응답 파싱
 * Zod를 사용하여 TypeScript 타입과 런타임 검증을 동시에 제공
 */

import { z } from 'zod';
import {
  MealTime,
  MealPlace,
  ExerciseType,
  PostType,
  SharedRecordType,
  ReactionType,
  TimeSlot,
} from './enums';

/**
 * Enum 스키마
 */
export const mealTimeSchema = z.nativeEnum(MealTime);
export const mealPlaceSchema = z.nativeEnum(MealPlace);
export const exerciseTypeSchema = z.nativeEnum(ExerciseType);
export const postTypeSchema = z.nativeEnum(PostType);
export const sharedRecordTypeSchema = z.nativeEnum(SharedRecordType);
export const reactionTypeSchema = z.nativeEnum(ReactionType);
export const timeSlotSchema = z.nativeEnum(TimeSlot);

/**
 * 공통 스키마
 */

/** 댓글 스키마 */
export const commentSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  content: z.string().min(1, '댓글 내용을 입력하세요'),
  createdAt: z.string().datetime(),
});

/** 리액션 스키마 */
export const reactionSchema = z.object({
  userId: z.string(),
  type: reactionTypeSchema,
  createdAt: z.string().datetime(),
});

/** 리액션 집계 스키마 */
export const reactionCountsSchema = z.object({
  counts: z.record(reactionTypeSchema, z.number().int().min(0)),
  total: z.number().int().min(0),
});

/**
 * 사용자 관련 스키마
 */

/** 사용자 스키마 */
export const userSchema = z.object({
  id: z.string(),
  nickname: z
    .string()
    .min(3, '닉네임은 최소 3자 이상이어야 합니다')
    .max(20, '닉네임은 최대 20자까지 가능합니다')
    .regex(
      /^[a-zA-Z0-9가-힣_]+$/,
      '닉네임은 영문, 숫자, 한글, 언더스코어만 사용 가능합니다'
    ),
  profileImage: z.string().url().nullable().optional(),
  bio: z.string().max(100, '소개는 최대 100자까지 가능합니다').nullable().optional(),
  currentStreak: z.number().int().min(0).default(0),
  totalSuccessDays: z.number().int().min(0).default(0),
  totalTemptationResisted: z.number().int().min(0).default(0),
  snackBoxCount: z.number().int().min(0).default(0),
  followers: z.array(z.string()).default([]),
  following: z.array(z.string()).default([]),
  createdAt: z.string().datetime(),
});

/** 사용자 목표 스키마 */
export const userGoalsSchema = z.object({
  futureVisions: z.array(z.string()).default([]),
});

/** 체중 기록 스키마 */
export const weightRecordSchema = z.object({
  id: z.string(),
  date: z.string().datetime(),
  weight: z.number().positive('체중은 0보다 커야 합니다'),
});

/** 사용자 통계 스키마 */
export const userStatsSchema = z.object({
  userId: z.string(),
  currentStreak: z.number().int().min(0).default(0),
  longestStreak: z.number().int().min(0).default(0),
  totalSuccessDays: z.number().int().min(0).default(0),
  totalTemptationResisted: z.number().int().min(0).default(0),
  snackBoxCount: z.number().int().min(0).default(0),
  weeklyProgress: z.array(z.number().min(0).max(1)).default([]),
  weightHistory: z.array(weightRecordSchema).default([]),
});

/**
 * 핵심 모델 스키마
 */

/** 체크리스트 항목 스키마 */
export const checklistItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, '제목을 입력하세요'),
  timeSlot: timeSlotSchema,
  isCoreMission: z.boolean().default(false),
});

/** 식사 기록 스키마 */
export const mealRecordSchema = z.object({
  id: z.string(),
  mealTime: mealTimeSchema,
  place: mealPlaceSchema,
  menu: z.string().min(1, '메뉴를 입력하세요'),
  imageUrl: z.string().url().nullable().optional(),
  achievements: z.array(z.string()).default([]),
  createdAt: z.string().datetime(),
  reactions: z.array(reactionSchema).default([]),
  comments: z.array(commentSchema).default([]),
  isPublic: z.boolean().default(false),
});

/** 일일 기록 스키마 (가장 중요!) */
export const dailyRecordSchema = z.object({
  id: z.string(),
  date: z.string().datetime(),
  checklist: z.record(z.string(), z.boolean()).default({}),
  meals: z.array(mealRecordSchema).default([]),
  exercise: exerciseTypeSchema.nullable().optional(),
  isSuccessDay: z.boolean().default(false),
  hadBinge: z.boolean().default(false),
  temptationResisted: z.number().int().min(0).default(0),
});

/** 보상 시스템 상태 스키마 */
export const rewardStatusSchema = z.object({
  snackBoxCount: z.number().int().min(0).default(0),
  consecutiveDietDays: z.number().int().min(0).default(0),
  lastCheatDay: z.string().datetime().nullable().optional(),
});

/** 실패 리포트 스키마 */
export const failureReportSchema = z.object({
  id: z.string(),
  userId: z.string(),
  failedAt: z.string().datetime(),
  lostStreak: z.number().int().min(0),
  lostCheatDayProgress: z.number().int().min(0).max(7),
  weekSuccessRate: z.number().min(0).max(1),
  memo: z.string().max(500, '메모는 최대 500자까지 가능합니다').nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  isPublic: z.boolean().default(false),
  reactions: z.array(reactionSchema).default([]),
  comments: z.array(commentSchema).default([]),
  createdAt: z.string().datetime(),
});

/** 공유된 기록 스키마 */
export const sharedRecordSchema = z.object({
  type: sharedRecordTypeSchema,
  recordDate: z.string().datetime(),
  data: z.record(z.string(), z.any()),
});

/** 게시글 스키마 */
export const postSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  type: postTypeSchema,
  content: z.string().max(1000, '내용은 최대 1000자까지 가능합니다').nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  youtubeUrl: z.string().url().nullable().optional(),
  failureReport: failureReportSchema.nullable().optional(),
  sharedRecord: sharedRecordSchema.nullable().optional(),
  reactions: z.array(reactionSchema).default([]),
  comments: z.array(commentSchema).default([]),
  createdAt: z.string().datetime(),
});

/**
 * Form 입력 스키마 (더 엄격한 검증)
 */

/** 회원가입 폼 스키마 */
export const signupFormSchema = z.object({
  nickname: z
    .string()
    .min(3, '닉네임은 최소 3자 이상이어야 합니다')
    .max(20, '닉네임은 최대 20자까지 가능합니다')
    .regex(
      /^[a-zA-Z0-9가-힣_]+$/,
      '닉네임은 영문, 숫자, 한글, 언더스코어만 사용 가능합니다'
    ),
  email: z.string().email('올바른 이메일 주소를 입력하세요'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다'
    ),
});

/** 로그인 폼 스키마 */
export const loginFormSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력하세요'),
  password: z.string().min(1, '비밀번호를 입력하세요'),
});

/** 프로필 편집 폼 스키마 */
export const profileEditFormSchema = z.object({
  nickname: z
    .string()
    .min(3, '닉네임은 최소 3자 이상이어야 합니다')
    .max(20, '닉네임은 최대 20자까지 가능합니다')
    .regex(
      /^[a-zA-Z0-9가-힣_]+$/,
      '닉네임은 영문, 숫자, 한글, 언더스코어만 사용 가능합니다'
    ),
  bio: z.string().max(100, '소개는 최대 100자까지 가능합니다').optional(),
});

/** 식사 기록 추가 폼 스키마 */
export const mealRecordFormSchema = z.object({
  mealTime: mealTimeSchema,
  place: mealPlaceSchema,
  menu: z.string().min(1, '메뉴를 입력하세요').max(200, '메뉴는 최대 200자까지 가능합니다'),
  achievements: z.array(z.string()).default([]),
  isPublic: z.boolean().default(false),
});

/** 게시글 작성 폼 스키마 */
export const postFormSchema = z.object({
  type: postTypeSchema,
  content: z
    .string()
    .max(1000, '내용은 최대 1000자까지 가능합니다')
    .optional()
    .or(z.literal('')),
});

/** 댓글 작성 폼 스키마 */
export const commentFormSchema = z.object({
  content: z
    .string()
    .min(1, '댓글 내용을 입력하세요')
    .max(500, '댓글은 최대 500자까지 가능합니다'),
});

/** 실패 리포트 작성 폼 스키마 */
export const failureReportFormSchema = z.object({
  memo: z.string().max(500, '메모는 최대 500자까지 가능합니다').optional(),
  isPublic: z.boolean().default(false),
});

/**
 * 타입 추론 헬퍼
 *
 * Zod 스키마로부터 TypeScript 타입을 자동으로 추론
 */
export type User = z.infer<typeof userSchema>;
export type UserGoals = z.infer<typeof userGoalsSchema>;
export type UserStats = z.infer<typeof userStatsSchema>;
export type WeightRecord = z.infer<typeof weightRecordSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Reaction = z.infer<typeof reactionSchema>;
export type ReactionCounts = z.infer<typeof reactionCountsSchema>;
export type ChecklistItem = z.infer<typeof checklistItemSchema>;
export type MealRecord = z.infer<typeof mealRecordSchema>;
export type DailyRecord = z.infer<typeof dailyRecordSchema>;
export type RewardStatus = z.infer<typeof rewardStatusSchema>;
export type FailureReport = z.infer<typeof failureReportSchema>;
export type SharedRecord = z.infer<typeof sharedRecordSchema>;
export type Post = z.infer<typeof postSchema>;

// Form 타입
export type SignupFormData = z.infer<typeof signupFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type ProfileEditFormData = z.infer<typeof profileEditFormSchema>;
export type MealRecordFormData = z.infer<typeof mealRecordFormSchema>;
export type PostFormData = z.infer<typeof postFormSchema>;
export type CommentFormData = z.infer<typeof commentFormSchema>;
export type FailureReportFormData = z.infer<typeof failureReportFormSchema>;
