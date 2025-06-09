import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useBooking } from '../components/BookingContext';
import OneButton from '../components/OneButton';

export default function FlightDetails(props: any) {
  const router = useRouter();
  const { selectedFlight } = useBooking();
  // Get flight data from navigation params or router params
  const route = props.route || props;
  let segment = route.params?.segment;
  if (typeof segment === 'string') {
    try {
      segment = JSON.parse(segment);
    } catch {}
  }

  useEffect(() => {
    // If no flight is selected, go back to BookingFlights
    if (!selectedFlight) {
      router.replace('/screens/BookingFlights');
    }
  }, [selectedFlight]);

  return (
    <View style={styles.container}>
      {/* Top bar with only title */}
      <View style={styles.topBarContainer}>
        <Text style={styles.pageTitle}>Flight Details</Text>
      </View>
      {/* Step Progress Bar */}
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBarRow}>
          <View style={styles.progressDotActive} />
          <View style={styles.progressLine} />
          <View style={styles.progressDotInactive} />
        </View>
        <View style={styles.progressLabelsRow}>
          <Text style={styles.progressLabelActive}>Flight infos</Text>
          <Text style={styles.progressLabelInactive}>Extra</Text>
        </View>
      </View>
      {/* Flight Card Summary */}
      <View style={styles.cardSummary}>
        <View style={styles.cardHeader}>
          <View style={styles.cardLogoWrap}>
            <Image source={require('../../assets/images/Saudi.png')} style={styles.cardLogo} />
          </View>
          <Text style={styles.cardAirline}>Saudi Airlines</Text>
          <Text style={styles.cardPrice}>$700</Text>
        </View>
        <View style={styles.cardDetailsRow}>
          <Text style={styles.cardTime}>12:00</Text>
          <Text style={styles.cardAirport}>LHR</Text>
          <Text style={styles.cardDuration}>6h 15min</Text>
          <Text style={styles.cardAirport}>JED</Text>
          <Text style={styles.cardTime}>20:30</Text>
        </View>
      </View>
      {/* Flight Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Your Flight</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#FF5D0A" />
          <Text style={styles.infoText}>Sat 28 Jun 12:00</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="airplane-outline" size={20} color="#FF5D0A" />
          <Text style={styles.infoText}>Heathrow Airport (LHR)</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="airplane" size={20} color="#FF5D0A" />
          <Text style={styles.infoText}>King Abdulaziz International Airport (JED)</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#FF5D0A" />
          <Text style={styles.infoText}>6h 15min</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="business" size={20} color="#FF5D0A" />
          <Text style={styles.infoText}>Saudi Airlines</Text>
        </View>
      </View>
      {/* Next Button */}
      <OneButton
        title="Next"
        onPress={() => router.push('/screens/FlightExtras')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 48,
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    gap: 4,
    justifyContent: 'center', // Center children horizontally
  },
  pageTitle: {
    flex: 0,
    color: '#09090B',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
    alignSelf: 'center',
  },
  progressBarWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  progressBarRow: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  progressDotActive: {
    width: 10,
    height: 10,
    backgroundColor: '#FF5D0A',
    borderRadius: 9999,
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: '#FF5D0A',
    borderRadius: 2,
    marginHorizontal: 4,
  },
  progressDotInactive: {
    width: 10,
    height: 10,
    backgroundColor: '#A3A3A3',
    borderRadius: 9999,
  },
  progressLabelsRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  progressLabelActive: {
    color: '#FF5D0A',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  progressLabelInactive: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.10,
  },
  cardSummary: {
    width: '92%',
    backgroundColor: '#FFF5EC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLogoWrap: {
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginRight: 8,
  },
  cardLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  cardAirline: {
    flex: 1,
    color: '#222',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    marginLeft: 8,
  },
  cardPrice: {
    color: '#222',
    fontSize: 22,
    fontFamily: 'SF Pro',
    fontWeight: '700',
  },
  cardDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 2,
  },
  cardTime: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '500',
    marginHorizontal: 2,
  },
  cardAirport: {
    color: '#09090B',
    fontSize: 14,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '500',
    marginHorizontal: 2,
  },
  cardDuration: {
    color: '#FF5D0A',
    fontSize: 13,
    fontFamily: 'IBM Plex Sans Arabic',
    fontWeight: '700',
    marginHorizontal: 4,
  },
  infoSection: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 18,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  infoTitle: {
    color: '#FF5D0A',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    color: '#222',
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: 10,
  },
  extraSection: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 18,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    alignItems: 'center', // Center the button
  },
  extraTitle: {
    color: '#FF5D0A',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5D0A',
    borderRadius: 9999,
    paddingVertical: 14,
    width: '100%',
    marginTop: 8,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    textAlign: 'center',
  },
});
