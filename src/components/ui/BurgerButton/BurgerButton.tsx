'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import styles from './BurgerButton.module.scss';

export const BurgerButton = () => {
  const [isOpenButton, setIsOpenButton] = useState<boolean>();

  return (
    <button
      className={styles.burger_button}
      onClick={() => setIsOpenButton((prev) => !prev)}
    >
      <motion.div
        className={styles.burger}
        animate={{
          rotate: isOpenButton ? 45 : 0,
          y: isOpenButton ? 8 : 0,
        }}
      />
      <motion.div
        className={styles.burger}
        animate={{
          x: isOpenButton ? -20 : 0,
          width: isOpenButton ? '0%' : '100%',
          opacity: isOpenButton ? 0 : 1,
        }}
      />
      <motion.div
        className={styles.burger}
        animate={{
          rotate: isOpenButton ? -45 : 0,
          y: isOpenButton ? -8 : 0,
        }}
      />
    </button>
  );
};
