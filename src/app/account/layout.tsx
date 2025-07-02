'use client';
import React, { ReactNode, useEffect, useState } from 'react';

import styles from './layout.module.scss';

import { Spinner } from '@/components/ui';
import { Header } from '@/shared/components';

export default function AccountLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Spinner />;

  return (
    <>
      <Header />
      <div className={styles.layout}>{children}</div>
    </>
  );
}
