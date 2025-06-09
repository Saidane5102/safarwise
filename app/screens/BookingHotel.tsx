import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BookingStepProgress from '../components/BookingStepProgress';
import HotelCard from '../components/HotelCard';
import HotelStepProgress from '../components/HotelStepProgress';
import OneButton from '../components/OneButton';

const HOTELS_MAKKAH = [
  {
    id: '1',
    name: 'Swissôtel Hotel Makkah',
    location: 'Mecca, Makkah Province',
    price: '$398/',
    rating: '4.91',
    badge: 'Premium Access',
    image: 'https://placehold.co/252x200',
    premium: true,
  },
  {
    id: '2',
    name: 'Hilton Suites Makkah',
    location: 'Mecca, Makkah Province',
    price: '$320/',
    rating: '4.85',
    image: 'https://placehold.co/252x200',
  },
];

const HOTELS_MEDINA = [
  {
    id: '3',
    name: 'Pullman Zamzam Madina',
    location: 'Medina, Al Madinah Province',
    price: '$210/',
    rating: '4.80',
    badge: 'Premium Access',
    image: 'https://placehold.co/252x200',
    premium: true,
  },
  {
    id: '4',
    name: 'Anwar Al Madinah Mövenpick',
    location: 'Medina, Al Madinah Province',
    price: '$180/',
    rating: '4.70',
    image: 'https://placehold.co/252x200',
  },
];

export default function BookingHotel() {
  const [step, setStep] = useState<'mekkah' | 'medina'>('mekkah');
  const [selectedMekkah, setSelectedMekkah] = useState<string | null>(null);
  const [selectedMekkahRoom, setSelectedMekkahRoom] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.selectedHotelId && params.selectedRoomId) {
      if (step === 'mekkah') {
        setSelectedMekkah(params.selectedHotelId as string);
        setSelectedMekkahRoom(params.selectedRoomId as string);
      }
    }
  }, [params, step]);

  const handleSeeDetails = (hotel: any) => {
    router.push({
      pathname: '/screens/HotelDetails',
      params: {
        id: hotel.id,
        from: step,
        currentSelection: step === 'mekkah' ? selectedMekkahRoom : null
      }
    });
  };

  const handleCancel = () => {
    if (step === 'mekkah') {
      setSelectedMekkah(null);
      setSelectedMekkahRoom(null);
    }
  };

  const selectedHotel = step === 'mekkah' ? 
    HOTELS_MAKKAH.find(h => h.id === selectedMekkah) :
    HOTELS_MEDINA.find(h => h.id === selectedMekkah);

  const hotels = step === 'mekkah' ? HOTELS_MAKKAH : HOTELS_MEDINA;

  return (
    <View style={styles.container}>
      {/* Top bar with back arrow and title */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIconButton} accessibilityLabel="Go back" accessibilityRole="button">
          <Ionicons name="arrow-back" size={28} color="#09090B" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Booking</Text>
        <View style={{ width: 48 }} />
      </View>

      <BookingStepProgress activeStep={1} />
      <HotelStepProgress step={step} />

      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Text style={styles.sectionTitle}>
          {step === 'mekkah' ? 
            (selectedMekkah ? 'Selected Hotel' : 'Available Hotels') : 
            'Available Hotels'}
        </Text>
        
        {step === 'mekkah' ? (
          selectedMekkah && selectedHotel ? (
            <View style={styles.selectedHotelContainer}>
              <HotelCard
                hotel={selectedHotel}
                selected
                onSeeDetails={() => handleSeeDetails(selectedHotel)}
              />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                accessibilityLabel="Cancel hotel selection"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={20} color="#09090B" />
              </TouchableOpacity>
            </View>
          ) : (
            hotels.map(hotel => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onSeeDetails={() => handleSeeDetails(hotel)}
              />
            ))
          )
        ) : (
          hotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onSeeDetails={() => handleSeeDetails(hotel)}
            />
          ))
        )}
      </ScrollView>

      {step === 'mekkah' && selectedMekkah && selectedMekkahRoom && (
        <OneButton
          title="Continue to Medina Hotels"
          onPress={() => setStep('medina')}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    gap: 12,
  },
  backIconButton: {
    padding: 8,
    marginLeft: -8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#09090B',
    flex: 1,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 16,
  },
  selectedHotelContainer: {
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    padding: 4,
  },
  button: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    width: undefined,
  },
});
