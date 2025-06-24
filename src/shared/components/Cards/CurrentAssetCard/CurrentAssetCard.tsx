import React, { useState } from 'react';

import styles from './CurrentAssetCard.module.scss';

import { DotsButton } from '@/components/ui';
import { DropTabMenu } from '@/shared/components';
import { rootStore } from '@/shared/stores';
import { formatNumberLength } from '@/shared/utils';

export const CurrentAssetCard = () => {
  const [isOpenDotsMenu, setIsOpenDotsMenu] = useState<boolean>(false);

  const onDeleteCurrentAssetFromWallet = async () => {};

  return (
    <div className={styles.heading_of_chart}>
      {isOpenDotsMenu && (
        <DropTabMenu
          className={styles.drop_tab_menu}
          items={[
            {
              text: 'Закрыть меню',
              callback: () => {
                setIsOpenDotsMenu(false);
              },
            },
            { text: 'Удалить', callback: onDeleteCurrentAssetFromWallet },
          ]}
        />
      )}
      <div className={styles.header_part}>
        <h3 className={styles.text_header}>
          Current Asset: {rootStore.currentActivityStore.currentAsset.coinName}
        </h3>
        <span className={styles.text_standard}>
          Amount:{' '}
          {formatNumberLength(
            Number(rootStore.currentActivityStore.currentAsset.amount),
          )}
        </span>
        <div className={styles.dots_container}>
          <DotsButton
            isOpening={isOpenDotsMenu}
            setIsOpening={setIsOpenDotsMenu}
          />
        </div>
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
