'use client';

import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import styles from './ButtonsGroup.module.scss';

import { Button } from '@/components/ui';
import { ButtonsGroupProps } from '@/shared/components/group/ButtonsGroup/ButtonsGroup.props';
import { rootStore } from '@/shared/stores';
import { DateForChart } from '@/shared/types/ChartData.types';

export const ButtonsGroup: FC<ButtonsGroupProps> = observer(
  ({ buttonsProps }) => {
    const setDateForChart = (value: DateForChart) => {
      rootStore.currentActivityStore.dateOfChart = value;
    };

    return (
      <div className={styles.buttons_group}>
        {buttonsProps.map((btn, ind) => (
          <Button
            key={btn.text + ind}
            formatType={'outline'}
            onClick={() => setDateForChart(btn.value)}
          >
            {btn.text}
          </Button>
        ))}
      </div>
    );
  },
);
