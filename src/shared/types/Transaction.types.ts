export type TransactionTypes = 'INCOME' | 'SALE';

export interface Transaction {
  id: string;
  date: string;
  type: TransactionTypes;
  amount: number;
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
}

export interface CreateTransaction {
  date: Date;
  type: TransactionTypes;
  amount: string;
  price: string;
  asset: string;
  walletTo?: string;
  walletFrom?: string;
  description?: string;
}

export interface SendCreatingTransaction {
  date: string;
  type: TransactionTypes;
  amount: string;
  price: string;
  walletTo?: string;
  description?: string;
}

export type GetCreatingTransaction = SendCreatingTransaction & {
  assetId: string;
  totalSum: number;
};
