'use client';
import { AnimatePresence } from 'framer-motion';
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
  isControl?: boolean;
}

export const AssetsPanel = observer(
  ({ isLoading, isControl = true }: AssetsPanelProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const addNewCoin = async () => {
      rootStore.modalStore.isOpenAddingNewAsset = true;
      const params = new URLSearchParams(searchParams.toString());
      params.set('type', 'choosing');
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    };

    const openModalForCreatingTransaction = () => {
      rootStore.modalStore.isOpenCreatingTransactionModal = true;
    };

    const debouncedChoiceAsset = useCallback(
      debounce(async (asset: Asset) => {
        await rootStore.currentActivityStore.setCurrentAssetId(asset.id);
        rootStore.currentActivityStore.currentAsset.isOpenChart = true;
      }, 300),
      [],
    );

    return (
      <div className={styles.main_part}>
        <div className={styles.assets_container}>
          {isLoading ? (
            <SkeletonEl height={60} count={5} />
          ) : (
            <AnimatePresence mode={'popLayout'}>
              {rootStore.walletActivityStore.walletAssets.map(
                (asset, index) => (
                  <AssetCard
                    key={asset.id}
                    active={
                      !rootStore.isMobile &&
                      rootStore.currentActivityStore.currentAsset.coinId ===
                        asset.coinId
                    }
                    title={asset.name}
                    price={asset.currentPrice}
                    changing={asset.change24hPercent}
                    ticket={asset.symbol}
                    amount={asset.amount}
                    totalSum={asset.totalSum}
                    logoUrl={asset.logoUrl}
                    className={clsx(
                      index !== 0 && styles.border_top,
                      rootStore.currentActivityStore.currentAsset.coinId ===
                        asset.coinId && styles.active,
                    )}
                    onClick={() => debouncedChoiceAsset(asset)}
                  />
                ),
              )}
            </AnimatePresence>
          )}
        </div>
        {isControl && (
          <div className={styles.button_container}>
            <Button className={styles.button} onClick={addNewCoin}>
              New asset
            </Button>
            <Button
              className={styles.button}
              formatType={'tile'}
              onClick={openModalForCreatingTransaction}
            >
              Create transaction
            </Button>
          </div>
        )}
      </div>
    );
  },
);
