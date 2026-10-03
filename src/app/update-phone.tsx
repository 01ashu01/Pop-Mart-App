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
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function UpdatePhoneScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useAuth();

  const initialNumber = user?.phone ? user.phone.replace('+65 ', '').trim() : '98888888';
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!phoneNumber.trim() || phoneNumber.length < 8) {
      setError('Please enter a valid 8-digit mobile number');
      return;
    }

    await updateUser({ phone: `+65 ${phoneNumber.trim()}` });
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
      {/* Top Header Matching Figma */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.closeBtn}
        >
          <Ionicons name="close" size={24} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Update phone number</Text>

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
          label="Phone number"
          prefix="+65"
          placeholder="98888888"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (error) setError('');
          }}
          error={error}
          keyboardType="phone-pad"
          autoFocus
        />

        <View style={styles.hintContainer}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#6B7280" />
          <Text style={styles.hintText}>
            We use your phone number for secure two-step verification and in-store loyalty rewards.
          </Text>
        </View>

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
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.sm,
  },
  hintText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
    marginLeft: 8,
    flex: 1,
  },
  btnWrapper: {
    marginTop: 'auto',
  },
});
