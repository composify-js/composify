import { tv } from 'tailwind-variants';

export const variants = tv({
  slots: {
    container: ['group', 'py-24', 'border-b', '[&:last-child]:border-0'],
    header: [
      'flex',
      'flex-row',
      'justify-between',
      'items-center',
      'cursor-pointer',
      'list-none',
      '[&::marker]:hidden',
    ],
    summary: ['flex-1', 'text-xl', 'max-md:text-lg', 'text-foreground', 'font-semibold'],
    chevron: ['text-foreground-variant', 'group-open:-rotate-180'],
    content: ['text-lg', 'max-md:text-md', 'text-foreground-variant', 'mt-16', 'pr-24'],
  },
});
