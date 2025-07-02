import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  formatType?: 'primary' | 'outline' | 'tile' | 'ghost';
  formatSize?: 'sm' | 'md' | 'lg';
  active?: boolean;
}
