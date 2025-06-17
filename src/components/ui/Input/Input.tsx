'use client';

import { motion } from 'framer-motion';
import { FC, useRef, useState } from 'react';

import clsx from 'clsx';

import styles from './Input.module.scss';

import { InputProps } from '@/components/ui/Input/Input.props';

export const Input: FC<InputProps> = ({
  label,
  className,
  onChange,
  value,
  id,
  classNameForLabel,
  topLevelOfLabel = 20,
  bottomLevelOfLabel = 100,
  backgroundLabel = 'primary',
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = !!value;
  const inputId = id || label;

  return (
    <div className={styles.input_container}>
      <motion.label
        htmlFor={inputId}
        className={clsx(
          classNameForLabel,
          styles.label,
          styles[`bg-label-${backgroundLabel}`],
        )}
        initial={{ y: '50%', scale: 1 }}
        animate={{
          y:
            isFocused || hasValue
              ? `-${topLevelOfLabel || 20}%`
              : `${bottomLevelOfLabel || 110}%`,
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
        className={clsx(className, styles.input)}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        whileFocus={{
          borderColor: 'var(--focus-blue-color)',
          boxShadow: '0 0 0 2px rgba(74, 108, 247, 0.2)',
        }}
        {...props}
      />
    </div>
  );
};
