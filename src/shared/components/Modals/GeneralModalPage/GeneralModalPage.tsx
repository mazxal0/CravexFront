'use client';

import {
  AddNewCoinForWalletModal,
  CreatingTransactionModal,
  TransactionModal,
} from '@/shared/components';

export const GeneralModalPage = () => {
  return (
    <>
      <AddNewCoinForWalletModal />
      <TransactionModal />
      <CreatingTransactionModal />
    </>
  );
};
