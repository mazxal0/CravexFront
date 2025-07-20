import React, { FC, ReactElement, MouseEventHandler } from 'react';

import styles from './IconButton.module.scss';

interface IconButtonProps {
  /** SVG-иконка, передаваемая как JSX-элемент */
  icon: ReactElement;
  /** Обработчик клика */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Текст для aria-label (важно для доступности) */
  ariaLabel?: string;
  /** Дополнительные классы */
  className?: string;
}

export const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  ariaLabel,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};
