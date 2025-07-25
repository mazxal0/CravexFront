interface UseTelegramReturn {
  tg: TelegramWebApp | undefined;
  initDataUnsafe: TelegramInitDataUnsafe | undefined;
  initData: string;
  isTelegram: boolean;
  userData: TelegramWebAppUser | undefined;
  authPayload: {
    id?: number;
    first_name?: string;
    username?: string;
    photo_url?: string;
    auth_date?: number;
    hash?: string;
  };
}

export const useTelegram = (): UseTelegramReturn | null => {
  if (typeof window === 'undefined' || !window.Telegram?.WebApp) return null;

  const tg = window.Telegram?.WebApp;
  const initDataUnsafe = tg?.initDataUnsafe;

  return {
    tg,
    initDataUnsafe,
    initData: tg?.initData,
    isTelegram: Boolean(tg),
    userData: initDataUnsafe?.user,
    authPayload: {
      id: initDataUnsafe?.user?.id,
      first_name: initDataUnsafe?.user?.first_name,
      username: initDataUnsafe?.user?.username,
      photo_url: initDataUnsafe?.user?.photo_url,
      auth_date: initDataUnsafe?.auth_date,
      hash: initDataUnsafe?.hash,
    },
  };
};
