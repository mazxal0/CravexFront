import React from 'react';

import { Input } from '@/components/ui';
import { ControlInputProps } from '@/components/ui/ControlInput/ControlInput.props';
import { useDebounce } from '@/shared/hooks';

export const ControlInput = ({
  delay = 500,
  onSearch,
  value,
  onHandleChange,
  ...props
}: ControlInputProps) => {
  useDebounce(value, delay, onSearch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHandleChange(e.target.value);
  };

  return <Input {...props} value={value} onChange={handleChange} />;
};
