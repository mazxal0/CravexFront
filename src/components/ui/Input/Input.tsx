'use client';

import { motion } from 'framer-motion';
import React, { FC, useRef, useState } from 'react';

import clsx from 'clsx';

import styles from './Input.module.scss';

import { InputProps } from '@/components/ui/Input/Input.props';

export const Input: FC<InputProps> = ({
  label,
  className,
  value = '',
  onChange,
  id,
  classNameForLabel,
  topLevelOfLabel = 68,
  bottomLevelOfLabel = 25,
  backgroundLabel = 'primary',
  formatSize = 'lg',
  onFocus,
  onBlur,
  name,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const hasValue = !!value;

  const inputId = id || name || label;

  const resBottomLevel =
    formatSize === 'lg'
      ? bottomLevelOfLabel
      : formatSize === 'md'
        ? bottomLevelOfLabel - 20
        : formatSize === 'sm'
          ? bottomLevelOfLabel - 50
          : bottomLevelOfLabel + 25;

  const resTopLevel = `-${topLevelOfLabel}%`;

  return (
    <div className={styles.input_container}>
      <motion.label
        htmlFor={inputId}
        className={clsx(
          classNameForLabel,
          styles.label,
          styles[`bg-label-${backgroundLabel}`],
          styles[`${formatSize}-label`],
        )}
        initial={{
          y: `${resBottomLevel}%`,
          scale: 1,
        }}
        animate={{
          y:
            isFocused || hasValue
              ? `-${topLevelOfLabel}%`
              : `${bottomLevelOfLabel}%`,
          scale: isFocused || hasValue ? 0.85 : 1,
          color:
            isFocused || hasValue
              ? 'var(--font-alternative-color)'
              : 'var(--font-color)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
      >
        {label}
      </motion.label>

      <motion.input
        id={inputId}
        ref={inputRef}
        className={clsx(className, styles.input, styles[formatSize])}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={name}
        whileFocus={{
          borderColor: 'var(--focus-blue-color)',
          boxShadow: '0 0 0 2px rgba(74, 108, 247, 0.2)',
        }}
        {...props}
      />
    </div>
  );
};
