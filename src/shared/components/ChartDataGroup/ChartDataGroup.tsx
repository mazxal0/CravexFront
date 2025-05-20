'use client';

import { observer } from 'mobx-react-lite';
import React from 'react';

import styles from '@/app/account/assets/[id]/[walletId]/page.module.scss';
import ChartComponent from '@/components/ui/Chart/Chart';
import { ButtonsGroup } from '@/shared/components/ButtonsGroup/ButtonsGroup';
import { currentActivityStore } from '@/shared/stores/CurrentActivityStore';

export const ChartDataGroup = observer(() => {
  return (
    <div>
      <div>
        <h3>{currentActivityStore.currentAsset}</h3>
      </div>
      <ChartComponent data={currentActivityStore.prices} />
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
