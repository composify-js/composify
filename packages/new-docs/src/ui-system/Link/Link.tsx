import NextLink from 'next/link';
import type { ComponentProps, FC } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './LinkVariants';

type Props = Omit<ComponentProps<typeof NextLink>, 'className'> &
  VariantProps<typeof variants> & {
    className?: string[];
  };

export const Link: FC<Props> = ({ className, plain, href, ...props }) => (
  <NextLink className={variants({ className, plain })} href={href} {...props} />
);
