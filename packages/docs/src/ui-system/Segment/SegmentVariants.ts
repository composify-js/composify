import { tv } from 'tailwind-variants';

export const variants = tv({
  slots: {
    frame: ['inline-flex', 'items-center', 'justify-center', 'p-3', 'rounded-md', 'border', 'bg-surface-container-low'],
    option: [
      'flex-1',
      'inline-flex',
      'items-center',
      'justify-center',
      'h-44',
      'px-14',
      'bg-transparent',
      'text-xs',
      'font-medium',
      'whitespace-nowrap',
      'rounded-sm',
      'border-none',
      'outline-none',
      'text-on-surface-variant',
      'cursor-pointer',
      'transition-all',
      '[&_svg]:size-24',
      '[&>:not(svg)]:text-base',
      '[&>:not(svg)]:leading-none',
    ],
  },
  variants: {
    active: {
      true: {
        option: ['bg-secondary', 'text-secondary-foreground'],
      },
      false: {},
    },
  },
});
