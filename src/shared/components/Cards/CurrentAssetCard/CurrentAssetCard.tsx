'use client';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import clsx from 'clsx';

import styles from './CurrentAssetCard.module.scss';

import { Chevron, DotsIcon } from '@/components/icons';
import { ChangingWithChevron, MenuButton, SkeletonEl } from '@/components/ui';
import api from '@/lib/axios';
import { DropTabMenu } from '@/shared/components';
import { useColorOfGrowing } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import {
  formatLengthNumber,
  formatNumberWithSpaces,
  formatWithSuffix,
} from '@/shared/utils';

interface CurrentAssetCardProps {
  isControl?: boolean;
}

export const CurrentAssetCard = observer(
  ({ isControl = true }: CurrentAssetCardProps) => {
    const [isOpenDotsMenu, setIsOpenDotsMenu] = useState<boolean>(false);
    const { color } = useColorOfGrowing(
      rootStore.currentActivityStore.currentAsset.change24hPercent,
    );
    const onDeleteCurrentAssetFromWallet = useCallback(async () => {
      try {
        const apiURL = `${process.env.NEXT_PUBLIC_API_DELETE_COIN_FROM_WALLET}/${rootStore.userStore.walletId}/${rootStore.currentActivityStore.currentAsset.id}`;
        await api.delete(apiURL);
        rootStore.walletActivityStore.walletAssets =
          rootStore.walletActivityStore.walletAssets.filter(
            (el) => el.id !== rootStore.currentActivityStore.currentAsset.id,
          );
      } catch (e) {
        console.log(e);
      }
    }, []);

    return (
      <div className={styles.heading_of_chart}>
        {isControl && isOpenDotsMenu && (
          <DropTabMenu
            onClose={() => setIsOpenDotsMenu(false)}
            isOpen={isOpenDotsMenu}
            className={styles.drop_tab_menu}
            items={[
              {
                text: 'Закрыть меню',
                callback: () => {
                  setIsOpenDotsMenu(false);
                },
              },
              {
                text: 'Удалить',
                callback: async () => {
                  await onDeleteCurrentAssetFromWallet();
                  setIsOpenDotsMenu(false);
                },
              },
            ]}
          />
        )}
        <div className={styles.header_part}>
          <div
            className={styles.back_arrow}
            onClick={() => {
              rootStore.currentActivityStore.currentAsset.isOpenChart = false;
            }}
          >
            <Chevron
              width={20}
              height={20}
              color={'var(--primary-color)'}
              direction={'left'}
            />
          </div>
          <div className={styles.icon_image}>
            {(rootStore.currentActivityStore.currentAsset?.logoUrl && (
              <Image
                width={40}
                height={40}
                src={rootStore.currentActivityStore.currentAsset.logoUrl}
                alt={'asset_icon'}
              />
            )) || <SkeletonEl width={45} height={45} borderRadius={'50%'} />}
          </div>
          <div className={clsx(styles.desktop, styles.text_header)}>
            {rootStore.currentActivityStore.currentAsset?.name || (
              <SkeletonEl width={80} height={30} />
            )}{' '}
            <div className={styles.second_currency}>/usdt</div>
          </div>
          {isControl && (
            <div className={styles.dots_container}>
              <MenuButton
                setIsOpening={setIsOpenDotsMenu}
                imageElement={<DotsIcon />}
              />
            </div>
          )}
        </div>

        <div className={styles.metrics}>
          {rootStore.isMobile && (
            <div className={styles.text_standard}>
              <div className={clsx(styles.mobile, styles.text_header)}>
                {rootStore.currentActivityStore.currentAsset?.name || (
                  <SkeletonEl width={80} height={30} />
                )}{' '}
                <div className={styles.second_currency}>/usdt</div>
              </div>
            </div>
          )}
          <div className={styles.text_standard}>
            <div style={{ color: color }} className={styles.price_text}>
              {(
                <>
                  {formatNumberWithSpaces(
                    formatLengthNumber(
                      rootStore.currentActivityStore.currentAsset
                        ?.currentPrice || 0,
                    ),
                  )}
                  <span style={{ color }}>$</span>
                </>
              ) || <SkeletonEl width={80} height={30} />}

              <ChangingWithChevron
                className={styles.mini_size}
                type={'mark'}
                color={color}
                changing={
                  formatLengthNumber(
                    rootStore.currentActivityStore.currentAsset
                      ?.change24hPercent,
                  )?.toString() || <SkeletonEl />
                }
              />
            </div>
          </div>

          <div className={styles.text_standard}>
            <div className={clsx(styles.price_text, styles.amount)}>
              {rootStore.currentActivityStore.currentAsset?.amount ? (
                <>
                  <div>
                    {rootStore.currentActivityStore.currentAsset?.amount}
                  </div>
                  <div>
                    {rootStore.currentActivityStore.currentAsset?.symbol?.toUpperCase()}
                  </div>
                </>
              ) : (
                <SkeletonEl width={60} height={30} />
              )}
            </div>
          </div>

          <div className={clsx(styles.low_metrics, styles.text_standard)}>
            <span className={styles.heading}>total</span>
            <div style={{ color }} className={styles.price_text}>
              {rootStore.currentActivityStore.currentAsset?.totalSum || 0}
              <span className={styles.green_text}>$</span>
            </div>
          </div>

          <div className={clsx(styles.low_metrics, styles.text_standard)}>
            <span className={styles.heading}>market cap</span>
            <div className={styles.price_text}>
              {formatWithSuffix(
                rootStore.currentActivityStore.currentAsset?.currentMarketCap,
              ) || 0}
              <span className={styles.green_text}>$</span>
            </div>
          </div>

          <div className={clsx(styles.low_metrics, styles.text_standard)}>
            <span className={styles.heading}>volume</span>
            <div className={styles.price_text}>
              {formatWithSuffix(
                rootStore.currentActivityStore.currentAsset?.currentVolume,
              ) || 0}
              <span className={styles.green_text}>$</span>
            </div>
          </div>

          {/*<div className={clsx(styles.low_metrics, styles.text_standard)}>*/}
          {/*  <Link*/}
          {/*    href={`/account/assets/${rootStore.userStore.userId}/${rootStore.userStore.walletId}/analytics/${rootStore.currentActivityStore.currentAsset?.id}`}*/}
          {/*  >*/}
          {/*    <Button width={100}>Подробнее</Button>*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  },
);
