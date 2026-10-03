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
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email.trim()) {
      setError('Please enter your email or phone number');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      showToast('Reset link sent successfully');
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 20), paddingBottom: Math.max(insets.bottom, 24) },
      ]}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={24} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="lock-open-outline" size={36} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Forgot Your Password?</Text>
        <Text style={styles.description}>
          Enter your registered email address or phone number and we will send you a verification code to reset your password.
        </Text>

        {!sent ? (
          <View style={styles.form}>
            <Input
              label="Email or Phone Number"
              placeholder="e.g. jaydentjy@gmail.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
              error={error}
              autoCapitalize="none"
            />

            <Button
              title="Send Reset Link"
              onPress={handleSend}
              loading={loading}
              variant="primary"
              size="lg"
              style={styles.btn}
            />
          </View>
        ) : (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={44} color={COLORS.success} />
            <Text style={styles.successTitle}>Check Your Inbox</Text>
            <Text style={styles.successMsg}>
              We have sent password reset instructions to {email}.
            </Text>
            <Button
              title="Return to Login"
              onPress={() => router.push('/login')}
              variant="primary"
              size="md"
              style={{ marginTop: SPACING.lg, width: '100%' }}
            />
          </View>
        )}
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
  content: {
    flex: 1,
    paddingTop: SPACING.xl,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.xxl,
  },
  form: {
    width: '100%',
  },
  btn: {
    marginTop: SPACING.md,
  },
  successBox: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
    marginBottom: 6,
  },
  successMsg: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
