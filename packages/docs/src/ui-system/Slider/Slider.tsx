import type { FC } from 'react';
import { variants } from './SliderVariants';

type Props = {
  className?: string[];
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

export const Slider: FC<Props> = ({ className, min, max, step = 1, value, onChange }) => {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <input
      type="range"
      className={variants({ className })}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={
        {
          background: `linear-gradient(to right, var(--primary) ${progress}%, var(--muted) ${progress}%)`,
          '--progress': `${progress}%`,
        } as React.CSSProperties
      }
    />
  );
};
