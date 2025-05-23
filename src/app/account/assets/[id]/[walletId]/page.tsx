'use client';

import { useParams } from 'next/navigation';

import styles from './page.module.scss';

import {
  AssetsPanel,
  ChartDataGroup,
  GeneralModalPage,
  HeaderAssets,
} from '@/shared/components';

export default function Home() {
  const params = useParams();
  const walletId = params.walletId as string;

  return (
    <div className={styles.main}>
      <GeneralModalPage />
      <div className={styles.left_column}>
        <HeaderAssets changing={2.15} />
        <AssetsPanel walletId={walletId} />
      </div>
      <div className={styles.chart}>
        <ChartDataGroup />
      </div>
    </div>
  );
}
