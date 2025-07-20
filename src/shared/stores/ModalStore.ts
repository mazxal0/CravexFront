import { makeAutoObservable } from 'mobx';

import api from '@/lib/axios';
import { AddingCoin } from '@/shared/types/Coin.types';

export class ModalStore {
  private _isOpenAddingNewAsset: boolean = false;
  private _currentPageAddingCoin: string = '0';
  private _currentAddingCoin: AddingCoin = {
    coinName: '',
    coinId: '',
    symbol: '',
    price: 0,
    amount: '',
  };
  private _isOpenCreatingTransactionModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isOpenAddingNewAsset() {
    return this._isOpenAddingNewAsset;
  }
  set isOpenAddingNewAsset(newState: boolean) {
    this._isOpenAddingNewAsset = newState;
  }

  set currentAddingCoin(AddingCoin: AddingCoin) {
    this._currentAddingCoin = AddingCoin;
  }
  get currentAddingCoin() {
    return this._currentAddingCoin;
  }

  set amountOfAddingCoin(newAmount: number | string) {
    this._currentAddingCoin = {
      ...this.currentAddingCoin,
      amount: newAmount,
    };
  }
  get amountOfAddingCoin(): string | number {
    return this.currentAddingCoin.amount;
  }

  async getCurrentDataOfAddingCoin() {
    try {
      const api_URL = `${process.env.NEXT_PUBLIC_API_GET_COIN_DATA_BY_ID}/${this.currentAddingCoin.coinId}`;
      const response = await api.get(api_URL);
      this.currentAddingCoin = {
        ...this.currentAddingCoin,
        price: response.data.currentPrice,
      };
    } catch (error) {
      console.log(error);
    }
  }

  resetData() {
    this.isOpenAddingNewAsset = false;
  }

  set isOpenCreatingTransactionModal(newState: boolean) {
    this._isOpenCreatingTransactionModal = newState;
  }
  get isOpenCreatingTransactionModal() {
    return this._isOpenCreatingTransactionModal;
  }
}
