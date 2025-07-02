import { DateForChart } from '@/shared/types/ChartData.types';

type ButtonProps = {
  text: string;
  value: DateForChart;
};

export interface ButtonsGroupProps {
  buttonsProps: ButtonProps[];
  onClick: (value: any) => void;
}
