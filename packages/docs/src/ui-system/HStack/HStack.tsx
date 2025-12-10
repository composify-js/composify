import type { FC, PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './HStackVariants';

type Props = PropsWithChildren<{
  className?: string[];
}> &
  VariantProps<typeof variants>;

export const HStack: FC<Props> = ({ className, alignHorizontal, alignVertical, ...props }) => (
  <div className={variants({ alignHorizontal, alignVertical, class: className })} {...props} />
);
