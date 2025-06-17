import { makeAutoObservable } from 'mobx';

import api from '@/lib/axios';

export class UserStore {
  public accessToken: string = '';

  private _userId: string | null = null;
  private _walletId: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  set userId(newUserId: string | null) {
    this._userId = newUserId;
  }
  get userId() {
    return this._userId;
  }

  set walletId(newWalletId: string) {
    this._walletId = newWalletId;
  }
  get walletId() {
    return this._walletId;
  }

  setAccessToken(newAccessToken: string) {
    this.accessToken = newAccessToken;
  }

  clearAccessToken() {
    this.accessToken = '';
    this._userId = null;
  }

  get isLoggedIn() {
    return !!this.accessToken;
  }

  public async getUserId() {
    try {
      const api_url = process.env.NEXT_PUBLIC_API_URL_GET_ME;
      // console.log(this.accessToken);
      const response = await api.get(api_url, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      const userId = response.data.userId;
      if (!userId) throw new Error('something was wrong :(');
      // console.log('id', userId);
      this.userId = userId;
      return userId;
    } catch (error) {
      // console.log(error);
      return undefined;
    }
  }
}

export const userStore = new UserStore();
