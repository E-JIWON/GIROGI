'use client';

/** @desc 공통 Modal 컴포넌트 */

import { useEffect } from 'react';
import classNames from 'classnames';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  messageContent: string;
  type?: 'alert' | 'confirm';
  confirmButtonText?: string;
  closeButtonText?: string;
  onConfirm?: () => void;
}

export function Modal({
  isOpen,
  onClose,
  title,
  messageContent,
  type = 'alert',
  confirmButtonText = '확인',
  closeButtonText = '취소',
  onConfirm,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">{messageContent}</p>
        </div>

        {/* Buttons */}
        <div className={classNames('flex gap-3 px-6 pb-6', type === 'confirm' ? 'flex-row' : 'flex-col')}>
          {type === 'confirm' && (
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-200 text-neutral-800 rounded-xl font-medium hover:bg-neutral-300 transition-colors">
              {closeButtonText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={classNames(
              'py-3 rounded-xl font-semibold transition-colors',
              type === 'confirm' ? 'flex-1 bg-primary text-white hover:bg-primary-800' : 'w-full bg-primary text-white hover:bg-primary-800',
            )}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
