'use client';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import style from './AddNewCoinForWalletModal.module.scss';

import { Button, Input } from '@/components/ui';
import { StandardModal } from '@/shared/components';
import { rootStore } from '@/shared/stores';
import { modalStore } from '@/shared/stores/ModalStore';

export const AddNewCoinForWalletModal = observer(() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getAllCoins = async () => {
      rootStore.walletActivityStore.getAllCryptoCoins();
    };
    getAllCoins();
  }, []);

  const onExit = async () => {
    modalStore.isOpenAddingNewAsset = false;
    const params = new URLSearchParams(searchParams.toString());
    params.delete('add_coin_page');

    router.push(`${pathname}`);
  };

  const onNextPage = async () => {
    rootStore.walletActivityStore.currentPageAddingCoin = '2';
    const params = new URLSearchParams(searchParams.toString());
    params.set('add_coin_page', '2');
    router.push(`${pathname}?${params.toString()}`);
  };

  const firstPage = (
    <div className={style.children}>
      {rootStore.walletActivityStore.allCryptoCoins
        ?.slice(0, 15)
        .map((coin) => (
          <Button
            key={coin.coinId}
            className={style.card_button}
            formatType={'tile'}
            onClick={onNextPage}
          >
            <div className={style.card_container}>
              <Image
                className={style.image_card}
                src={coin.image || '/fallback-image.png'}
                alt={coin.coinName || 'Coin'}
                width={25}
                height={25}
                // onError={(e) => {
                //   e.target.src = '/fallback-image.png';
                // }}
                loading="lazy"
              />
              <span className={style.text_card}>{coin.coinName}</span>
            </div>
          </Button>
        ))}
    </div>
  );

  const secondPage = (
    <div>
      <Input
        label={'Amount'}
        bottomLevelOfLabel={50}
        topLevelOfLabel={75}
        backgroundLabel={'secondary'}
      />
      <Button>Сохранить актив</Button>
    </div>
  );

  const mainPage =
    rootStore.walletActivityStore.currentPageAddingCoin === '1'
      ? firstPage
      : secondPage;

  return (
    <StandardModal
      isOpen={modalStore.isOpenAddingNewAsset}
      onClose={onExit}
      onConfirm={function (): void {
        throw new Error('Function not implemented.');
      }}
      title={'Добавить актив'}
      children={mainPage}
      cancelText={'Закрыть'}
    />
  );
});
