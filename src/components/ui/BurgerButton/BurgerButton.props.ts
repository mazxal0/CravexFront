import { Dispatch, SetStateAction } from 'react';

export interface BurgerButtonProps {
  onClick: Dispatch<SetStateAction<boolean>>;
  isOpenButton: boolean;
}
