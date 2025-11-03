import type { FC, PropsWithChildren } from 'react';
import { createVariants } from '../../utils';
import styles from './VStack.module.css';

const variants = createVariants(styles);

type Props = PropsWithChildren<{
  className?: string;
  alignHorizontal?: 'stretch' | 'start' | 'end' | 'center';
  alignVertical?: 'start' | 'end' | 'center' | 'between' | 'around';
  flex?: number;
  gap?: number;
  width?: number | string;
  height?: number | string;
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  background?: string;
}>;

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
      background,
    }}
    {...props}
  />
);
