import { LineData } from 'lightweight-charts';

export interface Asset {
  coinId: string;
  id: string;
  coinName: string;
  symbol: string;
  price: number;
  logoUrl: string;
  changing: number;
  amount: number;
  totalSum: number;
  walletId?: string;
}

export interface CreateAsset {
  coinId: string;
  coinName: string;
  symbol: string;
  amount: number;
}

export interface NewAddingAsset {
  id?: string;
  name?: string;
  amount?: number;
}

export interface CurrentAsset extends Partial<Asset> {
  volume: number;
  marketCap: number;
  totalSum: number;
  changing: number;
  prices: LineData[];
  marketCaps: LineData[];
  volumes: LineData[];
  isOpenChart?: boolean;
}
