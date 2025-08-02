'use client';
import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import styles from '@/app/account/assets/[id]/[walletId]/page.module.scss';
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

export default function InfoWalletPage() {
  const params = useParams();
  const walletId = params.walletId as string;
  rootStore.userStore.walletId = walletId;

  const assets = useQueryRequest<Asset[]>({
    nameOfCache: `wallet-assets-${walletId}`,
    apiUrl: `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${walletId}/assets`,
    additionQueryFn: rootStore.walletActivityStore.getWalletAssets,
  });

  useEffect(() => {
    rootStore.userStore.isControl = false;

    return () => {
      rootStore.userStore.isControl = true;
    };
  }, []);

  return (
    <>
      <div className={styles.main}>
        <GeneralModalPage />
        <div className={styles.left_column}>
          <HeaderAssetsCard />
          <AssetsPanel isLoading={assets.isLoading} isControl={false} />
          <div className={styles.qr_code}>
            <ReactiveQRCode walletId={walletId} />
          </div>
        </div>
        <div className={styles.chart}>
          <CurrentAssetCard isControl={false} />
          {rootStore.currentActivityStore.currentAsset && <ChartDataGroup />}
          <TransactionPanel />
        </div>
      </div>
    </>
  );
}
