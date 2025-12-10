import { createVariants } from '@composify/react/utils';
import type { ReactNode } from 'react';
import styles from './Segment.module.css';

const variants = createVariants(styles);

type Props<Value> = {
  className?: string;
  size: 'sm' | 'md';
  options: {
    value: Value;
    label?: ReactNode;
  }[];
  value: Value;
  onChange: (value: Value) => void;
};

export const Segment = <Value,>({ className, size, options, value, onChange, ...props }: Props<Value>) => (
  <div className={variants('segment', { className })} {...props}>
    {options.map((option) => (
      <button
        type="button"
        key={String(option.value)}
        className={variants('option', { size, active: option.value === value })}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
