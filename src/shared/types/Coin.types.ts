export interface Coin {
  image?: string;
  coinName: string;
  coinId: string;
  symbol: string;
}

export interface GetAxiosCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
}

export interface AddingCoin extends Coin {
  price: number;
  amount: number | string;
}
