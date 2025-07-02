import { FC } from 'react';

import clsx from 'clsx';

import styles from './TransactionCard.module.scss';

import { MagnifierIcon } from '@/components/icons';
import { TransactionCardProps } from '@/shared/components/Cards/TransactionCard/TransactionCard.props';

export const TransactionCard: FC<TransactionCardProps> = ({
  date,
  address,
  price,
  type,
  amount,
  asset,
}) => {
  const realDate = typeof date === 'string' ? new Date(date) : date;

  const formatted = realDate
    .toLocaleString('en-US', {
      year: 'numeric',
      month: 'short', // “Jun”
      day: 'numeric', // 28
      hour: '2-digit', // 14
      minute: '2-digit', // 32
      hour12: false, // 24-hour clock
    })
    .replace(',', ''); // remove the comma after the date

  return (
    <div className={styles.card}>
      <div className={styles.element}>{formatted}</div>
      <div className={styles.element}>{type}</div>
      <div className={styles.element}>{asset?.coin?.name}</div>
      <div className={styles.element}>{amount}</div>
      <div className={styles.element}>{price * amount}</div>
      <div className={clsx(styles.element, styles.centered)}>
        <MagnifierIcon color={'var(--primary-color)'} />
      </div>
    </div>
  );
};
