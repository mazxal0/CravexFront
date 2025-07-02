'use client';
import { KeyboardEvent, useCallback, useRef, useState } from 'react';

import clsx from 'clsx';

import styles from './CodeInput.module.scss';

import { Input } from '@/components/ui';

interface CodeInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  classname?: string;
}

export const CodeInput = ({
  length = 6,
  onComplete,
  classname,
}: CodeInputProps) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    // Разрешаем только одну цифру или пустую строку
    if (!/^[0-9]?$/.test(value)) {
      setError(true);
      return;
    }
    setError(false);

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Автопереход к следующему полю при вводе цифры
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Если все поля заполнены
    if (newCode.every((c) => c) && onComplete) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Обработка Backspace
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        // Если поле пустое - переходим к предыдущему
        inputRefs.current[index - 1]?.focus();
      } else if (code[index]) {
        // Если поле не пустое - очищаем его
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
    // Навигация стрелками
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!pasteData) return;

    const newCode = [...code];
    let i = 0;
    for (; i < pasteData.length && i < length; i++) {
      newCode[i] = pasteData[i];
    }
    setCode(newCode);

    const nextIndex = Math.min(i, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (newCode.every((c) => c) && onComplete) {
      onComplete(newCode.join(''));
    }
  };

  const setInputRef = useCallback(
    (el: HTMLInputElement | null, index: number) => {
      inputRefs.current[index] = el;
    },
    [],
  );

  return (
    <div className={styles.code_input_container}>
      {code.map((digit, index) => (
        <Input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => setInputRef(el, index)}
          className={clsx(
            styles.code_input_digit,
            classname,
            error && styles.error,
          )}
          autoFocus={index === 0}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      ))}
    </div>
  );
};
