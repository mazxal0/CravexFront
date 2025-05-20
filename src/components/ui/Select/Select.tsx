import { FC } from 'react';

import { SelectProps } from '@/components/ui/Select/Select.props';

export const Select: FC<SelectProps> = ({ options, ...props }) => {
  return (
    <select {...props}>
      {options.map((el, index) => (
        <option key={el!.toString() + index}>{el}</option>
      ))}
    </select>
  );
};
