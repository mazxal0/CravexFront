'use client';
import { useCallback, useEffect, useState } from 'react';

interface useLocalStorageHookProps<T = any> {
  defaultValue: T;
  key: string;
  onAction?: (value: T) => void;
}

// setState: Dispatch<SetStateAction<T>>;

export const useLocalStorage = <T = any>({
  defaultValue,
  key,
  onAction,
}: useLocalStorageHookProps<T>) => {
  let value = (localStorage.getItem(key) as T) || defaultValue;

  const [state, setState] = useState<T>(value);

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, state?.toString());
    }
    if (onAction) onAction(state);
  }, [state]);

  const setDefaultValue = useCallback(() => {
    setState(defaultValue);
  }, [setState]);

  return { state, setState, setDefaultValue };
};
