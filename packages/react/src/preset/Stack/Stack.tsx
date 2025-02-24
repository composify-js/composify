import { FC, PropsWithChildren, useMemo } from 'react';

export type StackProps = {
  /* flex */
  flex?: number;
  flexDirection?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number;
  /* size */
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  /* space */
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  /* border */
  border?: {
    width: number;
    style: 'solid' | 'dashed' | 'dotted';
    color: string;
  };
  borderRadius?: number;
  /* background */
  backgroundColor?: string;
  /* overflow */
  overflow?: 'hidden' | 'visible' | 'scroll';
};

export const Stack: FC<PropsWithChildren<StackProps>> = ({
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  alignSelf,
  justifyContent,
  gap,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  padding,
  margin,
  border,
  borderRadius,
  backgroundColor,
  overflow,
  ...props
}) => {
  const style = useMemo(
    () => ({
      display: 'flex',
      flex,
      flexDirection,
      flexWrap,
      alignItems,
      alignSelf,
      justifyContent,
      gap,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      overflow,
      borderWidth: border?.width,
      borderStyle: border?.style,
      borderColor: border?.color,
      borderRadius,
      backgroundColor,
    }),
    [
      flex,
      flexDirection,
      flexWrap,
      alignItems,
      alignSelf,
      justifyContent,
      gap,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      padding,
      margin,
      border,
      borderRadius,
      backgroundColor,
      overflow,
    ]
  );

  return <div style={style} {...props} />;
};
