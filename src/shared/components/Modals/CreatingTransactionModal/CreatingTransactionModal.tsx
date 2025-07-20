'use client';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Decimal from 'decimal.js';
import { observer } from 'mobx-react-lite';
import { ApiError } from 'next/dist/server/api-utils';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from './CreatingTransactionModal.module.scss';

import { Button, ErrorText, Input, Select } from '@/components/ui';
import { CustomDateTimePicker } from '@/components/ui/DatePicker/DatePicker';
import { StandardModal } from '@/shared/components';
import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import {
  CreateTransaction,
  GetCreatingTransaction,
  SendCreatingTransaction,
} from '@/shared/types';

export const CreatingTransactionModal: FC = observer(() => {
  const isOpenModal = rootStore.modalStore.isOpenCreatingTransactionModal;
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<CreateTransaction>({
    defaultValues: {
      date: new Date(),
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutationRequest<
    GetCreatingTransaction,
    SendCreatingTransaction
  >({});

  const onSubmit = async (formData: CreateTransaction) => {
    const requestData = {
      type: formData.type,
      amount: new Decimal(formData.amount).toString(),
      price: new Decimal(formData.price).toString(),
      date: (formData.date || new Date())
        .toISOString()
        .replace(/\.\d{3}Z$/, 'Z'),
      walletTo: formData.walletTo,
      description: formData.description || '',
    };

    mutate(
      {
        apiUrl: `/transaction/${formData.asset}`,
        data: requestData,
      },
      {
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            const serverError = error.response?.data as ApiError;
            setError('root', {
              message: serverError.message || 'Unknown error',
            });
          } else {
            console.error('Неизвестная ошибка:', error);
          }
        },
        onSuccess: async (_) => {
          rootStore.modalStore.isOpenCreatingTransactionModal = false;
          const walletId = rootStore.userStore.walletId;
          await queryClient.invalidateQueries({
            queryKey: [
              `wallet-assets-${walletId}`,
              `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${walletId}`,
              {},
            ],
          });

          await queryClient.invalidateQueries({
            queryKey: [
              `transactions-${rootStore.currentActivityStore.currentAsset.id}`,
              process.env.NEXT_PUBLIC_API_GET_TRANSACTION_FOR_ONE_ASSET,
              { assetId: rootStore.currentActivityStore.currentAsset.id },
            ],
          });
        },
      },
    );
  };

  const selectedAssetId = watch('asset');

  useEffect(() => {
    if (selectedAssetId) {
      const selectedAsset = rootStore.walletActivityStore.walletAssets.find(
        (a) => a.id === selectedAssetId,
      );
      if (selectedAsset) {
        setValue('price', selectedAsset.price.toString());
      }
    }
  }, [selectedAssetId, setValue, rootStore.walletActivityStore.walletAssets]);

  if (!isOpenModal) return null;

  return (
    <StandardModal
      isOpen={isOpenModal}
      onClose={() => {
        reset();
        rootStore.modalStore.isOpenCreatingTransactionModal = false;
      }}
      title={'New Transaction'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name={'type'}
          control={control}
          defaultValue={'INCOME'}
          render={({ field }) => (
            <Select
              options={['INCOME', 'SALE']}
              label={'Transaction Type'}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name={'asset'}
          render={({ field }) => {
            const selectedAsset =
              rootStore.walletActivityStore.walletAssets.find(
                (a) => a.id === field.value,
              );

            return (
              <Select
                options={rootStore.walletActivityStore.walletAssets.map(
                  (a) => ({
                    label: a.coinName,
                    value: a.id,
                  }),
                )}
                label="Asset"
                onChange={(value) => {
                  field.onChange(value);
                  const asset = rootStore.walletActivityStore.walletAssets.find(
                    (a) => a.id === value,
                  );
                  if (asset) {
                    setValue('price', asset.price.toString());
                  }
                }}
                value={
                  selectedAsset
                    ? {
                        label: selectedAsset.coinName,
                        value: selectedAsset.id,
                      }
                    : undefined
                }
              />
            );
          }}
        />

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <CustomDateTimePicker
              selected={field.value}
              onChange={field.onChange}
              placeholderText="Выберите дату и время"
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd.MM.yyyy HH:mm"
            />
          )}
        />
        <Input
          {...register('amount')}
          label={'amount'}
          value={watch('amount') || ''}
          backgroundLabel={'alternative'}
          inputMode={'decimal'}
          type={'number'}
          formatSize={'md'}
          bottomLevelOfLabel={30}
        />
        <Input
          {...register('price')}
          label={'price'}
          value={watch('price') || ''}
          backgroundLabel={'alternative'}
          type={'number'}
          inputMode={'decimal'}
          formatSize={'sm'}
          className={styles.last_input}
        />
        <Input
          {...register('walletFrom')}
          label={'walletFrom (optional)'}
          value={watch('walletFrom') || ''}
          backgroundLabel={'alternative'}
          formatSize={'sm'}
          className={styles.last_input}
        />
        <Input
          {...register('description')}
          label={'description (optional)'}
          value={watch('description') || ''}
          backgroundLabel={'alternative'}
          formatSize={'sm'}
          className={styles.last_input}
        />
        {errors.root?.message && <ErrorText>{errors.root?.message}</ErrorText>}
        <Button type={'submit'}>Create transaction</Button>
      </form>
    </StandardModal>
  );
});
