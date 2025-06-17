import { LineData } from 'lightweight-charts';

export interface Asset {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  amount: number;
  price: number;
  logoUrl: string;
  changing: number;
}

export interface NewAddingAsset {
  id?: string;
  name?: string;
  amount?: number;
}

export interface CurrentAsset extends Partial<Asset> {
  volume: number;
  marketCap: number;
  prices: LineData[];
  marketCaps: LineData[];
  volumes: LineData[];
}
