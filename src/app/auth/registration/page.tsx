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
import { UserRegistration } from '@/shared/types/User.types';

export default function Registration() {
  const { register, setError, handleSubmit } = useForm<UserRegistration>({
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
  const { setRegistration } = useAuth();
  const onRegistrationUser = async (data: UserRegistration) => {
    const userId = await setRegistration(data);
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
          <h2 className={styles.heading}>Sign Up</h2>
          <Input
            className={styles.input_search}
            label={'email'}
            {...register('email', {
              required: true,
            })}
          />
          <Input
            className={styles.input_search}
            label={'username'}
            {...register('username', {
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
          <Input
            className={styles.input_search}
            label={'confirm password'}
            {...register('confirmPassword', {
              required: true,
            })}
          />

          <Button
            className={styles.form_button}
            // onClick={() => console.log('opa')}
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
        </form>
      </motion.div>
    </div>
  );
}
