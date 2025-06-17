import { RefObject, useCallback, useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  callback: () => void,
  isEnabled: boolean = false,
): RefObject<T | null> => {
  const objRef = useRef<T | null>(null);

  const handleClick = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (
        event.type === 'mousedown' &&
        isEnabled &&
        objRef.current &&
        objRef.current.contains(event.target as Node)
      ) {
        callback();
      }

      if (
        event.type === 'keydown' &&
        (event as KeyboardEvent).key === 'Escape' &&
        isEnabled
      ) {
        callback();
      }
    },
    [callback, isEnabled],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleClick);
    };
  }, []);

  return objRef;
};
