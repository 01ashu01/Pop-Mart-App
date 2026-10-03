import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-red' | 'dark' | 'social';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  fullWidth = true,
}) => {
  const isInteractive = !disabled && !loading;

  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? '#E5E7EB' : COLORS.accent,
          borderColor: 'transparent',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? '#E5E7EB' : COLORS.primary,
          borderColor: 'transparent',
        };
      case 'outline-red':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: COLORS.primary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: COLORS.border,
        };
      case 'dark':
        return {
          backgroundColor: disabled ? '#333333' : '#111111',
          borderColor: 'transparent',
        };
      case 'social':
        return {
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E5E7EB',
          ...SHADOWS.small,
        };
      default:
        return { backgroundColor: COLORS.accent };
    }
  };

  const getTextColor = (): string => {
    if (disabled) return COLORS.disabledText;
    switch (variant) {
      case 'primary':
        return '#111111'; // High contrast black on yellow
      case 'secondary':
        return '#FFFFFF';
      case 'outline-red':
        return COLORS.primary;
      case 'outline':
        return COLORS.textPrimary;
      case 'dark':
        return '#FFFFFF';
      case 'social':
        return COLORS.textPrimary;
      default:
        return '#111111';
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 38;
      case 'lg':
        return 54;
      case 'md':
      default:
        return 48;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      style={[
        styles.base,
        { height: getHeight() },
        fullWidth && styles.fullWidth,
        getContainerStyle(),
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' || variant === 'dark' ? '#FFFFFF' : COLORS.primary}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: SPACING.sm,
  },
  iconRight: {
    marginLeft: SPACING.sm,
  },
});
