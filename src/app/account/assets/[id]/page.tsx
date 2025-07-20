'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import clsx from 'clsx';

import styles from './page.module.scss';

import { Button } from '@/components/ui';
import api from '@/lib/axios';
import { WalletsPanel } from '@/shared/components';
import { useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { WalletPreviewType } from '@/shared/types/Wallet.types';

export default function Assets() {
  const params = useParams() as Record<string, string>;
  const { id } = params;
  useEffect(() => {
    rootStore.userStore.userId = id;
  }, []);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQueryRequest<WalletPreviewType[]>({
    nameOfCache: `wallets-user-${id}`,
    apiUrl: process.env.NEXT_PUBLIC_API_URL_GET_ALL_WALLETS,
  });

  const onAddWallet = async () => {
    const response = await api.post(process.env.NEXT_PUBLIC_API_ADD_NEW_WALLET);
    const newWallet = response.data;
    queryClient.setQueryData<WalletPreviewType[]>(
      [
        `wallets-user-${id}`,
        process.env.NEXT_PUBLIC_API_URL_GET_ALL_WALLETS,
        {},
      ],
      (oldData) => (oldData ? [...oldData, newWallet] : [newWallet]),
    );
  };

  const deleteWallet = async (walletId: string) => {
    await api.delete(
      `${process.env.NEXT_PUBLIC_API_DELETE_WALLET}/${walletId}`,
    );

    queryClient.setQueryData<WalletPreviewType[]>(
      [
        `wallets-user-${id}`,
        process.env.NEXT_PUBLIC_API_URL_GET_ALL_WALLETS,
        {},
      ],
      (oldData) =>
        oldData ? oldData.filter((wallet) => wallet.id !== walletId) : oldData,
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.top_part}>
        <h2 className={styles.text_heading}>Your Wallets</h2>
        <div className={clsx(styles.desktop, styles.buttons_container)}>
          <Button formatType={'outline'} className={styles.button}>
            Control
          </Button>
          <Button className={styles.button} onClick={onAddWallet}>
            Add
          </Button>
        </div>
      </div>
      <WalletsPanel
        wallets={data}
        isLoading={isLoading}
        deleteWallet={deleteWallet}
      />
      <div className={styles.mobile_buttons}>
        <div className={clsx(styles.mobile, styles.buttons_container)}>
          <Button formatType={'outline'} className={styles.button}>
            Control
          </Button>
          <Button className={styles.button} onClick={onAddWallet}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
