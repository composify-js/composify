import type { FC, PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './BodyVariants';

type Props = PropsWithChildren<{
  className?: string[];
}> &
  VariantProps<typeof variants>;

export const Body: FC<Props> = ({ className, size, align, ...props }) => (
  <p className={variants({ className, size, align })} {...props} />
);
