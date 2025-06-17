'use client';

import { FC, useEffect } from 'react';

import styles from './StandardModal.module.scss';

import { Button } from '@/components/ui';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children?: any;
  confirmText?: string;
  cancelText?: string;
}

export const StandardModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  children,
  confirmText,
  cancelText,
}) => {
  const modalRef = useClickOutside<HTMLDivElement>(onClose, isOpen);

  // Закрытие по клавише Esc
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Блокировка прокрутки фона
    }
    return () => {
      document.body.style.overflow = 'auto'; // Разблокировка прокрутки фо
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <Button className={styles.cancelButton} onClick={onClose}>
            {cancelText}
          </Button>
          {confirmText && <Button onClick={onConfirm}>{confirmText}</Button>}
        </div>
      </div>
    </div>
  );
};

// {children.map((coin, index) => (
//             <Button key={index} formatType={'tile'}>
//               {coin}
//             </Button>
// ))}
