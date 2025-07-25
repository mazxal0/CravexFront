import React, { ButtonHTMLAttributes, FC } from 'react';

import styles from './buttonOAuth.module.scss';

interface buttonOAuthProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonOAuth: FC<buttonOAuthProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.btn} type={'button'}>
      {children}
    </button>
  );
};
