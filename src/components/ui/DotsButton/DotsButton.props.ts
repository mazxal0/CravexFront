import { Dispatch, SetStateAction } from 'react';

export interface DotsButtonProps {
  isOpening: boolean;
  setIsOpening: Dispatch<SetStateAction<boolean>>;
}
