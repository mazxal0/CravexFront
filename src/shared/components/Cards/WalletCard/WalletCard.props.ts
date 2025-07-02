export interface WalletCardProps {
  id: string;
  index: number;
  name?: string;
  totalBalance?: number;
  changing?: number;
  dominateAssetName?: string;
  dominateAssetInPercent?: number;
  deleteWallet: (walletId: string) => void;
}
