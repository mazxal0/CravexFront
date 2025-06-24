'use client';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import styles from './layout.module.scss';

import { Spinner } from '@/components/ui';
import { Header } from '@/shared/components';
import { useAuth } from '@/shared/hooks';

export default function AccountLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { auth } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isError = await auth();
        if (isError) {
          redirect('auth/login');
        }
      } catch (_) {
        redirect('auth/login');
      } finally {
        setIsLoaded(true);
      }
    };
    checkAuth();
  }, [auth]);

  if (!isLoaded) return <Spinner />;

  return (
    <>
      <Header />
      <div className={styles.layout}>{children}</div>
    </>
  );
}
