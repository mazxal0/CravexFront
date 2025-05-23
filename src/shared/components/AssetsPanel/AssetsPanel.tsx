'use client';
import { observer } from 'mobx-react-lite';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import clsx from 'clsx';

import styles from './AssetsPanel.module.scss';

import { Button } from '@/components/ui';
import { AssetCard } from '@/shared/components';
import { rootStore } from '@/shared/stores';
import { modalStore } from '@/shared/stores/ModalStore';

export const AssetsPanel = observer(({ walletId }: { walletId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchDataStart = async () => {
      await rootStore.walletActivityStore.getWalletAssets(walletId);
    };
    fetchDataStart();
  }, []);

  const addNewCoin = async () => {
    modalStore.isOpenAddingNewAsset = true;
    const params = new URLSearchParams(searchParams.toString());
    params.set('add_coin_page', '1');
    router.push(`${pathname}?${params.toString()}`);
    rootStore.walletActivityStore.currentPageAddingCoin = '1';
  };

  return (
    <div className={styles.left_part}>
      {rootStore.walletActivityStore.walletAssets.map((asset, index) => (
        <AssetCard
          key={asset.coinId}
          title={asset.coinName}
          price={asset.price}
          changing={asset.changing}
          ticket={asset.coinSymbol}
          amount={asset.amount}
          logoUrl={asset.logoUrl}
          className={clsx(index !== 0 && styles.border_top)}
          onClick={() => (rootStore.currentActivityStore.currentAsset = asset)}
        />
      ))}

      <Button
        // style={{ background: 'transparent', border: 'none', color: 'wheat' }}
        onClick={addNewCoin}
      >
        Add asset
      </Button>
    </div>
  );
});
