'use client';

import React, { FC } from 'react';

import styles from './ButtonsGroup.module.scss';

import { Button } from '@/components/ui';
import { ButtonsGroupProps } from '@/shared/components/group/ButtonsGroup/ButtonsGroup.props';
import { rootStore } from '@/shared/stores';

export const ButtonsGroup: FC<ButtonsGroupProps> = ({
  buttonsProps,
  onClick,
}) => {
  return (
    <div className={styles.buttons_group}>
      {buttonsProps.map((btn, ind) => (
        <Button
          disabled={btn.value === rootStore.currentActivityStore.dateOfChart}
          active={btn.value === rootStore.currentActivityStore.dateOfChart}
          type={'button'}
          key={btn.text + ind}
          formatType={'ghost'}
          onClick={(event) => {
            event.preventDefault();
            onClick(btn.value);
          }}
        >
          {btn.text}
        </Button>
      ))}
    </div>
  );
};
