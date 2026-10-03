import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING } from '../constants/theme';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    current?: string;
    new?: string;
    confirm?: string;
  }>({});

  const handleSave = () => {
    const newErrors: typeof errors = {};

    if (!currentPassword) {
      newErrors.current = 'Please enter your current password';
    }
    if (!newPassword || newPassword.length < 8) {
      newErrors.new = 'Password must be at least 8 characters long';
    }
    if (confirmPassword !== newPassword) {
      newErrors.confirm = 'The password confirmation does not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    showToast('Password updated successfully');
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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

        <Text style={styles.headerTitle}>Change password</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSave}
          style={styles.saveBtn}
        >
          <Ionicons name="checkmark-sharp" size={26} color={COLORS.success} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Input
          label="Current password"
          placeholder="Enter current password"
          value={currentPassword}
          onChangeText={(t) => {
            setCurrentPassword(t);
            if (errors.current) setErrors({ ...errors, current: undefined });
          }}
          error={errors.current}
          isPassword
        />

        <Input
          label="New password"
          placeholder="New password"
          value={newPassword}
          onChangeText={(t) => {
            setNewPassword(t);
            if (errors.new) setErrors({ ...errors, new: undefined });
          }}
          error={errors.new}
          isPassword
        />

        <Input
          label="Confirm new password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={(t) => {
            setConfirmPassword(t);
            if (errors.confirm) setErrors({ ...errors, confirm: undefined });
          }}
          error={errors.confirm}
          isPassword
        />

        <View style={styles.btnWrapper}>
          <Button
            title="Done"
            onPress={handleSave}
            variant="primary"
            size="lg"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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
  saveBtn: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingTop: SPACING.xl,
  },
  btnWrapper: {
    marginTop: 'auto',
  },
});
