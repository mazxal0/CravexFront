import React from 'react';

import styles from './CurrentAssetCard.module.scss';

import { DotsIcon } from '@/components/icons';
import { Button } from '@/components/ui';
import { rootStore } from '@/shared/stores';
import { formatNumberLength } from '@/shared/utils';

export const CurrentAssetCard = () => {
  const onDeleteCurrentAssetFromWallet = async () => {};

  return (
    <div className={styles.heading_of_chart}>
      <div className={styles.header_part}>
        <h3 className={styles.text_header}>
          Current Asset: {rootStore.currentActivityStore.currentAsset.coinName}
        </h3>
        <span className={styles.text_standard}>
          Amount:{' '}
          {formatNumberLength(
            rootStore.currentActivityStore.currentAsset.amount,
          )}
        </span>
        <Button
          formatType={'outline'}
          className={styles.recycle_bin}
          onClick={onDeleteCurrentAssetFromWallet}
        >
          <DotsIcon height={20} width={20} />
        </Button>
      </div>
      <span className={styles.text_standard}>
        Price:{' '}
        {formatNumberLength(rootStore.currentActivityStore.currentAsset.price)}
      </span>
      <span className={styles.text_standard}>
        Volume:{' '}
        {formatNumberLength(rootStore.currentActivityStore.currentAsset.volume)}
      </span>
      <span className={styles.text_standard}>
        market Cap:{' '}
        {formatNumberLength(
          rootStore.currentActivityStore.currentAsset.marketCap,
        )}
      </span>
    </div>
  );
};
