import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function RegisterSuccessScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 24), paddingBottom: Math.max(insets.bottom, 24) },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Welcome to POP MART</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Cute Mascot Celebration Graphic */}
        <View style={styles.mascotCircle}>
          <Text style={styles.mascotEmoji}>👑</Text>
          <View style={styles.sparkle1}>
            <Ionicons name="sparkles" size={24} color="#FED700" />
          </View>
          <View style={styles.sparkle2}>
            <Ionicons name="sparkles" size={18} color="#E50012" />
          </View>
        </View>

        <Text style={styles.heading}>Success!</Text>
        <Text style={styles.subheading}>Your account has been created.</Text>

        <View style={styles.bonusBadge}>
          <Ionicons name="gift-outline" size={18} color="#B3000E" />
          <Text style={styles.bonusText}>+500 Welcome Points Credited!</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          variant="primary"
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.xl,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
  },
  mascotCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFBEA',
    borderWidth: 4,
    borderColor: '#FED700',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
    position: 'relative',
    ...SHADOWS.medium,
  },
  mascotEmoji: {
    fontSize: 68,
  },
  sparkle1: {
    position: 'absolute',
    top: -6,
    right: -4,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 8,
    left: -6,
  },
  heading: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  bonusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEB',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.xs,
  },
  bonusText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 6,
  },
  buttonContainer: {
    width: '100%',
  },
});
