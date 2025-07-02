'use client';

import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';
import React from 'react';

import styles from './page.module.scss';

import { QRCode } from '@/components/ui';
import {
  AssetsPanel,
  ChartDataGroup,
  CurrentAssetCard,
  GeneralModalPage,
  HeaderAssetsCard,
  TransactionPanel,
} from '@/shared/components';
import { useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { Asset } from '@/shared/types';

const ReactiveQRCode = observer(({ walletId }: { walletId: string }) => (
  <QRCode
    size={150}
    apiWebsite={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/info/wallet/${walletId}`}
  />
));

interface MobilePartOfPageProps {
  isLoading: boolean;
}

const MobilePartOfPage = observer(({ isLoading }: MobilePartOfPageProps) => {
  return (
    <div className={styles.mobile}>
      {rootStore.currentActivityStore.currentAsset.isOpenChart ? (
        <div className={styles.chart}>
          <CurrentAssetCard />
          <ChartDataGroup />
          <TransactionPanel />
        </div>
      ) : (
        <>
          <GeneralModalPage />
          <HeaderAssetsCard />
          <AssetsPanel isLoading={isLoading} />
        </>
      )}
    </div>
  );
});

export default function Home() {
  const params = useParams();
  const walletId = params.walletId as string;
  rootStore.userStore.walletId = walletId;

  const assets = useQueryRequest<Asset[]>({
    nameOfCache: `wallet-assets-${walletId}`,
    apiUrl: `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${walletId}`,
    additionQueryFn: rootStore.walletActivityStore.getWalletAssets,
  });

  return (
    <>
      <div className={styles.main}>
        <GeneralModalPage />
        <div className={styles.left_column}>
          <HeaderAssetsCard />
          <AssetsPanel isLoading={assets.isLoading} />
          <div className={styles.qr_code}>
            {/*<div className={styles.qr_code_text}>Share Your Wallet</div>*/}
            <ReactiveQRCode walletId={walletId} />
          </div>
        </div>
        <div className={styles.chart}>
          <CurrentAssetCard />
          <ChartDataGroup />
          <TransactionPanel />
        </div>
      </div>
      <MobilePartOfPage isLoading={assets.isLoading} />
    </>
  );
}
