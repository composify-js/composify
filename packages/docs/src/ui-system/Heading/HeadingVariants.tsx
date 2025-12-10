import { tv } from 'tailwind-variants';

export const variants = tv({
  base: ['margin-0', 'text-foreground'],
  variants: {
    size: {
      lg: ['text-lg', 'leading-[1.1]', 'tracking-normal'],
      xl: ['text-xl', 'leading-[1.1]', 'tracking-normal'],
      '2xl': ['text-2xl', 'leading-[1.1]', 'tracking-normal'],
      '3xl': ['text-3xl', 'leading-[1.1]', 'tracking-normal'],
      '4xl': ['text-4xl', 'leading-[1.1]', 'tracking-[-0.02em]'],
      '5xl': ['text-5xl', 'leading-[1.1]', 'tracking-[-0.02em]'],
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
