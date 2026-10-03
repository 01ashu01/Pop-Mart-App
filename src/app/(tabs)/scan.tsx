import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PopMartLogo } from '../../components/PopMartLogo';
import { QRCodeView } from '../../components/QRCodeView';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

export default function ScanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, simulateInStoreScan } = useAuth();
  const [scanResult, setScanResult] = useState<number | null>(null);

  const handleSimulateScan = () => {
    const res = simulateInStoreScan();
    if (res.success) {
      setScanResult(res.pointsEarned);
    }
  };

  const handleExit = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 24),
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
      >
        {/* Top POP MART Logo Matching Figma */}
        <View style={styles.logoContainer}>
          <PopMartLogo size="medium" variant="red" />
        </View>

        {/* Headline & Explanation from Figma media_1791022022392.png */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Sorry! We are under scheduled maintenance</Text>
          <Text style={styles.subtitle}>
            You can use this QR code in our stores to earn POP MART points.
          </Text>
        </View>

        {/* QR Code Container Matching Figma */}
        <View style={styles.qrWrapper}>
          <QRCodeView value={user?.memberCode || 'PM-8829-9120'} size={210} />

          {/* Member ID and Barcode Indicator */}
          <View style={styles.barcodeInfo}>
            <Text style={styles.memberIdText}>{user?.memberCode || 'PM-8829-9120'}</Text>
            <Text style={styles.memberTierBadge}>
              {user?.membershipTier.toUpperCase()} VIP • SCAN TO EARN
            </Text>
          </View>
        </View>

        {/* Interactive Simulation Bar */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSimulateScan}
          style={styles.simulateScanBtn}
        >
          <Ionicons name="scan-circle-outline" size={20} color="#FED700" />
          <Text style={styles.simulateScanText}>
            Simulate In-Store Scan (+100 PTS)
          </Text>
        </TouchableOpacity>

        {scanResult !== null && (
          <View style={styles.resultBanner}>
            <Ionicons name="checkmark-circle" size={18} color="#34C759" />
            <Text style={styles.resultText}>
              Scan Verified! +{scanResult} points added to your balance.
            </Text>
          </View>
        )}

        {/* Yellow Exit Button Matching Figma media_1791022022392.png */}
        <View style={styles.exitBtnWrapper}>
          <Button
            title="Exit"
            onPress={handleExit}
            variant="primary"
            size="lg"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Faithful to Figma dark maintenance theme
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
    alignSelf: 'flex-start',
  },
  messageContainer: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  qrWrapper: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  barcodeInfo: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  memberIdText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  memberTierBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FED700',
    marginTop: 4,
    letterSpacing: 1,
  },
  simulateScanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(254, 215, 0, 0.12)',
    borderWidth: 1,
    borderColor: '#FED700',
    borderRadius: RADIUS.pill,
    paddingVertical: 10,
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
  },
  simulateScanText: {
    color: '#FED700',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  resultBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  resultText: {
    color: '#34C759',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  exitBtnWrapper: {
    width: '100%',
    marginTop: 'auto',
    paddingTop: SPACING.md,
  },
});
