import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = PropsWithChildren<{
  flex?: number;
  gap?: number;
  alignVertical?: 'start' | 'center' | 'end' | 'between' | 'around';
  alignHorizontal?: 'start' | 'center' | 'end' | 'stretch';
  width?: number;
  height?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  backgroundColor?: string;
}>;

export const VStack: FC<Props> = ({
  flex,
  gap,
  alignVertical = 'start',
  alignHorizontal = 'stretch',
  width,
  height,
  padding,
  margin,
  backgroundColor,
  children,
}) => (
  <View
    style={[
      styles.base,
      styles[`justify-${alignVertical}`],
      styles[`align-${alignHorizontal}`],
      {
        flex,
        gap,
        width,
        height,
        paddingTop: padding?.top,
        paddingRight: padding?.right,
        paddingBottom: padding?.bottom,
        paddingLeft: padding?.left,
        marginTop: margin?.top,
        marginRight: margin?.right,
        marginBottom: margin?.bottom,
        marginLeft: margin?.left,
        backgroundColor,
      },
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'column',
  },
  'justify-start': {
    justifyContent: 'flex-start',
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'justify-end': {
    justifyContent: 'flex-end',
  },
  'justify-between': {
    justifyContent: 'space-between',
  },
  'justify-around': {
    justifyContent: 'space-around',
  },
  'align-start': {
    alignItems: 'flex-start',
  },
  'align-center': {
    alignItems: 'center',
  },
  'align-end': {
    alignItems: 'flex-end',
  },
  'align-stretch': {
    alignItems: 'stretch',
  },
});
