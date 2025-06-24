import React from 'react';

export interface DropTabMenuProps {
  items: Item[];
  className?: string;
}

interface Item {
  text: string;
  callback: (e: React.MouseEvent) => void;
}
