'use client';

/** @desc 공통 Toast 컴포넌트 */

import { useEffect } from 'react';
import classNames from 'classnames';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const TOAST_ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
} as const;

const TOAST_STYLES = {
  success: 'bg-success-50 border-success-500 text-success-800',
  error: 'bg-error-50 border-error-500 text-error-800',
  info: 'bg-primary-50 border-primary-500 text-primary-800',
} as const;

export function Toast({ isVisible, message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const Icon = TOAST_ICONS[type];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <div className={classNames('flex items-center gap-3 px-4 py-3 rounded-xl border-2 shadow-lg min-w-[300px] max-w-md', TOAST_STYLES[type])}>
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button onClick={onClose} className="flex-shrink-0 hover:opacity-70 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
