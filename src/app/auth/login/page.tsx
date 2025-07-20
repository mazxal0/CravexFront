'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { LoginSchema, loginSchema } from '@/app/auth/login/schems/loginSchema';
import { Button, Input, PasswordInput } from '@/components/ui';
import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { UserLoginRequestGet } from '@/shared/types/User.types';
import { saveToStorage } from '@/shared/utils';

export default function Login() {
  const { register, setError, handleSubmit, watch, formState } =
    useForm<LoginSchema>({
      mode: 'onChange',
      resolver: zodResolver(loginSchema),
    });

  const router = useRouter();

  const { mutate } = useMutationRequest<UserLoginRequestGet, LoginSchema>({
    defaultApiUrl: `${process.env.NEXT_PUBLIC_API_URL_LOGIN}`,
    method: 'post',
  });

  const onRegistrationUser = async (data: LoginSchema) => {
    mutate(
      { data },
      {
        onSuccess: async ({ userId, telegramLink, requires2FA }) => {
          const telegramLinkEncodedLink = encodeURIComponent(telegramLink);
          rootStore.userStore.userId = userId;
          router.push(
            `./verification?tg_link=${telegramLinkEncodedLink}&requires2FA=${requires2FA}`,
          );
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  const { mutate: authReq } = useMutationRequest({
    defaultApiUrl: process.env.NEXT_PUBLIC_API_URL_AUTH,
    method: 'post',
  });
  useEffect(() => {
    const userId = rootStore.userStore.userId;
    authReq(
      { data: {} },
      {
        onSuccess: async (data) => {
          if (userId) saveToStorage('userId', userId);
          saveToStorage('accessToken', data.accessToken);
          router.push(`./../account/assets/${userId}`);
        },
      },
    );
  }, []);

  return (
    <div className={styles.page}>
      <motion.div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onRegistrationUser)}
          noValidate
        >
          <h2 className={styles.heading}>Sign In</h2>
          <Input
            className={styles.input_search}
            formatSize={'sm'}
            label={'email'}
            {...register('email', {
              required: true,
            })}
            value={watch().email || ''}
            // bottomLevelOfLabel={100}
            // topLevelOfLabel={-20}
          />
          <PasswordInput
            className={styles.input_search}
            formatSize={'sm'}
            label={'password'}
            {...register('password', {
              required: true,
            })}
            value={watch().password || ''}
          />

          {formState.errors.root && formState.errors.root.message}
          {formState.errors.email && formState.errors.email.message}
          {formState.errors.password && formState.errors.password.message}
          <Button
            className={styles.form_button}
            formatSize={'sm'}
            type={'submit'}
          >
            Login
          </Button>
          <p className={styles.text_login_in}>
            Don’t have an account yet?
            <Link href={'registration'} className={styles.link}>
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
