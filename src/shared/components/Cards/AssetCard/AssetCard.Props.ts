import { MotionProps } from 'framer-motion';

export interface AssetCardProps extends MotionProps {
  title: string;
  price: number;
  changing: number;
  ticket: string;
  amount: number;
  active: boolean;
  totalSum: number;
  logoUrl?: string;
  className?: string;
  onClick?: () => void;
}
