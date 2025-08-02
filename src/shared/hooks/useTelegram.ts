'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';

export interface TelegramInitData {
  user: {
    id: number;
    first_name: string;
    username?: string;
    photo_url?: string;
  };
  auth_date: number;
  hash: string;
}

export function useTelegramWebAppData(): TelegramInitData | null {
  const [data, setData] = useState<TelegramInitData | null>(null);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;

    tg.ready();
    setData(tg.initDataUnsafe as TelegramInitData);
  }, []);

  return data;
}

// hooks/useTelegramAutoAuth.tsx

export function useTelegramAutoAuth() {
  const router = useRouter();
  const [tried, setTried] = useState(false);
  const { mutate, isPending, error } = useMutationRequest({
    defaultApiUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth/telegram`,
    method: 'post',
  });

  useEffect(() => {
    if (tried) return;
    if (typeof window === 'undefined') return; // ① guard SSR

    const init = async () => {
      try {
        const { default: WebApp } = await import('@twa-dev/sdk'); // ② dynamic import
        WebApp.ready(); // ③ init SDK

        const data = WebApp.initData;
        if (!data) {
          return;
        }

        setTried(true);
        mutate(
          { data: { initData: WebApp.initData } },
          {
            onSuccess: (data) => {
              rootStore.userStore.accessToken = data.accessToken;
              rootStore.userStore.userId = data.userId;
              router.push(`/account/assets/${data.userId}`, { scroll: false });
            },
            onError: (err: any) => {},
          },
        );
      } catch (e) {
        console.log(e);
      }
    };

    init();
  }, [tried, mutate, router]);

  return { isPending, error };
}

//
// export function useTelegramAutoAuth(setErr: (state: string) => void) {
//   const router = useRouter();
//   const [tried, setTried] = useState(false);
//
//   const { mutate, isPending, error } = useMutationRequest<
//     unknown,
//     { initData: string }
//   >({
//     defaultApiUrl: TELEGRAM_AUTH_URL,
//     method: 'post',
//     config: { headers: { 'Content-Type': 'application/json' } },
//   });
//
//   useEffect(() => {
//     const tg = (window as any).Telegram?.WebApp;
//     setErr('OQPWEQWE');
//     if (!tg || tried) return;
//     setErr('Telegram Init');
//     const raw = tg.initData;
//     if (!raw) return;
//
//     setTried(true);
//
//     mutate(
//       { data: { initData: raw } },
//       {
//         onSuccess: () => {
//           router.replace('/account/assets');
//         },
//         onError: (err: any) => {
//           // можно здесь также fallback на OAuth, если нужно
//         },
//       },
//     );
//   }, [tried, mutate, router]);
//
//   return { isPending, error };
// }
