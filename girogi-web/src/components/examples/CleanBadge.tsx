/**
 * CleanBadge - 파스텔 디자인 시스템 배지
 *
 * 특징:
 * - 테두리 없음
 * - 그림자 없음
 * - 배경색으로만 구분
 * - 작고 귀여운 디자인
 */

import React from 'react';

export type BadgeVariant = 'primary' | 'success' | 'caution' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

interface CleanBadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-success-100 text-success-700',
  caution: 'bg-peach-100 text-temptation',
  error: 'bg-error-100 text-error-700',
  info: 'bg-info-100 text-info-700',
  neutral: 'bg-neutral-100 text-neutral-700',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
};

export const CleanBadge: React.FC<CleanBadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  icon,
  className = '',
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-lg
        font-medium
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </span>
  );
};
