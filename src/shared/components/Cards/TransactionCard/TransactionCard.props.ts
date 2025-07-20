import { TransactionTypes } from '@/shared/types/Transaction.types';

export interface TransactionCardProps {
  id: string;
  date: string;
  amount: number;
  type: TransactionTypes;
  price: number;
  asset: {
    coin: {
      symbol: string;
      name: string;
    };
  };
  addressTo?: string;
  addressFrom?: string;
  description?: string;
  onClick: () => void;
}
