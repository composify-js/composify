import type { ComponentProps, FC } from 'react';
import { createVariants } from '../../utils';
import styles from './Button.module.css';

type Props = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
};

const variants = createVariants(styles);

export const Button: FC<Props> = ({ className, variant, size, ...props }) => (
  <button className={variants('button', { className, variant, size })} {...props} />
);
