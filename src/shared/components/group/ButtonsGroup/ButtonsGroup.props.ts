import { DateForChart } from '@/shared/types/ChartData.types';

type ButtonProps = {
  text: string;
  value: DateForChart | string | number;
};

export interface ButtonsGroupProps {
  buttonsProps: (ButtonProps | undefined)[];
  activeValue: string | number;
  onClick: (value: any) => void;
}
