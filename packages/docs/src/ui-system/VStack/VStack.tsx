import type { ComponentProps, FC } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './VStackVariants';

type Props = Omit<ComponentProps<'div'>, 'className'> &
  VariantProps<typeof variants> & {
    className?: string[];
  };

export const VStack: FC<Props> = ({ className, alignHorizontal, alignVertical, ...props }) => (
  <div className={variants({ alignHorizontal, alignVertical, class: className })} {...props} />
);
