import { makeAutoObservable } from 'mobx';

export class UserStore {
  private _accessToken: string = '';

  private _userId: string | null = null;
  private _walletId: string = '';

  constructor() {
    makeAutoObservable(this);
    this._userId = this.loadFromStorage('userId');
    this._accessToken = this.loadFromStorage('accessToken');
  }

  set userId(newUserId: string) {
    this._userId = newUserId;
    this.saveToStorage('userId', newUserId);
  }
  get userId(): string | null {
    if (!this._userId) {
      this.loadFromStorage('userId');
    }
    return this._userId;
  }

  set walletId(newWalletId: string) {
    this._walletId = newWalletId;
  }
  get walletId() {
    return this._walletId;
  }

  set accessToken(newAccessToken: string) {
    this._accessToken = newAccessToken;
    this.saveToStorage('accessToken', newAccessToken);
  }

  get accessToken() {
    if (!this._userId) {
      this.loadFromStorage('accessToken');
    }
    return this._accessToken;
  }

  clearAccessToken() {
    this._accessToken = '';
    this._userId = null;
  }

  private saveToStorage(key: string, data: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  private loadFromStorage(key: string) {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    }
  }
}

export const userStore = new UserStore();
