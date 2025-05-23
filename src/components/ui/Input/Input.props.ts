import { HTMLMotionProps } from 'framer-motion';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps extends HTMLMotionProps<'input'> {
  label?: string;
  register?: UseFormRegisterReturn;
  classNameForLabel?: string;
  topLevelOfLabel?: number;
  bottomLevelOfLabel?: number;
  backgroundLabel?: 'primary' | 'secondary' | 'alternative';
}
