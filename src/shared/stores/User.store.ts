import { makeAutoObservable } from 'mobx';

class UserStore {
  private _userId: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  set userId(newUserId: string) {
    this._userId = newUserId;
  }
  get userId() {
    return this._userId;
  }
}

export const userStore = new UserStore();
