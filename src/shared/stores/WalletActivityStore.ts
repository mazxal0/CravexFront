import { makeAutoObservable, toJS } from 'mobx';

import api from '@/lib/axios';
import { RootStore } from '@/shared/stores/RootStore';
import { type Asset, type Coin, type GetAxiosCoin } from '@/shared/types';

export class WalletActivityStore {
  private rootStore: RootStore;

  private _walletAssets: Asset[] = [];
  private _currentAllWalletBalance: number = 0;
  private _cryptoCoins: Coin[] = [];
  private _queryCryptoCoins: string = '';

  private _editMode: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  public async getWalletAssets(walletId: string) {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${walletId}`,
      );

      const plainData = {
        suma: response.data.suma,
        assets: toJS(response.data.assets),
      };

      this.currentAllWalletBalance = plainData.suma;
      this.walletAssets = plainData.assets;
      this.rootStore.currentActivityStore.currentAsset = toJS(
        this.walletAssets[0],
      );
      // console.log(
      //   'opa',
      //   this.walletAssets,
      //   // this.rootStore.currentActivityStore.currentAsset,
      // );
    } catch (e) {
      console.error(e);
    }
  }

  public async getAllCryptoCoins() {
    try {
      const response = await api.get<GetAxiosCoin[]>(
        `${process.env.NEXT_PUBLIC_API_GET_ORDERED_ALL_COINS}?vs_currency=usd&order=market_cap_desc`,
      );
      this.cryptoCoins = response.data.map((coin) => {
        return {
          coinName: coin.name,
          coinId: coin.id,
          symbol: coin.symbol,
          image: coin.image,
        };
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

  set cryptoCoins(newCryptoCoins: Coin[]) {
    this._cryptoCoins = newCryptoCoins;
  }
  get cryptoCoins() {
    return this._cryptoCoins;
  }

  changeEditMode() {
    this.editMode = !this.editMode;
  }

  set editMode(newMode: boolean) {
    this._editMode = newMode;
  }
  get editMode() {
    return this._editMode;
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
