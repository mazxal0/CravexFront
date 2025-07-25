import api from '@/lib/axios';

export async function tgOAuth() {
  const hash = window.location.hash;
  if (!hash.startsWith('#tgAuthResult=')) {
    throw new Error('Некорректные данные от Telegram');
  }

  const encodedData = hash.replace('#tgAuthResult=', '');
  const jsonString = decodeURIComponent(atob(encodedData));
  const telegramData = JSON.parse(jsonString);

  const res = await api.post('/auth/telegram', telegramData); // ← напрямую, без { data: }
  console.log(res);
  const { accessToken, id } = res.data;
  console.log(accessToken, id);
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
  localStorage.setItem('userId', JSON.stringify(id));

  return id; // ожидается, что здесь { accessToken, id, ... }
}
