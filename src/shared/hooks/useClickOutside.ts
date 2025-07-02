'use client';
import { useCallback, useEffect, useRef } from 'react';

const useStableClick = (handler: (e: MouseEvent) => void) => {
  const handlerRef = useRef(handler);
  const lastClickTime = useRef(0);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const stableHandler = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastClickTime.current < 300) return;
    lastClickTime.current = now;
    handlerRef.current(e);
  }, []);

  return stableHandler;
};

export const useClickOutside = <T extends HTMLElement>(
  callback: () => void,
  isEnabled: boolean = false,
  isFixed: boolean = true,
) => {
  const ref = useRef<T>(null);
  const stableCallback = useStableClick(() => callback());

  useEffect(() => {
    if (!isEnabled) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        stableCallback(e);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isEnabled, stableCallback]);

  return ref;
};
