'use client';
import { useEffect, useRef } from 'react';

export const useDebounce = (
  value: string,
  delay: number,
  callback: (value: string) => void,
) => {
  const timerRef = useRef<NodeJS.Timeout>(null);
  const prevValueRef = useRef<string>(value);

  useEffect(() => {
    if (value === prevValueRef.current) return;
    prevValueRef.current = value;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => callback(value.trim()), delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay, callback]);
};
