import { makeAutoObservable } from 'mobx';

import { CurrentActivityStore } from '@/shared/stores/CurrentActivityStore';
import { ModalStore } from '@/shared/stores/ModalStore';
import { UserStore } from '@/shared/stores/User.store';
import { WalletActivityStore } from '@/shared/stores/WalletActivityStore';

export class RootStore {
  public userStore: UserStore;
  public currentActivityStore: CurrentActivityStore;
  public walletActivityStore: WalletActivityStore;

  public modalStore: ModalStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.walletActivityStore = new WalletActivityStore(this);
    this.currentActivityStore = new CurrentActivityStore();
    this.modalStore = new ModalStore();
  }
}

export const rootStore = new RootStore();
