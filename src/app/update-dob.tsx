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
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function UpdateDobScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useAuth();

  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('April');
  const [year, setYear] = useState('2001');

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const years = Array.from({ length: 60 }, (_, i) => String(2010 - i));

  const handleSave = async () => {
    const formatted = `${day} ${month} ${year}`;
    await updateUser({ dob: formatted });
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, 16), paddingBottom: Math.max(insets.bottom, 20) },
      ]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.closeBtn}
        >
          <Ionicons name="close" size={24} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Update date of birth</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSave}
          style={styles.saveBtn}
        >
          <Ionicons name="checkmark-sharp" size={26} color={COLORS.success} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Input
          label="Date of birth"
          value={`${day} ${month} ${year}`}
          editable={false}
          rightIcon={<Ionicons name="calendar" size={18} color={COLORS.primary} />}
        />

        <Text style={styles.pickerSectionTitle}>Select Date</Text>

        {/* Wheels Selector Columns */}
        <View style={styles.wheelRow}>
          {/* Day Column */}
          <View style={styles.columnContainer}>
            <Text style={styles.colHeader}>Day</Text>
            <ScrollView style={styles.wheelScroll} showsVerticalScrollIndicator={false}>
              {days.map((d) => (
                <TouchableOpacity
                  key={d}
                  activeOpacity={0.7}
                  onPress={() => setDay(d)}
                  style={[styles.wheelItem, day === d && styles.wheelItemSelected]}
                >
                  <Text style={[styles.wheelText, day === d && styles.wheelTextSelected]}>
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Month Column */}
          <View style={[styles.columnContainer, { flex: 1.4 }]}>
            <Text style={styles.colHeader}>Month</Text>
            <ScrollView style={styles.wheelScroll} showsVerticalScrollIndicator={false}>
              {months.map((m) => (
                <TouchableOpacity
                  key={m}
                  activeOpacity={0.7}
                  onPress={() => setMonth(m)}
                  style={[styles.wheelItem, month === m && styles.wheelItemSelected]}
                >
                  <Text style={[styles.wheelText, month === m && styles.wheelTextSelected]}>
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Year Column */}
          <View style={styles.columnContainer}>
            <Text style={styles.colHeader}>Year</Text>
            <ScrollView style={styles.wheelScroll} showsVerticalScrollIndicator={false}>
              {years.map((y) => (
                <TouchableOpacity
                  key={y}
                  activeOpacity={0.7}
                  onPress={() => setYear(y)}
                  style={[styles.wheelItem, year === y && styles.wheelItemSelected]}
                >
                  <Text style={[styles.wheelText, year === y && styles.wheelTextSelected]}>
                    {y}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.btnWrapper}>
          <Button
            title="Done"
            onPress={handleSave}
            variant="primary"
            size="lg"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  closeBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  saveBtn: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  pickerSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  wheelRow: {
    flexDirection: 'row',
    height: 220,
    backgroundColor: '#F8F9FA',
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    gap: SPACING.sm,
  },
  columnContainer: {
    flex: 1,
  },
  colHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  wheelScroll: {
    flex: 1,
  },
  wheelItem: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: RADIUS.md,
  },
  wheelItemSelected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  wheelText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  wheelTextSelected: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  btnWrapper: {
    marginTop: 'auto',
  },
});
