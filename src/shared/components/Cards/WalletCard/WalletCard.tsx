'use client';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import styles from './WalletCard.module.scss';

import { ChangingWithChevron, ProgressBar } from '@/components/ui';
import { WalletCardProps } from '@/shared/components/Cards/WalletCard/WalletCard.props';
import { userStore } from '@/shared/stores/User.store';

export const WalletCard: FC<WalletCardProps> = ({
  id,
  name = 'wallet',
  totalSum = 0,
  changing = 0,
  dominateAssetName = 'void',
  dominateAssetInPercent = 0,
}) => {
  const [color, setColor] = useState<
    'var(--success-color)' | 'var(--error-color)'
  >('var(--success-color)');

  useEffect(() => {
    if (changing < 0) {
      changing *= -1;
      setColor('var(--error-color)');
    }
  }, []);

  const router = useRouter();

  const onClickWallet = () => {
    router.push(`${userStore.userId}/${id}`);
  };

  return (
    <div className={styles.card} onClick={onClickWallet}>
      <span className={styles.name}>{name}</span>
      <div className={styles.sums_container}>
        <span className={styles.total_sum}>${totalSum}</span>
        <ChangingWithChevron type={'mark'} changing={changing} color={color} />
      </div>
      <svg width="130" height="40" viewBox="0 0 130 40">
        <polyline
          points="0,35 15,25 30,30 45,15 60,20 75,10 90,25 105,15 120,30 130,20"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="1000;0"
            dur="1.5s"
            fill="freeze"
          />
        </polyline>
      </svg>
      <div className={styles.dominate_container}>
        <span className={styles.dominate_name}>{dominateAssetName}</span>
        <span className={styles.dominate_change}>
          {dominateAssetInPercent}% dominate
        </span>
      </div>
      <div className={styles.progress_bar_container}>
        <ProgressBar progress={dominateAssetInPercent} />
      </div>
    </div>
  );
};
