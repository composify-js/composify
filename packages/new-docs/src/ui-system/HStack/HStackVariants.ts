import { tv } from 'tailwind-variants';

export const variants = tv({
  base: ['flex', 'flex-row'],
  variants: {
    alignHorizontal: {
      center: 'justify-center',
      end: 'justify-end',
      start: 'justify-start',
      between: 'justify-between',
      around: 'justify-around',
    },
    alignVertical: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
});
