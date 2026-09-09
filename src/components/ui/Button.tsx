import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';
import styles from './Button.module.css';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
};

const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      {...rest}
      className={cn(styles.button, styles[size], styles[variant], className)}
    />
  );
};

export default Button;
