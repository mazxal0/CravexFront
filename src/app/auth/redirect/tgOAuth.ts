import api from '@/lib/axios';
export async function tgOAuth() {
  const hash = window.location.hash;
  if (!hash.startsWith('#tgAuthResult=')) {
    throw new Error('Некорректные данные от Telegram');
  }

  const encodedData = hash.slice('#tgAuthResult='.length);

  // 1) Decode base64
  const b64 = atob(encodedData);
  console.log('▶ base64→string:', b64);

  // 2) If Telegram actually URI‑encoded the JSON, decode it;
  //    otherwise skip this step.
  let jsonStr: string;
  try {
    jsonStr = decodeURIComponent(b64);
    console.log('▶ after decodeURIComponent:', jsonStr);
  } catch {
    jsonStr = b64;
  }

  // 3) Finally parse
  let telegramData;
  try {
    telegramData = JSON.parse(jsonStr);
  } catch (err) {
    console.error('Failed to parse Telegram data:', err, { b64, jsonStr });
    throw err;
  }

  // 4) Send to your backend
  const res = await api.post('/auth/telegram', telegramData);
  const { accessToken, id } = res.data;
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
  localStorage.setItem('userId', JSON.stringify(id));
  return id;
}
