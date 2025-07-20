import React, { FC } from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const inputId = id || `checkbox-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={`${styles.container} ${className}`}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.checkbox}
        {...rest}
      />
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
