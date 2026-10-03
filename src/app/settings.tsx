import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/welcome');
  };

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderRow = (
    icon: keyof typeof Ionicons.glyphMap,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    isDestructive?: boolean
  ) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.settingRow}
    >
      <View style={styles.rowLeft}>
        <View
          style={[
            styles.iconWrapper,
            isDestructive && { backgroundColor: '#FFF0F0' },
          ]}
        >
          <Ionicons
            name={icon}
            size={18}
            color={isDestructive ? COLORS.primary : COLORS.textPrimary}
          />
        </View>
        <View>
          <Text
            style={[
              styles.rowTitle,
              isDestructive && { color: COLORS.primary },
            ]}
          >
            {title}
          </Text>
          {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#C4C9D2" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <Header title="Settings" />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) + 20 },
        ]}
      >
        {/* Account Group */}
        {renderSectionHeader('ACCOUNT')}
        <View style={styles.cardGroup}>
          {renderRow('person-outline', 'Edit Profile', user?.name, () =>
            router.push('/(tabs)/profile')
          )}
          {renderRow('key-outline', 'Change Password', 'Update security credentials', () =>
            router.push('/change-password')
          )}
          {renderRow('notifications-outline', 'Notification Preferences', undefined, () =>
            router.push('/notification-settings')
          )}
        </View>

        {/* Membership & Loyalty */}
        {renderSectionHeader('MEMBERSHIP & PERKS')}
        <View style={styles.cardGroup}>
          {renderRow('ribbon-outline', 'VIP Tier Benefits', `${user?.membershipTier} Member Level`, () => {})}
          {renderRow('storefront-outline', 'Find POP MART Stores', 'Singapore Retail Boutiques & Roboshops', () => {})}
        </View>

        {/* Legal & Privacy */}
        {renderSectionHeader('LEGAL & ABOUT')}
        <View style={styles.cardGroup}>
          {renderRow('shield-checkmark-outline', 'Privacy Policy', undefined, () => {})}
          {renderRow('document-text-outline', 'Terms of Service', undefined, () => {})}
          {renderRow('help-circle-outline', 'Help & Support FAQ', undefined, () => {})}
        </View>

        {/* Version info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionLabel}>Your app is updated</Text>
          <Text style={styles.versionNumber}>Version 1.6.10 (Build 2026)</Text>
        </View>

        {/* Logout */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline-red"
          size="md"
          style={styles.logoutBtn}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8A92A0',
    letterSpacing: 1,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
    paddingHorizontal: 4,
  },
  cardGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECEFF1',
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F5F7',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  rowSubtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  versionLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  versionNumber: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  logoutBtn: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.xl,
  },
});
