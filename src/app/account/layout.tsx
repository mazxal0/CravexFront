import { ReactNode } from 'react';

import styles from './layout.module.scss';

import { Header } from '@/shared/components';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className={styles.layout}>{children}</div>
    </>
  );
}
