import { tv } from 'tailwind-variants';

export const variants = tv({
  base: ['margin-0', 'text-foreground-variant'],
  variants: {
    size: {
      sm: 'text-sm/18',
      md: 'text-base/22',
      lg: 'text-lg/24',
      xl: 'text-xl/28',
      '2xl': 'text-2xl/32',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
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
