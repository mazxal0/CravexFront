'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';

import { AnalyticsCardProps } from './Analytics.card.props';
import styles from './AnalyticsCard.module.scss';

export const AnalyticsCard: FC<AnalyticsCardProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const variants = {
    open: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={toggleOpen}>
        <h2 className={styles.title}>{title}</h2>
        <motion.div
          className={styles.icon}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Простая стрелка-вниз */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            className={styles.content}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{ padding: '0 16px 16px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
