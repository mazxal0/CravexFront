'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import styles from './page.module.scss';

import { Button, Input } from '@/components/ui';
import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import {
  UserRegistration,
  UserRegistrationRequestGet,
} from '@/shared/types/User.types';

export default function Registration() {
  const { register, setError, handleSubmit, watch } = useForm<UserRegistration>(
    {
      mode: 'onChange',
    },
  );

  // const {} = useLocalStorage<string>({ defaultValue: '', key: 'userId' });

  const { mutate, isPending } = useMutationRequest<
    UserRegistrationRequestGet,
    UserRegistration
  >({
    apiUrl: process.env.NEXT_PUBLIC_API_URL_REGISTRATION,
    method: 'post',
  });

  const router = useRouter();
  const onRegistrationUser = async (data: UserRegistration) => {
    mutate(data, {
      onSuccess: async ({
        telegramLink,
        userId,
      }: UserRegistrationRequestGet) => {
        const encodedLink = encodeURIComponent(telegramLink);
        rootStore.userStore.userId = userId;
        router.push(`./verification?tg_link=${encodedLink}`);
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
          <h2 className={styles.heading}>Sign Up</h2>
          <Input
            className={styles.input_search}
            label={'email'}
            {...register('email', {
              required: true,
            })}
            value={watch().email || ''}
          />
          <Input
            className={styles.input_search}
            label={'username'}
            {...register('username', {
              required: true,
            })}
            value={watch().username || ''}
          />
          <Input
            className={styles.input_search}
            label={'password'}
            {...register('password', {
              required: true,
            })}
            value={watch().password || ''}
          />
          <Input
            className={styles.input_search}
            label={'confirm password'}
            {...register('confirmPassword', {
              required: true,
            })}
            value={watch().confirmPassword || ''}
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
