'use client';

import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { Input } from '@/components/ui';
import { OtherSpinner } from '@/components/ui/Spinner/Spinner';
import { useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { UserType, UserTypeGet } from '@/shared/types/User.types';

export default function Account() {
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

  const {
    handleSubmit,
    register,
    reset,
    watch, // Добавляем watch для отслеживания значений
  } = useForm<UserType>({
    mode: 'onChange',
  });

  // Отслеживаем значения формы
  const formValues = watch();

  const onClick = (data: UserType) => {
    console.log(data);
  };

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
        <Input
          {...register('username', { required: true })}
          label={'username'}
          value={formValues.username || ''}
          topLevelOfLabel={67}
          bottomLevelOfLabel={40}
        />
        <Input
          {...register('email', { required: true })}
          label={'email'}
          value={formValues.email || ''}
          topLevelOfLabel={67}
          bottomLevelOfLabel={40}
          disabled
        />
        <Input
          {...register('telegram', { required: true })}
          label={'telegram'}
          value={formValues.telegram || ''}
          topLevelOfLabel={67}
          bottomLevelOfLabel={40}
          disabled
        />
        {/* ... остальные кнопки ... */}
      </form>
    </div>
  );
}
