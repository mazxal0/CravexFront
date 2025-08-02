'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';
import { LoginSchema, loginSchema } from './schems/loginSchema';

import { Button, Input, PasswordInput, Spinner } from '@/components/ui';
import { OAuthContainer } from '@/shared/components';
import { useMutationRequest, useTelegramAutoAuth } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { saveToStorage } from '@/shared/utils';

function LoginPage() {
  const router = useRouter();

  const { isPending: isPendingTelegramAuthAuthorization } =
    useTelegramAutoAuth();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  // Email/password login mutation
  const { mutate: loginEmail, isPending: loginIsPending } = useMutationRequest<
    { userId: string; telegramLink: string; requires2FA: boolean },
    LoginSchema
  >({
    defaultApiUrl: process.env.NEXT_PUBLIC_API_URL_LOGIN!,
    method: 'post',
  });

  const onLoginEmail = (data: LoginSchema) => {
    loginEmail(
      { data },
      {
        onSuccess: ({ userId, telegramLink, requires2FA }) => {
          rootStore.userStore.userId = userId;
          const link = encodeURIComponent(telegramLink);
          router.push(
            `verification?tg_link=${link}&requires2FA=${requires2FA}`,
          );
        },
        onError: (err) => {
          setError('root', {
            type: 'server',
            message: 'Login failed',
          });
        },
      },
    );
  };

  const { mutate: authRegistration, isPending: authRegistrationIsPending } =
    useMutationRequest({
      defaultApiUrl: process.env.NEXT_PUBLIC_API_URL_AUTH,
      method: 'post',
    });
  useEffect(() => {
    const userId = rootStore.userStore.userId;
    authRegistration(
      { data: {} },
      {
        onSuccess: async (data) => {
          if (userId || data.userId)
            saveToStorage('userId', userId || data.userId);
          saveToStorage('accessToken', data.accessToken);
          router.push(`./../account/assets/${userId}`);
        },
      },
    );
  }, []);

  if (
    loginIsPending ||
    authRegistrationIsPending ||
    isPendingTelegramAuthAuthorization
  ) {
    return <Spinner />;
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(onLoginEmail)}
        noValidate
      >
        <h2 className={styles.heading}>Sign In</h2>

        <Input
          className={styles.input_search}
          formatSize="sm"
          label="Email"
          {...register('email')}
          value={watch('email') || ''}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <PasswordInput
          className={styles.input_search}
          formatSize="sm"
          label="Password"
          {...register('password')}
          value={watch('password') || ''}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        {errors.root && <p className={styles.error}>{errors.root.message}</p>}

        <Button
          className={styles.form_button}
          formatSize="sm"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Login
        </Button>

        <p className={styles.text_login_in}>
          Don’t have an account yet?{' '}
          <Link href="registration" className={styles.link}>
            Sign up
          </Link>
        </p>

        {/* OAuth buttons for other providers (including Telegram) */}
        <OAuthContainer />
      </form>
    </motion.div>
  );
}

export default observer(LoginPage);
