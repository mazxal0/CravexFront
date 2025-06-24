import React from 'react';

import clsx from 'clsx';

import styles from './ChangingWithChevron.module.scss';

import { Chevron } from '@/components/icons';

interface Props {
  color: 'var(--success-color)' | 'var(--error-color)';
  changing: number | string;
  type: 'chevron' | 'mark';
}

export const ChangingWithChevron = ({ color, changing, type }: Props) => {
  return (
    <span
      className={clsx(
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
      {changing.toString().split('')[0]}% {changing.toString().slice(1)}
    </span>
  );
};
