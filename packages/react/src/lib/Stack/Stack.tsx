import { FC, PropsWithChildren, useMemo } from 'react';

type Props = {
  direction: 'horizontal' | 'vertical';
  alignHorizontal: 'center' | 'end' | 'start' | 'stretch';
  alignVertical: 'between' | 'center' | 'end' | 'start';
  flexWrap?: 'wrap' | 'nowrap';
  gap?: number;
  width?: number | string;
  minWidth?: number | string;
  height?: number | string;
  minHeight?: number | string;
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
  overflow?: 'hidden' | 'visible' | 'scroll';
  border?: {
    width: number;
    style: 'solid' | 'dashed' | 'dotted';
    color: string;
  };
  borderRadius?: number;
  backgroundColor?: string;
};

export const Stack: FC<PropsWithChildren<Props>> = ({
  direction,
  alignHorizontal,
  alignVertical,
  flexWrap,
  gap,
  width,
  minWidth,
  height,
  minHeight,
  padding,
  margin,
  overflow,
  border,
  borderRadius,
  backgroundColor,
  ...props
}) => {
  const alignItems = useMemo(() => {
    if (direction === 'vertical') {
      switch (alignHorizontal) {
        case 'center':
          return 'center';
        case 'end':
          return 'flex-end';
        case 'start':
          return 'flex-start';
        case 'stretch':
          return 'stretch';
      }
    }

    switch (alignVertical) {
      case 'between':
        return 'space-between';
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      case 'start':
        return 'flex-start';
    }
  }, [direction, alignHorizontal, alignVertical]);

  const justifyContent = useMemo(() => {
    if (direction === 'vertical') {
      switch (alignVertical) {
        case 'between':
          return 'space-between' as const;
        case 'center':
          return 'center' as const;
        case 'end':
          return 'flex-end' as const;
        case 'start':
          return 'flex-start' as const;
      }
    }

    switch (alignHorizontal) {
      case 'center':
        return 'center' as const;
      case 'end':
        return 'flex-end' as const;
      case 'start':
        return 'flex-start' as const;
      case 'stretch':
        return 'stretch' as const;
    }
  }, [direction, alignHorizontal, alignVertical]);

  const style = useMemo(
    () => ({
      display: 'flex',
      flexDirection: direction === 'horizontal' ? ('row' as const) : ('column' as const),
      alignItems,
      justifyContent,
      flexWrap,
      gap,
      width,
      minWidth,
      height,
      minHeight,
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
      direction,
      alignItems,
      justifyContent,
      flexWrap,
      gap,
      width,
      minWidth,
      height,
      minHeight,
      padding,
      margin,
      overflow,
      border,
      borderRadius,
      backgroundColor,
    ]
  );

  return <div style={style} {...props} />;
};
