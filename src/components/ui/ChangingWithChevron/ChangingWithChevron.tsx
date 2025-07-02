import React, { ReactNode } from 'react';

import clsx from 'clsx';

import styles from './ChangingWithChevron.module.scss';

import { Chevron } from '@/components/icons';

interface Props {
  color: 'var(--success-color)' | 'var(--error-color)';
  changing: number | string | ReactNode;
  type: 'chevron' | 'mark';
  className?: string;
}

export const ChangingWithChevron = ({
  color,
  changing,
  type,
  className,
}: Props) => {
  if (typeof changing === 'string' || typeof changing === 'number') {
    return (
      <span
        className={clsx(
          className,
          color === 'var(--success-color)'
            ? styles.grow_up_number
            : styles.grow_down_number,
        )}
      >
        {type === 'chevron' && (
          <Chevron
            height={10}
            width={10}
            color={color}
            direction={color === 'var(--success-color)' ? 'top' : 'bottom'}
          />
        )}
        {type === 'mark' && color === 'var(--success-color)' ? '+' : '-'}
        {changing}%{' '}
      </span>
    );
  } else {
    return (
      <span
        className={clsx(
          className,
          color === 'var(--success-color)'
            ? styles.grow_up_number
            : styles.grow_down_number,
        )}
      >
        {changing}
      </span>
    );
  }
};
