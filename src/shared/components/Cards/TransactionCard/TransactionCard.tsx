import { FC } from 'react';

import clsx from 'clsx';

import styles from './TransactionCard.module.scss';

import { MagnifierIcon } from '@/components/icons';
import { TransactionCardProps } from '@/shared/components/Cards/TransactionCard/TransactionCard.props';
import { formatDate } from '@/shared/utils';

export const TransactionCard: FC<TransactionCardProps> = ({
  date,
  addressTo,
  price,
  type,
  amount,
  asset,
  onClick,
}) => {
  return (
    <>
      <div className={clsx(styles.desktop, styles.card)}>
        <div className={styles.element}>{formatDate(date)}</div>
        <div className={styles.element}>{type}</div>
        <div className={styles.element}>{asset?.coin?.name}</div>
        <div className={styles.element}>{amount}</div>
        <div className={styles.element}>{price * amount}</div>
        <div
          className={clsx(styles.element, styles.centered)}
          onClick={onClick}
        >
          <MagnifierIcon color={'var(--primary-color)'} />
        </div>
      </div>
      <div className={clsx(styles.mobile, styles.card)} onClick={onClick}>
        <div className={styles.element}>{formatDate(date)}</div>
        <div className={styles.element}>{type}</div>
        <div className={styles.element}>
          {amount}
          {' ' + asset?.coin?.symbol}
        </div>
        {/*<div className={clsx(styles.element, styles.centered)}>*/}
        {/*  <MagnifierIcon color={'var(--primary-color)'} />*/}
        {/*</div>*/}
      </div>
    </>
  );
};
