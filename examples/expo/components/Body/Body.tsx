import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = PropsWithChildren<{
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
}>;

export const Body: FC<Props> = ({ size = 'md', align = 'left', children }) => (
  <Text style={[styles.body, styles[`size-${size}`], styles[`align-${align}`]]}>{children}</Text>
);

const styles = StyleSheet.create({
  body: {
    color: '#525252',
  },
  'size-sm': {
    fontSize: 14,
  },
  'size-md': {
    fontSize: 16,
  },
  'size-lg': {
    fontSize: 18,
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
