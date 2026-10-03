import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING } from '../constants/theme';

export interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  backIcon?: 'arrow' | 'close';
  rightElement?: React.ReactNode;
  style?: ViewStyle;
  dark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  onBackPress,
  backIcon = 'arrow',
  rightElement,
  style,
  dark = false,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, dark && styles.darkContainer, style]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={styles.backBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons
              name={backIcon === 'close' ? 'close' : 'chevron-back'}
              size={24}
              color={dark ? '#FFFFFF' : COLORS.textPrimary}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={[styles.title, dark && styles.darkTitle]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <View style={styles.rightContainer}>{rightElement}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  darkContainer: {
    backgroundColor: COLORS.darkBg,
    borderBottomColor: '#222222',
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backBtn: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  darkTitle: {
    color: '#FFFFFF',
  },
  rightContainer: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
