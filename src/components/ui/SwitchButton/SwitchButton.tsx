// components/SwitchButton/SwitchButton.tsx
import React from 'react';

import styles from './SwitchButton.module.scss';

import { SwitchButtonProps } from '@/components/ui/SwitchButton/SwitchButton.props';

export function SwitchButton<T>({
  checked,
  checkedValue,
  uncheckedValue,
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
}: SwitchButtonProps<T>) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        checked={checked}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.target.checked ? checkedValue : uncheckedValue)
        }
      />
      <span className={styles.slider} />
    </label>
  );
}
