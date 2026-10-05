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
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { GoogleAuthModal } from '../components/GoogleAuthModal';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('01/04/2001');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { loginWithGoogle } = useAuth();
  const [googleModalVisible, setGoogleModalVisible] = useState(false);

  const handleNext = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (phone.length < 8) {
      newErrors.phone = 'Phone number is too short';
    }
    if (!password) {
      newErrors.password = 'The password must be at least 8 characters long';
    } else if (password.length < 8) {
      newErrors.password = 'The password must be at least 8 characters long';
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'The password confirmation does not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Generate real 6-digit OTP for this session
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Navigate to Verification Code screen with parameters
    router.push({
      pathname: '/verify-code',
      params: {
        firstName,
        lastName,
        email,
        phone: phone.startsWith('+') ? phone : `+65 ${phone}`,
        dob,
        expectedOtp: generatedOtp,
      },
    });
  };

  const handleGoogleSuccess = async (googleEmail: string, googleName: string) => {
    setGoogleModalVisible(false);
    await loginWithGoogle(googleEmail, googleName);
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
        {/* Top Navigation */}
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/login')}
            style={styles.tabItemInactive}
          >
            <Text style={styles.tabTextInactive}>Login</Text>
          </TouchableOpacity>
          <View style={styles.tabItemActive}>
            <Text style={styles.tabTextActive}>Register</Text>
            <View style={styles.tabIndicator} />
          </View>
        </View>

        {/* Social Buttons */}
        <View style={styles.socialSection}>
          <Button
            title="Continue with Google"
            onPress={() => setGoogleModalVisible(true)}
            variant="social"
            size="md"
            icon={<Ionicons name="logo-google" size={18} color="#EA4335" />}
            style={styles.socialBtn}
          />
          <Button
            title="Continue with Facebook"
            onPress={() => {}}
            variant="social"
            size="md"
            icon={<Ionicons name="logo-facebook" size={18} color="#1877F2" />}
            style={styles.socialBtn}
          />
          <Button
            title="Continue with Apple"
            onPress={() => {}}
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

        {/* Form Fields Matching Figma */}
        <View style={styles.formSection}>
          {/* First Name & Last Name Side by Side */}

              <View style={styles.nameRow}>
                <View style={styles.nameCol}>
              <Input
                label="First Name"
                placeholder="Jason"
                value={firstName}
                style={{color:"red"}}
                onChangeText={(text) => {
                  setFirstName(text);
                  if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                }}
                error={errors.firstName}
              />
            </View>
            <View style={styles.nameCol}>
              <Input
                label="Last Name"
                placeholder="Wang"
                value={lastName}
                onChangeText={(text) => {
                  setLastName(text);
                  if (errors.lastName) setErrors({ ...errors, lastName: undefined });
                }}
                error={errors.lastName}
              />
            </View>
          </View>

          {/* Email */}
          <Input
            label="Email"
            placeholder="jason.wang@gmail.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Phone Number & DOB Side by Side */}
          <View style={styles.nameRow}>
            <View style={styles.nameCol}>
              <Input
                label="Phone Number"
                placeholder="91238123"
                prefix="+65"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                error={errors.phone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.nameCol}>
              <Input
                label="Date of birth"
                placeholder="21/12/1995"
                value={dob}
                onChangeText={setDob}
                rightIcon={<Ionicons name="calendar-outline" size={18} color="#9CA3AF" />}
              />
            </View>
          </View>

          {/* Password */}
          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            isPassword
          />

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
            }}
            error={errors.confirmPassword}
            isPassword
          />

          {/* Next Button */}
          <Button
            title="Next"
            onPress={handleNext}
            variant="primary"
            size="lg"
            style={styles.nextBtn}
          />
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Login now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <GoogleAuthModal
        visible={googleModalVisible}
        onClose={() => setGoogleModalVisible(false)}
        onSuccess={handleGoogleSuccess}
      />
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
    marginBottom: SPACING.lg,
  },
  tabItemActive: {
    paddingBottom: 10,
    position: 'relative',
  },
  tabItemInactive: {
    paddingBottom: 10,
    marginRight: SPACING.xl,
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
    marginBottom: SPACING.sm,
  },
  socialBtn: {
    marginBottom: SPACING.sm,
    height: 48,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: SPACING.md,
    fontSize: 13,
    color: 'Regular',
    textTransform: 'lowercase',
  },
  formSection: {
    marginTop: SPACING.xs,
  },

  nameCol: {
    flex: 1,
    color:"#999999"
    
  },

   nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
     
  },


  nextBtn: {
    marginTop: SPACING.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.link,
  },
});
