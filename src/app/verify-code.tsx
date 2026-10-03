import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dob?: string;
  }>();
  const { register, showToast } = useAuth();

  const [otp, setOtp] = useState(['8', '8', '2', '9', '1', '2']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    const result = await register({
      firstName: params.firstName || 'Jason',
      lastName: params.lastName || 'Wang',
      email: params.email || 'jason.wang@gmail.com',
      phone: params.phone || '+65 9123 8123',
      dob: params.dob || '21/12/1995',
    });
    setLoading(false);

    if (result.success) {
      router.replace('/register-success');
    }
  };

  const handleResend = () => {
    showToast('Verification code resent to your email');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 20), paddingBottom: Math.max(insets.bottom, 24) },
      ]}
    >
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={24} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome to POP MART</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tab Header with Yellow Indicator */}
      <View style={styles.tabContainer}>
        <View style={styles.tabItemActive}>
          <Text style={styles.tabTextActive}>Verification</Text>
          <View style={styles.tabIndicator} />
        </View>
      </View>

      {/* Instruction */}
      <Text style={styles.instruction}>
        A code has been sent to your email {params.email ? `(${params.email})` : ''}. Please verify and enter the code here.
      </Text>

      {/* 6 OTP Code Input Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={styles.otpBox}>
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text.slice(-1), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          </View>
        ))}
      </View>

      {/* Resend Link */}
      <TouchableOpacity activeOpacity={0.7} onPress={handleResend} style={styles.resendBtn}>
        <Text style={styles.resendText}>Resend verification email</Text>
      </TouchableOpacity>

      {/* Complete Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Complete"
          onPress={handleComplete}
          loading={loading}
          variant="primary"
          size="lg"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: SPACING.xl,
  },
  tabItemActive: {
    paddingBottom: 10,
    position: 'relative',
  },
  tabTextActive: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  instruction: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: SPACING.xxl,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  otpBox: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  otpInput: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  resendBtn: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.xxl,
  },
  resendText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});
