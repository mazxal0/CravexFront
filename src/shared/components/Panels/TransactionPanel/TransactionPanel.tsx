'use client';
import { observer } from 'mobx-react-lite';

import styles from './TransactionPanel.module.scss';

import { OtherSpinner } from '@/components/ui/Spinner/Spinner';
import { TransactionCard } from '@/shared/components/Cards/TransactionCard/TransactionCard';
import { TransactionCardProps } from '@/shared/components/Cards/TransactionCard/TransactionCard.props';
import { useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';

export const TransactionPanel = observer(() => {
  const { isLoading, data, isError } = useQueryRequest<
    Array<TransactionCardProps>
  >({
    nameOfCache: `transactions-${rootStore.currentActivityStore.currentAsset.id}`,
    apiUrl: process.env.NEXT_PUBLIC_API_GET_TRANSACTION_FOR_ONE_ASSET,
    params: { assetId: rootStore.currentActivityStore.currentAsset.id },
    queryOptions: {
      enabled: Boolean(rootStore.currentActivityStore.currentAsset.id),
    },
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Transactions</h2>
      <div className={styles.table}>
        <div className={styles.header}>
          <span>Date</span>
          <span>Type</span>
          <span>Asset</span>
          <span>Amount</span>
          <span>Total</span>
          <span>Details</span>
        </div>
        {isLoading && (
          <div className={styles.loading}>
            <OtherSpinner />
          </div>
        )}
        {isError && <div className={styles.empty}>Error</div>}
        {data && !isLoading ? (
          <>
            {data.map((transaction) => (
              <div key={transaction.id + transaction.address}>
                <TransactionCard
                  key={transaction.id + transaction.address}
                  type={transaction.type}
                  asset={transaction.asset}
                  price={transaction.price}
                  amount={transaction.amount}
                  date={transaction.date}
                  address={transaction.address}
                />
              </div>
            ))}
          </>
        ) : (
          !isError && <div className={styles.empty}>Empty</div>
        )}
      </div>
    </div>
  );
});
