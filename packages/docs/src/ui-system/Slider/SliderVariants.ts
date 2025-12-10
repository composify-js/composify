// import { tv } from 'tailwind-variants';

// export const variants = tv({
//   slots: {
//     root: ['w-full'],
//     track: ['relative', 'h-8', 'rounded-sm', 'bg-muted', 'overflow-hidden'],
//     fill: ['absolute', 'h-full', 'bg-primary', 'rounded-sm'],
//     thumb: [
//       'absolute',
//       'top-1/2',
//       '-translate-y-1/2',
//       '-translate-x-1/2',
//       'size-16',
//       'rounded-full',
//       'bg-primary',
//       'cursor-grab',
//       'active:cursor-grabbing',
//       'transition-transform',
//       'hover:scale-110',
//     ],
//     input: [
//       'absolute',
//       'inset-0',
//       'w-full',
//       'h-full',
//       'opacity-0',
//       'cursor-pointer',
//       'm-0',
//     ],
//   },
// });

import { tv } from 'tailwind-variants';

export const variants = tv({
  base: [
    'w-full',
    'h-8',
    'appearance-none',
    'border-none',
    'rounded-sm',
    'bg-transparent',
    'cursor-pointer',
    '[&::-webkit-slider-runnable-track]:h-8',
    '[&::-webkit-slider-runnable-track]:rounded-sm',
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:size-16',
    '[&::-webkit-slider-thumb]:rounded-full',
    '[&::-webkit-slider-thumb]:bg-primary',
    '[&::-webkit-slider-thumb]:cursor-grab',
    '[&::-webkit-slider-thumb]:active:cursor-grabbing',
    '[&::-webkit-slider-thumb]:mt-[-4px]',
    '[&::-moz-range-track]:h-8',
    '[&::-moz-range-track]:rounded-sm',
    '[&::-moz-range-thumb]:size-16',
    '[&::-moz-range-thumb]:rounded-full',
    '[&::-moz-range-thumb]:bg-primary',
    '[&::-moz-range-thumb]:cursor-grab',
    '[&::-moz-range-thumb]:active:cursor-grabbing',
    '[&::-moz-range-thumb]:border-0',
  ],
});
