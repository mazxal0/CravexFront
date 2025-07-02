'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';

import styles from './WalletsPanel.module.scss';

import { SkeletonEl } from '@/components/ui';
import { WalletCard } from '@/shared/components';
import { WalletPreviewType } from '@/shared/types/Wallet.types';

export const WalletsPanel = observer(
  ({
    wallets,
    isLoading,
    deleteWallet,
  }: {
    wallets?: WalletPreviewType[];
    isLoading: boolean;
    deleteWallet: (walletId: string) => void;
  }) => {
    if (isLoading) {
      return (
        <div className={styles.wallets_place}>
          <SkeletonEl height={110} count={3} borderRadius={10} />
        </div>
      );
    }
    if (wallets) {
      return (
        <div className={styles.wallets_place}>
          <AnimatePresence mode={'popLayout'}>
            {wallets.map((wallet, index) => (
              <motion.div
                key={wallet.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <WalletCard
                  key={wallet.id}
                  id={wallet.id}
                  index={index}
                  name={wallet.name}
                  totalBalance={wallet.totalBalance}
                  changing={wallet.changing}
                  dominateAssetName={wallet.dominanceName}
                  dominateAssetInPercent={wallet.dominanceInPercent}
                  deleteWallet={deleteWallet}
                />
              </motion.div>
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
          </AnimatePresence>
        </div>
      );
    }
  },
);
