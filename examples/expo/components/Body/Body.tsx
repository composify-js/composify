import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = PropsWithChildren<{
  color?: string;
  weight?: 'light' | 'normal';
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}>;

const FONT_WEIGHT_BY_WEIGHT = {
  light: '300',
  normal: '400',
} as const;

export const Body: FC<Props> = ({ color = '#1E1E1E', weight = 'normal', margin, children }) => (
  <Text
    style={[
      styles.body,
      {
        color,
        fontWeight: FONT_WEIGHT_BY_WEIGHT[weight],
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
        marginLeft: margin?.left,
        marginRight: margin?.right,
      },
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  body: {
    fontSize: 18,
  },
});
