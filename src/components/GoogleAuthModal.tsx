import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RADIUS, SPACING, SHADOWS } from '../constants/theme';

interface GoogleAuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (email: string, name: string) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!email.trim()) {
      setError('Please enter your Google account email');
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setError('Please enter a valid Gmail or Google Workspace address');
      return;
    }

    // Derive display name if not entered
    let displayName = name.trim();
    if (!displayName) {
      const username = trimmedEmail.split('@')[0];
      displayName = username
        .replace(/[._]/g, ' ')
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }

    setError('');
    onSuccess(trimmedEmail, displayName);
  };

  const handleQuickSelect = (quickEmail: string, quickName: string) => {
    onSuccess(quickEmail, quickName);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.googleBrandRow}>
              <View style={styles.googleIconBox}>
                <Ionicons name="logo-google" size={24} color="#4285F4" />
              </View>
              <Text style={styles.sheetTitle}>Sign in with Google</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              style={styles.closeBtn}
            >
              <Ionicons name="close" size={22} color="#5F6368" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sheetSub}>
            Choose an account to continue to <Text style={{ fontWeight: '700' }}>Pop Mart Rewards</Text>
          </Text>

          {/* Quick account selector */}
          <View style={styles.accountsList}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleQuickSelect('jaydentjy@gmail.com', 'Jayden Tan')}
              style={styles.accountItem}
            >
              <View style={[styles.avatarCircle, { backgroundColor: '#E8F0FE' }]}>
                <Text style={[styles.avatarInitial, { color: '#1A73E8' }]}>J</Text>
              </View>
              <View style={styles.accountText}>
                <Text style={styles.accountName}>Jayden Tan</Text>
                <Text style={styles.accountEmail}>jaydentjy@gmail.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#80868B" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleQuickSelect('vip.collector@gmail.com', 'VIP Collector')}
              style={styles.accountItem}
            >
              <View style={[styles.avatarCircle, { backgroundColor: '#FEF7E0' }]}>
                <Text style={[styles.avatarInitial, { color: '#B06000' }]}>V</Text>
              </View>
              <View style={styles.accountText}>
                <Text style={styles.accountName}>VIP Collector</Text>
                <Text style={styles.accountEmail}>vip.collector@gmail.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#80868B" />
            </TouchableOpacity>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or use another Google account</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Custom Google account inputs */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gmail or Google Email</Text>
            <View style={[styles.inputBox, error ? styles.inputBoxError : null]}>
              <Ionicons name="mail-outline" size={18} color="#5F6368" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.input}
                placeholder="yourname@gmail.com"
                placeholderTextColor="#9AA0A6"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (error) setError('');
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Your Full Name (optional)</Text>
            <View style={styles.inputBox}>
              <Ionicons name="person-outline" size={18} color="#5F6368" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.input}
                placeholder="e.g. Jason Wang"
                placeholderTextColor="#9AA0A6"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Action buttons */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleContinue}
            style={styles.googleLoginBtn}
          >
            <Ionicons name="logo-google" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.googleLoginBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <Text style={styles.termsNote}>
            To continue, Google will share your name, email address, and language preference with Pop Mart.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.floating,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  googleBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIconBox: {
    marginRight: 8,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },
  closeBtn: {
    padding: 4,
  },
  sheetSub: {
    fontSize: 13,
    color: '#5F6368',
    marginBottom: SPACING.lg,
  },
  accountsList: {
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  avatarInitial: {
    fontSize: 16,
    fontWeight: '700',
  },
  accountText: {
    flex: 1,
  },
  accountName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
  },
  accountEmail: {
    fontSize: 12,
    color: '#5F6368',
    marginTop: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8EAED',
  },
  dividerText: {
    paddingHorizontal: SPACING.sm,
    fontSize: 11,
    color: '#80868B',
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3C4043',
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 46,
    backgroundColor: '#FFFFFF',
  },
  inputBoxError: {
    borderColor: '#D93025',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#202124',
  },
  errorText: {
    color: '#D93025',
    fontSize: 11,
    marginTop: 4,
  },
  googleLoginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A73E8',
    borderRadius: RADIUS.md,
    height: 48,
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },
  googleLoginBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  termsNote: {
    fontSize: 11,
    color: '#70757A',
    textAlign: 'center',
    lineHeight: 15,
    paddingHorizontal: SPACING.md,
  },
});
