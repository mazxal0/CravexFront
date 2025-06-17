'use client';

import { observer } from 'mobx-react-lite';
import React from 'react';

import styles from './ChartDataGroup.module.scss';

import ChartComponent from '@/components/ui/Chart/Chart';
import { CurrentAssetCard, HistoryPanel } from '@/shared/components';
import { ButtonsGroup } from '@/shared/components/group/ButtonsGroup/ButtonsGroup';
import { rootStore } from '@/shared/stores';

export const ChartDataGroup = observer(() => {
  return (
    <div>
      <CurrentAssetCard />
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
      <HistoryPanel />
    </div>
  );
});
