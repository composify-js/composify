import type { ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './SegmentVariants';

type Props<Value> = VariantProps<typeof variants> & {
  className?: string[];
  options: {
    value: Value;
    label?: ReactNode;
  }[];
  value: Value;
  onChange: (value: Value) => void;
};

export const Segment = <Value,>({ className, size, options, value, onChange }: Props<Value>) => (
  <div className={variants().frame({ className, size })}>
    {options.map((option) => (
      <button
        type="button"
        key={String(option.value)}
        className={variants().option({ active: option.value === value, size })}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
