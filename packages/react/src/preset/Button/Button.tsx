import type { ComponentProps, FC } from 'react';
import { createVariants } from '../../utils';
import styles from './Button.module.css';

type Props = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'xs' | 'sm' | 'md';
};

const variants = createVariants(styles);

export const Button: FC<Props> = ({ className, variant, size, ...props }) => (
  <button className={variants('container', { className, variant, size })} {...props} />
);
