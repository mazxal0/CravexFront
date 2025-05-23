'use client';

import { observer } from 'mobx-react-lite';
import React from 'react';

import styles from '@/app/account/assets/[id]/[walletId]/page.module.scss';
import ChartComponent from '@/components/ui/Chart/Chart';
import { ButtonsGroup } from '@/shared/components/ButtonsGroup/ButtonsGroup';
import { rootStore } from '@/shared/stores';
import { formatNumberLength } from '@/shared/utils';

export const ChartDataGroup = observer(() => {
  return (
    <div>
      <div className={styles.heading_of_chart}>
        <h3>
          Current Asset: {rootStore.currentActivityStore.currentAsset.coinName}
        </h3>
        <span>
          Amount:{' '}
          {formatNumberLength(
            rootStore.currentActivityStore.currentAsset.amount,
          )}
        </span>
        <span>
          Price:{' '}
          {formatNumberLength(
            rootStore.currentActivityStore.currentAsset.price,
          )}
        </span>
        <span>
          Volume:{' '}
          {formatNumberLength(
            rootStore.currentActivityStore.currentAsset.volume,
          )}
        </span>
        <span>
          market Cap:{' '}
          {formatNumberLength(
            rootStore.currentActivityStore.currentAsset.marketCap,
          )}
        </span>
      </div>
      <ChartComponent data={rootStore.currentActivityStore.dataForChart} />
      <div className={styles.buttons_group_of_dating}>
        <ButtonsGroup
          buttonsProps={[
            { text: '1D', value: '1' },
            { text: '7D', value: '7' },
            { text: '14D', value: '14' },
            { text: '1M', value: '30' },
            { text: '1Y', value: '365' },
            { text: 'All', value: 'max' },
          ]}
        />
      </div>
    </div>
  );
});
