'use client';
import { observer } from 'mobx-react-lite';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import clsx from 'clsx';

import styles from './AssetsPanel.module.scss';

import { Button } from '@/components/ui';
import { AssetCard } from '@/shared/components';
import { rootStore } from '@/shared/stores';

export const AssetsPanel = observer(() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchDataStart = async () => {
      await rootStore.walletActivityStore.getWalletAssets(
        rootStore.userStore.walletId,
      );
    };
    fetchDataStart();
  }, []);

  const addNewCoin = async () => {
    rootStore.modalStore.isOpenAddingNewAsset = true;
    const params = new URLSearchParams(searchParams.toString());
    params.set('add_coin_page', '1');
    router.push(`${pathname}?${params.toString()}`);
    rootStore.modalStore.currentPageAddingCoin = '1';
  };

  return (
    <div className={styles.main_part}>
      <div className={styles.assets_container}>
        {rootStore.walletActivityStore.walletAssets.map((asset, index) => (
          <AssetCard
            key={asset.coinId}
            title={asset.coinName}
            price={asset.price}
            changing={asset.changing}
            ticket={asset.coinSymbol}
            amount={asset.amount}
            logoUrl={asset.logoUrl}
            className={clsx(
              index !== 0 && styles.border_top,
              rootStore.currentActivityStore.currentAsset.coinId ===
                asset.coinId && styles.active,
            )}
            onClick={() =>
              (rootStore.currentActivityStore.currentAsset = asset)
            }
          />
        ))}
      </div>
      <div className={styles.button_container}>
        <Button onClick={addNewCoin}>New asset</Button>
      </div>
    </div>
  );
});
