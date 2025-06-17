'use client';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import styles from './HeaderAssetsCard.module.scss';

import { ChangingWithChevron } from '@/components/ui';
import { HeaderAssetsCardProps } from '@/shared/components/Cards/HeaderAssetsCard/HeaderAssetsCard.Props';
import { rootStore } from '@/shared/stores';
import { Asset } from '@/shared/types';

export const HeaderAssetsCard: FC<HeaderAssetsCardProps> = observer(
  ({ changing }) => {
    const setCurrentActivity = (value: Asset) => {
      rootStore.currentActivityStore.currentAsset = value;
      // console.log(currentActivityStore.currentAsset);
    };

    return (
      <div
        className={styles.header_assets}
        // onClick={() => setCurrentActivity('main')}
      >
        <h5 className={styles.text}>Total Balance</h5>
        <h1 className={styles.total_balance}>
          ${rootStore.walletActivityStore.currentAllWalletBalance}
        </h1>
        <ChangingWithChevron
          type={'mark'}
          color={'var(--success-color)'}
          changing={changing}
        />
      </div>
    );
  },
);
