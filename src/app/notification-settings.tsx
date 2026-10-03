import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useAuth();

  const [inApp, setInApp] = useState(user?.inAppNotifications ?? true);
  const [newsletter, setNewsletter] = useState(user?.newsletter ?? true);

  const handleToggleInApp = async (val: boolean) => {
    setInApp(val);
    await updateUser({ inAppNotifications: val });
  };

  const handleToggleNewsletter = async (val: boolean) => {
    setNewsletter(val);
    await updateUser({ newsletter: val });
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 16), paddingBottom: Math.max(insets.bottom, 20) },
      ]}
    >
      {/* Header Matching Figma */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.closeBtn}
        >
          <Ionicons name="close" size={24} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notification settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* In-app Notifications Switch Item */}
        <View style={styles.settingCard}>
          <View style={styles.textColumn}>
            <Text style={styles.itemTitle}>In-app Notifications</Text>
            <Text style={styles.itemSubtitle}>
              Be first in line to nab the stuff you love for less
            </Text>
          </View>
          <Switch
            value={inApp}
            onValueChange={handleToggleInApp}
            trackColor={{ false: '#E5E7EB', true: COLORS.accent }}
            thumbColor={'#FFFFFF'}
          />
        </View>

        {/* Email newsletter Switch Item */}
        <View style={styles.settingCard}>
          <View style={styles.textColumn}>
            <Text style={styles.itemTitle}>Email newsletter</Text>
            <Text style={styles.itemSubtitle}>
              Stay updated on early access to products and deals. Opt out anytime by unsubscribing from the bottom of our emails
            </Text>
          </View>
          <Switch
            value={newsletter}
            onValueChange={handleToggleNewsletter}
            trackColor={{ false: '#E5E7EB', true: COLORS.accent }}
            thumbColor={'#FFFFFF'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  closeBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  textColumn: {
    flex: 1,
    paddingRight: SPACING.lg,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
