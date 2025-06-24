import { InputProps } from '@/components/ui/Input/Input.props';

export interface ControlInputProps extends InputProps {
  delay: number;
  onSearch: (query: string) => void;
  onHandleChange: (value: string) => void;
  value: string;
}
