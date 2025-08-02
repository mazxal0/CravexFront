'use client';
import { useQueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import styles from './TransactionModal.module.scss';

import { RecycleBinIcon } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { StandardModal } from '@/shared/components';
import { useMutationRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import { Transaction } from '@/shared/types';
import { formatDate } from '@/shared/utils';

export const TransactionModal: FC = observer(() => {
  const queryClient = useQueryClient();

  const onExit = () => {
    rootStore.currentActivityStore.currentTransaction = undefined;
  };

  const { mutate } = useMutationRequest({
    defaultApiUrl: `${process.env.NEXT_PUBLIC_API_DELETE_ONE_TRANSACTION}/${rootStore.currentActivityStore.currentTransaction?.id}`,
    method: 'delete',
  });

  const onDeleteTransaction = async (transaction: Transaction | undefined) => {
    if (!transaction) return;

    mutate(
      { data: transaction },
      {
        onSuccess: async (_) => {
          await queryClient.invalidateQueries({
            queryKey: [
              `transactions-${rootStore.currentActivityStore.currentAsset.id}`,
              process.env.NEXT_PUBLIC_API_GET_TRANSACTION_FOR_ONE_ASSET,
              { assetId: rootStore.currentActivityStore.currentAsset.id },
            ],
          });
          const walletId = rootStore.userStore.walletId;
          await queryClient.invalidateQueries({
            queryKey: [
              `wallet-assets-${walletId}`,
              `${process.env.NEXT_PUBLIC_API_GET_WALLET_ASSETS}/${walletId}/assets`,
              {},
            ],
          });
          rootStore.currentActivityStore.currentTransaction = undefined;
        },
        onError: async (error) => {
          console.error('Delete error:', error);
        },
      },
    );
  };

  const transaction = rootStore.currentActivityStore.currentTransaction;
  if (!transaction) return null;

  return (
    <StandardModal
      classname={styles.modal_page}
      isOpen={!!transaction}
      onClose={onExit}
      title={'Transaction'}
    >
      <div className={styles.column}>
        <Input value={transaction.type} disabled formatSize={'sm'} />

        <Input
          value={
            transaction.amount +
            ' ' +
            transaction.asset.coin.symbol.toUpperCase()
          }
          disabled
          formatSize={'sm'}
        />

        <Input
          value={transaction.price + ' $'}
          label={'price'}
          formatSize={'sm'}
          backgroundLabel={'alternative'}
          disabled
        />

        <Input
          value={formatDate(transaction.date, true)}
          label={'Date'}
          formatSize={'sm'}
          backgroundLabel={'alternative'}
          disabled
        />

        {transaction.addressFrom && (
          <Input
            value={transaction.addressFrom}
            disabled
            label={'address from'}
            formatSize={'sm'}
            backgroundLabel={'alternative'}
          />
        )}
        {transaction.addressTo && (
          <Input
            value={transaction.addressTo}
            disabled
            label={'address to'}
            formatSize={'sm'}
            backgroundLabel={'alternative'}
          />
        )}
        {transaction.description && (
          <Input
            value={transaction.description}
            disabled
            label={'description'}
            formatSize={'sm'}
            backgroundLabel={'alternative'}
          />
        )}
        {rootStore.userStore.isControl && (
          <Button
            color={'red-color'}
            onClick={() =>
              onDeleteTransaction(
                rootStore.currentActivityStore.currentTransaction,
              )
            }
            Icon={<RecycleBinIcon color={'#fff'} width={20} height={20} />}
          >
            Delete Transaction
          </Button>
        )}
      </div>
    </StandardModal>
  );
});
