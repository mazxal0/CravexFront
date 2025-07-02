export type SwitchButtonProps<T> = {
  /** текущее значение (true/false) */
  checked: boolean;
  /** значение для checked */
  checkedValue: T;
  /** значение для unchecked */
  uncheckedValue: T;
  /** колбэк при клике (новое значение) */
  onChange: (value: T) => void;
  /** блокировка */
  disabled?: boolean;
  /** для a11y */
  'aria-label'?: string;
};
