/**
 * CleanInput - 파스텔 디자인 시스템 입력 필드
 *
 * 특징:
 * - 테두리 없음
 * - 그림자 없음
 * - 배경색으로 구분
 * - 포커스 시 배경색 변화
 */

import React from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

interface CleanInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  inputSize?: InputSize;
  isFullWidth?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-3 text-base rounded-xl',
  lg: 'px-5 py-4 text-lg rounded-2xl',
};

export const CleanInput: React.FC<CleanInputProps> = ({
  label,
  error,
  inputSize = 'md',
  isFullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`${isFullWidth ? 'w-full' : ''} relative`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className={`
            ${sizeStyles[inputSize]}
            ${isFullWidth ? 'w-full' : ''}
            ${error ? 'bg-error-50' : 'bg-neutral-50'}
            text-neutral-900
            transition-colors duration-150
            focus:outline-none
            ${error ? 'focus:bg-error-100' : 'focus:bg-neutral-100'}
            placeholder:text-neutral-400
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />

        {/* 에러 메시지 영역 (항상 존재, absolute) */}
        <div className="h-6 relative">
          {error && (
            <p className="absolute top-1 left-0 text-sm text-error-700">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
