'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';

import clsx from 'clsx';

import styles from './DropTabMenu.module.scss';

import { DropTabMenuProps } from '@/shared/components/common/DropTabMenu/DropTabMenu.props';
import { useClickOutside } from '@/shared/hooks';

export const DropTabMenu: FC<DropTabMenuProps> = ({
  items,
  className,
  onClose = () => {},
  isOpen,
  top = 40,
  right = 5,
}) => {
  const dotsRef = useClickOutside<HTMLDivElement>(onClose, isOpen);

  return (
    <motion.div
      ref={dotsRef}
      style={{ top, right }}
      className={clsx(styles.container, className)}
    >
      {items.map((el, idx) => (
        <div
          key={el.text + idx.toString()}
          className={styles.item}
          onClick={el.callback}
        >
          {el.text}
        </div>
      ))}
    </motion.div>
  );
};
