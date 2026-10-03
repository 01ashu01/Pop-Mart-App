import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NotificationCard } from '../../components/NotificationCard';
import { EmptyState } from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';
import { NotificationItem } from '../../types';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotifsCount,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'all' | 'reward' | 'points' | 'system'>('all');

  const tabs: { key: 'all' | 'reward' | 'points' | 'system'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'reward', label: 'Rewards' },
    { key: 'points', label: 'Points' },
    { key: 'system', label: 'System' },
  ];

  const filteredNotifs =
    activeTab === 'all'
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  const handlePressItem = (item: NotificationItem) => {
    markNotificationAsRead(item.id);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSub}>
            {unreadNotifsCount} unread message{unreadNotifsCount === 1 ? '' : 's'}
          </Text>
        </View>

        {unreadNotifsCount > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={markAllNotificationsAsRead}
            style={styles.markAllBtn}
          >
            <Ionicons name="checkmark-done-outline" size={16} color={COLORS.primary} />
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.key)}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Notifications List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifs.length === 0 ? (
          <EmptyState
            icon="notifications-off-outline"
            title="No Notifications"
            description="You are all caught up with your latest Pop Mart reward alerts."
          />
        ) : (
          <View style={styles.card}>
            {filteredNotifs.map((item) => (
              <NotificationCard
                key={item.id}
                item={item}
                onPress={handlePressItem}
              />
            ))}
          </View>
        )}
      </ScrollView>
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
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    backgroundColor: '#FFF0F0',
  },
  markAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 4,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
  },
  tabItem: {
    paddingVertical: 12,
    marginRight: SPACING.lg,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  scrollContent: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ECEFF1',
  },
});
