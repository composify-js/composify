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
  size?: {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  background?: string;
}>;

export const VStack: FC<Props> = ({
  className,
  alignHorizontal,
  alignVertical,
  flex,
  size,
  padding,
  margin,
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
      width: size?.width,
      minWidth: size?.minWidth,
      maxWidth: size?.maxWidth,
      height: size?.height,
      minHeight: size?.minHeight,
      maxHeight: size?.maxHeight,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      background,
      gap,
    }}
    {...props}
  />
);
