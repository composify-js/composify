import { tv } from 'tailwind-variants';

export const variants = tv({
  base: ['text-xs', 'text-foreground-variant'],
  variants: {
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
