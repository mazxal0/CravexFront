'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './page.module.scss';

import { Button, CodeInput } from '@/components/ui';
import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { saveToStorage } from '@/shared/utils';

export default function VerificationPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const encodedLink = searchParams.get('tg_link');
  const telegramLink = encodedLink ? decodeURIComponent(encodedLink) : null;
  const requires2FA = searchParams.get('requires2FA');

  const [isSendCode, setIsSendCode] = useState<boolean>(false);

  useEffect(() => {
    const isSending = Boolean(searchParams.get('is_send_code'));
    setIsSendCode(isSending);
  }, []);

  const { data, mutate, isPending } = useMutationRequest<{
    accessToken: string;
  }>({
    apiUrl: process.env.NEXT_PUBLIC_API_URL_VERIFICATION_TO_TG_CODE,
    method: 'post',
  });

  const onClick = () => {
    setIsSendCode(true);
    const params = new URLSearchParams(searchParams);
    params.set('is_send_code', 'true');
    replace(`${pathname}?${params.toString()}`);
  };

  const onVerification = async (code: string) => {
    mutate(
      { userId: rootStore.userStore.userId, code },
      {
        onSuccess: async ({ accessToken }) => {
          rootStore.userStore.accessToken = accessToken;
          saveToStorage('userId', rootStore.userStore.userId || '');
          push(`./../account/assets/${rootStore.userStore.userId}`);
        },
      },
    );
  };

  if (!telegramLink) {
    return <div>Telegram link not provided</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h2>
          {!requires2FA
            ? 'Ваш аккаунт не привязан к телеграм аккаунту, перейдите в бота и привяжите'
            : 'Бот отправил код, введите его ниже'}
        </h2>
      </div>
      <div>
        <CodeInput classname={styles.codeInput} onComplete={onVerification} />
      </div>
      <div className={styles.button_send_code}>
        <a href={telegramLink} target="_blank" rel="noopener noreferrer">
          <Button className={styles.button} onClick={onClick}>
            {!requires2FA || !isSendCode
              ? 'Отправить код в телеграм бота'
              : 'Повторно отправить код'}
          </Button>
        </a>
      </div>
    </div>
  );
}
