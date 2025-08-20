import { type FC, type PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignVertical?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
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
  backgroundColor?: string;
  gap?: number;
}>;

export const HStack: FC<Props> = ({
  alignVertical,
  alignHorizontal,
  size,
  padding,
  margin,
  gap,
  backgroundColor,
  children,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: alignVertical,
      justifyContent: alignHorizontal,
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
      backgroundColor,
    }}
  >
    {children}
  </div>
);
