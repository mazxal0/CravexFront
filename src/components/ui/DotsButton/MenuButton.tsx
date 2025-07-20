import { FC, MouseEvent } from 'react';

import styles from './MenuButton.module.scss';

import { MenuButtonProps } from '@/components/ui/DotsButton/MenuButton.props';

export const MenuButton: FC<MenuButtonProps> = ({
  setIsOpening,
  imageElement,
}) => {
  const onOpenMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpening((prev) => !prev);
  };
  return (
    <div className={styles.dots} onClick={onOpenMenu}>
      {imageElement}
    </div>
  );
};
