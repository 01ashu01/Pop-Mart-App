import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Rect, G } from 'react-native-svg';
import { RADIUS, SHADOWS } from '../constants/theme';

interface QRCodeViewProps {
  value?: string;
  size?: number;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({
  value = 'POPMART-VIP-8829-9120',
  size = 230,
}) => {
  // Deterministic pattern generator for authentic high-density QR look
  const grid = 25;
  const cellSize = size / grid;

  const isCornerSquare = (r: number, c: number) => {
    // Top-left
    if (r < 7 && c < 7) return true;
    // Top-right
    if (r < 7 && c >= grid - 7) return true;
    // Bottom-left
    if (r >= grid - 7 && c < 7) return true;
    return false;
  };

  const getModule = (r: number, c: number) => {
    // Top-left finder pattern
    if (r < 7 && c < 7) {
      if (r === 0 || r === 6 || c === 0 || c === 6) return true;
      if (r >= 2 && r <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }
    // Top-right finder pattern
    if (r < 7 && c >= grid - 7) {
      const col = c - (grid - 7);
      if (r === 0 || r === 6 || col === 0 || col === 6) return true;
      if (r >= 2 && r <= 4 && col >= 2 && col <= 4) return true;
      return false;
    }
    // Bottom-left finder pattern
    if (r >= grid - 7 && c < 7) {
      const row = r - (grid - 7);
      if (row === 0 || row === 6 || c === 0 || c === 6) return true;
      if (row >= 2 && row <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }

    // Timing patterns
    if (r === 6 || c === 6) {
      return (r + c) % 2 === 0;
    }

    // Pseudo-random data modules derived from input value
    const hash = (r * 31 + c * 17 + value.charCodeAt((r + c) % value.length)) % 100;
    return hash > 48;
  };

  const rects = [];
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      if (getModule(r, c)) {
        rects.push(
          <Rect
            key={`${r}-${c}`}
            x={c * cellSize}
            y={r * cellSize}
            width={cellSize + 0.3}
            height={cellSize + 0.3}
            fill="#000000"
          />
        );
      }
    }
  }

  return (
    <View style={[styles.container, { width: size + 32, height: size + 32 }]}>
      <Svg width={size} height={size}>
        <G>{rects}</G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.large,
  },
});
