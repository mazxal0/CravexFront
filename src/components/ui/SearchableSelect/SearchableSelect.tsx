'use client';
// components/SearchableSelect/SearchableSelect.tsx
import React, { useEffect, useRef, useState } from 'react';

import styles from './SearchableSelect.module.scss';

import { Input } from '@/components/ui';

interface Option {
  value: string | number;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  noOptionsMessage?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  defaultValue,
  onChange,
  placeholder = 'Поиск...',
  noOptionsMessage = 'Ничего не найдено',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOptions(options);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = options
        .filter((option) => option.label.toLowerCase().includes(term))
        .sort((a, b) => {
          // Сортируем по релевантности - сначала точные совпадения
          const aIndex = a.label.toLowerCase().indexOf(term);
          const bIndex = b.label.toLowerCase().indexOf(term);

          if (aIndex === bIndex) {
            return a.label.length - b.label.length;
          }
          return aIndex - bIndex;
        });

      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string | number) => {
    setSelectedValue(value);
    onChange?.(value);
    setIsOpen(false);
    setSearchTerm(options.find((o) => o.value === value)?.label || '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.searchableSelect}
      onKeyDown={handleKeyDown}
    >
      <Input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        style={{ margin: 0 }}
        className={styles.searchInput}
      />

      {isOpen && (
        <div className={styles.options}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${
                  selectedValue === option.value ? styles.selected : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {highlightMatch(option.label, searchTerm)}
              </div>
            ))
          ) : (
            <div className={styles.noOptions}>{noOptionsMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

// Функция для подсветки совпадений
const highlightMatch = (text: string, term: string) => {
  if (!term.trim()) return text;

  const regex = new RegExp(`(${term})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="highlight">
        {part}
      </span>
    ) : (
      part
    ),
  );
};
