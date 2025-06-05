import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StepProgress from "./StepProgress";

type SelectionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

function SelectionButton({ label, selected, onPress, accessibilityLabel }: SelectionButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.tertiaryButton,
        selected && styles.tertiaryButtonSelected,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text
        style={[
          styles.tertiaryButtonText,
          selected && styles.tertiaryButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function PlanUmrahStep2() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<'yes' | 'no' | null>(null);
  return (
    <View style={styles.container}>
      {/* Top bar with back icon */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIconButton} accessibilityLabel="Go back" accessibilityRole="button">
          <Ionicons name="arrow-back" size={28} color="#09090B" />
        </TouchableOpacity>
      </View>
      {/* Step Progress */}
      <StepProgress currentStep={2} />
      {/* Main content */}
      <View style={styles.contentBox}>
        <Image
          source={require('../../assets/images/84bc23c60a5c2e1533ff7e7ec3ec931fc9466536.png')}
          style={styles.heroImage}
          accessible
          accessibilityLabel="Scenic view representing Madinah journey"
        />
        <View style={styles.contentTitleBox}>
          <Text style={styles.contentTitle}>
            Would you like to enrich your journey by visiting Madinah too?
          </Text>
        </View>
        <View style={styles.contentInputBox}>
          <Text style={styles.inputDescription}>
            Many pilgrims choose to visit the Prophet’s Mosque after or before Makkah — we’ll help you organize this easily.
          </Text>
          <View style={styles.buttonGroup}>
            <SelectionButton
              label="Yes, I’d like to include Madinah"
              selected={selected === 'yes'}
              onPress={() => setSelected('yes')}
              accessibilityLabel="Yes, I’d like to include Madinah"
            />
            <SelectionButton
              label="Not this time"
              selected={selected === 'no'}
              onPress={() => setSelected('no')}
              accessibilityLabel="Not this time"
            />
          </View>
        </View>
      </View>
      {/* Continue Button (fixed at bottom) */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            styles.continueButtonEnabled,
            !selected && { opacity: 0.5 },
          ]}
          accessibilityLabel="Continue"
          accessibilityRole="button"
          onPress={() => selected && router.push('/screens/PlanUmrahStep3')}
          disabled={!selected}
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
    gap: 24,
    marginTop: 24,
  },
  contentTitleBox: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
  contentTitle: {
    alignSelf: 'stretch',
    color: '#09090B',
    fontSize: 30,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '600',
    lineHeight: 36,
  },
  contentInputBox: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
  },
  inputLabel: {
    color: '#09090B',
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
  heroImage: {
    width: 328,
    height: 223,
    borderRadius: 17,
    alignSelf: 'center',
    marginBottom: 8,
  },
  inputDescription: {
    color: '#09090B',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  tertiaryButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    width: '100%',
  },
  tertiaryButtonSelected: {
    backgroundColor: '#FF5D0A',
    borderColor: '#FF5D0A',
  },
  tertiaryButtonText: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  tertiaryButtonTextSelected: {
    color: '#FFF5EC',
  },
});
