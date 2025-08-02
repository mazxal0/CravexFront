import { LineData } from 'lightweight-charts';

export interface Asset {
  coinId: string;
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  logoUrl: string;
  change24hPercent: number;
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

export interface CurrentAsset extends Asset {
  // Метрики из CoinDataType

  currentMarketCap: number;
  currentVolume: number;
  fullyDilutedValuation: number;
  marketCapRank: number;

  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;

  change7dPercent: number;
  change14dPercent: number;
  change30dPercent: number;
  change60dPercent: number;
  change1yPercent: number;

  ath: number;
  athDate: string;
  atl: number;
  atlDate: string;

  lastUpdated: string;

  // Данные для графика и флаг показа
  prices: LineData[];
  marketCaps: LineData[];
  volumes: LineData[];
  isOpenChart?: boolean;
}
