import { ThemedText } from '@/components/themed-text';
import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}>;

export function Button({ children, onPress, disabled, variant = 'primary', style }: ButtonProps) {
  const backgroundColor = variant === 'primary' ? '#2563eb' : 'transparent';
  const borderColor = variant === 'primary' ? 'transparent' : '#94a3b8';
  const textColor = variant === 'primary' ? '#ffffff' : '#111827';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: disabled ? '#cbd5e1' : backgroundColor,
          opacity: pressed ? 0.85 : 1,
          borderColor,
        },
        style,
      ]}
    >
      <ThemedText style={[styles.text, { color: textColor }]}>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});


