'use client';

import { useCallback } from 'react';

import { TelegramIcon } from '@/components/icons';
import { ButtonOAuth } from '@/shared/components/common/OAuth/buttonOAuth';

export const OAuthTelegram = () => {
  const handleLogin = useCallback(() => {
    const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID || '7282717059';
    const returnTo = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/redirect?oauth=tg`, // Страница для обработки авторизации
    );
    console.log('OPASWW', returnTo);
    const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${process.env.NEXT_PUBLIC_FRONTEND_URL}&return_to=${returnTo}&embed=0`;

    window.location.href = url;
  }, []);

  return (
    <ButtonOAuth onClick={handleLogin} aria-label="Login with Telegram">
      <TelegramIcon color="#b8b6b6" width={30} height={30} />
    </ButtonOAuth>
  );
};
