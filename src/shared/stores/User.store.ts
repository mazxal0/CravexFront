import { makeAutoObservable } from 'mobx';

import api from '@/lib/axios';

export class UserStore {
  public accessToken: string = '';

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

  setAccessToken(newAccessToken: string) {
    this.accessToken = newAccessToken;
  }

  clearAccessToken() {
    this.accessToken = '';
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
      userStore.userId = userId;
      return userId;
    } catch (error) {
      // console.log(error);
      return true;
    }
  }
}

export const userStore = new UserStore();
