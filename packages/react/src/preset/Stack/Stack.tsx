import { type FC, type PropsWithChildren, useMemo } from 'react';

export type StackProps = {
  /* flex */
  flexGrow?: number;
  flexWrap?: 'wrap' | 'nowrap';
  flexDirection?: 'row' | 'column';
  gap?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  size?: {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
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
  border?: {
    width?: number;
    style?: 'solid' | 'dashed' | 'dotted';
    color?: string;
    radius?: number;
  };
  backgroundColor?: string;
  overflow?: 'hidden' | 'visible' | 'scroll';
};

export const Stack: FC<PropsWithChildren<StackProps>> = ({
  flexGrow,
  flexWrap,
  flexDirection,
  gap,
  alignItems,
  alignSelf,
  justifyContent,
  size,
  padding,
  margin,
  border,
  backgroundColor,
  overflow,
  ...props
}) => {
  const style = useMemo(
    () => ({
      display: 'flex',
      flexGrow: flexGrow,
      flexWrap,
      flexDirection,
      gap,
      alignItems,
      alignSelf,
      justifyContent,
      width: size?.width,
      minWidth: size?.minWidth,
      maxWidth: size?.maxWidth,
      height: size?.height,
      minHeight: size?.minHeight,
      maxHeight: size?.maxHeight,
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
      borderRadius: border?.radius,
      backgroundColor,
    }),
    [
      flexGrow,
      flexWrap,
      flexDirection,
      gap,
      alignItems,
      alignSelf,
      justifyContent,
      size,
      padding,
      margin,
      border,
      backgroundColor,
      overflow,
    ]
  );

  return <div style={style} {...props} />;
};
