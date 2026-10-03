import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { PopIcon } from '../types';

interface PopIconBadgeProps {
  icon: PopIcon;
  size?: number;
  isSelected?: boolean;
  onPress?: () => void;
  showBorder?: boolean;
}

export const PopIconBadge: React.FC<PopIconBadgeProps> = ({
  icon,
  size = 54,
  isSelected = false,
  onPress,
  showBorder = true,
}) => {
  const innerSize = isSelected ? size - 6 : size;

  const content = (
    <View
      style={[
        styles.outerRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: isSelected ? COLORS.primary : 'transparent',
          borderWidth: isSelected ? 2.5 : 0,
        },
      ]}
    >
      <View
        style={[
          styles.innerCircle,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            backgroundColor: icon.bgColor || '#F1F3F5',
            borderColor: showBorder && !isSelected ? '#E2E8F0' : 'transparent',
            borderWidth: showBorder && !isSelected ? 1 : 0,
          },
        ]}
      >
        {/* Character Visual / Mascot Identifier */}
        <Text style={{ fontSize: innerSize * 0.48 }}>{icon.emoji}</Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.touchable}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
