import type { ComponentProps, FC } from 'react';
import { createVariants } from '../../utils';
import styles from './Input.module.css';

const variants = createVariants(styles);

type Props = ComponentProps<'input'>;

export const Input: FC<Props> = ({ className, ...props }) => (
  <input className={variants('input', { className })} {...props} />
);
