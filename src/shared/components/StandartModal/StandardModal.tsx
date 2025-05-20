'use client';

import { FC, useEffect, useRef } from 'react';

import styles from './StandardModal.module.scss';

import { SearchableSelect } from '@/components/ui';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: any;
  confirmText: string;
  cancelText: string;
}

export const StandardModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Закрытие по клавише Esc
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Блокировка прокрутки фона
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto'; // Разблокировка прокрутки
    };
  }, [isOpen, onClose]);

  // Закрытие по клику вне модального окна
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Фокус-ловушка (для accessibility)
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>
          <SearchableSelect options={children} />
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button className={styles.confirmButton} onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
