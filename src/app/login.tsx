import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PopMartLogo } from '../components/PopMartLogo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('jaydentjy@gmail.com');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const newErrors: { identifier?: string; password?: string } = {};

    if (!identifier.trim()) {
      newErrors.identifier = 'Email or phone number is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const result = await login(identifier, password);
    setLoading(false);

    if (result.success) {
      router.replace('/(tabs)');
    } else {
      setErrors({ identifier: result.error });
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    await login('demo@popmart.com', 'password123');
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardView}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 20), paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        keyboardShouldPersistTaps="handled"
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
            <Text style={styles.tabTextActive}>Login</Text>
            <View style={styles.tabIndicator} />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/register')}
            style={styles.tabItemInactive}
          >
            <Text style={styles.tabTextInactive}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* Social Logins */}
        <View style={styles.socialSection}>
          <Button
            title="Continue with Google"
            onPress={() => handleSocialLogin('Google')}
            variant="social"
            size="md"
            icon={<Ionicons name="logo-google" size={18} color="#EA4335" />}
            style={styles.socialBtn}
          />
          <Button
            title="Continue with Facebook"
            onPress={() => handleSocialLogin('Facebook')}
            variant="social"
            size="md"
            icon={<Ionicons name="logo-facebook" size={18} color="#1877F2" />}
            style={styles.socialBtn}
          />
          <Button
            title="Continue with Apple"
            onPress={() => handleSocialLogin('Apple')}
            variant="social"
            size="md"
            icon={<Ionicons name="logo-apple" size={18} color="#000000" />}
            style={styles.socialBtn}
          />
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Form Inputs */}
        <View style={styles.formSection}>
          <Input
            label="Email or Phone Number"
            placeholder="Enter your email or phone"
            value={identifier}
            onChangeText={(text) => {
              setIdentifier(text);
              if (errors.identifier) setErrors({ ...errors, identifier: undefined });
            }}
            error={errors.identifier}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            isPassword
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/forgot-password')}
            style={styles.forgotBtn}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            variant="primary"
            size="lg"
            style={styles.loginBtn}
          />
        </View>

        {/* Register Footer Link */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    flexGrow: 1,
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
    marginRight: SPACING.xl,
    position: 'relative',
  },
  tabItemInactive: {
    paddingBottom: 10,
  },
  tabTextActive: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
  },
  tabTextInactive: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
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
  socialSection: {
    marginBottom: SPACING.lg,
  },
  socialBtn: {
    marginBottom: SPACING.sm,
    height: 48,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: SPACING.md,
    fontSize: 12,
    color: '#9CA3AF',
    textTransform: 'lowercase',
  },
  formSection: {
    marginBottom: SPACING.lg,
    
   },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
    marginTop: -4,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  loginBtn: {
    marginTop: SPACING.xs,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: SPACING.xl,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.link,
  },
});
