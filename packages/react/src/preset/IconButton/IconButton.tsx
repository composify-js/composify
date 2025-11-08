import type { ComponentProps, FC } from 'react';
import { createVariants } from '../../utils';
import styles from './IconButton.module.css';

type Props = ComponentProps<'button'> & {
  size: 'xs' | 'sm' | 'md' | 'lg';
};

const variants = createVariants(styles);

export const IconButton: FC<Props> = ({ className, size, ...props }) => (
  <button type="button" className={variants('iconButton', { className, size })} {...props} />
);
