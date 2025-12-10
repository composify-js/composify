import type { ComponentProps, FC } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './LinkVariants';

type Props = Omit<ComponentProps<'a'>, 'className'> &
  VariantProps<typeof variants> & {
    className?: string[];
  };

export const Link: FC<Props> = ({ className, plain, href, ...props }) => (
  <a className={variants({ className, plain })} href={href} {...props} />
);
