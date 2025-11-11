import { tv } from 'tailwind-variants';

export const variants = tv({
  base: ['margin-0', 'text-foreground', 'leading-[1.1]', 'tracking-tight'],
  variants: {
    size: {
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    weight: {
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  defaultVariants: {
    weight: 'bold',
  },
});
