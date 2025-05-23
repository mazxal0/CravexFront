import axios from 'axios';

import { userStore } from '@/shared/stores/User.store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080', // или твой API
  withCredentials: true, // ВАЖНО для передачи cookies
});

// Подставляем accessToken в заголовок Authorization
api.interceptors.request.use((config) => {
  const token = userStore.accessToken;
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

    // Пропускаем, если это не 401 или уже повторяли запрос
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Запрос на обновление токена
      const refreshResponse = await api.post(
        process.env.NEXT_PUBLIC_API_URL_AUTH, // Убедитесь, что это "/auth/auth"
      );
      const newAccessToken = refreshResponse.data.accessToken; // Исправлено поле!

      // Обновляем токен в хранилище
      userStore.setAccessToken(newAccessToken);

      // Повторяем исходный запрос с новым токеном
      const newConfig = {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      };
      return api.request(newConfig);
    } catch (refreshError) {
      // Если обновление не удалось - разлогиниваем
      userStore.clearAccessToken();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  },
);

export default api;
