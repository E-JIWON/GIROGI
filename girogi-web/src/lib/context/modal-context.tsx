'use client';

/** @desc Modal 전역 관리 Context */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

import type { ModalProps } from '@/components/common/modal';
import type { ToastProps, ToastType } from '@/components/common/toast';

import { Modal } from '@/components/common/modal';
import { Toast } from '@/components/common/toast';

interface ModalContextValue {
  openModal: (props: Omit<ModalProps, 'isOpen' | 'onClose'>) => void;
  closeModal: () => void;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalProps, setModalProps] = useState<Omit<ModalProps, 'isOpen' | 'onClose'> | null>(null);
  const [toastProps, setToastProps] = useState<Omit<ToastProps, 'isVisible' | 'onClose'> | null>(null);

  const openModal = useCallback((props: Omit<ModalProps, 'isOpen' | 'onClose'>) => {
    setModalProps(props);
  }, []);

  const closeModal = useCallback(() => {
    setModalProps(null);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    setToastProps({ message, type, duration });
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastProps(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, showToast }}>
      {children}
      {modalProps && <Modal isOpen={true} onClose={closeModal} {...modalProps} />}
      {toastProps && <Toast isVisible={true} onClose={handleCloseToast} {...toastProps} />}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}
