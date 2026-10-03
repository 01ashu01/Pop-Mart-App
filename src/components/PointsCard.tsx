import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { User } from '../types';
import { MembershipProgress } from './MembershipProgress';
import { PopMartLogo } from './PopMartLogo';

interface PointsCardProps {
  user: User;
  onPressScan?: () => void;
}

export const PointsCard: React.FC<PointsCardProps> = ({ user, onPressScan }) => {
  const router = useRouter();

  const handleScanPress = () => {
    if (onPressScan) {
      onPressScan();
    } else {
      router.push('/(tabs)/scan');
    }
  };

  return (
    <View style={styles.card}>
      {/* Background decorative patterns */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />

      <View style={styles.topRow}>
        <PopMartLogo size="small" variant="white" />
        <View style={styles.tierPill}>
          <Ionicons name="ribbon" size={14} color="#FED700" />
          <Text style={styles.tierPillText}>{user.membershipTier.toUpperCase()} VIP</Text>
        </View>
      </View>

      <View style={styles.pointsSection}>
        <Text style={styles.pointsLabel}>Available Points</Text>
        <View style={styles.pointsNumberRow}>
          <Text style={styles.pointsNumber}>{user.points.toLocaleString()}</Text>
          <Text style={styles.pointsUnit}>PTS</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <MembershipProgress
          currentTier={user.membershipTier}
          nextTier={user.nextTier}
          pointsToNextTier={user.pointsToNextTier}
          progress={user.tierProgress}
        />
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.memberName}>{user.name}</Text>
          <Text style={styles.memberCode}>{user.memberCode}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleScanPress}
          style={styles.qrShortcutBtn}
        >
          <Ionicons name="qr-code-outline" size={18} color="#111111" />
          <Text style={styles.qrShortcutText}>In-Store QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xxl,
    padding: SPACING.xl,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.large,
    marginBottom: SPACING.xl,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(254, 215, 0, 0.12)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  tierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  tierPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 4,
  },
  pointsSection: {
    marginBottom: SPACING.md,
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pointsNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  pointsNumber: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  pointsUnit: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.accent,
    marginLeft: 6,
  },
  progressContainer: {
    marginBottom: SPACING.lg,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    paddingTop: SPACING.md,
  },
  memberName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  memberCode: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  qrShortcutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
  },
  qrShortcutText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111111',
    marginLeft: 4,
  },
});
