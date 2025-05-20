'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { MainLogo } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/shared/hooks/UseAuth';
import { UserLogin } from '@/shared/types/User.types';

export default function Login() {
  const { register, setError, handleSubmit } = useForm<UserLogin>({
    mode: 'onChange',
  });
  const router = useRouter();
  const { setLogin } = useAuth<UserLogin>();
  const onRegistrationUser = async (data: UserLogin) => {
    const userId = await setLogin(data);
    router.push(`/../../account/assets/${userId}`);
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.left_part}
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
          <h2 className={styles.heading}>Sign In</h2>
          <Input
            className={styles.input_search}
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
            // onClick={() => console.log('opa')}
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

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 3,
        }}
        className={styles.right_part}
      >
        <h1>Your finance, your control</h1>
        <h1 className={styles.down_heading}>CraveX EcoSystem</h1>
        <MainLogo width={100} height={100} />
      </motion.div>
    </div>
  );
}
