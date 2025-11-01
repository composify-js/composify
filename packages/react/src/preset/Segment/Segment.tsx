import { type ReactElement, useEffect, useState } from 'react';
import { createVariants } from '../../utils';
import styles from './Segment.module.css';

type Props<Value> = {
  className?: string;
  size: 'sm' | 'md';
  options: {
    value: Value;
    label?: ReactElement;
  }[];
  value: Value;
  onChange: (value: Value) => void;
};

const variants = createVariants(styles);

export const Segment = <Value,>({ className, size, options, onChange, ...props }: Props<Value>) => {
  const [value, setValue] = useState(options[0]?.value);

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  return (
    <div className={variants('segment', { className })} {...props}>
      {options.map((option) => (
        <button
          type="button"
          key={String(option.value)}
          className={variants('option', { size, active: option.value === value })}
          onClick={() => setValue(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
