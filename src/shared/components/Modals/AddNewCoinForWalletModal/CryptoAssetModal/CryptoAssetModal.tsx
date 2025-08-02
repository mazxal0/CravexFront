import { useQueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, List } from '@/components/ui';
import styles from '@/shared/components/Modals/AddNewCoinForWalletModal/AddNewCoinForWalletModal.module.scss';
import { CreatingAsset } from '@/shared/components/Modals/AddNewCoinForWalletModal/AddNewCoinForWalletModal.props';
import { useMutationRequest, useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { Asset, GetAxiosCoin } from '@/shared/types';
import { CreateAsset } from '@/shared/types/Asset.type';

interface CryptoAssetModalProps {
  updatePageParam: (
    page: string | (string | null)[] | null,
    key: string | string[],
  ) => void;
  page: string | null;
}

const defaultValueRequestConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_GET_ORDERED_ALL_COINS,
  params: { vs_currency: 'usd', order: 'market_cap_desc', query: '' },
};

export const CryptoAssetModal = observer(
  ({ updatePageParam, page }: CryptoAssetModalProps) => {
    const [requestConfig, setRequestConfig] = useState(
      defaultValueRequestConfig,
    );
    const queryClient = useQueryClient();
    const { mutate } = useMutationRequest<Asset, CreateAsset>({
      defaultApiUrl: `${process.env.NEXT_PUBLIC_API_ADD_COIN_FOR_WALLET}/${rootStore.userStore.walletId}`,
      method: 'post',
    });

    const coins = useQueryRequest<Array<GetAxiosCoin>>({
      nameOfCache: 'crypto-coins-',
      apiUrl: requestConfig.apiUrl,
      params: requestConfig.params,
      queryOptions: {
        enabled: Boolean(requestConfig.apiUrl),
        select: (resp: any) => {
          const arr = resp[0].coins || resp;
          return arr.map((coin: any) => {
            return {
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol || coin.api_symbol,
              image: coin.large || coin.image,
            };
          });
        },
      },
    });

    const { register, watch, reset } = useForm<CreatingAsset>();

    const onNextPage = async (coin: GetAxiosCoin) => {
      rootStore.modalStore.currentAddingCoin = {
        coinName: coin.name,
        coinId: coin.id,
        symbol: coin.symbol,
        price: 0,
        amount: 0,
      };

      await rootStore.modalStore.getCurrentDataOfAddingCoin();
      updatePageParam('2', 'page');
    };

    const addNewAsset = async () => {
      try {
        const { currentAddingCoin } = rootStore.modalStore;

        const data = {
          coinId: currentAddingCoin.coinId,
          coinName: currentAddingCoin.coinName,
          symbol: currentAddingCoin.symbol,
          amount:
            Number(watch('amount')) || Number(currentAddingCoin.amount) || 0,
        };

        mutate(
          { data: data },
          {
            onSuccess: async (data) => {
              rootStore.modalStore.resetData();
              rootStore.modalStore.isOpenAddingNewAsset = false;
              updatePageParam(null, 'page');
              await queryClient.invalidateQueries({
                queryKey: [
                  `wallet-assets-${rootStore.userStore.walletId}`,
                  `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${rootStore.userStore.walletId}/assets`,
                  {},
                ],
              });
              await queryClient.invalidateQueries({
                queryKey: [
                  `transactions-${data.walletId}`,
                  process.env.NEXT_PUBLIC_API_GET_TRANSACTION_FOR_ONE_ASSET,
                  { assetId: data.id },
                ],
              });
            },
            onError: async (error) => {
              console.log('Some Error:', error);
            },
          },
        );
      } catch (e) {
        console.error('Error adding asset:', e);
      }
    };

    const onSearch = async (query: string) => {
      query = query.trim();
      if (query.length === 0) {
        setRequestConfig(defaultValueRequestConfig);
        return;
      }
      setRequestConfig({
        apiUrl: process.env.NEXT_PUBLIC_API_QUERY_COINS,
        params: { vs_currency: '', order: '', query },
      });
    };

    const firstPage = (
      <div className={styles.list}>
        <List
          ListElements={coins.data?.slice(0, 15).map((el) => {
            return {
              text: el.name,
              imageUrl: el.image,
              onClick: async () => {
                await onNextPage(el);
                reset({
                  asset: { coinName: el.name },
                  price: rootStore.modalStore.currentAddingCoin.price,
                });
              },
            };
          })}
          onSearch={onSearch}
          onHandleChange={rootStore.walletActivityStore.setQueryCryptoCoins}
          value={rootStore.walletActivityStore.queryCryptoCoins}
          isLoading={coins.isLoading}
          placeholder={'Search'}
        />
      </div>
    );
    const secondPage = (
      <div>
        <div className={styles.fix_data_container}>
          <Input
            label={'asset'}
            backgroundLabel={'alternative'}
            formatSize={'sm'}
            {...register('asset.coinName', { required: true })}
            value={watch('asset.coinName')}
            disabled
          />
          <Input
            label={'price'}
            backgroundLabel={'alternative'}
            type={'number'}
            inputMode={'numeric'}
            formatSize={'sm'}
            {...register('price', { required: true })}
            value={watch('price')}
            disabled
          />
          <Input
            label={'amount'}
            backgroundLabel={'alternative'}
            type={'number'}
            inputMode={'numeric'}
            formatSize={'sm'}
            {...register('amount', { required: true })}
            value={watch('amount')}
          />
          <Button onClick={addNewAsset}>save asset</Button>
        </div>
      </div>
    );

    switch (page) {
      case '1':
        return firstPage;
      case '2':
        return secondPage;
      default:
        return null;
    }
  },
);
