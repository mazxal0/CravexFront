import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  formatType?: 'primary' | 'outline' | 'tile' | 'ghost';
  formatSize?: 'sm' | 'md' | 'lg';
  active?: boolean;
  color?: 'primary-color' | 'red-color' | 'green-color';
  Icon?: ReactNode;
}
