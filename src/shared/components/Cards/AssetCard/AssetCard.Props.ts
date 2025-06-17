import { HTMLAttributes } from 'react';

export interface AssetCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  price: number;
  changing: number;
  ticket: string;
  amount: number;
  logoUrl?: string;
}
