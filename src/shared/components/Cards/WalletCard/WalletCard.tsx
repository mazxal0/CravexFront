'use client';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import styles from './WalletCard.module.scss';

import { DotsIcon } from '@/components/icons';
import { ChangingWithChevron, MenuButton } from '@/components/ui';
import { DropTabMenu } from '@/shared/components';
import { WalletCardProps } from '@/shared/components/Cards/WalletCard/WalletCard.props';
import { rootStore } from '@/shared/stores';
import { userStore } from '@/shared/stores/User.store';

export const WalletCard: FC<WalletCardProps> = observer(
  ({
    walletId,
    index,
    name = 'wallet',
    totalBalance = 0,
    changing = 0,
    dominateAssetName = 'void',
    dominateAssetInPercent = 0,
    deleteWallet,
  }) => {
    const [color, setColor] = useState<
      'var(--success-color)' | 'var(--error-color)'
    >('var(--success-color)');

    const [isOpenDropMenu, setOpenDropMenu] = useState<boolean>(false);
    const [isDelete, setDelete] = useState<boolean>(false);

    useEffect(() => {
      if (changing < 0) {
        changing *= -1;
        setColor('var(--error-color)');
      }
    }, []);

    const router = useRouter();

    const onClickWallet = () => {
      router.push(`${userStore.userId}/${walletId}`);
    };

    const toTotalLink = async () => {
      console.log(walletId);
      router.push(`${rootStore.userStore.userId}/${walletId}/analytics`);
    };

    const isEditing = () => {};

    // const deleteWallet = async () => {
    //   await api.delete(`${process.env.NEXT_PUBLIC_API_DELETE_WALLET}/${id}`);
    //   rootStore.walletsPageManagerStore.wallets =
    //     rootStore.walletsPageManagerStore.wallets.filter(
    //       (wallet) => wallet.id !== id,
    //     );
    // };

    return (
      <div className={styles.card} onClick={onClickWallet}>
        {isOpenDropMenu && (
          <DropTabMenu
            items={[
              {
                text: 'Редактировать',
                callback: (e) => {
                  e.stopPropagation();
                  isEditing();
                },
              },
              {
                text: 'Удалить',
                callback: async (e) => {
                  e.stopPropagation();
                  deleteWallet(walletId);
                },
              },
              {
                text: 'Детальная аналитика',
                callback: async (e) => {
                  e.stopPropagation();
                  await toTotalLink();
                },
              },
            ]}
          />
        )}
        <div className={styles.container_name}>
          <div className={styles.name}>{name}</div>
          <div className={styles.change}>
            <ChangingWithChevron
              type={'mark'}
              changing={changing + '/ 24h'}
              color={color}
            />
          </div>
        </div>

        <div className={styles.sums_container}>
          <span className={styles.total_sum}>${totalBalance}</span>
        </div>

        <MenuButton
          imageElement={<DotsIcon />}
          setIsOpening={setOpenDropMenu}
        />

        {/*<div className={styles.dominate_container}>*/}
        {/*  <span className={styles.dominate_name}>{dominateAssetName}</span>*/}
        {/*  <span className={styles.dominate_change}>*/}
        {/*    {dominateAssetInPercent}% dominate*/}
        {/*  </span>*/}
        {/*</div>*/}
      </div>
    );
  },
);
