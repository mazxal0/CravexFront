'use client';
import { observer } from 'mobx-react-lite';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { StandardModal } from '@/shared/components';
import { CryptoAssetModal } from '@/shared/components/Modals/AddNewCoinForWalletModal/CryptoAssetModal/CryptoAssetModal';
import { MenuModal } from '@/shared/components/Modals/AddNewCoinForWalletModal/MenuModal/MenuModal';
import { TonAddingWalletModal } from '@/shared/components/Modals/AddNewCoinForWalletModal/TonAddingWalletModal/TonAddingWalletModal';
import { rootStore } from '@/shared/stores';

export const AddNewCoinForWalletModal = observer(() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const currentPage = searchParams.get('page');

  useEffect(() => {
    if (currentPage || type) {
      rootStore.modalStore.isOpenAddingNewAsset = true;
    }

    return () => rootStore.modalStore.resetData();
  }, []);

  const updatePageParam = (
    page: string | null | (string | null)[],
    key: string | string[],
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!Array.isArray(page) && !Array.isArray(key)) {
      if (page) {
        params.set(key, page);
      } else {
        params.delete(key);
      }
    } else if (Array.isArray(key) && Array.isArray(page)) {
      if (key.length !== page.length)
        throw new Error('Arrays key and page must have equals length');
      key.forEach((keyEl, index) =>
        page[index] ? params.set(keyEl, page[index]) : params.delete(keyEl),
      );
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const onExit = async () => {
    if (type === 'choosing') {
      rootStore.modalStore.isOpenAddingNewAsset = false;
      rootStore.modalStore.resetData();
      updatePageParam([null, null], ['page', 'type']);
    } else {
      if (Number(currentPage) <= 1) {
        updatePageParam([null, 'choosing'], ['page', 'type']);
      } else {
        updatePageParam((Number(currentPage) - 1).toString(), 'page');
      }
    }
  };

  let CurrentPageComponent = null;
  switch (type) {
    case 'handle_adding':
      CurrentPageComponent = (
        <CryptoAssetModal
          page={currentPage}
          updatePageParam={updatePageParam}
        />
      );
      break;
    case 'ton_adding':
      CurrentPageComponent = <TonAddingWalletModal />;
      break;
    case 'choosing':
      CurrentPageComponent = <MenuModal updatePageParam={updatePageParam} />;
      break;
  }

  return (
    <StandardModal
      isOpen={rootStore.modalStore.isOpenAddingNewAsset}
      onClose={onExit}
      title={'Добавить актив'}
      cancelText={currentPage !== undefined ? 'Назад' : 'Закрыть'}
    >
      {CurrentPageComponent}
    </StandardModal>
  );
});
