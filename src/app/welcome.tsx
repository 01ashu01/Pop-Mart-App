import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { PopMartLogo } from '../components/PopMartLogo';
import { Button } from '../components/Button';
import { COLORS, SPACING } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Top Festive Red Hero Section */}
      <View style={[styles.heroContainer, { paddingTop: Math.max(insets.top, 24) }]}>
        {/* Pop Mart Logo */}
        <View style={styles.logoWrapper}>
          <PopMartLogo size="large" variant="red" style={styles.logoShadow} />
        </View>

        {/* Figurines Floating Montage Illustration */}
        <View style={styles.figurinesGrid}>
          {/* Central Peak Figurine */}
          <View style={[styles.figurineBadge, styles.posPeak]}>
            <Text style={styles.figurineEmoji}>🦁</Text>
            <View style={styles.cloudPill}>
              <Text style={styles.cloudText}>POP MART</Text>
            </View>
          </View>

          {/* Left Wing Figurine */}
          <View style={[styles.figurineBadge, styles.posLeft1]}>
            <Text style={styles.figurineEmoji}>👑</Text>
          </View>
          
          {/* Right Wing Figurine */}
          <View style={[styles.figurineBadge, styles.posRight1]}>
            <Text style={styles.figurineEmoji}>🐰</Text>
          </View>

          {/* Center Mascot (Labubu) */}
          <View style={[styles.figurineBadge, styles.posCenter]}>
            <Text style={styles.figurineEmojiBig}>👹</Text>
          </View>

          {/* Center Right (Skullpanda) */}
          <View style={[styles.figurineBadge, styles.posRight2]}>
            <Text style={styles.figurineEmoji}>💀</Text>
          </View>

          {/* Center Left (Dimoo) */}
          <View style={[styles.figurineBadge, styles.posLeft2]}>
            <Text style={styles.figurineEmoji}>☁️</Text>
          </View>

          {/* Bottom Left Figurine */}
          <View style={[styles.figurineBadge, styles.posBottomLeft]}>
            <Text style={styles.figurineEmoji}>🧚</Text>
          </View>

          {/* Bottom Center Figurine */}
          <View style={[styles.figurineBadge, styles.posBottomCenter]}>
            <Text style={styles.figurineEmoji}>🦊</Text>
          </View>

          {/* Bottom Right Figurine */}
          <View style={[styles.figurineBadge, styles.posBottomRight]}>
            <Text style={styles.figurineEmoji}>🍼</Text>
          </View>
        </View>

        {/* Curved Swoop SVG into white background */}
        <View style={styles.curveContainer}>
          <Svg
            width={width}
            height={90}
            viewBox={`0 0 ${width} 90`}
            style={{ position: 'absolute', bottom: -1 }}
          >
            <Path
              d={`M 0 0 C ${width * 0.25} 70, ${width * 0.75} 70, ${width} 0 L ${width} 90 L 0 90 Z`}
              fill="#FFFFFF"
            />
          </Svg>
        </View>
      </View>

      {/* Bottom White Action Card */}
      <View style={[styles.contentCard, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Welcome to POP MART.</Text>
          <Text style={styles.subheading}>
            Stay in the loop with the latest product updates and promotions!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={() => router.push('/register')}
            variant="primary"
            size="lg"
          />

          <View style={styles.loginRow}>
            <Text style={styles.alreadyText}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Login now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroContainer: {
    flex: 1.45,
    backgroundColor: '#DE1C24', // Rich Pop Mart festive red
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  logoWrapper: {
    zIndex: 10,
    marginTop: 12,
  },
  logoShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  figurinesGrid: {
    width: '100%',
    flex: 1,
    position: 'relative',
    marginTop: 10,
  },
  figurineBadge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 999,
  },
  posPeak: {
    top: '2%',
    left: '42%',
    width: 58,
    height: 58,
  },
  posLeft1: {
    top: '16%',
    left: '18%',
    width: 50,
    height: 50,
  },
  posRight1: {
    top: '16%',
    right: '18%',
    width: 50,
    height: 50,
  },
  posCenter: {
    top: '32%',
    left: '38%',
    width: 82,
    height: 82,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 2,
    borderColor: '#FED700',
  },
  posLeft2: {
    top: '44%',
    left: '12%',
    width: 54,
    height: 54,
  },
  posRight2: {
    top: '44%',
    right: '12%',
    width: 54,
    height: 54,
  },
  posBottomLeft: {
    top: '64%',
    left: '22%',
    width: 52,
    height: 52,
  },
  posBottomCenter: {
    top: '68%',
    left: '44%',
    width: 50,
    height: 50,
  },
  posBottomRight: {
    top: '64%',
    right: '22%',
    width: 52,
    height: 52,
  },
  figurineEmoji: {
    fontSize: 26,
  },
  figurineEmojiBig: {
    fontSize: 44,
  },
  cloudPill: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  cloudText: {
    fontSize: 8,
    fontWeight: '900',
    color: COLORS.primary,
  },
  curveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
  },
  contentCard: {
    flex: 0.95,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.xl,
    justifyContent: 'space-between',
    paddingTop: SPACING.lg,
  },
  textContainer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: SPACING.md,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  alreadyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.link,
  },
});
