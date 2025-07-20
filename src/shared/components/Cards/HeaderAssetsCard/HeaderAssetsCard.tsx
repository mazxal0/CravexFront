'use client';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import styles from './HeaderAssetsCard.module.scss';

import { ShareIcon } from '@/components/icons';
import { ChangingWithChevron, MenuButton, SkeletonEl } from '@/components/ui';
import api from '@/lib/axios';
import { DropTabMenu } from '@/shared/components';
import { HeaderAssetsCardProps } from '@/shared/components/Cards/HeaderAssetsCard/HeaderAssetsCard.Props';
import { useColorOfGrowing } from '@/shared/hooks';
import { rootStore } from '@/shared/stores';
import {
  calculateTotalPortfolioChange,
  formatLengthNumber,
  formatNumberWithSpaces,
} from '@/shared/utils';

export const HeaderAssetsCard: FC<HeaderAssetsCardProps> = observer(() => {
  const { color } = useColorOfGrowing(
    calculateTotalPortfolioChange(rootStore.walletActivityStore.walletAssets),
  );

  const [isOpenWalletMenu, setIsOpenWalletMenu] = useState<boolean>(false);

  return (
    <div className={styles.header_assets}>
      <h5 className={styles.text}>Total Balance</h5>
      <h1 className={styles.total_balance}>
        {formatNumberWithSpaces(
          rootStore.walletActivityStore.currentAllWalletBalance,
        ) || <SkeletonEl width={200} height={40} />}
        <span> $</span>
      </h1>
      <ChangingWithChevron
        type={'mark'}
        color={color}
        changing={formatLengthNumber(
          rootStore.walletActivityStore.currentTotalChanging,
          3,
        )}
      />
      <div className={styles.share}>
        <MenuButton
          setIsOpening={setIsOpenWalletMenu}
          imageElement={<ShareIcon />}
        />
      </div>
      {isOpenWalletMenu && (
        <DropTabMenu
          className={styles.drop_tab_menu_mobile}
          isOpen={isOpenWalletMenu}
          onClose={() => setIsOpenWalletMenu(false)}
          items={[
            { text: 'Копировать ссылку', callback: () => {} },
            {
              text: 'Экспортировать в PDF',
              callback: async () => {
                try {
                  const walletId = rootStore.userStore.walletId;
                  const response = await api.get(
                    `export/pdf/wallet/${walletId}`,
                    {
                      responseType: 'blob',
                      headers: {
                        Accept: 'application/pdf',
                      },
                    },
                  );

                  if (response.status < 200 || response.status >= 300) {
                    throw new Error(
                      `Ошибка при экспорте PDF: ${response.status}`,
                    );
                  }

                  const blob = response.data;
                  const url = window.URL.createObjectURL(blob);

                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Report_Wallet_${walletId}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (error) {
                  console.error('Ошибка при скачивании PDF:', error);
                }
              },
            },
            {
              text: 'Экспортировать в Excel',
              callback: async () => {
                try {
                  const walletId = rootStore.userStore.walletId;
                  const response = await api.get(
                    `export/excel/wallet/${walletId}`,
                    {
                      responseType: 'blob',
                      headers: {
                        Accept:
                          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                      },
                    },
                  );
                  if (response.status < 200 || response.status >= 300) {
                    throw new Error(
                      `Ошибка при экспорте Excel: ${response.status}`,
                    );
                  }

                  const blob = response.data;
                  const url = window.URL.createObjectURL(blob);

                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Report_Wallet_${walletId}.xlsx`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (error) {
                  console.error('Ошибка при скачивании Excel:', error);
                }
              },
            },
          ]}
          top={70}
          right={20}
        />
      )}
    </div>
  );
});
