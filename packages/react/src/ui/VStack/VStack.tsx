import { createVariants } from '@composify/react/utils';
import type { ComponentProps, FC } from 'react';
import styles from './VStack.module.css';

const variants = createVariants(styles);

type Props = ComponentProps<'div'> & {
  alignHorizontal?: 'stretch' | 'start' | 'end' | 'center';
  alignVertical?: 'start' | 'end' | 'center' | 'between' | 'around';
  flex?: number;
  gap?: number;
  width?: number | string;
  height?: number | string;
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  background?: string;
};

export const VStack: FC<Props> = ({
  className,
  alignHorizontal,
  alignVertical,
  flex,
  padding,
  width,
  margin,
  height,
  gap,
  background,
  ...props
}) => (
  <div
    className={variants('vstack', {
      className,
      alignHorizontal,
      alignVertical,
      ...(background?.startsWith('#') ? {} : { background }),
    })}
    style={{
      flex,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      gap,
      width,
      height,
      ...(background?.startsWith('#') ? { background } : {}),
    }}
    {...props}
  />
);
