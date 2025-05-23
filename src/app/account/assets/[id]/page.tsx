'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import styles from './page.module.scss';

import { Button } from '@/components/ui';
import { WalletsPanel } from '@/shared/components';
import { userStore } from '@/shared/stores/User.store';

export default function Assets() {
  const params = useParams() as Record<string, string>;

  useEffect(() => {
    const { id } = params;
    userStore.userId = id;
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.top_part}>
        <h2 className={styles.text_heading}>Your Wallets</h2>
        <div className={styles.buttons_container}>
          <Button formatType={'outline'} className={styles.button}>
            Control
          </Button>
          <Button className={styles.button}>Add</Button>
        </div>
      </div>
      <WalletsPanel />
    </div>
  );
}
