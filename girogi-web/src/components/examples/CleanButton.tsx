/**
 * CleanButton - 파스텔 디자인 시스템 버튼
 *
 * 특징:
 * - 테두리 없음
 * - 그림자 없음
 * - 배경색으로만 구분
 * - 부드러운 호버 효과
 */

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'caution' | 'error' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CleanButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-500
    text-white
    hover:bg-primary-600
  `,
  secondary: `
    bg-neutral-100
    text-neutral-900
    hover:bg-neutral-200
  `,
  success: `
    bg-success-300
    text-success-900
    hover:bg-success-400
  `,
  caution: `
    bg-peach-300
    text-neutral-900
    hover:bg-peach-400
  `,
  error: `
    bg-error-300
    text-error-900
    hover:bg-error-400
  `,
  ghost: `
    bg-transparent
    text-primary-500
    hover:text-primary-600
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-2xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

export const CleanButton: React.FC<CleanButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        font-medium
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
