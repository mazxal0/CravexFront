import { makeAutoObservable } from 'mobx';

export class ModalStore {
  private _isOpenAddingNewAsset: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isOpenAddingNewAsset() {
    return this._isOpenAddingNewAsset;
  }
  set isOpenAddingNewAsset(newState: boolean) {
    this._isOpenAddingNewAsset = newState;
  }
}

export const modalStore = new ModalStore();
