'use client';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

import clsx from 'clsx';

import styles from './AssetsPanel.module.scss';

import { Button, SkeletonEl } from '@/components/ui';
import { AssetCard } from '@/shared/components';
import { rootStore } from '@/shared/stores';
import { Asset } from '@/shared/types';

interface AssetsPanelProps {
  isLoading?: boolean;
}

export const AssetsPanel = observer(({ isLoading }: AssetsPanelProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addNewCoin = async () => {
    rootStore.modalStore.isOpenAddingNewAsset = true;
    const params = new URLSearchParams(searchParams.toString());
    params.set('add_coin_page', '1');
    router.push(`${pathname}?${params.toString()}`);
    rootStore.modalStore.currentPageAddingCoin = '1';
  };

  const debouncedChoiceAsset = useCallback(
    debounce((asset: Asset) => {
      rootStore.currentActivityStore.currentAsset = asset;
      rootStore.currentActivityStore.currentAsset.isOpenChart = true;
      console.log('opas');
    }, 300),
    [],
  );

  if (isLoading) return <SkeletonEl height={60} count={5} />;

  return (
    <div className={styles.main_part}>
      <div className={styles.assets_container}>
        {rootStore.walletActivityStore.walletAssets.map((asset, index) => (
          <AssetCard
            key={asset.id}
            active={
              rootStore.currentActivityStore.currentAsset.coinId ===
              asset.coinId
            }
            title={asset.coinName}
            price={asset.price}
            changing={asset.changing}
            ticket={asset.symbol}
            amount={asset.amount}
            logoUrl={asset.logoUrl}
            className={clsx(
              index !== 0 && styles.border_top,
              rootStore.currentActivityStore.currentAsset.coinId ===
                asset.coinId && styles.active,
            )}
            onClick={() => debouncedChoiceAsset(asset)}
          />
        ))}
      </div>
      <div className={styles.button_container}>
        <Button className={styles.button} onClick={addNewCoin}>
          New asset
        </Button>
        <Button className={styles.button} formatType={'tile'}>
          Create transaction
        </Button>
      </div>
    </div>
  );
});
