import { FC, MouseEvent } from 'react';

import styles from './DotsButton.module.scss';

import { DotsIcon } from '@/components/icons';
import { DotsButtonProps } from '@/components/ui/DotsButton/DotsButton.props';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

export const DotsButton: FC<DotsButtonProps> = ({
  isOpening,
  setIsOpening,
}) => {
  const onCloseDotsMenu = () => {
    setIsOpening(false);
  };
  const menuRef = useClickOutside<HTMLDivElement>(onCloseDotsMenu, isOpening);
  const onOpenDotsMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpening((prev) => !prev);
  };

  return (
    <div className={styles.dots} onClick={onOpenDotsMenu} ref={menuRef}>
      <DotsIcon color={'var(--gray-color)'} />
    </div>
  );
};
