import type { FC, PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './VStackVariants';

type Props = PropsWithChildren<{
  className?: string[];
}> &
  VariantProps<typeof variants>;

export const VStack: FC<Props> = ({ className, alignHorizontal, alignVertical, ...props }) => (
  <div className={variants({ alignHorizontal, alignVertical, class: className })} {...props} />
);
