import { makeAutoObservable } from 'mobx';

import api from '@/lib/axios';
import { Asset } from '@/shared/types/Asset.type';

class WalletActivityStore {
  private _walletAssets: Asset[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public async getWalletAssets(walletId: string) {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${walletId}`,
      );

      this.walletAssets = response.data.assets;
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
}

export const walletActivityStore = new WalletActivityStore();
