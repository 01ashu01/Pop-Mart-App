import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
  onPressDetails?: (reward: Reward) => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  userPoints,
  onRedeem,
  onPressDetails,
}) => {
  const canAfford = userPoints >= reward.pointsCost;
  const pointsShort = reward.pointsCost - userPoints;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vouchers':
        return { name: 'ticket-outline' as const, color: '#E50012', bg: '#FFF0F0' };
      case 'blind_box':
        return { name: 'cube-outline' as const, color: '#8B5CF6', bg: '#F5F3FF' };
      case 'merch':
        return { name: 'sparkles-outline' as const, color: '#3B82F6', bg: '#EFF6FF' };
      case 'exclusive':
        return { name: 'ribbon-outline' as const, color: '#F59E0B', bg: '#FEF3C7' };
      default:
        return { name: 'gift-outline' as const, color: '#E50012', bg: '#FFF0F0' };
    }
  };

  const catIcon = getCategoryIcon(reward.category);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => (onPressDetails ? onPressDetails(reward) : onRedeem(reward))}
      style={styles.card}
    >
      <View style={styles.headerRow}>
        <View style={[styles.iconContainer, { backgroundColor: catIcon.bg }]}>
          <Ionicons name={catIcon.name} size={24} color={catIcon.color} />
        </View>

        {reward.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{reward.badge}</Text>
          </View>
        )}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {reward.title}
      </Text>

      {reward.originalValue ? (
        <Text style={styles.originalValue}>Worth {reward.originalValue}</Text>
      ) : null}

      <Text style={styles.description} numberOfLines={2}>
        {reward.description}
      </Text>

      <View style={styles.footer}>
        <View>
          <Text style={styles.costLabel}>Required</Text>
          <View style={styles.costRow}>
            <Text style={styles.costNumber}>{reward.pointsCost.toLocaleString()}</Text>
            <Text style={styles.costUnit}>PTS</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!canAfford}
          onPress={() => onRedeem(reward)}
          style={[
            styles.redeemBtn,
            canAfford ? styles.redeemBtnActive : styles.redeemBtnDisabled,
          ]}
        >
          <Text
            style={[
              styles.redeemBtnText,
              canAfford ? styles.redeemBtnTextActive : styles.redeemBtnTextDisabled,
            ]}
          >
            {canAfford ? 'Redeem' : `+${pointsShort}`}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#ECEFF1',
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
    lineHeight: 20,
  },
  originalValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },
  costLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  costNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  costUnit: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 3,
  },
  redeemBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    minWidth: 84,
    alignItems: 'center',
  },
  redeemBtnActive: {
    backgroundColor: COLORS.accent,
  },
  redeemBtnDisabled: {
    backgroundColor: '#F3F4F6',
  },
  redeemBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  redeemBtnTextActive: {
    color: '#111111',
  },
  redeemBtnTextDisabled: {
    color: COLORS.textMuted,
  },
});
