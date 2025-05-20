'use client';
import api from '@/lib/axios';
import { UserLogin, UserRegistration } from '@/shared/types/User.types';

export const useAuth = <TData extends UserRegistration & UserLogin>() => {
  async function setRegistration(data: TData) {
    try {
      const api_url = process.env.NEXT_PUBLIC_API_URL_REGISTRATION;
      const { email, password, username, confirmPassword } = data;
      const response = await api.post(api_url, {
        email,
        username,
        password,
        confirmPassword,
      });

      const { userId, success } = response.data;

      if (!success) throw new Error('something was wrong :(');

      return userId;
    } catch (error) {
      // console.log(error);
      return true;
    }
  }

  async function setLogin(data: TData) {
    try {
      const api_url = process.env.NEXT_PUBLIC_API_URL_LOGIN;
      const { email, password } = data;
      const response = await api.post(api_url, {
        email,
        password,
      });

      const { userId, success } = response.data;

      if (!success) throw new Error('something was wrong :(');

      return userId;
    } catch (error) {
      // console.log(error);
      return true;
    }
  }

  return { setRegistration, setLogin };
};
