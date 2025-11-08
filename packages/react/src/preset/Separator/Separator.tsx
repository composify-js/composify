import type { FC, PropsWithChildren } from 'react';
import { createVariants } from '../../utils';
import styles from './Separator.module.css';

const variants = createVariants(styles);

type Props = PropsWithChildren<{
  className?: string;
  orientation: 'horizontal' | 'vertical';
}>;

export const Separator: FC<Props> = ({ className, orientation, ...props }) => (
  <div className={variants('separator', { className, orientation })} {...props} />
);
