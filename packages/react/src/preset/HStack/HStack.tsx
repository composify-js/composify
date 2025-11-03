import type { ComponentProps, FC } from 'react';
import { createVariants } from '../../utils';
import styles from './HStack.module.css';

const variants = createVariants(styles);

type Props = ComponentProps<'div'> & {
  alignHorizontal?: 'start' | 'end' | 'center' | 'between' | 'around';
  alignVertical?: 'stretch' | 'start' | 'end' | 'center';
  flex?: number;
  width?: number | string;
  height?: number | string;
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  gap?: number;
  background?: string;
};

export const HStack: FC<Props> = ({
  className,
  alignHorizontal,
  alignVertical,
  flex,
  padding,
  margin,
  gap,
  width,
  height,
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
