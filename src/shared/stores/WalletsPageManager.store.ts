import { makeAutoObservable } from 'mobx';

import api from '@/lib/axios';
import { WalletPreview } from '@/shared/types/Wallet.types';

class WalletsPageManagerStore {
  private _wallets: WalletPreview[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getAllWallets() {
    const response = await api.get(
      process.env.NEXT_PUBLIC_API_URL_GET_ALL_WALLETS,
    );
    console.log(response.data);

    this.wallets = response.data;

    console.log(this.wallets);
  }

  set wallets(newWallets: WalletPreview[]) {
    this._wallets = newWallets;
  }
  get wallets() {
    return this._wallets;
  }
}

export const walletsPageManagerStore = new WalletsPageManagerStore();
