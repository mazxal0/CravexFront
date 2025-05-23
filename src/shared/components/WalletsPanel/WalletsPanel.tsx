'use client';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import styles from './WalletsPanel.module.scss';

import { WalletCard } from '@/shared/components';
import { rootStore } from '@/shared/stores';

export const WalletsPanel = observer(() => {
  useEffect(() => {
    rootStore.walletsPageManagerStore.getAllWallets();
  }, []);

  return (
    <div className={styles.wallets_place}>
      {rootStore.walletsPageManagerStore.wallets.map((wallet) => (
        <WalletCard
          key={wallet.id}
          id={wallet.id}
          name={wallet.name}
          totalSum={wallet.totalBalance}
          changing={wallet.changing}
          dominateAssetName={wallet.dominanceName}
          dominateAssetInPercent={wallet.dominanceInPercent}
        />
      ))}

      {/*<WalletCard*/}
      {/*  name={'First Wallet'}*/}
      {/*  totalSum={1234}*/}
      {/*  changing={23}*/}
      {/*  dominateAssetName={'btc'}*/}
      {/*  dominateAssetInPercent={57}*/}
      {/*/>*/}
      {/*<WalletCard*/}
      {/*  name={'First Wallet'}*/}
      {/*  totalSum={134}*/}
      {/*  changing={-3}*/}
      {/*  dominateAssetName={'sol'}*/}
      {/*  dominateAssetInPercent={97}*/}
      {/*/>*/}
      {/*<WalletCard*/}
      {/*  name={'First Wallet'}*/}
      {/*  totalSum={134}*/}
      {/*  changing={-3}*/}
      {/*  dominateAssetName={'sol'}*/}
      {/*  dominateAssetInPercent={97}*/}
      {/*/>*/}

      {/*<div className={styles.wallets_placeholder}>*/}
      {/*<div className={styles.text_placeholder}>*/}
      {/*  <span>*/}
      {/*    while you have not any wallet. You can create new {'->'}*/}
      {/*  </span>*/}
      {/*  <Button className={styles.button}>Add</Button>*/}
      {/*</div>*/}
      {/*</div>*/}
    </div>
  );
});
