/**
 * 유틸리티 함수
 *
 * 프로젝트 전반에서 사용되는 공통 유틸리티
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스 병합 유틸리티
 *
 * clsx와 tailwind-merge를 조합하여 조건부 클래스를 안전하게 병합
 *
 * @example
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'hover:bg-blue-600')
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
