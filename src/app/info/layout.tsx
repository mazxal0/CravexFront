import { ReactNode } from 'react';

import styles from './layout.module.scss';

import { Footer, HorizontalNavBar } from '@/shared/components';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <HorizontalNavBar />
      <div className={styles.page_layout}>{children}</div>
      <Footer />
    </>
  );
}
