import React, { FC } from 'react';

import clsx from 'clsx';

import styles from '@/components/ui/Button/Button.module.scss';
import { ButtonProps } from '@/components/ui/Button/ButtonProps';

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  formatType = 'primary',
  formatSize = 'sm',
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[formatType],
        styles[formatSize],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
