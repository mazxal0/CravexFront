'use client';

import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import styles from './ButtonsGroup.module.scss';

import { Button } from '@/components/ui';
import { ButtonsGroupProps } from '@/shared/components/ButtonsGroup/ButtonsGroup.props';
import { currentActivityStore } from '@/shared/stores/CurrentActivityStore';
import { DateForChart } from '@/shared/types/ChartData.types';

export const ButtonsGroup: FC<ButtonsGroupProps> = observer(
  ({ buttonsProps }) => {
    const setDateForChart = (value: DateForChart) => {
      currentActivityStore.dateOfChart = value;
      console.log(currentActivityStore.dateOfChart);
    };

    return (
      <div className={styles.buttons_group}>
        {buttonsProps.map((btn, ind) => (
          <Button
            key={btn.text + ind}
            onClick={() => setDateForChart(btn.value)}
          >
            {btn.text}
          </Button>
        ))}
      </div>
    );
  },
);
