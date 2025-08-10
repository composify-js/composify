import { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';

type Props = PropsWithChildren<{
  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignVertical?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  size?: {
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    minHeight?: number;
    maxHeight?: number;
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
  <View
    style={{
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
  </View>
);
