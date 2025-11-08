import type { ComponentProps, FC } from 'react';
import { createVariants } from '../../utils';
import styles from './Grid.module.css';

const variants = createVariants(styles);

type Props = ComponentProps<'div'> & {
  columns?: number;
  rows?: number;
  alignItems?: 'stretch' | 'start' | 'end' | 'center';
  justifyItems?: 'stretch' | 'start' | 'end' | 'center';
  gap?: number;
  width?: number | string;
  height?: number | string;
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  background?: string;
};

export const Grid: FC<Props> = ({
  className,
  columns,
  rows,
  alignItems,
  justifyItems,
  gap,
  width,
  height,
  padding,
  margin,
  background,
  ...props
}) => (
  <div
    className={variants('grid', {
      className,
      alignItems,
      justifyItems,
      ...(background?.startsWith('#') ? {} : { background }),
    })}
    style={{
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap,
      width,
      height,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      ...(background?.startsWith('#') ? { background } : {}),
    }}
    {...props}
  />
);
