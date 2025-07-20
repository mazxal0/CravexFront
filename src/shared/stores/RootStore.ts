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
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  private _width = typeof window !== 'undefined' ? window.innerWidth : 1024;

  private handleResize = () => {
    this._width = window.innerWidth;
  };

  get isMobile() {
    return this._width <= 768;
  }
}

export const rootStore = new RootStore();
