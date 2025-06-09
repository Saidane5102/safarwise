import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBooking } from '../components/BookingContext';
import BookingStepProgress from '../components/BookingStepProgress';

export default function BookingExtra() {
  const router = useRouter();
  const { selectedFlight } = useBooking();

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
        <Text style={styles.pageTitle}>Booking</Text>
        <View style={{ width: 48 }} />
      </View>
      {/* Step Progress Bar */}
      <BookingStepProgress activeStep={2} />
      {/* Main content for Extra */}
      <View style={styles.contentBox}>
        <Text style={styles.sectionTitle}>Extra Services</Text>
        {/* TODO: List extra services here */}
        <TouchableOpacity style={{marginTop: 32, backgroundColor: '#FF5D0A', borderRadius: 9999, paddingVertical: 16, alignItems: 'center'}} onPress={() => router.push('/screens/BookingHotel')}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>Confirm & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
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
    gap: 4,
  },
  backIconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    flex: 1,
    color: '#09090B',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
  },
  contentBox: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF5D0A',
    marginBottom: 16,
  },
});
