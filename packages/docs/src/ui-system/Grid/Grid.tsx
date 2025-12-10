import type { ComponentProps, FC } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './GridVariants';

type Props = Omit<ComponentProps<'div'>, 'className'> &
  VariantProps<typeof variants> & {
    className?: string[];
  };

export const Grid: FC<Props> = ({ className, columns, rows, ...props }) => (
  <div className={variants({ className, columns, rows })} {...props} />
);
