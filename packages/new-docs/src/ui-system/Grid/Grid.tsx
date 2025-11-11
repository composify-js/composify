import type { ComponentProps, FC } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './GridVariants';

type Props = ComponentProps<'div'> &
  VariantProps<typeof variants> & {
    className?: string[];
  };

export const Grid: FC<Props> = ({ className, columns, rows, ...props }) => (
  <div className={variants({ className, columns, rows })} {...props} />
);
