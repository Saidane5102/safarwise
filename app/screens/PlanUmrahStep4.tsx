import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React from "react";
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StepProgress from "./StepProgress";

export default function PlanUmrahStep4() {
  const router = useRouter();
  
  // Set default dates when component mounts
  React.useEffect(() => {
    const today = new Date();
    const tenDaysLater = new Date(today);
    tenDaysLater.setDate(today.getDate() + 10);
    
    setStartDate(today);
    setEndDate(tenDaysLater);
  }, []); // Empty dependency array means this runs once when component mounts

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [showStart, setShowStart] = React.useState(false);
  const [showEnd, setShowEnd] = React.useState(false);
  const [startLocation, setStartLocation] = React.useState<'Mekkah' | 'Medina' | null>(null);

  const handleStartDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowStart(false);
    }
    if (date) {
      setStartDate(date);
      // Reset end date if it's before new start date
      if (endDate && date > endDate) {
        setEndDate(null);
      }
    }
  };

  const handleEndDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowEnd(false);
    }
    if (date) {
      setEndDate(date);
    }
  };

  // Helper to calculate nights
  const calculateNights = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  // Format date to show only the date part
  const formatDate = (date: Date | null) => {
    if (!date) return '--/--/----';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Continue button handler
  const handleContinue = () => {
    const nights = calculateNights();
    router.push({
      pathname: '/screens/PlanUmrahStep5',
      params: { totalNights: nights }
    });
  };

  return (
    <View style={styles.container}>
      {/* Top bar with back icon */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIconButton} accessibilityLabel="Go back" accessibilityRole="button">
          <Ionicons name="arrow-back" size={28} color="#09090B" />
        </TouchableOpacity>
      </View>
      {/* Step Progress */}
      <StepProgress currentStep={4} />
      {/* Main content */}
      <View style={styles.contentBox}>
        <View style={styles.contentTitleBox}>
          <Text style={styles.contentTitle}>When are you planning your trip?</Text>
        </View>
        {/* Interactive travel date selection */}
        <View style={styles.travelDateSection}>
          <Text style={styles.travelDateLabel}>Choose your travel date</Text>
          <View style={styles.travelDateCard}>
            <View style={styles.travelDateHeader}>
              <View style={styles.nightsInfo}>
                <Ionicons name="calendar-outline" size={20} color="#09090B" style={{ marginRight: 4 }} />
                <Text style={styles.nightsCount}>{calculateNights()} nights</Text>
              </View>
              {(startDate || endDate) && (
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleReset}
                  accessibilityLabel="Reset date selection"
                  accessibilityRole="button"
                >
                  <Text style={styles.resetButtonText}>Reset Selection</Text>
                  <Ionicons name="close" size={16} color="#09090B" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.travelDateRow}>
              <TouchableOpacity 
                style={styles.travelDateCol} 
                onPress={() => setShowStart(true)}
                accessibilityLabel="Select start date"
                accessibilityRole="button"
              >
                <Text style={styles.travelDateColLabel}>Start date</Text>
                <Text style={[
                  styles.travelDateColValue,
                  startDate && styles.travelDateColValueSelected
                ]}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.travelDateCol} 
                onPress={() => startDate && setShowEnd(true)}
                accessibilityLabel="Select end date"
                accessibilityRole="button"
                disabled={!startDate}
              >
                <Text style={styles.travelDateColLabel}>End date</Text>
                <Text style={[
                  styles.travelDateColValue,
                  endDate && styles.travelDateColValueSelected
                ]}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
              <Ionicons name="chevron-forward" size={24} color="#09090B" style={styles.travelDateChevron} />
            </View>
          </View>
          {/* Date Picker for iOS */}
          {Platform.OS === 'ios' && (
            <>
              <Modal
                animationType="slide"
                transparent={true}
                visible={showStart}
                onRequestClose={() => setShowStart(false)}
              >
                <View style={styles.modalView}>
                  <View style={[styles.modalContent, { backgroundColor: '#FFFFFF' }]}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setShowStart(false)}
                    >
                      <Text style={styles.modalButtonText}>Done</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      testID="startDatePicker"
                      value={startDate || new Date()}
                      mode="date"
                      display="spinner"
                      onChange={handleStartDateChange}
                      minimumDate={new Date()}
                      themeVariant="light"
                      accentColor="#FF7A00"
                      textColor="#09090B"
                    />
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={showEnd}
                onRequestClose={() => setShowEnd(false)}
              >
                <View style={styles.modalView}>
                  <View style={[styles.modalContent, { backgroundColor: '#FFFFFF' }]}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setShowEnd(false)}
                    >
                      <Text style={styles.modalButtonText}>Done</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      testID="endDatePicker"
                      value={endDate || startDate || new Date()}
                      mode="date"
                      display="spinner"
                      onChange={handleEndDateChange}
                      minimumDate={startDate || new Date()}
                      themeVariant="light"
                      accentColor="#FF7A00"
                      textColor="#09090B"
                    />
                  </View>
                </View>
              </Modal>
            </>
          )}

          {/* Date Picker for Android */}
          {Platform.OS === 'android' && showStart && (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
              minimumDate={new Date()}
              themeVariant="light"
              accentColor="#FF7A00"
            />
          )}

          {Platform.OS === 'android' && showEnd && (
            <DateTimePicker
              testID="endDatePicker"
              value={endDate || startDate || new Date()}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
              minimumDate={startDate || new Date()}
              themeVariant="light"
              accentColor="#FF7A00"
            />
          )}
        </View>
        {/* Where would you like to start your Umrah journey? */}
        <View style={styles.startJourneySection}>
          <Text style={styles.startJourneyLabel}>Where would you like to start your Umrah journey?</Text>
          <View style={styles.startJourneyButtonGroup}>
            <TouchableOpacity
              style={[styles.tertiaryButton, startLocation === 'Mekkah' && styles.tertiaryButtonSelected]}
              onPress={() => setStartLocation('Mekkah')}
              accessibilityRole="button"
              accessibilityLabel="Start in Mekkah"
            >
              <Text style={[styles.tertiaryButtonText, startLocation === 'Mekkah' && styles.tertiaryButtonTextSelected]}>Mekkah</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tertiaryButton, startLocation === 'Medina' && styles.tertiaryButtonSelected]}
              onPress={() => setStartLocation('Medina')}
              accessibilityRole="button"
              accessibilityLabel="Start in Medina"
            >
              <Text style={[styles.tertiaryButtonText, startLocation === 'Medina' && styles.tertiaryButtonTextSelected]}>Medina</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Continue Button (fixed at bottom) */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.continueButton, styles.continueButtonEnabled]}
          accessibilityLabel="Continue"
          accessibilityRole="button"
          onPress={handleContinue}
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
  travelDateSection: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  travelDateLabel: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 8,
  },
  travelDateCard: {
    alignSelf: 'stretch',
    height: 126,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  travelDateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 51,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
  nightsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nightsCount: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 20,
  },
  resetButton: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: 'white',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  resetButtonText: {
    color: '#09090B',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 16,
  },
  travelDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  travelDateCol: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRightWidth: 1,
    borderRightColor: '#D4D4D4',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  travelDateColLabel: {
    color: '#09090B',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 24,
  },
  travelDateColValue: {
    color: '#525252',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 2,
  },
  travelDateColValueSelected: {
    color: '#FF5D0A',
    fontWeight: '700',
  },
  travelDateChevron: {
    position: 'absolute',
    right: 8,
    top: '50%',
    marginTop: -12,
    backgroundColor: '#fff',
  },
  startJourneySection: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  startJourneyLabel: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 8,
  },
  startJourneyButtonGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
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
    marginRight: 10,
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
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  iosDatePicker: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
  },
});
