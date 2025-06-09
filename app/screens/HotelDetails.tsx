import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OneButton from '../components/OneButton';

interface Room {
  id: string;
  name: string;
  totalPrice: string;
  pricePerNight: string;
  nights: number;
  capacity: string;
  amenities: string[];
  available: number;
}

const ROOMS: Room[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    totalPrice: '$1,194',
    pricePerNight: '$398',
    nights: 3,
    capacity: '2 Adults',
    amenities: ['King Bed', 'Free WiFi', 'City View'],
    available: 5,
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    totalPrice: '$1,494',
    pricePerNight: '$498',
    nights: 3,
    capacity: '2 Adults, 2 Children',
    amenities: ['2 Queen Beds', 'Free WiFi', 'Haram View', 'Breakfast Included'],
    available: 3,
  },
];

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
    description: 'Located in the heart of Mecca, Swissôtel Hotel Makkah combines Swiss luxury and traditional Arabian hospitality. With stunning views of the Holy Mosque and Kaaba.',
    amenities: ['Free WiFi', 'Restaurant', '24/7 Room Service', 'Fitness Center', 'Business Center'],
    distanceToHaram: '0.3 km',
    distanceToMosque: 'N/A',
  },
  {
    id: '2',
    name: 'Hilton Suites Makkah',
    location: 'Mecca, Makkah Province',
    price: '$320/',
    rating: '4.85',
    image: 'https://placehold.co/252x200',
    description: 'Experience luxury and comfort at Hilton Suites Makkah. Our modern accommodations offer spectacular views and easy access to the Holy Mosque.',
    amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'Concierge', 'Laundry'],
    distanceToHaram: '0.5 km',
    distanceToMosque: 'N/A',
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
    description: 'The Pullman Zamzam Madina offers modern luxury just steps from the Prophet\'s Mosque. Enjoy world-class service and amenities during your stay.',
    amenities: ['Free WiFi', 'Multiple Restaurants', '24/7 Room Service', 'Spa', 'Meeting Rooms'],
    distanceToHaram: 'N/A',
    distanceToMosque: '0.2 km',
  },
  {
    id: '4',
    name: 'Anwar Al Madinah Mövenpick',
    location: 'Medina, Al Madinah Province',
    price: '$180/',
    rating: '4.70',
    image: 'https://placehold.co/252x200',
    description: 'Located in the heart of Medina, Anwar Al Madinah Mövenpick offers comfortable accommodations with easy access to religious sites.',
    amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'Business Center', 'Parking'],
    distanceToHaram: 'N/A',
    distanceToMosque: '0.4 km',
  },
];

export default function HotelDetails() {
  const router = useRouter();
  const { id, from } = useLocalSearchParams();
  const [selectedRoom, setSelectedRoom] = React.useState<string | null>(null);
  
  const hotels = from === 'mekkah' ? HOTELS_MAKKAH : HOTELS_MEDINA;
  const hotel = hotels.find(h => h.id === id);

  if (!hotel) {
    return (
      <View style={styles.container}>
        <Text>Hotel not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top bar with back arrow and title */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backIconButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={28} color="#09090B" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Hotel Details</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: hotel.image }} style={styles.image} />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={20} color="#71717A" />
            <Text style={styles.location}>{hotel.location}</Text>
          </View>

          {hotel.badge && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{hotel.badge}</Text>
            </View>
          )}

          <View style={styles.ratingPrice}>
            <View style={styles.rating}>
              <Ionicons name="star" size={20} color="#FDB022" />
              <Text style={styles.ratingText}>{hotel.rating}</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceAmount}>{hotel.price}</Text>
              <Text style={styles.perNight}>per night</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{hotel.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <Text style={styles.distance}>
              {from === 'mekkah' ? hotel.distanceToHaram : hotel.distanceToMosque} to {from === 'mekkah' ? 'Haram' : 'Prophet\'s Mosque'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {hotel.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#0891B2" />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select a Room</Text>
            {ROOMS.map((room) => (
              <TouchableOpacity
                key={room.id}
                style={[
                  styles.roomCard,
                  selectedRoom === room.id && styles.selectedRoomCard
                ]}
                onPress={() => setSelectedRoom(room.id)}
              >
                <View style={styles.roomHeader}>
                  <View>
                    <Text style={styles.roomName}>{room.name}</Text>
                    <Text style={styles.roomCapacity}>{room.capacity}</Text>
                  </View>
                  <View>
                    <Text style={styles.roomTotalPrice}>{room.totalPrice}</Text>
                    <Text style={styles.roomPricePerNight}>
                      {room.pricePerNight} <Text style={styles.perNight}>per night</Text>
                    </Text>
                    <Text style={styles.nightsInfo}>for {room.nights} nights</Text>
                  </View>
                </View>
                
                <View style={styles.roomAmenities}>
                  {room.amenities.map((amenity, index) => (
                    <View key={index} style={styles.roomAmenityItem}>
                      <Ionicons name="checkmark" size={16} color="#0891B2" />
                      <Text style={styles.roomAmenityText}>{amenity}</Text>
                    </View>
                  ))}
                </View>
                
                <Text style={styles.availability}>
                  {room.available} rooms left at this price
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <OneButton
        title={selectedRoom ? "Confirm Selection" : "Select a Room"}
        onPress={() => {
          if (selectedRoom) {
            // Navigate back with selection
            router.replace({
              pathname: '/screens/BookingHotel',
              params: {
                selectedHotelId: hotel.id,
                selectedRoomId: selectedRoom
              }
            });
          }
        }}
        disabled={!selectedRoom}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  roomCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  selectedRoomCard: {
    borderColor: '#0891B2',
    backgroundColor: '#F0FDFF',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 4,
  },
  roomCapacity: {
    fontSize: 14,
    color: '#71717A',
  },
  roomTotalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#09090B',
    textAlign: 'right',
    marginBottom: 4,
  },
  roomPricePerNight: {
    fontSize: 14,
    color: '#52525B',
    textAlign: 'right',
  },
  perNight: {
    fontSize: 12,
    color: '#71717A',
  },
  nightsInfo: {
    fontSize: 12,
    color: '#71717A',
    textAlign: 'right',
    marginTop: 2,
  },
  roomAmenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  roomAmenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    gap: 4,
  },
  roomAmenityText: {
    fontSize: 12,
    color: '#52525B',
  },
  availability: {
    fontSize: 12,
    color: '#0891B2',
    fontWeight: '500',
  },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backIconButton: {
    padding: 8,
    marginLeft: -8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#09090B',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    color: '#71717A',
    marginLeft: 4,
  },
  badgeContainer: {
    backgroundColor: '#ECFEFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeText: {
    color: '#0891B2',
    fontSize: 14,
    fontWeight: '500',
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#09090B',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#09090B',
  },
  perNight: {
    fontSize: 12,
    color: '#71717A',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#52525B',
    lineHeight: 24,
  },
  distance: {
    fontSize: 16,
    color: '#52525B',
  },
  amenitiesContainer: {
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amenityText: {
    fontSize: 16,
    color: '#52525B',
  },
  button: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    width: undefined,
  },
});