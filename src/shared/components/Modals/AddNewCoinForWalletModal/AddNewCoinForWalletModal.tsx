'use client';
import { useQueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import style from './AddNewCoinForWalletModal.module.scss';

import { Input, List } from '@/components/ui';
import api from '@/lib/axios';
import { StandardModal } from '@/shared/components';
import { useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { type GetAxiosCoin } from '@/shared/types';

export const AddNewCoinForWalletModal = observer(() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [requestConfig, setRequestConfig] = useState({
    apiUrl: process.env.NEXT_PUBLIC_API_GET_ORDERED_ALL_COINS,
    params: { vs_currency: 'usd', order: 'market_cap_desc', query: '' },
  });
  const queryClient = useQueryClient();

  const coins = useQueryRequest<Array<GetAxiosCoin>>({
    nameOfCache: 'crypto-coins-',
    apiUrl: requestConfig.apiUrl,
    params: requestConfig.params,
    queryOptions: {
      enabled: Boolean(requestConfig.apiUrl),
      select: (resp: any) => {
        const arr = Array.isArray(resp) ? resp : resp.coins;
        return arr.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol || coin.api_symbol, // логическое ИЛИ, а не побитовое
          image: coin.large || coin.image,
        }));
      },
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get('add_coin_page')) {
      rootStore.modalStore.isOpenAddingNewAsset = true;
    }

    return () => {
      rootStore.modalStore.currentPageAddingCoin = '1';
    };
  }, []);

  const updatePageParam = (page: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page) {
      params.set('add_coin_page', page);
    } else {
      params.delete('add_coin_page');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const onExit = async () => {
    if (rootStore.modalStore.currentPageAddingCoin === '1') {
      // Закрытие модалки
      rootStore.modalStore.isOpenAddingNewAsset = false;
      rootStore.modalStore.resetData(); // Добавьте этот метод в store
      updatePageParam(null); // Полностью удаляем параметр
    } else {
      // Возврат на предыдущую страницу
      const prevPage = (
        parseInt(rootStore.modalStore.currentPageAddingCoin) - 1
      ).toString();
      rootStore.modalStore.currentPageAddingCoin = prevPage;
      updatePageParam(prevPage);
    }
  };

  const onNextPage = async (coin: GetAxiosCoin) => {
    rootStore.modalStore.currentPageAddingCoin = '2';
    rootStore.modalStore.currentAddingCoin = {
      coinName: coin.name,
      coinId: coin.id,
      symbol: coin.symbol,
      price: 0,
      amount: 0,
    };

    console.log(coin);
    await rootStore.modalStore.getCurrentDataOfAddingCoin();
    updatePageParam('2');
  };

  const addNewAsset = async () => {
    try {
      const { currentAddingCoin } = rootStore.modalStore;
      await api.post(
        `${process.env.NEXT_PUBLIC_API_ADD_COIN_FOR_WALLET}/${rootStore.userStore.walletId}`,
        {
          coinId: currentAddingCoin.coinId,
          coinName: currentAddingCoin.coinName,
          symbol: currentAddingCoin.symbol,
          amount: Number(currentAddingCoin.amount) || 0,
        },
      );

      rootStore.modalStore.resetData();
      rootStore.modalStore.isOpenAddingNewAsset = false;
      updatePageParam(null);
      await queryClient.refetchQueries({
        queryKey: [
          `wallet-assets-${rootStore.userStore.walletId}`,
          `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${rootStore.userStore.walletId}`,
          {},
        ],
        exact: true,
      });
    } catch (e) {
      console.error('Error adding asset:', e);
    }
  };

  const onSearch = async (query: string) => {
    query = query.trim();
    if (query.length === 0) {
      return coins.refetch();
    }
    setRequestConfig({
      apiUrl: process.env.NEXT_PUBLIC_API_QUERY_COINS,
      params: { vs_currency: '', order: '', query },
    });
  };

  const firstPage = (
    <List
      ListElements={coins.data?.slice(0, 15).map((el) => {
        return {
          text: el.name,
          imageUrl: el.image,
          onClick: async () => {
            console.log('opas');
            await onNextPage(el);
          },
        };
      })}
      onSearch={onSearch}
      onHandleChange={rootStore.walletActivityStore.setQueryCryptoCoins}
      value={rootStore.walletActivityStore.queryCryptoCoins}
      isLoading={coins.isLoading}
    />
  );
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
