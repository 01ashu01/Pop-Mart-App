import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RewardCard } from '../../components/RewardCard';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { Reward, RewardCategory } from '../../types';

export default function RewardsScreen() {
  const insets = useSafeAreaInsets();
  const { user, rewards, redeemReward, redeemedRewards } = useAuth();

  const [activeCategory, setActiveCategory] = useState<RewardCategory>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  if (!user) return null;

  const categories: { key: RewardCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'vouchers', label: 'Vouchers' },
    { key: 'blind_box', label: 'Blind Boxes' },
    { key: 'merch', label: 'Merch' },
    { key: 'exclusive', label: 'VIP Events' },
  ];

  const filteredRewards =
    activeCategory === 'all'
      ? rewards
      : rewards.filter((r) => r.category === activeCategory);

  const handleOpenRedeem = (reward: Reward) => {
    setSelectedReward(reward);
    setConfirmModalVisible(true);
  };

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    const res = redeemReward(selectedReward.id);
    setConfirmModalVisible(false);

    if (res.success && res.voucherCode) {
      setVoucherCode(res.voucherCode);
      setSuccessModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <View>
          <Text style={styles.headerTitle}>Pop Rewards</Text>
          <Text style={styles.headerSub}>Exclusive Member Perks & Drops</Text>
        </View>

        <View style={styles.pointsPill}>
          <Ionicons name="sparkles" size={13} color="#FED700" />
          <Text style={styles.pointsText}>{user.points.toLocaleString()} PTS</Text>
        </View>
      </View>

      {/* Category Pills */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                activeOpacity={0.8}
                onPress={() => setActiveCategory(cat.key)}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              >
                <Text
                  style={[styles.categoryText, isActive && styles.categoryTextActive]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Rewards Catalog */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredRewards.length === 0 ? (
          <EmptyState
            icon="gift-outline"
            title="No Rewards in this Category"
            description="Check back soon for upcoming blind box and merch releases."
          />
        ) : (
          filteredRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={user.points}
              onRedeem={handleOpenRedeem}
            />
          ))
        )}
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="gift-outline" size={36} color={COLORS.primary} />
            </View>

            <Text style={styles.modalTitle}>Confirm Redemption</Text>
            <Text style={styles.modalDesc}>
              Are you sure you want to redeem{' '}
              <Text style={{ fontWeight: '700', color: COLORS.textPrimary }}>
                {selectedReward?.title}
              </Text>{' '}
              for{' '}
              <Text style={{ fontWeight: '800', color: COLORS.primary }}>
                {selectedReward?.pointsCost} points
              </Text>
              ?
            </Text>

            <View style={styles.balancePreviewRow}>
              <Text style={styles.balancePreviewLabel}>Points balance after:</Text>
              <Text style={styles.balancePreviewValue}>
                {selectedReward ? (user.points - selectedReward.pointsCost).toLocaleString() : 0} PTS
              </Text>
            </View>

            <View style={styles.modalBtnRow}>
              <Button
                title="Cancel"
                onPress={() => setConfirmModalVisible(false)}
                variant="outline"
                size="md"
                style={styles.modalBtnHalf}
              />
              <Button
                title="Confirm"
                onPress={handleConfirmRedeem}
                variant="primary"
                size="md"
                style={styles.modalBtnHalf}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal with Voucher Code */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={[styles.modalIconCircle, { backgroundColor: '#E8F8EE' }]}>
              <Ionicons name="checkmark-circle" size={40} color={COLORS.success} />
            </View>

            <Text style={styles.modalTitle}>Redemption Successful!</Text>
            <Text style={styles.modalDesc}>
              Present this code at any POP MART store or apply it at online checkout.
            </Text>

            <View style={styles.codeCard}>
              <Text style={styles.codeLabel}>VOUCHER CODE</Text>
              <Text style={styles.codeValue}>{voucherCode}</Text>
              <Text style={styles.codeExpiry}>Valid until: 31 Dec 2026</Text>
            </View>

            <Button
              title="Done"
              onPress={() => setSuccessModalVisible(false)}
              variant="primary"
              size="md"
              style={{ width: '100%', marginTop: SPACING.md }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  pointsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FED700',
    marginLeft: 6,
  },
  categoriesWrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
  },
  categoriesList: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    backgroundColor: '#F3F4F6',
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xxl,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.floating,
  },
  modalIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  balancePreviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#F8F9FA',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
  },
  balancePreviewLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  balancePreviewValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: SPACING.md,
  },
  modalBtnHalf: {
    flex: 1,
  },
  codeCard: {
    backgroundColor: '#FFFBEA',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#FED700',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    width: '100%',
    marginVertical: SPACING.sm,
  },
  codeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#854D0E',
    letterSpacing: 1,
  },
  codeValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 2,
    marginVertical: 6,
  },
  codeExpiry: {
    fontSize: 11,
    color: '#A16207',
  },
});
