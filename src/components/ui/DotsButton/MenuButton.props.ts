import { Dispatch, JSX, SetStateAction } from 'react';

export interface MenuButtonProps {
  setIsOpening: Dispatch<SetStateAction<boolean>>;
  imageElement: JSX.Element;
}
