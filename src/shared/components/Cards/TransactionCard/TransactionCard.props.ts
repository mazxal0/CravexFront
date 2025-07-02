import { TransactionTypes } from '@/shared/types/Transaction.types';

export interface TransactionCardProps {
  id?: string;
  date: Date | string;
  amount: number;
  address: string;
  type: TransactionTypes;
  price: number;
  asset: {
    coin: {
      name: string;
    };
  };
}
