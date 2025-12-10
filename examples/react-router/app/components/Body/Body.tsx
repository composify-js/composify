import type { FC, PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const variants = tv({
  base: ['margin-0', 'text-foreground-variant'],
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

type Props = PropsWithChildren<VariantProps<typeof variants>>;

export const Body: FC<Props> = ({ size, align, ...props }) => <p className={variants({ size, align })} {...props} />;
