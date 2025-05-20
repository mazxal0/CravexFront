'use client';

import { observer } from 'mobx-react-lite';
import React from 'react';

import { StandardModal } from '@/shared/components';
import { modalStore } from '@/shared/stores/ModalStore';

const cryptoOptions = [
  { value: 1, label: 'Bitcoin (BTC)' },
  { value: 2, label: 'Ethereum (ETH)' },
  { value: 3, label: 'Binance Coin (BNB)' },
  { value: 4, label: 'Cardano (ADA)' },
  { value: 5, label: 'Solana (SOL)' },
  { value: 6, label: 'XRP (XRP)' },
  { value: 7, label: 'Polkadot (DOT)' },
  { value: 8, label: 'Dogecoin (DOGE)' },
  { value: 9, label: 'Shiba Inu (SHIB)' },
  { value: 10, label: 'Polygon (MATIC)' },
  { value: 11, label: 'Avalanche (AVAX)' },
  { value: 12, label: 'Chainlink (LINK)' },
  { value: 13, label: 'Litecoin (LTC)' },
  { value: 14, label: 'Uniswap (UNI)' },
  { value: 15, label: 'Terra (LUNA)' },
  { value: 16, label: 'Algorand (ALGO)' },
  { value: 17, label: 'VeChain (VET)' },
  { value: 18, label: 'Stellar (XLM)' },
  { value: 19, label: 'Cosmos (ATOM)' },
  { value: 20, label: 'Axie Infinity (AXS)' },
  { value: 21, label: 'Filecoin (FIL)' },
  { value: 22, label: 'THETA (THETA)' },
  { value: 23, label: 'Ethereum Classic (ETC)' },
  { value: 24, label: 'Bitcoin Cash (BCH)' },
  { value: 25, label: 'FTX Token (FTT)' },
  { value: 26, label: 'Decentraland (MANA)' },
  { value: 27, label: 'Tezos (XTZ)' },
  { value: 28, label: 'Monero (XMR)' },
  { value: 29, label: 'EOS (EOS)' },
  { value: 30, label: 'Aave (AAVE)' },
  { value: 31, label: 'Kusama (KSM)' },
  { value: 32, label: 'Compound (COMP)' },
  { value: 33, label: 'Maker (MKR)' },
  { value: 34, label: 'Theta Fuel (TFUEL)' },
  { value: 35, label: 'IOTA (MIOTA)' },
  { value: 36, label: 'Synthetix (SNX)' },
  { value: 37, label: 'Zcash (ZEC)' },
  { value: 38, label: 'Enjin Coin (ENJ)' },
  { value: 39, label: 'Chiliz (CHZ)' },
  { value: 40, label: 'Harmony (ONE)' },
  { value: 41, label: 'Basic Attention Token (BAT)' },
  { value: 42, label: 'Quant (QNT)' },
  { value: 43, label: 'Helium (HNT)' },
  { value: 44, label: 'Klaytn (KLAY)' },
  { value: 45, label: 'BitTorrent (BTT)' },
  { value: 46, label: 'Neo (NEO)' },
  { value: 47, label: 'Waves (WAVES)' },
  { value: 48, label: 'Dash (DASH)' },
  { value: 49, label: 'Zilliqa (ZIL)' },
  { value: 50, label: 'Loopring (LRC)' },
];

export const GeneralModalPage = observer(() => {
  return (
    <>
      <StandardModal
        isOpen={modalStore.isOpenAddingNewAsset}
        onClose={() => (modalStore.isOpenAddingNewAsset = false)}
        onConfirm={function (): void {
          throw new Error('Function not implemented.');
        }}
        title={'Добавить актив'}
        children={cryptoOptions}
        confirmText={'ОПа'}
        cancelText={'ПРПА'}
      />
    </>
  );
});
