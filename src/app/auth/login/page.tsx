'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { Button, Input } from '@/components/ui';
import { useAuth } from '@/shared/hooks/UseAuth';
import { rootStore } from '@/shared/stores';
import { UserLogin } from '@/shared/types/User.types';

export default function Login() {
  const { register, setError, handleSubmit } = useForm<UserLogin>({
    mode: 'onChange',
  });

  useEffect(() => {
    const getUserId = setTimeout(async () => {
      const userId = await rootStore.userStore.getUserId();
      if (userId) {
        router.push(`/../../account/assets/${userId}`);
      }
    }, 500);

    return () => clearTimeout(getUserId);
  }, []);
  const router = useRouter();
  const { setLogin } = useAuth();
  const onRegistrationUser = async (data: UserLogin) => {
    const userId = await setLogin(data);
    router.push(`/../../account/assets/${userId}`);
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
          />
          <Input
            className={styles.input_search}
            label={'password'}
            {...register('password', {
              required: true,
            })}
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
