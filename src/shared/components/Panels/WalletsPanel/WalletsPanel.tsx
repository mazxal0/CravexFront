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
    return (
      <div className={styles.wallets_place}>
        {isLoading && !wallets ? (
          <SkeletonEl height={110} count={3} borderRadius={10} />
        ) : (
          wallets && (
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
                    walletId={wallet.id}
                    index={index}
                    name={wallet.name}
                    totalBalance={wallet.totalBalance}
                    changing={wallet.totalChange}
                    dominateAssetName={wallet.dominanceName}
                    dominateAssetInPercent={wallet.dominanceInPercent}
                    deleteWallet={deleteWallet}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )
        )}
      </div>
    );
  },
);
