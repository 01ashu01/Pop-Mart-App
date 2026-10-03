import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { PopIconSelector } from '../../components/PopIconSelector';
import { PopIconBadge } from '../../components/PopIconBadge';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, popIcons, selectAvatar, updateUser, logout } = useAuth();

  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || 'Jayden');
  const [lastName, setLastName] = useState(user?.lastName || 'Tan Jing Yuan');

  if (!user) return null;

  const currentIcon = popIcons.find((i) => i.id === user.avatarId) || popIcons[0];

  const handleSelectIcon = (iconId: string) => {
    selectAvatar(iconId);
  };

  const handleSaveName = async () => {
    if (firstName.trim()) {
      await updateUser({ firstName: firstName.trim(), lastName: lastName.trim() });
      setEditNameModalVisible(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your POP MART VIP account? This action cannot be undone and all your points will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/welcome');
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/welcome');
  };

  return (
    <View style={styles.container}>
      {/* Top Header Matching Figma */}
      <View style={{ paddingTop: insets.top }}>
        <Header
          title="Profile"
          showBack={true}
          onBackPress={() => router.push('/(tabs)')}
          rightElement={
            <PopIconBadge icon={currentIcon} size={36} showBorder={false} />
          }
        />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: "Select your POP ICON" with 8 avatars Matching Figma */}
        <PopIconSelector
          icons={popIcons}
          selectedIconId={user.avatarId}
          onSelectIcon={handleSelectIcon}
        />

        {/* Card 2: User Personal Details Card Matching Figma */}
        <View style={styles.infoCard}>
          {/* Name Row */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setEditNameModalVisible(true)}
            style={styles.fieldRow}
          >
            <View>
              <Text style={styles.fieldLabel}>Name</Text>
              <Text style={styles.fieldValue}>{user.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4C9D2" />
          </TouchableOpacity>

          {/* Email Row with Verified Badge */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {}}
            style={styles.fieldRow}
          >
            <View>
              <View style={styles.labelBadgeRow}>
                <Text style={styles.fieldLabel}>Email</Text>
                {user.emailVerified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={10} color="#FFFFFF" style={{ marginRight: 2 }} />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
              </View>
              <Text style={styles.fieldValue}>{user.email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4C9D2" />
          </TouchableOpacity>

          {/* Phone Number Row with Verified Badge */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/update-phone')}
            style={styles.fieldRow}
          >
            <View>
              <View style={styles.labelBadgeRow}>
                <Text style={styles.fieldLabel}>Phone number</Text>
                {user.phoneVerified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={10} color="#FFFFFF" style={{ marginRight: 2 }} />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
              </View>
              <Text style={styles.fieldValue}>{user.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4C9D2" />
          </TouchableOpacity>

          {/* Date of Birth Row */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/update-dob')}
            style={[styles.fieldRow, styles.lastFieldRow]}
          >
            <View>
              <Text style={styles.fieldLabel}>Date of birth</Text>
              <Text style={styles.fieldValue}>{user.dob}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4C9D2" />
          </TouchableOpacity>
        </View>

        {/* Card 3: Action Links Card Matching Figma */}
        <View style={styles.actionCard}>
          {/* Change Password */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/change-password')}
            style={styles.actionRow}
          >
            <View style={styles.actionLeft}>
              <Ionicons name="lock-closed-outline" size={18} color="#111111" style={styles.actionIcon} />
              <Text style={styles.actionTitle}>Change password</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4C9D2" />
          </TouchableOpacity>

          {/* Notification Settings */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/notification-settings')}
            style={styles.actionRow}
          >
            <View style={styles.actionLeft}>
              <Ionicons name="notifications-outline" size={18} color="#111111" style={styles.actionIcon} />
              <Text style={styles.actionTitle}>Notification settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4C9D2" />
          </TouchableOpacity>

          {/* Delete Account */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleDeleteAccount}
            style={[styles.actionRow, styles.lastActionRow]}
          >
            <View style={styles.actionLeft}>
              <Ionicons name="trash-outline" size={18} color="#111111" style={styles.actionIcon} />
              <Text style={styles.actionTitle}>Delete account</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C4C9D2" />
          </TouchableOpacity>
        </View>

        {/* Version Footer Matching Figma */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Your app is updated</Text>
          <Text style={styles.versionSub}>Version 1.6.10</Text>
        </View>

        {/* Red Outlined Logout Button Matching Figma */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline-red"
          size="md"
          style={styles.logoutBtn}
        />
      </ScrollView>

      {/* Edit Name Modal */}
      <Modal
        visible={editNameModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditNameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            
            <View style={styles.modalInputGroup}>
              <Text style={styles.modalInputLabel}>First Name</Text>
              <TextInput
                style={styles.modalTextInput}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
              />
            </View>

            <View style={styles.modalInputGroup}>
              <Text style={styles.modalInputLabel}>Last Name</Text>
              <TextInput
                style={styles.modalTextInput}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
              />
            </View>

            <View style={styles.modalBtnRow}>
              <Button
                title="Cancel"
                onPress={() => setEditNameModalVisible(false)}
                variant="outline"
                size="md"
                style={{ flex: 1 }}
              />
              <Button
                title="Save"
                onPress={handleSaveName}
                variant="primary"
                size="md"
                style={{ flex: 1 }}
              />
            </View>
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
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: '#ECEFF1',
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastFieldRow: {
    borderBottomWidth: 0,
  },
  labelBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A92A0',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C759',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
    marginLeft: 6,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: '#ECEFF1',
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastActionRow: {
    borderBottomWidth: 0,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: SPACING.md,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  versionSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: '#FFFFFF',
    marginBottom: SPACING.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.floating,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  modalInputGroup: {
    marginBottom: SPACING.md,
  },
  modalInputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  modalTextInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
});
