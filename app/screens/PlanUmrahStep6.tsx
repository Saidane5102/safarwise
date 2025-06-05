import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React from "react";
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import StepProgress from "./StepProgress";

const BUDGET_OPTIONS = [
  { key: 'budget', label: 'Budget-friendly' },
  { key: 'mid', label: 'Mid-range' },
  { key: 'premium', label: 'Premium' },
  { key: 'undecided', label: 'Not decided yet' },
];

export default function PlanUmrahStep6() {
  // Hide the Expo Router top bar
  // @ts-ignore
  PlanUmrahStep6.options = { headerShown: false };

  const router = useRouter();
  const [budget, setBudget] = React.useState<string | null>(null);
  const [firstUmrah, setFirstUmrah] = React.useState<string | null>(null);

  const isContinueEnabled = !!budget && !!firstUmrah;

  return (
    <View style={styles.container}>
      {/* Top bar with back icon */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIconButton} accessibilityLabel="Go back" accessibilityRole="button">
          <Ionicons name="arrow-back" size={28} color="#09090B" />
        </TouchableOpacity>
      </View>
      {/* Step Progress */}
      <StepProgress currentStep={6} />
      {/* Main content */}
      <View style={styles.contentBox}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Do you have a budget in mind?</Text>
        </View>
        {/* Budget options */}
        <View style={styles.budgetOptionsSection}>
          {BUDGET_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={styles.budgetOptionRow}
              onPress={() => setBudget(opt.key)}
              accessibilityRole="radio"
              accessibilityState={{ selected: budget === opt.key }}
            >
              <View style={styles.simpleRadioOuter}>
                {budget === opt.key && <View style={styles.simpleRadioDot} />}
              </View>
              <Text style={styles.budgetOptionLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* First Umrah section */}
        <View style={styles.firstUmrahSection}>
          <View style={styles.firstUmrahLabelBox}>
            <Text style={styles.firstUmrahLabel}>Is this your first Umrah?*</Text>
            <Text style={styles.firstUmrahHelper}>It helps us guide you better.</Text>
          </View>
          <View style={styles.firstUmrahRadioGroup}>
            <TouchableOpacity
              style={styles.firstUmrahRadioRow}
              onPress={() => setFirstUmrah('yes')}
              accessibilityRole="radio"
              accessibilityState={{ selected: firstUmrah === 'yes' }}
            >
              <View style={styles.simpleRadioOuter}>
                {firstUmrah === 'yes' && <View style={styles.simpleRadioDot} />}
              </View>
              <Text style={styles.firstUmrahRadioLabel}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.firstUmrahRadioRow}
              onPress={() => setFirstUmrah('no')}
              accessibilityRole="radio"
              accessibilityState={{ selected: firstUmrah === 'no' }}
            >
              <View style={styles.simpleRadioOuter}>
                {firstUmrah === 'no' && <View style={styles.simpleRadioDot} />}
              </View>
              <Text style={styles.firstUmrahRadioLabel}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Continue Button (fixed at bottom) */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            isContinueEnabled ? styles.continueButtonEnabled : styles.continueButtonDisabled
          ]}
          accessibilityLabel="Continue"
          accessibilityRole="button"
          onPress={() => isContinueEnabled && router.push({ pathname: '/screens/PlanUmrahLoading' })}
          disabled={!isContinueEnabled}
        >
          <Text style={[
            styles.continueButtonText,
            isContinueEnabled ? styles.continueButtonTextEnabled : styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 32 : 48, // Add space for status bar
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  backIconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 44,
  },
  titleSection: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
    marginTop: 24,
  },
  mainTitle: {
    alignSelf: 'stretch',
    color: '#09090B',
    fontSize: 30,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '600',
    lineHeight: 36,
  },
  budgetOptionsSection: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 38,
  },
  budgetOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  simpleRadioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1D1B20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    backgroundColor: '#fff',
  },
  simpleRadioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1D1B20',
  },
  budgetOptionLabel: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
  },
  firstUmrahSection: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 18,
  },
  firstUmrahLabelBox: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 0,
  },
  firstUmrahLabel: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
  },
  firstUmrahHelper: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 16,
    marginTop: 2,
  },
  firstUmrahRadioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 38,
  },
  firstUmrahRadioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  firstUmrahRadioLabel: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 0,
    paddingBottom: 24,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  continueButton: {
    width: '90%',
    alignSelf: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFAE6D',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#FFAE6D',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  continueButtonEnabled: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  continueButtonDisabled: {
    backgroundColor: '#FFAE6D',
    borderColor: '#FFAE6D',
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#FFE9D3',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
  },
  continueButtonTextEnabled: {
    color: '#fff',
  },
  continueButtonTextDisabled: {
    color: '#FFE9D3',
    opacity: 0.7,
  },
});
