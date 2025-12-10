import { tv } from 'tailwind-variants';

export const variants = tv({
  base: [
    'inline-flex',
    'items-center',
    'justify-center',
    'shrink-0',
    'outline-none',
    'rounded-sm',
    'font-medium',
    'whitespace-nowrap',
    'transition-all',
    'disabled:pointer-events-none',
    'disabled:opacity-70',
    'focus-visible:border-ring',
    'focus-visible:ring-ring/50',
    'focus-visible:ring-[3px]',
    '[&_svg]:shrink-0',
  ],
  variants: {
    variant: {
      primary: [
        'bg-primary',
        'text-primary-foreground',
        'fill-primary-foreground',
        'hover:bg-primary-dark',
        'hover:text-primary-foreground',
      ],
      secondary: [
        'bg-secondary',
        'text-secondary-foreground',
        'fill-secondary-foreground',
        'hover:opacity-90',
        'hover:text-secondary-foreground',
      ],
      outline: ['border', 'bg-background', 'text-foreground', 'hover:bg-accent', 'hover:text-foreground'],
    },
    size: {
      xs: ['px-12', 'h-32', 'gap-4', 'text-xs', "[&_svg:not([class*='size-'])]:size-12"],
      sm: ['px-12', 'h-36', 'gap-6', 'text-sm', "[&_svg:not([class*='size-'])]:size-14"],
      md: ['px-16', 'h-42', 'gap-8', 'text-sm', "[&_svg:not([class*='size-'])]:size-16"],
      lg: ['px-20', 'h-46', 'gap-10', 'text-base', "[&_svg:not([class*='size-'])]:size-18"],
      xl: ['px-24', 'h-52', 'gap-12', 'text-lg', "[&_svg:not([class*='size-'])]:size-20"],
    },
  },
});
