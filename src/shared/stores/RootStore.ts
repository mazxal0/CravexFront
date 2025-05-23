import { makeAutoObservable } from 'mobx';

import { CurrentActivityStore } from '@/shared/stores/CurrentActivityStore';
import { ModalStore } from '@/shared/stores/ModalStore';
import { UserStore } from '@/shared/stores/User.store';
import { WalletActivityStore } from '@/shared/stores/WalletActivityStore';
import { WalletsPageManagerStore } from '@/shared/stores/WalletsPageManager.store';

export class RootStore {
  public userStore: UserStore;
  public walletsPageManagerStore: WalletsPageManagerStore;

  public currentActivityStore: CurrentActivityStore;
  public walletActivityStore: WalletActivityStore;

  public modalStore: ModalStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.walletsPageManagerStore = new WalletsPageManagerStore(this);
    this.walletActivityStore = new WalletActivityStore(this);
    this.currentActivityStore = new CurrentActivityStore();
    this.modalStore = new ModalStore();
  }
}

export const rootStore = new RootStore();
