'use client';
import { FC, useEffect, useRef, useState } from 'react';

import styles from './Select.module.scss';

import { Chevron } from '@/components/icons';
import { SelectOption, SelectProps } from '@/components/ui/Select/Select.props';

export const Select: FC<SelectProps> = ({
  options,
  label,
  value = '',
  onChange,
  className = '',
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(label);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: SelectOption) => {
    if (typeof option === 'string') setSelectedValue(option);
    else setSelectedValue(option?.label);

    onChange?.(typeof option === 'string' ? option : option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderOptions = () => {
    return options.map((option, index) => {
      const optionLabel = typeof option === 'string' ? option : option.label;
      const optionValue = typeof option === 'string' ? option : option.value;
      const currentValue = typeof value === 'string' ? value : value?.value;
      const isSelected = optionValue === currentValue;

      return (
        <div
          className={`${styles.option} ${isSelected ? styles.selected : ''}`}
          key={`${optionLabel}-${index}`}
          onClick={() => handleSelect(option)}
        >
          {optionLabel}
        </div>
      );
    });
  };

  return (
    <div
      ref={selectRef}
      className={`${styles.select} ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.label}>{label}</div>
      <div className={styles.selected_value}>
        {selectedValue}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
          <Chevron height={20} width={20} />
        </span>
      </div>

      {isOpen && <div className={styles.options}>{renderOptions()}</div>}
    </div>
  );
};
