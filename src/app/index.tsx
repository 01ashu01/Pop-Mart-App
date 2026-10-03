import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { PopMartLogo } from '../components/PopMartLogo';
import { COLORS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Start entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after short delay
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (isLoggedIn) {
          router.replace('/(tabs)');
        } else {
          router.replace('/welcome');
        }
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [isLoading, isLoggedIn]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <PopMartLogo size="large" variant="red" />
        <Text style={styles.tagline}>LOYALTY & REWARDS</Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.loadingBarContainer}>
          <Animated.View style={styles.loadingBar} />
        </View>
        <Text style={styles.versionText}>POP MART GLOBAL • VIP CLUB</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagline: {
    marginTop: 14,
    fontSize: 12,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    alignItems: 'center',
  },
  loadingBarContainer: {
    width: 60,
    height: 3,
    backgroundColor: '#F1F3F5',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  loadingBar: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  versionText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 1,
  },
});
