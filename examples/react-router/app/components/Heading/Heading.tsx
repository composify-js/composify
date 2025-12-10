import type { FC, JSX, PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const variants = tv({
  base: ['margin-0', 'text-foreground', 'leading-tight', 'tracking-tight'],
  variants: {
    size: {
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    weight: {
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    weight: 'bold',
    align: 'left',
  },
});

type Props = PropsWithChildren<
  {
    level: number;
  } & VariantProps<typeof variants>
>;

export const Heading: FC<Props> = ({ level, size, weight, align, ...props }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return <HeadingTag className={variants({ size, weight, align })} {...props} />;
};
