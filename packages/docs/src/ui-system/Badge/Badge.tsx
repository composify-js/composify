import type { FC, PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './BadgeVariants';

type Props = PropsWithChildren<{
  className?: string[];
}> &
  VariantProps<typeof variants>;

export const Badge: FC<Props> = ({ className, variant, ...props }) => (
  <span className={variants({ className, variant })} {...props} />
);
