'use client';
import axios from 'axios';

import { rootStore } from '@/shared/stores';

// Флаг для предотвращения множественных запросов на обновление токена
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true,
  timeout: 5000,
});

// Подставляем accessToken в заголовок Authorization
api.interceptors.request.use((config) => {
  const token = rootStore.userStore.accessToken;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Обрабатываем 401 для обновления токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshResponse = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const newAccessToken = refreshResponse.data.accessToken;

        rootStore.userStore.accessToken = newAccessToken;
        processQueue(null, newAccessToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError: any) {
        // Логируем ошибку только в development
        if (process.env.NODE_ENV === 'development') {
          // console.error('Ошибка обновления токена:', {
          //   message: refreshError.message,
          //   status: refreshError.response?.status,
          //   data: refreshError.response?.data,
          // });
        }

        processQueue(refreshError);
        rootStore.userStore.clearAccessToken();

        // Перенаправляем только для страниц, начинающихся с /account/
        if (
          typeof window !== 'undefined' &&
          window.location.pathname.startsWith('/account/')
        ) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Перенаправление на страницу логина');
          }
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Логируем другие ошибки только в development
    if (process.env.NODE_ENV === 'development') {
      // console.error('Ошибка API:', {
      //   message: error.message,
      //   status: error.response?.status,
      //   url: error.config?.url,
      // });
    }
    return Promise.reject(error);
  },
);

export default api;
