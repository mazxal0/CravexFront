'use client';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import styles from './HeaderAssets.module.scss';

import { ChangingWithChevron } from '@/components/ui';
import { HeaderAssetsProps } from '@/shared/components/HeaderAssets/HeaderAssets.Props';
import { currentActivityStore } from '@/shared/stores/CurrentActivityStore';

export const HeaderAssets: FC<HeaderAssetsProps> = observer(
  ({ total_assets, changing }) => {
    const setCurrentActivity = (value: string) => {
      currentActivityStore.currentAsset = value;
      console.log(currentActivityStore.currentAsset);
    };

    return (
      <div
        className={styles.header_assets}
        onClick={() => setCurrentActivity('main')}
      >
        <h5 className={styles.text}>Total Balance</h5>
        <h1 className={styles.total_balance}>${total_assets}</h1>
        <ChangingWithChevron
          type={'mark'}
          color={'var(--success-color)'}
          changing={changing}
        />
      </div>
    );
  },
);
