'use client';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import styles from './TransactionPanel.module.scss';

import { OtherSpinner } from '@/components/ui/Spinner/Spinner';
import { ButtonsGroup } from '@/shared/components';
import { TransactionCard } from '@/shared/components/Cards/TransactionCard/TransactionCard';
import { TransactionCardProps } from '@/shared/components/Cards/TransactionCard/TransactionCard.props';
import { useQueryRequest } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';

const EQUAL_TRANSACTION_FOR_ONE_PAGE = 50;

export const TransactionPanel = observer(() => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { isLoading, data, isError } = useQueryRequest<
    Array<TransactionCardProps>
  >({
    nameOfCache: `transactions-${rootStore.currentActivityStore.currentAsset.id}`,
    apiUrl: process.env.NEXT_PUBLIC_API_GET_TRANSACTION_FOR_ONE_ASSET,
    params: {
      assetId: rootStore.currentActivityStore.currentAsset.id,
      records_for_page: EQUAL_TRANSACTION_FOR_ONE_PAGE,
      page: currentPage,
    },
    queryOptions: {
      enabled: Boolean(
        rootStore.currentActivityStore.currentAsset.id && currentPage,
      ),
    },
  });

  useEffect(() => {
    if (isLoading) {
      console.log(data);
    }
  }, [isLoading]);

  console.log('SEXQQQQ', rootStore.currentActivityStore.currentAsset);

  return (
    <>
      <div className={clsx(styles.desktop, styles.container)}>
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
                <div key={transaction.id + transaction.addressTo}>
                  <TransactionCard
                    id={transaction.id}
                    key={transaction.id + transaction.addressTo}
                    type={transaction.type}
                    asset={transaction.asset}
                    price={transaction.price}
                    amount={transaction.amount}
                    date={transaction.date}
                    addressTo={transaction.addressTo}
                    onClick={() =>
                      (rootStore.currentActivityStore.currentTransaction =
                        transaction)
                    }
                  />
                </div>
              ))}
            </>
          ) : (
            !isError && <div className={styles.empty}>Empty</div>
          )}
        </div>
      </div>

      <div className={clsx(styles.mobile, styles.container)}>
        <h2 className={styles.heading}>Transactions</h2>
        <div className={styles.table}>
          <div className={styles.header}>
            <span>Date</span>
            <span>Type</span>
            <span>Amount</span>
          </div>
          {isLoading && (
            <div className={styles.loading}>
              <OtherSpinner />
            </div>
          )}
          {isError && <div className={styles.empty}>Error</div>}
          {data && !isLoading ? (
            <>
              {data
                .slice(
                  (currentPage - 1) * EQUAL_TRANSACTION_FOR_ONE_PAGE,
                  currentPage * EQUAL_TRANSACTION_FOR_ONE_PAGE,
                )
                .map((transaction) => (
                  <div key={transaction.id + transaction.addressTo}>
                    <TransactionCard
                      id={transaction.id}
                      key={transaction.id + transaction.addressTo}
                      type={transaction.type}
                      asset={transaction.asset}
                      price={transaction.price}
                      amount={transaction.amount}
                      date={transaction.date}
                      addressTo={transaction.addressTo}
                      onClick={() => {
                        rootStore.currentActivityStore.currentTransaction =
                          transaction;
                      }}
                    />
                  </div>
                ))}
            </>
          ) : (
            !isError && <div className={styles.empty}>Empty</div>
          )}
        </div>
      </div>

      <div className={styles.buttons_container}>
        <ButtonsGroup
          buttonsProps={[
            currentPage > 1
              ? { text: (currentPage - 1).toString(), value: currentPage - 1 }
              : undefined,
            { text: currentPage.toString(), value: currentPage },
            { text: (currentPage + 1).toString(), value: currentPage + 1 },
            { text: (currentPage + 2).toString(), value: currentPage + 2 },
            { text: (currentPage + 3).toString(), value: currentPage + 3 },
          ]}
          activeValue={currentPage}
          onClick={(value) => setCurrentPage(value)}
        />
      </div>
    </>
  );
});
