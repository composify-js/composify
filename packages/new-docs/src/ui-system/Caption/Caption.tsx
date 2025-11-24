import type { FC, PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './CaptionVariants';

type Props = PropsWithChildren<{
  className?: string[];
}> &
  VariantProps<typeof variants>;

export const Caption: FC<Props> = ({ className, align, ...props }) => (
  <small className={variants({ className, align })} {...props} />
);
