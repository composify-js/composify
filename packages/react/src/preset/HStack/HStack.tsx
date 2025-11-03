import type { FC, PropsWithChildren } from 'react';
import { createVariants } from '../../utils';
import styles from './HStack.module.css';

type Props = PropsWithChildren<{
  className?: string;
  alignHorizontal?: 'start' | 'end' | 'center' | 'between' | 'around';
  alignVertical?: 'stretch' | 'start' | 'end' | 'center';
  flex?: number;
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
  gap?: number;
  background?: string;
}>;

const variants = createVariants(styles);

export const HStack: FC<Props> = ({
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
    className={variants('hstack', {
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
      gap,
      background,
    }}
    {...props}
  />
);
