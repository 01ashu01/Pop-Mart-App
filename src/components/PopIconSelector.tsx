import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { PopIcon } from '../types';
import { PopIconBadge } from './PopIconBadge';

interface PopIconSelectorProps {
  icons: PopIcon[];
  selectedIconId: string;
  onSelectIcon: (iconId: string) => void;
}

export const PopIconSelector: React.FC<PopIconSelectorProps> = ({
  icons,
  selectedIconId,
  onSelectIcon,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Select your POP ICON</Text>
      
      <View style={styles.grid}>
        {icons.map((icon) => {
          const isSelected = icon.id === selectedIconId;
          return (
            <View key={icon.id} style={styles.iconCell}>
              <PopIconBadge
                icon={icon}
                size={58}
                isSelected={isSelected}
                onPress={() => onSelectIcon(icon.id)}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: '#ECEFF1',
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A92A0',
    textAlign: 'center',
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  iconCell: {
    width: '24%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
