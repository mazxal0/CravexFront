import { HTMLAttributes } from 'react';

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  ListElements: Array<ListElement>;
  onSearch: (query: string) => void;
  onHandleChange: (query: string) => void;
  value: string;
}

export interface ListElement {
  text: string;
  imageUrl?: string;
  description?: string;
  onClick?: () => void;
}
