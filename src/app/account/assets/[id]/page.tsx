'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import styles from './page.module.scss';

import { Button } from '@/components/ui';
import api from '@/lib/axios';
import { WalletsPanel } from '@/shared/components';
import { rootStore } from '@/shared/stores';
import { userStore } from '@/shared/stores/User.store';

export default function Assets() {
  const params = useParams() as Record<string, string>;

  useEffect(() => {
    const { id } = params;
    userStore.userId = id;
  }, []);

  const onAddWallet = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ADD_NEW_WALLET);
    const response = await api.post(process.env.NEXT_PUBLIC_API_ADD_NEW_WALLET);
    const newWallet = response.data;
    rootStore.walletsPageManagerStore.wallets.push(newWallet);
  };

  return (
    <div className={styles.page}>
      <div className={styles.top_part}>
        <h2 className={styles.text_heading}>Your Wallets</h2>
        <div className={styles.buttons_container}>
          <Button formatType={'outline'} className={styles.button}>
            Control
          </Button>
          <Button className={styles.button} onClick={onAddWallet}>
            Add
          </Button>
        </div>
      </div>
      <WalletsPanel />
    </div>
  );
}
