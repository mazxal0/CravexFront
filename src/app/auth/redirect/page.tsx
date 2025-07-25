'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { tgOAuth } from './tgOAuth';

import { Spinner } from '@/components/ui';

export default function OAuthRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isHandled, setIsHandled] = useState(false);

  useEffect(() => {
    // Предотвращаем повторную авторизацию на Fast Refresh
    if (isHandled) return;

    const provider = searchParams.get('oauth');

    if (provider === 'tg') {
      tgOAuth()
        .then((id) => {
          router.push(`/account/${id}`);
        })
        .catch((err) => {
          console.error('Ошибка Telegram OAuth:', err);
          router.push('./login');
        })
        .finally(() => {
          setIsHandled(true);
        });
    }
  }, [searchParams, router, isHandled]);

  return (
    <div>
      <Spinner />
      Завершаем авторизацию через {searchParams.get('oauth')}...
    </div>
  );
}
