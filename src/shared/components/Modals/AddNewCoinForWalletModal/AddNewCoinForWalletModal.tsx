'use client';
import { observer } from 'mobx-react-lite';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect } from 'react';

import style from './AddNewCoinForWalletModal.module.scss';

import { Input, List } from '@/components/ui';
import api from '@/lib/axios';
import { StandardModal } from '@/shared/components';
import { rootStore } from '@/shared/stores';
import { Coin } from '@/shared/types';

export const AddNewCoinForWalletModal = observer(() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getAllCoins = async () => {
      await rootStore.walletActivityStore.getAllCryptoCoins();
    };
    getAllCoins();

    const params = new URLSearchParams(searchParams.toString());
    if (params.get('add_coin_page')) {
      rootStore.modalStore.isOpenAddingNewAsset = true;
    }

    return () => {
      rootStore.modalStore.currentPageAddingCoin = '1';
    };
  }, []);

  const onExit = async () => {
    const params = new URLSearchParams(searchParams.toString());
    if (rootStore.modalStore.currentPageAddingCoin === '1') {
      rootStore.modalStore.isOpenAddingNewAsset = false;
      rootStore.modalStore.currentPageAddingCoin = '1';
      params.delete('add_coin_page');
    } else {
      console.log(
        (parseInt(rootStore.modalStore.currentPageAddingCoin) - 1).toString(),
      );
      rootStore.modalStore.currentPageAddingCoin = (
        parseInt(rootStore.modalStore.currentPageAddingCoin) - 1
      ).toString();
      params.set('add_coin_page', rootStore.modalStore.currentPageAddingCoin);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const onNextPage = async (coin: Coin) => {
    rootStore.modalStore.currentPageAddingCoin = '2';
    rootStore.modalStore.currentAddingCoin = {
      ...coin,
      coinName: coin.coinName,
      price: 0,
      amount: 0,
    };
    const price = await rootStore.modalStore.getCurrentDataOfAddingCoin();
    const params = new URLSearchParams(searchParams.toString());
    params.set('add_coin_page', '2');
    router.push(`${pathname}?${params.toString()}`);
  };

  const addNewAsset = async () => {
    try {
      const api_URL = `${process.env.NEXT_PUBLIC_API_ADD_COIN_FOR_WALLET}/${rootStore.userStore.walletId}`;
      await api.post(api_URL, {
        coinId: rootStore.modalStore.currentAddingCoin.coinId,
        coinName: rootStore.modalStore.currentAddingCoin.coinName,
        symbol: rootStore.modalStore.currentAddingCoin.symbol,
        amount: parseInt(
          rootStore.modalStore.currentAddingCoin.amount.toString(),
        ),
      });

      await rootStore.walletActivityStore.getWalletAssets(
        rootStore.userStore.walletId,
      );

      rootStore.modalStore.currentPageAddingCoin = '1';
      rootStore.modalStore.isOpenAddingNewAsset = false;
      const params = new URLSearchParams(searchParams.toString());
      params.delete('add_coin_page');
    } catch (e) {
      console.log(e);
    }
  };

  const onSearch = async (query: string) => {
    console.log('QWEQWERQWRQW');
    query = query.trim();
    if (query.length === 0) {
      console.log('opa');
      await rootStore.walletActivityStore.getAllCryptoCoins();
      return;
    }

    const url = process.env.NEXT_PUBLIC_API_QUERY_COINS;
    const response = await api.get(url, {
      params: { query },
    });
    rootStore.walletActivityStore.cryptoCoins = response.data.coins.map(
      (coin: any) => {
        return {
          coinId: coin.id,
          coinName: coin.name,
          symbol: coin.symbol || coin.api_symbol,
          image: coin.large || coin.thumb,
        };
      },
    );
  };

  const firstPage = (
    <List
      ListElements={rootStore.walletActivityStore.cryptoCoins
        ?.slice(0, 15)
        .map((el) => {
          return {
            text: el.coinName,
            imageUrl: el.image,
            onClick: () => onNextPage(el),
          };
        })}
      onSearch={onSearch}
      onHandleChange={rootStore.walletActivityStore.setQueryCryptoCoins}
      value={rootStore.walletActivityStore.queryCryptoCoins}
    />
  );
  {
    /*<SearchableSelect options={[]} />*/
  }
  {
    /*{rootStore.walletActivityStore.allCryptoCoins*/
  }
  {
    /*  ?.slice(0, 15)*/
  }
  {
    /*  .map((coin) => (*/
  }
  {
    /*    <Button*/
  }
  {
    /*      key={coin.coinId}*/
  }
  {
    /*      className={style.card_button}*/
  }
  {
    /*      formatType={'tile'}*/
  }
  {
    /*      onClick={() => onNextPage(coin)}*/
  }
  {
    /*    >*/
  }
  {
    /*      <div className={style.card_container}>*/
  }
  {
    /*        <Image*/
  }
  {
    /*          className={style.image_card}*/
  }
  {
    /*          src={coin.image || '/fallback-image.png'}*/
  }
  {
    /*          alt={coin.coinName || 'Coin'}*/
  }
  {
    /*          width={25}*/
  }
  {
    /*          height={25}*/
  }
  {
    /*          loading="lazy"*/
  }
  {
    /*        />*/
  }
  {
    /*        <span className={style.text_card}>{coin.coinName}</span>*/
  }
  {
    /*      </div>*/
  }
  {
    /*    </Button>*/
  }
  {
    /*  ))}*/
  }

  const secondPage = (
    <div>
      <div className={style.fix_data_container}>
        <h3>Coin name: {rootStore.modalStore.currentAddingCoin.coinId}</h3>
        <h3>Current price: {rootStore.modalStore.currentAddingCoin.price}</h3>
      </div>
      <Input
        label={'Amount'}
        bottomLevelOfLabel={50}
        topLevelOfLabel={75}
        backgroundLabel={'alternative'}
        value={rootStore.modalStore.amountOfAddingCoin}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          rootStore.modalStore.amountOfAddingCoin = event.target.value;
        }}
      />
    </div>
  );

  const mainPage =
    rootStore.modalStore.currentPageAddingCoin === '1' ? firstPage : secondPage;

  return (
    <StandardModal
      isOpen={rootStore.modalStore.isOpenAddingNewAsset}
      onClose={onExit}
      onConfirm={addNewAsset}
      title={'Добавить актив'}
      children={mainPage}
      cancelText={
        rootStore.modalStore.currentPageAddingCoin !== '1' ? 'Назад' : 'Закрыть'
      }
      confirmText={
        rootStore.modalStore.currentPageAddingCoin === '2'
          ? 'Сохранить актив'
          : undefined
      }
    />
  );
});
