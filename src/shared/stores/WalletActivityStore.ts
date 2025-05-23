import { makeAutoObservable } from 'mobx';

import api from '@/lib/axios';
import { RootStore } from '@/shared/stores/RootStore';
import {
  type Asset,
  type Coin,
  type GetAxiosCoin,
  type NewAddingAsset,
} from '@/shared/types';

export class WalletActivityStore {
  private rootStore: RootStore;

  private _walletAssets: Asset[] = [];
  private _currentAllWalletBalance: number = 0;
  private _allCryptoCoins: Coin[] = [];

  // page adding new Coin:
  private _currentPageAddingCoin: string = '1';
  private _currentDataOfAddingCoin: NewAddingAsset = {};

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  public async getWalletAssets(walletId: string) {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${walletId}`,
      );

      // console.log(response.data);

      this.currentAllWalletBalance = response.data.suma;
      this.walletAssets = response.data.assets;
      this.rootStore.currentActivityStore.currentAsset = this.walletAssets[0];
    } catch (e) {
      console.error(e);
    }
  }

  public async getAllCryptoCoins() {
    try {
      const response = await api.get<GetAxiosCoin[]>(
        `${process.env.NEXT_PUBLIC_API_GET_ORDERED_ALL_COINS}?vs_currency=usd&order=market_cap_desc`,
      );

      this.allCryptoCoins = response.data.map((coin) => {
        return { coinName: coin.name, coinId: coin.id, image: coin.image };
      });
    } catch (e) {
      console.error(e);
    }
  }

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

  set allCryptoCoins(newCryptoCoins: Coin[]) {
    this._allCryptoCoins = newCryptoCoins;
  }
  get allCryptoCoins() {
    return this._allCryptoCoins;
  }

  set currentPageAddingCoin(newCurrentPage) {
    this._currentPageAddingCoin = newCurrentPage;
  }
  get currentPageAddingCoin() {
    return this._currentPageAddingCoin;
  }
  set currentDataOfAddingCoin(newCurrentDataOfAddingCoin: NewAddingAsset) {
    this._currentDataOfAddingCoin = newCurrentDataOfAddingCoin;
  }
  get currentDataOfAddingCoin() {
    return this._currentDataOfAddingCoin;
  }
}
