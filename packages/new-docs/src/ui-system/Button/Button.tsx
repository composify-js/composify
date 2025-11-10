import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps, FC } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './ButtonVariants';

type Props = ComponentProps<'button'> &
  VariantProps<typeof variants> & {
    asChild?: boolean;
  };

export const Button: FC<Props> = ({ className, variant, size, asChild, ...props }) => {
  const Comp = asChild ? Slot : 'button';

  return <Comp className={variants({ className, variant, size })} {...props} />;
};
