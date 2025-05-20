'use client';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import clsx from 'clsx';

import styles from './AssetsPanel.module.scss';

import { Button } from '@/components/ui';
import { AssetCard } from '@/shared/components';
import { currentActivityStore } from '@/shared/stores/CurrentActivityStore';
import { modalStore } from '@/shared/stores/ModalStore';
import { walletActivityStore } from '@/shared/stores/WalletActivityStore';

// const infoCards = [
//   {
//     cost: 100,
//     title: 'Bitcoin',
//     amount: 120,
//     changing: 2.15,
//     ticket: 'BTC',
//     logoAsset:
//       'https://img.icons8.com/?size=100&id=3552&format=png&color=ffffff',
//   },
//   {
//     cost: 220,
//     title: 'Ethereum',
//     amount: 85,
//     changing: -1.27,
//     ticket: 'ETH',
//     logoAsset:
//       'https://img.icons8.com/?size=100&id=3552&format=png&color=ffffff',
//   },
//   {
//     cost: 55,
//     title: 'Litecoin',
//     amount: 200,
//     changing: 3.58,
//     ticket: 'LTC',
//     logoAsset:
//       'https://img.icons8.com/?size=100&id=3552&format=png&color=ffffff',
//   },
//   {
//     cost: 310,
//     title: 'Cardano',
//     amount: 145,
//     changing: -0.93,
//     ticket: 'ADA',
//     logoAsset:
//       'https://img.icons8.com/?size=100&id=3552&format=png&color=ffffff',
//   },
//   {
//     cost: 4703124124,
//     title: 'Solana',
//     amount: 60,
//     changing: 5.21,
//     ticket: 'SOL',
//     logoAsset:
//       'https://img.icons8.com/?size=100&id=3552&format=png&color=ffffff',
//   },
// ];

export const AssetsPanel = observer(({ walletId }: { walletId: string }) => {
  const setCurrentActivity = (value: string) => {
    currentActivityStore.currentAsset = value;
    console.log(currentActivityStore.currentAsset);
  };

  useEffect(() => {
    const fetchDataStart = async () => {
      await walletActivityStore.getWalletAssets(walletId);
    };
    fetchDataStart();
  }, []);

  return (
    <div className={styles.left_part}>
      {walletActivityStore.walletAssets.map((asset, index) => (
        <AssetCard
          key={asset.coinId}
          title={asset.coinName}
          price={asset.price}
          changing={asset.changing}
          ticket={asset.coinSymbol}
          amount={asset.amount}
          logoUrl={asset.logoUrl}
          className={clsx(index !== 0 && styles.border_top)}
          onClick={() => (currentActivityStore.currentAsset = asset.coinName)}
        />
      ))}

      <Button
        style={{ background: 'transparent', border: 'none', color: 'wheat' }}
        onClick={() => (modalStore.isOpenAddingNewAsset = true)}
      >
        Add new asset
      </Button>
    </div>
  );
});
