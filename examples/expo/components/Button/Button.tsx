import { type PropsWithChildren } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = PropsWithChildren<{
  variant: 'primary' | 'outline';
}>;

export const Button = ({ variant, children }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.8 : 1 },
        variant === 'primary' ? styles.primary : styles.outline,
      ]}
    >
      <Text style={[styles.buttonText, variant === 'primary' ? styles.primaryText : styles.outlineText]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
  },
  primary: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#D1D5DB',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FAFAFA',
  },
  outlineText: {
    color: '#1E1E1E',
  },
});
