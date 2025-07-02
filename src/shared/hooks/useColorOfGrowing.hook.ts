'use client';

import { useEffect, useState } from 'react';

type colors = 'var(--success-color)' | 'var(--error-color)';

export const useColorOfGrowing = (change: number | undefined) => {
  const [color, setColor] = useState<colors>('var(--success-color)');

  useEffect(() => {
    if (change && change >= 0) {
      setColor('var(--success-color)');
    } else {
      setColor('var(--error-color)');
    }
  }, [change]);

  return { color };
};
