'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';

import styles from './page.module.scss';

import { Button, CodeInput, ErrorText } from '@/components/ui';
import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { saveToStorage } from '@/shared/utils';

interface VerificationResponse {
  accessToken: string;
  message?: string;
}

interface VerificationRequest {
  code: string;
  userId: string | null;
}

export default function VerificationPage() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const encodedLink = searchParams.get('tg_link');
  const telegramLink = encodedLink ? decodeURIComponent(encodedLink) : null;
  const requires2FA = searchParams.get('requires2FA');

  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  const savedSeconds =
    typeof window !== 'undefined'
      ? parseInt(localStorage.getItem('timerToSending') || '0', 10)
      : 0;

  const initialExpiry = new Date();
  initialExpiry.setSeconds(
    initialExpiry.getSeconds() + (savedSeconds > 0 ? savedSeconds : 60),
  );

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: initialExpiry,
    autoStart: savedSeconds > 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('timerToSending', seconds.toString());
    }
  }, [seconds]);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('userId');
    if (stored) {
      setUserId(JSON.parse(stored));
    }
  }, []);

  const { mutate } = useMutationRequest<
    VerificationResponse,
    VerificationRequest
  >({
    defaultApiUrl: process.env.NEXT_PUBLIC_API_URL_VERIFICATION_TO_TG_CODE,
    method: 'post',
  });

  const { mutate: sendTgCode } = useMutationRequest({
    defaultApiUrl: process.env.NEXT_PUBLIC_API_URL_SEND_CODE_TO_TG_BOT,
    method: 'post',
  });

  const onClick = () => {
    sendTgCode({ data: { userId } });
    const nextExpiry = new Date();
    nextExpiry.setSeconds(nextExpiry.getSeconds() + 60);
    restart(nextExpiry, true);
  };

  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const onVerification = async (code: string) => {
    mutate(
      {
        data: { userId, code },
      },
      {
        onSuccess: async ({ accessToken }) => {
          rootStore.userStore.accessToken = accessToken;
          saveToStorage('userId', userId || '');
          push(`./../account/assets/${userId}`);
        },
        onError: async (error) => {
          console.log(error);

          const { message } = error.response?.data || {
            message: 'Unknown error',
          };
          setError(message || 'Unknown error');
        },
      },
    );
  };

  if (!telegramLink) {
    return <div>Telegram link not provided</div>;
  }

  if (!mounted)
    return (
      <div className={styles.page}>
        <div className={styles.heading}>
          <h2>
            Ваш аккаунт не привязан к телеграм аккаунту, перейдите в бота и
            привяжите
          </h2>
        </div>
        <div>
          <CodeInput
            classname={styles.codeInput}
            onComplete={onVerification}
            extendedOnClick={() => setError('')}
          />
        </div>
        <div className={styles.button_send_code}>
          <a href={telegramLink} target="_blank" rel="noopener noreferrer">
            <Button className={styles.button} onClick={onClick}>
              {!requires2FA
                ? 'Отправить код в телеграм бота'
                : 'Повторно отправить код'}
            </Button>
          </a>
        </div>
      </div>
    );

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
        <CodeInput
          classname={styles.codeInput}
          onComplete={onVerification}
          extendedOnClick={() => setError('')}
        />
      </div>
      <div className={styles.error_text}>
        {error && <ErrorText>{error}</ErrorText>}
      </div>
      <div className={styles.button_send_code}>
        {!requires2FA ? (
          <a href={telegramLink} target="_blank" rel="noopener noreferrer">
            <Button className={styles.button} onClick={onClick}>
              {!requires2FA
                ? 'Отправить код в телеграм бота'
                : 'Повторно отправить код'}
            </Button>
          </a>
        ) : (
          <Button
            className={styles.button}
            onClick={onClick}
            type={'button'}
            disabled={isRunning}
          >
            {isRunning
              ? `Ждите… ${formatted}`
              : 'Отправить код в телеграм бота'}
          </Button>
        )}
      </div>
    </div>
  );
}
