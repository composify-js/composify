import type { ComponentProps, FC } from 'react';
import { Link as RouterLink } from 'react-router';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './LinkVariants';

type Props = Omit<ComponentProps<'a'>, 'className'> &
  VariantProps<typeof variants> & {
    className?: string[];
  };

export const Link: FC<Props> = ({ className, plain, href, ...props }) => {
  const isExternal = href?.match(/^(https?:|mailto:|tel:)/);

  if (isExternal) {
    return <a className={variants({ className, plain })} href={href} {...props} />;
  }

  return <RouterLink className={variants({ className, plain })} to={href ?? ''} {...props} />;
};
