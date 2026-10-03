import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PointsCard } from '../../components/PointsCard';
import { PopIconBadge } from '../../components/PopIconBadge';
import { RewardCard } from '../../components/RewardCard';
import { PopMartLogo } from '../../components/PopMartLogo';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { Reward } from '../../types';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    user,
    popIcons,
    rewards,
    transactions,
    dailyCheckIn,
    redeemReward,
    showToast,
  } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('Points & rewards refreshed');
    }, 600);
  };

  if (!user) return null;

  const currentIcon = popIcons.find((i) => i.id === user.avatarId) || popIcons[0];
  const featuredRewards = rewards.slice(0, 3);
  const recentTransactions = transactions.slice(0, 4);

  const handleCheckIn = () => {
    dailyCheckIn();
  };

  const handleRedeem = (reward: Reward) => {
    redeemReward(reward.id);
  };

  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.brandRow}>
          <PopMartLogo size="small" variant="red" />
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>CLUB VIP</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/profile')}
          style={styles.avatarButton}
        >
          <PopIconBadge icon={currentIcon} size={42} showBorder={false} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* User Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingSub}>WELCOME BACK,</Text>
          <Text style={styles.greetingName}>{user.name}</Text>
        </View>

        {/* Loyalty Points VIP Card */}
        <PointsCard user={user} />

        {/* Quick Actions Row */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/scan')}
            style={styles.actionCard}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FFF0F0' }]}>
              <Ionicons name="qr-code-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={styles.actionTitle}>In-Store QR</Text>
            <Text style={styles.actionSub}>Earn at till</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCheckIn}
            style={styles.actionCard}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FEF9C3' }]}>
              <Ionicons name="calendar-outline" size={22} color="#CA8A04" />
            </View>
            <Text style={styles.actionTitle}>Check-in</Text>
            <Text style={styles.actionSub}>+10 pts daily</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/rewards')}
            style={styles.actionCard}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="gift-outline" size={22} color="#2563EB" />
            </View>
            <Text style={styles.actionTitle}>Rewards</Text>
            <Text style={styles.actionSub}>Catalog</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/settings')}
            style={styles.actionCard}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#F3F4F6' }]}>
              <Ionicons name="storefront-outline" size={22} color="#4B5563" />
            </View>
            <Text style={styles.actionTitle}>Stores</Text>
            <Text style={styles.actionSub}>Locate shop</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Drops / Rewards */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Featured Rewards</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/(tabs)/rewards')}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {featuredRewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            userPoints={user.points}
            onRedeem={handleRedeem}
          />
        ))}

        {/* Recent Activity Section */}
        <View style={[styles.sectionHeaderRow, { marginTop: SPACING.lg }]}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>

        <View style={styles.txListCard}>
          {recentTransactions.map((tx, idx) => (
            <View
              key={tx.id}
              style={[
                styles.txItem,
                idx < recentTransactions.length - 1 && styles.txItemBorder,
              ]}
            >
              <View style={styles.txIconBox}>
                <Ionicons
                  name={tx.points > 0 ? 'arrow-down-circle-outline' : 'ticket-outline'}
                  size={20}
                  color={tx.points > 0 ? COLORS.success : COLORS.primary}
                />
              </View>

              <View style={styles.txContent}>
                <Text style={styles.txTitle}>{tx.title}</Text>
                <Text style={styles.txSub}>{tx.subtitle}</Text>
              </View>

              <View style={styles.txPointsBox}>
                <Text
                  style={[
                    styles.txPointsText,
                    { color: tx.points > 0 ? COLORS.success : COLORS.textPrimary },
                  ]}
                >
                  {tx.points > 0 ? `+${tx.points}` : tx.points} PTS
                </Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagBadge: {
    backgroundColor: '#111111',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    marginLeft: 8,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  avatarButton: {
    padding: 2,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  greetingSection: {
    marginBottom: SPACING.md,
  },
  greetingSub: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8A92A0',
    letterSpacing: 1.2,
  },
  greetingName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  actionCard: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECEFF1',
    ...SHADOWS.small,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  actionSub: {
    fontSize: 9,
    fontWeight: '500',
    color: COLORS.textMuted,
    marginTop: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  txListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: '#ECEFF1',
    ...SHADOWS.small,
    marginBottom: SPACING.xl,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  txItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  txIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  txContent: {
    flex: 1,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  txSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  txPointsBox: {
    alignItems: 'flex-end',
  },
  txPointsText: {
    fontSize: 13,
    fontWeight: '800',
  },
  txDate: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
