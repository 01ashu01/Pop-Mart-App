import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { MembershipTier } from '../types';

interface MembershipProgressProps {
  currentTier: MembershipTier;
  nextTier: MembershipTier;
  pointsToNextTier: number;
  progress: number; // 0 to 1
  accentColor?: string;
}

export const MembershipProgress: React.FC<MembershipProgressProps> = ({
  currentTier,
  nextTier,
  pointsToNextTier,
  progress,
  accentColor = COLORS.accent,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.tierText}>{currentTier} Member</Text>
        <Text style={styles.nextTierText}>
          {pointsToNextTier > 0 ? `${pointsToNextTier} pts to ${nextTier}` : 'Max Tier Reached!'}
        </Text>
      </View>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${clampedProgress * 100}%`,
              backgroundColor: accentColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: SPACING.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tierText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  nextTierText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  barBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: RADIUS.pill,
  },
});
