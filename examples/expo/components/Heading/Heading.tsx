import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = PropsWithChildren<{
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right';
}>;

export const Heading: FC<Props> = ({ size = 'lg', weight = 'semibold', align = 'left', children }) => (
  <Text style={[styles.heading, styles[`size-${size}`], styles[`weight-${weight}`], styles[`align-${align}`]]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  heading: {
    color: '#1E1E1E',
  },
  'size-lg': {
    fontSize: 18,
  },
  'size-xl': {
    fontSize: 20,
  },
  'size-2xl': {
    fontSize: 24,
  },
  'size-3xl': {
    fontSize: 30,
  },
  'size-4xl': {
    fontSize: 36,
  },
  'size-5xl': {
    fontSize: 48,
  },
  'weight-semibold': {
    fontWeight: '600',
  },
  'weight-bold': {
    fontWeight: '700',
  },
  'weight-extrabold': {
    fontWeight: '800',
  },
  'align-left': {
    textAlign: 'left',
  },
  'align-center': {
    textAlign: 'center',
  },
  'align-right': {
    textAlign: 'right',
  },
});
