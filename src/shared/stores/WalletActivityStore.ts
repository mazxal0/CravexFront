import { makeAutoObservable, toJS } from 'mobx';

import { RootStore } from '@/shared/stores/RootStore';
import { type Asset } from '@/shared/types';

export class WalletActivityStore {
  private rootStore: RootStore;

  private _walletAssets: Asset[] = [];
  private _currentAllWalletBalance: number = 0;
  private _currentTotalChanging: number = 0;
  private _queryCryptoCoins: string = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  public getWalletAssets = async (data: any) => {
    try {
      this.currentAllWalletBalance = data.totalSum;
      this.currentTotalChanging = data.totalChange;
      this.walletAssets = toJS(data.assets);
      if (!this.rootStore.isMobile) {
        this.rootStore.currentActivityStore.currentAsset = toJS(
          this.walletAssets[0],
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // public async getAllCryptoCoins() {
  //   try {
  //     const response = await api.get<GetAxiosCoin[]>(
  //       `${process.env.NEXT_PUBLIC_API_GET_ORDERED_ALL_COINS}`,
  //       { params: { vs_currency: 'usd', order: 'market_cap_desc' } },
  //     );
  //     this.cryptoCoins = response.data.map((coin) => {
  //       return {
  //         coinName: coin.name,
  //         coinId: coin.id,
  //         symbol: coin.symbol,
  //         image: coin.image,
  //       };
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  set walletAssets(newWalletAssets: Asset[]) {
    this._walletAssets = newWalletAssets;
  }
  get walletAssets() {
    return this._walletAssets;
  }
  addNewAsset(newAsset: Asset) {
    this._walletAssets.push(newAsset);
  }

  set currentAllWalletBalance(newBalance: number) {
    this._currentAllWalletBalance = newBalance;
  }
  get currentAllWalletBalance() {
    return this._currentAllWalletBalance;
  }

  set currentTotalChanging(newTotalChanging: number) {
    this._currentTotalChanging = newTotalChanging;
  }
  get currentTotalChanging() {
    return this._currentTotalChanging;
  }

  set queryCryptoCoins(newQuery: string) {
    this._queryCryptoCoins = newQuery;
  }
  get queryCryptoCoins() {
    return this._queryCryptoCoins;
  }

  setQueryCryptoCoins = (newQuery: string) => {
    this.queryCryptoCoins = newQuery;
  };
}
