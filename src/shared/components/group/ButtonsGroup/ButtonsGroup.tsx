'use client';

import React, { FC } from 'react';

import styles from './ButtonsGroup.module.scss';

import { Button } from '@/components/ui';
import { ButtonsGroupProps } from '@/shared/components/group/ButtonsGroup/ButtonsGroup.props';

export const ButtonsGroup: FC<ButtonsGroupProps> = ({
  buttonsProps,
  activeValue,
  onClick,
}) => {
  return (
    <div className={styles.buttons_group}>
      {buttonsProps.map(
        (btn, ind) =>
          btn && (
            <Button
              disabled={btn.value === activeValue}
              active={btn.value === activeValue}
              type={'button'}
              key={btn.text + ind}
              className={styles.button}
              formatType={'ghost'}
              onClick={(event) => {
                event.preventDefault();
                onClick(btn.value);
              }}
            >
              {btn.text}
            </Button>
          ),
      )}
    </div>
  );
};
