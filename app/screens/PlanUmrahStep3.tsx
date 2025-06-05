import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React from "react";
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import StepProgress from "./StepProgress";

type CounterRowProps = {
  label: string;
  sublabel: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
  max?: number;
};

function CounterRow({ label, sublabel, value, onDecrement, onIncrement, min = 0, max = 10 }: CounterRowProps) {
  return (
    <View style={styles.counterRow}>
      <View style={styles.counterLabelBox}>
        <Text style={styles.counterLabel}>{label}</Text>
        <Text style={styles.counterSublabel}>{sublabel}</Text>
      </View>
      <View style={styles.counterControls}>
        <TouchableOpacity
          style={[styles.counterButton, value <= min && styles.counterButtonDisabled]}
          onPress={onDecrement}
          disabled={value <= min}
          accessibilityLabel={`Decrease ${label}`}
          accessibilityRole="button"
        >
          <Ionicons name="remove" size={20} color={value <= min ? '#D4D4D4' : '#09090B'} />
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={onIncrement}
          disabled={value >= max}
          accessibilityLabel={`Increase ${label}`}
          accessibilityRole="button"
        >
          <Ionicons name="add" size={20} color={value >= max ? '#D4D4D4' : '#09090B'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function PlanUmrahStep3() {
  // Hide the Expo Router top bar
  // @ts-ignore
  PlanUmrahStep3.options = { headerShown: false };

  const router = useRouter();
  const [adults, setAdults] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [infants, setInfants] = React.useState(0);
  return (
    <View style={styles.container}>
      {/* Top bar with back icon */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIconButton} accessibilityLabel="Go back" accessibilityRole="button">
          <Ionicons name="arrow-back" size={28} color="#09090B" />
        </TouchableOpacity>
      </View>
      {/* Step Progress */}
      <StepProgress currentStep={3} />
      {/* Main content: Who is going */}
      <View style={styles.counterContentBox}>
        <View style={styles.counterTitleBox}>
          <Text style={styles.counterTitle}>Are you traveling alone, or with others?</Text>
        </View>
        <View style={styles.counterCard}>
          <CounterRow
            label="Adulte"
            sublabel="Ages 13 or above"
            value={adults}
            onDecrement={() => setAdults(Math.max(0, adults - 1))}
            onIncrement={() => setAdults(adults + 1)}
            min={0}
          />
          <CounterRow
            label="Children"
            sublabel="Ages 2 – 12"
            value={children}
            onDecrement={() => setChildren(Math.max(0, children - 1))}
            onIncrement={() => setChildren(children + 1)}
            min={0}
          />
          <CounterRow
            label="Infants"
            sublabel="Under 2"
            value={infants}
            onDecrement={() => setInfants(Math.max(0, infants - 1))}
            onIncrement={() => setInfants(infants + 1)}
            min={0}
          />
        </View>
      </View>
      {/* Continue Button (fixed at bottom) */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.continueButton, styles.continueButtonEnabled, (adults + children + infants === 0) && { opacity: 0.5 }]}
          accessibilityLabel="Continue"
          accessibilityRole="button"
          onPress={() => (adults + children + infants > 0) && router.push('/screens/PlanUmrahStep4')}
          disabled={adults + children + infants === 0}
        >
          <Text style={[styles.continueButtonText, styles.continueButtonTextEnabled]}>Continue</Text>
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
  counterContentBox: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 44,
    marginTop: 24,
  },
  counterTitleBox: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8, // reduced from 24 to 8
  },
  counterTitle: {
    alignSelf: 'stretch',
    color: '#09090B',
    fontSize: 30,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '600',
    lineHeight: 36,
  },
  counterCard: {
    alignSelf: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    gap: 16,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
    width: '100%',
  },
  counterLabelBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 0,
  },
  counterLabel: {
    color: '#09090B',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
  },
  counterSublabel: {
    color: '#525252',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 16,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  counterButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonDisabled: {
    borderColor: '#D4D4D4',
    backgroundColor: '#fff',
    opacity: 0.5,
  },
  counterValue: {
    width: 21,
    textAlign: 'center',
    color: '#09090B',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
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
});
