import { makeAutoObservable } from 'mobx';

import api from '@/lib/axios';
import { RootStore } from '@/shared/stores/RootStore';
import { WalletPreview } from '@/shared/types/Wallet.types';

export class WalletsPageManagerStore {
  private _wallets: WalletPreview[] = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async getAllWallets() {
    const response = await api.get(
      process.env.NEXT_PUBLIC_API_URL_GET_ALL_WALLETS,
      {
        headers: {
          Authorization: `Bearer ${this.rootStore.userStore.accessToken}`,
        },
      },
    );
    this.wallets = response.data;
  }

  set wallets(newWallets: WalletPreview[]) {
    this._wallets = newWallets;
  }
  get wallets() {
    return this._wallets;
  }
}
