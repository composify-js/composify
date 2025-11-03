import type { ComponentProps, FC } from 'react';
import { createVariants } from '../../utils';
import styles from './Input.module.css';

type Props = ComponentProps<'input'>;

const variants = createVariants(styles);

export const Input: FC<Props> = ({ className, ...props }) => (
  <input className={variants('input', { className })} {...props} />
);
