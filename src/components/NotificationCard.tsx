import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { NotificationItem } from '../types';

interface NotificationCardProps {
  item: NotificationItem;
  onPress: (item: NotificationItem) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ item, onPress }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'points':
        return { name: 'sparkles' as const, color: '#D97706', bg: '#FEF3C7' };
      case 'reward':
        return { name: 'gift' as const, color: COLORS.primary, bg: '#FFF0F0' };
      case 'redemption':
        return { name: 'ticket' as const, color: '#2563EB', bg: '#EFF6FF' };
      case 'system':
      default:
        return { name: 'information-circle' as const, color: '#4B5563', bg: '#F3F4F6' };
    }
  };

  const iconInfo = getIcon();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(item)}
      style={[
        styles.container,
        !item.isRead && styles.unreadContainer,
      ]}
    >
      <View style={[styles.iconCircle, { backgroundColor: iconInfo.bg }]}>
        <Ionicons name={iconInfo.name} size={20} color={iconInfo.color} />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.title, !item.isRead && styles.unreadTitle]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.timeText}>{item.time || item.date}</Text>
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
      </View>

      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  unreadContainer: {
    backgroundColor: '#FAFBFC',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  message: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: SPACING.sm,
    marginTop: 6,
  },
});
