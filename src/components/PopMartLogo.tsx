import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/theme';

interface PopMartLogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  variant?: 'red' | 'white';
}

export const PopMartLogo: React.FC<PopMartLogoProps> = ({
  size = 'medium',
  style,
  variant = 'red',
}) => {
  const isRed = variant === 'red';

  const containerSizes = {
    small: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 2 },
    medium: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 3 },
    large: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 4 },
  };

  const textSizes = {
    small: { fontSize: 13, letterSpacing: 1.2 },
    medium: { fontSize: 18, letterSpacing: 2 },
    large: { fontSize: 26, letterSpacing: 2.8 },
  };

  return (
    <View
      style={[
        styles.container,
        containerSizes[size],
        { backgroundColor: isRed ? COLORS.primary : '#FFFFFF' },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          textSizes[size],
          { color: isRed ? '#FFFFFF' : COLORS.primary },
        ]}
      >
        POP MART
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'System',
    includeFontPadding: false,
  },
});
