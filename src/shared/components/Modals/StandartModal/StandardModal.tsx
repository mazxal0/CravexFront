'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

import clsx from 'clsx';

import styles from './StandardModal.module.scss';

import { Button } from '@/components/ui';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children?: any;
  confirmText?: string;
  cancelText?: string;
  classname?: string;
}
export const StandardModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  children,
  confirmText,
  cancelText,
  classname,
}) => {
  // const modalRef = useClickOutside<HTMLDivElement>(onClose, isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx(styles.overlay, classname)}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={styles.modal}
            tabIndex={-1}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.content}>{children}</div>
            <Button className={styles.cancelButton} onClick={onClose}>
              {cancelText || 'Cancel'}
            </Button>
            {confirmText && <Button onClick={onConfirm}>{confirmText}</Button>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
