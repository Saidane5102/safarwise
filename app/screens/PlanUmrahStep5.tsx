import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from "react";
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OneButton from '../components/OneButton';
import StepProgress from "./StepProgress";

export default function PlanUmrahStep5() {
  // Hide the Expo Router top bar
  // @ts-ignore
  PlanUmrahStep5.options = { headerShown: false };

  const router = useRouter();
  const params = useLocalSearchParams();
  const totalNights = Math.max(2, parseInt(params.totalNights as string) || 2); // Minimum 2 nights
  const [meccaNights, setMeccaNights] = React.useState(totalNights - 1);
  const [medinaNights, setMedinaNights] = React.useState(1);
  const [flightPreference, setFlightPreference] = React.useState<'direct' | 'stopover' | null>(null);

  // When Mecca nights change, Medina is totalNights - Mecca
  const handleMeccaChange = (increment: boolean) => {
    if (increment && meccaNights < totalNights - 1) {
      setMeccaNights(meccaNights + 1);
      setMedinaNights(medinaNights - 1);
    } else if (!increment && meccaNights > 1) {
      setMeccaNights(meccaNights - 1);
      setMedinaNights(medinaNights + 1);
    }
  };
  // When Medina nights change, Mecca is totalNights - Medina
  const handleMedinaChange = (increment: boolean) => {
    if (increment && medinaNights < totalNights - 1) {
      setMedinaNights(medinaNights + 1);
      setMeccaNights(meccaNights - 1);
    } else if (!increment && medinaNights > 1) {
      setMedinaNights(medinaNights - 1);
      setMeccaNights(meccaNights + 1);
    }
  };

  const isMinNights = (location: 'mecca' | 'medina') => {
    return location === 'mecca' ? meccaNights <= 1 : medinaNights <= 1;
  };
  const isMaxNights = (location: 'mecca' | 'medina') => {
    return location === 'mecca' ? meccaNights >= totalNights - 1 : medinaNights >= totalNights - 1;
  };
  const isContinueEnabled = !!flightPreference;

  return (
    <View style={styles.container}>
      {/* Top bar with back icon */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backIconButton} 
          accessibilityLabel="Go back" 
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={28} color="#09090B" />
        </TouchableOpacity>
      </View>
      
      {/* Step Progress */}
      <StepProgress currentStep={5} />
      
      {/* Main content */}
      <View style={styles.contentBox}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            How many nights are you thinking of staying?
          </Text>
          <Text style={styles.nightsTotalLabel}>Total nights: {totalNights}</Text>
        </View>

        {/* Nights Selection Section */}
        <View style={styles.nightsSelectionSection}>
          {/* Mecca Nights */}
          <View style={styles.locationCard}>
            <View style={styles.locationRow}>
              <View style={styles.locationNameContainer}>
                <Text style={styles.locationName}>Mecca</Text>
              </View>
              <View style={styles.nightsControl}>
                <TouchableOpacity
                  style={[
                    styles.controlButton,
                    isMinNights('mecca') && styles.controlButtonDisabled
                  ]}
                  onPress={() => handleMeccaChange(false)}
                  disabled={isMinNights('mecca')}
                >
                  <Ionicons name="remove" size={20} color={isMinNights('mecca') ? '#D4D4D4' : '#09090B'} />
                </TouchableOpacity>
                <Text style={styles.nightsCount}>{meccaNights} nights</Text>
                <TouchableOpacity
                  style={[
                    styles.controlButton,
                    isMaxNights('mecca') && styles.controlButtonDisabled
                  ]}
                  onPress={() => handleMeccaChange(true)}
                  disabled={isMaxNights('mecca')}
                >
                  <Ionicons name="add" size={20} color={isMaxNights('mecca') ? '#D4D4D4' : '#09090B'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Medina Nights */}
          <View style={styles.locationCard}>
            <View style={styles.locationRow}>
              <View style={styles.locationNameContainer}>
                <Text style={styles.locationName}>Medina</Text>
              </View>
              <View style={styles.nightsControl}>
                <TouchableOpacity
                  style={[
                    styles.controlButton,
                    isMinNights('medina') && styles.controlButtonDisabled
                  ]}
                  onPress={() => handleMedinaChange(false)}
                  disabled={isMinNights('medina')}
                >
                  <Ionicons name="remove" size={20} color={isMinNights('medina') ? '#D4D4D4' : '#09090B'} />
                </TouchableOpacity>
                <Text style={styles.nightsCount}>{medinaNights} nights</Text>
                <TouchableOpacity
                  style={[
                    styles.controlButton,
                    isMaxNights('medina') && styles.controlButtonDisabled
                  ]}
                  onPress={() => handleMedinaChange(true)}
                  disabled={isMaxNights('medina')}
                >
                  <Ionicons name="add" size={20} color={isMaxNights('medina') ? '#D4D4D4' : '#09090B'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Flight Preference Section */}
        <View style={styles.flightPreferenceSection}>
          <Text style={styles.sectionLabel}>
            Do you prefer a direct flight or a stopover?
          </Text>
          <View style={styles.flightButtonGroup}>
            <TouchableOpacity
              style={[
                styles.flightButton,
                flightPreference === 'direct' && styles.flightButtonSelected
              ]}
              onPress={() => setFlightPreference('direct')}
            >
              <Text style={[
                styles.flightButtonText,
                flightPreference === 'direct' && styles.flightButtonTextSelected
              ]}>Direct flight!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.flightButton,
                flightPreference === 'stopover' && styles.flightButtonSelected
              ]}
              onPress={() => setFlightPreference('stopover')}
            >
              <Text style={[
                styles.flightButtonText,
                flightPreference === 'stopover' && styles.flightButtonTextSelected
              ]}>Stopover.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Continue Button */}
      <OneButton
        title="Continue"
        onPress={() => isContinueEnabled && router.push('/screens/PlanUmrahStep6')}
        disabled={!isContinueEnabled}
      />
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
    gap: 36,
  },
  titleSection: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
    marginTop: 24, // Add margin to match Step 4
  },
  mainTitle: {
    alignSelf: 'stretch',
    color: '#09090B',
    fontSize: 30,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '600',
    lineHeight: 36,
  },
  nightsTotalLabel: {
    color: '#525252',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 4,
  },
  nightsSelectionSection: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
  locationCard: {
    alignSelf: 'stretch',
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D4D4D4',
  },
  locationRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  locationName: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
  },
  nightsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlButton: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
  controlButtonDisabled: {
    borderColor: '#D4D4D4',
    backgroundColor: 'white',
  },
  nightsCount: {
    width: 65,
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24,
  },
  flightPreferenceSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
  },
  sectionLabel: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  flightButtonGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  flightButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flightButtonSelected: {
    backgroundColor: '#FF5D0A',
    borderColor: '#FF5D0A',
  },
  flightButtonText: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
  },
  flightButtonTextSelected: {
    color: '#FFF5EC',
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
