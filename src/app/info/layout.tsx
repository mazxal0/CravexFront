import { ReactNode } from 'react';

import styles from './layout.module.scss';

import { HorizontalNavBar } from '@/shared/components'; // Импорт глобальных CSS здесь, в server-лейауте

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <HorizontalNavBar />
      <div className={styles.page_layout}>{children}</div>
    </>
  );
}
