import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useBooking } from '../components/BookingContext';
import BookingStepProgress from '../components/BookingStepProgress';
import FlightCard from '../components/FlightCard';
import OneButton from '../components/OneButton';

export default function BookingFlights() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { selectedFlight, setSelectedFlight } = useBooking();

  // When a flight is selected, immediately go to FlightDetails
  useEffect(() => {
    if (selectedFlight && !selectedFlight.status) {
      router.push('/screens/FlightDetails');
    }
  }, [selectedFlight]);

  // Pass status and extras to FlightCard
  return (
    <View style={styles.container}>
      {/* Top bar with only title */}
      <View style={styles.topBarContainer}>
        <Text style={styles.pageTitle}>Booking</Text>
      </View>
      {/* Step Progress Bar */}
      <BookingStepProgress activeStep={0} />
      {/* Flight Card Example */}
      <View style={{ padding: 16, backgroundColor: '#FFF5EC', borderRadius: 8, margin: 24, marginTop: 0 }}>
        <FlightCard 
          selected={!!selectedFlight}
          status={selectedFlight?.status || ''}
          extras={selectedFlight?.extras || null}
          onSelect={() => setSelectedFlight({ id: 'flight1', status: '', extras: null })}
        />
      </View>
      {/* Only show OneButton if a flight is selected and not in selection state */}
      {selectedFlight && selectedFlight.status && (
        <OneButton
          title="Continue"
          onPress={() => router.push('/screens/BookingHotel')}
        />
      )}
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
});
