/**
 * CleanCard - 파스텔 디자인 시스템 카드
 *
 * 특징:
 * - 테두리 없음
 * - 그림자 없음
 * - 배경색으로만 구분
 * - 부드러운 모서리
 */

import React from 'react';

export type CardVariant = 'white' | 'neutral' | 'primary' | 'success' | 'caution' | 'error';
export type CardPadding = 'sm' | 'md' | 'lg';

interface CleanCardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  white: 'bg-white',
  neutral: 'bg-neutral-100',
  primary: 'bg-primary-100',
  success: 'bg-success-100',
  caution: 'bg-peach-100',
  error: 'bg-error-100',
};

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const CleanCard: React.FC<CleanCardProps> = ({
  variant = 'white',
  padding = 'md',
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        rounded-2xl
        ${onClick || hoverable ? 'cursor-pointer transition-all duration-300 hover:scale-[1.02]' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
