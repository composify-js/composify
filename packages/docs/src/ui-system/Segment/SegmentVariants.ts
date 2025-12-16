import { tv } from 'tailwind-variants';

export const variants = tv({
  slots: {
    frame: ['inline-flex', 'items-center', 'justify-center', 'gap-1', 'border', 'bg-background'],
    option: [
      'flex-1',
      'inline-flex',
      'items-center',
      'justify-center',
      'bg-transparent',
      'text-xs',
      'font-semibold',
      'whitespace-nowrap',
      'border-none',
      'outline-none',
      'text-on-surface-variant',
      'cursor-pointer',
    ],
  },
  variants: {
    size: {
      md: {
        frame: ['p-2', 'rounded-sm'],
        option: [
          'h-30',
          'px-10',
          'rounded-[3px]',
          '[&_svg]:size-16',
          '[&>:not(svg)]:text-sm',
          '[&>:not(svg)]:leading-none',
        ],
      },
      xl: {
        frame: ['p-3', 'rounded-md'],
        option: [
          'h-44',
          'px-14',
          'rounded-sm',
          '[&_svg]:size-24',
          '[&>:not(svg)]:text-base',
          '[&>:not(svg)]:leading-none',
        ],
      },
    },
    active: {
      true: {
        option: ['bg-secondary', 'text-secondary-foreground'],
      },
      false: {},
    },
  },
});
