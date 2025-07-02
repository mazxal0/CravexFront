import React from 'react';

export interface DropTabMenuProps {
  items: Item[];
  className?: string;
  onClose?: () => void;
  isOpen?: boolean;
  top?: number | string;
  right?: number | string;
}

interface Item {
  text: string;
  callback: (e: React.MouseEvent) => void;
}
