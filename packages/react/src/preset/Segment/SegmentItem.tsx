import type { PropsWithChildren } from 'react';
import { createVariants } from '../../utils';
import styles from './Segment.module.css';

export type Props<Value> = PropsWithChildren<{
  className?: string;
  active?: boolean;
  value: Value;
  onChange?: (value: Value) => void;
}>;

const variants = createVariants(styles);

export const SegmentItem = <Value,>({
  className,
  active,
  value,
  onChange,
  ...props
}: Props<Value>) => (
  <button
    className={variants('item', { className, active })}
    onClick={() => onChange?.(value)}
    {...props}
  />
);
