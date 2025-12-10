import { tv } from 'tailwind-variants';

export const variants = tv({
  base: [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-6',
    'py-4',
    'rounded-sm',
    'text-xs',
    'font-medium',
    'whitespace-nowrap',
  ],
  variants: {
    variant: {
      default: ['bg-secondary', 'text-secondary-foreground'],
      outline: ['border', 'text-foreground'],
      muted: ['bg-muted', 'text-foreground'],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
