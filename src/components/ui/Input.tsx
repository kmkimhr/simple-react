import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';
import styles from './Input.module.css';

type InputProps = ComponentProps<'input'>;

const Input = ({ className, ...rest }: InputProps) => {
  return <input {...rest} className={cn(styles.input, className)} />;
};

export default Input;
