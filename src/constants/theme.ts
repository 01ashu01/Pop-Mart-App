export const COLORS = {
  // Brand colors
  primary: '#E50012', // Iconic Pop Mart red
  primaryDark: '#C40010',
  primaryLight: '#FFF0F0',
  primaryMuted: 'rgba(229, 0, 18, 0.08)',
  
  // Accent yellow (from Figma buttons)
  accent: '#FED700',
  accentDark: '#E6C200',
  accentLight: '#FFF9D2',
  
  // Neutral tones
  background: '#F8F9FA',
  backgroundLight: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F4F6',
  surfaceTertiary: '#EAECEF',
  
  // Dark mode / QR screen dark palette
  darkBg: '#0A0A0A',
  darkSurface: '#161616',
  darkCard: '#1E1E1E',
  darkBorder: '#2E2E2E',
  
  // Typography
  textPrimary: '#111111',
  textSecondary: '#666666',
  textMuted: '#9E9E9E',
  textInverted: '#FFFFFF',
  textDarkMuted: '#A0A0A0',
  
  // Status colors
  success: '#34C759',
  successLight: '#E8F8EE',
  warning: '#FF9500',
  warningLight: '#FFF5E6',
  error: '#FF3B30',
  errorLight: '#FFEEEE',
  info: '#007AFF',
  infoLight: '#EBF4FF',
  
  // Borders & Dividers
  border: '#E9ECEF',
  borderLight: '#F1F3F5',
  borderFocus: '#111111',
  
  // Interactive
  link: '#007AFF',
  disabled: '#D1D5DB',
  disabledText: '#9CA3AF',
  overlay: 'rgba(0, 0, 0, 0.6)',
  toastBg: '#2C2C2E',
};

export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },
  floating: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },
};
