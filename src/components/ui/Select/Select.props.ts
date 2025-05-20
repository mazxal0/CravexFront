import { ReactNode, SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<string | ReactNode>;
}
