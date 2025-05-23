'use client';
import { ReactNode, useEffect } from 'react';

import styles from './layout.module.scss';

import { Header } from '@/shared/components';
import { useAuth } from '@/shared/hooks';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { auth } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isError = await auth();
        if (isError) {
          window.location.href = 'account/auth/login';
        }
      } catch (error) {
        // console.error('Auth error:', error); // Шаг 3: Логирование ошибок
        window.location.href = '/login';
      }
    };
    checkAuth();
  }, [auth]);
  return (
    <>
      <Header />
      <div className={styles.layout}>{children}</div>
    </>
  );
}
