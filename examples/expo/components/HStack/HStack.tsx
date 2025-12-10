import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = PropsWithChildren<{
  flex?: number;
  gap?: number;
  alignHorizontal?: 'start' | 'center' | 'end' | 'between' | 'around';
  alignVertical?: 'start' | 'center' | 'end' | 'stretch';
  width?: number;
  height?: number;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  backgroundColor?: string;
}>;

export const HStack: FC<Props> = ({
  flex,
  gap,
  alignHorizontal = 'start',
  alignVertical = 'stretch',
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
      styles[`justify-${alignHorizontal}`],
      styles[`align-${alignVertical}`],
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
    flexDirection: 'row',
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
