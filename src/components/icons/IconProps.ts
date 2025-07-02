import { MouseEvent } from 'react';

export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}
