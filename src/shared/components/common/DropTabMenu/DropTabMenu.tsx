import { motion } from 'framer-motion';
import { FC } from 'react';

import clsx from 'clsx';

import styles from './DropTabMenu.module.scss';

import { DropTabMenuProps } from '@/shared/components/common/DropTabMenu/DropTabMenu.props';

export const DropTabMenu: FC<DropTabMenuProps> = ({ items, className }) => {
  console.log();
  return (
    <motion.div className={clsx(styles.container, className)}>
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
