import React, { FC } from 'react';

import clsx from 'clsx';

import styles from '@/components/ui/Button/Button.module.scss';
import { ButtonProps } from '@/components/ui/Button/ButtonProps';

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  formatType = 'primary',
  formatSize = 'sm',
  color = 'primary-color',
  active,
  className,
  disabled,
  Icon,
  width,
  ...props
}) => {
  let style = {};
  if (width) style = { ...style, width: `${width}px` };

  return (
    <button
      style={style}
      type={type}
      className={clsx(
        styles.button,
        styles[formatType],
        styles[formatSize],
        styles[color],
        active && styles.active,
        disabled && styles.disabled,
        className,
      )}
      {...props}
    >
      {Icon && <div className={styles.icon}>{Icon}</div>}
      <span className={styles.text}>{children}</span>
    </button>
  );
};
