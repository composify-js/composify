import {
  Children,
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createVariants } from '../../utils';
import styles from './Segment.module.css';
import type { Props as SegmentItemProps } from './SegmentItem';

type Props<Value> = PropsWithChildren<{
  className?: string;
  value: Value;
  onChange: (value: Value) => void;
}>;

const variants = createVariants(styles);

export const SegmentFrame = <Value,>({ className, children, onChange, ...props }: Props<Value>) => {
  const validChildren = useMemo(
    () =>
      Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement<
        SegmentItemProps<Value>
      >[],
    [children],
  );

  const options = useMemo(
    () => validChildren.map(({ props }) => ({ ...props })) ?? [],
    [validChildren],
  );

  const [value, setValue] = useState(options[0]?.value);

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  return (
    <div className={variants('frame', { className })} {...props}>
      {validChildren.map((child) =>
        cloneElement(child, { active: child.props.value === value, onChange: setValue }),
      )}
    </div>
  );
};
