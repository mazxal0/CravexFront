'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { Button, Input } from '@/components/ui';
import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { UserLoginRequestGet, UserLoginType } from '@/shared/types/User.types';

export default function Login() {
  const { register, setError, handleSubmit, watch } = useForm<UserLoginType>({
    mode: 'onChange',
  });

  // useEffect(() => {
  //   const getUserId = setTimeout(async () => {
  //     const userId = await rootStore.userStore.getUserId();
  //     if (userId) {
  //       router.push(`/../../account/assets/${userId}`);
  //     }
  //   }, 500);
  //
  //   return () => clearTimeout(getUserId);
  // }, []);
  const router = useRouter();

  const { mutate } = useMutationRequest<UserLoginRequestGet, UserLoginType>({
    apiUrl: `${process.env.NEXT_PUBLIC_API_URL_LOGIN}`,
    method: 'post',
  });

  const onRegistrationUser = async (data: UserLoginType) => {
    mutate(data, {
      onSuccess: async ({ userId, requires2FA, telegramLink }) => {
        const telegramLinkEncodedLink = encodeURIComponent(telegramLink);
        rootStore.userStore.userId = userId;
        router.push(
          `./verification?tg_link=${telegramLinkEncodedLink}&requires2FA=${requires2FA}`,
        );
      },
    });
  };

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
          />
          <Input
            className={styles.input_search}
            label={'password'}
            {...register('password', {
              required: true,
            })}
            value={watch().password || ''}
          />

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
