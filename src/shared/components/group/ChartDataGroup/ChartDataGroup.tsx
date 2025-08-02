'use client';

import { observer } from 'mobx-react-lite';
import React from 'react';

import styles from './ChartDataGroup.module.scss';

import ChartComponent from '@/components/ui/Chart/Chart';
import { OtherSpinner } from '@/components/ui/Spinner/Spinner';
import { ButtonsGroup } from '@/shared/components/group/ButtonsGroup/ButtonsGroup';
import { useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { DateForChart } from '@/shared/types';

export const ChartDataGroup = observer(() => {
  const { data, isError, isLoading } = useQueryRequest({
    nameOfCache: '',
    apiUrl: `/coin/chart_data/${rootStore.currentActivityStore.currentAsset.name}`,
    params: {
      vs_currency: 'usd',
      days: rootStore.currentActivityStore.dateOfChart,
    },
    additionQueryFn: async (data) => {
      rootStore.currentActivityStore.supplementCurrentAsset = {
        ...rootStore.currentActivityStore.currentAsset,
        prices: data.prices,
        volumes: data.volumes,
        currentVolume: data.volumes[data.volumes.length - 1].value,
        marketCaps: data.marketCaps,
        currentMarketCap: data.marketCaps[data.marketCaps.length - 1].value,
      };
      rootStore.currentActivityStore.dataForChart =
        rootStore.currentActivityStore.currentAsset.prices;
    },
    queryOptions: {
      enabled:
        Boolean(rootStore.currentActivityStore.currentAsset.name) &&
        Boolean(rootStore.currentActivityStore.dateOfChart),
      retry: 1,
    },
  });

  return (
    <>
      {isLoading ? (
        <div className={styles.chart}>
          <OtherSpinner />
        </div>
      ) : (
        <ChartComponent data={rootStore.currentActivityStore.dataForChart} />
      )}

      <div className={styles.buttons_group_of_dating}>
        <ButtonsGroup
          buttonsProps={[
            { text: 'D', value: '1' },
            { text: 'W', value: '7' },
            { text: '2W', value: '14' },
            { text: 'M', value: '30' },
            { text: 'Y', value: '365' },
            { text: 'All', value: 'max' },
          ]}
          activeValue={rootStore.currentActivityStore.dateOfChart}
          onClick={(value: DateForChart) => {
            rootStore.currentActivityStore.dateOfChart = value;
          }}
        />
      </div>
    </>
  );
});
