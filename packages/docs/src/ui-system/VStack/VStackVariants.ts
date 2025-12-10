import { tv } from 'tailwind-variants';

export const variants = tv({
  base: ['flex', 'flex-col'],
  variants: {
    alignHorizontal: {
      center: 'items-center',
      end: 'items-end',
      start: 'items-start',
      stretch: 'items-stretch',
    },
    alignVertical: {
      center: 'justify-center',
      end: 'justify-end',
      start: 'justify-start',
      between: 'justify-between',
      around: 'justify-around',
    },
  },
});
