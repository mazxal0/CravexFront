'use client';
import { FC } from 'react';

import clsx from 'clsx';

import styles from './page.module.scss';

import { Button } from '@/components/ui';

interface SubscriptionCardProps {
  title: string;
  list: string[];
  cancelIndex: number;
  price?: number;
  currency?: string;
  disabled: boolean;
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  title,
  list,
  cancelIndex,
  disabled,
  price,
  currency,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.subscription_list}>
        {list.map((el, index) => (
          <li
            className={clsx(index + 1 >= cancelIndex && styles.cancel)}
            key={el}
          >
            {el}
          </li>
        ))}
      </ul>
      <p className={styles.price}>
        {price} {currency} {price && currency && '/ Per Month'}
      </p>
      <Button className={styles.button_container} disabled={disabled}>
        {disabled ? 'Active' : 'Get Now'}
      </Button>
    </div>
  );
};

export default function Subscription() {
  return (
    <div className={styles.page}>
      <SubscriptionCard
        title={'🔓 Free'}
        list={[
          'Up to 3 wallets',
          'Up to 15 assets per wallet',
          'Basic notifications via Telegram bot',
          'Ton wallet import by address',
          'No auto-update for tracked wallets',
        ]}
        cancelIndex={5}
        disabled
      />
      <SubscriptionCard
        title={'✨ Premium'}
        list={[
          'Up to 10 wallets',
          'Up to 100 assets per wallet',
          'Advanced notifications via Telegram bot',
          'Ton wallet import by address',
          'Auto-update for tracked wallets',
          'Badge "Premium"',
        ]}
        cancelIndex={7}
        price={5}
        currency={'$'}
        disabled={false}
      />
      <SubscriptionCard
        title={'🐋 Titan | Whale'}
        list={[
          'Up to 30 wallets',
          'Up to 200 assets per wallet',
          'All Premium functions',
          'Priority support',
          'Badge "Titan" or "Whale"',
          'Access to beta features (DEX tokens, securities, etc.)',
        ]}
        price={15}
        currency={'$'}
        cancelIndex={7}
        disabled={false}
      />
      <SubscriptionCard
        title={'🔮 Oracle'}
        list={[
          'Unique “Oracle” badge in your profile and Telegram chat',
          'Access to a private Oracle chat',
          'Early access to new features',
        ]}
        cancelIndex={15}
        disabled={false}
      />
    </div>
  );
}
