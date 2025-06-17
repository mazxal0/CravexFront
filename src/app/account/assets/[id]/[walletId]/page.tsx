'use client';

import { useParams } from 'next/navigation';

import styles from './page.module.scss';

import {
  AssetsPanel,
  ChartDataGroup,
  GeneralModalPage,
  HeaderAssetsCard,
} from '@/shared/components';
import { rootStore } from '@/shared/stores';

export default function Home() {
  const params = useParams();
  rootStore.userStore.walletId = params.walletId as string;

  return (
    <div className={styles.main}>
      <GeneralModalPage />
      <div className={styles.left_column}>
        <HeaderAssetsCard changing={2.15} />
        <AssetsPanel />
      </div>
      <div className={styles.chart}>
        <ChartDataGroup />
      </div>
    </div>
  );
}
