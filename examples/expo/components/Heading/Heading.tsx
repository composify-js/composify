import { type FC, type PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = PropsWithChildren<{
  level?: 1 | 2 | 3;
  weight?: 'semibold' | 'bold' | 'extrabold';
}>;

const TEXT_SIZE_BY_LEVEL = {
  1: 48,
  2: 36,
  3: 24,
};

const FONT_WEIGHT_BY_WEIGHT = {
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Heading: FC<Props> = ({ level = 1, weight = 'extrabold', children }) => (
  <Text
    style={[
      styles.heading,
      {
        fontSize: TEXT_SIZE_BY_LEVEL[level],
        fontWeight: FONT_WEIGHT_BY_WEIGHT[weight],
      },
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  heading: {
    color: '#1E1E1E',
  },
});
