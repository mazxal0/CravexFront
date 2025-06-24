import { LineData } from 'lightweight-charts';

export interface Asset {
  coinId: string;
  id: string;
  coinName: string;
  coinSymbol: string;
  price: number;
  logoUrl: string;
  changing: number;
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
  prices: LineData[];
  marketCaps: LineData[];
  volumes: LineData[];
}
