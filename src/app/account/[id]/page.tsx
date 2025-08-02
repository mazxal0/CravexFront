'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTimer } from 'react-timer-hook';

import styles from './page.module.scss';

import { userSchema } from '@/app/account/[id]/schems/userSchema';
import { Button, Checkbox, ErrorText, Input } from '@/components/ui';
import { OtherSpinner } from '@/components/ui/Spinner/Spinner';
import api from '@/lib/axios';
import { useMutationRequest, useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { UserType, UserTypeGet } from '@/shared/types/User.types';

function Account() {
  const { isLoading, data } = useQueryRequest<UserTypeGet>({
    nameOfCache: `user-data-${rootStore.userStore.userId}`,
    apiUrl: process.env.NEXT_PUBLIC_API_URL_GET_ME,
    additionQueryFn: async (data: UserTypeGet) => {
      reset({
        username: data.username,
        email: data.email,
        telegram: data.telegramUser?.telegramUsername || '',
      });
    },
  });

  useEffect(() => {
    reset({
      username: data?.username,
      email: data?.email,
      telegram: data?.telegramUser?.telegramUsername || '',
    });
  }, []);

  const { mutate } = useMutationRequest({
    method: 'post',
  });

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState,
    setError,
    getValues,
  } = useForm<UserType>({
    mode: 'onChange',
    resolver: zodResolver(userSchema),
  });

  const formValues = watch();

  const onClick = (data: UserType) => {
    mutate(
      {
        apiUrl: `${process.env.NEXT_PUBLIC_API_CHANGE_USER_DATA}/${rootStore.userStore.userId}`,
        data,
      },
      {
        onSuccess: async (data) => {
          reset({
            telegram: data.telegramUser?.telegramUsername || '',
            ...data,
          });
        },
        onError: async (error) => {
          setError('root', {
            type: 'server',
            message: error.response?.data.message,
          });
        },
      },
    );
  };

  const fifteenMinutesFromNow = new Date();
  fifteenMinutesFromNow.setMinutes(fifteenMinutesFromNow.getMinutes() + 15);

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: fifteenMinutesFromNow,
    autoStart: false,
  });

  // Загрузка из localStorage (если хотим «память» между перезагрузками)
  useEffect(() => {
    const ts = localStorage.getItem('lastVerifyEmail');
    if (ts) {
      const prev = new Date(parseInt(ts, 10));
      restart(prev, true);
    }
  }, [restart]);

  const handleVerifyEmail = useCallback(async () => {
    // если всё ещё идёт отсчёт — игнорируем клик
    if (isRunning) return;

    try {
      const url = process.env.NEXT_PUBLIC_API_SEND_VERIFICATION_EMAIL!;
      const { email, username } = getValues(); // ваш getValues из useForm
      await api.get(url, {
        params: { username, email, user_id: rootStore.userStore.userId },
      });

      // запускаем новый отсчёт 15 минут
      const nextExpiry = new Date();
      nextExpiry.setSeconds(nextExpiry.getSeconds() + 15 * 60);
      restart(nextExpiry, true);

      // сохраняем метку в localStorage
      localStorage.setItem('lastVerifyEmail', `${nextExpiry.getTime()}`);
    } catch (err) {
      console.error(err);
    }
  }, [isRunning, restart, getValues]);

  // Формат MM:SS
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (isLoading) {
    return (
      <div className={styles.page}>
        <OtherSpinner />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit(onClick)} className={styles.form}>
        <h2>Your Profile</h2>

        <Input
          {...register('username', { required: true })}
          label={'username'}
          value={formValues.username || ''}
          formatSize={'sm'}
        />
        {formState.errors.username && (
          <ErrorText>{formState.errors.username.message}</ErrorText>
        )}
        <div className={styles.input_button_container}>
          <Input
            {...register('email', { required: true })}
            label={'email'}
            value={formValues.email || ''}
            formatSize={'sm'}
            disabled
          />
          {/*<Button formatSize={'sm'}>Сменить</Button>*/}
        </div>
        {formState.errors.email && (
          <ErrorText>{formState.errors.email.message}</ErrorText>
        )}
        <div className={styles.input_button_container}>
          <Input
            {...register('telegram', { required: true })}
            label={'telegram'}
            value={formValues.telegram || ''}
            formatSize={'sm'}
            disabled
          />
          {/*<Button formatSize={'sm'}>Сменить</Button>*/}
        </div>
        <div className={styles.checkbox_container}>
          <Checkbox
            disabled
            checked={!!data?.isEmailVerified}
            label={`2-FA ${data?.isEmailVerified ? 'active' : 'disactive'}`}
          />
          {!data?.isEmailVerified && (
            <Button
              className={styles.custom_button}
              onClick={handleVerifyEmail}
              disabled={isRunning}
            >
              {!isRunning ? 'Подтвердить почту' : `Подождите ${formatted}`}
            </Button>
          )}
        </div>
        <div className={styles.bottom_container}>
          <Button formatSize={'md'} type={'submit'}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default observer(Account);
