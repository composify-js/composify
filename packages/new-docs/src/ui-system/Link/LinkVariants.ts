import { tv } from 'tailwind-variants';

export const variants = tv({
  base: [],
  variants: {
    plain: {
      true: [],
      false: ['text-foreground', 'hover:text-primary', 'transition-[color]'],
    },
  },
  defaultVariants: {
    plain: false,
  },
});
