'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { registerSchema } from '@/app/auth/registration/register.schema';
import { Button, ErrorText, Input, PasswordInput } from '@/components/ui';
import { OAuthContainer } from '@/shared/components';
import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import {
  UserRegistration,
  UserRegistrationRequestGet,
} from '@/shared/types/User.types';
import { saveToStorage } from '@/shared/utils';

export const RegistrationForm = () => {
  const [isDisabledButtonRegistration, setIsDisabledButtonRegistration] =
    useState<boolean>(false);

  const { mutate: authReq } = useMutationRequest({
    defaultApiUrl: process.env.NEXT_PUBLIC_API_URL_AUTH,
    method: 'post',
  });
  useEffect(() => {
    setIsDisabledButtonRegistration(true);
    const userId = rootStore.userStore.userId;
    authReq(
      { data: {} },
      {
        onSuccess: async (data) => {
          if (userId) saveToStorage('userId', userId);
          saveToStorage('accessToken', data.accessToken);
          router.push(`./../account/assets/${userId}`);
        },
        onSettled: async () => {
          setIsDisabledButtonRegistration(false);
        },
      },
    );
  }, []);

  const {
    register,
    setError,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<UserRegistration>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutationRequest<
    UserRegistrationRequestGet,
    UserRegistration
  >({
    defaultApiUrl: process.env.NEXT_PUBLIC_API_URL_REGISTRATION,
    method: 'post',
  });

  const router = useRouter();
  const onRegistrationUser = async (data: UserRegistration) => {
    setIsDisabledButtonRegistration(true);
    mutate(
      { data },
      {
        onSuccess: async ({ userId, telegramLink }) => {
          const encodedLink = encodeURIComponent(telegramLink);
          rootStore.userStore.userId = userId;
          router.push(`./verification?tg_link=${encodedLink}`);
        },
        onError: async (error) => {
          setError('root', {
            type: 'server',
            message: error.response?.data.message,
          });
          setIsDisabledButtonRegistration(false);
        },
      },
    );
  };

  return (
    <div className={styles.page}>
      <motion.div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onRegistrationUser)}
          noValidate
        >
          <h2 className={styles.heading}>Sign Up</h2>
          <Input
            label={'email'}
            {...register('email', {
              required: true,
            })}
            value={watch().email || ''}
            formatSize={'sm'}
          />
          <Input
            label={'username'}
            {...register('username', {
              required: true,
            })}
            value={watch().username || ''}
            formatSize={'sm'}
          />
          <PasswordInput
            label={'password'}
            {...register('password', {
              required: true,
            })}
            value={watch().password || ''}
            formatSize={'sm'}
          />
          <PasswordInput
            label={'confirm password'}
            {...register('confirmPassword', {
              required: true,
            })}
            value={watch().confirmPassword || ''}
            formatSize={'sm'}
          />
          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
          {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}
          <Button
            disabled={isDisabledButtonRegistration}
            className={styles.form_button}
            type={'submit'}
          >
            Create Account
          </Button>
          <p className={styles.text_login_in}>
            Already have an account?
            <Link href={'login'} className={styles.link}>
              Login it
            </Link>
          </p>
          <OAuthContainer />
        </form>
      </motion.div>
    </div>
  );
};
