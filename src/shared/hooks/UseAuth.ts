'use client';
import api from '@/lib/axios';
import { userStore } from '@/shared/stores/User.store';
import { UserLogin, UserRegistration } from '@/shared/types/User.types';

export const useAuth = () => {
  async function setRegistration(data: UserRegistration) {
    try {
      const api_url = process.env.NEXT_PUBLIC_API_URL_REGISTRATION;
      const { email, password, username, confirmPassword } = data;
      const response = await api.post(api_url, {
        email,
        username,
        password,
        confirmPassword,
      });

      const { userId, success, accessToken } = response.data;

      if (!success) throw new Error('something was wrong :(');

      userStore.setAccessToken(accessToken);

      return userId;
    } catch (error) {
      // console.log(error);
      return true;
    }
  }

  async function setLogin(data: UserLogin) {
    try {
      const api_url = process.env.NEXT_PUBLIC_API_URL_LOGIN;
      const { email, password } = data;
      const response = await api.post(api_url, {
        email,
        password,
      });

      const { userId, success, accessToken } = response.data;

      if (!success) throw new Error('something was wrong :(');
      userStore.setAccessToken(accessToken);
      return userId;
    } catch (error) {
      // console.log(error);
      return true;
    }
  }

  async function auth() {
    try {
      const api_url = process.env.NEXT_PUBLIC_API_URL_AUTH;
      const response = await api.post(api_url);
      const { accessToken, success, id } = response.data;
      if (!success) throw new Error('something was wrong :(');
      userStore.userId = id;
      userStore.setAccessToken(accessToken);
      // window.location.href = `/account/assets/${id}`;
      return false;
    } catch (error) {
      // console.log(error);
      return true;
    }
  }

  return { setRegistration, setLogin, auth };
};
