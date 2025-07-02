'use client';

import Link from 'next/link';

import styles from './page.module.scss';

import { Button } from '@/components/ui';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.h1}>CraveX</h1>
        <p className={styles.p}>
          The best aggregator of crypto assets in one place! It'll be your
          amazing choice
        </p>
      </div>

      <Link className={styles.button_container} href={'/auth/registration'}>
        <Button className={styles.button_start}>Начать</Button>
      </Link>
    </div>
  );
}
