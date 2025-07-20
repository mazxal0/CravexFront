export type SelectOption =
  | string
  | {
      label: string;
      value: any;
    };

export type SelectProps = {
  options: SelectOption[];
  label: string;
  value?: SelectOption;
  onChange?: (value: any) => void;
  className?: string;
  name?: string;
};
