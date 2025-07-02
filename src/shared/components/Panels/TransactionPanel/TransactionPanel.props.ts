import { TransactionCardProps } from '@/shared/components/Cards/TransactionCard/TransactionCard.props';

export interface TransactionPanelProps {
  transactions?: TransactionCardProps[];
  isLoading: boolean;
}
