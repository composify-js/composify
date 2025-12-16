import { tv } from 'tailwind-variants';

export const variants = tv({
  slots: {
    container: ['group', 'py-24', 'max-md:py-20', 'border-b', '[&:last-child]:border-0'],
    header: [
      'flex',
      'flex-row',
      'gap-8',
      'justify-between',
      'items-center',
      'cursor-pointer',
      'list-none',
      '[&::marker]:hidden',
    ],
    summary: ['flex-1', 'text-lg', 'max-md:text-md', 'text-foreground', 'font-semibold'],
    chevron: ['w-24', 'max-md:w-20', 'h-24', 'max-md:h-20', 'text-foreground-variant', 'group-open:-rotate-180'],
    content: ['text-lg', 'max-md:text-md', 'text-foreground-variant', 'mt-12', 'max-md:mt-8', 'pr-24'],
  },
});
