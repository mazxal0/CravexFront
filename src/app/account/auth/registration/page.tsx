'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { MainLogo } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/shared/hooks/UseAuth';
import { UserRegistration } from '@/shared/types/User.types';

export default function Registration() {
  const { register, setError, handleSubmit } = useForm<UserRegistration>({
    mode: 'onChange',
  });
  const router = useRouter();
  const { setRegistration } = useAuth<UserRegistration>();
  const onRegistrationUser = async (data: UserRegistration) => {
    const userId = await setRegistration(data);
    router.push(`/../../account/assets/${userId}`);
  };

  return (
    <div className={styles.page}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 3,
        }}
        className={styles.left_part}
      >
        <h1>Welcome to</h1>
        <h1 className={styles.down_heading}>CraveX EcoSystem</h1>
        <MainLogo width={100} height={100} />
      </motion.div>
      <motion.div
        className={styles.right_part}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
        }}
      >
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
